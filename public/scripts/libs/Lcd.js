define(function() {
  
  function Lcd(options, Connector) { 
    if (false === (this instanceof Lcd)) {
      return new Lcd(); }

    this.c      = Connector;
  };

  Lcd.prototype.clear = function (callback) {
    this.c.current().write('96' + '00' + '000' + '000' + '0000');
  }

  Lcd.prototype.print = function (x, y, mode, msg, callback) {
    this.c.current().write('96' + '00' + '001' + normalizeVal(msg.length) + normalizeX(x) + normalizeY(y) + normalizeMode(mode) + msg);
  }

  Lcd.prototype.println = function (x, y, mode, msg, callback) {
    this.c.current().write('96' + '00' + '003' + normalizeVal(msg.length) + normalizeX(x) + normalizeY(y) + normalizeMode(mode) + msg);
  }

  Lcd.prototype.backlight = function (command) {
    if (command == "on" || command == "ON")
      this.c.current().write('96' + '00' + '099' + '000' + '0000');
    else
      this.c.current().write('96' + '00' + '098' + '000' + '0000');
  }

  function normalizeVal(val) {
    return ("000" + val).substr(-3);
  }

  function normalizeX(val) {
    return ("00" + val).substr(-2);
  }

  function normalizeY(val) {
    return ("0" + val).substr(-1);
  }

  function normalizeMode(val) {
    return ("0" + val).substr(-1);
  }
  return Lcd;
});
