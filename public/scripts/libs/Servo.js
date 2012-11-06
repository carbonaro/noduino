define(function() {
  
  function Servo(options, Connector) { 
    if (false === (this instanceof Servo)) {
      return new Servo(options); }

    this.c      = Connector;
    this.pin    = normalizePin(options.pin || 9);
    this.pos    = options.pos || 90;
  };

  Servo.prototype.write = function (pos, callback) {
    this.c.current().write('98' + this.pin + '002' + normalizeVal(pos));
  }

  Servo.prototype.attach = function (callback) {
    this.c.current().write('98' + this.pin + '001');
    this.write(this.pos, callback);
  }
  
  function normalizePin(pin) {
    return ("00" + pin).substr(-2);
  }

  function normalizeVal(val) {
    return ("000" + val).substr(-3);
  }

  return Servo;
});
