let dataurl="";
let widthbase = window.innerWidth / 600;
let heightbase = window.innerHeight / 1100;
let petdata,contend,pic,intro;
let logindata;
//预载页面
export default class Boot extends Phaser.Scene {
	constructor() {
		super({
		    key:"Choose"
			})
		}
	 preload() {
        this.load.image('back', './assets/png/back.png');
        this.load.image('bagbg', './assets/png/bagbg.png');
        this.load.image('p1', './assets/png/txico.png');
        this.load.image('p2', './assets/png/txico2.png');
	}
	create() {
        //图片资源
        var bagbg = this.add.image(0,0, 'bagbg').setOrigin(0);
        bagbg.setScale(widthbase, heightbase);
		//回归标签
        var back = this.add.image(40*widthbase, 15*heightbase, 'back').setOrigin(0);
		back.setInteractive().on('pointerdown',this.toPet,this);
        back.setScale(widthbase, heightbase);

        $.ajax({//获取拥有的宠物数据
            type:"GET",
            url:dataurl+"/user/ownpet",
            data:{},
            async:false,
            dataType: "json",
            success:function(data)
            {
                petdata=data.data;
            }
        })
        var graphics = this.make.graphics();
        graphics.fillRect(window.innerWidth/10, window.innerHeight/10,window.innerWidth-window.innerWidth/10,window.innerHeight-window.innerHeight/10);
        var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);
        pic =new  Array();//初始化的时候摧毁原有图案与文字再添加数据
        intro =new Array();//记录文字
        var h1 =new Array();//记录高度
        var h2=new Array();
        var hmax;//记录最高高度
        contend='';
        var wh=window.innerHeight;
        var  t;//记录登录者对应序号
        $.ajax({//获取目前登录状态时用户选择的宠物id
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
        t=logindata.petId;//已选择的宠物的id
        for(var i=0;i<petdata.length;i++)
        {
           
            var pet =this.add.sprite(window.innerWidth/10,window.innerHeight/10+window.innerHeight/6*i,"p"+petdata[i].petId).setOrigin(0).setScale(widthbase*1.2, heightbase*1.2);
            if(t!=petdata[i].petId){
            contend=petdata[i].name+'\n'+"成长值："+petdata[i].grow;
            var txt =this.add.text(200*widthbase,window.innerHeight/9+window.innerHeight/6*i,contend,{fontSize:35*widthbase, fill : "#CD5C5C",fontFamily:'"迷你简卡通"' });
            }
            else{
            contend=petdata[i].name+"  (已选择)"+'\n'+"成长值："+petdata[i].grow;
            var txt =this.add.text(200*widthbase,window.innerHeight/9+window.innerHeight/6*i,contend,{fontSize:35*widthbase, fill : "#DAA520",fontFamily:'"迷你简卡通"' });
            }
            pic.push(pet);
            intro.push(txt);
            txt.setMask(mask);
            pet.setMask(mask);
            h1.push(pet.y);
            h2.push(txt.y);
            if(i==petdata.length-1)
            hmax=pet.y;
        }
        var zone = this.add.zone(window.innerWidth/10, window.innerHeight/10,window.innerWidth-window.innerWidth/10,window.innerHeight-window.innerHeight/10).setOrigin(0).setInteractive();
        var  flag;
        zone.on('pointermove', function (pointer) {
            if (pointer.isDown)
            {
                flag=0;
                if(hmax>wh){
                for(var i=0;i<pic.length;i++)
                {
                    pic[i].y+=(pointer.velocity.y / 10);
                    pic[i].y = Phaser.Math.Clamp(pic[i].y, h1[i]-hmax+wh-90, h1[i]);
                    intro[i].y+=(pointer.velocity.y / 10);
                    intro[i].y = Phaser.Math.Clamp(intro[i].y, h2[i]-hmax+wh-90, h2[i]);
                }
            }
            else
            flag=1;
            }
        })
        
        if(flag!=0){
        zone.on('pointerup',function(pointer){//点击选择宠物
            for(var i=0;i<pic.length;i++)
            {
                var id,text;
                if(pic[i].y<pointer.y && pointer.y<pic[i].y+pic[i].height*heightbase)
                {
                    id=pic[i].texture.key.slice(1);
                    var graphics = this.add.graphics();
                    graphics.fillStyle(0xffffff,1);
                    graphics.fillRect(window.innerWidth/6, window.innerHeight/4,window.innerWidth/5*3,window.innerHeight/4);
                    if(id==t)
                    {
                        text=this.add.text(window.innerWidth/5.5,window.innerHeight/3.2,"您已经选择了该宠物!",{fontSize:35*widthbase, fill : "#DAA520",fontFamily:'"迷你简卡通"' });
                        var sure = this.add.graphics();
                        sure.fillStyle(0xCD5C5C,1);
                        sure.fillRect(window.innerWidth/3, window.innerHeight/2.7,window.innerWidth/4,window.innerHeight/10);
                        var suretext=this.add.text(window.innerWidth/2.5,window.innerHeight/2.5,"确定",{fontSize:35*widthbase, fill : "#000000",fontFamily:'"迷你简卡通"' });
                        suretext.setInteractive().on('pointerdown',()=>{
                            text.destroy();
                            sure.destroy();
                            graphics.destroy();
                            suretext.destroy();},this);
                    }
                    else{
                        text=this.add.text(window.innerWidth/5.5,window.innerHeight/3.2,"您确定要更换宠物？",{fontSize:35*widthbase, fill : "#DAA520",fontFamily:'"迷你简卡通"' });
                        var cancle = this.add.graphics();
                        cancle.fillStyle(0xCD5C5C,1);
                        cancle.fillRect(window.innerWidth/2, window.innerHeight/2.7,window.innerWidth/4,window.innerHeight/10);
                        var cancletext=this.add.text(window.innerWidth/1.8,window.innerHeight/2.5,"取消",{fontSize:35*widthbase, fill : "#000000",fontFamily:'"迷你简卡通"' });
                        cancletext.setInteractive().on('pointerdown',()=>{
                            text.destroy();
                            cancle.destroy();
                            graphics.destroy();
                            cancletext.destroy();
                            text.destroy();
                            sure.destroy();
                            graphics.destroy();
                            suretext.destroy();},this);
                        var sure = this.add.graphics();
                        sure.fillStyle(0xCD5C5C,1);
                        sure.fillRect(window.innerWidth/4.5, window.innerHeight/2.7,window.innerWidth/4,window.innerHeight/10);
                        var suretext=this.add.text(window.innerWidth/4,window.innerHeight/2.5,"确定",{fontSize:35*widthbase, fill : "#000000",fontFamily:'"迷你简卡通"' });
                        suretext.setInteractive().on('pointerdown',()=>{
                
                    console.log(id);
                    var choose ={
                        "data":{"petId":id}
                    }
                    $.ajax({//提交选择的宠物id
                        type:"GET",//此处在测试接口的时候需要改成post
                        url:dataurl+"/user/changepet",
                        data:JSON.stringify(choose),
                        async:false,
                        dataType: "json",
                        success:function(data)
                        {
                            console.log("选择成功");
                        },
                        error:function(data)
                        {
                            console.log(data);
                            alert("false");
                        }
                    })
                    text.destroy();
                    sure.destroy();
                    graphics.destroy();
                    suretext.destroy();
                    text.destroy();
                    cancle.destroy();
                    graphics.destroy();
                    cancletext.destroy();
                  },this);
                }
                   
                }
            
        }
        },this)
    }

    }
    toPet() {this.scene.start('Pet'); }
}