/**
 * 始初加载页面
 */
var uiEx;
(function (uiEx) {
    var Load = (function(_super) {
        function Load() {
            Load.super(this);
            this.callBack = null;
        }
        Laya.class(Load, "uiEx.Load", _super);
        var _proto = Load.prototype;

        /**
         * 执行预加载图片资源
         * @param {Array}        arrAssets   要被加载的图片资源
         * @param {Laya.Handler} callBack    加载成功后要执行的回调函数
         */
        _proto.loadAssets = function(arrAssets, callBack) {
            this.callBack = callBack;
            Laya.loader.load(arrAssets, null, Laya.Handler.create(this, this.onChange, null, false));
        }

        _proto.onChange = function(value) {
            this.probar.value = value;
            if (this.probar.value >= 1) {
                // console.log("移除自己");
                Laya.stage.removeChild(this);
                if (this.callBack != null) {
                    // this.callBack.runWith(["ok", "ok2"]);
                    this.callBack.run();
                }
            }
        }

        return Load;
    })(ui.loadUI)
    uiEx.Load = Load;

    // 置后加载文件
    uiEx.LoadLast = (function(_super) {
        function LoadLast() {
            LoadLast.super(this);
            this.zOrder = 1000;
            this.callFunc = null;
        }
        Laya.class(LoadLast, "uiEx.LoadLast", _super);
        var _proto = LoadLast.prototype;

        // 加载窗口所需要的资源
        //  @parames
        //      arrAssets   Array       需要加载的资源
        //      func        function    需要回调的函数
        _proto.LoadAssets = function(arrAssets, func) {
            this.progress.value = 0.0;
            this.callFunc = func;
            this.visible = true;
            Laya.loader.load(arrAssets, null, Laya.Handler.create(this, this.onChange, null, false));
        }
        _proto.onChange = function(value) {
            this.progress.value = value;
            if (this.progress.value >= 1) {
                this.visible = false;
                if (this.callFunc != null) {
                    this.callFunc();
                }
            }
        }
        _proto.hide = function() {
            this.visible = false;
        }
        return LoadLast;
    })(ui.loadlastUI);
})(uiEx || (uiEx = {}))
