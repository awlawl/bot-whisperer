var audio_context = null;
var recorder = null;

$(function() {

    $("#recordButton").on('touchstart mousedown', startRecording);

    $("#recordButton").on('touchend mouseup', stopRecording);

    $("#botIcon").on('touchstart mousedown', function() {
      createjs.Sound.stop();
      stopBotPulsing();
    });

    if (mediaPlaybackRequiresUserGesture()) {
        console.log('wait for input event');
        window.addEventListener('keydown', removeBehaviorsRestrictions);
        window.addEventListener('mousedown', removeBehaviorsRestrictions);
        window.addEventListener('touchstart', removeBehaviorsRestrictions);
    } else {
        console.log('no user gesture required');
        doBotGreeting();

    }

    loadBotName();

    var AudioContext = window.AudioContext ||
        window.webkitAudioContext ||
        false;

    if (AudioContext) {
        audio_context = new AudioContext();
    } else {
        alert("Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox");
    }


    //https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(
        userMediaStarted
    );

    $("#bottomPanel").click(toggleBottomBar);
});

function startRecording() {
    $("#recordButton").addClass("currently_recording");
    startMicPulsing();
    if (recorder) {
        recorder.record();
        console.log("Recording started.")
    }
}

function stopRecording() {
    $("#recordButton").removeClass("currently_recording");
    stopMicPulsing();
    if (recorder) {
        recorder.stop();
        console.log("Recording stopped.");
        getRecordedBlob(function(blob) {
            postForm(blob);
            //playRecording(blob);
            recorder.clear();
        });

    }

}

function startBotPulsing() {
    /*$('#bot_outer_circle').removeClass("pulse");
    window.requestAnimationFrame(function(time) {
      window.requestAnimationFrame(function(time) {*/
    $('#botIcon').addClass("pulse");
    /*  });
    });*/
}

function stopBotPulsing() {
    /*$('#bot_outer_circle').removeClass("pulse");
    window.requestAnimationFrame(function(time) {
    window.requestAnimationFrame(function(time) {*/
    $('#botIcon').removeClass("pulse");
    /*});
  });*/
}

function startMicPulsing() {
    $('#recordButton').addClass("pulse");
    $('#microphone').addClass("red_mic");

}

function stopMicPulsing() {
    $('#recordButton').removeClass("pulse");
    $('#microphone').removeClass("red_mic");
}

function userMediaStarted(stream) {
    var input = audio_context.createMediaStreamSource(stream);
    console.log('Media stream created.');

    recorder = new Recorder(input);
    console.log('Recorder initialised.');
}

function getRecordedBlob(callback) {
    recorder.exportWAV(function(blob) {
        console.log('Recording blob size: ' + blob.size);
        callback(blob);
    });
}

function playRecording(blob) {

    var url = URL.createObjectURL(blob);

    playRecordingFromUrl(url);
}

function playRecordingFromUrl(url) {
    console.log('playing ' + url);

    createjs.Sound.registerSound(url, "speech");
    setTimeout(function () {
      var instance = createjs.Sound.play("speech");
        instance.on("complete", function() {
          stopBotPulsing();
        }, this);
    }, 1000)


    /*
    //thanks https://stackoverflow.com/questions/9421505/switch-audio-source-with-jquery-and-html5-audio-tag
    var audio = $("#audioPlayer");
    $("#audioPlayer").attr("src", url);
    audio[0].pause();
    audio[0].load();
    audio[0].oncanplaythrough = audio[0].play();*/
}

function postForm(blob) {
    var formData = new FormData();

    formData.append("voicefile", blob);

    var request = new XMLHttpRequest();
    request.open("POST", "/voice");

    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            //console.dir(request);
            var response = JSON.parse(request.responseText);
            debugVoiceSpeak(response.inputTranscript, URL.createObjectURL(blob));
            debugBotSpeak(response.message, response.responseUrl);
            startBotPulsing();
            playRecordingFromUrl(response.responseUrl);
        }
    };

    request.send(formData);
}

function loadBotName() {
    console.log("loading bot name")
    var request = new XMLHttpRequest();
    request.open('GET', '/botname', true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            $("#botName").text(request.responseText);
        }
    };

    request.send();
}

function doBotGreeting() {
    console.log('Getting bot greeting');
    var request = new XMLHttpRequest();
    request.open('GET', '/voice', true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var response = JSON.parse(request.responseText);
            debugBotSpeak(response.message, response.responseUrl);
            startBotPulsing();
            playRecordingFromUrl(response.responseUrl);
        }
    };

    request.send();
}

function mediaPlaybackRequiresUserGesture() {
    // test if play() is ignored when not called from an input event handler
    var audio = document.createElement('audio');
    audio.play();
    return audio.paused;
    //return true;
}

function removeBehaviorsRestrictions() {
    var audio = document.querySelector('audio');
    console.log('call load()');
    audio.load();

    window.removeEventListener('keydown', removeBehaviorsRestrictions);
    window.removeEventListener('mousedown', removeBehaviorsRestrictions);
    window.removeEventListener('touchstart', removeBehaviorsRestrictions);
    console.log('wait 1 second');
    setTimeout(doBotGreeting, 1000);
}

function toggleBottomBar() {

    var bottomPanel = $("#bottomPanel");
    if (bottomPanel.hasClass('panel-up')) {
        bottomPanel.addClass('panel-down', 500, 'easeInOutBack');
        bottomPanel.removeClass('panel-up');
    } else {
        bottomPanel.removeClass('panel-down');
        bottomPanel.addClass('panel-up', 500, 'easeInOutBack');
    }
}

function debugSpeak(who, text, url) {
    var div = document.createElement("div");
    var player = document.createElement('audio');
    var transcript = document.createElement('span');

    transcript.innerHTML = "<br/><b>" + who + ": </b>" + text;

    div.className = 'debugRow';
    player.controls = true;
    player.src = url;
    div.appendChild(player);
    div.appendChild(transcript);
    $("#debugConsole").prepend(div);
}

function debugBotSpeak(text, url) {
    debugSpeak('Bot', text, url);
}

function debugVoiceSpeak(text, url) {
    debugSpeak('Speaker', text, url);
}
