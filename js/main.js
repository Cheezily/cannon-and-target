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

  function targetMove(moveX, moveY, times, speed) {
    setTimeout(function() {


      console.log('moveX: ' + moveX);
      console.log('moveY: ' + moveY);

      var moveToXpx = (parseInt($('.target').css('left')) - moveX).toString() + 'px';
      var moveToYpx = (parseInt($('.target').css('top')) - moveY).toString() + 'px';


      console.log('moveToXpx: ' + moveToXpx);
      console.log('moveToYpx: ' + moveToYpx);

      if (times > 0) {
        $('.target').css({'top': moveToYpx,
          'left': moveToXpx});
        times--;
        targetMove(moveX, moveY, times, speed);
      } else {
        newMovement(parseInt($('.target').css('left'), parseInt($('.target').css('top'))));
      }
    }, speed);

  }

  function newMovement(posX, posY) {
    var randX = Math.floor(Math.random() * (rightLimit - leftLimit) + rightLimit);
    var randY = Math.floor(Math.random() * (bottomLimit - topLimit) + topLimit);

    var times = 50;

    var moveX = (randX - parseInt(parseInt($('.target').css('left')))) / times;
    var moveY = (randY - parseInt(parseInt($('.target').css('top')))) / times;

    var speed = 10;

    console.log('sendX: ' + randX);
    console.log('sendY: ' + randY);

    if (moveX < leftLimit || moveX > rightLimit) {moveX = moveX * - 1}
    if (moveY < topLimit || moveX > bottomLimit) {moveX = moveX * - 1}


    targetMove(moveX, moveY, times, speed);
  }


  newMovement(parseInt($('.target').css('left'), parseInt($('.target').css('top'))));
})
