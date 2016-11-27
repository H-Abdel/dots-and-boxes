//Sert à compter les barres cliquées dans une boxe
function nbBarresClicked(boxe){
	var nbBarresClicked = 0;
	for(var j = 0; j < 4; j++){ // parcour d'une boxe
	    if(boxe.barresBoxe[j].isClicked){
	        nbBarresClicked += 1;
	    }          
	}

	return nbBarresClicked;
}