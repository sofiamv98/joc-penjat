// Variables globals
let numIntents = 6;
let lletresUtilitzades = [];
let paraulaAEndevinar;
let paraulaAMostrar;

resetStorage();

// Comença una nova partida i inicialitza les variables amb els valors per defecte
function novaPartida() {
    escriureAbecedari();
    lletresUtilitzades = [];
    numIntents = 6;
    netejaLletresUtilitzades();
    paraulaAEndevinar = prompt('Introdueix una paraula');
    paraulaAMostrar = paraulaAEndevinar.replace(/./g, '_');
    mostraParaula(paraulaAMostrar);
    actualitzaImatge();
}

// Crea els botons amb les lletres válides de l'abecedari per al joc
function escriureAbecedari(){
    let caracters = "abcdefghijklmopqrstuvwxyz";
    let abecedari = "";

    for (let i = 0; i < caracters.length; i++) {
        abecedari += `<button class="lletra py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" id="lletra_${caracters[i]}" type="button" onclick="clickLletra(\'${caracters[i]}\')">${caracters[i]}</button>`;
    }
    document.getElementById("abecedari").innerHTML = abecedari;
}

/* Valida i comprova que la lletra a la que s'ha fet click sigui dins de la paraula a endevinar i comprova si ha guanyat o
perdut segons el nombre d'intents. */
function clickLletra(lletra) {
    afegeixLletraUtilitzada(lletra);
    disableLletra(lletra);
    if (isLletraAParaula(lletra)) {
        paraulaAMostrar = mostraCharsEndevinats(lletra);
        mostraParaula(paraulaAMostrar);
        if (comprovaSiHaGuanyat() && numIntents > 0) {
            console.log('Ha guanyat');
            incrementaVariablesStorage('partidesGuanyades');
            alert('Enhorabona, has guanyat!');
            disableAbecedari();
        }
    }
    else {
        numIntents--;
        actualitzaImatge();
        if (numIntents === 0) {
            incrementaVariablesStorage('partidesPerdudes');
            alert('Has perdut!');
            disableAbecedari();
        }
    }
}

// Comprova si la lletra que se li passa per paràmetre esta dins de la paraula a endevinar
function isLletraAParaula(lletra) {
    for (let i = 0; i < paraulaAEndevinar.length; i++) {
        if (paraulaAEndevinar[i] === lletra) {
            return true;
        }
    }
     return false;
}

// Mostra els caràcters endevinats dins de la paraula a mostrar 
function mostraCharsEndevinats(lletra) {
    let caractersParaulaAMostrar = paraulaAMostrar.split('');
		
		for (let i = 0; i < paraulaAEndevinar.length; i++) {
			if (paraulaAEndevinar.charAt(i) === lletra) {
				caractersParaulaAMostrar[i] = lletra;
			}
		}
		return caractersParaulaAMostrar.join('');
}

// Mostra les estadístiques de la partida
function mostraEstadistiques() {
    const partidesGuanyades = parseInt(localStorage.getItem('partidesGuanyades'));
    const partidesPerdudes = parseInt(localStorage.getItem('partidesPerdudes'));
    const partidesJugades = partidesGuanyades + partidesPerdudes;
    let percentatgeGuanyades = partidesGuanyades / partidesJugades * 100;
    let percentatgePerdudes = partidesPerdudes / partidesJugades * 100;
    alert(`Total de partides: ${partidesJugades}\nPartides guanyades(${percentatgeGuanyades}%): ${partidesGuanyades}\nPartides perdudes(${percentatgePerdudes}%): ${partidesPerdudes}`);
}

// Afegeix i actualitza la paraula a mostrar dins del HTML al div 'jocPenjat'
function mostraParaula(paraulaAMostrar) {
    document.getElementById('jocPenjat').innerHTML = paraulaAMostrar.split('').join(' ');
}

// Comprova si el jugador ha encertat la paraula a endevinar
function comprovaSiHaGuanyat() {
    return paraulaAEndevinar === paraulaAMostrar;
}

// Afegeix les lletres utilitzades a l'array de lletresUtilitzades i al HTML
function afegeixLletraUtilitzada(lletra) {
    lletresUtilitzades.push(lletra);
    document.getElementById('lletresUtilitzades').innerHTML = 'Lletres utilitzades: ' + lletresUtilitzades;
}

// Neteja les lletres utilitzades del div a l'HTML
function netejaLletresUtilitzades() {
    document.getElementById('lletresUtilitzades').innerHTML = lletresUtilitzades;
}

// Actualitza el src de la imatge a mostrar segons el nombre d'intents del jugador
function actualitzaImatge() {
    switch(numIntents) {
        case 6:
            document.getElementById('imatgePenjat').src = 'img_penjat/penjat_0.png';
            break;
        case 5:
            document.getElementById('imatgePenjat').src = 'img_penjat/penjat_1.png';
            break;
        case 4: 
            document.getElementById('imatgePenjat').src = 'img_penjat/penjat_2.png';
            break;
        case 3: 
            document.getElementById('imatgePenjat').src = 'img_penjat/penjat_3.png';
            break;
        case 2: 
            document.getElementById('imatgePenjat').src = 'img_penjat/penjat_4.png';
            break;
        case 1: 
            document.getElementById('imatgePenjat').src = 'img_penjat/penjat_5.png';
            break;
        case 0: 
            document.getElementById('imatgePenjat').src = 'img_penjat/penjat_6.png';
            break;
    }
}

// Deshabilita el botó de la lletra per a que no es pugui fer més click en ella
function disableLletra(lletra) {
    document.getElementById("lletra_" + lletra).disabled = true;
    document.getElementById("lletra_" + lletra).classList.add("opacity-40");
    
}

// Deshabilita tots els botons de l'abecedari per a que el jugador no pugui fer més clicks i jugar sense iniciar nova partida
function disableAbecedari() {
    let lletres = document.getElementsByClassName('lletra');
    for (const lletra of lletres) {
        lletra.disabled = true;
        lletra.classList.add('opacity-40');
    }
}

// Incrementa per 1 el valor de les variables segons la seva clau al LocalStorage
function incrementaVariablesStorage(clau) {
    let valor = parseInt(localStorage.getItem(clau));
    valor++;
    localStorage.setItem(clau, valor); 
}

// Neteja el LocalStorage
function resetStorage() {
    localStorage.clear();
    localStorage.setItem('partidesGuanyades', '0');
    localStorage.setItem('partidesPerdudes', '0');
}