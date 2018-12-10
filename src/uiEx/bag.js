/**
* name 
*/
var uiEx;
(function (uiEx) {
    var bag = (function (_super) {
        function bag() {   
            bag.super(this);
            this.visible = false;
            this.btnClose.on(Laya.Event.CLICK, this, this.close);
        }
        Laya.class(bag, "uiEx.bag", _super);
        var _proto = bag.prototype;

        _proto.onOpen = function(){
            this.scaleX = 0.5;
            this.scaleY = 0.5;
            // 显示打开动画
            mod.Tween.showOpen(this);
        }

        /**
         * 关闭窗口
         */
        _proto.close = function(){
            // 显示关闭动画
            mod.Tween.showClose(this, Laya.Handler.create(this, this._hide));
        }

        _proto._hide = function(){
            this.visible = false;
        }

        /**
         * 注册到窗口管理
         */
        mod.Wd.RegWindow(
            "bag",
            function(){ return new uiEx.bag(); },
            [{url: "res/atlas/comp.json", type: Laya.Loader.ATLAS}]
        );

        return bag;
    }(ui.bagUI));

    uiEx.bag = bag;
})(uiEx || (uiEx = {}));
