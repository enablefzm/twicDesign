/**
 * 狼来了游戏的主入口
 */

// 微信小游戏的初始化
Laya.MiniAdpter.init();

// 初始化屏幕生成游戏界面
Laya.init(750, 1334, Laya.WebGL);

(function () {
    (function () {        
        // 缩化模式显示全部
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_AUTO;
        // 水平居中
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        // 垂直居中
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        // 设定背景
        Laya.stage.bgColor = "#EAEAEA";
        // 加载资源
        Laya.loader.load([{url: "res/atlas/load.json", type: Laya.Loader.ATLAS}], Laya.Handler.create(this, onAssetLoad));
    })();

    function onAssetLoad() {
        console.log("Loader ok");
        var uiLoad = new uiEx.Load();
        Laya.stage.addChild(uiLoad);
        uiLoad.loadAssets([
            {url: "res/atlas/comp.json",      type: Laya.Loader.ATLAS},
            {url: "res/atlas/comp/load.json", type: Laya.Loader.ATLAS}
        ], Laya.Handler.create(this, onLoadSuccess));
    }

    function onLoadSuccess() {
        var uiHome = new uiEx.Home();
        Laya.stage.addChild(uiHome);
    }

})();
