let dataurl="";
var selected;
var text1,text2,text3,text4;
var pic;
var intro;
let athigh;
let bagdata;
let contend;

const widthbase = window.innerWidth / 600;
const heightbase = window.innerHeight / 1100;

//预载页面
export default class Bag extends Phaser.Scene {
	constructor() {
		super({
		    key:"Bag"
			})
		}
	 preload() {
    this.data=null;
    this.load.image('back', './assets/png/back.png');
    this.load.image('bagbg', './assets/png/bagbg.png');
    //加载食物
    this.load.image('瓜子','./assets/food/瓜子.png');
    this.load.image('花生','./assets/food/花生.png');
    this.load.image('苹果','./assets/food/苹果.png');
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
	}
	create() {
        this.editGroup = this.add.group(); //editGroup用于存放面板的所有元素
        //基础设置
		const widthbase = window.innerWidth / 600;
        const heightbase = window.innerHeight / 1100;
        //图片资源
        var bagbg = this.add.image(0,0, 'bagbg').setOrigin(0);
        bagbg.setScale(widthbase, heightbase);
        
        this.createEditContent ();
        
        
    }
    createEditContent (){
        
       
        // //tab内容背景
        var editContent = this.add.graphics(); 
        editContent.fillStyle(0xffffff,1);
        editContent.fillRect(0,0,window.innerWidth, this.innerHeight);
        editContent.mask= new Phaser.Display.Masks.BitmapMask(this, headmask);
    
        this.editGroup.add(editContent);
        this.editContent = editContent;
        //创建物品
        this.createPostContent();
         //顶部遮罩
        var headmask = this.add.graphics();    
        headmask.fillStyle(0xFFF8DC,1);
        headmask.fillRect(0,0,window.innerWidth, window.innerHeight/12);
        var r1 = this.add.line(0, window.innerHeight/12, 0, 0, window.innerWidth*2, 0, 0x6666ff);//横线分割回归页面与显示层
        //回归标签
        var back = this.add.image(40*widthbase, 15*heightbase, 'back').setOrigin(0);
		back.setInteractive().on('pointerdown',this.toPet,this);
        back.setScale(widthbase, heightbase);
       
        
        this.addScrollHander(1);
    }
    createPostContent()
    {
        const postContent =this.add.group(this.editContent);
        //左侧背景
        const leftTab = this.add.graphics();
        const leftTabGroup = this.add.group(leftTab)
        leftTab.fillStyle(0xFFFAF0);
        leftTab.fillRect(0,0,window.innerWidth/5 , window.innerHeight);
        //左侧选中背景
        selected = this.add.graphics(0,0);
        selected.fillStyle(0xffffff);
        selected.fillRect(0, window.innerHeight/12,window.innerWidth/5,window.innerHeight/9);
        //左侧文字
        text1 = this.add.text(window.innerWidth/100 , window.innerHeight/9, "饲料" , {fontSize:35*widthbase , fill : "#a55344" , align : "center"});
        text1.setInteractive().on('pointerdown',this.searchfood,this);
        text2 = this.add.text(window.innerWidth/100, window.innerHeight/9*2, "乘车卷" , {fontSize:35*widthbase , fill : "#a55344" , align : "center"});
        text2.setInteractive().on('pointerdown',this.searchud,this);
        text3 = this.add.text(window.innerWidth/100, window.innerHeight/9*3, "优惠券" , {fontSize:35*widthbase , fill : "#a55344" , align : "center"});
        text3.setInteractive().on('pointerdown',this.searchth,this);
        text4 = this.add.text(window.innerWidth/100 , window.innerHeight/9*4, "现金卷" , {fontSize:35*widthbase , fill : "#a55344" , align : "center"});
        text4.setInteractive().on('pointerdown',this.searchst,this);
        
        
        
    }
    addScrollHander(num){

        var string;
        if(num==1){
            this.Get1();
        }
        else if(num==2){this.Get2();}
        else if(num==3){this.Get3();}
        else if(num==4){this.Get4();}

       
    }
    Get1(){
        
        var graphics = this.make.graphics();
        graphics.fillRect(window.innerWidth/5, window.innerHeight/12,window.innerWidth-window.innerWidth/5,window.innerHeight-window.innerHeight/12);
        let time=1;
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
            var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

            if(pic!=null)for(var i=0;i<pic.length;i++)pic[i].destroy();
            if(intro!=null) for(var i=0;i<pic.length;i++)intro[i].destroy();
           pic =new  Array();//初始化的时候摧毁原有图案与文字再添加数据
           intro =new Array();//记录文字
           var h1 =new Array();//记录高度
           var h2=new Array();
           var hmax;//记录最高高度
           var wh=window.innerHeight;
           contend='';
            for(var i=0;i<bagdata.length;i++)
            {
                var show =this.add.sprite(window.innerWidth/4,window.innerHeight/7*(i+1),bagdata[i].name).setOrigin(0).setScale(widthbase*0.8, heightbase*0.8);
                contend=bagdata[i].name+'\n\n'+"数量："+bagdata[i].number;
                var txt =this.add.text(310*widthbase,window.innerHeight/7*(i+1),contend,{fontSize:35*widthbase, fill : "#CD853F" });
                pic.push(show);
                intro.push(txt);
                txt.setMask(mask);
                show.setMask(mask);
                h1.push(show.y);
                h2.push(txt.y);
                if(i==bagdata.length-1)
                hmax=show.y;
            
           }
            
            var zone = this.add.zone(window.innerWidth/5, window.innerHeight/12,window.innerWidth-window.innerWidth/5,window.innerHeight-window.innerHeight/12).setOrigin(0).setInteractive();
            
            zone.on('pointermove', function (pointer) {
                if (pointer.isDown)
                {
                    if(hmax>wh){
                    for(var i=0;i<pic.length;i++)
                    {
                        pic[i].y+=(pointer.velocity.y / 10);
                        pic[i].y = Phaser.Math.Clamp(pic[i].y, h1[i]-hmax+wh-90, h1[i]);
                        intro[i].y+=(pointer.velocity.y / 10);
                        intro[i].y = Phaser.Math.Clamp(intro[i].y, h2[i]-hmax+wh-90, h2[i]);
                    }
                }
                }
            });
    }
    Get2(){
        var graphics = this.make.graphics();
        graphics.fillRect(window.innerWidth/5, window.innerHeight/12,window.innerWidth-window.innerWidth/5,window.innerHeight-window.innerHeight/12);
        let time=1;
            this.data=$.ajax({
                type:"GET",
                url:dataurl+"/user/UndergroundBag",
                data:{},
                async:false,
                dataType: "json",
                success:function(data)
                {
                    bagdata=data.data;
                }
            })
            var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

            if(pic!=null)for(var i=0;i<pic.length;i++)pic[i].destroy();
            if(intro!=null) for(var i=0;i<pic.length;i++)intro[i].destroy();
           pic =new  Array();//初始化的时候摧毁原有图案与文字再添加数据
           intro =new Array();//记录文字
           var h1 =new Array();//记录高度
           var h2=new Array();
           var hmax;//记录最高高度
           var wh=window.innerHeight;
           contend='';
            for(var i=0;i<bagdata.length;i++)
            {
                var show =this.add.sprite(window.innerWidth/4,window.innerHeight/7*(i+1),bagdata[i].howmuch).setOrigin(0).setScale(widthbase*0.8, heightbase*0.8);
                contend=bagdata[i].howmuch+'\n\n'+"数量："+bagdata[i].number;
                var txt =this.add.text(310*widthbase,window.innerHeight/7*(i+1),contend,{fontSize:35*widthbase, fill : "#CD853F" });
                pic.push(show);
                intro.push(txt);
                txt.setMask(mask);
                show.setMask(mask);
                h1.push(show.y);
                h2.push(txt.y);
                if(i==bagdata.length-1)
                hmax=show.y;
            
           }
            
            var zone = this.add.zone(window.innerWidth/5, window.innerHeight/12,window.innerWidth-window.innerWidth/5,window.innerHeight-window.innerHeight/12).setOrigin(0).setInteractive();
            
            zone.on('pointermove', function (pointer) {
                if (pointer.isDown)
                {
                    if(hmax>wh){
                    for(var i=0;i<pic.length;i++)
                    {
                        pic[i].y+=(pointer.velocity.y / 10);
                        pic[i].y = Phaser.Math.Clamp(pic[i].y, h1[i]-hmax+wh-90, h1[i]);
                        intro[i].y+=(pointer.velocity.y / 10);
                        intro[i].y = Phaser.Math.Clamp(intro[i].y, h2[i]-hmax+wh-90, h2[i]);
                    }
                }
                }
            });
    }
    Get3(){
        var graphics = this.make.graphics();
        graphics.fillRect(window.innerWidth/5, window.innerHeight/12,window.innerWidth-window.innerWidth/5,window.innerHeight-window.innerHeight/12);
        let time=1;
            this.data=$.ajax({
                type:"GET",
                url:dataurl+"/user/ThingRedBag",
                data:{},
                async:false,
                dataType: "json",
                success:function(data)
                {
                    bagdata=data.data;
                }
            })
            var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

            if(pic!=null)for(var i=0;i<pic.length;i++)pic[i].destroy();
            if(intro!=null) for(var i=0;i<pic.length;i++)intro[i].destroy();
           pic =new  Array();//初始化的时候摧毁原有图案与文字再添加数据
           intro =new Array();//记录文字
           var h1 =new Array();//记录高度
           var h2=new Array();
           var hmax;//记录最高高度
           var wh=window.innerHeight;
           contend='';
            for(var i=0;i<bagdata.length;i++)
            {
                var show =this.add.sprite(window.innerWidth/4,window.innerHeight/7*(i+1),bagdata[i].name).setOrigin(0).setScale(widthbase*0.8, heightbase*0.8);
                contend=bagdata[i].name+'\n\n'+"数量："+bagdata[i].number;
                var txt =this.add.text(310*widthbase,window.innerHeight/7*(i+1),contend,{fontSize:35*widthbase, fill : "#CD853F" });
                pic.push(show);
                intro.push(txt);
                txt.setMask(mask);
                show.setMask(mask);
                h1.push(show.y);
                h2.push(txt.y);
                if(i==bagdata.length-1)
                hmax=show.y;
            
           }
            
            var zone = this.add.zone(window.innerWidth/5, window.innerHeight/12,window.innerWidth-window.innerWidth/5,window.innerHeight-window.innerHeight/12).setOrigin(0).setInteractive();
            
            zone.on('pointermove', function (pointer) {
                if (pointer.isDown)
                {
                    if(hmax>wh){
                    for(var i=0;i<pic.length;i++)
                    {
                        pic[i].y+=(pointer.velocity.y / 10);
                        pic[i].y = Phaser.Math.Clamp(pic[i].y, h1[i]-hmax+wh-60, h1[i]);
                        intro[i].y+=(pointer.velocity.y / 10);
                        intro[i].y = Phaser.Math.Clamp(intro[i].y, h2[i]-hmax+wh-60, h2[i]);
                    }
                }
                }
            });
    }
    Get4(){
        var graphics = this.make.graphics();
        graphics.fillRect(window.innerWidth/5, window.innerHeight/12,window.innerWidth-window.innerWidth/5,window.innerHeight-window.innerHeight/12);
        let time=1;
            this.data=$.ajax({
                type:"GET",
                url:dataurl+"/user/StoreRedBag",
                data:{},
                async:false,
                dataType: "json",
                success:function(data)
                {
                    bagdata=data.data;
                }
            })
            var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

            if(pic!=null)for(var i=0;i<pic.length;i++)pic[i].destroy();
            if(intro!=null) for(var i=0;i<pic.length;i++)intro[i].destroy();
           pic =new  Array();//初始化的时候摧毁原有图案与文字再添加数据
           intro =new Array();//记录文字
           var h1 =new Array();//记录高度
           var h2=new Array();
           var hmax;//记录最高高度
           var wh=window.innerHeight;
           contend='';
            for(var i=0;i<bagdata.length;i++)
            {
                var show =this.add.sprite(window.innerWidth/4,window.innerHeight/7*(i+1),bagdata[i].name).setOrigin(0).setScale(widthbase*0.8, heightbase*0.8);
                contend=bagdata[i].name+'\n\n'+"数量："+bagdata[i].sum;
                var txt =this.add.text(310*widthbase,window.innerHeight/7*(i+1),contend,{fontSize:35*widthbase, fill : "#CD853F" });
                pic.push(show);
                intro.push(txt);
                txt.setMask(mask);
                show.setMask(mask);
                h1.push(show.y);
                h2.push(txt.y);
                if(i==bagdata.length-1)
                hmax=show.y;
            
           }
            
            var zone = this.add.zone(window.innerWidth/5, window.innerHeight/12,window.innerWidth-window.innerWidth/5,window.innerHeight-window.innerHeight/12).setOrigin(0).setInteractive();
            
            zone.on('pointermove', function (pointer) {
                if (pointer.isDown)
                {
                    if(hmax>wh){
                    for(var i=0;i<pic.length;i++)
                    {
                        pic[i].y+=(pointer.velocity.y / 10);
                        pic[i].y = Phaser.Math.Clamp(pic[i].y, h1[i]-hmax+wh-90, h1[i]);
                        intro[i].y+=(pointer.velocity.y / 10);
                        intro[i].y = Phaser.Math.Clamp(intro[i].y, h2[i]-hmax+wh-90, h2[i]);
                    }
                }
                }
            });
    }
//获取数据
    searchfood(){
        selected.destroy();
        selected = this.add.graphics(0,0);
        selected.fillStyle(0xffffff);
        selected.fillRect(0, window.innerHeight/12,window.innerWidth/5,window.innerHeight/9);
        text1.destroy();
        text1 = this.add.text(window.innerWidth/100 , window.innerHeight/9, "饲料" , {fontSize:35*widthbase , fill : "#a55344" , align : "center"});
        text1.setInteractive().on('pointerdown',this.searchfood,this);
       ///右侧添加遮罩
        this.addScrollHander(1);
    }
    searchud(){
        selected.destroy();
        selected = this.add.graphics(0,0);
        selected.fillStyle(0xffffff);
        selected.fillRect(0, window.innerHeight/12+window.innerHeight/9,window.innerWidth/5,window.innerHeight/9);
        text2.destroy();
        text2 = this.add.text(window.innerWidth/100, window.innerHeight/9*2, "乘车卷" , {fontSize:35*widthbase , fill : "#a55344" , align : "center"});
        text2.setInteractive().on('pointerdown',this.searchud,this);
        //右侧添加遮罩
        this.addScrollHander(2);
    }
    searchth(){
        selected.destroy();
        selected = this.add.graphics(0,0);
        selected.fillStyle(0xffffff);
        selected.fillRect(0, window.innerHeight/12+window.innerHeight/9*2,window.innerWidth/5,window.innerHeight/9);
        text3.destroy();
        text3 = this.add.text(window.innerWidth/100, window.innerHeight/9*3, "优惠券" , {fontSize:35*widthbase , fill : "#a55344" , align : "center"});
        text3.setInteractive().on('pointerdown',this.searchth,this);
        //右侧添加遮罩
        this.addScrollHander(3);
    }
    searchst(){
        selected.destroy();
        selected = this.add.graphics(0,0);
        selected.fillStyle(0xffffff);
        selected.fillRect(0, window.innerHeight/12+window.innerHeight/9*3,window.innerWidth/5,window.innerHeight/9);
        text4.destroy();
        text4 = this.add.text(window.innerWidth/100 , window.innerHeight/9*4, "现金卷" , {fontSize:35*widthbase , fill : "#a55344" , align : "center"});
        text4.setInteractive().on('pointerdown',this.searchst,this);
        //右侧添加遮罩
        this.addScrollHander(4);
}
 toPet() {this.scene.start('Pet'); }
}