let dataurl="";
//展示的饲料兑换页面
//文字数据
var co2data=null;
var fooddata;
//字段
var jindutiao =null;
var totalnum=null;
var co2level=null;
var atnum =null;
var foodnum=null;

export default class Food extends Phaser.Scene {
	
		constructor() {
		super({
		    key:"Food"
			})
		}
	preload() {
		//加载数据  对碳积分以及心情值进行显示
		this.GetLogin();
		this.GetFood();
		//图片
		this.load.image('foodbg', './assets/png/foodbg.png');
		this.load.image('back', './assets/png/back.png');
		this.load.image('cnum', './assets/png/cnum.png');
		this.load.image('cpic', './assets/png/cpic.png');
		this.load.image('gz', './assets/png/gz.png');

		this.load.image('gzfill','./assets/png/gzfill.png');
	}
	create() {
		//基础设置
		var widthbase = window.innerWidth / 600;
		var heightbase = window.innerHeight / 1100;
		//图片资源
		var foodbg = this.add.image(0,0, 'foodbg').setOrigin(0);
		foodbg.setScale(widthbase, heightbase);

		var back = this.add.image(40*widthbase, 15*heightbase, 'back').setOrigin(0);
		back.setInteractive().on('pointerdown',this.toPet,this);
		back.setScale(widthbase, heightbase);

		var cpic = this.add.image(0, 90*heightbase, 'cpic').setOrigin(0);
		cpic.setScale(widthbase, heightbase);

		var cnum = this.add.image(208*widthbase,154*heightbase, 'cnum').setOrigin(0);
		cnum.setScale(widthbase*co2data.totalnum/co2data.levelneed, heightbase);

		if(fooddata.number!=100){
			var gz = this.add.image(5, 350*heightbase, 'gz').setOrigin(0);
			gz.setScale(widthbase, heightbase);
			foodnum = this.add.text(widthbase * 240, heightbase * 420	, '瓜子采购度：',{
				fontSize: heightbase * 40,
				fill: '#2F4F4F',
				fontFamily:'"迷你简卡通"'
			});
			this.add.text(widthbase * 270, heightbase * 488	, '多积累碳积分,瓜子的'+'\n'+'采购速度也会更快哦',{
				fontSize: heightbase * 30,
				fill: '#2F4F4F',
				fontFamily:'"楷体"'
			});
		}
		else{
			var gzfill = this.add.image(5, 350*heightbase, 'gzfill').setOrigin(0);
			gzfill.setScale(widthbase, heightbase);
			gzfill.setInteractive().on('pointerdown',this.upfood,this);
			foodnum = this.add.text(widthbase * 240, heightbase * 420	, '瓜子采购度：',{
				fontSize: heightbase * 40,
				fill: '#2F4F4F',
				fontFamily:'"迷你简卡通"'
			});
			
			this.add.text(widthbase * 270, heightbase * 488	, '已经采购好啦！\n赶快收取吧',{
				fontSize: heightbase * 30,
				fill: '#2F4F4F',
				fontFamily:'"楷体"'
			});
		}
		
		//文字资源
		co2level = this.add.text(widthbase * 220, heightbase * 100	, 'lv.',{
			fontSize: heightbase * 40,
			fill: '#2F4F4F',
			fontFamily:'"迷你简卡通"'
		});
		jindutiao = this.add.text(widthbase * 210, heightbase *155	, '',{
			fontSize: heightbase * 22,
			fill: '#2F4F4F',
			fontFamily:'"迷你简卡通"'
		});
		totalnum = this.add.text(widthbase * 210, heightbase * 200	, '碳积分积累值：',{
			fontSize: heightbase * 35,
			fill: '#2F4F4F',
			fontFamily:'"迷你简卡通"'
		});
		atnum = this.add.text(widthbase * 210, heightbase * 250	, '剩余碳积分：',{
			fontSize: heightbase * 35,
			fill: '#2F4F4F',
			fontFamily:'"迷你简卡通"'
		});
		
	}
	//获取数据
	GetLogin(){
		$.ajax({
			type:"GET",
			url:dataurl+"/user/co2",
			data:{},
			async:false,
			dataType: "json",
			success:function(data)
			{
				co2data=data.data;
			}
		})
	}
	GetFood()
	{
		$.ajax({
			type:"GET",
			url:dataurl+"/user/Foodsituation",
			data:{},
			async:false,
			dataType: "json",
			success:function(data)
			{
				fooddata=data.data;
			}
		})
	}
	update(){
		co2level.text ="lv."+co2data.level+"罐";
		jindutiao.text=co2data.totalnum+"/"+co2data.levelneed;
		totalnum.text ="碳积分积累值："+co2data.totalnum;
		atnum.text ="剩余碳积分："+co2data.atnum;
		foodnum.text =fooddata.name+"采购中："+fooddata.number;
	}
	toPet() {

		this.scene.start('Pet');
	}
	upfood()
	{
		var choose={
			"data":{
				"name":"瓜子",
				"number":1
			}
		}
		$.ajax({
			type:"GET",//测试的时候改成post
			url:dataurl+"/user/changefood",
			data:JSON.stringify(choose),
			async:false,
			dataType: "json",
			success:function(data)
			{
			},
			error:function(data)
			{
				alert(data.msg);
			}
			
		})
	}
}