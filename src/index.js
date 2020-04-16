import Phaser from 'phaser';
import Boot from './scenes/Boot';
import Pet from './scenes/Pet';
import Food from './scenes/Food';
import Store from './scenes/Store';
import Ask from './scenes/Ask';
import Bag from './scenes/Bag';
import Choose from './scenes/Choose';

const config = {
	type: Phaser.CANVAS,
	parent: 'content',
	width: '100%',
	height: '100%',
	dom: {
        createContainer: true
    },
	scene: [
		//Boot,
		Pet,
		Food,
		Store,
		Ask,
		Bag,
		Choose
		]
};

const game = new Phaser.Game(config);