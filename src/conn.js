/**
* name 
*/
var conn;
(function (conn) {
    var Connect = (function () {
        function Connect(serverIP, serverPort, isLink) {
            this.serverIP = serverIP;
            this.serverPort = serverPort;
            if (isLink) {
                this.sock = new Laya.Socket(serverIP, serverPort);
            } else {
                this.sock = new Laya.Socket();
            }
            // 连接成功事件
            this.sock.on(Laya.Event.OPEN, this, this.onSocketOpen);
            // 关闭事件
            this.sock.on(Laya.Event.CLOSE, this, this.onSocketClose);
            // 收到消息事件
            this.sock.on(Laya.Event.MESSAGE, this, this.onSocketMessage);
            // 错误事件
            this.sock.on(Laya.Event.ERROR, this, this.onSocketError);
            console.log(serverIP, serverPort, isLink);
        }
        var _proto = Connect.prototype;
        _proto.onSocketOpen = function() {
            console.log("Link ok");
        }
        _proto.onSocketClose = function() {
            console.log("link close");
        }
        _proto.onSocketMessage = function(message) {
            // console.log("Reveived:", message);
        }
        _proto.onSocketError = function(e) {
            console.log("link error: ", e);
        }
        _proto.send = function(cmd) {
            this.sock.send(cmd);
        }
        _proto.link = function() {
            this.sock.connectByUrl("ws://" + this.serverIP + ":" + this.serverPort);
        }
        _proto.GetSocket = function() {
            return this.sock;
        }
        return Connect;
    }());
    conn.Connect = Connect;
})(conn || (conn = {}));

/**
 * 
 */
(function (conn) {
    var TribeConnect = (function () {
        function TribeConnect(serverIp, serverPort) {
            this.conn = new conn.Connect(serverIp, serverPort, true);
        }
        var _proto = TribeConnect.prototype;
        // 获取WebSocket对象
        _proto.GetWebSocket = function() {
            return this.conn.GetSocket();
        };
        _proto.Send = function(cmd) {
            this.conn.send(cmd);
        };
        _proto.connect = function(serverIp, serverPort) {
            this.GetWebSocket().connectByUrl("ws://" + serverIp + ":" + serverPort);
        }
        return TribeConnect;
    }());

    conn.TribeConnect = TribeConnect;
    conn.C = null;
    conn.ServerIP = null;
    conn.ServerPort = null;
    conn.CreateConn = function(serverIp, serverPort) {
        conn.ServerIP = serverIp;
        conn.ServerPort = serverPort;
        conn.C = new conn.TribeConnect(conn.ServerIP, conn.ServerPort);
    };

    // 恢复重连
    conn.RenewConnect = function() {
        if (this.C == null)
            return;
        this.C.connect(this.ServerIP, this.ServerPort);
    };

    /**
     * 非阻塞通信
     */
    conn.Send = function(cmd) {
        console.log("发送命令：", cmd);
        this.C.Send(cmd);
    };

    /**
     * 阻塞通信
     */
    conn.blockSend = function(cmd, hadBack) {
        console.log("阻塞发送：", cmd);
        this.C.Send(cmd);
    }

})(conn || (conn = {}));
