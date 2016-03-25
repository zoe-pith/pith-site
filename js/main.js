
(function() {
  doBackgroundCanvas();

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
      canvas.lineWidth = 1;
      canvas.strokeStyle = '#000000';

      var distanceBetweenVerticalLines = 60;
      var distanceBetweenHorizontalLines = 60;

      for (var y = 0; y < window.innerHeight; y += distanceBetweenHorizontalLines) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
        context.stroke();
      }

      for (var x = 0; x < window.innerWidth; x += distanceBetweenVerticalLines) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.stroke();
      }


    }

  }
})();
