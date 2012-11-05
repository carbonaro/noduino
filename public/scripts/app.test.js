var pl = 'scripts/libs/';
require(["jquery", pl + 'Noduino.js', pl + 'Noduino.Socket.js', pl + 'Logger.HTML.js'], function($, NoduinoObj, Connector, Logger) {
  var Noduino = null;
  var board = null;
  var servo = null;
  
  $(document).ready(function(e) {
    var host = $('#host').val();
    $('#servo-slide').change(function() {
      var angle = $('#servo-slide').val();
      $("#servo-value").val(angle);
      servo.write(angle);
    });
    if (!Noduino || !Noduino.connected) {
      Noduino = new NoduinoObj({debug: true, host: 'http://' + host + ':8090', logger: {container: '#connection-log'}}, Connector, Logger);
      Noduino.connect(function(err, board) {
        console.log("zob");
        board.withServo({pin: 9, pos: 45}, function(err, s) {
          servo = s;
          servo.attach();
          console.log(servo);
        });
      });
    }
  });
});