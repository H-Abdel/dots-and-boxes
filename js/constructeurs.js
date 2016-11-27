// Classe Dot
function Dot (params) {
	this.x = params.x;
	this.y = params.y;
	this.r = params.r;
}

Dot.prototype.draw = function(ctx) {
	ctx.beginPath();
	ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
    ctx.fillStyle = "black";
	ctx.fill();
	ctx.stroke();
};
/****************************************************** */
// Classe Barre
function Barre (params) {
	this.x = params.x;
	this.y = params.y;
	this.w = params.w;
	this.h = params.h;
   // this.state = params.state;
    this.fill = params.fill;
    this.isClicked = params.isClicked;
}

Barre.prototype.draw = function(ctx) {
	ctx.beginPath();
	ctx.rect(this.x,this.y,this.w,this.h);
    ctx.fillStyle = this.fill;
    ctx.fill();
	ctx.stroke(); 
};
/******************************************************* */
// Classe Boxe
function Boxe (params) {
    this.barresBoxe = params.barresBoxe;    // Tableau contenant les 4 barres qui délimitent la boxe
    this.isGot = false; // est true si toutes les barres ont isClicked à true
}

Boxe.prototype.contient = function(barre) {
    for (var index=0; index < this.barresBoxe.length;index++) {
        // Verifier les coordonnées plutot que comparer les objets
        if (this.barresBoxe[index].y == barre.y && this.barresBoxe[index].x == barre.x){
            return true;
        }
    }
    return false; 
}
