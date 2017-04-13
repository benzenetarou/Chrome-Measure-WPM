var words;
var article;
var remembered = false;
var time;
var wpm;
var startTime;
var stopTime;
var now;
var running = false;//タイマーが動いているとき、true

$(document).ready(function() {
    console.log("ready");
    retrieve(count);
    runtimer();
})

$('#article').on('keyup propertychange paste', function() {
    count();
});
$('#timer').on('keyup propertychange paste', function() {
    count();
});
$('#startTimeButton').on('click', function() {
    startTimer();
});
$('#stopTimeButton').on('click', function() {
    stopTimer();
});

function count() {
    article = $('textarea').val();
    words = article.trim().replace(/\s+/gi, ' ').split(' ').length;
    now = new Date().getTime();
    time = Math.floor((now - startTime)/1000);
    $('#timer').val(time);
    console.log(typeof(words));
    console.log(typeof(time));
    wpm = Math.floor(words / (time / 60));
    // startTime = $('#startTimeValue').val();
    $('#words_result').html(words + ' words');
    $('#wpm').html('WPM:' + wpm);
    store();
    console.log("count done")
}

function store() {
    chrome.storage.local.set({
        'article': article,
        'words': words,
        'startTime': startTime,
        'stopTime': stopTime
    });
    console.log(startTime);
    console.log("store done")
}

function retrieve(callback) {
    chrome.storage.local.get(['article', 'words', 'startTime', 'stopTime'], function(items) {
        if (!jQuery.isEmptyObject(items)) {
            if (items.article != undefined) {
                $('#article').val(items.article);
                $('#words_result').html(items.words + "words");
                $('#startTimeValue').val(items.startTime);
                $('#stopTimeValue').val(items.stopTime);
                startTime = items.startTime;
                stopTime = items.stopTime;

            }
            console.log("retrieve done");
            console.log(typeof(items.startTime));
            callback();
        }
    });
}


function startTimer() {
    var hour, minute, second;
    startTime = new Date().getTime();
    stopTime = "";
    console.log(typeof(startTime));
    // hour = startTime.getHours();
    // minute = startTime.getMinutes();
    // seconds = startTime.getSeconds();
    // $("#startTimeValue").val(hour + ":" + minute + ":" + seconds);
    $("#startTimeValue").val(startTime);
    running = true;
    runtimer();
}

function stopTimer() {
    var hour, minute, second;
    stopTime = new Date().getTime();
    console.log(typeof(stopTime));
    $("#stopTimeValue").val(stopTime);
    running = false;
}

function runtimer(){
    if(running){
        setInterval(function(){count()},1000);    }
}
