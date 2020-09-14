export default class GameComponent {
  constructor(args) {
    this.type = args.type;
    this.text = (args.type === "text") ? args.color : "";
    this.score = 0;
    this.width = args.width;
    this.height = args.height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = args.x;
    this.y = args.y;
    this.color = args.color;
  }

  update = function(ctx) {
    if (this.type === "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = this.color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}
