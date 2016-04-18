$(document).ready(function() {
  var fieldWidth = parseInt($('.container').css('width'));
  var fieldHeight = parseInt($('.container').css('height'));

  var cannonLeft = parseInt(fieldWidth * .15).toString() + 'px';
  var cannonTop = parseInt(fieldHeight * .75).toString() + 'px';
  var cannonWidth = parseInt(fieldWidth * .10).toString() + 'px';
  var cannonHeight = parseInt((fieldWidth * .10) * .4).toString() + 'px';

  var targetLeft = parseInt(fieldWidth * .85).toString() + 'px';
  var targetTop = parseInt(fieldHeight * .75).toString() + 'px';
  var targetWidth = parseInt(fieldWidth * .10).toString() + 'px';
  var targetHeight = parseInt(fieldWidth * .10).toString() + 'px';

  console.log('left: ' + cannonLeft);
  console.log('top: ' + cannonTop);
  console.log('width: ' + cannonWidth);
  console.log('height: ' + cannonHeight);

  $('.cannon').css({'top': cannonTop,
    'left': cannonLeft,
    'width': cannonWidth,
    'height': cannonHeight});

  $('.target').css({'top': targetTop,
    'left': targetLeft,
    'width': targetWidth,
    'height': targetHeight});

  var topLimit = fieldHeight * .4;
  var bottomLimit = fieldHeight * .9;
  var leftLimit = fieldWidth * .5;
  var rightLimit = fieldWidth * .9;

  function targetMove(startX, startY, endX, endY) {
    


  }
})
