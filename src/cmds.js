var cmds
(function (cmds) {
    var RegFunc = mod.CmdResult.RegFunc;
    RegFunc("LINKING", function(db) {
        console.log("收到LINKING：", db);
    });
    RegFunc("LOGIN", function(db) {
        if (db.RES != true) {
            mod.Wd.GetWindow("login", function(obWin) {
                obWin.showMsg(db.MSG);
            });
            return;
        }
        // 销毁登入窗口
        mod.Wd.DestroyWindow("login");
        // 显示主界面
        mod.Wd.openWindow("home", function(obWin) {
            conn.Send("village info");
        });
    });
    
    // villageInfo
    RegFunc("villageInfo", function(db) {
        dbs.obVillage.initDb(db.INFO);
    });

    // 注册升级建筑
    RegFunc("BuildUpFarm", function(db) {
        dbs.obVillage.obCurrency.addGold(db.INFO.reduceGold * -1);
        // 生产中心更新
        dbs.obVillage.obProductions.initDb(db.INFO.productions);
        // 播放升级动画
        mod.Wd.GetWindow("home", function(obWin) {
            obWin.buildUp("farm");
        });
    });

    // 注册升级仓库建筑
    RegFunc("BuildUpWarehouse", function(db) {
        // 扣除金币
        dbs.obVillage.obCurrency.addGold(db.INFO.reduceGold * -1);
        // 大仓库更新
        dbs.obVillage.obWarehouse.initDb(db.INFO.warehouseInfo);
        // 播放升级动画
        mod.Wd.GetWindow("home", function(obWin) {
            obWin.buildUp("warehouse");
        });
    });

    // 注册开启新的生产商品
    RegFunc("ProductionOpen", function(db) {
        // 扣除金币
        dbs.obVillage.obCurrency.addGold(db.INFO.reduceGold * -1);
        // 更新生产中心
        dbs.obVillage.obProductions.initDb(db.INFO.productions);
        // 获得窗口
        mod.Wd.GetWindow("productions", function(obWin) {
            obWin.showInfo();
        });
    });

    // 注册切换新的商品信息
    RegFunc("ProductionChange", function(db) {
        // 更新生产中心
        dbs.obVillage.obProductions.initDb(db.INFO);
        // 获得窗口
        mod.Wd.GetWindow("productions", function(obWin) {
            obWin.showInfo();
        });
    });
    
    // 注册货币
    RegFunc("villageCurrency", function(db) {
        dbs.obVillage.obCurrency.initDb(db.INFO);
    });

    // 注册战斗界面
    RegFunc("EpJoin", function(db) {
        mod.Wd.openWindow("battle", function(obWin) {
            obWin.initDb(db);
        });
    });

    // 注册战斗消息
    RegFunc("SYS_FIGHT", function(db) {
        var info = db.INFO;
        mod.Wd.GetWindow("battle", function(obWin) {
            if (obWin.visible == false) {
                return;
            }
            switch (info.T) {
                case "JOIN_MEMBER":
                    obWin.sysJoinMember(info.F);
                    break;
                case "SELECT":
                    obWin.sysSelect(info.F);
                    break;
                case "DIE":
                    obWin.sysDie(info.F);
                    break;
                case "RESULT":
                    obWin.sysResult(info.F);
                    break;
                case "READY_OK":
                    obWin.sysReadyOk(info.F);
                    break;
                default:
                    console.log("SYS_FIGHT无法处理：", info.T);
            }
        });
    });

    // 注册SysInfo
    RegFunc("SYSINFO", function(db) {
        mod.Fet.showMsg(db.INFO);
    });

    // 注册价格更新
    RegFunc("marketP", function(db) {
        dbs.obVillage.obProductions.obProductionPrices.initMarketPrice(db.INFO);
    });

    // 注册收取商品
    RegFunc("ProductionHarvest", function(db) {
        // 仓库收取了物品
        var info = db.INFO;
        dbs.obVillage.obWarehouse.obContainer.putItem(info.pType, info.pValue);
        // 生产队列的商品信息则要扣除
        dbs.obVillage.obProductions.getQueueContainer().outItem(info.pType, info.pValue);
    });

    // 注册商品出售后处理
    RegFunc("sellProduction", function(db) {
        var info = db.INFO;
        // 仓库里扣除相应的商品
        if (info.value < 1)
            return;
        // 仓库扣除相应的商品
        dbs.obVillage.obWarehouse.obContainer.outItem(info.pType, info.value);
        // 金币增加
        dbs.obVillage.obCurrency.addGold(info.gold);
        // 显示获得的金币数
        mod.Fet.showMsg(["太棒了！成功卖出商品。", "获得了 " + mod.Fet.formatCurrency(info.gold) + " 金币!"]);
    });
    // 获得战斗后的奖励
    // RegFunc()

    // 注册卡片创建
    RegFunc("CardCreate", function(db) {
        // 加入新卡片
        var obExplore = dbs.obVillage.obExplore;
        var obCard = dbs.Func.createExploreCard(db.INFO.pCard)
        obExplore.addCard(obCard, db.INFO.pointID);
        // 显示卡边生成过程
        mod.Wd.GetWindow("interlude", function(obWin) {
            obWin.showInfo(db.INFO);
        });
    });

    // 注册删除卡片
    RegFunc("CardDel", function(db) {
        var cardID = db.INFO;
        dbs.obVillage.obExplore.delCard(cardID);
    });

    // 注册卡边执行
    RegFunc("CardDo", function(db) {
        // 获得物品
        var rewards = db.INFO.rewards;
        var msgs = [];
        for (var i = 0; i < rewards.length; i++) {
            var obRewardItem = new dbs.Items(rewards[i], true);
            dbs.obVillage.operateItem(obRewardItem, true);
            msgs.push("获得 " + obRewardItem.itemName + " x " + obRewardItem.itemValue);
        }
        // 扣除物品
        var needs = db.INFO.needs;
        for (var i = 0; i < needs.length; i++) {
            var obNeedItem = new dbs.Items(needs[i]);
            dbs.obVillage.operateItem(obNeedItem, false);
        }
        // 显示获得物品信息
        if (msgs.length > 0)
            mod.Fet.showMsg(msgs);
        // 获取当前卡片的ID
        var cardID = db.INFO.pointID;
        // 判断当前的卡边执行情况
        switch (db.INFO.result) {
        // 发送刷新数据信息
        case 0:
            conn.Send("card info " + cardID);
            break;

        // 删除指定的卡片
        case 1:
            dbs.obVillage.obExplore.delCard(cardID);
            break;
            
        // 转向战斗界面
        case 2:
            conn.Send("ep join");
            break;
        }
    });

    RegFunc("SYS_DELCARD", function(db) {
        var cardID = db.INFO;
        dbs.obVillage.obExplore.delCard(cardID);
    })

    // 卡片的详细信息
    RegFunc("CardInfo", function(db) {
        dbs.obVillage.obExplore.renewCard(db.INFO);
    });

})(cmds || (cmds = {}))
