const grid = document.getElementById('grid');

for (let i=0; i<10; i++) {
  const row = document.createElement('div');
  row.className = 'd-flex';

  for (let j=0; j<10; j++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    row.appendChild(cell);
  }
  grid.appendChild(row);
}