var words;
var article;
var remembered = false;
var time;
var wpm

$(document).ready(function(){
  retrieve();
  count();
})

$('#article').on('keyup propertychange paste', function(){
  count();
});
$('#timer').on('keyup propertychange paste', function(){
  count();
});

function count(){
  console.log("count()")
  article = $('textarea').val();
  words = article.trim().replace(/\s+/gi, ' ').split(' ').length;
  time = $('#timer').val();
  wpm = words/(time/60);
  $('#words_result').html(words + ' words');
  $('#wpm').html('WPM:' + wpm);
  store();
}

function store() {
  console.log("store")
  chrome.storage.sync.set({
    'article': article,
    'words': words
  }, function(storage) {
  });
}

function retrieve(){
  chrome.storage.sync.get(['article','words'], function(items){
    if(!jQuery.isEmptyObject(items)){
      if(items.article != undefined){
        $('#article').val(items.article);
        $('#words_result').html(items.words + "words");
      }
    }
  });
}
