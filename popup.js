function count(){
  var txtVal = $('textarea').val();
  var words = txtVal.trim().replace(/\s+/gi, ' ').split(' ').length;
  var chars = txtVal.length;
  var time = $('.timer').val();
  var wpm = words/(time/60);
  if(chars===0){words=0;}
  $('#counter').html('<br>'+'<p>'+words+' words and '+ chars +' characters'+'</p>'+'<p>'+ 'WPM:'+wpm);

}

count();

$('textarea').on('keyup propertychange paste', function(){ 
    count();
});
