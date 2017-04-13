var words;
var article;
var remembered = false;
var time;
var wpm;
var startTime;
var stopTime;
var now;
var running;//タイマーが動いているとき、true
var counting;

$(document).ready(function() {
    retrieve(count);
    console.log("ready: running=" + running);
    setTimeout(function(){runtimer()},300);
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
    if(running){
        time = Math.floor((now - startTime)/1000);
    }else{
        time = Math.floor((stopTime - startTime)/1000);
    }
    $('#timer').val(time);
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
        'stopTime': stopTime,
        'running': running
    });
    console.log(startTime);
    console.log("store done")
}

function retrieve(callback) {
    chrome.storage.local.get(['article', 'words', 'startTime', 'stopTime', 'running'], function(items) {
        if (!jQuery.isEmptyObject(items)) {
            if (items.article != undefined) {
                $('#article').val(items.article);
                $('#words_result').html(items.words + "words");
                $('#startTimeValue').val(items.startTime);
                $('#stopTimeValue').val(items.stopTime);

                startTime = items.startTime;
                stopTime = items.stopTime;
                running = items.running;
            }
            callback();
        }
    });
}


function startTimer() {
    var hour, minute, second;
    startTime = new Date().getTime();
    stopTime = "";
    // hour = startTime.getHours();
    // minute = startTime.getMinutes();
    // seconds = startTime.getSeconds();
    // $("#startTimeValue").val(hour + ":" + minute + ":" + seconds);
    $("#startTimeValue").val(startTime);
    running = true;
    runtimer();
    store();
}

function stopTimer() {
    var hour, minute, second;
    stopTime = new Date().getTime();
    $("#stopTimeValue").val(stopTime);
    clearInterval(counting);
    running = false;
    store();
}

function runtimer() {
    if(running){
        counting = setInterval(function(){count()},1000);
    }
    console.log("running:" + running);
}
