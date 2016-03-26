
(function() {
  doBackgroundCanvas();
  addBackgroundImages();

  function doBackgroundCanvas() {
    var canvas = document.querySelector('.background-canvas');
    var context = canvas.getContext('2d');

    redrawCanvas();
    window.addEventListener('resize', redrawCanvas, false);

    function redrawCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      drawGrid();
    }

    function drawGrid() {
      context.lineWidth = 2;
      context.strokeStyle = 'black';
      context.fillStyle = 'black';

      var distanceBetweenVerticalLines = 40;
      var distanceBetweenHorizontalLines = 40;
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

      var numberToFill = Math.floor(Math.random() * 15) + 8;
      for (var i = 0; i < numberToFill; i++) {
        var rx = Math.floor(Math.random() * Math.floor(maxX / distanceBetweenVerticalLines)) * distanceBetweenVerticalLines;
        var ry = Math.floor(Math.random() * Math.floor(maxY / distanceBetweenHorizontalLines)) * distanceBetweenHorizontalLines;
        var length = distanceBetweenVerticalLines * Math.floor(Math.random() * 3);
        context.fillRect(rx, ry, length, length);
      }
    }
  }

  function addBackgroundImages() {
    var images = [
      'media/turnips.jpg', 'media/onions.jpg', 'media/dill.jpg',
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

})();
