/**
* name 
*/
var uiEx;
(function (uiEx) {
    var Battle = (function (_super) {
        function Battle() {
            Battle.super(this);
            this.butDefend.on(Laya.Event.CLICK, this, this.addMember, [2]);
            this.butAttack.on(Laya.Event.CLICK, this, this.addMember, [1]);
            this.butSsault.on(Laya.Event.CLICK, this, this.addMember, [3]);
            // TEST
            this.imgGold.on(Laya.Event.CLICK, this, this.testJian);
            // 关闭
            this.butClose.on(Laya.Event.CLICK, this, this.closeWindow);
            this.members = [];
            this.obWall = new mod.TObject.Wall(this.mvWallHit, this.wallHpValue, this.wallHp);
            this.obWall.on(dbs.Event.SHOOT, this, this.onShootArrow);
            // this.members.push(this.obWall);
            this.pastTime = 60;
            // 当前战斗状态
            this.fightState = 0;
            // 开始时间
            this.waitTime = 3;
        }
        Laya.class(Battle, "uiEx.Battle", _super);
        var _proto = Battle.prototype;

        _proto.testJian = function() {
            this.closeWindow();
        }

        _proto.onOpen = function() {
            mod.Sound.playFightBg();
        }

        _proto.closeWindow = function() {
            this.visible = false;
            Laya.SoundManager.stopMusic();
        }

        _proto.initDb = function(db) {
            // 清除当前战斗结果显示
            this.boxResult.visible = false;
            // 清空当前所有对象
            for (var k in this.members) {
                var ob = this.members[k];
                ob.stopAndClear();
                if (ob.db.memberType != 4) {
                    this.boxZone.removeChild(ob);
                    Laya.Pool.recover("OBSOLDIERS", ob);
                } else {
                    console.log("是城墙不回收", ob.db.memberType);
                }
            }
            this.members = [];

            var headInfo = db.INFO.headInfo;

            switch (headInfo.ROOM_TYPE) {
                case 1:
                    this.initWallDb(headInfo);
                    break;
            }
            for (var k in db.INFO.memberInfos) {
                var dbMember = db.INFO.memberInfos[k];
                if (dbMember.hpVal > 0) {
                    this.sysJoinMember(dbMember);
                }
            }
            // 重新选择攻击目标
            // for (var k in this.members) {
            //     var ob = this.members[k];
            //     if (ob.db.targetID > 0) {
            //         this.sysSelect({
            //             sourceID: ob.db.id,
            //             targetID: ob.db.targetID
            //         });
            //     }
            // }
            if (db.INFO.state == 0) {
                this.pastTime = 60;
                this.showPastTime();
            } else if (db.INFO.state == 1) {
                this.pastTime = 60;
                this.showPastTime();
                this.waitTime = 3;
                this.showWaitTime();

            } else {
                this.pastTime = 60 - Math.floor(db.INFO.pastTime / 1000);
                this.startTime();
            }
            console.log("members的数量：", this.members.length);
        }

        _proto.sysReadyOk = function(db) {
            this.pastTime = db.t;
            this.startTime();
            mod.Sound.playReadOk();
        }

        _proto.startTime = function() {
            this.stopTime();
            Laya.timer.loop(1000, this, this.runPastTime);
            this.runPastTime();
            Laya.timer.loop(200, this, this.runSelect);
        }

        _proto.runPastTime = function() {
            this.pastTime --;
            if (this.pastTime < 0) {
                this.pastTime = 0;
            }
            this.showPastTime();
        }

        _proto.runSelect = function() {
            // for (var k in this.members) {
            //     var ob = this.members[k];
            //     if (ob.targetOb == null) {
            //         for (var l in this.members) {
            //             var t = this.members[l];
            //             if (ob.db.sourceType == t.db.sourceType) {
            //                 continue;
            //             }
            //             if (Math.abs(ob.y - t.y) < ob.targetY) {
            //                 ob.setTarget(t);
            //                 ob.stopMove();
            //                 ob.attack();
            //                 break;
            //             }
            //         }
            //     }
            // }
            for (var k in this.members) {
                var ob = this.members[k];
                ob.do();
            }
        }

        _proto.showWaitTime = function() {
            if (this.waitTime < 1) {
                return;
            }
            this.showFntPastTime(this.waitTime);
            this.waitTime--;
            Laya.timer.once(1000, this, this.showWaitTime);
        }

        _proto.showPastTime = function() {
            this.fntTime.value = this.pastTime;
            Laya.Tween.to(this.fntTime, {scaleX: 1.5, scaleY: 1.5}, 200, Laya.Ease.backInOut);
            Laya.Tween.to(this.fntTime, {scaleX: 1, scaleY: 1}, 200, null, null, 200);
            if (this.pastTime < 16) {
                Laya.Tween.to(this.imgTime, {scaleX: 1.1, scaleY: 1.1}, 200, Laya.Ease.backInOut);
                Laya.Tween.to(this.imgTime, {scaleX: 1, scaleY: 1}, 200, null, null, 200);
                if (this.pastTime < 6) {
                    this.showFntPastTime(this.pastTime);
                }
            }
        }

        _proto.showFntPastTime = function(vTime) {
            this.fntPastTime.scaleX = 1;
            this.fntPastTime.scaleY = 1;
            this.fntPastTime.visible = true;
            this.fntPastTime.alpha = 0;
            this.fntPastTime.value = vTime;
            Laya.Tween.to(this.fntPastTime, {scaleX: 6, scaleY: 6, alpha: 1}, 300, Laya.Ease.backInOut, Laya.Handler.create(this, function() {
                Laya.timer.once(300, this, function(obPastTime) {
                    obPastTime.fntPastTime.visible = false
                }, [this]);
            }));
        }

        _proto.stopTime = function() {
            Laya.timer.clear(this, this.runPastTime);
            Laya.timer.clear(this, this.runSelect);
        }

        _proto.initWallDb = function(headInfo) {
            // 显示村落的名称
            this.lblVillageName.text = headInfo.WALL_NAME;
            // 显示村落的等级
            this.lblWallLevel.text = "城墙等级：" + headInfo.WALL_INFO;
        }

        _proto.show = function() {
            this.visible = true;
        }

        _proto.addMember = function(mType) {
            conn.Send("ep joinMember " + mType);
        }

        // 系统推送加入新玩家消息
        _proto.sysJoinMember = function(db) {
            var ob = this.createSoldiers(db.memberType, db);
        }

        // 系统推送选择攻击对象消息
        _proto.sysSelect = function(db) {
            var sourceID = db.sourceID;
            var targetID = db.targetID;
            var obSource = null;
            var obTarget = null;
            for (var k in this.members) {
                var ob = this.members[k];
                if (ob.db.id == sourceID) {
                    obSource = ob;
                } else if (ob.db.id == targetID) {
                    obTarget = ob;
                }
                if (obSource && obTarget) {
                    obSource.setTarget(obTarget);
                    obSource.stopMove();
                    obSource.attack();
                    // obSource.do();
                    break;
                }
            }
        }

        // 对象阵亡事件
        _proto.sysDie = function(db) {
            var obDie = null;
            for (var k in this.members) {
                var ob = this.members[k];
                if (ob.db.id == db.dieID) {
                    // ob.onHit(ob.db.hpVal);
                    obDie = ob;
                    break;
                }
            }
            if (obDie) {
                for (var k in this.members) {
                    var ob = this.members[k];
                    if (ob.db.id == db.souID) {
                        ob.targetOb = obDie;
                        ob.attack(obDie.db.maxHp, true);
                        break;
                    }
                }
            }
        }

        _proto.sysResult = function(db) {
            for (var k in this.members) {
                this.members[k].stopLoop();
            }
            // 时间停止
            this.stopTime();
            // 显示战斗结果
            this.showResult(db);
        }

        /**
         * 创建士兵对象
         */
        _proto.createSoldiers = function(soldiersType, db) {
            if (soldiersType == 4) {
                this.obWall.initDb(db);
                console.log("初始化了城墙");
                this.members.push(this.obWall);
                return;
            }
            // var obSoldiers = new mod.TObject.Soldiers();
            var self = this;
            var obSoldiers = Laya.Pool.getItemByCreateFun("OBSOLDIERS", function() {
                var ob = new mod.TObject.Soldiers();
                ob.on(dbs.Event.STOPDO, self, self.onStopDo);
                ob.on(dbs.Event.SHOOT, self, self.onShootArrow);
                ob.on(dbs.Event.DIE, self, self.onDie);
                console.log("从缓存里创造了一个新对象");
                return ob;
            });
            var aniName = "dun";
            switch (soldiersType) {
                case 1:
                    db.sourceType == 1 ? aniName = "she" : aniName = "zgong";
                    break;
                case 2:
                    db.sourceType == 1 ? aniName = "dun" : aniName = "zdun";
                    break;
                case 3:
                    db.sourceType == 1 ? aniName = "ma" : aniName = "zma";
                    break;
                default:
                    console.log("不存在这种士兵类型：", soldiersType);
            }
            mod.Ani.playLife(aniName, obSoldiers, null);
            obSoldiers.initDb(db);
            this.members.push(obSoldiers);
            this.boxZone.addChild(obSoldiers);
            return obSoldiers;
        }

        _proto.onDie = function(ob) {
            for (var k in this.members) {
                if (this.members[k].targetOb == ob) {
                    this.members[k].targetOb = null;
                }
            }
            // 显示阵亡画面
            var self = this;
            var aniDie = Laya.Pool.getItemByCreateFun("OBDIE", function() {
                var obAniDie = new mod.TObject.SoldiersDie();
                obAniDie.on(Laya.Event.COMPLETE, self, self.onDieComplete, [obAniDie]);
                return obAniDie;
            });
            aniDie.x = ob.x;
            aniDie.y = ob.y;
            this.boxZone.addChild(aniDie);
            aniDie.playDie();
        }

        _proto.onDieComplete = function(ob) {
            this.boxZone.removeChild(ob);
            Laya.Pool.recover("OBDIE", ob);
        }

        _proto.onStopDo = function(ob) {
            this.boxZone.removeChild(ob);
            for (var k in this.members) {
                if (this.members[k].db.id == ob.db.id) {
                    this.members.splice(k, 1);
                    break;
                }
            }
            Laya.Pool.recover("OBSOLDIERS", ob);
        }

        /**
         * 有战斗单位发起发攻击
         * @param {mod.TObject.Soldiers} sourceOb 发起攻击者
         * @param {mod.TObject.Soldiers} targetOb 被攻击者
         * @param {int}                  attVal   攻击值
         * @param {bool}                 isDie    是否阵亡
         */
        _proto.onShootArrow = function(sourceOb, targetOb, attVal, isDie) {
            // 只有城墙和弓箭手可以射箭攻击
            if (sourceOb.db.memberType == 1 || sourceOb.db.memberType == 4) {
                // 构造弓箭
                // var ob = new mod.TObject.Arrow();
                var self = this;
                var obArrow = Laya.Pool.getItemByCreateFun("ARROW", function() {
                    var ob = new mod.TObject.Arrow();
                    self.boxZone.addChild(ob);
                    ob.on(Laya.Event.COMPLETE, self, self.recoverArrow);
                    console.log("<-创建了一个箭->");
                    return ob;
                });
                arrNY = sourceOb.getHitXY();
                if (attVal)
                    obArrow.fly(arrNY[0], arrNY[1], attVal, targetOb, isDie);
                else 
                    obArrow.fly(arrNY[0], arrNY[1], sourceOb.db.attVal, targetOb, isDie);
            } else {
                // if (targetOb.db.memberType != 4)
                //     sourceOb.x = targetOb.x;
                // if (sourceOb.db.sourceType == 1) {
                //     sourceOb.y = targetOb.y + 30;
                // } else {
                //     sourceOb.y = targetOb.y - 30;
                // }
                // 直接伤害
                if (attVal)
                    targetOb.onHit(attVal, isDie);
                else
                    targetOb.onHit(sourceOb.db.attVal, isDie);
            }
        }

        _proto.recoverArrow = function(obArrow) {
            Laya.Pool.recover("ARROW", obArrow);
        }

        _proto.showResult = function(db) {
            this.boxResult.visible = true;
            // 判断是否胜利
            if (db.WIN == 1) {
                // 胜利
                this.resultImg.skin = "comp/battle/win.png";
            } else {
                this.resultImg.skin = "comp/battle/lose.png"
            }
        }

        return Battle;
    }(ui.battleUI));

    /**
     * 注册到窗口管理
     * res/atlas/comp/battle.json
     */
    mod.Wd.RegWindow(
        "battle",
        function() { return new uiEx.Battle(); },
        [{url: "res/atlas/comp/battle.json", type: Laya.Loader.ATLAS}]
    );
    uiEx.Battle = Battle;
})(uiEx || (uiEx = {}));
