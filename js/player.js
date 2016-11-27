// Classe Player
function Player (color, indexPlayer) {
    this.color = color;
    this.indexPlayer = indexPlayer;
}
/*************************************/
//Function qui cherche la meilleure barre a prendre

Player.prototype.find = function(game){
    //choisir une barre au hasard par default 
    var chosenBarre = {i: Math.floor((Math.random() * 8) + 0), j: Math.floor((Math.random() * 3) + 0)};

    for(var i = 0; i < game.boxes.length; i++){ //parcour de toutes les boxes
        var barresClicked = nbBarresClicked(game.boxes[i]);

        if(barresClicked == 3){ //si dans une boxe il y a 3 barres qui sont déjà cliquées tu prend la 4ème
            for(var j = 0; j < 4 ; j++){
                //on stoque la barre meilleure 
                if(!game.boxes[i].barresBoxe[j].isClicked){
                   chosenBarre.i = i;
                   chosenBarre.j = j;
                   chosenBarre.isScoring = true;
                }                
            }                           
        }
    }

    var iteration = 0;

    while( game.boxes[chosenBarre.i].barresBoxe[chosenBarre.j].isClicked && iteration < 50 ){

        chosenBarre = {i: Math.floor((Math.random() * 8) + 0), j: Math.floor((Math.random() * 3) + 0)};
        iteration++;
    }

    return chosenBarre;
}

/*********************************************/
//Function d'IA que s'elle a la possibilité de choisir une 4ème barre d'une boxe elle la choit sinon elle soit au hasard

Player.prototype.closeBox = function(game) {    
    var chosenBarre = this.find(game);
    if(!game.boxes[chosenBarre.i].barresBoxe[chosenBarre.j].isClicked){
        game.boxes[chosenBarre.i].barresBoxe[chosenBarre.j].fill = this.color;
        game.boxes[chosenBarre.i].barresBoxe[chosenBarre.j].isClicked = true;            
    }
    if(chosenBarre.isScoring){        
        game.score[this.indexPlayer]++;
        game.boxes[chosenBarre.i].isGot = true; 
        this.closeBox(game);        
    }
}    

/*********************************************/
//Function d'IA qui choisit la barre toujour au hasard

Player.prototype.random = function(game) {    
    //choisir une barre au hasard par default 
    var chosenBarre = {i: Math.floor((Math.random() * 8) + 0), j: Math.floor((Math.random() * 3) + 0)};
     var iteration = 0;

//Pour qu'il reste pas dans la boucle en infinit (iteration < 50) 
    while( game.boxes[chosenBarre.i].barresBoxe[chosenBarre.j].isClicked && iteration < 50 ){

        chosenBarre = {i: Math.floor((Math.random() * 8) + 0), j: Math.floor((Math.random() * 3) + 0)};
        iteration++;
    }

    for(var i = 0; i < game.boxes.length; i++){ //parcour de toutes les boxes
        var barresClicked = nbBarresClicked(game.boxes[i]);

        if(barresClicked == 3){ //si dans une boxe il y a 3 barres qui sont déjà cliquées tu prend la 4ème
            for(var j = 0; j < 4 ; j++){
                //on stoque la barre meilleure 
                if(game.boxes[chosenBarre.i].barresBoxe[chosenBarre.j].x == game.boxes[i].barresBoxe[j].x 
                    && game.boxes[chosenBarre.i].barresBoxe[chosenBarre.j].y == game.boxes[i].barresBoxe[j].y ){
                   chosenBarre.isScoring = true;
                }                
            }                           
        }
    }
    if(!game.boxes[chosenBarre.i].barresBoxe[chosenBarre.j].isClicked){
        game.boxes[chosenBarre.i].barresBoxe[chosenBarre.j].fill = this.color;
        game.boxes[chosenBarre.i].barresBoxe[chosenBarre.j].isClicked = true;            
    }
    if(chosenBarre.isScoring){        
        game.score[this.indexPlayer]++;
        game.boxes[chosenBarre.i].isGot = true; 
        this.random(game);        
    }
}    
