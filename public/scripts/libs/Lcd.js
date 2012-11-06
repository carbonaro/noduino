define(function() {
  
  function Lcd(Connector) { 
    if (false === (this instanceof Lcd)) {
      return new Lcd(); }

    this.c      = Connector;
  };

  Lcd.prototype.print = function (msg, callback) {
    this.c.current().write('9600000000' + msg);
  }

  function normalizeVal(val) {
    return ("000" + val).substr(-3);
  }

  return Lcd;
});
