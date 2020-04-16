let dataurl="";
var time;
var  quesdata;
const widthbase = window.innerWidth / 600;
const heightbase = window.innerHeight / 1100;
var text;
var a1,a2,a3,a4;
var grapphics,content;
//问答页面
export default class Ask extends Phaser.Scene {
	constructor() {
		super({
		    key:"Ask"
			})
		}
	preload() {
		$.ajax({
			type:"GET",
			url:dataurl+"/user/asktime",
			data:{},
			async:false,
			dataType: "json",
			success:function(data)
			{
				time=data.data.number;
				
			}
		})
		this.load.image('ques','./assets/ask/ques.png');
		this.load.image('askbg','./assets/ask/askbg.png');
		this.load.image('back', './assets/png/back.png');
		this.load.image('ans', './assets/ask/ans.png');
		this.load.image('talk','./assets/ask/talk.png')
	}
	create() {
		var askbg = this.add.image(0,0, 'askbg').setOrigin(0);
		askbg.setScale(widthbase, heightbase);
		 //回归标签
        var back = this.add.image(40*widthbase, 15*heightbase, 'back').setOrigin(0);
		back.setInteractive().on('pointerdown',this.toPet,this);
		back.setScale(widthbase, heightbase);

		if(time>0){//当剩余次数不为零的时候显示问答页面
		
		var ques = this.add.image(widthbase*70,heightbase*100,'ques').setOrigin(0);
		ques.setScale(widthbase, heightbase);

		a1=this.add.image(widthbase*50,heightbase*500,'ans').setOrigin(0).setScale(widthbase, heightbase);
		a1.setInteractive().on('pointerdown',this.choose1,this);
		a2=this.add.image(widthbase*50,heightbase*650,'ans').setOrigin(0).setScale(widthbase, heightbase);
		a2.setInteractive().on('pointerdown',this.choose2,this);
		a3=this.add.image(widthbase*50,heightbase*800,'ans').setOrigin(0).setScale(widthbase, heightbase);
		a3.setInteractive().on('pointerdown',this.choose3,this);
		a4=this.add.image(widthbase*50,heightbase*950,'ans').setOrigin(0).setScale(widthbase, heightbase);
		a4.setInteractive().on('pointerdown',this.choose4,this);
		grapphics=this.add.image(0,heightbase*1000,'askbg').setOrigin(0).setScale(widthbase, heightbase).setAlpha(0.01).setInteractive();
		$.ajax({
			type:"GET",
			url:dataurl+"/user/AskQuestion",
			data:{},
			async:false,
			dataType: "json",
			success:function(data)
			{
				quesdata=data.data;
				
			}
		})
		content='';//为问题存放地方
		for(var i=0;i<quesdata.question.length;i++)
		{
			var t=parseInt(ques.width/50);
			console.log(t);
			content+=quesdata.question[i];
			if(i%t==0&&i!=0)
			{
				content+='\n';
			}
		}
		var Q=this.add.text(ques.x+10,ques.y+40,content,{fontSize:40*widthbase,wordWrap:{width:ques.width*widthbase}}).setOrigin(0);
		
		var t1=this.add.text(widthbase*100,heightbase*550,quesdata.answer1,{fontSize:35*widthbase,color:0x2F4F4F}).setOrigin(0);
		var t2=this.add.text(widthbase*100,heightbase*700,quesdata.answer2,{fontSize:35*widthbase,color:0x2F4F4F}).setOrigin(0);
		var t3=this.add.text(widthbase*100,heightbase*850,quesdata.answer3,{fontSize:35*widthbase,color:0x2F4F4F}).setOrigin(0);
		var t4=this.add.text(widthbase*100,heightbase*1000,quesdata.answer4,{fontSize:35*widthbase,color:0x2F4F4F}).setOrigin(0);
		}

		else
		{
			var ques = this.add.image(widthbase*70,heightbase*300,'ques').setOrigin(0);
			ques.setScale(widthbase, heightbase);
			this.add.text(widthbase*100,heightbase*420,"今天您的回答次数用完啦！",{fontSize:35*widthbase});
		}

	}
	choose1(){
		grapphics.destroy();
		var talk=this.add.image(window.innerWidth/6,window.innerHeight/8,'talk').setOrigin(0).setScale(widthbase*1.2, heightbase*1.2);
		if(quesdata.trueans==1)
		{
			text=this.add.text(window.innerWidth/5.5,window.innerHeight/6,"恭喜您回答正确！\n\n已为您奖励碳积分哦！",{fontSize:1.2*talk.width/10*widthbase,color:0xffffff});
			this.time.addEvent({
				delay:3500,
				callback:function(){talk.destroy();text.destroy();this.push1()},
				callbackScope: this,
                loop: false
			})
			
			grapphics=this.add.image(0,heightbase*450,'askbg').setOrigin(0).setScale(widthbase, heightbase).setAlpha(0.01).setInteractive();
		}
		else{
			text=this.add.text(window.innerWidth/5,window.innerHeight/6,"很抱歉回答错误\n\n多去学习吧",{fontSize:1.2*talk.width/10*widthbase,color:0xffffff});
		    this.time.addEvent({
				delay:3500,
				callback:function(){talk.destroy();text.destroy();this.push2();},
				callbackScope: this,
                loop: false
			})
			grapphics=this.add.image(0,heightbase*450,'askbg').setOrigin(0).setScale(widthbase, heightbase).setAlpha(0.01).setInteractive();
		
		}
	}
	choose2(){
		grapphics.destroy();
		var talk=this.add.image(window.innerWidth/6,window.innerHeight/8,'talk').setOrigin(0).setScale(widthbase, heightbase);
		if(quesdata.trueans==2)
		{
			text=this.add.text(window.innerWidth/5,window.innerHeight/6,"恭喜您回答正确！\n\n已为您奖励碳积分哦！",{fontSize:1.2*talk.width/10*widthbase,color:0xffffff});
		    this.time.addEvent({
				delay:3500,
				callback:function(){talk.destroy();text.destroy();this.push1();},
				callbackScope: this,
                loop: false
			})
			grapphics=this.add.image(0,heightbase*450,'askbg').setOrigin(0).setScale(widthbase, heightbase).setAlpha(0.01).setInteractive();
		
		}
		else{
			text=this.add.text(window.innerWidth/5,window.innerHeight/6,"很抱歉回答错误\n\n多去学习吧",{fontSize:1.2*talk.width/10*widthbase,color:0xffffff});
		    this.time.addEvent({
				delay:3500,
				callback:function(){talk.destroy();text.destroy();this.push2();},
				callbackScope: this,
                loop: false
			})
			grapphics=this.add.image(0,heightbase*450,'askbg').setOrigin(0).setScale(widthbase, heightbase).setAlpha(0.01).setInteractive();
		
		}
	}
	choose3(){
		grapphics.destroy();
		var talk=this.add.image(window.innerWidth/6,window.innerHeight/8,'talk').setOrigin(0).setScale(widthbase, heightbase);
		if(quesdata.trueans==3)
		{
			text=this.add.text(window.innerWidth/5,window.innerHeight/6,"恭喜您回答正确！\n\n已为您奖励碳积分哦！",{fontSize:1.2*talk.width/10*widthbase,color:0xffffff});
			
			this.time.addEvent({
				delay:3500,
				callback:function(){talk.destroy();text.destroy();this.push1();},
				callbackScope: this,
                loop: false
			})
			grapphics=this.add.image(0,heightbase*450,'askbg').setOrigin(0).setScale(widthbase, heightbase).setAlpha(0.01).setInteractive();
		
		}
		else{
			grapphics.destroy();
			text=this.add.text(window.innerWidth/5,window.innerHeight/6,"很抱歉回答错误\n\n多去学习吧",{fontSize:1.2*talk.width/10*widthbase,color:0xffffff});
		    this.time.addEvent({
				delay:3500,
				callback:function(){talk.destroy();text.destroy();this.push2();},
				callbackScope: this,
                loop: false
			})
			grapphics=this.add.image(0,heightbase*450,'askbg').setOrigin(0).setScale(widthbase, heightbase).setAlpha(0.01).setInteractive();
		
		}
	}
	choose4(){
		grapphics.destroy();
		var talk=this.add.image(window.innerWidth/6,window.innerHeight/8,'talk').setOrigin(0).setScale(widthbase, heightbase);
		if(quesdata.trueans==4)
		{
			text=this.add.text(window.innerWidth/5,window.innerHeight/6,"恭喜您回答正确！\n\n已为您奖励碳积分哦！",{fontSize:1.2*talk.width/10*widthbase,color:0xffffff});
		    this.time.addEvent({
				delay:3500,
				callback:function(){talk.destroy();text.destroy();this.push1();},
				callbackScope: this,
                loop: false
			})
			grapphics=this.add.image(0,heightbase*450,'askbg').setOrigin(0).setScale(widthbase, heightbase).setAlpha(0.01).setInteractive();
		
		}
		else{
			text=this.add.text(window.innerWidth/5,window.innerHeight/6,"很抱歉回答错误\n\n多去学习吧",{fontSize:1.2*talk.width/10*widthbase,color:0xffffff});
		    this.time.addEvent({
				delay:3500,
				callback:function(){talk.destroy();text.destroy();this.push2();},
				callbackScope: this,
                loop: false
			})
			grapphics=this.add.image(0,heightbase*450,'askbg').setOrigin(0).setScale(widthbase, heightbase).setAlpha(0.01).setInteractive();
		
		}
	}
	toPet() {this.scene.start('Pet'); }
	push1()
	{
		var choose ={
			"data":{"ifright":"true"}
		}
		$.ajax({
			type:"GET",//改post
			url:dataurl+"user/chosen",
			data:JSON.stringify(choose),
			async:false,
			dataType: "json",
			success:function(data)
			{
			},
			error:function()
			{
				console.log("提交选择错误");
			}
			
		})
	}
	push2()
	{
		var choose ={
			"data":{"ifright":"false"}
		}
		$.ajax({
			type:"GET",//改post
			url:dataurl+"user/chosen",
			data:JSON.stringify(choose),
			async:false,
			dataType: "json",
			success:function(data)
			{
			},
			error:function()
			{
				console.log("提交选择错误");
			}
		})
	}
	
}