import {
  __commonJS
} from "./chunk-OXCW2X5T.js";

// node_modules/stompjs/lib/stomp.js
var require_stomp = __commonJS({
  "node_modules/stompjs/lib/stomp.js"(exports) {
    (function() {
      var Byte, Client, Frame, Stomp, __hasProp = {}.hasOwnProperty, __slice = [].slice;
      Byte = {
        LF: "\n",
        NULL: "\0"
      };
      Frame = function() {
        var unmarshallSingle;
        function Frame2(command, headers, body) {
          this.command = command;
          this.headers = headers != null ? headers : {};
          this.body = body != null ? body : "";
        }
        Frame2.prototype.toString = function() {
          var lines, name, skipContentLength, value, _ref;
          lines = [this.command];
          skipContentLength = this.headers["content-length"] === false ? true : false;
          if (skipContentLength) {
            delete this.headers["content-length"];
          }
          _ref = this.headers;
          for (name in _ref) {
            if (!__hasProp.call(_ref, name))
              continue;
            value = _ref[name];
            lines.push("" + name + ":" + value);
          }
          if (this.body && !skipContentLength) {
            lines.push("content-length:" + Frame2.sizeOfUTF8(this.body));
          }
          lines.push(Byte.LF + this.body);
          return lines.join(Byte.LF);
        };
        Frame2.sizeOfUTF8 = function(s) {
          if (s) {
            return encodeURI(s).match(/%..|./g).length;
          } else {
            return 0;
          }
        };
        unmarshallSingle = function(data) {
          var body, chr, command, divider, headerLines, headers, i, idx, len, line, start, trim, _i, _j, _len, _ref, _ref1;
          divider = data.search(RegExp("" + Byte.LF + Byte.LF));
          headerLines = data.substring(0, divider).split(Byte.LF);
          command = headerLines.shift();
          headers = {};
          trim = function(str) {
            return str.replace(/^\s+|\s+$/g, "");
          };
          _ref = headerLines.reverse();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            line = _ref[_i];
            idx = line.indexOf(":");
            headers[trim(line.substring(0, idx))] = trim(line.substring(idx + 1));
          }
          body = "";
          start = divider + 2;
          if (headers["content-length"]) {
            len = parseInt(headers["content-length"]);
            body = ("" + data).substring(start, start + len);
          } else {
            chr = null;
            for (i = _j = start, _ref1 = data.length; start <= _ref1 ? _j < _ref1 : _j > _ref1; i = start <= _ref1 ? ++_j : --_j) {
              chr = data.charAt(i);
              if (chr === Byte.NULL) {
                break;
              }
              body += chr;
            }
          }
          return new Frame2(command, headers, body);
        };
        Frame2.unmarshall = function(datas) {
          var data;
          return function() {
            var _i, _len, _ref, _results;
            _ref = datas.split(RegExp("" + Byte.NULL + Byte.LF + "*"));
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              data = _ref[_i];
              if ((data != null ? data.length : void 0) > 0) {
                _results.push(unmarshallSingle(data));
              }
            }
            return _results;
          }();
        };
        Frame2.marshall = function(command, headers, body) {
          var frame;
          frame = new Frame2(command, headers, body);
          return frame.toString() + Byte.NULL;
        };
        return Frame2;
      }();
      Client = function() {
        var now;
        function Client2(ws) {
          this.ws = ws;
          this.ws.binaryType = "arraybuffer";
          this.counter = 0;
          this.connected = false;
          this.heartbeat = {
            outgoing: 1e4,
            incoming: 1e4
          };
          this.maxWebSocketFrameSize = 16 * 1024;
          this.subscriptions = {};
        }
        Client2.prototype.debug = function(message) {
          var _ref;
          return typeof window !== "undefined" && window !== null ? (_ref = window.console) != null ? _ref.log(message) : void 0 : void 0;
        };
        now = function() {
          if (Date.now) {
            return Date.now();
          } else {
            return (/* @__PURE__ */ new Date()).valueOf;
          }
        };
        Client2.prototype._transmit = function(command, headers, body) {
          var out;
          out = Frame.marshall(command, headers, body);
          if (typeof this.debug === "function") {
            this.debug(">>> " + out);
          }
          while (true) {
            if (out.length > this.maxWebSocketFrameSize) {
              this.ws.send(out.substring(0, this.maxWebSocketFrameSize));
              out = out.substring(this.maxWebSocketFrameSize);
              if (typeof this.debug === "function") {
                this.debug("remaining = " + out.length);
              }
            } else {
              return this.ws.send(out);
            }
          }
        };
        Client2.prototype._setupHeartbeat = function(headers) {
          var serverIncoming, serverOutgoing, ttl, v, _ref, _ref1;
          if ((_ref = headers.version) !== Stomp.VERSIONS.V1_1 && _ref !== Stomp.VERSIONS.V1_2) {
            return;
          }
          _ref1 = function() {
            var _i, _len, _ref12, _results;
            _ref12 = headers["heart-beat"].split(",");
            _results = [];
            for (_i = 0, _len = _ref12.length; _i < _len; _i++) {
              v = _ref12[_i];
              _results.push(parseInt(v));
            }
            return _results;
          }(), serverOutgoing = _ref1[0], serverIncoming = _ref1[1];
          if (!(this.heartbeat.outgoing === 0 || serverIncoming === 0)) {
            ttl = Math.max(this.heartbeat.outgoing, serverIncoming);
            if (typeof this.debug === "function") {
              this.debug("send PING every " + ttl + "ms");
            }
            this.pinger = Stomp.setInterval(ttl, function(_this) {
              return function() {
                _this.ws.send(Byte.LF);
                return typeof _this.debug === "function" ? _this.debug(">>> PING") : void 0;
              };
            }(this));
          }
          if (!(this.heartbeat.incoming === 0 || serverOutgoing === 0)) {
            ttl = Math.max(this.heartbeat.incoming, serverOutgoing);
            if (typeof this.debug === "function") {
              this.debug("check PONG every " + ttl + "ms");
            }
            return this.ponger = Stomp.setInterval(ttl, function(_this) {
              return function() {
                var delta;
                delta = now() - _this.serverActivity;
                if (delta > ttl * 2) {
                  if (typeof _this.debug === "function") {
                    _this.debug("did not receive server activity for the last " + delta + "ms");
                  }
                  return _this.ws.close();
                }
              };
            }(this));
          }
        };
        Client2.prototype._parseConnect = function() {
          var args, connectCallback, errorCallback, headers;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          headers = {};
          switch (args.length) {
            case 2:
              headers = args[0], connectCallback = args[1];
              break;
            case 3:
              if (args[1] instanceof Function) {
                headers = args[0], connectCallback = args[1], errorCallback = args[2];
              } else {
                headers.login = args[0], headers.passcode = args[1], connectCallback = args[2];
              }
              break;
            case 4:
              headers.login = args[0], headers.passcode = args[1], connectCallback = args[2], errorCallback = args[3];
              break;
            default:
              headers.login = args[0], headers.passcode = args[1], connectCallback = args[2], errorCallback = args[3], headers.host = args[4];
          }
          return [headers, connectCallback, errorCallback];
        };
        Client2.prototype.connect = function() {
          var args, errorCallback, headers, out;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          out = this._parseConnect.apply(this, args);
          headers = out[0], this.connectCallback = out[1], errorCallback = out[2];
          if (typeof this.debug === "function") {
            this.debug("Opening Web Socket...");
          }
          this.ws.onmessage = function(_this) {
            return function(evt) {
              var arr, c, client, data, frame, messageID, onreceive, subscription, _i, _len, _ref, _results;
              data = typeof ArrayBuffer !== "undefined" && evt.data instanceof ArrayBuffer ? (arr = new Uint8Array(evt.data), typeof _this.debug === "function" ? _this.debug("--- got data length: " + arr.length) : void 0, function() {
                var _i2, _len2, _results2;
                _results2 = [];
                for (_i2 = 0, _len2 = arr.length; _i2 < _len2; _i2++) {
                  c = arr[_i2];
                  _results2.push(String.fromCharCode(c));
                }
                return _results2;
              }().join("")) : evt.data;
              _this.serverActivity = now();
              if (data === Byte.LF) {
                if (typeof _this.debug === "function") {
                  _this.debug("<<< PONG");
                }
                return;
              }
              if (typeof _this.debug === "function") {
                _this.debug("<<< " + data);
              }
              _ref = Frame.unmarshall(data);
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                frame = _ref[_i];
                switch (frame.command) {
                  case "CONNECTED":
                    if (typeof _this.debug === "function") {
                      _this.debug("connected to server " + frame.headers.server);
                    }
                    _this.connected = true;
                    _this._setupHeartbeat(frame.headers);
                    _results.push(typeof _this.connectCallback === "function" ? _this.connectCallback(frame) : void 0);
                    break;
                  case "MESSAGE":
                    subscription = frame.headers.subscription;
                    onreceive = _this.subscriptions[subscription] || _this.onreceive;
                    if (onreceive) {
                      client = _this;
                      messageID = frame.headers["message-id"];
                      frame.ack = function(headers2) {
                        if (headers2 == null) {
                          headers2 = {};
                        }
                        return client.ack(messageID, subscription, headers2);
                      };
                      frame.nack = function(headers2) {
                        if (headers2 == null) {
                          headers2 = {};
                        }
                        return client.nack(messageID, subscription, headers2);
                      };
                      _results.push(onreceive(frame));
                    } else {
                      _results.push(typeof _this.debug === "function" ? _this.debug("Unhandled received MESSAGE: " + frame) : void 0);
                    }
                    break;
                  case "RECEIPT":
                    _results.push(typeof _this.onreceipt === "function" ? _this.onreceipt(frame) : void 0);
                    break;
                  case "ERROR":
                    _results.push(typeof errorCallback === "function" ? errorCallback(frame) : void 0);
                    break;
                  default:
                    _results.push(typeof _this.debug === "function" ? _this.debug("Unhandled frame: " + frame) : void 0);
                }
              }
              return _results;
            };
          }(this);
          this.ws.onclose = function(_this) {
            return function() {
              var msg;
              msg = "Whoops! Lost connection to " + _this.ws.url;
              if (typeof _this.debug === "function") {
                _this.debug(msg);
              }
              _this._cleanUp();
              return typeof errorCallback === "function" ? errorCallback(msg) : void 0;
            };
          }(this);
          return this.ws.onopen = function(_this) {
            return function() {
              if (typeof _this.debug === "function") {
                _this.debug("Web Socket Opened...");
              }
              headers["accept-version"] = Stomp.VERSIONS.supportedVersions();
              headers["heart-beat"] = [_this.heartbeat.outgoing, _this.heartbeat.incoming].join(",");
              return _this._transmit("CONNECT", headers);
            };
          }(this);
        };
        Client2.prototype.disconnect = function(disconnectCallback, headers) {
          if (headers == null) {
            headers = {};
          }
          this._transmit("DISCONNECT", headers);
          this.ws.onclose = null;
          this.ws.close();
          this._cleanUp();
          return typeof disconnectCallback === "function" ? disconnectCallback() : void 0;
        };
        Client2.prototype._cleanUp = function() {
          this.connected = false;
          if (this.pinger) {
            Stomp.clearInterval(this.pinger);
          }
          if (this.ponger) {
            return Stomp.clearInterval(this.ponger);
          }
        };
        Client2.prototype.send = function(destination, headers, body) {
          if (headers == null) {
            headers = {};
          }
          if (body == null) {
            body = "";
          }
          headers.destination = destination;
          return this._transmit("SEND", headers, body);
        };
        Client2.prototype.subscribe = function(destination, callback, headers) {
          var client;
          if (headers == null) {
            headers = {};
          }
          if (!headers.id) {
            headers.id = "sub-" + this.counter++;
          }
          headers.destination = destination;
          this.subscriptions[headers.id] = callback;
          this._transmit("SUBSCRIBE", headers);
          client = this;
          return {
            id: headers.id,
            unsubscribe: function() {
              return client.unsubscribe(headers.id);
            }
          };
        };
        Client2.prototype.unsubscribe = function(id) {
          delete this.subscriptions[id];
          return this._transmit("UNSUBSCRIBE", {
            id
          });
        };
        Client2.prototype.begin = function(transaction) {
          var client, txid;
          txid = transaction || "tx-" + this.counter++;
          this._transmit("BEGIN", {
            transaction: txid
          });
          client = this;
          return {
            id: txid,
            commit: function() {
              return client.commit(txid);
            },
            abort: function() {
              return client.abort(txid);
            }
          };
        };
        Client2.prototype.commit = function(transaction) {
          return this._transmit("COMMIT", {
            transaction
          });
        };
        Client2.prototype.abort = function(transaction) {
          return this._transmit("ABORT", {
            transaction
          });
        };
        Client2.prototype.ack = function(messageID, subscription, headers) {
          if (headers == null) {
            headers = {};
          }
          headers["message-id"] = messageID;
          headers.subscription = subscription;
          return this._transmit("ACK", headers);
        };
        Client2.prototype.nack = function(messageID, subscription, headers) {
          if (headers == null) {
            headers = {};
          }
          headers["message-id"] = messageID;
          headers.subscription = subscription;
          return this._transmit("NACK", headers);
        };
        return Client2;
      }();
      Stomp = {
        VERSIONS: {
          V1_0: "1.0",
          V1_1: "1.1",
          V1_2: "1.2",
          supportedVersions: function() {
            return "1.1,1.0";
          }
        },
        client: function(url, protocols) {
          var klass, ws;
          if (protocols == null) {
            protocols = ["v10.stomp", "v11.stomp"];
          }
          klass = Stomp.WebSocketClass || WebSocket;
          ws = new klass(url, protocols);
          return new Client(ws);
        },
        over: function(ws) {
          return new Client(ws);
        },
        Frame
      };
      if (typeof exports !== "undefined" && exports !== null) {
        exports.Stomp = Stomp;
      }
      if (typeof window !== "undefined" && window !== null) {
        Stomp.setInterval = function(interval, f) {
          return window.setInterval(f, interval);
        };
        Stomp.clearInterval = function(id) {
          return window.clearInterval(id);
        };
        window.Stomp = Stomp;
      } else if (!exports) {
        self.Stomp = Stomp;
      }
    }).call(exports);
  }
});

// browser-external:net
var require_net = __commonJS({
  "browser-external:net"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "net" has been externalized for browser compatibility. Cannot access "net.${key}" in client code. See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/es5-ext/global.js
var require_global = __commonJS({
  "node_modules/es5-ext/global.js"(exports, module) {
    var naiveFallback = function() {
      if (typeof self === "object" && self)
        return self;
      if (typeof window === "object" && window)
        return window;
      throw new Error("Unable to resolve global `this`");
    };
    module.exports = function() {
      if (this)
        return this;
      if (typeof globalThis === "object" && globalThis)
        return globalThis;
      try {
        Object.defineProperty(Object.prototype, "__global__", {
          get: function() {
            return this;
          },
          configurable: true
        });
      } catch (error) {
        return naiveFallback();
      }
      try {
        if (!__global__)
          return naiveFallback();
        return __global__;
      } finally {
        delete Object.prototype.__global__;
      }
    }();
  }
});

// node_modules/websocket/package.json
var require_package = __commonJS({
  "node_modules/websocket/package.json"(exports, module) {
    module.exports = {
      name: "websocket",
      description: "Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.",
      keywords: [
        "websocket",
        "websockets",
        "socket",
        "networking",
        "comet",
        "push",
        "RFC-6455",
        "realtime",
        "server",
        "client"
      ],
      author: "Brian McKelvey <theturtle32@gmail.com> (https://github.com/theturtle32)",
      contributors: [
        "Iñaki Baz Castillo <ibc@aliax.net> (http://dev.sipdoc.net)"
      ],
      version: "1.0.34",
      repository: {
        type: "git",
        url: "https://github.com/theturtle32/WebSocket-Node.git"
      },
      homepage: "https://github.com/theturtle32/WebSocket-Node",
      engines: {
        node: ">=4.0.0"
      },
      dependencies: {
        bufferutil: "^4.0.1",
        debug: "^2.2.0",
        "es5-ext": "^0.10.50",
        "typedarray-to-buffer": "^3.1.5",
        "utf-8-validate": "^5.0.2",
        yaeti: "^0.0.6"
      },
      devDependencies: {
        "buffer-equal": "^1.0.0",
        gulp: "^4.0.2",
        "gulp-jshint": "^2.0.4",
        "jshint-stylish": "^2.2.1",
        jshint: "^2.0.0",
        tape: "^4.9.1"
      },
      config: {
        verbose: false
      },
      scripts: {
        test: "tape test/unit/*.js",
        gulp: "gulp"
      },
      main: "index",
      directories: {
        lib: "./lib"
      },
      browser: "lib/browser.js",
      license: "Apache-2.0"
    };
  }
});

// node_modules/websocket/lib/version.js
var require_version = __commonJS({
  "node_modules/websocket/lib/version.js"(exports, module) {
    module.exports = require_package().version;
  }
});

// node_modules/websocket/lib/browser.js
var require_browser = __commonJS({
  "node_modules/websocket/lib/browser.js"(exports, module) {
    var _globalThis;
    if (typeof globalThis === "object") {
      _globalThis = globalThis;
    } else {
      try {
        _globalThis = require_global();
      } catch (error) {
      } finally {
        if (!_globalThis && typeof window !== "undefined") {
          _globalThis = window;
        }
        if (!_globalThis) {
          throw new Error("Could not determine global this");
        }
      }
    }
    var NativeWebSocket = _globalThis.WebSocket || _globalThis.MozWebSocket;
    var websocket_version = require_version();
    function W3CWebSocket(uri, protocols) {
      var native_instance;
      if (protocols) {
        native_instance = new NativeWebSocket(uri, protocols);
      } else {
        native_instance = new NativeWebSocket(uri);
      }
      return native_instance;
    }
    if (NativeWebSocket) {
      ["CONNECTING", "OPEN", "CLOSING", "CLOSED"].forEach(function(prop) {
        Object.defineProperty(W3CWebSocket, prop, {
          get: function() {
            return NativeWebSocket[prop];
          }
        });
      });
    }
    module.exports = {
      "w3cwebsocket": NativeWebSocket ? W3CWebSocket : null,
      "version": websocket_version
    };
  }
});

// node_modules/stompjs/lib/stomp-node.js
var require_stomp_node = __commonJS({
  "node_modules/stompjs/lib/stomp-node.js"(exports) {
    (function() {
      var Stomp, net, overTCP, overWS, wrapTCP, wrapWS;
      Stomp = require_stomp();
      net = require_net();
      Stomp.Stomp.setInterval = function(interval, f) {
        return setInterval(f, interval);
      };
      Stomp.Stomp.clearInterval = function(id) {
        return clearInterval(id);
      };
      wrapTCP = function(port, host) {
        var socket, ws;
        socket = null;
        ws = {
          url: "tcp:// " + host + ":" + port,
          send: function(d) {
            return socket.write(d);
          },
          close: function() {
            return socket.end();
          }
        };
        socket = net.connect(port, host, function(e) {
          return ws.onopen();
        });
        socket.on("error", function(e) {
          return typeof ws.onclose === "function" ? ws.onclose(e) : void 0;
        });
        socket.on("close", function(e) {
          return typeof ws.onclose === "function" ? ws.onclose(e) : void 0;
        });
        socket.on("data", function(data) {
          var event;
          event = {
            "data": data.toString()
          };
          return ws.onmessage(event);
        });
        return ws;
      };
      wrapWS = function(url) {
        var WebSocketClient, connection, socket, ws;
        WebSocketClient = require_browser().client;
        connection = null;
        ws = {
          url,
          send: function(d) {
            return connection.sendUTF(d);
          },
          close: function() {
            return connection.close();
          }
        };
        socket = new WebSocketClient();
        socket.on("connect", function(conn) {
          connection = conn;
          ws.onopen();
          connection.on("error", function(error) {
            return typeof ws.onclose === "function" ? ws.onclose(error) : void 0;
          });
          connection.on("close", function() {
            return typeof ws.onclose === "function" ? ws.onclose() : void 0;
          });
          return connection.on("message", function(message) {
            var event;
            if (message.type === "utf8") {
              event = {
                "data": message.utf8Data
              };
              return ws.onmessage(event);
            }
          });
        });
        socket.connect(url);
        return ws;
      };
      overTCP = function(host, port) {
        var socket;
        socket = wrapTCP(port, host);
        return Stomp.Stomp.over(socket);
      };
      overWS = function(url) {
        var socket;
        socket = wrapWS(url);
        return Stomp.Stomp.over(socket);
      };
      exports.overTCP = overTCP;
      exports.overWS = overWS;
    }).call(exports);
  }
});

// node_modules/stompjs/index.js
var require_stompjs = __commonJS({
  "node_modules/stompjs/index.js"(exports, module) {
    var Stomp = require_stomp();
    var StompNode = require_stomp_node();
    module.exports = Stomp.Stomp;
    module.exports.overTCP = StompNode.overTCP;
    module.exports.overWS = StompNode.overWS;
  }
});
export default require_stompjs();
//# sourceMappingURL=stompjs.js.map
