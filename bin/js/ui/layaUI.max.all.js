var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var homeUI=(function(_super){
		function homeUI(){
			

			homeUI.__super.call(this);
		}

		CLASS$(homeUI,'ui.homeUI',_super);
		var __proto__=homeUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(homeUI.uiView);

		}

		homeUI.uiView={"type":"View","props":{"width":750,"height":1334,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/bj.jpg"}},{"type":"Image","props":{"y":315,"x":0,"skin":"comp/bj.png"}},{"type":"Image","props":{"y":640,"x":508,"skin":"comp/binying.png"}},{"type":"Image","props":{"y":422,"x":251,"skin":"comp/chengqiang.png"}},{"type":"Image","props":{"y":872,"x":171,"skin":"comp/liangcang.png"}},{"type":"Image","props":{"y":598,"x":55,"skin":"comp/nongtian.png"}},{"type":"Box","props":{"y":1,"x":13},"child":[{"type":"Image","props":{"skin":"comp/txdi.png"}},{"type":"Label","props":{"y":29,"x":118,"width":158,"text":"玩家名字","strokeColor":"#1d5f79","stroke":2,"height":24,"fontSize":24,"color":"#ffffff"}},{"type":"ProgressBar","props":{"y":61,"x":119,"skin":"comp/progress_02.png"}},{"type":"Label","props":{"y":65,"x":128,"width":132,"text":"200/500","strokeColor":"#1d5f79","stroke":2,"height":23,"fontSize":20,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":29,"x":309,"skin":"comp/zt.png"}},{"type":"Image","props":{"y":20,"x":274,"skin":"comp/icon01.png"}},{"type":"Image","props":{"y":29,"x":526,"skin":"comp/zt.png"}},{"type":"Image","props":{"y":22,"x":515,"skin":"comp/icon02.png"}},{"type":"Image","props":{"y":4,"x":4,"width":110,"height":110}},{"type":"Image","props":{"y":-1,"x":-13,"skin":"comp/txdi2.png"}},{"type":"Button","props":{"y":4,"x":425,"stateNum":2,"skin":"comp/btn_jia.png"}},{"type":"Button","props":{"y":4,"x":643,"stateNum":2,"skin":"comp/btn_jia.png"}},{"type":"FontClip","props":{"y":44,"x":349,"value":"2500","skin":"comp/font1.png","sheet":"0123456789"}},{"type":"FontClip","props":{"y":44,"x":581,"value":"2500","skin":"comp/font1.png","sheet":"0123456789"}}]},{"type":"Button","props":{"y":131,"x":20,"stateNum":2,"skin":"comp/btn_xunzhang.png"}},{"type":"Label","props":{"y":193,"x":26,"width":93,"text":"2500","strokeColor":"#1d5f79","stroke":3,"height":31,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":253,"x":20,"stateNum":2,"skin":"comp/btn_paihang.png"}},{"type":"Image","props":{"y":611,"x":41,"skin":"comp/lv_di.png"}},{"type":"Label","props":{"y":635,"x":51,"width":63,"text":"lv 1","strokeColor":"#1d5f79","stroke":2,"height":31,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":886,"x":144,"skin":"comp/lv_di.png"}},{"type":"Label","props":{"y":910,"x":154,"width":63,"text":"lv 1","strokeColor":"#1d5f79","stroke":2,"height":31,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":696,"x":616,"skin":"comp/lv_di.png"}},{"type":"Label","props":{"y":720,"x":626,"width":63,"text":"lv 1","strokeColor":"#1d5f79","stroke":2,"height":31,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":412,"x":635,"skin":"comp/lv_di.png"}},{"type":"Label","props":{"y":436,"x":645,"width":63,"text":"lv 1","strokeColor":"#1d5f79","stroke":2,"height":31,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":895,"x":438,"stateNum":2,"skin":"comp/btn_chushou.png"}},{"type":"Label","props":{"y":420,"x":300,"width":299,"text":"防御值：25000","strokeColor":"#1d5f79","stroke":2,"height":31,"fontSize":26,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":631,"x":133,"width":299,"text":"产能：25000/分钟","strokeColor":"#1d5f79","stroke":2,"height":31,"fontSize":26,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":914,"x":235,"width":299,"text":"库存：2250/5000","strokeColor":"#1d5f79","stroke":2,"height":31,"fontSize":26,"color":"#ffffff","align":"left"}},{"type":"Button","props":{"y":1045,"x":286,"stateNum":2,"skin":"comp/btn_nongmin.png"}},{"type":"Label","props":{"y":1208,"x":205,"width":350,"text":"当前空闲农民25个","strokeColor":"#1d5f79","stroke":2,"height":31,"fontSize":28,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":1145,"x":19,"stateNum":2,"skin":"comp/btn_zhanzheng.png"}},{"type":"ProgressBar","props":{"y":1001,"x":210,"skin":"comp/progress_01.png"}},{"type":"Label","props":{"y":1004,"x":220,"width":299,"text":"2500/5000","strokeColor":"#1d5f79","stroke":2,"height":31,"fontSize":26,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":381,"x":601,"stateNum":2,"skin":"comp/btn_shengji.png"}},{"type":"Button","props":{"y":582,"x":5,"stateNum":2,"skin":"comp/btn_shengji.png"}},{"type":"Button","props":{"y":667,"x":582,"stateNum":2,"skin":"comp/btn_shengji.png"}},{"type":"Button","props":{"y":856,"x":109,"stateNum":2,"skin":"comp/btn_shengji.png"}}]};
		return homeUI;
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

		loadUI.uiView={"type":"View","props":{"width":750,"height":1334,"centerY":0,"centerX":0},"child":[{"type":"ProgressBar","props":{"width":500,"var":"probar","value":0,"skin":"load/progress_01.png","height":39,"centerY":200,"centerX":0}}]};
		return loadUI;
	})(View);