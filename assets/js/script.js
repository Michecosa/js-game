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
const bombs = generateBombs(1, 100, 16);
console.log(bombs);


const grid = document.getElementById('grid');
let counter = 1;

// * Array con i numeri selezionati dall'utente
const clickedCells = [];
for (let i=0; i<10; i++) {
  const row = document.createElement('div');
  row.className = 'd-flex';

  for (let j=0; j<10; j++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    cell.textContent = counter;

    const currentNumber = counter;

    cell.onclick = () => {
      cell.classList.add('bg-primary','text-white','fw-bold','rounded','shadow','border');
      if(!clickedCells.includes(currentNumber)) {
        clickedCells.push(currentNumber);
        console.log(clickedCells);
      }
    }

    row.appendChild(cell);
    counter++;

  }
  grid.appendChild(row);
}