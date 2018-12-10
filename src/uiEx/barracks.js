/**
* name 
*/
var uiEx;
(function (uiEx) {
    var barracks = (function (_super) {
        function barracks() {
            barracks.super(this);
            this.visible = false;
            this.btnClose.on(Laya.Event.CLICK, this, this.close);
        }
        
        Laya.class(barracks, "uiEx.barracks", _super);
        var _proto = barracks.prototype;

        _proto.onOpen = function(){
            this.scalex = 0.5;
            this.scaleY = 0.5;
            //显示打开的动画
            mod.Tween.showOpen(this);
        }

        /**
         * 关闭窗口
         */
        _proto.close = function(){
            //显示关闭的动画
            mod.Tween.showClose(this, Laya.Handler.create(this, this._hide));
        }

        _proto._hide = function(){
            this.visible = false;
        }
        
        /**
         * 注册到窗口管理
         */
        mod.Wd.RegWindow(
            "barracks",
            function(){ return new uiEx.barracks(); },
            [{url: "res/atlas/comp.json", type: Laya.Loader.ATLAS}]
        );

        return barracks;
    }(ui.barracksUI));

    uiEx.barracks = barracks;
})(uiEx || (uiEx = {}));
