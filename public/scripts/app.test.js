var pl = 'scripts/libs/';
var servo = null;
var board = null;
var lcd = null;
var Noduino = null;
require(["jquery", pl + 'Noduino.js', pl + 'Noduino.Socket.js', pl + 'Logger.HTML.js'], function($, NoduinoObj, Connector, Logger) {
  function updateLcd() {
    var x = $('#lcd_x').val();
    var y = $('#lcd_y').val();
    lcd.print(x, y, 0, $('#lcd').val());
    $('#val_lcd_x').html(x);
    $('#val_lcd_y').html(y);
  }
  $(document).ready(function(e) {
    var host = $('#host').val();
    $('#servo-slide').change(function() {
      var angle = $('#servo-slide').val();
      $("#servo-value").val(angle);
      servo.write(angle);
    });
    $('#lcd').keyup(updateLcd);
    $('#lcd_x').change(updateLcd);
    $('#lcd_y').change(updateLcd);
    $('#lcd_on').click(function() {
      lcd.backlight('on');
    });
    $('#lcd_off').click(function() {
      lcd.backlight('off');
    });
    $('#lcd_clear').click(function() {
      lcd.clear();
      $('#lcd').val('');
    });
    if (!Noduino || !Noduino.connected) {
      Noduino = new NoduinoObj({debug: true, host: 'http://' + host + ':8090', logger: {container: '#connection-log'}}, Connector, Logger);
      Noduino.connect(function(err, b) {
        board = b;
        board.withLcd(function(err, l) {
          lcd = l;
        });
        board.withServo({pin: 9, pos: 45}, function(err, s) {
          servo = s;
          servo.attach();
        });
      });
    }
  });
});