// Classe Grille 
function Grille (params) {
    // Lidée est de creer un tableau de tableaux
    this.table = [];
    this.nbrLignes = params.nbrLignes;  // Le nombre de lignes de la grille
    for (var i = 0; i < this.nbrLignes; i++) {
        this.table[i] = [];
    }
}
/******************************************************* */
// Classe Game
var Game = function(canvas, nbrHor, nbrVer){
    this.nbrHor = nbrHor;    // Le nombre de point horizental
    this.nbrVer = nbrVer;    // Le nombre de point vertical
    this.canvas = document.getElementById(canvas);
    this.canvas.width = this.nbrHor*100;
    this.canvas.height = this.nbrVer*100;
    this.context = this.canvas.getContext("2d");
    this.stage = undefined;
    this.listening = false;

    this.player = [];
    
    this.score = [0, 0];    // score[0] -> joueur 1     score[1] -> joueur 2    
    
    
    this.dots = [];     // Le tableau contenant tous les objets de type "Dot"
    this.barres = [];   // Le tableau contenant tous les objets de type "Barre"
    this.boxes = [];    // Le tableau contenant tous les objets de type "Boxe"
    
    this.barresHor = []; // Le tableau contenant toutes les barres horizentals
    this.barresVer = []; // Le tableau contenant toutes les barres verticales

    this.grille = new Grille({
          nbrLignes: this.nbrHor
      });

    // Construction des deux tableaux dots
    for (var j = 0; j < this.nbrHor; j++) {
        for (var i =0;  i < this.nbrVer ; i++) {
        
            this.dots.push(new Dot({
                x: 50+ 100*i,
                y: 50+ 100*j,
                r: 5
            }));
        
        // Construction du tableau barresVer
        // Barres verticales une ligne après l'autre
            if(j!=this.nbrVer-1) {
                var barre = new Barre({
                        x: 45+ 100*i,
                        y: 55 + 100*j,
                        w: 10,
                        h: 90,
                        fill: "white",
                        isClicked: false
                });
               // this.barres.push(barre);
                this.barresVer.push(barre);
                //this.barresVer[this.barresVer.length] = this.barres[this.barres.length];
            };
       
        // Construction du tableau barresHor
        // Barres horizontales une ligne après l'autre 
        
            if (i!=this.nbrHor-1) {
                var barre = new Barre({
                        x: 55+ 100*i,
                        y: 45 + 100*j,
                        w: 90,
                        h: 10,
                        fill: "white",
                        isClicked: false
                });
                this.barresHor.push(barre);
               // this.barres.push(barre);
                //this.barresHor[this.barresHor.length] = this.barres[this.barres.length];
            };

        }
    }


    this.barres = this.barresVer.concat(this.barresHor);

            // ici faut mettre les quatres barres qui délimitent la boxe en itération
            // Ces barres là faut aller les chercher dans le "this.barres"
            // Pour cela faudrait peut être repenser la structure de données
            
  
    for (var i = 0; i < (this.barres.length / 2) - 1;) {
        for (var j = (this.barres.length / 2); j < this.barres.length - (this.nbrHor - 1); j++) {
            var mod = i%this.nbrHor;

            var barreV1 = (this.barres[i]);
            var barreV2 = (this.barres[i+1]);
            var barreH1 = (this.barres[j]);
            var barreH2 = (this.barres[j + (nbrHor - 1)]);

            var b = [];
            b.push(barreV1);
            b.push(barreV2);
            b.push(barreH1);
            b.push(barreH2);    

          
            var boxe = new Boxe({
                      barresBoxe : b,
                      isGot   : false
             });

            this.boxes.push(boxe);    
            if(mod== (this.nbrHor - 2)){
                i = i + 2;
            } else{     
            i++;
            }
        }
    }




    // #########################################################

    // desktop flags
    this.mousePos = null;
    this.mouseDown = false;
    this.mouseUp = false;
    
    // Region Game
    this.currentRegion = null;
    this.regionIndex = 0;
    this.lastRegionIndex = -1;
    this.mouseOverRegionIndex = -1;
};

// ======================================= GENERAL =======================================

Game.prototype.getContext = function(){
    return this.context;
};

Game.prototype.getCanvas = function(){
    return this.canvas;
};

Game.prototype.clear = function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.getCanvasPos = function(){
    var obj = this.getCanvas();
    var top = 0;
    var left = 0;
    while (obj.tagName != "BODY") {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }
    return {
        top: top,
        left: left
    };
};

Game.prototype.setStage = function(func){
    this.stage = func;
    this.listen();
};

// ======================================= CANVAS EVENTS =======================================

Game.prototype.reset = function(evt){
    if (!evt) {
        evt = window.event;
    }
    
    this.setMousePosition(evt);
    this.setTouchPosition(evt);
    this.regionIndex = 0;
    
    if (this.stage !== undefined) {
        this.stage();
    }
    
    // desktop flags
    this.mouseOver = false;
    this.mouseMove = false;
    this.mouseDown = false;
    this.mouseUp = false;
    
    // mobile touch flags
    this.touchStart = false;
    this.touchMove = false;
    this.touchEnd = false;
};

Game.prototype.listen = function(){
    var that = this;
    
    if (this.stage !== undefined) {
        this.stage();
    }
    
    // desktop events
    this.canvas.addEventListener("mousedown", function(evt){
        that.mouseDown = true;
        that.reset(evt);
    }, false);
    
    this.canvas.addEventListener("mouseup", function(evt){
        that.mouseUp = true;
        that.reset(evt);
    }, false);
    
    
};

Game.prototype.setMousePosition = function(evt){
    var mouseX = evt.clientX - this.getCanvasPos().left + window.pageXOffset;
    var mouseY = evt.clientY - this.getCanvasPos().top + window.pageYOffset;
    this.mousePos = {
        x: mouseX,
        y: mouseY
    };
};

Game.prototype.setTouchPosition = function(evt){
    if (evt.touches !== undefined && evt.touches.length == 1) { // Only deal with one finger
        var touch = evt.touches[0]; // Get the information for finger #1
        var touchX = touch.pageX - this.getCanvasPos().left + window.pageXOffset;
        var touchY = touch.pageY - this.getCanvasPos().top + window.pageYOffset;
        
        this.touchPos = {
            x: touchX,
            y: touchY
        };
    }
};

// ======================================= REGION EVENTS =======================================

 Game.prototype.beginRegion = function(){
    this.currentRegion = {};
    this.regionIndex++;
};

Game.prototype.addRegionEventListener = function(type, func){
    var event = (type.indexOf('touch') == -1) ? 'on' + type : type;
    this.currentRegion[event] = func;
};

Game.prototype.closeRegion = function(){
    var pos = this.touchPos || this.mousePos;
    
    if (pos !== null && this.context.isPointInPath(pos.x, pos.y)) {
        if (this.lastRegionIndex != this.regionIndex) {
            this.lastRegionIndex = this.regionIndex;
        }
        
        // handle onmousedown
        if (this.mouseDown && this.currentRegion.onmousedown !== undefined) {
            this.currentRegion.onmousedown();
            this.mouseDown = false;
        }
        
        // handle onmouseup
        else if (this.mouseUp && this.currentRegion.onmouseup !== undefined) {
            this.currentRegion.onmouseup();
            this.mouseUp = false;
        }
        
    }
    else if (this.regionIndex == this.lastRegionIndex) {
        this.lastRegionIndex = -1;
        this.mouseOverRegionIndex = -1;
        
        // handle mouseout condition
        if (this.currentRegion.onmouseout !== undefined) {
            this.currentRegion.onmouseout();
        }
    }
};
