$(document).ready(function() {
  var fieldWidth = parseInt($('.container').css('width'));
  var fieldHeight = parseInt($('.container').css('height'));

  var cannonContainerLeftRaw = parseInt(fieldWidth * .05);
  var cannonContainerLeft = cannonContainerLeftRaw.toString() + 'px';
  var cannonTopRaw = parseInt(fieldHeight * .9);
  var cannonTop = cannonTopRaw.toString() + 'px';
  var cannonContainerWidth = parseInt(fieldWidth * .20).toString() + 'px';
  var cannonWidth = parseInt(fieldWidth * .10).toString() + 'px';
  var cannonHeightRaw = parseInt((fieldWidth * .10) * .4);
  var cannonHeight = cannonHeightRaw.toString() + 'px';

  var targetLeft = parseInt(fieldWidth * .85).toString() + 'px';
  var targetTop = parseInt(fieldHeight * .75).toString() + 'px';
  var targetWidth = parseInt(fieldHeight * .10).toString() + 'px';
  var targetHeight = parseInt(fieldHeight * .10).toString() + 'px';
  var degrees = 0;

  console.log('cannonleft: ' + cannonContainerLeft);
  console.log('top: ' + cannonTop);
  console.log('width: ' + cannonWidth);
  console.log('height: ' + cannonHeight);

  $('.cannonContainer').css({'top': cannonTop,
    'left': cannonContainerLeft,
    'width': cannonContainerWidth,
    'height': cannonHeight});

  $('.cannon').css({
    'width': cannonWidth,
    'height': cannonHeight});

  $('.target').css({'top': targetTop,
    'left': targetLeft,
    'width': targetWidth,
    'height': targetHeight});

  $(document).mousemove(function(event) {
    //console.log('MOUSE-X: ' + event.pageX);
    //console.log(cannonTopRaw - event.pageY);
    var radians = Math.atan2((event.pageX - (cannonContainerLeftRaw +
      parseInt(cannonWidth))), (cannonTopRaw - event.pageY));

    degrees = radians * (180 / Math.PI) - 90;
    //console.log(degrees);
    $('.cannonContainer').css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
             '-moz-transform' : 'rotate('+ degrees +'deg)',
             '-ms-transform' : 'rotate('+ degrees +'deg)',
             'transform' : 'rotate('+ degrees +'deg)'});

  });

  $(document).click(function() {

  })

  var topLimit = fieldHeight * .2;
  var bottomLimit = fieldHeight * .90;
  var leftLimit = fieldWidth * .4;
  var rightLimit = fieldWidth * .9;

  function targetMove(moveX, moveY, times, speed) {

    setTimeout(function() {

      var currentX = parseInt($('.target').css('left'));
      var currentY = parseInt($('.target').css('top'));

      var moveToXpx = (currentX + moveX).toString() + 'px';
      var moveToYpx = (currentY + moveY).toString() + 'px';

      if (times > 0) {
        $('.target').css({'top': moveToYpx,'left': moveToXpx});

        times--;

        if (currentX >= rightLimit && moveX > 0) {moveX *= -1;}
        if (currentX <= leftLimit && moveX < 0) {moveX *= -1;}
        if (currentY >= bottomLimit && moveY > 0) {moveY *= -1;}
        if (currentY <= topLimit && moveY < 0) {moveY *= -1;}

        targetMove(moveX, moveY, times, speed);

      } else {
        var moveMax = 30;
        var moveMin = 5;
        var timesMax = 40;
        var timesMin = 5;

        moveX = Math.floor((Math.random() * (moveMax - moveMin + 1) + moveMin));
        //moveX = Math.floor(Math.random() * moveMax) + 1;
        if (Math.random() * 2 >= 1) moveX *= -1;
        moveY = Math.floor((Math.random() * (moveMax - moveMin + 1) + moveMin));
        //moveY = Math.floor(Math.random() * moveMax) + 1;
        if (Math.random() * 2 >= 1) moveY *= -1;
        times = Math.floor((Math.random() * (timesMax - timesMin + 1) + timesMin));
        speed = 10;

        targetMove(moveX, moveY, times, speed);
      }

    }, speed);

  }



  targetMove(1, 1, 10, 10);
})
