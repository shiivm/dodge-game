import GameComponent from './GameComponent';

export default class Obstacles extends GameComponent {
	constructor(args) {
		super({ 
			type: args.type, 
			color: args.color, 
			width: args.width, 
			height:args.height,
			x : args.x, 
			y : args.y, 
		});
	}
}