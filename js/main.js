
(function() {
  doBackgroundCanvas();
  addBackgroundImages();

  function doBackgroundCanvas() {
    var canvas = document.querySelector('.background-canvas');
    var context = canvas.getContext('2d');

    var distanceBetweenVerticalLines = 40;
    var distanceBetweenHorizontalLines = 40;
    var squareAnimationInterval;

    redrawCanvas();
    window.addEventListener('resize', redrawCanvas, false);

    function redrawCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      context.clearRect(0, 0, canvas.width, canvas.height);

      drawGrid();
      resetSquareAnimationInterval();
    }

    function drawGrid() {
      context.lineWidth = 2;
      context.strokeStyle = 'black';

      var maxX = window.innerWidth + distanceBetweenVerticalLines * 2;
      var maxY = document.body.scrollHeight + distanceBetweenHorizontalLines * 2;

      for (var y = 0; y < maxY; y += distanceBetweenHorizontalLines) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
        context.stroke();
      }

      for (var x = 0; x < maxX; x += distanceBetweenVerticalLines) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.stroke();
      }
    }

    function resetSquareAnimationInterval() {
      clearInterval(squareAnimationInterval);

      var maxX = window.innerWidth + distanceBetweenVerticalLines * 2;
      var maxY = document.body.scrollHeight + distanceBetweenHorizontalLines * 2;
      var numberToFill = Math.floor(Math.random() * 20) + 15;
      var fillChoices = ['black', 'rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)'];

      var filledSquares = [];
      for (var i = 0; i < numberToFill; i++) {
        filledSquares.push({
          x: Math.floor(Math.random() * Math.floor(maxX / distanceBetweenVerticalLines)) * distanceBetweenVerticalLines,
          y: Math.floor(Math.random() * Math.floor(maxY / distanceBetweenHorizontalLines)) * distanceBetweenHorizontalLines,
          length: distanceBetweenVerticalLines * Math.floor(Math.random() * 3),
          fillColor: fillChoices[Math.floor(fillChoices.length * Math.random())]
        });
      }

      var alpha = 0;
      var growthState = 'up';
      var stallCount = 0;
      squareAnimationInterval = setInterval(function() {
        switch (growthState) {
          case 'up':
            alpha += 0.025;
            if (alpha >= 1) {
              alpha = 1;
              growthState = 'stallUp';
            }
            break;

          case 'down':
            alpha -= 0.025;
            if (alpha <= 0) {
              alpha = 0;
              growthState = 'stallDown';
            }
            break;

          case 'stallUp':
          case 'stallDown':
            stallCount += 1;
            if (stallCount > 70) {
              stallCount = 0;
              growthState = growthState === 'stallUp' ? 'down' : 'up';
            }
            break;
        }

        drawFilledSquares(filledSquares, alpha);
      }, 60);
    }

    function drawFilledSquares(filledSquares, alpha) {
      if (alpha === undefined) alpha = 1;

      for (var i = 0; i < filledSquares.length; i++) {
        var filledSquare = filledSquares[i];
        context.clearRect(filledSquare.x, filledSquare.y, filledSquare.length, filledSquare.length);
      }

      context.globalAlpha = 1.0;
      drawGrid();

      context.globalAlpha = alpha;

      for (i = 0; i < filledSquares.length; i++) {
        var filledSquare = filledSquares[i];
        context.fillStyle = filledSquare.fillColor;
        context.fillRect(filledSquare.x, filledSquare.y, filledSquare.length, filledSquare.length);
      }
    }
  }

  function addBackgroundImages() {
    var images = [
      originify('/media/turnips.jpg'), originify('/media/onions.jpg'), originify('/media/dill.jpg'),
      'https://i.giphy.com/Ff2LmUUzZQAeY.gif', 'https://media.giphy.com/media/xTiTnvq121tWJMN8gE/giphy.gif'
    ];
    var maxHeight = document.body.scrollHeight - 500;

    for (var i = 0; i < 8; i++) {
      var img = document.createElement('img');
      img.className = 'background-image';
      img.src = images[Math.floor(images.length * Math.random())];

      var width = Math.random() * 200 + 100;
      img.style.width = width + 'px';
      img.style.left = (Math.random() * (window.innerWidth - width - 40) + 20) + 'px';

      img.style.top = (Math.random() * maxHeight + 60) + 'px';

      document.body.appendChild(img);
    }
  }

  function originify(path) {
    return window.location.origin + '/pith-site' + path;
  }

})();
