// Musica di background
const bgMusic = new Audio('assets/Pufino.mp3');
bgMusic.loop = true;

/* WELCOME */
document.getElementById('grid').classList.add('d-none');

let bombNumber;

// Seleziona tutti i bottoni di difficoltà e aggiungi l'event listener
const difficultyButtons = document.querySelectorAll('#welcome button');

difficultyButtons.forEach(button => {
  button.addEventListener('click', function() {
    const bombs = Number(this.getAttribute('numero_bombe'));
    startGame(bombs);
  });
});

function startGame(bombs) {
  bombNumber = bombs;
  
  document.getElementById('welcome').classList.add('d-none');
  document.getElementById('grid').classList.remove('d-none');
  
  bgMusic.play();
  
  initGame();
}

// Funzione per generare numeri (interi) casuali in un dato range
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function generateBombs(min, max, totBombs) {
  const bombs = [];
  
  for (let i = 0; i < totBombs; i++) {
    let newBomb = getRndInteger(min, max);
    
    if (bombs.includes(newBomb)) {
      i--;
    } else {
      bombs.push(newBomb);
    }
  }
  
  return bombs;
}

function initGame() {
  // * Array con i numeri in cui si trovano le bombe
  const bombs = generateBombs(1, 100, bombNumber);
  console.log(`Le bombe sono qui: ${bombs}`);
  
  const missingNumbers = [];
  for (let i = 1; i <= 100; i++) {
    if (!bombs.includes(i)) {
      missingNumbers.push(i);
    }
  }
  console.log("Numeri salvi:", missingNumbers);

  const grid = document.getElementById('grid');
  let counter = 1;

  // * Array con i numeri selezionati dall'utente
  const clickedCells = [];
  let gameOver = false;

  // * Numero totale di celle senza bombe
  const totalSafeCells = 100 - bombs.length;

  for (let i=0; i<10; i++) {
    // Genero le righe
    const row = document.createElement('div');
    row.className = 'd-flex';
    
    for (let j=0; j<10; j++) {
      // Genero le colonne per ogni riga (e quindi le celle)
      const cell = document.createElement('div');
      cell.className = 'grid-cell';
      cell.textContent = counter;
      
      const currentNumber = counter;
      
      cell.addEventListener('click', () => {
        if (gameOver || clickedCells.includes(currentNumber)) return; 
        
        clickedCells.push(currentNumber);
        
        // Aggiorna il punteggio
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
          scoreElement.textContent = clickedCells.length;
        }
        
        if (bombs.includes(currentNumber)) {
          cell.classList.add('bg-danger', 'text-white', 'fw-bold', 'rounded', 'shadow', 'border');
          cell.innerHTML = '<i class="bi bi-emoji-tear"></i>';
          
          // Caso sconfitta
          gameOver = true;
          grid.classList.add('d-none');
          bgMusic.pause();
          bgMusic.currentTime = 0;
          
          // setTimeout(() => alert('Game Over! Better luck next time'), 100);
          
          // Bottone per ricominciare (ricarica la pagina) +contenitore del bottone
          const button = document.createElement('button');
          
          // Assegna classi e contenuto del bottone
          button.className = 'btn btn-danger mt-3';
          button.textContent = 'Try again';
          
          // Ricarica la pagina al click del bottone
          button.addEventListener('click', () => {
            bgMusic.pause();
            bgMusic.currentTime = 0;
            location.reload();
          });
          
          // Parametro per i punti
          const punti = clickedCells.length - 1; // Esclude la cella cliccata che aveva la bomba

          // Calcola la percentuale di avanzamento
          const progress = (punti / totalSafeCells) * 100;

          // Aggiungi visualizzazione del punteggio fatto (che è uguale al numero di caselle cliccate che non erano bombe)
          const msg = document.createElement('h3');

          if (punti === 0) {
            msg.textContent = `Hai cliccato come un vero esploratore… cieco`;
          } else if(punti === 1) {
            msg.textContent = `Un punto. Almeno non è zero. Baby steps.`;
          } else if (progress <= 15) {
            msg.textContent = `${punti}pt : tecnicamente non è un disastro`;
          } else if (progress <= 40) {
            msg.textContent = `${punti}pt : hai il tocco giusto: esplosivo ma preciso`;
          } else if (progress <= 75) {
            msg.textContent = `${punti}pt : le bombe iniziano ad avere paura`;
          } else if (progress < 99) {
            msg.textContent = `${punti}pt : hai sfiorato la gloria!`;
          } else if (progress === totalSafeCells - 1) {
            msg.textContent = `${punti}pt : ti mancava UNA. SOLA. CASELLA.`;
          }
          
          // Carica il bottone e il messaggio nel container
          const restart = document.getElementById('container');
          restart.appendChild(msg);
          restart.appendChild(button);
          
        } else {
          cell.classList.add('bg-primary', 'text-white', 'fw-bold', 'rounded', 'shadow', 'border');
          
          //Caso vittoria
          if(clickedCells.length === totalSafeCells) {
            //setTimeout(() => alert('You won!'), 100)
            
            // Nascondo la griglia per evitare casi di errore
            grid.classList.add('d-none')

            // Messaggio da mostrare in pagina
            const msg = document.createElement('div');
            msg.className = `
              fw-bold text-black
            `;
            msg.innerHTML = `
              <h3 class="victory">
                <i class="ph ph-confetti"></i>
                Hai vinto!
                <i class="ph ph-confetti"></i>
              </h3>
            `;

            // Carica il messaggio nel container
            const container = document.getElementById('container');
            document.querySelector('header').classList.add('d-none')
            container.appendChild(msg);
          }
        }
      });

      row.appendChild(cell);
      counter++;

    }
    grid.appendChild(row);
  }
}