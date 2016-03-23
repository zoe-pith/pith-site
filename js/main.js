
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

      var horizontalLineCount = 15;
      var verticalLineCount = 20;
      var distanceBetweenVerticalLines = canvas.width / verticalLineCount;
      var distanceBetweenHorizontalLines = canvas.height / horizontalLineCount;

      for (var y = 0; y < horizontalLineCount; y++) {
        var yd = y * distanceBetweenHorizontalLines;

        context.beginPath();
        context.moveTo(0, yd);
        context.lineTo(canvas.width, yd);
        context.stroke();
      }

      for (var x = 0; x < verticalLineCount; x++) {
        var xd = x * distanceBetweenVerticalLines;

        context.beginPath();
        context.moveTo(xd, 0);
        context.lineTo(xd, canvas.height);
        context.stroke();
      }


    }

  }
})();
