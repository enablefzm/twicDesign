var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var bagUI=(function(_super){
		function bagUI(){
			
		    this.bgClose=null;
		    this.buildName=null;
		    this.lstContainer=null;
		    this.btnClose=null;
		    this.lblValue=null;

			bagUI.__super.call(this);
		}

		CLASS$(bagUI,'ui.bagUI',_super);
		var __proto__=bagUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(bagUI.uiView);

		}

		bagUI.uiView={"type":"View","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"var":"bgClose","top":0,"skin":"comp/di.png","right":0,"left":0,"bottom":0,"alpha":0.72,"sizeGrid":"1,1,1,1"}},{"type":"Box","props":{"width":646,"height":1045,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":10,"x":0,"width":646,"skin":"comp/jm_td.png","height":984,"sizeGrid":"42,42,60,42"}},{"type":"Image","props":{"y":7,"x":217,"skin":"comp/twdtd.png"}},{"type":"Label","props":{"y":19,"width":300,"var":"buildName","text":"仓库Lv1","strokeColor":"#1d5f79","stroke":4,"height":42,"fontSize":28,"color":"#ffffff","centerX":5,"align":"center"}},{"type":"Image","props":{"y":68,"x":34,"width":578,"skin":"comp/jm_td2.png","height":779,"sizeGrid":"20,20,20,20"}},{"type":"List","props":{"y":92,"x":49,"width":545,"var":"lstContainer","spaceY":40,"spaceX":30,"repeatY":5,"repeatX":4,"height":742},"child":[{"type":"Box","props":{"y":2,"x":0,"width":114,"renderType":"render","height":114},"child":[{"type":"Image","props":{"skin":"comp/ck_icon01.png"}},{"type":"Image","props":{"y":9,"width":100,"name":"itemImage","height":100,"centerX":0.5}},{"type":"Label","props":{"y":71,"width":100,"text":"32","strokeColor":"#1d5f79","stroke":2,"name":"itemHow","height":32,"fontSize":24,"color":"#ffffff","centerX":0,"align":"center"}}]}]},{"type":"Label","props":{"y":893,"x":43,"width":118,"text":"仓库容量","strokeColor":"#1d5f79","stroke":3,"height":39,"fontSize":26,"color":"#ffffff","align":"left"}},{"type":"Button","props":{"y":-12,"x":568,"var":"btnClose","stateNum":2,"skin":"comp/btn_close.png"}},{"type":"Label","props":{"y":892,"x":163,"width":243,"var":"lblValue","text":"250 / 2000","strokeColor":"#1d5f79","stroke":4,"height":39,"fontSize":32,"color":"#ffffff","align":"left"}},{"type":"Box","props":{"y":198,"x":33,"visible":false},"child":[{"type":"Image","props":{"width":578,"skin":"comp/tanc.png","height":150,"sizeGrid":"36,70,17,20"}},{"type":"List","props":{"y":31,"x":11,"width":554,"repeatY":1,"repeatX":5,"height":109},"child":[{"type":"Box","props":{"y":1,"x":5,"width":108,"renderType":"render","height":106},"child":[{"type":"HBox","props":{"y":2.625,"x":6}},{"type":"Label","props":{"y":77,"x":18,"width":75,"text":"10m","strokeColor":"#1d5f79","stroke":2,"height":23,"fontSize":26,"color":"#ffffff","align":"center"}}]}]}]},{"type":"Button","props":{"y":863,"x":454,"stateNum":2,"skin":"comp/btn_ty.png"}},{"type":"Label","props":{"y":876,"x":458,"width":120,"text":"升级","strokeColor":"#1d5f79","stroke":3,"height":51,"fontSize":32,"color":"#ffffff","align":"center"}}]},{"type":"Box","props":{"y":495,"x":48,"visible":false},"child":[{"type":"Image","props":{"width":644,"skin":"comp/jm_td.png","height":436,"sizeGrid":"42,42,60,42"}},{"type":"Image","props":{"y":41,"x":37,"width":570,"skin":"comp/jm_td2.png","height":262,"sizeGrid":"20,20,20,20"}},{"type":"HBox","props":{"y":53,"x":84}},{"type":"Label","props":{"y":113,"x":148,"width":53,"text":"44","strokeColor":"#1d5f79","stroke":3,"height":37,"fontSize":28,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":94,"x":329,"width":130,"text":"44","strokeColor":"#1d5f79","stroke":3,"height":37,"fontSize":36,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":84,"x":248,"stateNum":2,"skin":"comp/btn_jianhao.png"}},{"type":"Button","props":{"y":84,"x":463,"stateNum":2,"skin":"comp/btn_jiahao.png"}},{"type":"Label","props":{"y":179,"x":129,"width":158,"text":"单价：300","strokeColor":"#1d5f79","stroke":3,"height":37,"fontSize":28,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":179,"x":389,"width":158,"text":"3000","strokeColor":"#1d5f79","stroke":3,"height":37,"fontSize":28,"color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":164,"x":323,"skin":"comp/icon01.png","scaleY":0.8,"scaleX":0.8}},{"type":"Label","props":{"y":242,"x":98,"width":447,"text":"确定出售该物品吗？","strokeColor":"#1d5f79","stroke":3,"height":37,"fontSize":32,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":316,"x":169,"stateNum":2,"skin":"comp/btn_ty.png"}},{"type":"Label","props":{"y":328,"x":186,"width":94,"text":"确定","strokeColor":"#1d5f79","stroke":3,"height":37,"fontSize":32,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":316,"x":343,"stateNum":2,"skin":"comp/btn_ty.png"}},{"type":"Label","props":{"y":328,"x":360,"width":94,"text":"取消","strokeColor":"#1d5f79","stroke":3,"height":37,"fontSize":32,"color":"#ffffff","align":"center"}}]},{"type":"Box","props":{"y":445,"x":46,"visible":false},"child":[{"type":"Image","props":{"width":647,"skin":"comp/jm_td.png","height":518,"sizeGrid":"42,42,60,42"}},{"type":"HBox","props":{"y":29,"x":50,"scaleY":0.85,"scaleX":0.85}},{"type":"Label","props":{"y":67,"x":186,"width":173,"text":"44","strokeColor":"#1d5f79","stroke":3,"height":37,"fontSize":30,"color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":59,"x":136,"skin":"comp/icon01.png","scaleY":0.6,"scaleX":0.6}},{"type":"Image","props":{"y":78,"x":226,"skin":"comp/icon_ss.png"}},{"type":"Image","props":{"y":78,"x":226,"skin":"comp/icon_ss2.png"}},{"type":"Image","props":{"y":43,"x":382,"skin":"comp/zd_sj.png"}},{"type":"Label","props":{"y":67,"x":450,"width":173,"text":"3:12:05","strokeColor":"#1d5f79","stroke":3,"height":37,"fontSize":30,"color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":122,"x":39,"width":565,"skin":"comp/jm_td2.png","height":338,"sizeGrid":"20,20,20,20"}},{"type":"Image","props":{"y":140,"x":56,"width":20,"skin":"comp/jm_jt.png","height":301,"sizeGrid":"18,0,3,0"}},{"type":"Image","props":{"y":429,"x":63,"width":520,"skin":"comp/jm_jt0.png","height":20,"sizeGrid":"0,16,0,3"}},{"type":"Image","props":{"y":350,"x":84,"skin":"comp/jm_jt1.png"}},{"type":"Image","props":{"y":354,"x":94,"skin":"comp/jm_jt2.png"}}]}]};
		return bagUI;
	})(View);
var barracksUI=(function(_super){
		function barracksUI(){
			
		    this.buildName=null;
		    this.lstCanProductions=null;
		    this.btnClose=null;

			barracksUI.__super.call(this);
		}

		CLASS$(barracksUI,'ui.barracksUI',_super);
		var __proto__=barracksUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(barracksUI.uiView);

		}

		barracksUI.uiView={"type":"View","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"top":0,"skin":"comp/di.png","right":0,"left":0,"bottom":0,"alpha":0.72,"sizeGrid":"1,1,1,1"}},{"type":"Box","props":{"width":646,"height":1045,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":10,"x":0,"width":646,"skin":"comp/jm_td.png","height":984,"sizeGrid":"42,42,60,42"}},{"type":"Image","props":{"y":7,"x":217,"skin":"comp/twdtd.png"}},{"type":"Label","props":{"y":19,"width":300,"var":"buildName","text":"兵营 Lv1","strokeColor":"#1d5f79","stroke":4,"height":42,"fontSize":28,"color":"#ffffff","centerX":5,"align":"center"}},{"type":"List","props":{"y":68,"x":24,"width":597,"var":"lstCanProductions","spaceY":10,"spaceX":0,"repeatY":3,"repeatX":1,"height":700},"child":[{"type":"Box","props":{"y":5,"x":9,"width":578,"renderType":"render","height":222},"child":[{"type":"Image","props":{"width":578,"skin":"comp/jm_td2.png","name":"imgBg","height":218,"sizeGrid":"20,20,20,20"}},{"type":"Image","props":{"y":19,"x":0,"width":537,"skin":"comp/jm_jt3.png","height":50,"sizeGrid":"0,22,0,1"}},{"type":"Image","props":{"y":62,"x":64,"width":154,"pivotY":45,"pivotX":90,"name":"itemImage","height":201}},{"type":"Label","props":{"y":30,"width":123,"text":"盾兵","strokeColor":"#1d5f79","stroke":4,"height":32,"fontSize":28,"color":"#ffffff","centerX":-98.5,"align":"left"}},{"type":"Label","props":{"y":30,"width":123,"text":"Lv:1","strokeColor":"#1d5f79","stroke":4,"height":32,"fontSize":28,"color":"#ffffff","centerX":180.5,"align":"left"}},{"type":"Box","props":{"y":30,"x":294},"child":[{"type":"Label","props":{"x":-145,"width":123,"text":"大盾兵","strokeColor":"#1d5f79","stroke":4,"height":32,"fontSize":28,"color":"#ffffff","centerX":20.5,"align":"left"}},{"type":"Image","props":{"y":2,"x":-88,"skin":"comp/jm_jt4.png"}}]},{"type":"Label","props":{"y":76,"width":123,"text":"当前等级","strokeColor":"#1d5f79","stroke":0,"height":26,"fontSize":20,"color":"#006691","centerX":-90.5,"align":"left"}},{"type":"Label","props":{"y":76,"width":123,"text":"下一等级","strokeColor":"#1d5f79","stroke":0,"height":26,"fontSize":20,"color":"#006691","centerX":52.5,"align":"left"}},{"type":"Label","props":{"y":109,"width":123,"text":"攻：15","strokeColor":"#1d5f79","stroke":3,"height":32,"fontSize":24,"color":"#ffffff","centerX":-87.5,"align":"left"}},{"type":"Label","props":{"y":145,"width":123,"text":"血：15","strokeColor":"#1d5f79","stroke":3,"height":32,"fontSize":24,"color":"#ffffff","centerX":-86.5,"align":"left"}},{"type":"Label","props":{"y":109,"width":123,"text":"+10","strokeColor":"#79391d","stroke":3,"height":32,"fontSize":24,"color":"#ffffff","centerX":53.5,"align":"left"}},{"type":"Label","props":{"y":145,"width":123,"text":"+10","strokeColor":"#79391d","stroke":3,"height":32,"fontSize":24,"color":"#ffffff","centerX":53.5,"align":"left"}},{"type":"Label","props":{"y":179,"width":299,"text":"可进阶为大盾兵（需等级20）","strokeColor":"#1d5f79","stroke":0,"height":26,"fontSize":20,"color":"#006691","centerX":-1.5,"align":"left"}},{"type":"Button","props":{"y":121,"x":426,"stateNum":2,"skin":"comp/btn_ty.png"}},{"type":"Label","props":{"y":134,"x":430,"width":120,"text":"升级","strokeColor":"#1d5f79","stroke":3,"height":51,"fontSize":32,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":80,"x":439,"skin":"comp/icon01.png","scaleY":0.5,"scaleX":0.5}},{"type":"Label","props":{"y":82,"x":484,"width":123,"text":"800","strokeColor":"#1d5f79","stroke":4,"height":32,"fontSize":28,"color":"#ffffff","centerX":256.5,"align":"left"}},{"type":"Box","props":{"y":71,"x":388,"width":163,"height":73},"child":[{"type":"Label","props":{"y":63.5,"x":42,"width":120,"text":"进阶","strokeColor":"#1d5f79","stroke":3,"height":51,"fontSize":32,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":22.5,"x":45,"width":100,"scaleY":0.5,"scaleX":0.5,"pivotY":45,"pivotX":90,"name":"itemImage","height":100}},{"type":"Image","props":{"y":22.5,"x":102,"width":100,"scaleY":0.5,"scaleX":0.5,"pivotY":45,"pivotX":90,"name":"itemImage","height":100}},{"type":"Image","props":{"y":22.5,"x":158,"width":100,"scaleY":0.5,"scaleX":0.5,"pivotY":45,"pivotX":90,"name":"itemImage","height":100}},{"type":"Label","props":{"y":29.5,"width":27,"text":"x1","strokeColor":"#1d5f79","stroke":4,"height":21,"fontSize":14,"color":"#ffffff","centerX":-39,"align":"left"}},{"type":"Label","props":{"y":29.5,"width":27,"text":"x1","strokeColor":"#1d5f79","stroke":4,"height":21,"fontSize":14,"color":"#ffffff","centerX":18,"align":"left"}},{"type":"Label","props":{"y":29.5,"width":27,"text":"x1","strokeColor":"#1d5f79","stroke":4,"height":21,"fontSize":14,"color":"#ffffff","centerX":74,"align":"left"}}]}]}]},{"type":"Button","props":{"x":568,"var":"btnClose","stateNum":2,"skin":"comp/btn_close.png"}},{"type":"Box","props":{"y":782,"x":40,"width":559,"height":136},"child":[{"type":"Label","props":{"y":5,"width":381,"text":"兵营是培养兵种的建筑，可对各兵种提 ","strokeColor":"#1d5f79","stroke":0,"height":32,"fontSize":22,"color":"#006691","centerX":-61,"align":"left"}},{"type":"Label","props":{"y":46,"width":381,"text":"升等级，兵营建筑每提升一级，士兵的","strokeColor":"#1d5f79","stroke":0,"height":32,"fontSize":22,"color":"#006691","centerX":-61,"align":"left"}},{"type":"Label","props":{"y":86,"width":381,"text":"最高等级都能提升一级。","strokeColor":"#1d5f79","stroke":0,"height":32,"fontSize":22,"color":"#006691","centerX":-61,"align":"left"}},{"type":"Button","props":{"y":65,"x":414,"stateNum":2,"skin":"comp/btn_ty.png"}},{"type":"Label","props":{"y":26,"width":85,"text":"800","strokeColor":"#1d5f79","stroke":4,"height":32,"fontSize":28,"color":"#ffffff","centerX":231,"align":"left"}},{"type":"Image","props":{"y":23,"x":424,"skin":"comp/icon01.png","scaleY":0.5,"scaleX":0.5}},{"type":"Label","props":{"y":78,"x":422,"width":120,"text":"升级","strokeColor":"#1d5f79","stroke":3,"height":51,"fontSize":32,"color":"#ffffff","align":"center"}}]}]}]};
		return barracksUI;
	})(View);
var battleUI=(function(_super){
		function battleUI(){
			
		    this.boxZone=null;
		    this.butDefend=null;
		    this.butAttack=null;
		    this.butSsault=null;
		    this.mvWallHit=null;
		    this.imgTime=null;
		    this.imgGold=null;
		    this.lblVillageName=null;
		    this.lblWallLevel=null;
		    this.wallHp=null;
		    this.wallHpValue=null;
		    this.fntTime=null;
		    this.fntGold=null;
		    this.fntPastTime=null;
		    this.boxResult=null;
		    this.resultImg=null;
		    this.butClose=null;

			battleUI.__super.call(this);
		}

		CLASS$(battleUI,'ui.battleUI',_super);
		var __proto__=battleUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(battleUI.uiView);

		}

		battleUI.uiView={"type":"View","props":{"y":0,"x":0,"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Box","props":{"width":750,"height":1334,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"width":900,"skin":"comp/battle/zd.jpg","height":1334,"centerX":0}},{"type":"Box","props":{"y":400,"width":500,"var":"boxZone","height":600,"centerX":0}},{"type":"Button","props":{"y":1025,"width":171,"var":"butDefend","stateNum":2,"skin":"comp/btn_dun.png","left":80,"height":175}},{"type":"Button","props":{"y":1025,"width":171,"var":"butAttack","stateNum":2,"skin":"comp/btn_she.png","height":175,"centerX":0}},{"type":"Button","props":{"y":1025,"width":171,"var":"butSsault","stateNum":2,"skin":"comp/btn_ma.png","right":80,"height":175}},{"type":"Label","props":{"y":1189,"x":61,"width":206,"text":"500","strokeColor":"#1d5f79","stroke":3,"height":31,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":1189,"width":206,"text":"500","strokeColor":"#1d5f79","stroke":3,"height":31,"fontSize":30,"color":"#ffffff","centerX":0,"align":"center"}},{"type":"Label","props":{"y":1189,"x":481,"width":206,"text":"500","strokeColor":"#1d5f79","stroke":3,"height":31,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":269,"visible":false,"var":"mvWallHit","skin":"comp/cqx.png","centerX":0}},{"type":"Image","props":{"y":1238,"skin":"comp/zd_d.png","centerX":0}},{"type":"Image","props":{"y":1269,"x":174,"width":56,"var":"imgTime","skin":"comp/zd_sj.png","pivotY":31,"pivotX":28,"height":62}},{"type":"Image","props":{"y":1242,"x":474,"var":"imgGold","skin":"comp/icon01.png","scaleY":0.8,"scaleX":0.8}},{"type":"Label","props":{"y":39,"x":75,"width":453,"var":"lblVillageName","text":"Jimmy的村落","strokeColor":"#1d5f79","stroke":3,"height":47,"fontSize":42,"color":"#ffffff","centerX":0,"align":"center"}},{"type":"Label","props":{"y":154,"width":458,"var":"lblWallLevel","text":"城墙等级：5","strokeColor":"#1d5f79","stroke":3,"height":47,"fontSize":40,"color":"#ffffff","centerX":0,"align":"center"}},{"type":"ProgressBar","props":{"y":221,"var":"wallHp","value":0.5,"skin":"comp/progress_01.png","centerX":0}},{"type":"Label","props":{"y":223,"x":75,"width":458,"var":"wallHpValue","text":"200/400","strokeColor":"#1d5f79","stroke":3,"height":32,"fontSize":26,"color":"#ffffff","centerX":0,"align":"center"}},{"type":"FontClip","props":{"y":1272,"x":219,"width":100,"var":"fntTime","value":"56","skin":"comp/font1.png","sheet":"0123456789kwm","pivotY":13,"pivotX":10,"height":28}},{"type":"FontClip","props":{"y":1259,"x":547,"var":"fntGold","value":"3500","skin":"comp/font1.png","sheet":"0123456789kwm"}},{"type":"FontClip","props":{"y":667,"x":375,"width":100,"visible":false,"var":"fntPastTime","value":"5","skin":"comp/font1.png","sheet":"0123456789kwm","scaleY":3,"scaleX":3,"pivotY":15,"pivotX":50,"height":30,"centerY":0,"centerX":0,"align":"center"}}]},{"type":"Box","props":{"width":750,"visible":false,"var":"boxResult","height":1334,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"width":900,"skin":"comp/di.png","height":1334,"centerY":0,"centerX":0,"alpha":0.72,"sizeGrid":"1,1,1,1"}},{"type":"Image","props":{"y":177,"var":"resultImg","skin":"comp/battle/win.png","scaleY":0.85,"scaleX":0.85,"centerX":0}},{"type":"Box","props":{"y":566,"width":900,"height":66,"centerX":0},"child":[{"type":"Image","props":{"skin":"comp/di2.png"}},{"type":"Label","props":{"y":14,"x":336,"width":87,"text":"支出","strokeColor":"#1d5f79","stroke":2,"height":44,"fontSize":38,"color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":34,"x":467,"width":73,"skin":"comp/icon01.png","scaleY":0.6,"scaleX":0.6,"pivotY":33,"pivotX":36,"height":67}},{"type":"Label","props":{"y":14,"x":501,"width":225,"text":"24680","strokeColor":"#1d5f79","height":44,"fontSize":38,"color":"#ffffff","align":"left"}}]},{"type":"Box","props":{"y":648,"width":900,"height":66,"centerX":0},"child":[{"type":"Image","props":{"skin":"comp/di2.png"}},{"type":"Label","props":{"y":14,"x":336,"width":87,"text":"获得","strokeColor":"#1d5f79","stroke":2,"height":44,"fontSize":38,"color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":34,"x":467,"width":73,"skin":"comp/icon01.png","scaleY":0.6,"scaleX":0.6,"pivotY":33,"pivotX":36,"height":67}},{"type":"Label","props":{"y":14,"x":501,"width":225,"text":"36800","strokeColor":"#1d5f79","height":44,"fontSize":38,"color":"#ffffff","align":"left"}}]},{"type":"Box","props":{"y":731,"width":900,"height":66,"centerX":0},"child":[{"type":"Image","props":{"skin":"comp/di2.png"}},{"type":"Label","props":{"y":14,"x":336,"width":87,"text":"结余","strokeColor":"#1d5f79","stroke":2,"height":44,"fontSize":38,"color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":34,"x":467,"width":73,"skin":"comp/icon01.png","scaleY":0.6,"scaleX":0.6,"pivotY":33,"pivotX":36,"height":67}},{"type":"Label","props":{"y":14,"x":501,"width":225,"text":"36800","strokeColor":"#1d5f79","stroke":3,"height":44,"fontSize":38,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":14,"x":501,"width":225,"text":"36800","strokeColor":"#792f1c","stroke":3,"height":44,"fontSize":38,"color":"#ffffff","align":"left"}}]},{"type":"Box","props":{"y":813,"width":900,"height":66,"centerX":0},"child":[{"type":"Image","props":{"skin":"comp/di2.png"}},{"type":"Label","props":{"y":14,"x":336,"width":87,"text":"勋章","strokeColor":"#1d5f79","stroke":2,"height":44,"fontSize":38,"color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":34,"x":467,"width":73,"skin":"comp/icon_xunzhang.png","pivotY":33,"pivotX":36,"height":67}},{"type":"Label","props":{"y":14,"x":501,"width":225,"text":"36800","strokeColor":"#1d5f79","stroke":3,"height":44,"fontSize":38,"color":"#ffffff","align":"left"}}]},{"type":"Button","props":{"y":920,"var":"butClose","stateNum":2,"skin":"comp/btn_ty.png","centerX":0}},{"type":"Label","props":{"y":931,"width":87,"text":"确定","strokeColor":"#1d5f79","stroke":2,"height":44,"fontSize":36,"color":"#ffffff","centerX":5,"align":"left"}}]}]};
		return battleUI;
	})(View);
var confirmUI=(function(_super){
		function confirmUI(){
			
		    this.butOk=null;
		    this.butCancel=null;
		    this.txtMsg=null;

			confirmUI.__super.call(this);
		}

		CLASS$(confirmUI,'ui.comm.confirmUI',_super);
		var __proto__=confirmUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(confirmUI.uiView);

		}

		confirmUI.uiView={"type":"Dialog","props":{"width":0,"top":0,"right":0,"left":0,"height":0,"bottom":0},"child":[{"type":"Box","props":{"y":20,"x":20,"width":646,"height":337,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"width":646,"skin":"comp/jm_td.png","height":337,"centerX":0,"sizeGrid":"42,42,60,42"}},{"type":"Image","props":{"y":39,"x":44,"width":554,"skin":"comp/jm_td2.png","height":162,"sizeGrid":"20,20,20,20"}},{"type":"Button","props":{"y":218,"x":169,"var":"butOk","stateNum":2,"skin":"comp/btn_ty.png"}},{"type":"Label","props":{"y":233,"x":185,"width":93,"text":"确定","strokeColor":"#1d5f79","stroke":3,"height":36,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":218,"x":352,"var":"butCancel","stateNum":2,"skin":"comp/btn_ty.png"}},{"type":"Label","props":{"y":233,"x":367,"width":93,"text":"取消","strokeColor":"#1d5f79","stroke":3,"height":36,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":50,"wordWrap":true,"width":500,"var":"txtMsg","valign":"middle","text":"此次出售可获得30000个金币","strokeColor":"#1d5f79","stroke":3,"overflow":"scroll","height":116,"fontSize":30,"color":"#ffffff","centerX":0,"align":"center"}}]}]};
		return confirmUI;
	})(Dialog);
var msgUI=(function(_super){
		function msgUI(){
			
		    this.txtMsg=null;

			msgUI.__super.call(this);
		}

		CLASS$(msgUI,'ui.comm.msgUI',_super);
		var __proto__=msgUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(msgUI.uiView);

		}

		msgUI.uiView={"type":"View","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Box","props":{"width":690,"height":62,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"skin":"comp/zd_d.png"}},{"type":"Image","props":{"skin":"comp/zd_d.png"}},{"type":"Image","props":{"skin":"comp/zd_d.png"}},{"type":"Label","props":{"y":13,"width":517,"var":"txtMsg","text":"您一共获得了2400个金币","strokeColor":"#1d5f79","stroke":3,"height":42,"fontSize":30,"color":"#ffffff","centerX":0,"align":"center"}}]}]};
		return msgUI;
	})(View);
var confirm01UI=(function(_super){
		function confirm01UI(){
			
		    this.btnOk=null;
		    this.btnCancel=null;
		    this.lblMsg=null;

			confirm01UI.__super.call(this);
		}

		CLASS$(confirm01UI,'ui.confirm01UI',_super);
		var __proto__=confirm01UI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(confirm01UI.uiView);

		}

		confirm01UI.uiView={"type":"View","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Box","props":{"width":599,"height":334,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"width":599,"skin":"comp/jm_td.png","height":334,"sizeGrid":"42,42,60,42"}},{"type":"Image","props":{"y":39,"x":38,"width":521,"skin":"comp/jm_td2.png","height":160,"sizeGrid":"20,20,20,20"}},{"type":"Button","props":{"y":215,"x":135,"var":"btnOk","stateNum":2,"skin":"comp/btn_ty.png"}},{"type":"Label","props":{"y":230,"x":147,"width":102,"text":"确定","strokeColor":"#1d5f79","stroke":3,"height":33,"fontSize":28,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":215,"x":325,"var":"btnCancel","stateNum":2,"skin":"comp/btn_ty.png"}},{"type":"Label","props":{"y":230,"x":337,"width":102,"text":"取消","strokeColor":"#1d5f79","stroke":3,"height":33,"fontSize":28,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":50,"x":65,"wordWrap":true,"width":482,"var":"lblMsg","valign":"middle","text":"将花费1000个钻石进行升级\\n\\n确定购买吗？","strokeColor":"#1d5f79","stroke":3,"height":120,"fontSize":28,"color":"#ffffff","align":"center"}}]}]};
		return confirm01UI;
	})(View);
var confirm02UI=(function(_super){
		function confirm02UI(){
			
		    this.btnOk=null;
		    this.lblMsg=null;

			confirm02UI.__super.call(this);
		}

		CLASS$(confirm02UI,'ui.confirm02UI',_super);
		var __proto__=confirm02UI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(confirm02UI.uiView);

		}

		confirm02UI.uiView={"type":"View","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Box","props":{"width":599,"height":334,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"width":599,"skin":"comp/jm_td.png","height":334,"sizeGrid":"42,42,60,42"}},{"type":"Image","props":{"y":39,"x":38,"width":521,"skin":"comp/jm_td2.png","height":160,"sizeGrid":"20,20,20,20"}},{"type":"Button","props":{"y":215,"x":202,"var":"btnOk","stateNum":2,"skin":"comp/btn_ty2.png"}},{"type":"Label","props":{"y":230,"x":248,"width":102,"text":"确定","strokeColor":"#1d5f79","stroke":3,"height":33,"fontSize":28,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":62,"x":62,"wordWrap":true,"width":482,"var":"lblMsg","valign":"middle","text":"将花费1000个钻石\\n\\n进行升级","strokeColor":"#1d5f79","stroke":3,"height":106,"fontSize":28,"color":"#ffffff","align":"center"}}]}]};
		return confirm02UI;
	})(View);
var event01UI=(function(_super){
		function event01UI(){
			
		    this.butClose=null;
		    this.lblLastTime=null;
		    this.lstItems=null;
		    this.butDel=null;

			event01UI.__super.call(this);
		}

		CLASS$(event01UI,'ui.event01UI',_super);
		var __proto__=event01UI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(event01UI.uiView);

		}

		event01UI.uiView={"type":"View","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"top":0,"skin":"comp/di.png","right":0,"left":0,"bottom":0,"alpha":0.72,"sizeGrid":"1,1,1,1"}},{"type":"Box","props":{"width":668,"height":791,"centerY":-30,"centerX":0},"child":[{"type":"Image","props":{"y":103,"width":646,"skin":"comp/jm_td.png","height":686,"sizeGrid":"42,42,60,42"}},{"type":"Image","props":{"y":149,"x":26,"width":551,"skin":"comp/jm_jt3.png","height":50,"sizeGrid":"0,22,0,1"}},{"type":"Label","props":{"y":159,"x":-49,"width":300,"text":"限时出售","strokeColor":"#1d5f79","stroke":4,"height":37,"fontSize":30,"color":"#ffffff","centerX":-29,"align":"center"}},{"type":"Button","props":{"y":86,"x":579,"var":"butClose","stateNum":2,"skin":"comp/btn_close.png"}},{"type":"Label","props":{"y":159,"x":-49,"width":185,"var":"lblLastTime","text":"00:05:00","strokeColor":"#1d5f79","stroke":4,"height":37,"fontSize":30,"color":"#ffffff","centerX":125.5,"align":"right"}},{"type":"Image","props":{"x":11,"skin":"comp/npc_04.png"}},{"type":"Label","props":{"y":219,"x":-49,"width":359,"text":"真巧啊！我会用高价格收购以下物品！","strokeColor":"#1d5f79","height":26,"fontSize":20,"color":"#3f8fb1","centerX":89.5,"align":"left"}},{"type":"List","props":{"y":274,"x":35,"width":576,"var":"lstItems","spaceY":20,"spaceX":20,"repeatY":2,"repeatX":3,"height":462},"child":[{"type":"Box","props":{"y":-1,"x":4,"width":177,"renderType":"render","height":223},"child":[{"type":"Image","props":{"y":0,"x":1,"width":173,"skin":"comp/jm_td2.png","height":223,"sizeGrid":"20,20,20,20"}},{"type":"Image","props":{"y":51,"x":41,"skin":"comp/muban2.png"}},{"type":"Image","props":{"y":69,"x":54,"skin":"comp/yinying.png"}},{"type":"Image","props":{"y":1,"x":38,"width":100,"name":"itemImage","height":100,"centerX":1}},{"type":"Label","props":{"y":61,"x":39,"width":100,"text":"32","strokeColor":"#1d5f79","stroke":5,"name":"itemHow","height":25,"fontSize":22,"color":"#ffffff","centerX":0,"align":"center"}},{"type":"Button","props":{"y":135,"x":21,"stateNum":2,"skin":"comp/btn_ty.png","name":"butSell"}},{"type":"Label","props":{"y":148,"width":96,"text":"出售","strokeColor":"#1d5f79","stroke":4,"name":"lblSell","height":37,"fontSize":30,"color":"#ffffff","centerX":-4.5,"align":"center"}},{"type":"Image","props":{"y":138,"x":28,"skin":"comp/wancheng.png","name":"imgSellOk"}}]}]},{"type":"Image","props":{"y":588,"x":627,"skin":"comp/jm_td6.png"}},{"type":"Button","props":{"y":611,"x":631,"var":"butDel","stateNum":2,"skin":"comp/btn_fangqi.png"}}]}]};
		return event01UI;
	})(View);
var event02UI=(function(_super){
		function event02UI(){
			
		    this.lblName=null;
		    this.butClose=null;
		    this.lstItems=null;
		    this.butFight=null;
		    this.lblLevel=null;
		    this.butDel=null;

			event02UI.__super.call(this);
		}

		CLASS$(event02UI,'ui.event02UI',_super);
		var __proto__=event02UI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(event02UI.uiView);

		}

		event02UI.uiView={"type":"View","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"top":0,"skin":"comp/di.png","right":0,"left":0,"bottom":0,"alpha":0.72,"sizeGrid":"1,1,1,1"}},{"type":"Box","props":{"width":668,"height":755,"centerY":0,"centerX":10},"child":[{"type":"Image","props":{"y":11,"width":646,"skin":"comp/jm_td.png","height":753,"sizeGrid":"42,42,60,42"}},{"type":"Image","props":{"y":213,"x":35,"width":578,"skin":"comp/jm_td2.png","height":381,"sizeGrid":"20,20,20,20"}},{"type":"Image","props":{"y":46,"x":34,"skin":"comp/jm_td8.png"}},{"type":"Image","props":{"y":229,"x":35,"width":551,"skin":"comp/jm_jt3.png","height":45,"sizeGrid":"0,22,0,1"}},{"type":"Label","props":{"y":235,"x":-49,"width":300,"text":"对方兵力","strokeColor":"#1d5f79","stroke":4,"height":37,"fontSize":30,"color":"#ffffff","centerX":-129,"align":"left"}},{"type":"Image","props":{"y":7,"x":213,"skin":"comp/twdtd.png"}},{"type":"Label","props":{"y":19,"x":230,"width":180,"var":"lblName","text":"玩家名字 ","strokeColor":"#1d5f79","stroke":4,"height":30,"fontSize":28,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"x":579,"var":"butClose","stateNum":2,"skin":"comp/btn_close.png"}},{"type":"List","props":{"y":279,"x":45,"width":555,"visible":false,"spaceY":20,"spaceX":20,"repeatY":1,"repeatX":4,"height":154},"child":[{"type":"Box","props":{"y":5,"x":4,"width":122,"renderType":"render","height":153},"child":[{"type":"Image","props":{"y":-1,"width":122,"name":"itemImage","height":122,"centerX":0}},{"type":"Label","props":{"y":126,"width":149,"text":"盾兵 lv1","strokeColor":"#1d5f79","height":26,"fontSize":20,"color":"#3f8fb1","centerX":0.5,"align":"center"}}]}]},{"type":"Image","props":{"y":446,"x":35,"width":551,"skin":"comp/jm_jt3.png","height":45,"sizeGrid":"0,22,0,1"}},{"type":"Label","props":{"y":452,"x":-49,"width":300,"text":"城池物资","strokeColor":"#1d5f79","stroke":4,"height":37,"fontSize":30,"color":"#ffffff","centerX":-129,"align":"left"}},{"type":"List","props":{"y":500,"x":45,"width":551,"var":"lstItems","spaceY":20,"spaceX":10,"repeatY":1,"repeatX":4,"height":90},"child":[{"type":"Box","props":{"y":-2,"x":4,"width":90,"renderType":"render","height":73},"child":[{"type":"Image","props":{"y":3,"width":70,"name":"itemImage","height":66,"centerX":0}},{"type":"Label","props":{"y":72,"width":66,"text":"40k","strokeColor":"#1d5f79","stroke":5,"name":"itemName","height":20,"fontSize":16,"color":"#ffffff","centerX":0,"align":"center"}}]}]},{"type":"Image","props":{"y":640,"x":25,"skin":"comp/jm_td7.png"}},{"type":"Button","props":{"y":599,"x":255,"var":"butFight","stateNum":2,"skin":"comp/btn_zd.png"}},{"type":"Label","props":{"y":160,"x":-49,"width":154,"var":"lblLevel","text":"Lv 15","strokeColor":"#1d5f79","stroke":5,"height":37,"fontSize":30,"color":"#ffffff","centerX":199,"align":"center"}},{"type":"Image","props":{"y":590,"x":627,"skin":"comp/jm_td6.png"}},{"type":"Button","props":{"y":613,"x":631,"var":"butDel","stateNum":2,"skin":"comp/btn_fangqi.png"}}]}]};
		return event02UI;
	})(View);
var event03UI=(function(_super){
		function event03UI(){
			
		    this.butClose=null;
		    this.butOpen=null;
		    this.butDel=null;

			event03UI.__super.call(this);
		}

		CLASS$(event03UI,'ui.event03UI',_super);
		var __proto__=event03UI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(event03UI.uiView);

		}

		event03UI.uiView={"type":"View","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"top":0,"skin":"comp/di.png","right":0,"left":0,"bottom":0,"alpha":0.72,"sizeGrid":"1,1,1,1"}},{"type":"Box","props":{"width":567,"height":508,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":24,"width":544,"skin":"comp/jm_td.png","height":506,"sizeGrid":"42,42,60,42"}},{"type":"Button","props":{"x":474,"var":"butClose","stateNum":2,"skin":"comp/btn_close.png"}},{"type":"Image","props":{"y":85,"x":36,"width":471,"skin":"comp/jm_td2.png","height":300,"sizeGrid":"20,20,20,20"}},{"type":"Label","props":{"y":102,"x":-101,"width":300,"text":"罕见宝箱","strokeColor":"#1d5f79","stroke":4,"height":37,"fontSize":30,"color":"#ffffff","centerX":-4,"align":"center"}},{"type":"Button","props":{"y":402,"x":174,"width":196,"var":"butOpen","stateNum":2,"skin":"comp/btn_ty2.png","height":74}},{"type":"Label","props":{"y":417,"x":-101,"width":140,"text":"开启","strokeColor":"#1d5f79","stroke":4,"height":37,"fontSize":30,"color":"#ffffff","centerX":-4,"align":"center"}},{"type":"Image","props":{"x":200,"skin":"comp/icon02.png","scaleY":0.5,"scaleX":0.5,"centerY":179}},{"type":"Box","props":{"y":132,"x":182},"child":[{"type":"Image","props":{"skin":"comp/box1_01.png"}},{"type":"Image","props":{"visible":false,"skin":"comp/box1_02.png"}}]},{"type":"Box","props":{"y":132,"x":182,"visible":false},"child":[{"type":"Image","props":{"skin":"comp/box2_01.png"}},{"type":"Image","props":{"skin":"comp/box2_02.png"}}]},{"type":"Box","props":{"y":-52,"x":-35,"visible":false},"child":[{"type":"Image","props":{"skin":"comp/light.png"}},{"type":"Box","props":{"y":201,"x":234,"width":141,"renderType":"render","height":141},"child":[{"type":"Image","props":{"y":22,"width":100,"name":"itemImage","height":100,"centerX":1.5}},{"type":"Label","props":{"y":92,"width":138,"text":"32","strokeColor":"#1d5f79","stroke":2,"name":"itemHow","height":32,"fontSize":28,"color":"#ffffff","centerX":0.5,"align":"center"}}]}]},{"type":"Image","props":{"y":358,"x":525,"skin":"comp/jm_td6.png"}},{"type":"Button","props":{"y":381,"x":529,"var":"butDel","stateNum":2,"skin":"comp/btn_fangqi.png"}}]}]};
		return event03UI;
	})(View);
var homeUI=(function(_super){
		function homeUI(){
			
		    this.gameBox=null;
		    this.imgCentre=null;
		    this.imgWall=null;
		    this.imgWarehouse=null;
		    this.imgFarm=null;
		    this.txtName=null;
		    this.proExp=null;
		    this.txtExp=null;
		    this.imgGold=null;
		    this.fntGold=null;
		    this.fntDiamond=null;
		    this.fntMedal=null;
		    this.butRank=null;
		    this.lblWallDefense=null;
		    this.wareHouseFood=null;
		    this.butWall=null;
		    this.butFarm=null;
		    this.butCentre=null;
		    this.butWarehouse=null;
		    this.obMakeProduction=null;
		    this.lblDoHow=null;
		    this.exploreCards=null;
		    this.butFight=null;
		    this.imgMachine=null;
		    this.butMachine=null;

			homeUI.__super.call(this);
		}

		CLASS$(homeUI,'ui.homeUI',_super);
		var __proto__=homeUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("mod.RunTime.ButLevel",mod.RunTime.ButLevel);
			View.regComponent("mod.RunTime.HomeMakeProduction",mod.RunTime.HomeMakeProduction);
			View.regComponent("mod.RunTime.HomeCardList",mod.RunTime.HomeCardList);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(homeUI.uiView);

		}

		homeUI.uiView={"type":"View","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"top":0,"skin":"login/background_map.jpg","right":0,"left":0,"bottom":0}},{"type":"Box","props":{"width":750,"var":"gameBox","height":1334,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"skin":"comp/bj.jpg","centerX":0}},{"type":"Image","props":{"y":315,"skin":"comp/bj.png","centerX":0}},{"type":"Image","props":{"y":840,"x":589,"width":241,"var":"imgCentre","skin":"comp/binying.png","pivotY":103,"pivotX":116,"height":214}},{"type":"Image","props":{"y":520,"x":489,"width":477,"var":"imgWall","skin":"comp/chengqiang.png","pivotY":98,"pivotX":238,"height":196}},{"type":"Image","props":{"y":990,"x":305,"width":268,"var":"imgWarehouse","skin":"comp/liangcang.png","pivotY":118,"pivotX":134,"height":236}},{"type":"Image","props":{"y":685,"x":155,"width":293,"var":"imgFarm","skin":"comp/nongtian.png","pivotY":86,"pivotX":146,"height":173}},{"type":"Image","props":{"y":871,"x":557,"skin":"comp/shu.png"}},{"type":"Box","props":{"y":1,"x":13},"child":[{"type":"Image","props":{"skin":"comp/txdi.png"}},{"type":"Label","props":{"y":29,"x":120,"width":158,"var":"txtName","text":"玩家名字","strokeColor":"#1d5f79","stroke":2,"height":24,"fontSize":24,"color":"#ffffff","align":"left"}},{"type":"ProgressBar","props":{"y":61,"x":119,"var":"proExp","skin":"comp/progress_02.png"}},{"type":"Label","props":{"y":65,"x":128,"width":132,"var":"txtExp","text":"200/500","strokeColor":"#1d5f79","stroke":2,"height":23,"fontSize":20,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":29,"x":309,"skin":"comp/zt.png"}},{"type":"Image","props":{"y":53,"x":310,"width":73,"var":"imgGold","skin":"comp/icon01.png","pivotY":33,"pivotX":36,"height":67}},{"type":"Image","props":{"y":29,"x":526,"skin":"comp/zt.png"}},{"type":"Image","props":{"y":22,"x":515,"skin":"comp/icon02.png"}},{"type":"Button","props":{"y":4,"x":425,"stateNum":2,"skin":"comp/btn_jia.png"}},{"type":"Button","props":{"y":4,"x":643,"stateNum":2,"skin":"comp/btn_jia.png"}},{"type":"FontClip","props":{"y":58,"x":349,"width":100,"var":"fntGold","value":"2500","skin":"comp/font1.png","sheet":"0123456789kwm","pivotY":14,"pivotX":0,"height":28}},{"type":"FontClip","props":{"y":58,"x":632,"width":100,"var":"fntDiamond","value":"2500","skin":"comp/font1.png","sheet":"0123456789kwm","pivotY":14,"pivotX":50,"height":28}}]},{"type":"Button","props":{"y":131,"x":20,"stateNum":2,"skin":"comp/btn_xunzhang.png"}},{"type":"FontClip","props":{"y":211,"x":23,"width":100,"var":"fntMedal","value":"2500","skin":"comp/font1.png","sheet":"0123456789kwm","pivotY":14,"pivotX":0,"height":28,"align":"center"}},{"type":"Button","props":{"y":253,"x":20,"var":"butRank","stateNum":2,"skin":"comp/btn_paihang.png"}},{"type":"Label","props":{"y":420,"x":300,"width":299,"var":"lblWallDefense","text":"防御值：25000","strokeColor":"#1d5f79","stroke":2,"height":31,"fontSize":26,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":914,"x":235,"width":260,"var":"wareHouseFood","text":"库存：2250/5000","strokeColor":"#1d5f79","stroke":2,"height":31,"fontSize":26,"color":"#ffffff","align":"center"}},{"type":"Box","props":{"y":371,"x":597,"width":149,"var":"butWall","runtime":"mod.RunTime.ButLevel","mouseThrough":true,"height":138},"child":[{"type":"Image","props":{"width":83,"skin":"template/butLevel/comp/lv_di.png","name":"imgLv","height":84,"centerY":0,"centerX":0},"child":[{"type":"Label","props":{"y":23,"x":10,"width":63,"text":"lv 1","strokeColor":"#1d5f79","stroke":2,"name":"lblLv","height":31,"fontSize":24,"color":"#ffffff","align":"center"}}]},{"type":"Button","props":{"y":0,"x":0,"width":149,"stateNum":2,"skin":"template/butLevel/comp/btn_shengji.png","name":"butUp","height":138},"child":[{"type":"Circle","props":{"y":66,"x":75,"renderType":"hit","radius":47,"lineWidth":1,"fillColor":"#ff0000"}}]}]},{"type":"Box","props":{"y":581,"x":-41,"width":149,"var":"butFarm","runtime":"mod.RunTime.ButLevel","mouseThrough":true,"height":138},"child":[{"type":"Image","props":{"width":83,"skin":"template/butLevel/comp/lv_di.png","name":"imgLv","height":84,"centerY":0,"centerX":0},"child":[{"type":"Label","props":{"y":23,"x":10,"width":63,"text":"lv 1","strokeColor":"#1d5f79","stroke":2,"name":"lblLv","height":31,"fontSize":24,"color":"#ffffff","align":"center"}}]},{"type":"Button","props":{"y":0,"x":0,"width":149,"stateNum":2,"skin":"template/butLevel/comp/btn_shengji.png","name":"butUp","height":138},"child":[{"type":"Circle","props":{"y":66,"x":75,"renderType":"hit","radius":47,"lineWidth":1,"fillColor":"#ff0000"}}]}]},{"type":"Box","props":{"y":696,"x":627,"width":149,"var":"butCentre","runtime":"mod.RunTime.ButLevel","mouseThrough":true,"height":138},"child":[{"type":"Image","props":{"width":83,"skin":"template/butLevel/comp/lv_di.png","name":"imgLv","height":84,"centerY":0,"centerX":0},"child":[{"type":"Label","props":{"y":23,"x":10,"width":63,"text":"lv 1","strokeColor":"#1d5f79","stroke":2,"name":"lblLv","height":31,"fontSize":24,"color":"#ffffff","align":"center"}}]},{"type":"Button","props":{"y":0,"x":0,"width":149,"stateNum":2,"skin":"template/butLevel/comp/btn_shengji.png","name":"butUp","mouseThrough":true,"height":138},"child":[{"type":"Circle","props":{"y":66,"x":75,"renderType":"hit","radius":47,"lineWidth":1,"fillColor":"#ff0000"}}]}]},{"type":"Box","props":{"y":859,"x":108,"width":149,"var":"butWarehouse","runtime":"mod.RunTime.ButLevel","mouseThrough":true,"height":138},"child":[{"type":"Image","props":{"width":83,"skin":"template/butLevel/comp/lv_di.png","name":"imgLv","height":84,"centerY":0,"centerX":0},"child":[{"type":"Label","props":{"y":23,"x":10,"width":63,"text":"lv 1","strokeColor":"#1d5f79","stroke":2,"name":"lblLv","height":31,"fontSize":24,"color":"#ffffff","align":"center"}}]},{"type":"Button","props":{"y":0,"x":0,"width":149,"stateNum":2,"skin":"template/butLevel/comp/btn_shengji.png","name":"butUp","height":138},"child":[{"type":"Circle","props":{"y":67,"x":75,"renderType":"hit","radius":47,"lineWidth":1,"fillColor":"#ff0000"}}]}]},{"type":"Box","props":{"y":655,"x":116,"width":160,"var":"obMakeProduction","runtime":"mod.RunTime.HomeMakeProduction","height":30},"child":[{"type":"Image","props":{"y":2,"x":1,"skin":"comp/di3.png"}},{"type":"Image","props":{"y":-5,"x":3,"width":60,"skin":"comp/sc_icon06.png","scaleY":0.6,"scaleX":0.6,"name":"imgItem","height":60}},{"type":"ProgressBar","props":{"y":9,"x":37,"skin":"load/progress_04.png","name":"proMake"}},{"type":"Image","props":{"y":2,"x":1,"visible":false,"skin":"comp/di4.png","name":"imgFull"}}]},{"type":"Image","props":{"y":1270,"x":35,"skin":"comp/di3.png"}},{"type":"Image","props":{"y":1262,"x":33,"skin":"comp/icon03.png"}},{"type":"Label","props":{"y":1272,"x":55,"width":75,"var":"lblDoHow","text":"15/20","strokeColor":"#1d5f79","stroke":2,"height":20,"fontSize":18,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":1256,"x":116,"stateNum":2,"skin":"comp/btn_jiahao2.png"}},{"type":"Box","props":{"y":1174,"x":78,"width":200,"var":"exploreCards","runtime":"mod.RunTime.HomeCardList","height":82},"child":[{"type":"Image","props":{"y":3,"width":200,"skin":"comp/jm_td5.png","name":"imgBox","height":103,"sizeGrid":"0,29,0,31"}},{"type":"Image","props":{"y":13,"x":75,"skin":"comp/icon01.png","scaleY":0.6,"scaleX":0.6,"name":"imgOpen"}},{"type":"Label","props":{"y":42,"x":61,"width":75,"text":"商人","strokeColor":"#1d5f79","stroke":2,"height":27,"fontSize":20,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":7,"x":150,"width":65,"stateNum":2,"skin":"comp/btn_youji.png","pivotX":32,"name":"butOpen","height":65}},{"type":"List","props":{"y":13,"x":130,"width":1,"visible":false,"spaceX":16,"repeatY":1,"repeatX":5,"name":"lstCard","height":52},"child":[{"type":"Box","props":{"y":27,"x":36,"width":47,"renderType":"render","pivotY":24,"pivotX":24,"height":47},"child":[{"type":"Button","props":{"width":47,"stateNum":2,"skin":"comp/btn_sr.png","name":"butBusiness","height":47}},{"type":"Image","props":{"y":-2,"x":-2,"visible":false,"skin":"comp/btnxz_sr.png","name":"imgBg"}}]}]},{"type":"Image","props":{"y":-6,"x":101,"skin":"comp/jm_hd.png","name":"imgHow"},"child":[{"type":"Label","props":{"y":6,"x":1,"width":32,"text":"3","strokeColor":"#1d5f79","stroke":2,"name":"lblHow","height":27,"fontSize":20,"color":"#ffffff","align":"center"}}]}]},{"type":"Button","props":{"y":1136,"x":22,"width":137,"var":"butFight","stateNum":2,"skin":"comp/btn_zhanzheng.png","mouseThrough":true,"height":141},"child":[{"type":"Circle","props":{"y":56,"x":68,"renderType":"hit","radius":52,"lineWidth":1,"fillColor":"#ff0000"}}]},{"type":"Image","props":{"y":683,"x":494,"width":186,"var":"imgMachine","skin":"comp/jiagong.png","pivotY":96,"pivotX":100,"height":174}},{"type":"Box","props":{"y":554,"x":487,"width":149,"var":"butMachine","runtime":"mod.RunTime.ButLevel","mouseThrough":true,"height":138},"child":[{"type":"Image","props":{"width":83,"skin":"template/butLevel/comp/lv_di.png","name":"imgLv","height":84,"centerY":0,"centerX":0},"child":[{"type":"Label","props":{"y":23,"x":10,"width":63,"text":"lv 1","strokeColor":"#1d5f79","stroke":2,"name":"lblLv","height":31,"fontSize":24,"color":"#ffffff","align":"center"}}]},{"type":"Button","props":{"y":0,"x":0,"width":149,"stateNum":2,"skin":"template/butLevel/comp/btn_shengji.png","name":"butUp","height":138},"child":[{"type":"Circle","props":{"y":66,"x":75,"renderType":"hit","radius":47,"lineWidth":1,"fillColor":"#ff0000"}}]}]}]}]};
		return homeUI;
	})(View);
var interludeUI=(function(_super){
		function interludeUI(){
			
		    this.boxInfo=null;
		    this.boxScene=null;
		    this.imgArrow=null;

			interludeUI.__super.call(this);
		}

		CLASS$(interludeUI,'ui.interludeUI',_super);
		var __proto__=interludeUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(interludeUI.uiView);

		}

		interludeUI.uiView={"type":"View","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"top":0,"skin":"comp/di.png","right":0,"left":0,"bottom":0,"alpha":0.72,"sizeGrid":"1,1,1,1"}},{"type":"Box","props":{"y":-367,"x":25,"width":750,"var":"boxInfo","height":1334,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":723,"x":376,"width":496,"var":"boxScene","skin":"comp/jm/jm_td9.png","pivotY":177,"pivotX":248,"height":355}},{"type":"Image","props":{"y":630,"x":377,"width":90,"var":"imgArrow","skin":"comp/jm_td12.png","pivotY":48,"pivotX":45,"height":96}}]}]};
		return interludeUI;
	})(View);
var loadUI=(function(_super){
		function loadUI(){
			
		    this.probar=null;

			loadUI.__super.call(this);
		}

		CLASS$(loadUI,'ui.loadUI',_super);
		var __proto__=loadUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(loadUI.uiView);

		}

		loadUI.uiView={"type":"View","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"top":0,"skin":"comp/bjt.jpg","right":0,"left":0,"bottom":0}},{"type":"ProgressBar","props":{"width":500,"var":"probar","value":0,"skin":"load/progress_01.png","height":39,"centerY":200,"centerX":0}}]};
		return loadUI;
	})(View);
var loadlastUI=(function(_super){
		function loadlastUI(){
			
		    this.progress=null;

			loadlastUI.__super.call(this);
		}

		CLASS$(loadlastUI,'ui.loadlastUI',_super);
		var __proto__=loadlastUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(loadlastUI.uiView);

		}

		loadlastUI.uiView={"type":"Dialog","props":{"width":750,"height":1334,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":-75,"skin":"comp/bjt.jpg"}},{"type":"ProgressBar","props":{"y":711,"width":547,"var":"progress","skin":"comp/loadlast/progress.png","height":24,"centerX":0.5}},{"type":"Image","props":{"y":682,"width":186,"skin":"comp/loadlast/loading_txt.png","height":17,"centerX":0}},{"type":"Animation","props":{"y":334,"x":373,"source":"anis/logoa.ani"}}]};
		return loadlastUI;
	})(Dialog);
var loginUI=(function(_super){
		function loginUI(){
			
		    this.btnLogin=null;
		    this.txtUid=null;
		    this.txtPwd=null;
		    this.msg=null;

			loginUI.__super.call(this);
		}

		CLASS$(loginUI,'ui.loginUI',_super);
		var __proto__=loginUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(loginUI.uiView);

		}

		loginUI.uiView={"type":"Dialog","props":{"y":0,"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"top":0,"skin":"comp/bjt.jpg","right":0,"left":0,"bottom":0}},{"type":"Box","props":{"width":600,"height":600,"centerY":-100,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"login/common_01.png","height":600,"alpha":0.5,"sizeGrid":"10,10,10,10"}},{"type":"Image","props":{"y":74,"x":54,"width":500,"skin":"login/common_01.png","height":80,"sizeGrid":"10,10,10,10"}},{"type":"Image","props":{"y":202,"x":54,"width":500,"skin":"login/common_01.png","height":80,"sizeGrid":"10,10,10,10"}},{"type":"Image","props":{"y":363,"x":54,"width":500,"var":"btnLogin","skin":"login/login_button.png","height":92},"child":[{"type":"Image","props":{"y":20,"x":135,"skin":"login/ksyx.png"}}]},{"type":"TextInput","props":{"y":89,"x":174,"width":300,"var":"txtUid","height":50,"fontSize":30,"color":"#2f2f2f"}},{"type":"TextInput","props":{"y":216,"x":174,"width":300,"var":"txtPwd","type":"password","height":50,"fontSize":30,"color":"#2f2f2f"}},{"type":"Label","props":{"y":99,"x":86,"text":"账号","fontSize":30,"color":"#2f2f2f","bold":true}},{"type":"Label","props":{"y":228,"x":86,"text":"密码","fontSize":30,"color":"#2f2f2f","bold":true}},{"type":"Label","props":{"x":0,"width":600,"var":"msg","text":"-","height":30,"fontSize":20,"color":"#2f2f2f","bottom":5,"align":"center"}}]}]};
		return loginUI;
	})(Dialog);
var machiningUI=(function(_super){
		function machiningUI(){
			
		    this.buildName=null;
		    this.btnClose=null;

			machiningUI.__super.call(this);
		}

		CLASS$(machiningUI,'ui.machiningUI',_super);
		var __proto__=machiningUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(machiningUI.uiView);

		}

		machiningUI.uiView={"type":"View","props":{"top":0,"right":0,"left":0,"bottom":0},"child":[{"type":"Image","props":{"top":0,"skin":"comp/di.png","right":0,"left":0,"bottom":0,"alpha":0.72,"sizeGrid":"1,1,1,1"}},{"type":"Box","props":{"width":646,"height":1045,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":10,"x":0,"width":646,"skin":"comp/jm_td.png","height":895,"sizeGrid":"42,42,60,42"}},{"type":"Image","props":{"y":7,"x":217,"skin":"comp/twdtd.png"}},{"type":"Label","props":{"y":19,"width":300,"var":"buildName","text":"加工","strokeColor":"#1d5f79","stroke":4,"height":42,"fontSize":28,"color":"#ffffff","centerX":1,"align":"center"}},{"type":"Image","props":{"y":70,"x":23,"width":547,"skin":"comp/jm_jt3.png","height":50,"sizeGrid":"0,22,0,1"}},{"type":"Button","props":{"x":568,"var":"btnClose","stateNum":2,"skin":"comp/btn_close.png"}},{"type":"Label","props":{"y":81,"width":67,"text":"工匠","strokeColor":"#1d5f79","stroke":4,"height":30,"fontSize":24,"color":"#ffffff","centerX":-191.5,"align":"left"}},{"type":"Image","props":{"y":66,"x":38,"skin":"comp/sc_tt_icon02.png"}},{"type":"Label","props":{"y":81,"width":67,"text":"lv 1","strokeColor":"#1d5f79","stroke":4,"height":30,"fontSize":24,"color":"#ffffff","centerX":-130.5,"align":"left"}},{"type":"ProgressBar","props":{"y":77,"x":217,"skin":"comp/progress_01.png"}},{"type":"Label","props":{"y":82,"width":242,"text":"400/1000","strokeColor":"#1d5f79","stroke":4,"height":30,"fontSize":24,"color":"#ffffff","centerX":51,"align":"center"}},{"type":"Image","props":{"y":131,"x":33,"width":578,"skin":"comp/jm_td2.png","height":351,"sizeGrid":"20,20,20,20"}},{"type":"Image","props":{"y":141,"x":39,"skin":"comp/ck_icon01.png"}},{"type":"Image","props":{"y":149,"width":100,"name":"itemImage","height":100,"centerX":-227}},{"type":"Label","props":{"y":185,"x":157,"width":109,"text":"名称","strokeColor":"#1d5f79","stroke":4,"height":33,"fontSize":28,"color":"#ffffff","centerX":-111.5,"align":"center"}},{"type":"Label","props":{"y":185,"x":277,"width":191,"text":"已完成：66","strokeColor":"#1d5f79","stroke":4,"height":33,"fontSize":28,"color":"#ffffff","centerX":49.5,"align":"left"}},{"type":"Button","props":{"y":162,"x":469,"stateNum":2,"skin":"comp/btn_ty.png"}},{"type":"Label","props":{"y":177,"width":65,"text":"收取","strokeColor":"#1d5f79","stroke":4,"height":33,"fontSize":28,"color":"#ffffff","centerX":208.5,"align":"center"}},{"type":"Image","props":{"y":266,"x":33,"skin":"comp/twdt.png"}},{"type":"Image","props":{"y":267,"x":32,"skin":"comp/sc_tt_icon03.png"}},{"type":"Label","props":{"y":272,"width":141,"text":"需要材料","strokeColor":"#1d5f79","stroke":4,"height":33,"fontSize":24,"color":"#ffffff","centerX":-169.5,"align":"left"}},{"type":"List","props":{"y":309,"x":42,"width":249,"repeatY":3,"height":176},"child":[{"type":"Box","props":{"y":-3,"x":19,"width":240,"renderType":"render","height":60},"child":[{"type":"Image","props":{"y":0,"x":2,"width":100,"scaleY":0.6,"scaleX":0.6,"name":"itemImage","height":100,"centerX":-88}},{"type":"Label","props":{"y":13,"x":92,"width":140,"text":"110/200","strokeColor":"#1d5f79","stroke":4,"height":33,"fontSize":24,"color":"#ffffff","centerX":42,"align":"left"}}]}]},{"type":"Button","props":{"y":257,"x":339,"stateNum":2,"skin":"comp/btn_youji.png","scaleX":-1}},{"type":"Button","props":{"y":257,"x":419,"stateNum":2,"skin":"comp/btn_youji.png"}},{"type":"Label","props":{"y":274,"width":107,"text":"10","strokeColor":"#1d5f79","stroke":4,"height":33,"fontSize":28,"color":"#ffffff","centerX":54.5,"align":"center"}},{"type":"Button","props":{"y":256,"x":480,"stateNum":2,"skin":"comp/btn_max.png"}},{"type":"Label","props":{"y":325,"width":108,"text":"加工时间","strokeColor":"#1d5f79","stroke":4,"height":33,"fontSize":24,"color":"#ffffff","centerX":83,"align":"left"}},{"type":"Label","props":{"y":325,"width":108,"text":"5:00","strokeColor":"#1d5f79","stroke":4,"height":33,"fontSize":24,"color":"#ffffff","centerX":195,"align":"left"}},{"type":"Label","props":{"y":367,"width":108,"text":"加工成本","strokeColor":"#1d5f79","stroke":4,"height":33,"fontSize":24,"color":"#ffffff","centerX":83,"align":"left"}},{"type":"Label","props":{"y":367,"width":108,"text":"500","strokeColor":"#1d5f79","stroke":4,"height":33,"fontSize":24,"color":"#ffffff","centerX":230,"align":"left"}},{"type":"Image","props":{"y":365,"x":459,"skin":"comp/icon01.png","scaleY":0.5,"scaleX":0.5}},{"type":"Button","props":{"y":404,"x":469,"stateNum":2,"skin":"comp/btn_ty.png"}},{"type":"Label","props":{"y":419,"width":65,"text":"加工","strokeColor":"#1d5f79","stroke":4,"height":33,"fontSize":28,"color":"#ffffff","centerX":208.5,"align":"center"}},{"type":"Label","props":{"y":419,"width":65,"text":"取消","strokeColor":"#79281c","stroke":4,"height":33,"fontSize":28,"color":"#ffffff","centerX":208.5,"align":"center"}},{"type":"List","props":{"y":495,"x":45,"width":549,"spaceY":6,"spaceX":28,"repeatY":3,"repeatX":4,"height":366},"child":[{"type":"Box","props":{"y":3,"x":4,"width":114,"renderType":"render","height":114},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/ck_icon01.png"}},{"type":"Image","props":{"width":100,"name":"itemImage","height":100,"centerY":1,"centerX":-1}},{"type":"Image","props":{"y":0,"x":46,"skin":"comp/sc_tt_icon01.png"}},{"type":"Image","props":{"y":9,"x":9,"skin":"comp/jm_hd.png","scaleY":0.8,"scaleX":0.8}},{"type":"Label","props":{"y":85,"width":116,"text":"库存 22","strokeColor":"#1d5f79","stroke":3,"height":26,"fontSize":18,"color":"#ffffff","centerX":0,"align":"center"}},{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Label","props":{"y":44,"width":116,"text":"10级解锁","strokeColor":"#1d5f79","stroke":4,"height":33,"fontSize":24,"color":"#ffffff","centerX":0,"align":"center"}},{"type":"Image","props":{"y":0,"x":0,"skin":"comp/ck_icon02.png"}}]},{"type":"Image","props":{"y":0,"x":0,"skin":"comp/ck_icon03.png"}}]}]},{"type":"Image","props":{"y":867,"x":0,"width":646,"skin":"comp/jm_td.png","height":211,"sizeGrid":"42,42,60,42"}},{"type":"List","props":{"y":898,"x":34,"width":574,"spaceY":3,"spaceX":2,"repeatY":2,"repeatX":2,"height":142},"child":[{"type":"Box","props":{"y":4,"x":4,"width":282,"renderType":"render","height":65},"child":[{"type":"Image","props":{"y":0,"width":100,"scaleY":0.6,"scaleX":0.6,"name":"itemImage","height":100,"centerX":-112}},{"type":"Label","props":{"y":33,"width":77,"text":"66","strokeColor":"#1d5f79","stroke":4,"height":30,"fontSize":22,"color":"#ffffff","centerX":-112.5,"align":"center"}},{"type":"ProgressBar","props":{"y":28,"x":62,"skin":"comp/progress_01.png","scaleY":0.5,"scaleX":0.5}},{"type":"Label","props":{"y":28,"x":100,"width":82,"text":"06:00","strokeColor":"#1d5f79","stroke":3,"height":18,"fontSize":16,"color":"#ffffff","centerX":-3,"align":"center"}},{"type":"Button","props":{"y":4,"x":223,"stateNum":2,"skin":"comp/btn_shou.png"}}]}]}]}]};
		return machiningUI;
	})(View);
var productionUI=(function(_super){
		function productionUI(){
			
		    this.bgClose=null;
		    this.buildName=null;
		    this.imgBuildItem=null;
		    this.lblAddValue=null;
		    this.proBuild=null;
		    this.lblBuildTime=null;
		    this.butAddFarms=null;
		    this.fntFarmsValue=null;
		    this.lblBuffTime=null;
		    this.butChangeProduction=null;
		    this.lblContainerValue=null;
		    this.imgBoard=null;
		    this.lstContainer=null;
		    this.lstCanProductions=null;
		    this.btnClose=null;
		    this.lblWarehouse=null;
		    this.selectItemBox=null;
		    this.confirmSell=null;
		    this.boxCurve=null;

			productionUI.__super.call(this);
		}

		CLASS$(productionUI,'ui.productionUI',_super);
		var __proto__=productionUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("mod.RunTime.ProductionBorad",mod.RunTime.ProductionBorad);
			View.regComponent("mod.RunTime.SelectItem",mod.RunTime.SelectItem);
			View.regComponent("mod.RunTime.ConfirmSell",mod.RunTime.ConfirmSell);
			View.regComponent("mod.RunTime.Curve",mod.RunTime.Curve);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(productionUI.uiView);

		}

		productionUI.uiView={"type":"View","props":{"top":0,"right":0,"mouseThrough":true,"left":0,"bottom":0},"child":[{"type":"Image","props":{"var":"bgClose","top":0,"skin":"comp/di.png","right":0,"left":0,"bottom":0,"alpha":0.72,"sizeGrid":"1,1,1,1"}},{"type":"Box","props":{"width":646,"height":1045,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":10,"x":0,"width":646,"skin":"comp/jm_td.png","height":984,"sizeGrid":"42,42,60,42"}},{"type":"Image","props":{"y":7,"x":217,"skin":"comp/twdtd.png"}},{"type":"Label","props":{"y":19,"width":300,"var":"buildName","text":"生产中心 Lv1","strokeColor":"#1d5f79","stroke":4,"height":42,"fontSize":28,"color":"#ffffff","centerX":5,"align":"center"}},{"type":"Box","props":{"y":116,"x":33,"width":578,"renderType":"render","height":220},"child":[{"type":"Image","props":{"y":2,"x":0,"width":578,"skin":"comp/jm_td2.png","height":101,"sizeGrid":"20,20,20,20"}},{"type":"Image","props":{"y":36,"x":349,"skin":"comp/icon_nm.png","scaleY":0.5,"scaleX":0.5}},{"type":"Image","props":{"y":11,"x":15,"width":86,"var":"imgBuildItem","skin":"comp/sc_icon01.png","height":86}},{"type":"Label","props":{"y":37,"x":22,"width":80,"var":"lblAddValue","text":"+1","strokeColor":"#1d5f79","stroke":3,"height":30,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"ProgressBar","props":{"y":35,"x":105,"width":235,"var":"proBuild","skin":"comp/progress_01.png","height":39}},{"type":"Label","props":{"y":41,"x":115,"width":205,"var":"lblBuildTime","text":"3分44秒","strokeColor":"#1d5f79","stroke":2,"height":31,"fontSize":20,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":22,"x":344,"width":79,"var":"butAddFarms","stateNum":2,"height":63}},{"type":"FontClip","props":{"y":69,"x":362,"width":78,"var":"fntFarmsValue","value":"20","skin":"comp/font1.png","sheet":"0123456789","pivotY":14,"height":28,"align":"left"}},{"type":"Label","props":{"y":16,"x":329,"width":80,"var":"lblBuffTime","text":"-30s","strokeColor":"#1d5f79","stroke":2,"height":25,"fontSize":18,"color":"#f95d5b","align":"center"}},{"type":"Button","props":{"y":19,"x":438,"var":"butChangeProduction","stateNum":2,"skin":"comp/btn_ty.png"}},{"type":"Label","props":{"y":109,"x":430,"width":150,"var":"lblContainerValue","text":"500/1200","strokeColor":"#1d5f79","stroke":3,"height":23,"fontSize":20,"color":"#e5e3e3","align":"center"}},{"type":"Label","props":{"y":32,"x":442,"width":120,"text":"切换","strokeColor":"#1d5f79","stroke":3,"height":51,"fontSize":32,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":111,"x":350,"width":80,"text":"生产容量","strokeColor":"#1d5f79","stroke":3,"height":23,"fontSize":18,"color":"#ffffff","align":"right"}},{"type":"Image","props":{"y":167,"x":-5,"var":"imgBoard","skin":"comp/muban.png","runtime":"mod.RunTime.ProductionBorad"}},{"type":"List","props":{"y":116,"x":9,"width":554,"visible":false,"var":"lstContainer","spaceX":6,"repeatY":1,"repeatX":5,"height":81},"child":[{"type":"Box","props":{"y":1,"x":7,"width":100,"renderType":"render","height":100},"child":[{"type":"Image","props":{"y":0,"width":100,"name":"itemImage","height":100,"centerX":0.5}},{"type":"Image","props":{"y":58,"x":17,"skin":"comp/yinying.png"}},{"type":"Label","props":{"y":50,"width":100,"text":"32","strokeColor":"#1d5f79","stroke":2,"name":"itemHow","height":25,"fontSize":22,"color":"#ffffff","centerX":0,"align":"center"}}]}]}]},{"type":"List","props":{"y":411,"x":24,"width":597,"var":"lstCanProductions","spaceY":10,"spaceX":0,"repeatY":4,"repeatX":1,"height":487},"child":[{"type":"Box","props":{"y":5,"x":9,"width":578,"renderType":"render","height":101},"child":[{"type":"Image","props":{"width":578,"skin":"comp/jm_td2.png","name":"imgBg","height":101,"sizeGrid":"20,20,20,20"}},{"type":"Image","props":{"y":50,"x":105,"width":90,"pivotY":45,"pivotX":90,"name":"itemImage","height":90}},{"type":"Label","props":{"y":51,"x":108,"width":92,"text":"44","strokeColor":"#1d5f79","stroke":3,"pivotY":19,"pivotX":0,"name":"itemHow","height":37,"fontSize":28,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":32,"x":256,"width":60,"text":"10","name":"price","height":37,"fontSize":28,"color":"#a82e1d","align":"left"}},{"type":"Image","props":{"y":28,"x":211,"skin":"comp/icon01.png","scaleY":0.6,"scaleX":0.6}},{"type":"Image","props":{"y":38,"x":348,"skin":"comp/production/icon_ss2.png","name":"imgIsUp"}},{"type":"Button","props":{"y":24,"x":371,"stateNum":2,"skin":"comp/btn_qxt.png","name":"btnCurve"}},{"type":"Button","props":{"y":11,"x":464,"stateNum":2,"skin":"comp/btn_buy.png","name":"btnSell"}},{"type":"Box","props":{"y":15,"x":-1,"width":578,"visible":false,"name":"boxUpNeed","height":66},"child":[{"type":"Image","props":{"y":0,"x":0,"width":578,"skin":"comp/di2.png","height":66}},{"type":"Image","props":{"y":0,"x":0,"width":578,"skin":"comp/di2.png","height":66}},{"type":"Image","props":{"y":0,"x":0,"width":578,"skin":"comp/di2.png","height":66}}]},{"type":"Label","props":{"y":31,"x":21,"width":534,"text":"生产中心40级开通","strokeColor":"#1d5f79","stroke":3,"name":"lblUpNeed","height":38,"fontSize":28,"color":"#ffffff","align":"center"}}]}]},{"type":"Label","props":{"y":903,"x":153,"width":118,"text":"仓库容量","strokeColor":"#1d5f79","stroke":3,"height":39,"fontSize":26,"color":"#ffffff","align":"left"}},{"type":"Button","props":{"x":568,"var":"btnClose","stateNum":2,"skin":"comp/btn_close.png"}},{"type":"Label","props":{"y":900,"x":270,"width":118,"var":"lblWarehouse","text":"250/2000","strokeColor":"#1d5f79","stroke":3,"height":39,"fontSize":32,"color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":855,"x":69,"skin":"comp/icon_dck.png"}},{"type":"Box","props":{"y":198,"x":33,"visible":false,"var":"selectItemBox","runtime":"mod.RunTime.SelectItem"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":578,"skin":"comp/tanc.png","height":150,"sizeGrid":"36,70,17,20"}},{"type":"List","props":{"y":31,"x":11,"width":554,"repeatY":1,"repeatX":5,"name":"lstSelectItem","height":109},"child":[{"type":"Box","props":{"y":1,"x":5,"width":108,"renderType":"render","height":106},"child":[{"type":"Image","props":{"y":5,"x":10,"width":90,"skin":"comp/sc_icon01.png","name":"imgItem","height":90}},{"type":"Image","props":{"y":83,"x":9,"visible":false,"skin":"comp/yinying.png"}},{"type":"Label","props":{"y":77,"x":18,"width":75,"text":"10m","strokeColor":"#1d5f79","stroke":3,"name":"lblNeedTime","height":23,"fontSize":26,"color":"#ffffff","align":"center"}}]}]}]},{"type":"Image","props":{"y":69,"x":24,"skin":"comp/twdt.png"}},{"type":"Image","props":{"y":52,"x":30,"skin":"comp/sc_tt_icon01.png"}},{"type":"Label","props":{"y":78,"width":156,"text":"正在生产","strokeColor":"#1d5f79","stroke":4,"height":28,"fontSize":22,"color":"#ffffff","centerX":-146,"align":"left"}},{"type":"Image","props":{"y":361,"x":24,"skin":"comp/twdt.png"}},{"type":"Image","props":{"y":344,"x":30,"skin":"comp/sc_tt_icon02.png"}},{"type":"Label","props":{"y":370,"width":156,"text":"可销售物品","strokeColor":"#1d5f79","stroke":4,"height":28,"fontSize":22,"color":"#ffffff","centerX":-156,"align":"left"}},{"type":"Tab","props":{"y":358,"x":276,"selectedIndex":0},"child":[{"type":"Button","props":{"stateNum":2,"skin":"comp/btn_t_gz.png","name":"item0"}},{"type":"Button","props":{"x":103,"stateNum":2,"skin":"comp/btn_t_xm.png","name":"item1"}},{"type":"Button","props":{"x":206,"stateNum":2,"skin":"comp/btn_t_cj.png","name":"item2"}}]}]},{"type":"Box","props":{"width":644,"visible":false,"var":"confirmSell","runtime":"mod.RunTime.ConfirmSell","height":436,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"width":644,"skin":"comp/jm_td.png","height":436,"sizeGrid":"42,42,60,42"}},{"type":"Image","props":{"y":41,"x":37,"width":570,"skin":"comp/jm_td2.png","height":262,"sizeGrid":"20,20,20,20"}},{"type":"Image","props":{"y":53,"x":84,"width":100,"name":"imgItem","height":100}},{"type":"Label","props":{"y":116,"x":82,"width":100,"text":"44","strokeColor":"#1d5f79","stroke":3,"name":"lblItemHow","height":37,"fontSize":28,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":94,"x":329,"width":130,"text":"44","strokeColor":"#1d5f79","stroke":3,"name":"lblChangeHow","height":37,"fontSize":36,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":84,"x":248,"stateNum":2,"skin":"comp/btn_jianhao.png","name":"butDown"}},{"type":"Button","props":{"y":84,"x":463,"stateNum":2,"skin":"comp/btn_jiahao.png","name":"butUp"}},{"type":"Label","props":{"y":179,"x":129,"width":158,"text":"单价：300","strokeColor":"#1d5f79","stroke":3,"name":"lblPrice","height":37,"fontSize":28,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":179,"x":389,"width":158,"text":"3000","strokeColor":"#1d5f79","stroke":3,"name":"lblCountValue","height":37,"fontSize":28,"color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":164,"x":323,"skin":"comp/icon01.png","scaleY":0.8,"scaleX":0.8}},{"type":"Label","props":{"y":242,"x":98,"width":447,"text":"确定出售该物品吗？","strokeColor":"#1d5f79","stroke":3,"height":37,"fontSize":32,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":316,"x":169,"stateNum":2,"skin":"comp/btn_ty.png","name":"btnOk"}},{"type":"Label","props":{"y":328,"x":186,"width":94,"text":"确定","strokeColor":"#1d5f79","stroke":3,"height":37,"fontSize":32,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":316,"x":343,"width":126,"stateNum":2,"skin":"comp/btn_ty.png","name":"btnCancel","height":74}},{"type":"Label","props":{"y":328,"x":360,"width":94,"text":"取消","strokeColor":"#1d5f79","stroke":3,"height":37,"fontSize":32,"color":"#ffffff","align":"center"}}]},{"type":"Box","props":{"width":647,"visible":false,"var":"boxCurve","runtime":"mod.RunTime.Curve","height":518,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"width":647,"skin":"comp/jm_td3.png","height":518,"sizeGrid":"47,47,58,44"}},{"type":"Image","props":{"y":44,"x":60,"width":70,"name":"imgProduction","height":70}},{"type":"Label","props":{"y":67,"x":205,"width":173,"text":"44","strokeColor":"#1d5f79","stroke":3,"name":"lblPrice","height":37,"fontSize":30,"color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":59,"x":136,"skin":"comp/icon01.png","scaleY":0.6,"scaleX":0.6}},{"type":"Image","props":{"y":78,"x":189,"skin":"comp/icon_ss.png","name":"imgArow"}},{"type":"Image","props":{"y":43,"x":382,"skin":"comp/zd_sj.png"}},{"type":"Label","props":{"y":67,"x":450,"width":173,"text":"3:12:05","strokeColor":"#1d5f79","stroke":3,"name":"lblTime","height":37,"fontSize":30,"color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":122,"x":39,"width":565,"skin":"comp/jm_td4.png","height":338,"alpha":0.52,"sizeGrid":"20,22,24,22"}},{"type":"Image","props":{"y":140,"x":56,"width":20,"skin":"comp/jm_jt.png","height":301,"sizeGrid":"18,0,3,0"}},{"type":"Image","props":{"y":429,"x":65,"width":520,"skin":"comp/jm_jt0.png","height":20,"sizeGrid":"0,16,0,3"}},{"type":"Box","props":{"y":122,"x":39,"width":565,"name":"imgBox","height":338},"child":[{"type":"Image","props":{"y":228,"x":45,"width":11,"skin":"comp/jm_jt1.png","height":11},"child":[{"type":"Label","props":{"y":-20,"x":-21,"width":50,"text":"22","strokeColor":"#4675b2","stroke":3,"name":"lbPrice","height":15,"fontSize":15,"color":"#ffffff","align":"center"}}]}]}]}]};
		return productionUI;
	})(View);
var butLevelUI=(function(_super){
		function butLevelUI(){
			

			butLevelUI.__super.call(this);
		}

		CLASS$(butLevelUI,'ui.templates.butLevelUI',_super);
		var __proto__=butLevelUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("mod.RunTime.ButLevel",mod.RunTime.ButLevel);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(butLevelUI.uiView);

		}

		butLevelUI.uiView={"type":"View","props":{"width":149,"height":138},"child":[{"type":"Box","props":{"y":0,"x":0,"width":149,"runtime":"mod.RunTime.ButLevel","height":138},"child":[{"type":"Image","props":{"width":83,"skin":"comp/lv_di.png","name":"imgLv","height":84,"centerY":0,"centerX":0},"child":[{"type":"Label","props":{"y":23,"x":10,"width":63,"text":"lv 1","strokeColor":"#1d5f79","stroke":2,"name":"lblLv","height":31,"fontSize":24,"color":"#ffffff","align":"center"}}]},{"type":"Button","props":{"y":0,"x":0,"width":149,"stateNum":2,"skin":"comp/btn_shengji.png","name":"butUp","height":138}}]}]};
		return butLevelUI;
	})(View);