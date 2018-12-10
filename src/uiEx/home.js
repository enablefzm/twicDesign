/**
* name 
*/
var uiEx;
(function (uiEx) {
    var Home = (function (_super) {
        function Home() {
            Home.super(this);
            this.butFight.on(Laya.Event.CLICK, this, function() {
                // mod.Wd.openWindow("battle", function(obWin) {
                //     conn.Send("ep create");
                // });
                // this.buildUp("centre");
                // this.buildUp("wall");
                var obExplore = dbs.obVillage.obExplore;
                if (obExplore.nowCard != null) {
                    // 有卡边需要处理
                    cards.openCardBox(obExplore.nowCard);
                } else {
                    // 发送创建卡边命令
                    mod.Wd.openWindow("interlude", function(obWin){});
                }
            });
            this.butRank.on(Laya.Event.CLICK, this, function() {
                var sp = new Laya.Sprite();
                sp.graphics.drawPie(54, 56, 60, -90, 180, "#EAEAEA");
                sp.alpha = 0.5;
                this.butRank.mask = sp;
            });
            // 绑定升级农场
            this.butFarm.getButUp().on(Laya.Event.CLICK, this, function() { 
                // 获得下一级需要的金币数量
                var obProductions = dbs.obVillage.obProductions;
                var needGold = obProductions.needGold;
                // 执行窗口提示
                mod.Fet.showConfirm(
                    ["花费 " + mod.Fet.formatCurrency(needGold) + " 金币将", "【生产中心】升到 " + (obProductions.level + 1) + " 级"],
                    Laya.Handler.create(this, function(){ conn.Send("build up farm"); })
                );
            });
            // 绑定升级仓库
            this.butWarehouse.getButUp().on(Laya.Event.CLICK, this, function(params) { 
                // 获得仓库对象
                var obWarehouse = dbs.obVillage.obWarehouse;
                var needGold = obWarehouse.needGold;
                // 执行窗口提示
                mod.Fet.showConfirm(
                    ["花费 " + mod.Fet.formatCurrency(needGold) + " 金币将", "【仓库】升到 " + (obWarehouse.level + 1) + " 级"],
                    Laya.Handler.create(this, function(){ conn.Send("build up warehouse"); })
                );
            });

            this.on(Laya.Event.ADDED, this, function() {
                // 绑定事件
                dbs.obVillage.on(dbs.Event.INITDB, this, this.showInfo);
                // 绑定货币信息
                dbs.obVillage.obCurrency.on(dbs.Event.INITDB, this, this.showCurrency);
                // 绑定城墙刷新事件
                dbs.obVillage.obWall.on(dbs.Event.INITDB, this, this.showWall);
                // 绑定大仓库刷新数据事件
                dbs.obVillage.obWarehouse.on(dbs.Event.INITDB, this, this.showWareHouse);
                // 绑定金币发生变化时执行
                dbs.obVillage.obCurrency.on(Laya.Event.CHANGE, this, this.onCurrencyChange);
                // 绑定卡片增加事件
                dbs.obVillage.obExplore.on(dbs.Event.ADD_VALUE, this, this.onAddCard);
                // 绑定卡片删除事件
                dbs.obVillage.obExplore.on(dbs.Event.DEL_VALUE, this, this.onDelCard);
                // 判断物品生产信息
                Laya.timer.once(200, this, function() {
                    dbs.obVillage.obProductions.obProqueue.on("PRO_RUNING", this.obMakeProduction, this.obMakeProduction.onProRuning);
                    // 生产中心停止生产
                    dbs.obVillage.obProductions.obProqueue.on("PRO_STOP", this.obMakeProduction, this.obMakeProduction.onProStop);
                    // 生产中心有产出物品
                    dbs.obVillage.obProductions.obProqueue.on("PRO_CREATE", this.obMakeProduction, this.obMakeProduction.onCreateItem);
                    // 初始化设定
                    dbs.obVillage.obProductions.obProqueue.on(dbs.Event.INITDB, this, this.showFarm);
                    // 绑定仓库有进物品事件
                    dbs.obVillage.obProductions.obProqueue.obContainer.on("PUTITEM", this.obMakeProduction, this.obMakeProduction.onPutItem);
                });
            });

            this.on(Laya.Event.REMOVED, this, function() {
                // 绑定事件
                dbs.obVillage.off(dbs.Event.INITDB, this, this.showInfo);
                // 绑定货币信息
                dbs.obVillage.obCurrency.off(dbs.Event.INITDB, this, this.showCurrency);
                // 绑定城墙刷新事件
                dbs.obVillage.obWall.off(dbs.Event.INITDB, this, this.showWall);
                // 绑定大仓库刷新数据事件
                dbs.obVillage.obWarehouse.off(dbs.Event.INITDB, this, this.showWareHouse);
                // 绑定金币发生变化时执行
                dbs.obVillage.obCurrency.off(Laya.Event.CHANGE, this, this.onCurrencyChange);
                // 判断物品生产信息
                dbs.obVillage.obProductions.obProqueue.off("PRO_RUNING", this.obMakeProduction, this.obMakeProduction.onProRuning);
                // 生产中心停止生产
                dbs.obVillage.obProductions.obProqueue.off("PRO_STOP", this.obMakeProduction, this.obMakeProduction.onProStop);
                // 生产中心有产出物品
                dbs.obVillage.obProductions.obProqueue.off("PRO_CREATE", this.obMakeProduction, this.obMakeProduction.onCreateItem);
                // 解绑生产中心队列信息
                dbs.obVillage.obProductions.obProqueue.off(dbs.Event.INITDB, this, this.showFarm);
                // 绑定仓库有进物品事件
                dbs.obVillage.obProductions.obProqueue.obContainer.off("PUTITEM", this.obMakeProduction, this.obMakeProduction.onPutItem);
                // 取消卡片添加事件
                dbs.obVillage.obExplore.off(dbs.Event.ADD_VALUE, this, this.onAddCard);
                // 取消卡片删除事件
                dbs.obVillage.obExplore.off(dbs.Event.DEL_VALUE, this, this.onDelCard);
            });

            // 当各个建筑被点击时

            // 点击生产中心图标事件处理
            this.imgFarm.on(Laya.Event.CLICK, this.imgFarm, function() { 
                mod.Sound.playDrum();
                mod.Tween.showBig(this, 1.1); 

                // 显示生产中心界面
                Laya.timer.once(200, null, function() {
                    mod.Wd.OpenMainWindow("productions", function(obWin){
                        // 显示数据
                        obWin.showInfo();
                    })
                });
                
            });
            
            // 点击仓库图标事件处理
            this.imgWarehouse.on(Laya.Event.CLICK, this.imgWarehouse, function() { 
                mod.Sound.playDrum();
                mod.Tween.showBig(this, 1.1);

                // 显示仓库界面
                Laya.timer.once(200, null, function(){
                    mod.Wd.OpenMainWindow("bag");
                })
            });

            this.imgWall.on(Laya.Event.CLICK, this.imgWall, function() { 
                mod.Sound.playDrum();
                mod.Tween.showBig(this, 1.1); 
            });

            //点击兵营图标事件处理
            this.imgCentre.on(Laya.Event.CLICK, this.imgCentre, function() { 
                mod.Sound.playDrum();
                mod.Tween.showBig(this, 1.05);

                //显示兵营界面
                Laya.timer.once(200, null, function(){
                    mod.Wd.OpenMainWindow("barracks"); 
                })
            });

            //点击加工场图标事件处理
            this.imgMachine.on(Laya.Event.CLICK, this.imgMachine, function() {
                mod.Sound.playDrum();
                mod.Tween.showBig(this, 1.05);

                // 显示加工界面
                Laya.timer.once(200, null, function(){
                   //  Laya.stage.addChild(new uiEx.machining()) ;
                   mod.Wd.OpenMainWindow("machining");
                });
                
            });
    
        }
        Laya.class(Home, "uiEx.Home", _super);
        var _proto = Home.prototype;

        /**
         * 显示玩家的村庄信息
         */
        _proto.showInfo = function(obVillage) {
            // 显示基本信息
            this.txtName.text = "Lv" + obVillage.level + " " + obVillage.name;
            this.txtExp.text = obVillage.exp + " / " + obVillage.maxExp;
            this.proExp.value = obVillage.exp / obVillage.maxExp;
            // 刷新按钮
            this.renewUpBut();
            // 显示农场的生产信息
            this.showFarm(dbs.obVillage.obProductions.obProqueue);
            // 显示当前信息
            this.showExploreInfo(dbs.obVillage.obExplore);
        }

        /**
         * 显示探索卡片信息
         */
        _proto.showExploreInfo = function(obExplore) {
            // 显示探索卡边信息
            this.exploreCards.showInfo(obExplore);
            // 显示次数
            this.lblDoHow.text = obExplore.remainder; // + "/" + obExplore.maxRemainder;
        }

        /**
         * 显示货币信息
         * @param {dbs.Currency} obCurrency 货币对象
         */
        _proto.showCurrency = function(obCurrency) {
            this.fntGold.value = mod.Fet.formatCurrency(obCurrency.gold);
            this.fntDiamond.value = obCurrency.diamond;
            this.fntMedal.value = obCurrency.medal;
        }

        /**
         * 显示农场信息
         * @param {dbs.Proqueue} obProqueue 农场数据对象
         */
        _proto.showFarm = function(obProqueue) {
            // this.obMakeProduction.setMarkValue()
            this.obMakeProduction.setImgItem(obProqueue.obBuildItem.getImage());
        }

        /**
         * 显示粮创信息
         * @param {dbs.ProductionsWarehouse} obWarehouse 粮仓数据对象
         */
        _proto.showWareHouse = function(obWarehouse) {
            this.wareHouseFood.text = "库存：" + obWarehouse.getNowCapacity() + " / " + obWarehouse.getCapacitySize();
        }

        /**
         * 显示城墙信息
         * @param {dbs.Wall} obWall 城墙数据对象
         */
        _proto.showWall = function(obWall) {
            this.lblWallDefense.text = "防御值：" + obWall.defense;
        }

        _proto.showCentre = function(vInfo) {
            // this.butCentre.showInfo(vInfo.level, vInfo.needGold, this.gold);
        }

        /**
         * 当货币数据发生变化时
         * @param {string} currencyType 发生货币的类型
         * @param {int} value 具体的货币数值
         * @param {int} changeValue 当前增加的货币数量
         */
        _proto.onCurrencyChange = function(currencyType, value, changeValue) {
            this._showOperateCurrency(this.fntGold, this.imgGold, value, changeValue);
            // 刷新按钮状态信息
            this.renewUpBut();
        }

        _proto._showOperateCurrency = function(objFnt, imgGold, value, changeValue) {
            if (changeValue == 0) {
                return
            }
            var arrValue = [];
            var nowValue = value - changeValue;
            if (changeValue > 0) {
            var r = Math.ceil(changeValue / 6);
                while (nowValue < value) {
                    nowValue += r;
                    if (nowValue > value) {
                        arrValue.push(value);
                        break;
                    }
                    arrValue.push(nowValue);
                }
            } else {
                var r = Math.floor(changeValue / 6);
                while (nowValue > value) {
                    nowValue += r;
                    if (nowValue < value) {
                        arrValue.push(value);
                        break;
                    }
                    arrValue.push(nowValue);
                }
            }
            var delay = 200;
            for (var i = 0; i < arrValue.length; i++) {
                var v = arrValue[i];
                Laya.Tween.to(objFnt, {scaleX: 1.2, scaleY: 1.2}, 100, null, null, delay * i);
                Laya.Tween.to(objFnt, {scaleX: 1, scaleY: 1}, 100, null, Laya.Handler.create(this, function(v){ objFnt.value = mod.Fet.formatCurrency(v); }, [v]), delay * i + 100);
                Laya.Tween.to(imgGold, {scaleX: 1.1, scaleY: 1.1}, 100, Laya.Ease.backIn, null, delay * i);
                Laya.Tween.to(imgGold, {scaleX: 1, scaleY: 1}, 100, null, null, delay * i + 100);
            }
        }

        // 响应探索卡片里添加卡片事件
        _proto.onAddCard = function(obCard) {
            Laya.timer.once(9000, this.exploreCards, this.exploreCards.showInfo, [dbs.obVillage.obExplore]);
        }

        // 响应探索卡片组里删除了卡片
        _proto.onDelCard = function(obCard) {
            this.exploreCards.showInfo(dbs.obVillage.obExplore);
        }

        /**
         * 当粮仓信息发生变化时
         * @param {dbs.Warehouse} obWarehouse 粮仓数据对象
         * @param {int} addValue 被增加的数值
         */
        _proto.onWarehouseChange = function(obWarehouse, addValue) {
            this.showWareHouse(obWarehouse);
        }

        /**
         * 刷新升级按钮状态
         */
        _proto.renewUpBut = function() {
            // 检查城墙的按钮
            this.butWall.showInfo(dbs.obVillage.obWall.level, dbs.obVillage.obWall.needGold, dbs.obVillage.obCurrency.gold);
            // 指挥中心
            this.butCentre.showInfo(1, 10000, dbs.obVillage.obCurrency.gold);
            // 生产中心
            this.butFarm.showInfo(dbs.obVillage.obProductions.level, dbs.obVillage.obProductions.needGold, dbs.obVillage.obCurrency.gold);
            // 仓库
            this.butWarehouse.showInfo(dbs.obVillage.obWarehouse.level, dbs.obVillage.obWarehouse.needGold, dbs.obVillage.obCurrency.gold);
        }

        /**
         * 显示售出货物得到金币的数量
         * @param {int} goldValue 获得的金币数量
         */
        _proto._showSellFood = function(goldValue) {
            // 播放音效
            mod.Sound.playSellFood();
            var baseStep = 10;
            // 计算要产生的金币数量
            var stepGold = Math.ceil(goldValue / baseStep);
            // if (stepGold < 1) {
            //     stepGold = 1;
            // }
            var arrGolds = [];
            var addCount = 0;
            while (addCount < goldValue) {
                addCount += stepGold;
                if (addCount >= goldValue) {
                    arrGolds.push(goldValue - (addCount - stepGold));
                    break;
                }
                arrGolds.push(stepGold);
            }
            // 在界面上产生金币
            for (var i = 0; i < arrGolds.length; i++) {
                var self = this;
                // 随机产生金币
                var ob = Laya.Pool.getItemByCreateFun("FOODGOLD", function() {
                    var res = new mod.TObject.FoodGold(320, 50);
                    self.gameBox.addChild(res);
                    res.on(Laya.Event.COMPLETE, self, self._showSellFoodEnd);
                    return res;
                });
                var x = mod.Fet.rand(250, 450);
                var y = mod.Fet.rand(800, 850);
                ob.x = x;
                ob.y = y;
                var value = arrGolds[i];
                ob.play(value);
            }
            Laya.timer.once(2400, this, function() { dbs.obVillage.obCurrency.addGold(goldValue); }, null, false);
        }

        /**
         * 升级建筑
         * @param {string} buildType 建筑类型
         */
        _proto.buildUp = function(buildType) {
            switch (buildType) {
                case "farm":
                this._showUpLv(this.imgFarm, null, -60);
                break;
                case "warehouse":
                this._showUpLv(this.imgWarehouse, 30, -60);
                break;
                case "centre":
                this._showUpLv(this.imgCentre, 60, -60);
                break;
                case "wall":
                this._showUpLv(this.imgWall, null, -60);
                break;
            }
        }

        _proto._showSellFoodEnd = function(obGold) {
            obGold.visible = false;
            Laya.Pool.recover("FOODGOLD", obGold);
        }

        _proto._showUpLv = function(obj, deviationX, deviationY) {
            mod.Tween.showBig(obj, 1.2, Laya.Handler.create(this, function() {
                Laya.timer.once(300, this, function() {
                    var ob = mod.Ani.createAni("lvup", [0, false]);
                    ob.width = 232;
                    ob.height = 243;
                    var tx = (deviationX) ? obj.x + deviationX : obj.x;
                    var ty = (deviationY) ? obj.y + deviationY : obj.y;
                    ob.x = tx;
                    ob.y = ty;
                    ob.on(Laya.Event.COMPLETE, ob, function() {
                        this.destroy();
                    });
                    this.gameBox.addChild(ob);
                });
            }));
        }

        /**
         * 注册到窗口管理对象
         */
        mod.Wd.RegWindow(
            "home",
            function() { return new uiEx.Home(); },
            [{url: "res/atlas/comp.json", type: Laya.Loader.ATLAS}]
        );
        return Home;
    }(ui.homeUI));
    uiEx.Home = Home;
})(uiEx || (uiEx = {}));
