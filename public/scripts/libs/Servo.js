define(function() {
  
  function Servo(options, Connector) { 
    if (false === (this instanceof Servo)) {
      return new Servo(options); }

    this.c      = Connector;
    this.pin    = options.pin;
  };

  Servo.prototype.write = function (pos, callback) {
    this.c.current.write('98' + this.pin + '02' + pos);
  }

  Servo.prototype.attach = function (callback) {
    this.c.current().write('98' + this.pin + '01');
  }
  
  return Servo;
});
