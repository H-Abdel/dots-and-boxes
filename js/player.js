// Classe Player
function Player (params) {
    //this.score = params.score;
    //this.couleur = params.couleur;
    //this.tour = false;
    //this.name = params.name;
}

Player.prototype.find = function(game){
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

Player.prototype.ia = function(game) {    
    //choisir une barre au hasard par default 
    var chosenBarre = this.find(game);
    if(!game.boxes[chosenBarre.i].barresBoxe[chosenBarre.j].isClicked){
        game.boxes[chosenBarre.i].barresBoxe[chosenBarre.j].fill = "red";
        game.boxes[chosenBarre.i].barresBoxe[chosenBarre.j].isClicked = true;            
    }
    if(chosenBarre.isScoring){        
        game.score[0]++;
        game.boxes[chosenBarre.i].isGot = true; 
        this.ia(game);        
    }
}    
