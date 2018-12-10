/**
* name 
*/
var uiEx;
(function (uiEx) {
    var machining = (function (_super) {
        function machining(){
            machining.super(this);
            this.visible = false;
            this.btnClose.on(Laya.Event.CLICK, this, this.close);
        }        
        
        Laya.class(machining, "uiEx.machining", _super);
        var _proto = machining.prototype ;

        _proto.onOpen = function() {
            this.scaleX = 0.5;
            this.scaleY = 0.5;
            // 显示打开的动画
            mod.Tween.showOpen(this);
        }

        /**
         * 关闭窗口
         */
        _proto.close = function() {
            // 显示关闭的动画
            mod.Tween.showClose(this, Laya.Handler.create(this, this._hide));
        }

        _proto._hide = function() {
            this.visible = false;
        }

        /**
         * 注册到窗口管理
         */
        mod.Wd.RegWindow(
            "machining", 
            function() { return new uiEx.machining(); }, 
            [{url: "res/atlas/comp.json", type: Laya.Loader.ATLAS}]
        );

        return machining;
    }(ui.machiningUI));

    uiEx.machining = machining;
})(uiEx || (uiEx = {}));
