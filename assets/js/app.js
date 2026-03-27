/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

const crearDeck = () => {
  let deck = [];

  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }

  return _.shuffle(deck);
};

const pedirCarta = (deck) => {
  if (deck.length === 0) {
    throw "No hay cartas en el deck";
  }
  return deck.pop();
};

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta(deck);
    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntajeComputadoraHTML.textContent = puntosComputadora;
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasComputadora.append(imgCarta);

    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      alert("Nadie gana :(");
    } else if (puntosMinimos > 21) {
      alert("Computadora gana");
    } else if (puntosComputadora > 21) {
      alert("Jugador gana");
    } else {
      alert("Computadora gana");
    }
  }, 100);
};

const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];
let deck = crearDeck();
let puntosJugador = 0,
  puntosComputadora = 0;

// HTML
const btnPedir = document.querySelector("#pedir-cartas");
const btnDetener = document.querySelector("#detener");
const btnNuevo = document.querySelector("#nuevo-juego");
const puntajeJugadorHTML = document.querySelectorAll("small")[0];
const puntajeComputadoraHTML = document.querySelectorAll("small")[1];
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");

// Events

btnPedir.addEventListener("click", () => {
  const carta = pedirCarta(deck);
  puntosJugador = puntosJugador + valorCarta(carta);
  puntajeJugadorHTML.textContent = puntosJugador;
  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  divCartasJugador.append(imgCarta);

  if (puntosJugador > 21) {
    console.warn("Lo siento mucho, perdiste");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn("21, genial!");
    btnPedir.disabled = true;
  }

  console.log(puntosJugador);
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener("click", () => {
  console.clear();
  deck = crearDeck();
  puntosJugador = 0;
  puntosComputadora = 0;
  puntajeJugadorHTML.textContent = 0;
  puntajeComputadoraHTML.textContent = 0;
  divCartasComputadora.innerHTML = "";
  divCartasJugador.innerHTML = "";
  btnPedir.disabled = false;
  btnDetener.disabled = false;
});

console.log(deck);
