let gridContainer = document.getElementById('grid-container'),
    selectedColor = 'black';

function resetGrid() {
    while (gridContainer.hasChildNodes()) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
    gridContainer.style.gridTemplateColumns = '';
    gridContainer.style.gridTemplateRows  = '';
}

function createDivs(rowsAndColumns) {
    resetGrid();
    gridContainer.style.gridTemplateColumns = `repeat(${rowsAndColumns}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${rowsAndColumns}, 1fr)`;
    for (let i = 0; i < rowsAndColumns; i++) {
        for (let k = 0; k < rowsAndColumns; k++) {
            let div = document.createElement('div');
            div.style.backgroundColor = 'hsl(0, 0%, 100%)';
            div.style.border = '1px solid black';
            gridContainer.appendChild(div);
            div.addEventListener('mouseover', function() {
                if (selectedColor === 'rainbow') {
                    this.style.backgroundColor = changeColorToRainbow();
                } else {
                    this.style.backgroundColor = 'black';
                }
            });
        }
    }
}

function clear() {
    for (let i = 0; i < gridContainer.childElementCount; i++) {
        if (gridContainer.childNodes[i].style.backgroundColor !== 'transparent') {
            gridContainer.childNodes[i].style.backgroundColor = 'transparent';
        }
    }
}

function changeColorToRainbow() {
    let hexNumbers = '0123456789ABCDEF',
        color = '#';
    for (let i = 0; i < 6; i++) {
        color += hexNumbers[Math.floor(Math.random() * 17)]
    }
    return color;
}

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {
    let rowsAndColumns = prompt('Input a number for the size of your grid. (5 - 100)');
    if (rowsAndColumns === null) return;
    if (typeof rowsAndColumns !== 'number') return alert('Please input a number');
    rowsAndColumns = parseInt(rowsAndColumns);
    if (rowsAndColumns < 5 || rowsAndColumns > 100) return alert('Please input a number between 5 to 100.');
    createDivs(rowsAndColumns);
});

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', clear);

const rainbowButton = document.getElementById('rainbow');
rainbowButton.addEventListener('click', () => selectedColor = 'rainbow');

const blackButton = document.getElementById('black');
blackButton.addEventListener('click', () => selectedColor = 'black');

createDivs(16);