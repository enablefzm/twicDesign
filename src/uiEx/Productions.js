/**
* name 
*/
var uiEx;
(function (uiEx) {
    var Productions = (function (_super) {
        function Productions() {
            Productions.super(this);
            this.visible = false;
            this.btnClose.on(Laya.Event.CLICK, this, this.close);
            this.bgClose.on(Laya.Event.CLICK, this, this.close);
            this.butChangeProduction.on(Laya.Event.CLICK, this.selectItemBox, this.selectItemBox.open);
            this.obTween = null;
            // ListBox 设定
            this.lstCanProductions.vScrollBarSkin = "";
            this.lstCanProductions.renderHandler = new Laya.Handler(this, this._lstHandRenew);
            this.lstCanProductions.scrollBar.elasticBackTime = 150;
            this.lstCanProductions.scrollBar.elasticDistance = 50;
            // 刷新界面的Handle
            this._handCanProductions = new Laya.Handler(this, this._showCanBuildProduction);
            // this._handShowProductionPrice = new Laya.Handler(this, this.showCurveInfo);
            this.scaleX = 0.5;
            this.scaleY = 0.5;
            // 初始化出售界面
            this.confirmSell.mInit();
            this.selectItemBox.mInit();
            this.boxCurve.mInit();
        }

        Laya.class(Productions, "uiEx.Productions", _super);
        var _proto = Productions.prototype;

        /**
         * 关闭窗口
         */
        _proto.close = function() {
            mod.Tween.showClose(this, Laya.Handler.create(this, this._hide));
            this.onClose();
        }

        _proto._hide = function() {
            this.visible = false;
        }

        /**
         * 触发打开界面时
         */
        _proto.onOpen = function() {
            // 绑定事件
            dbs.obVillage.obProductions.obProqueue.on("PRO_RUNING", this, this._showProBuildTime);
            dbs.obVillage.obProductions.obProqueue.on("PRO_STOP", this, this.onProStop);
            // dbs.obVillage.obProductions.obProqueue.on("PRO_CREATE", this, this._showCreteItem);
            dbs.obVillage.obProductions.obProqueue.obContainer.on("PUTITEM", this, this.onPutItem);
            dbs.obVillage.obProductions.obProqueue.obContainer.on("OUTITEM", this, this.onOutItem);
            // 仓库里的物品出库
            dbs.obVillage.obWarehouse.obContainer.on("OUTITEM", this, this._onWarehoueOutItem);
            dbs.obVillage.obProductions.obProqueue.obContainer.on(Laya.Event.CHANGE, this, this.onContainerChange);
            // 价格刷新时执行
            dbs.obVillage.obProductions.obProductionPrices.on(Laya.Event.CHANGE, this, this._showCanBuildProduction);
            dbs.obVillage.obProductions.obProductionPrices.startRun();
            // 显示打开的动画
            mod.Tween.showOpen(this);
        }

        /**
         * 被关闭时执行
         */
        _proto.onClose = function() {
            // 取消绑定
            dbs.obVillage.obProductions.obProqueue.off("PRO_RUNING", this, this._showProBuildTime);
            dbs.obVillage.obProductions.obProqueue.off("PRO_STOP", this, this.onProStop);
            // dbs.obVillage.obProductions.obProqueue.off("PRO_CREATE", this, this._showCreteItem);
            dbs.obVillage.obProductions.obProqueue.obContainer.off("PUTITEM", this, this.onPutItem);
            dbs.obVillage.obProductions.obProqueue.obContainer.off("OUTITEM", this, this.onOutItem);
            // 仓库里的物品出库
            dbs.obVillage.obWarehouse.obContainer.off("OUTITEM", this, this._onWarehoueOutItem);
            dbs.obVillage.obProductions.obProqueue.obContainer.off(Laya.Event.CHANGE, this, this.onContainerChange);
            dbs.obVillage.obProductions.obProductionPrices.off(Laya.Event.CHANGE, this, this._showCanBuildProduction);
            dbs.obVillage.obProductions.obProductionPrices.stopRun();
            // Laya.Tween.to(this, {scaleX: 0.5, scaleY: 0.5}, 500);
            // 检查是否有其它打开的窗口
            if (this.confirmSell.visible == true) 
                this.confirmSell.close();
            if (this.selectItemBox.visible == true)
                this.selectItemBox.close();
            if (this.boxCurve.visible == true) 
                this.boxCurve.close();
        }

        /**
         * 显示数据
         */
        _proto.showInfo = function() {
            // 获得村庄生产中心对象
            var obProductions = dbs.obVillage.obProductions;
            // 显示村庄等级
            this.buildName.text = "生产中心 Lv" + obProductions.level;
            // 显示当前正在生产的信息
            this.showProqueueInfo(obProductions.obProqueue);
            // 显示可以生产数据对象
            this.showCanBuildProduction(obProductions.obProductionPrices);
            // 显示当前仓库的容量
            this.showWareHouse(dbs.obVillage.obWarehouse);
        }

        /**
         * 显示生产队列消息
         * @param {dbs.Proqueue} ob 生产对列对象
         */
        _proto.showProqueueInfo = function(ob) {
            // 显示农民数量
            this.fntFarmsValue.value = ob.farms;
            // 显示正在生产的商品类型
            this.imgBuildItem.skin = ob.obBuildItem.getImage();
            // 显示可以获得数量
            this.lblAddValue.text = "+" + ob.buildValue;
            // 显示当前剩余时间
            var nextTime = ob.toSecond + 1;
            if (nextTime == ob.needTime) {
                this.proBuild.value = 0;
                this.lblBuildTime.text = ob.needTime + " 秒";
            } else {
                this.proBuild.value = nextTime / ob.needTime;
                this.lblBuildTime.text = (ob.needTime - ob.toSecond) + " 秒";
            }
            // 显示临时仓库的信息
            this._showProqueueContainer(ob.obContainer);
        }

        /**
         * 显示临时仓库的信息
         * @param {dbs.Container} obContainer 仓库容量
         */
        _proto._showProqueueContainer = function(obContainer) {
            // 木板添加物品
            this.imgBoard.initDb(obContainer);
            // 显示当前容量
            this._showContainerValue(obContainer);
        }

        /**
         * 显示可以生产数据信息
         * @param {dbs.ProductionPrices} obProductionPrices 生产中心里可以生产的对象信息
         */
        _proto.showCanBuildProduction = function(obProductionPrices) {
            this.lstCanProductions.dataSource = [];
            obProductionPrices.getMarketPrice(this._handCanProductions);
        }

        _proto._showCanBuildProduction = function(obProductionPrices) {
            var data = [];
            for (var k in obProductionPrices.arrProductionPrice) {
                var ob = obProductionPrices.arrProductionPrice[k];
                data.push(this._createListObject(ob));
            }
            // 显示下一级可以开启的商品信息
            if (obProductionPrices.nextProduction) {
                var ob = obProductionPrices.nextProduction;
                var obInfo = this._createListObject(ob);
                // 判断等级如果等级低于当前要
                obInfo.boxUpNeed = {visible: true};
                obInfo.imgBg = {gray: true};
                obInfo.itemImage.gray = true;
                if (dbs.obVillage.obProductions.level >= ob.needLevel) {
                    obInfo.lblUpNeed = {
                        visible: true, 
                        text: "点击开启新商品", 
                        color: "#f18482", 
                        strokeColor: "#440418"
                    }
                } else {
                    obInfo.lblUpNeed = {
                        visible: true, 
                        text: "生产中心" + ob.needLevel + "级开通", 
                        color: "#FFFFFF",
                        strokeColor: "#1d5f79"
                    };
                }
                data.push(obInfo);
            }
            this.lstCanProductions.dataSource = data;
            // 刷新价格走势的数据，有打开界面刷新结果
            if (this.boxCurve.checkIsOpen()) {
                // 获得当前的正在查看的价格对象
                var pType = this.boxCurve.productionType;
                // 刷新界面
                this.renewCurveInfo(pType, obProductionPrices);
            }
        }

        /**
         * 创建ListBox里节点信息对象
         * @param {dbs.ProductionItem} ob 节点信息对象
         * @return {object} 返回信息
         */
        _proto._createListObject = function(ob) {
            var how = dbs.obVillage.obWarehouse.getProductionValue(ob.getProductionType());
            var imgPath, fontColor;
            if (ob.isUp) {
                imgPath = "comp/production/icon_ss.png";
                fontColor = "#a82e1d";
            } else {
                imgPath = "comp/production/icon_ss2.png";
                fontColor = "#51be74";
            }
            var blnSell = how > 0 ? true : false;
            return {
                db: {pType: ob.getProductionType()},
                itemImage: {skin: ob.getImage(), gray: false},
                itemHow: {text: how},
                price: {text: ob.price, color: fontColor},
                imgIsUp: {skin: imgPath},
                boxUpNeed: {visible: false},
                lblUpNeed: {visible: false},
                btnSell: {visible: blnSell},
                btnOpenProduction: {visible: false},
                imgBg: {gray: false}
            };
        }

        _proto._lstHandRenew = function(obCell, idx) {
            var btnCurve = obCell.getChildByName("btnCurve");
            var btnSell  = obCell.getChildByName("btnSell");
            btnCurve.offAll(Laya.Event.CLICK);
            btnSell.offAll(Laya.Event.CLICK);
            // 显示操作按钮
            btnCurve.on(Laya.Event.CLICK, this, this.onCurveClick, [obCell, idx]);
            // 设定出售按钮
            btnSell.on(Laya.Event.CLICK, this, this.onSellClick, [obCell, idx]);
            var btnOpen = obCell.getChildByName("lblUpNeed");
            if (btnOpen.visible == true) {
                btnOpen.offAll(Laya.Event.CLICK);
                btnOpen.on(Laya.Event.CLICK, this, this.onOpenProductionClick);
            }
        }

        _proto.onOpenProductionClick = function() {
            // 获得生产中心的下一个可能生的物品
            var nextProduction = dbs.obVillage.obProductions.obProductionPrices.nextProduction;
            if (!nextProduction)
                return;
            // 获取生产中心等级
            var lv = dbs.obVillage.obProductions.level;
            if (lv < nextProduction.needLevel)
                return;
            mod.Fet.showConfirm(
                ["花费 " + mod.Fet.formatCurrency(nextProduction.getOpenNeedGold()) + " 金币开启新商品", "确定开启？"], 
                Laya.Handler.create(this, function() {
                    conn.Send("production open");
                }));
        }

        // 查看当前商品的价格走势
        _proto.onCurveClick = function(obCell, idx) {
            // 获取商品信息
            var obProductionPrices = dbs.obVillage.obProductions.obProductionPrices;
            // 获取价格
            obProductionPrices.getMarketPrice(Laya.Handler.create(this, this.showCurveInfo, [obCell.dataSource.db.pType]), true);
        }

        _proto.showCurveInfo = function(pType, obPrices) {
            if (this.renewCurveInfo(pType, obPrices)) {
                this.boxCurve.open();
            }
        }

        _proto.renewCurveInfo = function(pType, obPrices) {
            // 获取相应的数据对象
            var ob = null;
            for (var k in obPrices.arrProductionPrice) {
                var t = obPrices.arrProductionPrice[k];
                if (t.getProductionType() == pType) {
                    ob = t;
                    break;
                }
            }
            if (ob != null) {
                this.boxCurve.showInfo(ob);
                return true;
            }
            return false;
        }

        /**
         * 商品点击出售物品
         * @param {Laya.Box} obCell
         */
        _proto.onSellClick = function(obCell, idx) {
            this.confirmSell.openSell(obCell.dataSource.db.pType);
        }

        _proto.showPutValue = function(pType, value) {
            var obCells = this.lstCanProductions.cells;
            for (var k in obCells) {
                var obCell = obCells[k];
                if (obCell.dataSource == null)
                    continue;
                var db = obCell.dataSource.db;
                if (db.pType == pType) {
                    // 获得Label
                    var lblHow = obCell.getChildByName("itemHow");
                    var imgItem = obCell.getChildByName("itemImage");
                    var oldValue = Number(lblHow.text);
                    var arrValue = mod.Fet.sliceValue(value, 5);
                    var stepTime = 130;
                    for (var i = 0; i < arrValue.length; i++) {
                        oldValue += arrValue[i];
                        var waitTime = 600 + stepTime * (i * 2);
                        Laya.Tween.to(lblHow, {scaleX: 1.2, scaleY: 1.2}, stepTime, null, Laya.Handler.create(this, function(obText, newValue) { obText.text = newValue}, [lblHow, oldValue]) , waitTime);
                        Laya.Tween.to(lblHow, {scaleX: 1, scaleY: 1}, stepTime, null, null, waitTime + stepTime);
                        Laya.Tween.to(imgItem, {scaleX: 1.1, scaleY: 1.1}, stepTime, null, null, waitTime);
                        Laya.Tween.to(imgItem, {scaleX: 1, scaleY: 1}, stepTime, null, null, waitTime + stepTime);
                    }
                    // 显示出售按钮
                    obCell.getChildByName("btnSell").visible = true;
                    return;
                }
            }
        }

        /**
         * 生产中心触发显示当前时间进度
         * @param {int} toSecond 已经生产的时间
         * @param {int} needTime 生产需要的时间
         * @param {int} productionValue 生产获得的物品
         */
        _proto._showProBuildTime = function(toSecond, needTime, productionValue) {
            var nextSecond = toSecond + 1;
            this.lblBuildTime.text = (needTime - toSecond) + " 秒";
            if (nextSecond == needTime) {
                Laya.Tween.to(this.proBuild, {value: 1}, 900, null, Laya.Handler.create(this, function(){
                    this.proBuild.value = 0;
                    this.lblBuildTime.text = needTime + " 秒";
                }), null, true);
            } else {
                var nextValue = nextSecond / needTime;
                Laya.Tween.to(this.proBuild, {value: nextValue}, 1000, null, null, null, true);
            }
        }

        /**
         * 生产中心停止生产
         */
        _proto.onProStop = function() {
            if (this.lblBuildTime.text != "容量满了") {
                this.lblBuildTime.text = "容量满了";
                this.proBuild.value = 1;
            }
        }

        /**
         * 生产中心产出物口的事件
         * @param {dbs.ProductionItem} obBuildItem 产出物品类型
         * @param {int} productionValue 产出物品的数量
         */
        _proto._showCreteItem = function(obBuildItem, productionValue) {
            // 产生产出物品的动画
            this.imgBoard.putItem(obBuildItem.getProductionType(), productionValue);
        }

        _proto.onPutItem = function(pType, pValue) {
            this.imgBoard.putItem(pType, pValue);
        }

        /**
         * 从生产队列的板上取出物品
         * @param {int} pType  商品类型
         * @param {int} pValue 商品数量
         */
        _proto.onOutItem = function(pType, pValue) {
            this.imgBoard.outItem(pType, pValue);
            // 向仓库界面收取物品
            this.showPutValue(pType, pValue);
            // 刷新仓库信息
            this.showWareHouse(dbs.obVillage.obWarehouse);
        }

        _proto._onWarehoueOutItem = function(pType, pValue) {
            // 向仓库界面收取物品
            this.showPutValue(pType, pValue * -1);
            // 刷新仓库信息
            this.showWareHouse(dbs.obVillage.obWarehouse);
        }

        _proto.onContainerChange = function(obContainer, itemType, oldValue, itemValue) {
            this._showContainerValue(obContainer);
        }

        _proto._showContainerValue = function(obContainer) {
            this.lblContainerValue.text = obContainer.nowCapacity + " / " + obContainer.capacitySize;
        }

        /**
         * 显示仓库容量信息
         * @param {dbs.ProductionsWarehouse} obWarehouse 村庄的大仓库
         */
        _proto.showWareHouse = function(obWarehouse) {
            this.lblWarehouse.text = obWarehouse.getNowCapacity() + " / " + obWarehouse.getCapacitySize();
        }

        /**
         * 注册到窗口管理
         */
        mod.Wd.RegWindow(
            "productions",
            function() { return new uiEx.Productions(); },
            [{url: "res/atlas/comp/production.json", type: Laya.Loader.ATLAS}]
        );

        return Productions;
    }(ui.productionUI));
    uiEx.Productions = Productions;
})(uiEx || (uiEx = {}));
