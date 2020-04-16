//商城页面
export default class Store extends Phaser.Scene {
	constructor() {
		super({
		    key:"Store"
			})
		}
	preload() {
		this.load.image('back', './assets/png/back.png');
	}
	create() {
		//基础设置
		window.location.href='./Shop/index.html';
		console.log("a create of store");
		console.log('this is a new page of store');
	};
}