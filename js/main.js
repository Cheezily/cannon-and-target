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

  var topLimit = fieldHeight * .2;
  var bottomLimit = fieldHeight * .90;
  var leftLimit = fieldWidth * .4;
  var rightLimit = fieldWidth * .9;

  var degrees = 0;
  var radians = 0;
  var shotsTaken = 0;
  var shellSpeed = 45;
  var fireDelay = 500;

  var shells = [];

  console.log('cannonleft: ' + cannonContainerLeft);
  console.log('top: ' + cannonTop);
  console.log('width: ' + cannonWidth);
  console.log('height: ' + cannonHeight);

  $('.cannonContainer').css({
    'top': cannonTop,
    'left': cannonContainerLeft,
    'width': cannonContainerWidth,
    'height': cannonHeight
  });

  $('.cannon').css({
    'width': cannonWidth,
    'height': cannonHeight
  });

  $('.shell').css({
    'height': cannonHeight * .8
  })

  $('.target').css({
    'top': targetTop,
    'left': targetLeft,
    'width': targetWidth,
    'height': targetHeight
  });


  $(document).mousemove(function(event) {

    radians = Math.atan2((event.pageX - (cannonContainerLeftRaw +
      parseInt(cannonWidth))), (cannonTopRaw - event.pageY));

    degrees = radians * (180 / Math.PI) - 90;
    //console.log(degrees);
    $('.cannonContainer').css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
             '-moz-transform' : 'rotate('+ degrees +'deg)',
             '-ms-transform' : 'rotate('+ degrees +'deg)',
             'transform' : 'rotate('+ degrees +'deg)'});

  });


  function loadCannon() {

     $('.container').click(function() {

      shotsTaken++;

      var muzzleTop = $('.muzzle').offset().top;
      var muzzleLeft = $('.muzzle').offset().left;

      //console.log('muzzleTop: ' + muzzleTop);
      //console.log('muzzleLeft: ' + muzzleLeft);

      shells.push({
        'deg': degrees + 90,
        'currentX': muzzleLeft,
        'currentY': muzzleTop,
        'moveX': Math.cos(radians - Math.PI / 2) * shellSpeed,
        'moveY': Math.sin(radians - Math.PI / 2) * shellSpeed,
        'id': shotsTaken,
        'previousX': 0,
        'previousY': 0
      })

      var shellID = '#shellNum' + (shotsTaken);

      $('.container').append("<div class='shell' id='shellNum" +
        (shotsTaken) + "' style='top: " + muzzleTop + "px; left: " + muzzleLeft + "px;' >" +
        "<img src='images/cat.gif'></div>");
      $(shellID).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
               '-moz-transform' : 'rotate('+ degrees +'deg)',
               '-ms-transform' : 'rotate('+ degrees +'deg)',
               'transform' : 'rotate('+ degrees +'deg)'});

      //console.log(shells);

      //$('.container').off();
    });

/*
    setTimeout(function() {
      loadCannon();
    }, fireDelay);
*/
  }



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


        shellsMove();
        targetMove(moveX, moveY, times, speed);

      } else {
        var moveMax = 50;
        var moveMin = 10;
        var timesMax = 35;
        var timesMin = 15;

        moveX = Math.floor((Math.random() * (moveMax - moveMin + 1) + moveMin));
        if (Math.random() * 2 >= 1) moveX *= -1;

        moveY = Math.floor((Math.random() * (moveMax - moveMin + 1) + moveMin));
        if (Math.random() * 2 >= 1) moveY *= -1;

        times = Math.floor((Math.random() * (timesMax - timesMin + 1) + timesMin));
        speed = 10;

        targetMove(moveX, moveY, times, speed);
      }

    }, speed);

  }


  function shellsMove() {

    var toDelete = [];

    //console.log('SHELLS: ' + shells.length);
    if (shells.length > 0) {
      for (var i = 0; i < shells.length; i++) {
        var currentX = shells[i].currentX;
        var currentY = shells[i].currentY;
        var moveX = shells[i].moveX;
        var moveY = shells[i].moveY;
        var moveToXpx = (currentX + moveX).toString() + 'px';
        var moveToYpx = (currentY + moveY).toString() + 'px';
        shells[i].currentX += moveX;
        shells[i].currentY += moveY;

        var shellID = "#shellNum" + shells[i].id;

        $(shellID).css({'top': moveToYpx, 'left': moveToXpx});

        if (currentX < -200 ||
          currentX > fieldWidth + 300 ||
          currentY < -200 ||
          currentY > fieldHeight + 300) {
          //$(shellID).remove();
          toDelete.push([i, shells[i].id]);
        }

      }
    }

    for (var i = 0; i < toDelete.length; i++) {
      var shellID = "#shellNum" + toDelete[i][1];
      $(shellID).remove();
      shells.splice(toDelete[i], 1);
    }
  }

  targetMove(1, 1, 1, 10);
  loadCannon();
})
