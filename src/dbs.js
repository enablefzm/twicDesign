/**
* 存放游戏数据
*/
var dbs;
(function (dbs) {
    dbs.Event = {
        INITDB:     "initdb",
        PRODUCTION: "production",
        WORKTIME:   "worktime",
        WORKSTART:  "workstart",
        WORKSTOP:   "workstop",
        STOPDO:     "stopdo",
        SHOOT:      "shoot",
        DIE:        "die",
        ADD_VALUE:  "addvalue",
        DEL_VALUE:  "delvalue"
    };

    dbs.ItemType = {
        PRODUCTION: 1,
        GOODS:      2,
        CURRENCY:   3,
    };

    dbs.CurrencyType = {
        GOLD: 1,
        EXP:  3
    }

    dbs.Func = {
        // 通过物品类型获得相应的图片路径
        getItemTypeImage: function(pType) {
            return "res/items/sc_icon0" + pType + ".png";
        },

        getItemImage: function(pType) {
            return "res/items/i_" + pType + ".png";
        },

        getCurrencyImage: function(pType) {
            return "res/items/currency_" + pType + ".png";
        },

        getDropItemOnCache: function() {
            var dropItem = Laya.Pool.getItemByCreateFun("CITEM", function() {
                var pImage = new Laya.Image();
                pImage.width = 60;
                pImage.height = 60;
                pImage.on(Laya.Event.REMOVED, pImage, function(p) {
                    Laya.Pool.recover("CITEM", p);
                }, [pImage]);
                // 创建生产数量的Label
                var lblHow = new Laya.Label();
                lblHow.fontSize = 20;
                lblHow.width = 60;
                lblHow.height = 20;
                lblHow.align = "right";
                lblHow.color = "#1e711e";
                lblHow.x = 15;
                lblHow.centerY = 0;
                pImage.addChild(lblHow);
                pImage.oblblHow = lblHow;
                return pImage;
            });
            return dropItem;
        },

        createExploreCard: function(db) {
            switch (db.cardType) {
            // 商人
            case 1:
                return new dbs.CardBusiness(db);
            // 宝箱盒子
            case 2:
                return new dbs.CardBox(db);
            // 战斗
            case 3:
                return new dbs.CardFight(db);
            }
            return null;
        }
    };

    /**
     * 村庄信息对象
     */
    dbs.Village = (function () {
        function Village() {
            Village.super(this);
            // 村庄的基本信息
            this.id = 0;
            this.uid = 0;
            this.name = "";
            this.level = 0;
            this.exp = 0;
            this.maxExp = 100;
            // 村庄里的各个对象信息
            this.obCurrency = new dbs.Currency();
            // 城墙
            this.obWall = new dbs.Wall();
            // 生产中心
            this.obProductions = new dbs.Productions();
            // 大仓库
            this.obWarehouse = new dbs.ProductionsWarehouse();
            // 探索对象
            this.obExplore = new dbs.Explore();
        }
        Laya.class(Village, "dbs.Village", Laya.EventDispatcher);
        var _proto = Village.prototype;

        /**
         * 初始化当前数据信息
         */
        _proto.initDb = function(db) {
            this.name = db.name;
            this.exp = db.exp;
            this.maxExp = db.nextExp;
            this.level = db.level;
            // 初始化金币
            this.obCurrency.initDb(db.currency);
            // 初始化城墙
            this.obWall.initDb(db.wall);
            // 初始化生产中心
            this.obProductions.initDb(db.productions);
            // 初始化大仓库
            this.obWarehouse.initDb(db.productionsWarehouse);
            // 初始化探索对象
            this.obExplore.initDb(db.explore);
            // 事件触发
            this.event(dbs.Event.INITDB, [this]);
        }

        /**
         * 获得物品，将物品放入到村庄
         * @param {dbs.Items} obItem 要被入到村庄里的物品对象
         * @param {bool} isPut 是否是放入物品（默认为false）
         */
        _proto.operateItem = function(obItem, isPut) {
            switch (obItem.itemType) {
                // 家产品
                case dbs.ItemType.PRODUCTION:
                    if (isPut) {
                        this.obWarehouse.obContainer.putItem(obItem.itemOtherID, obItem.itemValue);
                    } else {
                        this.obWarehouse.obContainer.outItem(obItem.itemOtherID, obItem.itemValue);
                    }
                break;
                // 道具类
                case dbs.ItemType.GOODS:
                break;
                // 货币类
                case dbs.ItemType.CURRENCY:
                switch (obItem.itemOtherID) {
                    // 添加到货币
                    case dbs.CurrencyType.GOLD:
                    if (isPut) {
                        this.obCurrency.addGold(obItem.itemValue);
                    } else {
                        this.obCurrency.addGold(obItem.itemValue * -1);
                    }
                }
                break;
            }
        }

        return Village;
    }());
    
    dbs.Explore = (function() {
        function Explore() {
            this.nowCard = null;
            this.cardList = [];
            this.maxRemainder = 0;
            this.remainder = 0;
        }
        Laya.class(Explore, "dbs.Explore", Laya.EventDispatcher);
        var _proto = Explore.prototype;
        _proto.initDb = function(db) {
            this.maxRemainder = db.maxRemainder;
            this.remainder = db.remainder;
            if (db.nowCard) {
                this.nowCard = dbs.Func.createExploreCard(db.nowCard);
            } else {
                this.nowCard = null;
            }
            // 判断当前的数据列表
            this.cardList = [];
            for (var k in db.cardList) {
                this.cardList.push(dbs.Func.createExploreCard(db.cardList[k]));
            }
        }
        _proto.addCard = function(obCard, pointID) {
            if (pointID == 0) {
                this.nowCard = obCard;
            } else {
                this.cardList.push(obCard);
                // 刷新事件
                this.event(dbs.Event.ADD_VALUE, [obCard]);
            }
        }
        _proto.delCard = function(cardID) {
            if (this.nowCard != null && this.nowCard.getID() == cardID) {
                var obCard = this.nowCard;
                this.nowCard = null;
                this.event(dbs.Event.DEL_VALUE, [obCard]);
            } else {
                for (var i = 0; i < this.cardList.length; i++) {
                    var obCard = this.cardList[i];
                    if (obCard.getID() == cardID) {
                        this.cardList.splice(i, 1);
                        // 删除卡片事件
                        this.event(dbs.Event.DEL_VALUE, [obCard]);
                        break;
                    }
                }
            }
        }

        /**
         * 刷新指定的卡片信息
         * @param {object} db 刷新的数据
         */
        _proto.renewCard = function(db) {
            // 获取ID
            var pointID = db.id;
            // 判断当前卡里是否有这张卡片
            for (var i = 0; i < this.cardList.length; i++) {
                var tmpOb = this.cardList[i];
                if (tmpOb.getID() == pointID) {
                    if (tmpOb.getType() == db.cardType) {
                        tmpOb.initDb(db);
                        // 获取
                        this.event(Laya.Event.CHANGE, [tmpOb]);
                    }
                }
            }
        }

        _proto.getCardOnID = function(cardID) {
            if (this.nowCard != null && this.nowCard.getID() == cardID) {
                return this.nowCard;
            }
            for (var i = 0; i < this.cardList.length; i++) {
                var obCard = this.cardList[i];
                if (obCard.getID() == cardID) {
                    return obCard;
                }
            }
            return null;
        }
        _proto.getCardCount = function() {
            return this.cardList.length;
        }
        return Explore;
    }())

    /**
     * 村庄的货币对象
     */
    dbs.Currency = (function() {
        function Currency() {
            Currency.super(this);
            this.gold = 0;
            this.medal = 0;
            this.diamond = 0;
        }
        Laya.class(Currency, "dbs.Currency", Laya.EventDispatcher);
        var _proto = Currency.prototype;

        /**
         * 初始化货币信息对象
         * @param {object} db 货币信息数组
         */
        _proto.initDb = function(db) {
            this.gold = db.gold;
            this.diamond = db.diamond;
            this.medal = db.medal;
            this.event(dbs.Event.INITDB, [this]);
        }

        /**
         * 添加金币-会触发Laya.Event.CHANGE
         * @param {int} v 要被添加的金币数量
         */
        _proto.addGold = function(v) {
            this.gold += v;
            if (this.gold < 0) {
                this.gold = 0;
            }
            this.event(Laya.Event.CHANGE, ["gold", this.gold, v]);
        }

        /**
         * 执行刷新货币
         */
        _proto.renew = function() {
            conn.Send("village currency");
        }

        return Currency;
    }());

    /**
     * 城墙
     */
    dbs.Wall = (function() {
        function Wall() {
            Wall.super(this);
            this.defense = 0;
            this.level = 1;
            this.needGold = 0;
        }
        Laya.class(Wall, "dbs.Wall", Laya.EventDispatcher);
        var _proto = Wall.prototype;
        _proto.initDb = function(db) {
            this.defense = db.defense;
            this.level = db.level;
            this.needGold = db.needGold;
            this.event(dbs.Event.INITDB, [this]);
        }
        return Wall;
    }());

    /**
     * 大仓库
     */
    dbs.ProductionsWarehouse = (function(){
        function ProductionsWarehouse() {
            ProductionsWarehouse.super(this);
            this.level = 1;
            this.needGold = 1000;
            this.obContainer = new dbs.Container();
        }
    
        Laya.class(ProductionsWarehouse, "dbs.ProductionsWarehouse", Laya.EventDispatcher);
        var _proto = ProductionsWarehouse.prototype;

        _proto.initDb = function(db) {
            this.level = db.level;
            this.needGold = db.needGold;
            this.obContainer.initDb(db);
            // 触发当前INITDB事件
            this.event(dbs.Event.INITDB, [this]);
        }

        _proto.getNowCapacity = function() {
            return this.obContainer.nowCapacity;
        }

        _proto.getCapacitySize = function() {
            return this.obContainer.capacitySize;
        }

        _proto.getItems = function() {
            return this.obContainer.mpProduction;
        }

        /**
         * 获取指定物品类型的数量
         * @param  {int} pType 物品类型
         * @return {int}       物品的具体数量
         */
        _proto.getProductionValue = function(pType) {
            return this.obContainer.getItemValue(pType);
        }

        return ProductionsWarehouse;
    }());

    /**
     * 生产中心
     */
    dbs.Productions = (function(){
        function Productions() {
            Productions.super(this);
            this.level = 1;
            this.needGold = 1000;
            this.obProqueue = new dbs.Proqueue();
            this.obProductionPrices = new dbs.ProductionPrices();
        }

        Laya.class(Productions, "dbs.Productions", Laya.EventDispatcher);
        var _proto = Productions.prototype;

        _proto.initDb = function(db) {
            this.level = db.level;
            this.needGold = db.needGold;
            this.obProqueue.initDb(db.proqueue);
            this.obProductionPrices.initDb(db.queueInfos, db.nextQueueInfo);
            this.event(dbs.Event.INITDB, [this]);
        }

        _proto.getQueueContainer = function() {
            return this.obProqueue.obContainer;
        }

        return Productions;
    }());

    dbs.Proqueue = (function(){
        function Proqueue() {
            Proqueue.super(this);
            this.farms = 0;
            // 剩余下一次刷新的时间
            this.lastTime = 0;
            // 生产所需要的时间
            this.needTime = 3;
            // 一次生产可以获得多少物资
            this.buildValue = 1;
            // 仓库容量对象
            this.obContainer = new dbs.Container();
            // 生产对列信息
            this.obBuildItem = new dbs.ProductionItem();
            // 剩余时间
            this.toSecond = 0;
            this.tmpTest = 0;
        }

        Laya.class(Proqueue, "dbs.Proqueue", Laya.EventDispatcher);
        var _proto = Proqueue.prototype;

        _proto.initDb = function(db) {
            this.farms = db.farms;
            this.needTime = db.needTime;
            this.buildValue = db.buildValue;
            this.lastTime = mod.Fet.nowTime() - db.surplusTime; // this.needTime +
            this.obContainer.initDb(db.container);
            this.obBuildItem.initDb(db.productionInfo);
            this.event(dbs.Event.INITDB, [this]);
            this.doRun();
        }

        _proto.doRun = function() {
            Laya.timer.clear(this, this.runing);
            Laya.timer.loop(1000, this, this.runing);           
            this.runing();
        }

        /**
         * 执行运行生产
         * 产生事件，事件携带参数为 当前过去多少时间,是否有物品产出，为0则没有产出
         * Event args[toSecond, needTime, productionValue]
         */
        _proto.runing = function() {
            var nowTime = mod.Fet.nowTime();
            var toSecond = nowTime - this.lastTime;
            var how = Math.floor(toSecond / this.needTime);
            this.lastTime = nowTime - Math.floor(toSecond % this.needTime);
            var productionValue = 0;
            if (how > 0) {
                // 获得了物品
                productionValue = how * this.buildValue;
                // 将生产后的物品放入临时仓库
                this.obContainer.putItem(this.obBuildItem.productionType, productionValue);
                // 触发获得物品
                this.event("PRO_CREATE", [this.obBuildItem, productionValue]);
            }
            this.toSecond = nowTime - this.lastTime;
            if (this.obContainer.isFull()) {
                this.event("PRO_STOP", []);
            } else {
                this.event("PRO_RUNING", [this.toSecond, this.needTime, productionValue]);
            }
        }

        return Proqueue;
    }());

    /**
     * 商品的价格管理对象
     */
    dbs.ProductionPrices = (function() {
        function ProductionPrices() {
            ProductionPrices.super(this);
            // 存放商品价格对象数组
            this.arrProductionPrice = [];
            // 下一级可以获取的信息
            this.nextProduction = null;
            // 回调函数
            this.handBack = null;
        }

        Laya.class(ProductionPrices, "dbs.ProductionPrices", Laya.EventDispatcher);
        var _proto = ProductionPrices.prototype;

        _proto.initDb = function(arrProductions, nextProduction) {
            this.arrProductionPrice = [];
            for (var k in arrProductions) {
                var ob = new dbs.ProductionItemPrice();
                ob.initDb(arrProductions[k]);
                this.arrProductionPrice.push(ob);
            }
            if (nextProduction) {
                this.nextProduction = new dbs.ProductionNextItem();
                this.nextProduction.initNextDb(nextProduction);
            } else {
                this.nextProduction = null;
            }
        }

        /**
         * 获得市场价格
         * @param {Laya.Handle} handBack    回调函数
         * @param {bool}        isBackFunc  是否需要回调函
         */
        _proto.getMarketPrice = function(handBack, isBackFunc) {
            // 判断是否需要更新数据
            var arr = [];
            // 获取当前的时间
            var nowTime = mod.Fet.nowTime();
            for (var k in this.arrProductionPrice) {
                var obPrice = this.arrProductionPrice[k];
                if (obPrice.getSurplusTime(nowTime) < 0) {
                    arr.push(obPrice.getProductionType());
                }
            }
            // 如果有需要更新则等回调
            if (arr.length > 0) {
                conn.Send("market p " + arr.join(" "));
                if (handBack && isBackFunc)
                    this.handBack = handBack;
            } else {
                if (handBack) 
                    handBack.runWith(this);
            }
        }

        _proto.getProductionPrice = function(pType) {
            for (var k in this.arrProductionPrice) {
                var obPrice = this.arrProductionPrice[k];
                if (obPrice.productionType == pType) {
                    return obPrice.price;
                }
            }
            return 0;
        }

        _proto.initMarketPrice = function(db) {
            for (var i = 0; i < db.length; i++) {
                var d = db[i];
                for (var k in this.arrProductionPrice) {
                    var ob = this.arrProductionPrice[k];
                    if (ob.getProductionType() == d.productionType) {
                        ob.initPriceDb(d);
                        break;
                    }
                }
            }
            if (this.handBack) {
                this.handBack.runWith(this);
                this.handBack = null;
            }
            // 触发事件
            this.event(Laya.Event.CHANGE, [this]);
        }

        _proto.startRun = function() {
            this.stopRun();
            Laya.timer.loop(2000, this, this._running);
        }

        _proto._running = function() {
            // console.log("运行检查是需要更新");
            this.getMarketPrice(null);
        }

        _proto.stopRun = function() {
            Laya.timer.clear(this, this._running);
        }

        return ProductionPrices;
    }());

    /**
     * 资源的容器
     */
    dbs.Container = (function(){
        function Container() {
            Container.super(this);
            this.capacitySize = 100;
            this.nowCapacity = 0;
            // 当前仓库物品信息
            this.mpProduction = {};
        }

        // 继承Laya通知类
        Laya.class(Container, "dbs.Container", Laya.EventDispatcher);
        var _proto = Container.prototype;

        _proto.initDb = function(db) {
            this.capacitySize = db.capacitySize;
            this.nowCapacity = db.nowCapacity;
            this.mpProduction = db.mpProduction;
            this.event(Laya.Event.CHANGE, [this]);
        }
        
        /**
         * 将物品放入容器
         * @param {int} itemType  物品类型
         * @param {int} itemValue 物品数量
         * @return {int}          返回具体放进容器里的数量
         */
        _proto.putItem = function(itemType, itemValue) {
            // 判断可以放的容量
            var canPutValue = this.capacitySize - this.nowCapacity;
            if (itemValue > canPutValue) {
                itemValue = canPutValue;
            }
            if (itemValue < 1) {
                return 0;
            }
            this.nowCapacity += itemValue;
            if (this.mpProduction[itemType]) {
                this.mpProduction[itemType] += itemValue;
            } else {
                this.mpProduction[itemType] = itemValue;
            }
            // 触发有新物品进入容器
            this.event("PUTITEM", [itemType, itemValue]);
            // 当仓库发生变化时执行
            var oldValue = this.mpProduction[itemType] - itemValue;
            this.event(Laya.Event.CHANGE, [this, itemType, oldValue, itemValue]);
            return itemValue;
        }

        /**
         * 将物品拿出容器
         * @param {int} itemType  要拿出物品的类型
         * @param {int} itemValue 要拿出物品的具体数量
         * @return {int} 被拿出物品的数量
         */
        _proto.outItem = function(itemType, itemValue) {
            if (itemValue < 0)
                return 0;
            if (this.mpProduction[itemType]) {
                var outItemValue = itemValue;
                if (this.mpProduction[itemType] < outItemValue) {
                    outItemValue = this.mpProduction[itemType];
                }
                this.mpProduction[itemType] -= outItemValue;
                var oldValue = this.mpProduction[itemType] + outItemValue;
                // 容量重新计算
                this.nowCapacity -= outItemValue;
                // 触发物品离开容器
                this.event("OUTITEM", [itemType, outItemValue]);
                this.event(Laya.Event.CHANGE, [this, itemType, oldValue, outItemValue]);
                return itemValue;
            }
            return 0;
        }

        _proto.getItemValue = function(itemType) {
            if (this.mpProduction[itemType]) {
                return this.mpProduction[itemType];
            }
            return 0;
        }

        /**
         * 判断仓库是不是满的
         * @return {bool} 如果满的返回true
         */
        _proto.isFull = function() {
            if (this.nowCapacity >= this.capacitySize) {
                return true;
            }
            return false;
        }
        return Container;
    }());

    // 生产物品基类
    dbs.ProductionItem = (function() {
        function ProductionItem() {
            ProductionItem.super(this);
            this.name = "";
            this.needTime = 0;
            this.productionType = 1;
        }
        Laya.class(ProductionItem, "dbs.ProductionItem", Laya.EventDispatcher);
        var _proto = ProductionItem.prototype;
        _proto.initDb = function(db) {
            this.name = db.name;
            this.needTime = db.needTime;
            this.productionType = db.productionType;
            this.needLevel = db.needLevel;
        }
        _proto.getImage = function() {
            return dbs.Func.getItemTypeImage(this.productionType);
        }
        _proto.getName = function() {
            return this.name;
        }
        _proto.getNeedTime = function() {
            return this.needTime;
        }
        _proto.getProductionType = function() {
            return this.productionType;
        }
        return ProductionItem;
    }());

    dbs.ProductionItemPrice = (function() {
        function ProductionItemPrice() {
            ProductionItemPrice.super(this);
            this.price = 0;             // 商品价格
            this.basePrice = 0;         // 商品的基本价格
            this.quantity = 0;          // 当前商品的数量
            this.isUp = false;          // 当前价格走势是上升还是降
            this.topPrice = 0;          // 当前行情最高价
            this.lowPrice = 0;          // 当前行情最低价
            this.nextRenewTime = 0;     // 下一次刷新时间
            this.logs = [];
        }

        // 继承
        Laya.class(ProductionItemPrice, "dbs.ProductionItemPrice", dbs.ProductionItem);
        var _proto = ProductionItemPrice.prototype;

        /**
         * 初始化对象
         */
        _proto.initPriceDb = function(db) {
            // 初始化商品价格
            this.isUp = db.isUp;
            // 距下一次更新的时间
            this.nextRenewTime = mod.Fet.nowTime() + db.nextTime;
            // 当前的商品价格
            this.price = db.nowPrice;
            // 基本价格
            this.basePrice = db.basePrice;
            // 最高价
            this.topPrice = db.topPrice;
            // 最低价
            this.lowPrice = db.lowPrice;
            // 日志
            this.logs = db.priceLogs;
            // 触发日志
            this.event(Laya.Event.CHANGE, [this]);
        }

        /**
         * 获取剩余刷新时间
         * @return {int} 如果大于0说明不需要刷新
         */
        _proto.getSurplusTime = function(nowTime) {
            return this.nextRenewTime - nowTime;
        }
        
        return ProductionItemPrice;
    }());

    // 下一个生产类型对象
    dbs.ProductionNextItem = (function(_super) {
        function ProductionNextItem() {
            ProductionNextItem.super(this);
            this.openNeedGold = 0;
        }
        Laya.class(ProductionNextItem, "dbs.ProductionNextItem", _super);
        var _proto = ProductionNextItem.prototype;
        _proto.initNextDb = function(db) {
            this.initDb(db);
            this.openNeedGold = db.openNeedGold;
        }
        _proto.getOpenNeedGold = function() {
            return this.openNeedGold;
        }
        return ProductionNextItem;
    }(dbs.ProductionItem))

    // 宝箱卡边
    dbs.CardBox = (function() {
        function CardBox(db) {
            this.id = 0;
            this.cardType = 2;
            this.complete = false;
            this.needItems = null;
            this.openType = 1;
            this.quality = 1;
            this.initDb(db);
        }
        var _proto = CardBox.prototype;
        _proto.initDb = function(db) {
            this.id = db.id;
            this.complete = db.complete;
            this.openType = db.openType;
            this.quality = db.quality;
            if (db.needItems) {
                // 需要开启的物品条件
                // 构造物品
            }
            if (db.rewardItems) {
                // 如果有奖励则返回奖励对象
            }
        }
        _proto.getType = function() {
            return this.cardType;
        }
        _proto.getID = function() {
            return this.id;
        }
        return CardBox;
    }())

    dbs.CardBusiness = (function() {
        function CardBusiness(db) {
            this.initDb(db);
        }
        var _proto = CardBusiness.prototype;
        
        _proto.initDb = function(db) {
            this.id = db.id;
            this.cardType = 1;
            this.name = db.name;
            this.duration = db.duration;
            this.productions = [];
            for (var i = 0; i < db.productions.length; i++) {
                this.productions.push(new dbs.CardBusinessProduction(db.productions[i]));
            }
        }

        _proto.getType = function() {
            return this.cardType;
        }

        _proto.getID = function() {
            return this.id;
        }

        return CardBusiness;
    }())

    dbs.CardBusinessProduction = (function() {
        function CardBusinessProduction(db) {
            this.initDb(db);
        }
        var _proto = CardBusinessProduction.prototype;
        _proto.initDb = function(db) {
            this.isOk = db.isOk;
            this.needItem = new dbs.Items(db.item);
            this.rewardItem = new dbs.Items(db.reward); // new dbs.Items(db.rewardItem);
            // this.rewardItem = new dbs.Items(db.rewardItem);
        }
        return CardBusinessProduction;
    }())

    dbs.Items = (function() {
        function Items(db) {
            this.itemID = db.itemID;
            this.itemMsg = db.itemMsg;
            this.itemName = db.itemName;
            this.itemOtherID = db.itemOtherID;
            this.itemType = db.itemType;
            this.itemValue = db.itemValue;
        }
        var _proto = Items.prototype;
        _proto.getImage = function() {
            switch (this.itemType) {
                // 农场品
                case 1:
                    return dbs.Func.getItemTypeImage(this.itemOtherID);
                // 货币
                case 3:
                    return dbs.Func.getCurrencyImage(this.itemOtherID);
                default:
                    return dbs.Func.getItemImage(this.itemOtherID);
            }
        }
        return Items;
    }())

    /**
     * 卡片战斗对象数据
     */
    dbs.CardFight = (function() {
        function CardFight(db) {
            this.initDb(db);
        }
        var _proto = CardFight.prototype;
        
        _proto.initDb = function(db) {
            this.id = db.id;
            this.cardType = 3;
            this.name = db.name;
            this.level = db.level;
            this.targetType = db.targetType;
            this.rewards = [];
            for (var i = 0; i < db.rewards.length; i++) {
                var t = db.rewards[i];
                t.itemValue = t.maxRnd;
                var tItem = new dbs.Items(t);
                this.rewards.push(tItem);
            }
        }
        
        _proto.getType = function() {
            return this.cardType;
        }

        _proto.getID = function() {
            return this.id;
        }
        
        return CardFight;
    }())

    /**
     * 加工中心数据对象
     */
    dbs.Machine = (function() {
        function Machine() {
            Machine.super(this);

            this.level = 1;
            // 加工能力-加工能力越强，加工时间越短
            this.workVal = 1000;
        }
        Laya.class(Machine, "dbs.Machine", Laya.EventDispatcher);

        var _proto = Machine.prototype;

        /**
         * 通过服务器传来的数据初始化对象
         * 被初始化后会触发 INIT 事件
         * @param {object} db 服务器加工中心数据
         */
        _proto.initDb = function(db) {
            this.level = db.level;
            this.workVal = db.workVal;
            this.event("INIT", [this]);
        }

        /**
         * 增加BUFF功能
         * @param {dbs.MachineBuff} objBuff
         */
        _proto.addBuff = function(objBuff) {
            switch(objBuff.getBuffType()) {
                // 临时增加生产值
                case "ADD_WORK":
                this.workVal += objBuff.getValue();
                this.event(Laya.Event.CHANGE, [this]);
                break;
            }
        }

        /**
         * 获取加工厂的等级
         * @return {int}
         */
        _proto.getLevel = function() {
            return this.level;
        }

        return Machine;
    }())

    // 构造村庄数据对象
    dbs.obVillage = new dbs.Village();

})(dbs || (dbs = {}));
