/**
 * 确认询问框
 */
var uiEx;

(function (uiEx) {
    var Confirm = (function (_super) {
        function Confirm() {
            Confirm.super(this);
            this.scaleX = 0.5;
            this.scaleY = 0.5;
            this.handBack = null;
            this.btnOk.on(Laya.Event.CLICK, this, this.onOkClick);
            this.btnCancel.on(Laya.Event.CLICK, this, this.onCancelClick);
            this.zOrder = 900;
        }
        Laya.class(Confirm, "uiEx.Confirm", _super);
        var _proto = Confirm.prototype;

        _proto.onClose = function() {
            
        }

        _proto.onOpen = function() {
            mod.Tween.showOpen(this);
        }

        _proto.open = function() {
            this.visible = true;
            this.onOpen();
        }

        _proto.close = function() {
            mod.Tween.showClose(this, Laya.Handler.create(this, this._hide));
            this.onClose();
        }

        _proto._hide = function() {
            this.visible = false;
        }

        _proto.show = function(arrMsg, handBack) {
            var str = "";
            if (typeof(arrMsg) == "string") {
                str = arrMsg;
            } else {
                str = arrMsg.join("\n\n");
            }
            this.lblMsg.text = str;
            this.handBack = handBack;
        }

        _proto.onOkClick = function() {
            if (this.handBack) {
                this.handBack.run();
            }
            this.close();
        }

        _proto.onCancelClick = function() {
            this.close();
        }
        return Confirm;
    }(ui.confirm01UI));

    var MsgBox = (function (_super) {
        function MsgBox() {
            MsgBox.super(this);
            this.btnOk.on(Laya.Event.CLICK, this, this.close);
            this.zOrder = 910;
            this.scaleX = 0.5;
            this.scaleY = 0.5;
        }
        Laya.class(MsgBox, "uiEx.MsgBox", _super);
        var _proto = MsgBox.prototype;

        _proto.onClose = function() {}

        _proto.onOpen = function() {
            mod.Tween.showOpen(this);
        }

        _proto.open = function() {
            this.visible = true;
            this.onOpen();
        }

        _proto.close = function() {
            mod.Tween.showClose(this, Laya.Handler.create(this, this._hide));
            this.onClose();
        }

        _proto._hide = function() {
            this.visible = false;
        }

        _proto.show = function(arrMsg) {
            var str = "";
            if (typeof(arrMsg) == "string") {
                str = arrMsg;
            } else {
                str = arrMsg.join("\n\n");
            }
            this.lblMsg.text = str;
        }
        return MsgBox;
    }(ui.confirm02UI));

    /**
     * 注册到窗口管理对象
     */
    mod.Wd.RegWindow(
        "confirm",
        function() { return new uiEx.Confirm(); },
        null
    );

    mod.Wd.RegWindow(
        "msgBox",
        function() { return new uiEx.MsgBox(); },
        null
    );

    uiEx.Confirm = Confirm;
    uiEx.MsgBox = MsgBox;

})(uiEx || (uiEx = {}))
