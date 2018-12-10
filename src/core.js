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
        // 自动坚屏
        Laya.stage.screenMode =  Laya.Stage.SCREEN_VERTICAL;
        // 设定背景
        Laya.stage.bgColor = "#EAEAEA";
        // 设定背景音乐的大小
        Laya.SoundManager.setMusicVolume(0.2);
        // 设定音效音量的大小
        Laya.SoundManager.setSoundVolume(0.3);
        // 加载资源
        Laya.loader.load([{url: "res/atlas/load.json", type: Laya.Loader.ATLAS}], Laya.Handler.create(this, onAssetLoad));
    })();

    function onAssetLoad() {
        // console.log("Loader ok");
        var uiLoad = new uiEx.Load();
        Laya.stage.addChild(uiLoad);
        uiLoad.loadAssets([
            {url: "res/atlas/comp.json", type: Laya.Loader.ATLAS},
            {url: "res/atlas/comp/loadlast.json", type: Laya.Loader.ATLAS},
            {url: "res/atlas/template/butLevel/comp.json", type: Laya.Loader.ATLAS}
        ], Laya.Handler.create(this, onLoadSuccess));
    }

    function onLoadSuccess() {
        // 建立WebSocket连接
        conn.CreateConn("192.168.100.206", "6001");
        // conn.CreateConn("119.23.235.220", "6001");
        // 绑定建立连接成功时处理的对象
        conn.C.GetWebSocket().once(Laya.Event.OPEN, null, function() {
            var funcLinkMessage = function(message) {
                // 收到问候消息进行处理
                // TODO...
                mod.Wd.openWindow("login", function(obWin) {
                    db = JSON.parse(message);
                    obWin.showMsg(db.INFO); 
                });
                console.log("收到第一条欢迎信息：", message);

                // 正常绑定消息信息
                conn.C.GetWebSocket().on(Laya.Event.MESSAGE, null, function(message) {
                    mod.CmdResult.DoResult(message);
                });
            }
            conn.C.GetWebSocket().once(Laya.Event.MESSAGE, null, funcLinkMessage)
        });
        conn.C.GetWebSocket().on(Laya.Event.ERROR, null, onLinkError);
        conn.C.GetWebSocket().on(Laya.Event.CLOSE, null, onLinkClose);
    }

    function onLinkError(e) {
        console.log("无法连接", e.target.url);
        mod.Wd.openWindow("login", function(obOpen) {
            obOpen.showMsg("无法连接" + e.target.url);
        });
    }

    function onLinkClose() {
        // 清除所有对象
        mod.Wd.destroyAllWindow();
        // 清除所有时间跳动
        mod.Wd.openWindow("login", function(winLogin){
            if (winLogin) {
                winLogin.showMsg("连接断开了");
            }
        });
    }
})();
