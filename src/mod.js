/**
* 游戏服务器返回的命令消息会被这个对象（mod.CmdResult）处理
*   function RegFunc  注册各个命令消息返回的处理函数
*   function DoResult 执行返回的各个命令格式
*/
var mod;

/**
 * 命令返回管理
 *  mod.CmdResult
 */
(function (mod) {
    mod.CmdResult = {};
    mod.CmdResult.ArrFunc = {};
    // 注册对象
    mod.CmdResult.RegFunc = function(funcName, func) {
        // console.log("注册处理消处返回函数：", funcName);
        mod.CmdResult.ArrFunc[funcName] = func;
    };
    // 命令返回时调用的执行对象
    mod.CmdResult.DoResult = function(message) {
        // try {
        db = JSON.parse(message);
        console.log(db);
        if (db.CMD) {
            // 命令包里搜索是否有这个对象
            if (mod.CmdResult.ArrFunc[db.CMD]) {
                // 运行
                mod.CmdResult.ArrFunc[db.CMD](db);
            } else {
                // 这个命令在命令包里未被创建
                console.log("No cmd ", db.CMD);
            }
        } else {
            console.log("db error:", db);
        }
    };
})(mod || (mod = {}));

/**
 * 窗口管理对象
 *  mod.Wd
 */
(function (mod) {
    mod.Wd = {};

    // 保存窗口信息及构造方法
    //  格式 [objname, createFunc]
    mod.Wd.arrWins       = {};
    mod.Wd.arrLoadLast   = {};
    mod.Wd.obLoadLast    = null;
    mod.Wd.nowMainWindow = null;

    // 注册预加载资源
    //  @parames
    //      winName   string   窗口名称
    //      func      function 回调函数
    mod.Wd.regLoadLast = function(winName, arrSource) {
        // console.log("注册", winName, "的预加载资源");
        this.arrLoadLast[winName] = arrSource;
    }

    // 打开主窗口
    //  @parames
    //      winName   string   窗口名称
    //      func      function 回调函数
    mod.Wd.OpenMainWindow = function(winName, func) {
        if (this.nowMainWindow && this.nowMainWindow.visible == true) {
            this.nowMainWindow.visible = false;
            if (this.nowMainWindow.onClose) {
                this.nowMainWindow.onClose();
            }
        }
        this.openWindow(winName, function(obWin) {
            mod.Wd.nowMainWindow = obWin;
            if (func) {
                func(obWin);
            }
        });
    }

    // 将窗口对象注册到信息对象
    //  @parames
    //      winName     string      注册窗口的名称（唯一）
    //      func        function    构造该窗口的函数
    //      loadSource  Array       预加载资源
    mod.Wd.RegWindow = function(winName, func, loadSource) {
        // console.log("注册", winName, "到窗口管理");
        if (!mod.Wd.arrWins[winName]) {
            mod.Wd.arrWins[winName] = [null, func];
        }
        if (loadSource) {
            this.regLoadLast(winName, loadSource);
        }
    };

    // 打开指定的窗口
    //  @parames
    //      winName string                  窗口名称
    //      func    function(obWin, isnew)  回调函数
    mod.Wd.openWindow = function(winName, func) {
        this.GetWindow(winName, function(obWindow, isNew) {
            if (obWindow == null) 
                return;
            obWindow.visible = true;
            if (obWindow.onOpen) {
                obWindow.onOpen();
            }
            func(obWindow, isNew);
        });
    }

    // 获取窗口对象
    //  @parames
    //      winName string                  窗口名称
    //      func    function(obWin, isNew)  回调函数
    //      noAdd   bool                    不加载对象到Laya.stage场景里
    mod.Wd.GetWindow = function(winName, func, noAdd) {
        if (mod.Wd.arrWins[winName]) {
            var arr = this.arrWins[winName];
            if (arr[0]) {
                func(arr[0], false);
                return;
            }
            // 判断是否有预加载
            if (this.arrLoadLast[winName]) {
                var self = this;
                this.getLoadLast().LoadAssets(this.arrLoadLast[winName], function(){
                    self._getWindow(winName, func);
                });
            } else {
                this._getWindow(winName, func);
            }
        } 
    };

    // 私有调用获取窗口操作
    //  @parames
    //      winName string                  窗口名称
    //      func    function(obWin, isNew)  回调函数
    //      noAdd   bool                    不加载对象到Laya.stage场景里
    mod.Wd._getWindow = function(winName, func, noAdd) {
        var arr = mod.Wd.arrWins[winName];
        var isNew = false;
        if (arr[0] == null) {
            arr[0] = arr[1]();
            if (!noAdd)
                Laya.stage.addChild(arr[0]);
            isNew = true;
        }
        if (arr[0].onGet) {
            arr[0].onGet();
        }
        if (arr[0].onCreate) {
            arr[0].onCreate();
        }
        func(arr[0], isNew);
    };

    mod.Wd.getLoadLast = function() {
        if (!this.obLoadLast) {
            this.obLoadLast = new uiEx.LoadLast();
            Laya.stage.addChild(this.obLoadLast);
        }
        return this.obLoadLast;
    }

    // 销毁对象
    //  @parames
    //      winName string 窗口名称
    mod.Wd.DestroyWindow = function(winName) {
        this.GetWindow(winName, function(obWin){
            if (obWin == null) {
                return;
            }
            mod.Wd.arrWins[winName][0] = null;
            obWin.destroy();
        });
    };

    mod.Wd.destroyAllWindow = function() {
        if (mod.Wd.nowMainWindow) {
            if (mod.Wd.nowMainWindow.close) {
                mod.Wd.nowMainWindow.close();
            }
            mod.Wd.nowMainWindow = null;
        }
        // 清除所有窗口
        for (var k in mod.Wd.arrWins) {
            var obWin = mod.Wd.arrWins[k][0];
            if (obWin) {
                if (obWin.close) {
                    obWin.close();
                }
                mod.Wd.arrWins[k][0] = null;
                obWin.destroy();
                console.log("destroy ", k);
            }
        }
    }

})(mod || (mod = {}));

/**
 * 对象的运行时管理
 *  mod.RunTime
 */
(function (mod) {
    mod.RunTime = {};

    /**
     * 模版里的升级按钮
     */
    mod.RunTime.ButLevel = (function(_super) {

        /**
         * 升级的按钮
         * @param {string} butType 
         */
        function ButLevel(butType) {
            ButLevel.super(this);
            this.butType = butType;
            this.lblLv = null;
            this.butUp = null;
            this.imgLv = null;
            this.needGold = 0;
        }
        Laya.class(ButLevel, "mod.RunTime.ButLevel", _super);
        var _proto = ButLevel.prototype;
        
        /**
         * 初始化对象
         */
        _proto._init = function() {
            if (this.lblLv && this.butUp && this.imgLv) {
                return;
            }
            this.imgLv = this.getChildByName("imgLv");
            this.butUp = this.getChildByName("butUp");
            this.lblLv = this.imgLv.getChildByName("lblLv");
        }

        /**
         * 显示信息
         */
        _proto.showInfo = function(lv, needGold, nowGold) {
            this._init();
            this.lblLv.text = lv;
            this.needGold = needGold;
            if (nowGold > this.needGold) {
                this.butUp.visible = true;
            } else {
                this.butUp.visible = false;
            }
        }

        _proto.getButUp = function() {
            this._init();
            return this.butUp;
        }

        return ButLevel;
    })(Laya.Box)

    /**
     * 生产界面里的堆放物品的板
     */
    mod.RunTime.ProductionBorad = (function(_super){
        function ProductionBorad() {
            ProductionBorad.super(this);
            this.itemX = 50;
            this.itemY = -80;
            this.idx = 0;
            this.points = [null, null, null, null, null];
        }

        Laya.class(ProductionBorad, "mod.RunTime.ProductionBorad", _super);
        var _proto = ProductionBorad.prototype;

        /**
         * 刷新对象
         */
        _proto.initDb = function(obContainer) {
            // 清除当前的节点对象
            for (var i = 0; i < this.points.length; i++) {
                var t = this.points[i];
                if (t != null) {
                    this.removeChild(t);
                    Laya.Pool.recover("TITEM", t);
                    this.points[i] = null;
                }
            }
            // 索引值
            this.idx = 0;
            for (var k in obContainer.mpProduction) {
                if (this.idx >= 5) 
                    break;
                var value = obContainer.mpProduction[k];
                if (value > 0) {
                    this.createItem(k, value);
                    this.idx++;
                }
            }
        }

        // 创建生产队列木板上的物品
        _proto.createItem = function(productionType, productionValue) {
            // 通过缓存里获取
            var ob = Laya.Pool.getItemByCreateFun("TITEM", function() {
                var t = new mod.TObject.TItem();                    
                // 被添加到父节点时调度
                t.on(Laya.Event.ADDED, t, t.onAdded);
                // 被父节点称除时调度
                t.on(Laya.Event.REMOVED, t, t.onRemoved);
                // 收取信息
                t.on(Laya.Event.CLICK, t, function() {
                    // 发送收取物品资的命令
                    conn.Send("production harvest " + t.getItemType());
                });
                return t;
            });
            // console.log(productionType, productionValue);
            ob.initDb(productionType, productionValue);
            // 获得空位
            var point = this.getPoint();
            if (point > -1) {
                ob.idx = point;
                this.addChild(ob);
                this.points[point] = ob;
                ob.x = this.itemX + (point * (ob.width + 5));
                ob.y = this.itemY;
            }
            return ob;
        }

        // 获得当前空位
        _proto.getPoint = function() {
            for (var i = 0; i < this.points.length; i++) {
                if (this.points[i] == null)
                    return i;
            }
            return -1;
        }

        /**
         * 添加新物品到临时仓库
         * @param {int16} pType  物品类型ID
         * @param {int}   pValue 具体物品数量
         */
        _proto.putItem = function(pType, pValue) {
            // 创建一个可以被掉落的物品的图片
            var dropItem = dbs.Func.getDropItemOnCache();
            // 获得这个掉落物品对象的位置
            dropItem.x = 200;
            var myItem = this.getMyItem(pType);
            if (!myItem) {
                // 没有这个物品创建
                myItem = this.createItem(pType, 0);
            }
            dropItem.x = myItem.x + 20;
            dropItem.y = -130;
            dropItem.alpha = 0.5;
            dropItem.oblblHow.text = "+" + pValue;
            if (dropItem.skin != dbs.Func.getItemTypeImage(pType)) {
                dropItem.skin = dbs.Func.getItemTypeImage(pType);
            }
            this.addChild(dropItem);
            // 从缓存里获取时间线
            var tl = Laya.Pool.getItemByCreateFun("CTIMELINE", function() {
                var t = new Laya.TimeLine();
                return t;
            });
            // 建立侦听事件
            tl.once(Laya.Event.COMPLETE, this, this.onDropItemPlayComplete, [tl, dropItem, myItem, pValue]);
            tl.addLabel("SHOW", 0).to(dropItem, {alpha: 1}, 200)
              .addLabel("DOWN", 0).to(dropItem, {y: -60}, 800, Laya.Ease.backIn)
              .addLabel("HIDE", 0).to(dropItem, {alpha: 0}, 200);
            tl.play();
        }

        // 当动画播放完时执行
        _proto.onDropItemPlayComplete = function(tl, pImage, myItem, pValue) {
            tl.reset();
            Laya.Pool.recover("CTIMELINE", tl);
            // 从当前节点移除这个对象
            this.removeChild(pImage);
            // 显示增加的数量
            if (myItem) {
                myItem.addValue(pValue);
            }
        }

        /**
         * 显示物品从生产队列的物品栏上取出
         * @param {int} pType  要取出的类型
         * @param {int} pValue 要取出的数量
         */
        _proto.outItem = function(pType, pValue) {
            if (pValue < 1) 
                return;
            var myItem = this.getMyItem(pType);
            if (myItem) {
                myItem.addValue(pValue * -1, Laya.Handler.create(this, this.handCheckItemValue, [pType]));
                // 显示动画
                this.showOutItem(myItem.x, pType, pValue);
            }
        }
        
        _proto.handCheckItemValue = function(pType) {
            console.log("当前要检查的商品类型", pType);
            var myItem = this.getMyItem(pType);
            if (myItem != null && myItem.itemHow < 1) {
                // 执行删除操作
                this.removeChild(myItem);
                this.points[myItem.idx] = null;
                Laya.Pool.recover("TITEM", myItem);
            }
        }

        _proto.showOutItem = function(pointX, pType, pValue) {
            var how = 5;
            if (pValue < 2) {
                how = 1;
            } else if (pValue < 10) {
                pValue = 3;
            } 
            // 产生动画
            for (var i = 0; i < how; i++) {
                var pImage = Laya.Pool.getItemByCreateFun("OUTITEMIMG", function(){
                    var t = new Laya.Image();
                    t.width = 60;
                    t.height = 60;
                    t.on(Laya.Event.REMOVED, t, function(p) {
                        Laya.Pool.recover("OUTITEMIMG", p);
                    }, [t]);
                    return t;
                });
                // 获得时间线
                var tl = Laya.Pool.getItemByCreateFun("CTIMELINE", function() {
                    var t = new Laya.TimeLine();
                    return t;
                });
                // 定义位置
                pImage.x = pointX + 30;
                pImage.y = this.itemY;
                pImage.alpha = 1;
                // 加载图片
                if (pImage.skin != dbs.Func.getItemTypeImage(pType)) {
                    pImage.skin = dbs.Func.getItemTypeImage(pType);
                }
                this.addChild(pImage);
                var toX = pImage.x + mod.Fet.rand(-30, 30);
                var toY = pImage.y - mod.Fet.rand(70, 100);
                // 动画效果
                tl.once(Laya.Event.COMPLETE, this, this.onOutItemComplete, [tl, pImage]);
                tl.addLabel("SHOW", 0).to(pImage, {x: toX, y: toY}, 400, Laya.Ease.backOut)
                  .addLabel("DOWN", 0).to(pImage, {y: toY + 300, alpha: 0}, 500);
                tl.play();
            }
        }

        _proto.onOutItemComplete = function(tl, pImage) {
            tl.reset();
            Laya.Pool.recover("CTIMELINE", tl);
            this.removeChild(pImage);
        }

        /**
         * 获取指定的节点的对象
         */
        _proto.getMyItem = function(pType) {
            var myItem = null;
            for (var i = 0; i < this.points.length; i++) {
                myItem = this.points[i];
                if (myItem != null && myItem.itemType == pType) {
                    return myItem;
                }
            }
            return null;
        }

        return ProductionBorad;
    })(Laya.Image);

    /**
     * 生产界面里的销售商品确认窗口
     * 生产界面里的 confirmSell 的运行时
     */
    mod.RunTime.ConfirmSell = (function(_super) {
        function ConfirmSell() {
            ConfirmSell.super(this);
            this.scaleX = 0.5;
            this.scaleY = 0.5;
            this.itemHow = 0;
        }
        Laya.class(ConfirmSell, "mod.RunTime.ConfirmSell", _super);
        var _proto = ConfirmSell.prototype;

        _proto.mInit = function() {
            // 绑定事件
            this.btnCancel = this.getChildByName("btnCancel");
            this.btnCancel.on(Laya.Event.CLICK, this, this.close);
            this.btnOk = this.getChildByName("btnOk");
            this.btnOk.on(Laya.Event.CLICK, this, this.doSell);
            this.lblItemHow = this.getChildByName("lblItemHow");
            this.lblChangeHow = this.getChildByName("lblChangeHow");
            this.butUp = this.getChildByName("butUp");
            this.butDown = this.getChildByName("butDown");
            this.lblPrice = this.getChildByName("lblPrice");
            this.lblCountValue = this.getChildByName("lblCountValue");
            this.imgItem = this.getChildByName("imgItem");
        }

        /**
         * 显示出售的商品信息
         * @param {int} pType 要被出售的商品类型
         */
        _proto.openSell = function(pType) {
            this.visible = true;
            mod.Tween.showOpen(this);
            // 获取仓库里的商品信息
            var obWareHouse = dbs.obVillage.obWarehouse;
            this.pType = pType;
            this.itemHow = obWareHouse.getProductionValue(pType);
            this.changeHow = this.itemHow;
            // 获取图片
            this.imgItem.skin = dbs.Func.getItemTypeImage(pType);
            this.lblItemHow.text = this.itemHow;
            this._showInfo();
        }

        _proto._showInfo = function() {
            // 显示要具体要出售的商品信息
            this.lblChangeHow.text = this.changeHow;
            // 获取当前商品的单价
            var obProductionPrices = dbs.obVillage.obProductions.obProductionPrices;
            var price = obProductionPrices.getProductionPrice(this.pType);
            this.lblPrice.text = "单价：" + price;
            // 计算合计
            this.lblCountValue.text = Math.floor(price * this.changeHow);
        }

        _proto.close = function() {
            mod.Tween.showClose(this, Laya.Handler.create(this, this._hide));
        }

        _proto._hide = function() {
            this.visible = false;
        }

        _proto.doSell = function() {
            conn.Send("sell production " + this.pType + " " + this.changeHow);
            this.close();
        }

        return ConfirmSell;
    })(Laya.Box);

    /**
     * 生产中心里更换生产商品
     */
    mod.RunTime.SelectItem = (function(_super){
        function SelectItem() {
            SelectItem.super(this);
            this.lstItem = null;
        }
        Laya.class(SelectItem, "mod.RunTime.SelectItem", _super);
        var _proto = SelectItem.prototype;

        _proto.mInit = function() {
            this.lstItem = this.getChildByName("lstSelectItem");
            this.lstItem.hScrollBarSkin = "";
            this.lstItem.renderHandler = new Laya.Handler(this, this._lstHandRenew);
            this.lstItem.scrollBar.elasticBackTime = 150;
            this.lstItem.scrollBar.elasticDistance = 50;
        }
        _proto.open = function() {
            if (this.visible == true) {
                this.close();
            } else {
                this.visible = true;
            }
            this.onOpen();
        }
        _proto.close = function() {
            this.visible = false;
        }
        _proto.onOpen = function() {
            // 加载当前数据信息
            var obProductions = dbs.obVillage.obProductions;
            var obProductionPrices = obProductions.obProductionPrices;
            this.intList(obProductionPrices);
        }
        /**
         * 加载List可以选择的物品信息
         * @param {dbs.ProductionPrices} obProductionPrices 货币行情数据对象
         */
        _proto.intList = function(obProductionPrices) {
            var arr = obProductionPrices.arrProductionPrice;
            var data = [];
            for (var k in arr) {
                var ob = arr[k];
                data.push({
                    db: {pType: ob.getProductionType()},
                    imgItem: {skin: ob.getImage()},
                    lblNeedTime: {text: ob.getNeedTime() + "s"}
                });
            }
            this.lstItem.dataSource = data;
        }
        _proto._lstHandRenew = function(obCell, idx) {
            var btn = obCell.getChildByName("imgItem");
            btn.offAll(Laya.Event.CLICK);
            btn.on(Laya.Event.CLICK, this, this.onSelectClick, [obCell, idx]);
        }
        _proto.onSelectClick = function(obCell, idx) {
            this.close();
            conn.Send("production change " + obCell.dataSource.db.pType);
        }
        return SelectItem;
    })(Laya.Box);

    mod.RunTime.Curve = (function(_super) {
        function Curve() {
            Curve.super(this);
            this.scaleX = 0.5;
            this.scaleY = 0.5;
            this.on(Laya.Event.CLICK, this, this.onBoxClick);
            // 记录下一次刷新时间
            this.nextTime = 0;
            // 记录当前显示商品类型
            this.productionType = 0;
        }
        Laya.class(Curve, "mod.RunTime.Curve", _super);
        var _proto = Curve.prototype;

        // 运行时初始货
        _proto.mInit = function() {
            // 价格产品图片
            this.imgProduction = this.getChildByName("imgProduction");
            // 价格单价
            this.lblPrice = this.getChildByName("lblPrice");
            // 价格走势图标
            this.imgArow = this.getChildByName("imgArow");
            // 价格走势区域
            this.imgBox = this.getChildByName("imgBox");
            // 倒计时
            this.lblTime = this.getChildByName("lblTime");
        }

        _proto.open = function() {
            this.visible = true;
            mod.Tween.showOpen(this);
            this.onOpen();
        }

        _proto.onOpen = function() {
            
        }

        _proto.close = function() {
            mod.Tween.showClose(this, Laya.Handler.create(this, this._hide));
            this.onClose();
        }

        _proto._hide = function() {
            this.visible = false;
        }

        _proto.onClose = function() {
            this.stopRunTime();
        }

        _proto.onBoxClick = function(e) {
            e.stopPropagation();
            this.close();
        }

        /**
         * 显示当前价格的数组信息
         * @param {array} arrPriceValue 价格信息数组
         */
        _proto.showCurvePrice = function(arrPriceValue, topPrice, lowPrice) {
            // arrPriceValue = [1, 1.2, 1.3, 1.6, 1.5, 1.1, 0.8];
            // topPrice = null;
            // lowPrice = null;

            var iCount = arrPriceValue.length;
            var sliceValue = 10;
            if (iCount > sliceValue) {
                var iStart = iCount - sliceValue;
                arrPriceValue = arrPriceValue.slice(iStart);
            }
            // 判断最高位和最低位
            var isLowValue = 0;
            var isTopValue = 0;
            if (topPrice != null) 
                isTopValue = topPrice;
            if (lowPrice != null)
                isLowValue = lowPrice;
            if (isTopValue == 0 || isLowValue == 0) {
                for (var i = 0; i < arrPriceValue.length; i++) {
                    var v = arrPriceValue[i];
                    if (isLowValue == 0 || v < isLowValue) {
                        isLowValue = v;
                    }
                    if (isTopValue == 0 || v > isTopValue) {
                        isTopValue = v;
                    }
                }
            }
            // 计算需要的总高度
            var r = isTopValue - isLowValue;
            if (r == 0) 
                r = 1;
            // 计算高度的间距
            var hStep = 280 / r;
            // 计算价格走势的间距
            var step = 550 / arrPriceValue.length;
            var lastX = null;
            var lastY = null;
            // 将数组中的数值放置在节点上
            for (var i = 0; i < arrPriceValue.length; i ++) {
                // var v = Laya.Pool.getItemByCreateFun("CURVE_VAL", function() {
                //     var t = new mod.TObject.CurveValue();
                //     t.on(Laya.Event.REMOVED, null, function(argT) {
                //         Laya.Pool.recover("CURVE_VAL", argT);
                //         console.log(argT);
                //     }, [t]);
                //     console.log("构造了对象")
                //     return t;
                // });
                var v = new mod.TObject.CurveValue();
                v.setValue(arrPriceValue[i]);
                v.x = step * i + 30;
                v.y = 300 - (hStep * (arrPriceValue[i] - isLowValue));
                if (lastX != null) {
                    var l = new Laya.Sprite();
                    l.zOrder = 10;
                    l.graphics.drawLine(lastX, lastY, v.x + 5, v.y + 5, "#ff0000", 1);
                    this.imgBox.addChild(l);
                }
                v.zOrder = 20;
                this.imgBox.addChild(v);
                lastX = v.x + 5;
                lastY = v.y + 5;
            }
        }

        /**
         * 显示商品价格走势
         * @param {dbs.ProductionItemPrice} obPrice 商品类型
         */
        _proto.showInfo = function(obPrice) {
            // console.log(obPrice);
            // 记录当前的要查看的节点
            this.productionType = obPrice.getProductionType();
            // 记录当前的时间
            this.nextTime = obPrice.nextRenewTime;
            // 清除当前所有的价格走势的节点
            this.imgBox.destroyChildren();
            this.showCurvePrice(obPrice.logs, obPrice.topPrice, obPrice.lowPrice);
            // 显示当前当价
            this.lblPrice.text = obPrice.price;
            // 显示当前商品的图片
            this.imgProduction.skin = obPrice.getImage();
            // 显示距离下一次刷新的时间
            // this.lblTime.text = obPrice.nextRenewTime - mod.Fet.nowTime();
            if (obPrice.isUp == true) {
                this.imgArow.skin = "comp/icon_ss.png";
            } else {
                this.imgArow.skin = "comp/icon_ss2.png";
            }
            this.startRunTime();
        }

        _proto.runTime = function() {
            var t = this.nextTime - mod.Fet.nowTime();
            if (t <= 0) {
                t = 0;
                // 刷新数据对象
                // TODO...
                // 停止时间跳动
                this.stopRunTime();
            }
            // 格式化显示时间
            this.lblTime.text = mod.Fet.timeStr(t);
        }

        _proto.stopRunTime = function() {
            Laya.timer.clear(this, this.runTime);
        }

        _proto.startRunTime = function() {
            this.stopRunTime();
            Laya.timer.loop(1000, this, this.runTime);
            this.runTime();
        }

        _proto.checkIsOpen = function() {
            if (this.visible == true) {
                return true;
            } else {
                return false;
            }
        }

        return Curve;
    })(Laya.Box);

    /**
     * 主界面的生产进度条
     */
    mod.RunTime.HomeMakeProduction = (function(_super) {
        function HomeMakeProduction() {
            HomeMakeProduction.super(this);
            this.handProComplete = null;
            Laya.timer.frameOnce(2, this, this._init);
        }
        Laya.class(HomeMakeProduction, "mod.RunTime.HomeMakeProduction", _super);
        var _proto = HomeMakeProduction.prototype;
        _proto._init = function() {
            this.imgItem = this.getChildByName("imgItem");
            this.proMake = this.getChildByName("proMake");
            this.proMake.value = 0;
            // 生产满了标识
            this.imgFull = this.getChildByName("imgFull");
            // 设定时间线
            this.tl = new Laya.TimeLine();
            var nowX = this.imgItem.x;
            var nowY = this.imgItem.y;
            this.tl.addLabel("up", 0).to(this.imgItem, {y: nowY - 10}, 1300)
                   .addLabel("down", 0).to(this.imgItem, {y: nowY}, 1300);
            this.tl.play(0, true);
            this.on(Laya.Event.REMOVED, this, this.onRemoved);
            this.handProComplete = Laya.Handler.create(this, function(){
                this.setMarkValue(0);
            }, null, false);
        }
        _proto.setImgItem = function(imgPath) {
            if (!this.imgItem)
                this.imgItem = this.getChildByName("imgItem");
            this.imgItem.skin = imgPath;
        }
        _proto.setMarkValue = function(v) {
            if (!this.proMake)
                this.proMake = this.getChildByName("proMake");
            this.proMake.value = v;
        }
        _proto.onRemoved = function() {
            this.tl.destroy();
        }
        _proto.onProRuning = function(toSecond, needTime, productionValue) {
            var nextSecond = toSecond + 1;
            if (nextSecond == needTime) {
                Laya.Tween.to(this.proMake, {value: 1}, 900, null, this.handProComplete, null, true);
            } else {
                var nextValue = nextSecond / needTime;
                Laya.Tween.to(this.proMake, {value: nextValue}, 1000, null, null, null, true);
            }
            if (this.imgFull.visible == true) {
                this.imgFull.visible = false;
            }
        }
        _proto.onProStop = function() {
            if (this.proMake.value != 1) {
                // console.log("停止：", this.proMake.value);
                this.imgFull.visible = true;
                this.proMake.value = 1;
            }
        }
        _proto.onCreateItem = function(obBuildItem, productionValue) {
            // console.log(obBuildItem, productionValue);
        }
        _proto.onPutItem = function(pType, pValue) {
            var dropItem = dbs.Func.getDropItemOnCache();
            dropItem.x = 60;
            dropItem.y = -60;
            dropItem.alpha = 0.1;
            dropItem.oblblHow.text = " +" + pValue;
            if (dropItem.skin != dbs.Func.getItemTypeImage(pType)) {
                dropItem.skin = dbs.Func.getItemTypeImage(pType);
            }
            this.addChild(dropItem);
            var tl = Laya.Pool.getItemByCreateFun("CTIMELINE", function() {
                var t = new Laya.TimeLine();
                return t;
            });
            tl.once(Laya.Event.COMPLETE, this, this.onDropItemPlayComplete, [tl, dropItem]);
            tl.addLabel("SHOW", 0).to(dropItem, {alpha: 1}, 300)
              .addLabel("DOWN", 0).to(dropItem, {y: -100}, 1000, Laya.Ease.backIn)
              .addLabel("HIDE", 0).to(dropItem, {alpha: 0}, 300);
            tl.play();
        }
        _proto.onDropItemPlayComplete = function(tl, pImage) {
            tl.reset();
            Laya.Pool.recover("CTIMELINE", tl);
            this.removeChild(pImage);
        }
        return HomeMakeProduction;
    })(Laya.Box);

    /**
     * 主界面里的探索卡片栏
     */
    mod.RunTime.HomeCardList = (function(_super) {
        function HomeCardList() {
            HomeCardList.super(this);
            Laya.timer.frameOnce(2, this, this._init);
        }
        Laya.class(HomeCardList, "mod.RunTime.HomeCardList", _super);
        var _proto = HomeCardList.prototype;
        _proto._init = function() {
            this.openState = false;
            this.imgBox = this.getChildByName("imgBox")
            this.butOpen = this.getChildByName("butOpen");
            
            this.lblHow = this.getChildByName("imgHow").getChildByName("lblHow");
            this.imgOpen = this.getChildByName("imgOpen");

            // 绑定butOpen事件
            this.butOpen.on(Laya.Event.CLICK, this, this.onOpen);
            this.imgOpen.on(Laya.Event.CLICK, this, this.onOpen);
            
        }

        _proto.getList = function() {
            if (!this.lstCard) {
                this.lstCard = this.getChildByName("lstCard");
                this.lstCard.width = 1;
                // 绑定List事件
                this.lstCard.hScrollBarSkin = "";
                this.lstCard.scrollBar.elasticDistance = 30;
                this.lstCard.selectEnable = true;
                this.lstCard.selectHandler = new Laya.Handler(this, this.onCardSelect);
                // this.lstCard.mouseHandler = new Laya.Handler(this, this.onCardMouse);
            }
            return this.lstCard;
        }

        _proto.getLblHow = function() {
            if (!this.lblHow) {
                this.lblHow = this.getChildByName("imgHow").getChildByName("lblHow");
            }
            return this.lblHow;
        }

        _proto.onOpen = function() {
            if (this.openState) {
                this.openState = false;
                // 执行关闭状态
                // this.imgBox.width = 200;
                this.butOpen.visible = false;
                Laya.Tween.to(this.imgBox, {width: 200}, 500, Laya.Ease.bounceOut, Laya.Handler.create(this, function(){
                    this.butOpen.x = 150;
                    this.butOpen.skewY = 0;
                    this.butOpen.visible = true;
                    this.lstCard.visible = false;
                }));
                Laya.Tween.to(this.lstCard, {width: 1}, 300);
                // 关闭当前选中值
                if (this.tmpSelectBox && this.tmpSelectBox._dataSource) 
                    this.tmpSelectBox._dataSource.imgBg.visible = false;
            } else {
                this.openState = true;
                // 执行打开状态
                this.butOpen.visible = false;
                this.lstCard.visible = true;
                Laya.Tween.to(this.imgBox, {width: 520}, 500, Laya.Ease.bounceOut, Laya.Handler.create(this, function(){
                    this.lstCard.visible = true;
                    this.butOpen.x = 470;
                    this.butOpen.skewY = 180;
                    this.butOpen.visible = true;
                }));
                Laya.Tween.to(this.lstCard, {width: 316}, 300);
            }
        }

        _proto.onCardSelect = function(idx) {
            // 显示当前数据信息
            if (idx < 0)
                return;
            var obCard = dbs.obVillage.obExplore.cardList[idx];
            var selectBox = this.lstCard.selection;
            if (this.tmpSelectBox && this.tmpSelectBox != selectBox) {
                if (this.tmpSelectBox._dataSource)
                    this.tmpSelectBox._dataSource.imgBg.visible = false;
            }
            this.tmpSelectBox = selectBox;
            selectBox._dataSource.imgBg.visible = true;

            Laya.Tween.to(selectBox, {scaleX: 1.1, scaleY: 1.1}, 100, Laya.Ease.backInOut, Laya.Handler.create(this, function() {
                Laya.Tween.to(selectBox, {scaleX: 1, scaleY: 1}, 100, null, Laya.Handler.create(this, function() {
                        cards.openCardBox(obCard);
                }));
            }));
            // 重置
            this.lstCard.selectedIndex = -1;
        }

        _proto.onCardMouse = function(e, idx) {
            if (e.type == Laya.Event.MOUSE_OVER) {
                this.onCardSelect(idx);
            }
        }

        _proto.showInfo = function(obExplore) {
            // 显示数量
            this.getLblHow().text = obExplore.getCardCount();
            // 显示列表
            var obList = this.getList();
            // 填充数据
            var dt = [];
            var arr = obExplore.cardList;
            for (var i = 0; i < arr.length; i++) {
                var ob = arr[i];
                dt.push({
                    butBusiness: {},
                    imgBg: {visible: false}
                });
            }
            obList.dataSource = dt;
            console.log("renew cardList");
        }
        return HomeCardList;
    })(Laya.Box);

})(mod || (mod = {}));

/**
 * 小功能模块对象
 * mod.TObject
 */
(function (mod) {
    mod.TObject = {};

    /**
     * 卖出金币显示的对象
     */
    mod.TObject.FoodGold = (function (_super) {

        /**
         * 出售粮食获得的金币
         * @param {int} targetX 目标X
         * @param {int} targetY 目标Y
         */
        function FoodGold(targetX, targetY) {
            FoodGold.super(this);
            this.skin = "comp/icon01.png";
            this.targetX = targetX;
            this.targetY = targetY;
            this.width = 73;
            this.height = 67;
            this.pivotX = 36;
            this.pivotY = 33;
            this.scaleX = 0;
            this.scaleY = 0;
            this.visible = false;
            this.goldValue = 0;
        }
        Laya.class(FoodGold, "mod.TObject.FoodGold", _super);
        var _proto = FoodGold.prototype;

        /**
         * 开始播入跳出和到指定的方向
         * @param {int} goldValue     要产生的金币数量
         * @event Laya.Event.COMPLETE 播放完成后触发的事件
         */
        _proto.play = function(goldValue) {
            this.goldValue = goldValue;
            // 跳出来
            this.scaleX = 0;
            this.scaleY = 0;
            this.visible = true;
            var nowY = this.y;
            var setpX = mod.Fet.rand(10, 30);
            var bln  = mod.Fet.rand(1, 2);
            var rndWaitTime = mod.Fet.rand(1600, 2200);
            if (bln == 2) {
                setpX *= -1;
            }
            var delay = mod.Fet.rand(0, 100);
            Laya.Tween.to(this, {scaleX: 0.2, scaleY: 0.2, y: nowY - 200}, 300, null, null, delay);
            Laya.Tween.to(this, {scaleX: 0.4, scaleY: 0.4, y: nowY + 50}, 300, null, null, 300 + delay);
            Laya.Tween.to(this, {scaleX: 0.5, scaleY: 0.5, y: nowY - 150, x: this.x + (setpX * 2)}, 200, null, null, 600 + delay);
            Laya.Tween.to(this, {scaleX: 0.6, scaleY: 0.6, y: nowY + 50, x: this.x + (setpX * 3)}, 200, null, null, 800 + delay);
            Laya.Tween.to(this, {y: nowY - 50, x: this.x + (setpX * 4)}, 200, null, null, 1000 + delay);
            Laya.Tween.to(this, {y: nowY + 50, x: this.x + (setpX * 5)}, 200, null, null, 1200) + delay;
            Laya.Tween.to(this, {x: this.targetX, y: this.targetY}, 600, null, Laya.Handler.create(this, this.eventPlayEnd), rndWaitTime + delay);
        }

        _proto.eventPlayEnd = function() {
            this.event(Laya.Event.COMPLETE, [this]);
        }
        return FoodGold;
    }(Laya.Image));

    // 显示提示消息
    mod.TObject.MsgBox = (function (_super) {
        function MsgBox() {
            MsgBox.super(this);
        }
        Laya.class(MsgBox, "mod.TObject.MsgBox", _super);
        var _proto = MsgBox.prototype;

        _proto.showMsg = function(msgValue) {
            this.txtMsg.text = msgValue;
        }
    }(ui.comm.msgUI));

    mod.TObject.SoldiersDb = (function() {
        function SoldiersDb() {
            this.id = 0;
            this.attRange = 10;
            this.attVal = 1;
            this.defVal = 0;
            this.hpVal = 10;
            this.maxHp = 10;
            this.memberType = 1;
            this.sourceType = 1;
            this.stepValue = 10;
            this.targetID = 0;
            this.x = 0;
            this.y = 0;
            this.targetOb = null;
        }

        SoldiersDb.prototype.initDb = function(db) {
            this.id =db.id;
            this.attRange = db.attRange;
            this.attVal = db.attVal;
            this.defVal = db.defVal;
            this.hpVal = db.hpVal;
            this.maxHp = db.maxHp;
            this.memberType = db.memberType;
            this.sourceType = db.sourceType;
            this.stepValue = db.stepValue;
            this.targetID = db.targetID;
            this.x = db.x;
            this.y = db.y;
        }

        return SoldiersDb;
    }());

    // 士兵的基类
    mod.TObject.Soldiers = (function(_super) {
        function Soldiers() {
            Soldiers.super(this);
            this.db = new mod.TObject.SoldiersDb();
            this.targetOb = null;
            this.mStepValue = 6 * this.db.stepValue;
            this.targetY = 6 * this.db.attRange;
            this.y = this.db.y;
            this.x = this.db.x;
            this.pivotX = 40;
            this.pivotY = 46;
            this.obHit = new mod.TObject.OnHitValue(50, 80, -10, 10);
            this.addChild(this.obHit);
            this.lastAction = null;
            this.obTween = null;
            this.attCD = 1000;
            this.lastAttTime = 0;
            console.log("构造了士兵的对象");
        }

        Laya.class(Soldiers, "mod.TObject.Soldiers", _super);
        var _proto = Soldiers.prototype;

        _proto.initDb = function(db) {
            this.targetOb = null;
            this.db.initDb(db);
            this.attCD = 1000;
            this.lastAttTime = 0;
            this.mStepValue = 6 * this.db.stepValue;
            this.targetY = 6 * this.db.attRange;
            this.x = this.db.x * 5;
            this.y = this.db.y * 6;
            var scal = mod.Fet.opScal(this.y, 600, 1700);
            this.scaleX = scal;
            this.scaleY = scal;
            this.alpha = 0;
            Laya.Tween.to(this, {alpha: 1}, 500);
            this.startDo();
        }

        /**
         * 获取目标的中心点
         * @return {array} [x, y]
         */
        _proto.getHitXY = function() {
            return [this.x, this.y];
        }

        _proto.startDo = function() {
            Laya.timer.clear(this, this.do);
            Laya.timer.loop(1000, this, this.do);
            this.do();
        }

        _proto.stopDo = function() {
            Laya.timer.clear(this, this.do);
            this.event(dbs.Event.STOPDO, [this]);
        }

        _proto.stopLoop = function() {
            Laya.timer.clear(this, this.do);
        }

        _proto.stopAndClear = function() {
            this.stopLoop();
            this.clear();
        }

        _proto.do = function() {
            // if (this.db.sourceType == 1) {
            //     if (this.targetOb && (this.y - this.targetY) <= this.targetOb.y) {
            //     // if (this.targetOb) {
            //         this.attack();
            //     } else {
            //         this.move();
            //     }
            // } else {
            //     if (this.targetOb && (this.y + this.targetY) >= this.targetOb.y) {
            //     // if (this.targetOb) {
            //         this.attack();
            //     } else {
            //         this.move();
            //     }
            // }
            if (this.targetOb && Math.abs(this.y - this.targetOb.y) <= this.targetY) {
                this.attack();
            } else {
                this.move();
            }
        }

        _proto.move = function() {
            if (this.stepValue < 1) {
                return;
            }
            if (this.lastAction != "walk") {
                this.play(0, true, "walk");
                this.lastAction = "walk";
            }
            this.moveingHow = 0;
            this.moveing();
        }

        _proto.moveing = function() {
            if (this.db.targetOb) {
                // 攻击者
                if (Math.abs(this.y - this.targetOb.y) <= this.targetY) {
                    this.attack();
                    return;
                }
            }
            if (this.moveingHow >= 5) {
                return;
            }
            if (this.db.sourceType == 1) {
                var ty = this.y - this.mStepValue;
                if (ty < 0) {
                    ty = 0;
                }
            } else {
                var ty = this.y + this.mStepValue;
                if (ty > 500) {
                    ty = 500;
                }
            }
        
            var scal = mod.Fet.opScal(ty, 600, 1700);
            Laya.Tween.to(this, {y: ty, scaleX: scal, scaleY: scal}, 200, null, null, null);
            this.moveingHow++;
            Laya.timer.once(200, this, this.moveing);
        }

        _proto.attack = function(attVal, isDie) {
            if (this.getCanAtt() || isDie) {
                this.play(0, false, "attack");
                this.lastAction = "attack";
                if (this.targetOb) {
                    this.event(dbs.Event.SHOOT, [this, this.targetOb, attVal, isDie]);
                    // if (this.targetOb.db.hpVal > 0) {
                    //     this.event(dbs.Event.SHOOT, [this, this.targetOb, attVal]);
                    // } else {
                    //     this.targetOb = null;
                    // }
                }
            }
        }

        _proto.getCanAtt = function() {
            var tNowTime = mod.Fet.nowTimeMsec();
            var t = tNowTime - this.lastAttTime;
            if (t >= this.attCD) {
                this.lastAttTime = tNowTime;
                return true;
            } else {
                return false;
            }
        }

        _proto.stopMove = function() {
            // this.moveingHow = 5;
            Laya.timer.clear(this, this.moveing);
        }

        /**
         * 受到伤害
         * @param {int}   hitVal 伤害值
         * @param {bool}  isDie  是否阵亡
         */
        _proto.onHit = function(hitVal, isDie) {
            this.db.hpVal -= hitVal;
            if (this.db.hpVal <= 0 && isDie) {
                this.db.hpVal = 0;
                this.clear();
                this.stopDo();
                // 发送阵亡事件
                this.event(dbs.Event.DIE, [this]);
            } else {
                Laya.Tween.to(this, {alpha: 0}, 100, null, Laya.Handler.create(this, function(){
                    Laya.Tween.to(this, {alpha: 1}, 100);
                }));
            }
            this.obHit.showHit(hitVal, 50, -10);
        }

        _proto.setTarget = function(obTarget) {
            this.targetOb = obTarget;
        }

        return Soldiers;
    }(Laya.Animation));

    /**
     * 城墙
     */
    mod.TObject.Wall = (function(_super) {
        function Wall(imgOnHit, txtHp, proHp) {
            this.imgOnHit = imgOnHit;
            this.txtHp = txtHp;
            this.proHp = proHp;
            this.x = 0;
            this.y = 0;
            this.db = new mod.TObject.SoldiersDb();
            this.targetOb = null;
        }
        Laya.class(Wall, "mod.TObject.Wall", _super);
        var _proto = Wall.prototype;

        _proto.initDb = function(db) {
            this.targetOb = null;
            this.db.initDb(db);
            this.attCD = 1000;
            this.lastAttTime = 0;
            this.targetY = this.db.attRange * 6;
            this.x = this.db.x;
            this.y = this.db.y;
            Laya.timer.loop(1000, this, this.do);
            this.show();
        }

        _proto.getHitXY = function() {
            return [mod.Fet.rand(200, 350), -70];
        }

        _proto.stopDo = function() {
            Laya.timer.clear(this, this.do);
        }

        _proto.stopLoop = function() {
            Laya.timer.clear(this, this.do);
        }

        _proto.stopAndClear = function() {
            this.stopLoop();
        }

        _proto.do = function() {
            this.attack();
        }

        _proto.attack = function(attVal, isDie) {
            if (this.targetOb) {
                if (this.getCanAtt() || isDie) {
                    this.event(dbs.Event.SHOOT, [this, this.targetOb, attVal, isDie]);
                }
                // if (this.targetOb.db.hpVal > 0) {
                //     // 判断目标离自己的距离
                //     var ty = Math.abs(this.y - this.targetOb.y);
                //     if (ty <= this.targetY) {
                //         // this.targetOb.onHit(this.db.attVal);
                //         this.event(dbs.Event.SHOOT, [this, this.targetOb, attVal, isDie]);
                //     }
                // }
            }
        }

        _proto.getCanAtt = function() {
            var tNowTime = mod.Fet.nowTimeMsec();
            var t = tNowTime - this.lastAttTime;
            if (t >= this.attCD) {
                this.lastAttTime = tNowTime;
                return true;
            } else {
                return false;
            }
        }

        _proto.stopMove = function() {

        }

        _proto.onHit = function(hitVal) {
            this.db.hpVal -= hitVal;
            if (this.db.hpVal < 0) {
                this.db.hpVal = 0;
            }
            // 动画显示被伤害
            if (this.imgOnHit.visible != true) {
                this.imgOnHit.visible = true;
                Laya.timer.once(100, this, this.showOnHitImg)
            }
            // 伤害数字飘起来
            var self = this.proHp;
            var obHite = Laya.Pool.getItemByCreateFun("WALL_HIT_TXT", function() {
                var ob = new mod.TObject.OnHitValue();
                ob.on(Laya.Event.COMPLETE, this, function(obHit) {
                    Laya.Pool.recover("WALL_HIT_TXT", obHit);
                });
                // 添加到当前的节点上
                self.addChild(ob);
                console.log("创建了新的onHit");
                return ob;
            });
            var tx = mod.Fet.rand(80, 130);
            // var ty = mod.Fet.rand(8, 16);
            obHite.showHit(hitVal, 150, 10);
            this.show();
            // 判断自己是不是被击毁
            if (this.db.hpVal < 0) {
                Laya.timer.clear(this, this.do);
            }
        }

        _proto.show = function() {
            this.txtHp.text = this.db.hpVal + " / " + this.db.maxHp;
            this.proHp.value = this.db.hpVal / this.db.maxHp;
        }

        _proto.setTarget = function(obTarget) {
            this.targetOb = obTarget;
        }

        _proto.showOnHitImg = function() {
            this.imgOnHit.visible = false;
        }
        return Wall;
    }(Laya.EventDispatcher));

    mod.TObject.SoldiersDie = (function(_super) {
        function SoldiersDie() {
            SoldiersDie.super(this);
            this.width = 115;
            this.height = 110;
        }
        Laya.class(SoldiersDie, "mod.TObject.SoldiersDie", _super);
        var _proto = SoldiersDie.prototype;
        _proto.playDie = function() {
            mod.Ani.playLife("die", this, null);
        }
        return SoldiersDie;
    }(Laya.Animation));

    /**
     * 被伤害的数值飘起来
     */
    mod.TObject.OnHitValue = (function(_super) {

        /**
         * 伤害数值对象
         * @param {int} ly 飘起来的随机高度最低值
         * @param {int} hy 飘起来的随机高度最高值
         * @param {int} lx X的随机最低值
         * @param {int} hy Y的随机最高值
         */
        function OnHitValue(ly, hy, lx, hx) {
            OnHitValue.super(this);
            this.color = "#f4120e";
            this.fontSize = 30;
            this.visible = false;
            if (ly && hy) {
                this.ly = ly;
                this.hy = hy;
            } else {
                this.ly = 80;
                this.hy = 110;
            }
            if (lx && hx) {
                this.lx = lx;
                this.hx = hx;
            } else {
                this.lx = -50;
                this.hx = 50;
            }
        }
        Laya.class(OnHitValue, "mod.TObject.OnHitValue", _super);
        OnHitValue.prototype.showHit = function(txtVal, pointX, pointY) {
            this.visible = true;
            this.text = txtVal;
            this.x = pointX;
            this.y = pointY;
            var ty = this.y - mod.Fet.rand(this.ly, this.hy);
            var tx = this.x - mod.Fet.rand(this.lx, this.hx);
            Laya.Tween.to(this, {x: tx, y: ty}, 600, Laya.Ease.backOut, Laya.Handler.create(this, function(){
                this.visible = false;
                this.event(Laya.Event.COMPLETE, [this]);
            }));
        }
        return OnHitValue;
    }(Laya.Label));

    /**
     * 箭
     */
    mod.TObject.Arrow = (function(_super) {
        function Arrow() {
            Arrow.super(this);
            this.skin = "comp/battle/jian.png";
            this.width = 12;
            this.height = 67;
            this.pivotX = 6;
            this.pivotY = 33;

        }
        Laya.class(Arrow, "mod.TObject.Arrow", _super);
        var _proto = Arrow.prototype;

        /**
         * 箭飞行出去
         * @param {int}                  sourceX  飞起源头X值
         * @param {int}                  sourceY  飞起源头Y值
         * @param {int}                  hitVal   伤害值
         * @param {mod.TObject.Soldiers} targetOb 被攻击的目标
         * @param {bool}                 isDie    是否阵亡
         */
        _proto.fly = function(sourceX, sourceY, hitVal, targetOb, isDie) {
            mod.Sound.playShoot();
            this.x = sourceX;
            this.y = sourceY;
            var arrXy =  targetOb.getHitXY();
            // var scal = mod.Fet.opScal(arrXy[1], 600, 2000);
            // this.scaleX = scal;
            // this.scaleY = scal;
            var result = mod.Fet.angle(sourceX, sourceY, arrXy[0], arrXy[1]) + 90;
            try {
                this.rotation = result;
            } catch (ex) {
                console.log("!!!发射箭时出现错误!!!", ex);
            }
            this.visible = true;
            Laya.Tween.to(this, {x: arrXy[0], y: arrXy[1]}, 260, null, Laya.Handler.create(this, this.onFlyEnd, [hitVal, targetOb, isDie]));
        }

        /**
         * 飞行结束
         */
        _proto.onFlyEnd = function(hitVal, targetOb, isDie) {
            this.visible = false;
            targetOb.onHit(hitVal, isDie);
            this.event(Laya.Event.COMPLETE, [this]);
        }
        return Arrow;
    }(Laya.Image));

    /**
     * 商品信息对象
     */
    mod.TObject.TItem = (function(_super) {
        function TItem() {
            TItem.super(this);
            this.isType = "mod.TObject.TItem";
            this.width = 100;
            this.height = 100;
            this.itemType = 0;
            this.itemHow = 0;

            // 阴影
            this.imgShadow = new Laya.Image("comp/yinying.png");
            this.addChild(this.imgShadow);
            this.imgShadow.width = 65;
            this.imgShadow.height = 29;
            this.imgShadow.centerX = -20;
            this.imgShadow.bottom = -15;

            // 物品图片
            this.itemImage = new Laya.Image();
            this.addChild(this.itemImage);
            this.itemImage.width = 100;
            this.itemImage.height = 100;

            // 物品数量
            this.lblHow = new Laya.Label();
            this.itemImage.addChild(this.lblHow);
            this.lblHow.height = 25;
            this.lblHow.width = 100;
            this.lblHow.bottom = 0;
            this.lblHow.fontSize = 25;
            this.lblHow.color = "#FFFFFF";
            this.lblHow.align = "center";
            this.lblHow.stroke = 3;
            this.lblHow.strokeColor = "#1d5f79";

            // 动画时间线
            this.tl = new Laya.TimeLine();
            this.tl.addLabel("up", 0).to(this.itemImage, {y: -3}, 500)
                   .addLabel("down", 0).to(this.itemImage, {y: 0}, 500);
            this.tl.play(0, true);
            this.tl.pause();
        }

        Laya.class(TItem, "mod.TObject.TItem", _super);
        var _proto = TItem.prototype;

        _proto.initDb = function(itemType, itemHow) {
            this.itemType = itemType;
            this.itemHow = itemHow;
            this.showInfo();
        }

        _proto.getItemType = function() {
            return this.itemType;
        }

        /**
         * 增加当前商品的数量
         * @param {int}         v        要添加的数量
         * @param {Laya.Handle} handBack 回调函数
         */
        _proto.addValue = function(v, handBack) {
            Laya.Tween.to(this.lblHow, {fontSize: 32}, 300, Laya.Ease.backIn, Laya.Handler.create(this, this._addValue, [v, handBack]));
            Laya.Tween.to(this.lblHow, {fontSize: 25}, 200, null, null, 300);
        }

        _proto._addValue = function(v, handBack) {
            this.itemHow += v;
            this.lblHow.text = this.itemHow;
            if (handBack) {
                handBack.runWith();
            }
        }

        _proto.showInfo = function() {
            this.lblHow.text = this.itemHow;
            var pathInfo = dbs.Func.getItemTypeImage(this.itemType);
            if (pathInfo != this.itemImage.skin) {
                this.itemImage.skin = pathInfo;
            }
        }

        _proto.onAdded = function() {
            this.tl.resume();
        }

        _proto.onRemoved = function() {
            this.tl.pause();
        }

        return TItem;
    }(Laya.Box));

    mod.TObject.CurveValue = (function(_super) {
        function CurveValue() {
            CurveValue.super(this);
            this.skin = "comp/jm_jt1.png";
            this.width = 11;
            this.height = 11;
            this.lblValue = new Laya.Label();
            this.lblValue.width = 50;
            this.lblValue.height = 15;
            this.lblValue.y = -23;
            this.lblValue.x = -19;
            this.lblValue.fontSize = 20;
            this.lblValue.align = "center";
            this.lblValue.color = "#FFFFFF";
            this.lblValue.stroke = 3;
            this.lblValue.strokeColor = "#1d5f79";
            this.addChild(this.lblValue);
        }
        Laya.class(CurveValue, "mod.TObject.CurveValue", _super);
        var _proto = CurveValue.prototype;
        _proto.setValue = function(val) {
            this.lblValue.text = val;
        }
        return CurveValue;
    }(Laya.Image));

    /**
     * 探索卡片里的
     */
    mod.TObject.CardType = (function(_super) {
        function CardType(cardType) {
            CardType.super(this);
            // 设定卡边类型
            this.cardType = cardType;       
            switch (cardType) {
                // 商人
                case 1:
                this.skin = "comp/jm/jm_td9icon03.png";
                break;
                // 宝箱盒子
                case 2:
                this.skin = "comp/jm/jm_td9icon01.png";
                break;
                // 战斗
                case 3:
                this.skin = "comp/jm/jm_td9icon02.png";
                break;
            }
            this.pivotX = this.width / 2;
            // 骰子
            this.dice = new Laya.Image("comp/jm_td11.png");
            this.dice.x = -18;
            this.dice.y = -82;

            // 数字对象
            this.numberBox = new Laya.Image("comp/jm_td10.png");
            this.numberBox.x = 27;
            this.numberBox.y = -30;
            this.numberBox.width = 105;
            this.numberBox.height = 71;
            this.numberBox.pivotX = 52;
            this.numberBox.pivotY = 36;

            this.lblNumber = new Laya.Label();
            this.lblNumber.width = 87;
            this.lblNumber.height = 39;
            this.lblNumber.fontSize = 36;
            this.lblNumber.color = "#FFFFFF";
            this.lblNumber.stroke = 4;
            this.lblNumber.strokeColor = "#1d5f79"
            this.lblNumber.x = 7;
            this.lblNumber.y = 4;
            this.lblNumber.align = "center";
            this.lblNumber.text = 6;
            this.numberBox.addChild(this.lblNumber);

            // 添加对象到当前的节点
            this.addChild(this.dice);
            this.addChild(this.numberBox);

            this.tmpDiceValue = 1;
            this.tmpDiceFor = 0;
            this.nowDiceValue = 0;

            this.resetCard();
        }
        Laya.class(CardType, "mod.TObject.CardType", _super);
        var _proto = CardType.prototype;

        _proto.resetCard = function() {
            this.gray = false;
            this.dice.visible = false;
            this.numberBox.visible = false;
            this.numberBox.scaleX = 0.5;
            this.numberBox.scaleY = 0.5;
            this.tmpDiceValue = 1;
            this.tmpDiceFor = 0;
            this.nowDiceValue = 0;
            this.alpha = 1;
            this.scaleX = 1;
            this.scaleY = 1;
        }

        _proto.playInfo = function(v) {
            this.dice.visible = true;
            this.dice.y = -300;
            Laya.Tween.to(this.dice, {y: -82}, 300, Laya.Ease.backIn, Laya.Handler.create(this, function(){
                Laya.Tween.to(this.dice, {y: -150}, 100, null, Laya.Handler.create(this, function() {
                    Laya.Tween.to(this.dice, {y: -82}, 100, Laya.Ease.bounceOut);
                }));
            }));

            Laya.timer.once(600, this, this.showDiceValue, [v]);
        }

        _proto.showDiceValue = function(v) {
            this.nowDiceValue = v;
            this.numberBox.visible = true;
            mod.Tween.showOpen(this.numberBox);
            this.mvShowDiceValue();
        }

        _proto.mvShowDiceValue = function() {
            this.lblNumber.text = this.tmpDiceValue;
            if (this.tmpDiceFor >= 5) {
                if (this.tmpDiceValue == this.nowDiceValue) {
                    this.event(Laya.Event.COMPLETE);
                    return;
                }
            }
            this.tmpDiceValue ++;
            if (this.tmpDiceValue > 6) {
                this.tmpDiceFor++;
                this.tmpDiceValue = 1;
            }
            Laya.timer.once(10 + ((this.tmpDiceFor - 2) * 50), this, this.mvShowDiceValue);
        }

        _proto.setGray = function() {
            this.gray = true;
            this.alpha = 0.6;
        }

        _proto.setWinBg = function() {
            Laya.Tween.to(this, {scaleX: 1.5, scaleY: 1.5}, 350, Laya.Ease.bounceInOut, Laya.Handler.create(this, function() {
                Laya.Tween.to(this, {scaleX: 1.1, scaleY: 1.1}, 350, Laya.Ease.bounceInOut);
            }));
        }

        return CardType;
    }(Laya.Image));

})(mod || (mod = {}));

/**
 * 功能
 * mod.Fet
 */
(function (mod) {
    mod.Fet = {};

    /**
     * 随机函数
     * @param {int} min 要生成随机数的最小值
     * @param {int} max 要生成随机数的最大值
     * @return {int} 随机值
     */
    mod.Fet.rand = function(min, max) {
        var t = Math.floor(Math.random() * (max - min + 1) + min)
        return t;
    }

    /**
     * 获取当前时间戳
     * @return {int} 当前时间戳
     */
    mod.Fet.nowTime = function() {
        return Math.floor(mod.Fet.nowTimeMsec() / 1000);
    }

    /**
     * 获取当前时间毫秒
     * @return {int} 当前时间毫秒值
     */
    mod.Fet.nowTimeMsec = function() {
        var t = new Date().getTime();
        return t;
    }

    /**
     * 计算两点间的角度 对象的物件是水平向右方向 ->
     * @param {int} nx 当前点的x值
     * @param {int} ny 当前点的y值
     * @param {int} tx 目标点的x值
     * @param {int} ty 目标点的y值
     * @return {int} 返回两点的角度
     */
    mod.Fet.angle = function(nx, ny, tx, ty) {
        // 计算斜角
        var x = tx - nx; // - tx;
        var y = ty - ny; // - ty;
        if (x == 0 && y == 0) {
            return 0;
        }
        var h = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        // 斜边的长度
        var cos = x / h;
        var radian = Math.acos(cos);
        // 弧度
        var result = 180 / (Math.PI / radian);
        // 计算出角度
        if (y < 0) {
            result = -result;
        } else if ((y == 0) && (x < 0)) {
            result = 180
        }
        return result;
    }

    /**
     * 计算缩小值
     * @param {int} ty 目标y值
     * @param {int} h  当前视野的高度
     * @param {int} mx 变化数值，数值越大则变化越小
     * @return {float} 返回缩小值
     */
    mod.Fet.opScal = function(ty, h, mx) {
        return 1 - (h - ty) / mx;
    }

    /**
     * 切分数值
     * @param  {int}   val 要被切割的数值
     * @param  {int}   how 要被切割多少份
     * @return {array}     返回分割好的数组
     */
    mod.Fet.sliceValue = function(val, how) {
        var result = [];
        if (val != 0) {
            var tmpValue = val;
            if (val < 0)
                val *= -1;
            if (val <= how) {
                for (var i = 0; i < val; i++) {
                    if (tmpValue < 0)
                        result.push(-1);
                    else
                        result.push(1);
                }
            } else {
                var step = Math.floor(val / how);
                for (var i = 1; i < how; i++) {
                    val -= step;
                    if (tmpValue < 0)
                        result.push(step * -1);
                    else
                        result.push(step);
                }
                if (tmpValue < 0)
                    result.push(val * -1);
                else
                    result.push(val);
            }
        }
        return result;
    }

    /**
     * 显示询问窗口
     * @param {array}       arrMsg 数组字符串
     * @param {Laya.Handle} handBack 回调函数
     */
    mod.Fet.showConfirm = function(arrMsg, handBack) {
        mod.Wd.openWindow("confirm", function(obWin) {
            obWin.show(arrMsg, handBack);
        });
    }

    /**
     * 显示提示信息
     * @param {array|string}   arrMsg 数组字符串信息（也可以是单个字符串）
     */
    mod.Fet.showMsg = function(arrMsg) {
        mod.Wd.openWindow("msgBox", function(obWin) {
            obWin.show(arrMsg);
        });
    }

    /**
     * 格式化金币
     * @param {int} val 需要被格式化的金币
     * @return {string} 返回格式好的金币字符串
     */
    mod.Fet.formatCurrency = function(val) {
        if (val < 100000) 
            return val;
        if (val < 1000000)
            return Math.floor(val / 1000) + "k";
        if (val < 100000000)
            return Math.floor(val / 10000) + "w";
        return Math.floor(val / 1000000) + "m";
    }

    /**
     * 格式化时间格式 00:00:00
     * @param {int} timeValue 传入的剩余时间秒数
     * @return {string} 返回00:00:00格式的时间字符串
     */
    mod.Fet.timeStr = function(timeValue) {
        timeValue = Math.floor(timeValue);
        var h = Math.floor(timeValue / 3600);
        var t = Math.floor(timeValue % 3600);
        var i = Math.floor(t / 60);
        var s = Math.floor(t % 60);
        var arr = [0, 0, 0];
        arr[0] = (h < 10) ? "0" + h : h;
        arr[1] = (i < 10) ? "0" + i : i;
        arr[2] = (s < 10) ? "0" + s : s;
        return arr.join(":");
    }

})(mod || (mod = {}));

/**
 * 自定义的动画特效
 * mod.Tween
 */
(function (mod) {
    mod.Tween = {};

    /**
     * 显示要被变化的动画对象
     * @param {any}          obj          要被变化的目标
     * @param {float}        scaleValue   具体要变大的数值
     * @param {Laya.Handler} handComplete 播放完成时执行的函数
     */
    mod.Tween.showBig = function(obj, scaleValue, handComplete) {
        Laya.Tween.to(obj, {scaleX: scaleValue, scaleY: scaleValue}, 300, Laya.Ease.backInOut)
        Laya.Tween.to(obj, {scaleX: 1, scaleY: 1}, 100, null, handComplete, 300);
    }

    /**
     * 打开界面的动画显示
     * @param {Node} obj 要被显示的节点对象
     */
    mod.Tween.showOpen = function(obj) {
        Laya.Tween.to(obj, {scaleX: 1, scaleY: 1}, 500, Laya.Ease.backInOut);
    }
    
    /**
     * 关闭窗口显示的动画
     * @param {Laya.Node}   obj     要被关闭的节点对象
     * @param {Laya.Handle} handEnd 动画播放完时执行的程序
     */
    mod.Tween.showClose = function(obj, handEnd) {
        Laya.Tween.to(obj, {scaleX: 0.5, scaleY: 0.5}, 500, Laya.Ease.backInOut, handEnd);
    }

})(mod || (mod = {}));


/**
 * 动画对象管理
 * mod.Ani
 */
(function (mod) {
    mod.Ani = {};

    /**
     * 播放指定的动画的对象
     * @param {string} aniID  ani文件的ID
     * @param {object} obAni  要被播放的视频动画
     * @param {array}  plArgs 播放参数 [帧起始位置, 是否循环, 播放的标签名称]
     */
    mod.Ani.playLife = function(aniID, obAni, plArgs) {
        obAni.loadAnimation("anis/" + aniID + ".ani", null, "res/atlas/motion/" + aniID + ".json");
        if (plArgs) {
            obAni.play(plArgs[0], plArgs[1], plArgs[2]);
        } else {
            obAni.play();
        }
    }

    mod.Ani.createAni = function(aniID, plArgs) {
        var obAni = new Laya.Animation();
        mod.Ani.playLife(aniID, obAni, plArgs);
        return obAni;
    }

})(mod || (mod = {}));

/**
 * 声音管理
 * mod.Sound
 */
(function (mod) {
    mod.Sound = {
        soundsPath: "res/sounds/",
        soundsExt: ".wav",

        playSound: function(soundName) {
            Laya.SoundManager.playSound(this.soundsPath + soundName + this.soundsExt);
        },

        // 播放点击建筑时的操作
        playDrum: function() {
            this.playSound("drum");
        },

        playReadOk: function() {
            this.playSound("readok");
        },

        playSellFood: function() {
            this.playSound("sellgold");
        },

        playShoot: function() {
            this.playSound("shoot");
        },

        playFightBg: function() {
            // Laya.SoundManager.playMusic(this.soundsPath + "fightbg.mp3");
            console.log("播放战斗背景音乐");
        }
    };

})(mod || (mod = {}));
