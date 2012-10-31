/**
 * srv.app.js – Handling HTTP:80 Requests
 * This file is part of noduino (c) 2012 Sebastian Müller <c@semu.mp>
 *
 * @package     noduino
 * @author      Sebastian Müller <c@semu.mp>
 * @license     MIT License – http://www.opensource.org/licenses/mit-license.php 
 * @url         https://github.com/semu/noduino
 */
 
define(['kickstart', 'module', 'path', 'fs', 'os'], function (kickstart, module, path, fs, os) {
  var kickstart = kickstart.withConfig({'name': '*', 'port': 8080, 'path': path.dirname(module.uri)});
  var srv = kickstart.srv();
  
  /**
   * Load file with example snippets
   */
  var fileContents = fs.readFileSync(path.dirname(module.uri) + '/examples.snippet'),
    sections = (fileContents + '').split('###'),
    examples = {};
  for (var i = 0; i < sections.length; i++) {
    var tmp = sections[i].split("\n"),
      key = tmp.shift();
    tmp.pop();
    examples[key] = tmp.join("\n");
  }


  /** 
   * Catch request for serving home page
   */
  srv.all('/', function(req, res) {
    // Determin IP address on eth0 interface
    var ifaces=os.networkInterfaces();
    var eth0_address = '127.0.0.1';
    ifaces.eth0.forEach(function(details) {
      if (details.family=='IPv4')
        eth0_address = details.address;
    });
    res.render('home', {jsApp: 'main', active: 'home', title: 'noduino', 'examples': examples, 'eth0_address': eth0_address});
  });

  /** 
   * Catch request for Getting Started page
   */
  srv.all('/getting-started.html', function(req, res) {
    res.render('getting-started', {jsApp: 'none', active: 'getting-started', title: 'noduino', 'examples': examples});
  });

  /** 
   * Catch request for serving walkLED example page
   */
  srv.all('/example-walkLED.html', function(req, res) {
    res.render('example-walkLED', {jsApp: 'walkLED', active: 'examples', title: 'noduino', 'examples': examples});
  });
  
  return {'kickstart': kickstart, 'srv': srv};
});