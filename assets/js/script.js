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

// * Array con i numeri in cui si trovano le bombe
const bombs = generateBombs(1, 100, 99);
console.log(`Le bombe sono qui: ${bombs}`);


const grid = document.getElementById('grid');
let counter = 1;

// * Array con i numeri selezionati dall'utente
const clickedCells = [];
let gameOver = false;
for (let i=0; i<10; i++) {
  const row = document.createElement('div');
  row.className = 'd-flex';

  for (let j=0; j<10; j++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    cell.textContent = counter;

    const currentNumber = counter;

    cell.onclick = () => {
      if (gameOver || clickedCells.includes(currentNumber)) return; 

      clickedCells.push(currentNumber);

      if (bombs.includes(currentNumber)) {
        cell.classList.add('bg-danger', 'text-white', 'fw-bold', 'rounded', 'shadow', 'border');
        cell.innerHTML = '<i class="bi bi-emoji-tear"></i>';
        
        // Caso sconfitta
        gameOver = true;
        grid.classList.add('d-none')
        
        setTimeout(() => alert('Game Over! Better luck next time'), 100);
        
        // Bottone per ricominciare (ricarica la pagina) +contenitore del bottone
        const button = document.createElement('button');
        const restart = document.getElementById('container');
        
        // Assegna classi e contenuto del bottone
        button.className = 'btn btn-danger mt-3';
        button.textContent = 'Try again';

        // Ricarica la pagina al click del bottone
        button.onclick = () => location.reload();
        
        restart.appendChild(button);
        
      } else {
        cell.classList.add('bg-primary', 'text-white', 'fw-bold', 'rounded', 'shadow', 'border');
        
        //Caso vittoria
        const totalSafeCells = 100 - bombs.length;
        if(clickedCells.length === totalSafeCells) {
          setTimeout(() => alert('You won!'), 100)
          
          grid.classList.add('d-none')

          const msg = document.createElement('div');
          msg.className = 'fw-bold fs-4 text-success';
          msg.textContent = 'Hai vinto! (non so come)';

          const container = document.getElementById('container');
          container.appendChild(msg);
        }
      }
    };

    row.appendChild(cell);
    counter++;

  }
  grid.appendChild(row);
}