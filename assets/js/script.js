const grid = document.getElementById('grid');
let counter = 1;

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
      cell.classList.add('bg-primary','text-white','fw-bold');
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