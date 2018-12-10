/**
* 卡边管理对象
*/
var uiEx;
(function (uiEx) {
    /**
     * 宝箱卡片对象
     */
    var CardBox = (function (_super) {
        function CardBox() {
            CardBox.super(this);
            this.butClose.on(Laya.Event.CLICK, this, this.doClose);
            this.butOpen.on(Laya.Event.CLICK, this, this.doOpenCard);
            this.butDel.on(Laya.Event.CLICK, this, this.doDel);
            this.obCard = null;
            this.pointID = 0;
            this.visible = false;
            this.scaleX = 0.5;
            this.scaleY = 0.5;
        }
        Laya.class(CardBox, "uiEx.CardBox", _super);
        var _proto = CardBox.prototype;

        _proto.showInfo = function(obCard) {
            this.obCard = obCard;
        }

        _proto.onOpen = function() {
            // 绑定事件
            dbs.obVillage.obExplore.on(dbs.Event.DEL_VALUE, this, this.onCardDel);
            dbs.obVillage.obExplore.on(Laya.Event.CHANGE, this, this.onCardChange);
            mod.Tween.showOpen(this);
        }

        _proto.onClose = function() {
            dbs.obVillage.obExplore.off(dbs.Event.DEL_VALUE, this, this.onCardDel);
            dbs.obVillage.obExplore.off(Laya.Event.CHANGE, this, this.onCardChange);
        }

        _proto.doClose = function() {
            mod.Tween.showClose(this, Laya.Handler.create(this, this._hide));
        }

        _proto.onCardDel = function(obCard) {
            if (obCard.getID() == this.obCard.getID()) {
                this.doClose();
            }
        }

        _proto.onCardChange = function(obCard) {
            
        }

        _proto.doDel = function() {
            if (!this.obCard)
                return;
            cards.sendDel(this.obCard.getID());
        }

        _proto._hide = function() {
            this.visible = false;
            this.onClose();
        }

        _proto.doOpenCard = function() {
            if (!this.obCard) {
                console.log("当前卡边对象不存在");
                return;
            }
            // 发送命令
            conn.Send("card do " + this.obCard.getID());
        }

        // 注册到当前mod对象管理
        mod.Wd.RegWindow(
            "cardBox",
            function() { return new uiEx.CardBox(); },
            [{url: "res/atlas/comp.json", type: Laya.Loader.ATLAS}]
        );
        return CardBox;
    }(ui.event03UI));
    uiEx.CardBox = CardBox;

    /**
     * 商人卡片对象
     */
    var CardBussiness = (function(_super) {
        function CardBussiness() {
            CardBussiness.super(this);
            this.butClose.on(Laya.Event.CLICK, this, this.doClose);
            this.butDel.on(Laya.Event.CLICK, this, this.doDel);
            this.visible = false;
            this.scaleX = 0.5;
            this.scaleY = 0.5;
            // 绑定事件
            this.lstItems.renderHandler = new Laya.Handler(this, this.onHandRenew);
        }
        Laya.class(CardBussiness, "uiEx.CardBussiness", _super);
        var _proto = CardBussiness.prototype;

        _proto.onOpen = function() {
            dbs.obVillage.obExplore.on(dbs.Event.DEL_VALUE, this, this.onCardDel);
            dbs.obVillage.obExplore.on(Laya.Event.CHANGE, this, this.onCardChange);
            mod.Tween.showOpen(this);
        }

        _proto.onClose = function() {
            dbs.obVillage.obExplore.off(dbs.Event.DEL_VALUE, this, this.onCardDel);
            dbs.obVillage.obExplore.off(Laya.Event.CHANGE, this, this.onCardChange);
        }

        _proto.onCardDel = function(obCard) {
            if (obCard.getID() == this.obCard.getID()) {
                this.doClose();
            }
        }

        _proto.onCardChange = function(obCard) {
            this.showInfo(obCard);
        }

        _proto.doClose = function() {
            mod.Tween.showClose(this, Laya.Handler.create(this, this._hide));
            this.obCard = null;
        }

        _proto.doDel = function() {
            if (!this.obCard)
                return;
            cards.sendDel(this.obCard.getID());
        }

        _proto._hide = function() {
            this.visible = false;
            this.onClose();
        }

        _proto.showInfo = function(obCard) {
            this.obCard = obCard;
            // 显示商品信息列表
            var dt = [];
            var arr = obCard.productions;
            for (var i = 0; i < arr.length; i++) {
                var ob = arr[i];
                // 判断要显示奖励物品还是出售物品
                var showItem = ob.needItem;
                var showLblSell = {visible: true};
                var showImgSell = {visible: false};
                if (ob.isOk) {
                    showItem = ob.rewardItem;
                    showLblSell.visible = false;
                    showImgSell.visible = true;
                } 
                dt.push({
                    itemImage: {skin: showItem.getImage()},
                    itemHow: {text: showItem.itemValue},
                    lblSell: showLblSell,
                    imgSellOk: showImgSell
                });
            }
            this.lstItems.dataSource = dt;
        }

        _proto.onHandRenew = function(obCell, idx) {
            var btn = obCell.getChildByName("butSell");
            var db = obCell.dataSource;
            btn.offAll(Laya.Event.CLICK);
            if (db.lblSell.visible == true) {
                btn.on(Laya.Event.CLICK, this, function() {
                    this.doSellProduction(idx);
                });
            }
        }

        _proto.doSellProduction = function(pid) {
            var cmd = "card do " + this.obCard.getID() + " " + pid;
            conn.Send(cmd);
        }

        mod.Wd.RegWindow(
            "cardBussiness",
            function() { return new uiEx.CardBussiness(); },
            [{url: "res/atlas/comp.json", type: Laya.Loader.ATLAS}]
        )
        return CardBussiness;
    }(ui.event01UI));
    uiEx.CardBussiness = CardBussiness;

    /**
     * 战斗卡片对象
     */
    var CardFight = (function(_super) {
        function CardFight() {
            CardFight.super(this);
            this.butClose.on(Laya.Event.CLICK, this, this.doClose);
            this.butDel.on(Laya.Event.CLICK, this, this.doDel);
            this.butFight.on(Laya.Event.CLICK, this, this.doFight);
            this.visible = false;
            this.scaleX = 0.5;
            this.scaleY = 0.5;
        }
        Laya.class(CardFight, "uiEx.CardFight", _super);
        var _proto = CardFight.prototype;

        _proto.onOpen = function() {
            dbs.obVillage.obExplore.on(dbs.Event.DEL_VALUE, this, this.onCardDel);
            dbs.obVillage.obExplore.on(Laya.Event.CHANGE, this, this.onCardChange);
            mod.Tween.showOpen(this);
        }

        _proto.onClose = function() {
            dbs.obVillage.obExplore.off(dbs.Event.DEL_VALUE, this, this.onCardDel);
            dbs.obVillage.obExplore.off(Laya.Event.CHANGE, this, this.onCardChange);
        }

        _proto.doClose = function() {
            mod.Tween.showClose(this, Laya.Handler.create(this, this._hide));
        }

        _proto._hide = function() {
            this.visible = false;
            this.onClose();
        }

        _proto.onCardDel = function(obCard) {
            if (obCard.getID() == this.obCard.getID()) {
                this.doClose();
            }
        }

        _proto.onCardChange = function(obCard) {

        }

        _proto.doDel = function() {
            if (!this.obCard)
                return;
            cards.sendDel(this.obCard.getID());
        }

        _proto.doFight = function() {
            if (!this.obCard)
                return;
            conn.Send("card do " + this.obCard.getID());
            this.doClose();
        }

        _proto.showInfo = function(obCard) {
            this.obCard = obCard;
            this.lblName.text = obCard.name;
            this.lblLevel.text = "Lv " + obCard.level;
            var dataSource = [];
            for (var i = 0; i < obCard.rewards.length; i++) {
                var ob = obCard.rewards[i];
                dataSource.push({
                    itemImage: {skin: ob.getImage()},
                    itemName: {text: ob.itemName}
                });
            }
            this.lstItems.dataSource = dataSource;
        }

        mod.Wd.RegWindow(
            "cardFight",
            function() { return new uiEx.CardFight(); },
            [{url: "res/atlas/comp.json", type: Laya.Loader.ATLAS}]
        )
        return CardFight;
    }(ui.event02UI));
    uiEx.CardFight = CardFight;

})(uiEx || (uiEx = {}));

var cards;
(function (cards){
    /**
     * 打开卡边对象
     * @param {Object}  obCard  卡边对象
     * @param {int}     pointID 宝箱位置
     */
    cards.openCardBox = function(obCard) {
        switch (obCard.getType()) {
            // 使用商人窗口打开
            case 1:
            mod.Wd.openWindow("cardBussiness", function(obWin) {
                obWin.showInfo(obCard);
            });
            break;
            // 用宝箱的盒子打开
            case 2:
            mod.Wd.openWindow("cardBox", function(obWin) {
                obWin.showInfo(obCard);
            });
            break;
            case 3:
            mod.Wd.openWindow("cardFight", function(obWin) {
                obWin.showInfo(obCard);
            });
            break;
        }
    }

    /**
     * 发送删除卡片命令
     * @param {int} cardID 要被删除卡片的ID
     */
    cards.sendDel = function(cardID) {
        mod.Fet.showConfirm(
            ["删除当前事件！"],
            Laya.Handler.create(this, function() {
                conn.Send("card del " + cardID);
            })
        );
    }

})(cards || (cards = {}));
