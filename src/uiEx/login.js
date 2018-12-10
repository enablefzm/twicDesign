/**
* name 
*/
var uiEx;
(function (uiEx) {
    var Login = (function (_super) {
        var K_UID = "uid";
        var K_PWD = 'pwd';
        function Login() {
            Login.super(this);
            this.btnLogin.on(Laya.Event.CLICK, this, function() {
                // 执行登入操作
                if (conn.C.GetWebSocket().connected) {
                    this.doLogin();
                } else {
                    conn.C.GetWebSocket().once(Laya.Event.OPEN, this, this.doLogin);
                    conn.RenewConnect();
                }
            });
            this._getLocalDb();
        }
        Laya.class(Login, "uiEx.Login", _super);
        var _proto = Login.prototype;

        // 显示界面
        _proto._getLocalDb = function() {
            // 获取LocalDB是否有保存数据
            var uid = Laya.LocalStorage.getItem(K_UID);
            var pwd = Laya.LocalStorage.getItem(K_PWD);
            if (uid == null)
                uid = "";
            if (pwd == null)
                pwd = "";
            this.txtUid.text = uid;
            this.txtPwd.text = pwd;
        }

        _proto.show = function() {
            this.visible = true;
        }
        
        _proto.hide = function() {
            this.visible = false;
        }

        _proto.showMsg = function(msg) {
            this.msg.text = msg;
        }

        _proto.doLogin = function() {
            if (conn.C.GetWebSocket().connected) {
                conn.C.Send("login " + this.txtUid.text + " " + this.txtPwd.text);
                // 保存到当前临时数所
                var localDb = Laya.LocalStorage;
                var tUid = localDb.getItem(K_UID);
                var tPwd = localDb.getItem(K_PWD);
                if (tUid != this.txtUid.text) {
                    localDb.setItem(K_UID, this.txtUid.text);
                }
                if (tPwd != this.txtPwd.text) {
                    localDb.setItem(K_PWD, this.txtPwd.text);
                }
            } else {
                this.showMsg("还未连接");
            }
        }

        /**
         * 注册到窗口管理对象
         */
        mod.Wd.RegWindow(
            "login",
            function() { return new uiEx.Login(); },
            [ {url: "res/atlas/login.json", type: Laya.Loader.ATLAS}]
        );
        return Login;
    }(ui.loginUI));
    uiEx.Login = Login;
})(uiEx || (uiEx = {}));