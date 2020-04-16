let dataurl="";
let widthbase = window.innerWidth / 600;
let heightbase = window.innerHeight / 1100;
let id;
//预载页面
export default class Boot extends Phaser.Scene {
	constructor() {
		super({
		    key:"Boot"
			})
		}
	 preload() {
		this.load.image('boot','./assets/png/boot.jpg');
		id=1;
	}
	create() {
		var bg = this.add.image(0,0, 'boot').setOrigin(0);
		bg.setScale(widthbase, heightbase);

		var idnum;//为后端提供登录的用户id
		$.ajax({
			type:"GET",
			url:dataurl+"/user/getId",
			data:{},
			async:false,
			dataType: "json",
			success:function(data)
			{
				idnum={"id":data.data.id};
				console.log(data.data.id);
				console.log("获取id成功");
			},
			error:function(data)
			{
				console.log("获取id错误");
			
			}
			
		})
		$.ajax({
			type:"GET",//测试的时候改为post
			url:dataurl+"/user/id",
			data:JSON.stringify(idnum),
			async:false,
			dataType: "json",
			success:function(data)
			{
				console.log(data.data.id);
				console.log("提交id成功");
			},
			error:function(data)
			{
				console.log("提交id错误");
			
			}
			
		})
		this.time.addEvent({
			delay:3500,
			callback:function(){
				this.scene.start('Pet');},
			callbackScope: this,
			loop: false})
	};
}