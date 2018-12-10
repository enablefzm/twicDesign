/**
* name 
*/
var uiEx;
(function (uiEx) {
    var Interlude = (function (_super) {
        function Interlude() {
            Interlude.super(this);
            this.visible = false;
            this.on(Laya.Event.CLICK, this, function(e) {
                e.stopPropagation();
                return;
            });
            // 构造3个节点对象 106 271
            this.cardBussiness = new mod.TObject.CardType(1);
            this.cardBussiness.x = 131;
            this.cardBussiness.y = 271;

            this.cardBox = new mod.TObject.CardType(2);
            this.cardBox.x = 251;
            this.cardBox.y = 271;

            this.cardFight = new mod.TObject.CardType(3);
            this.cardFight.x = 371;
            this.cardFight.y = 271;

            // 当前节点对象添加
            this.boxScene.addChild(this.cardBussiness);
            this.boxScene.addChild(this.cardBox);
            this.boxScene.addChild(this.cardFight);

            this.imgArrow.visible = false;
            var imgDownY = this.imgArrow.y + 60;
            var imgUpY = this.imgArrow.y;
            this.tl = new Laya.TimeLine();
            this.tl.addLabel("down", 0).to(this.imgArrow, {y: imgDownY}, 500)
                   .addLabel("up", 0).to(this.imgArrow, {y: imgUpY}, 500);
            this.tl.play(0, true);
            this.tl.pause();
        }
        Laya.class(Interlude, "uiEx.Interlude", _super);
        var _proto = Interlude.prototype;
        _proto.onOpen = function() {
            conn.Send("card create");
            // TEST
            // this.showInfo(null);
        }

        _proto.close = function() {
            this.visible = false;
            this.tl.pause();
            this.imgArrow.visible = false;
        }

        /**
         * 显示界面信息
         */
        _proto.showInfo = function(info) {
            var pointID = info.pointID;
            var arrInfos = info.arrInfos;
            var diceInfo = {};
            for (var i = 0; i < arrInfos.length; i++) {
                var t = arrInfos[i];
                diceInfo[t.cardType] = t.rndValue;
            }
            // 场景出场
            this.boxScene.scaleX = 0.5;
            this.boxScene.scaleY = 0.5;
            Laya.Tween.to(this.boxScene, {scaleX:1, scaleY:1}, 500, Laya.Ease.backInOut, null);

            this.cardBussiness.resetCard();
            this.cardBox.resetCard();
            this.cardFight.resetCard();

            Laya.timer.once(800, this.cardBussiness, this.cardBussiness.playInfo, [diceInfo[1]]);
            this.cardBussiness.once(Laya.Event.COMPLETE, this.cardBox, this.cardBox.playInfo, [diceInfo[2]]);
            this.cardBox.once(Laya.Event.COMPLETE, this.cardFight, this.cardFight.playInfo, [diceInfo[3]]);
            this.cardFight.once(Laya.Event.COMPLETE, this, function() {
                // 算出赢的那一个
                var winCardIdx = info.pCard.cardType;
                for (var i = 1; i <= 3; i++) {
                    if (i != winCardIdx) {
                        this.getCardDice(i).setGray();
                    }
                }
                // 设定赢面那个
                var winCard = this.getCardDice(winCardIdx);
                winCard.setWinBg();

                // 停止3s后关闭
                Laya.timer.once(1000, this, function() {
                    this.imgArrow.x = winCard.x + 128;
                    this.tl.resume();
                    this.imgArrow.visible = true;
                    this.once(Laya.Event.CLICK, this, this._onClick, [info.pCard.id]);
                    // this._onClick(info.pCard.id);
                });
            });
        }

        _proto._onClick = function(cardID) {
            this.close();
            var obCard = dbs.obVillage.obExplore.getCardOnID(cardID);
            if (obCard) {
                // 显示卡片信息
                cards.openCardBox(obCard);
            }
        }

        _proto.getCardDice = function(idx) {
            switch (idx) {
                case 1:
                return this.cardBussiness;
                case 2:
                return this.cardBox;
                default:
                return this.cardFight;
            }
        }

        // 注册到窗口
        mod.Wd.RegWindow(
            "interlude",
            function() { return new uiEx.Interlude(); },
            [{url: "res/atlas/comp/jm.json", type: Laya.Loader.ATLAS}]
        );
        return Interlude;
    }(ui.interludeUI));
    uiEx.Interlude = Interlude;
})(uiEx || (uiEx = {}));
