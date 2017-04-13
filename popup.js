var words, article, time, wpm;
var startTime, stopTime;
var now;
var running;//タイマーが動いているとき、true
var counting;//カウントを毎秒行う関数

$(document).ready(function() {//ポップアップを開いたときに一度だけ実行される
    retrieve(count);
    //ポップアップを開いて、timer計測するかどうかを投げる。並行処理のために、setTimeoutを使用
    setTimeout(function(){runtimer()},100);

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
    $('#words_result').html(words + ' words');
    $('#wpm').html('WPM:' + wpm);
    store();
}

function store() {
    chrome.storage.local.set({
        'article': article,
        'words': words,
        'startTime': startTime,
        'stopTime': stopTime,
        'running': running
    });
}

function retrieve(callback) {//ポップアップを開いたときに、保持してある情報を戻す
    chrome.storage.local.get(['article', 'words', 'startTime', 'stopTime', 'running'], function(items) {
        if (!jQuery.isEmptyObject(items)) {
            if (items.article != undefined) {
                $('#article').val(items.article);
                $('#words_result').html(items.words + "words");
                startTime = items.startTime;
                stopTime = items.stopTime;
                running = items.running;
            }
            callback();//基本的には$(document).readyでcountを呼ぶだけ。
        }
    });
}


function startTimer() {
    startTime = new Date().getTime();
    $("#startTimeValue").val(startTime);
    running = true;
    runtimer();
    store();
}

function stopTimer() {
    stopTime = new Date().getTime();
    $("#stopTimeValue").val(stopTime);
    running = false;
    clearInterval(counting);
    store();
}

function runtimer() {//ポップアップ時にtimerを起動するかどうかを決める
    if(running){
        counting = setInterval(function(){count()},1000);
    }
}
