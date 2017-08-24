// Liste des L3 allant au WEI
let l3 = new Array();

// Liste des M1 allant au WEI
let m1 = new Array();

/**
 *	Affiche les gens dans le tableau
 */
let afficher = function(){
	let res = repartirGens();
	
	// Coucou tu veux voir ma bite?
	let table = document.getElementById("table");
	table.innerHTML = "";
	
	// On crée le header
	let trH = document.createElement("tr");
	let tdParrainH = document.createElement("th");
	tdParrainH.appendChild(document.createTextNode("Parrain"));
	let tdFillauxH = document.createElement("th");
	tdFillauxH.appendChild(document.createTextNode("Fillau"));
	trH.appendChild(tdParrainH);
	trH.appendChild(tdFillauxH);
	table.appendChild(trH);
	
	// On crée les TR du corps du tableau
	for(let i = 0; i < res.length; i++){
		// On crée le <tr></tr>
		let tr = document.createElement("tr");
		
		// On crée le <td></td> du parrain
		let tdParrain = document.createElement("td");
		tdParrain.appendChild(document.createTextNode( res[i].nom ));
		
		// On crée le <td></td> du fillau
		let tdFillaux = document.createElement("td");
		
		// On génère le texte indiquant qui sont tous les fillaux du parrain courant
		let texteFillaux = "";
		for(let j = 0; j < res[i].fillau.length; j++){
			texteFillaux += res[i].fillau[j] + (j == res[i].fillau.length - 1 ? "" : ", ");
		}
		
		tdFillaux.appendChild(document.createTextNode( texteFillaux ));
		
		tr.appendChild(tdParrain);
		tr.appendChild(tdFillaux);
		
		table.appendChild(tr);
	}
	
	let doc = new jsPDF();
	doc.fromHTML(document.getElementById("divPdf").innerHTML, 15, 15, {'width': 170});
	doc.save('Liste.pdf');
};

/**
 *	Permet de générer le tableau en contrôlant au préalable que tout est OK
 */
let generer = function(){	
	let liste_l3 = document.getElementById("l3").value;
	let liste_m1 = document.getElementById("m1").value;
	
	if(liste_l3.length > 0 && liste_m1.length > 0){
		l3 = liste_l3.split("\n");
		m1 = liste_m1.split("\n");
		
		afficher();
	}
};

/**
 *	Permet de répartir les gens
 *	@returns	Le tableau des gens répartis
 */
let repartirGens = function(){
	let res = new Array();
	
	// Création du dico des parrains
	for(let i = 0; i < m1.length; i++){
		res.push({
								"nom"	: m1[i],
								"fillau": new Array()
							});
	}
	
	// Remplissage des fillaux
	let j = 0;
	for(let i = 0; i < l3.length; i++){
		let x = Math.round(Math.random() * (res.length-1));
		
		if( i % (res.length) == 0 ){
			res[x].fillau.push( l3[i] );
			j++;
		} else {
			while(res[x].fillau.length >= j){
				x = Math.round(Math.random() * (res.length-1));
			}
			res[x].fillau.push( l3[i] );
		}
	}
	
	return res;
};