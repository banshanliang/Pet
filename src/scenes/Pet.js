let dataurl="";
let widthbase = window.innerWidth / 600;
let heightbase = window.innerHeight / 1100;
var pet=null;//主人公
var logindata=null;
var flag=0;
//主页面
export default class Pet extends Phaser.Scene {
	constructor() {
		super({
			key:"Pet"
			})
	}
	preload() {
		//初始化文字数据
		this.data=null;
		this.name=null;//名字
		this.grow=null;//成长值
		this.health=null;//心情、健康值
		this.load.image('back', './assets/png/back.png');
		 //加载食物
		 this.load.image('瓜子','./assets/food/瓜子.png');
		 this.load.image('花生','./assets/food/花生.png');
		 this.load.image('苹果','./assets/food/苹果.png');
		//加载图像，参数为创建元件时所使用的Key值，文件路径
		this.load.image('background', './assets/png/background.png');
		this.load.image('pet', './assets/png/pet1.png');
		this.load.image('food', './assets/png/food.png');
		this.load.image('store', './assets/png/store.png');
		this.load.image('ask', './assets/png/ask.png');
		this.load.image('tx', './assets/png/txico.png');
		this.load.image('happy', './assets/png/loveico.png');
		this.load.image('grow', './assets/png/growico.png');
		this.load.image('talk', './assets/png/talk.png');
		this.load.image('redbag1', './assets/png/redbag.png');
		this.load.image('redbag2', './assets/png/redbag2.png');
		this.load.image('bag', './assets/png/bag.png');
		this.load.image('showredbag','./assets/png/showredbag.png');
		this.load.image('count','./assets/png/count.png');
		this.load.image('penico','./assets/png/penico.png')
		//地铁卷
		this.load.image('2','./assets/ud/ud2r.png');
		this.load.image('3','./assets/ud/ud3r.png');
		this.load.image('4','./assets/ud/ud4r.png');
		//商品卷
		this.load.image('daily5','./assets/th/daily5.png');
		this.load.image('daily15','./assets/th/daily15.png');
		this.load.image('daily20','./assets/th/daily20.png');
		this.load.image('drunk5','./assets/th/drunk5.png');
		this.load.image('drunk15','./assets/th/drunk15.png');
		this.load.image('drunk20','./assets/th/drunk20.png');
		this.load.image('snack5','./assets/th/snack5.png');
		this.load.image('snack15','./assets/th/snack15.png');
		this.load.image('snack20','./assets/th/snack20.png');
		//现金抵用券
		this.load.image('str5','./assets/st/st5r.png');
		this.load.image('str10','./assets/st/st10r.png');
		this.load.image('str15','./assets/st/st15r.png');
		this.load.image('str20','./assets/st/st20r.png');
		this.load.html('nameform', './src/scenes/loginform.html');
	}
	create() {
		var element ;
		this.GetLogin();

		var bg = this.add.image(0,0, 'background').setOrigin(0);
		bg.setScale(widthbase, heightbase);
		//点击宠物的话会弹出喂食的对话框
		pet = this.add.sprite(200 * widthbase, 530 * heightbase, 'pet').setOrigin(0);
		pet.setInteractive().on('pointerdown',this.feed,this);
		pet.setScale(widthbase, heightbase);

		var food =this.add.sprite(10 * widthbase, 900 * heightbase, 'food').setOrigin(0);
		food.setInteractive().on('pointerdown',this.toFood,this);
		food.setScale(widthbase, heightbase);

		var store = this.add.sprite(170 * widthbase, 900 * heightbase, 'store').setOrigin(0); 
		store.setInteractive().on('pointerdown',this.toStore,this);
		store.setScale(widthbase, heightbase);

		var ask = this.add.sprite(410 * widthbase, 900 * heightbase, 'ask').setOrigin(0);
		ask.setInteractive().on('pointerdown',this.toAsk,this);
		ask.setScale(widthbase, heightbase);

		var tx = this.add.sprite(10* widthbase , 20 * heightbase, 'tx').setOrigin(0);
		tx.setInteractive().on('pointerdown',this.tochoose,this);
		tx.setScale(widthbase, heightbase);

		var grow = this.add.sprite(30* widthbase , 130 * heightbase, 'grow').setOrigin(0);
		grow.setScale(widthbase, heightbase);

		var bag = this.add.sprite(440* widthbase , 30 * heightbase, 'bag').setOrigin(0);
		bag.setScale(widthbase, heightbase);
		bag.setInteractive().on('pointerdown',this.toBag,this);


		var happy = this.add.sprite(10* widthbase , 200 * heightbase, 'happy').setOrigin(0);
		happy.setScale(widthbase, heightbase);
		//文字资源
		this.name = this.add.text(widthbase * 120, heightbase * 50	, '',{
			fontSize: heightbase * 40,
			fill: '#2F4F4F',
			fontFamily:'"迷你简卡通"'
		});
		this.grow=this.add.text(widthbase * 110, heightbase * 133	, '成长值：',{
			fontSize: heightbase * 40,
			fill: '#2F4F4F',
			fontFamily:'"迷你简卡通"'
		});
		this.health = this.add.text(widthbase * 110, heightbase * 210, '心情：', {
			fontSize: heightbase * 40,
			fill: '#2F4F4F',
			fontFamily:'"迷你简卡通"'
		});
		

		this.health.text="心情："+logindata.happy;
		this.name.text=logindata.name;
		var pen=this.add.sprite((widthbase * 120+logindata.name.length*50)*widthbase ,heightbase * 52,'penico').setOrigin(0).setScale(widthbase, heightbase);;
		pen.setInteractive().on('pointerdown',()=>{
			if(flag==0){
			//输入更改的名字
			flag=1;
			var element = this.add.dom(window.innerWidth/10, 0).createFromCache('nameform').setOrigin(0);
			element.addListener('click');
			element.on('click', function (event) {
				if (event.target.name === 'loginButton')
                {
					var inputUsername = this.getChildByName('username');
					if (inputUsername.value !== ''){
						this.removeListener('click');
						var choose={"data":{"changename":inputUsername.value}}
						$.ajax({
							type:"GET",//更改为post
							url:dataurl+"/user/changename",
							data:JSON.stringify(choose),
							async:false,
							dataType: "json",
							success:(data)=>
							{
								console.log("提交宠物名成功");
							},
							error:(data)=>{
								console.log("提交宠物名失败");
							}
						})
						element.destroy();
					}
				}
				else if(event.target.name === 'cancleButton'){
					element.destroy();
					flag=0;
				}
			})
		  }
		},this);
		this.grow.text="成长值："+logindata.grow;
		this.ShowBag();
		
	}
	//获取数据
	GetLogin(){
		$.ajax({
			type:"GET",
			url:dataurl+"/user/login",
			data:{},
			async:false,
			dataType: "json",
			success:function(data)
			{
				logindata=data.data;
			}
		})
	}
	ShowBag()
	{
		var bagnum;
		$.ajax({
			type:"GET",
			url:dataurl+"/user/RedbagNum",
			data:{},
			async:false,
			dataType: "json",
			success:function(data)
			{
				bagnum=data.data.number;
			}
		})
		for(var i=0;i<bagnum;i++)
		{
			
			if(i%2==0)
			{
			this.add.sprite((120+90*i)*widthbase,window.innerHeight/9*6,'redbag1').setScale(widthbase, heightbase).setOrigin(0).setInteractive().on('pointerdown',this.showredbag,this);
			}
			else{
			this.add.sprite((120+90*i)*widthbase,window.innerHeight/9*6,'redbag2').setScale(widthbase, heightbase).setOrigin(0).setInteractive().on('pointerdown',this.showredbag,this);
		}
	}
	}
	showredbag()
	{
		var type;
		var rbdata;
		$.ajax({
			type:"GET",
			url:dataurl+"/user/RedbagType",
			data:{},
			async:false,
			dataType: "json",
			success:function(data)
			{
				type=data.data.type;
			}
		})
		if(type=="ud")
		{
			$.ajax({
				type:"GET",
				url:dataurl+"/user/AddUndergroundBag",
				data:{},
				async:false,
				dataType: "json",
				success:function(data)
				{
					rbdata=data.data;
				}
			})
		}
		else if(type=="th")
		{
			$.ajax({
				type:"GET",
				url:dataurl+"/user/AddStorethingBag",
				data:{},
				async:false,
				dataType: "json",
				success:function(data)
				{
					rbdata=data.data;
				}
			})
		}
		else if(type=="st")
		{
			$.ajax({
				type:"GET",
				url:dataurl+"/user/AddBuyRedbag",
				data:{},
				async:false,
				dataType: "json",
				success:function(data)
				{
					rbdata=data.data;
				}
			})
		}
		this.mask=this.add.graphics().fillStyle(0x00000,0.4).fillRect(0, 0,window.innerWidth,window.innerHeight);
		this.rb=this.add.sprite(window.innerWidth/2+10,window.innerHeight/2,'showredbag').setScale(widthbase, heightbase).setInteractive();
		this.pic=this.add.sprite(window.innerWidth/20*9,window.innerHeight/10*4,rbdata.name).setScale(widthbase, heightbase);
		this.intro=this.add.text(window.innerWidth/20*6,this.rb.y,"恭喜您得到优惠券！",{fontSize:30*widthbase}).setOrigin(0);
		this.count=this.add.sprite(window.innerWidth/40*19,window.innerHeight/10*6,'count').setScale(widthbase, heightbase).setInteractive().on('pointerdown',this.close,this);
		
	}
	close()
	{
		this.mask.destroy();
		this.rb.destroy();
		this.pic.destroy();
		this.intro.destroy();
		this.count.destroy();
		
	}
	feed(){
		var talk = this.add.sprite(pet.x/2, pet.y*7/11, 'talk').setOrigin(0);
		talk.setScale(widthbase, heightbase);
		//当需要喂食的时候
		if(logindata.happy!=100)
		{
			var texts1 = this.add.text(talk.x*1.15, talk.y*1.05, '有点饿啦，主'+'\n'+'人给我吃东西'+'\n'+'嘛？'+"(点击喂食)", {
				fontSize: heightbase * 35,
				fill: '#2F4F4F',
				fontFamily:'"迷你简卡通"'
			});
			texts1.setInteractive().on('pointerdown',this.feedaction,this);
			
			this.time.addEvent({
				delay:3500,
				callback:function(){talk.destroy();texts1.destroy();},
				callbackScope: this,
                loop: false
		    })
		}
		else{
			var texts2 = this.add.text(talk.x*1.4, talk.y*1.1, '现在好饱啊，'+'\n'+'已经吃不下啦！', {
				fontSize: heightbase * 35,
				fill: '#2F4F4F',
				fontFamily:'"迷你简卡通"'
			});
			this.time.addEvent({
				delay:3500,
				callback:function(){talk.destroy();texts2.destroy();},
				callbackScope: this,
                loop: false
		    })
		}
	}
	feedaction()
	{
		var graphics=this.add.graphics().fillStyle(0xFAFAD2).fillRect(0,800*heightbase,window.innerWidth,window.innerHeight-800*heightbase);
		graphics.setInteractive();
		var bagdata;
		let time=1;
		var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);
		var pic =new  Array();//初始化的时候摧毁原有图案与文字再添加数据
           var intro =new Array();//记录文字
           var h1 =new Array();//记录宽度
           var h2=new Array();
		   var hmax;//记录最高宽度
		this.data=$.ajax({
			type:"GET",
			url:dataurl+"/user/Bagfood",
			data:{},
			async:false,
			dataType: "json",
			success:function(data)
			{
				bagdata=data.data;
			}
		})
		    var mw=window.innerWidth;
            var contend='';
            for(var i=0;i<bagdata.length;i++)
            {
                var show =this.add.sprite(20+250*widthbase*(i),870*heightbase,bagdata[i].name).setOrigin(0).setScale(widthbase, heightbase);
				
				contend="数量："+bagdata[i].number;
                var txt =this.add.text(20+250*widthbase*(i),1050*heightbase,contend,{fontSize:35*widthbase, fill : "#CD853F" });
                pic.push(show);
                intro.push(txt);
                txt.setMask(mask);
                show.setMask(mask);
                h1.push(show.x);
                h2.push(txt.x);
                if(i==bagdata.length-1)
                hmax=show.x+show.width;
            
		   }
            var zone = this.add.zone(0,800*heightbase,window.innerWidth,window.innerHeight-800*heightbase).setOrigin(0).setInteractive();
			var flag;//当在滑动的时候没法进行选择
            zone.on('pointermove', function (pointer) {
                if (pointer.isDown)
                {
					flag=0;
                    if(hmax>mw){
                    for(var i=0;i<pic.length;i++)
                    {
                        pic[i].x+=(pointer.velocity.x / 10);
                        pic[i].x = Phaser.Math.Clamp(pic[i].x, h1[i]-hmax+mw-90, h1[i]);
                        intro[i].x+=(pointer.velocity.x / 10);
                        intro[i].x = Phaser.Math.Clamp(pic[i].x, h1[i]-hmax+mw-90, h1[i]);
                    }
                }
				}
				else
				flag=1;
			});
			zone.on('pointerup',function(pointer){//滑动页面展示出物品
				if(flag!=0){
				for(var i=0;i<pic.length;i++)
				{
					if(pic[i].x<pointer.x && pointer.x<pic[i].x+pic[i].width*widthbase)
					{
						var choose ={
							"data":{"name":pic[i].texture.key,"number":1}
						}
						var foodok;
						$.ajax({
							type:"GET",//此处在测试接口的时候需要改成post
							url:dataurl+"/user/usefood",
							data:JSON.stringify(choose),
							async:false,
							dataType: "json",
							success:function(data)
							{
								foodok=data;
								alert("ok");
							},
							error:function(data)
							{
								foodok=data;
								console.log(foodok);
								alert("false");
							}
						})
						var talk = this.add.sprite(pet.x/2, pet.y*7/11, 'talk').setOrigin(0);
						talk.setScale(widthbase, heightbase);
						
						if(foodok.state==1){//当状态码请求为1即成功投喂的时候
						var texts = this.add.text(talk.x*1.15, talk.y*1.05, '谢谢主人！'+'\n'+'吃的好开心啊', {
							fontSize: heightbase * 35,
							fill: '#2F4F4F',
							fontFamily:'"迷你简卡通"'
						});
					   }
					   else{
						var texts = this.add.text(talk.x*1.15, talk.y*1.05, foodok.msg, {
							fontSize: heightbase * 35,
							fill: '#2F4F4F',
							fontFamily:'"迷你简卡通"'
						});
					   }
						this.time.addEvent({
							delay:3500,
							callback:function(){talk.destroy();texts.destroy();},
							callbackScope: this,
							loop: false
						})
					}
				}
			}
			},this)
			
		
		var back=this.add.image(40*widthbase, 820*heightbase, 'back').setOrigin(0);
		back.setInteractive().on('pointerdown',function(){
			graphics.destroy();
			back.destroy();
			for(var i=0;i<pic.length;i++)
			{
				pic[i].destroy();
				intro[i].destroy();
			}
			zone.destroy();
		},this);
		back.setScale(widthbase, heightbase);
	}
	toFood() {this.scene.start('Food');}
	toStore() {	this.scene.launch('Store');}
	toAsk() {this.scene.start('Ask');}
	toBag() {this.scene.start('Bag');}
	tochoose(){this.scene.start('Choose');}
}
