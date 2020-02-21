let gridContainer = document.getElementById('grid-container');
let selectedColor = 'none';

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', clear);

const rainbowButton = document.getElementById('rainbow');
rainbowButton.addEventListener('click', () => selectedColor = 'rainbow');
rainbowButton.addEventListener('blur', unselectColorByBlur);

const blackButton = document.getElementById('black');
blackButton.addEventListener('click', () => selectedColor = 'black');
blackButton.addEventListener('blur', unselectColorByBlur);

function unselectColorByBlur() {
    this.style.backgroundColor = '';
    selectedColor = 'none';
}

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
            div.className = 'cell';
            div.style.backgroundColor = 'hsl(0, 0%, 100%)';
            div.style.border = '1px solid black';
            div.setAttribute('data-lightness', 100)
            gridContainer.appendChild(div);
            div.addEventListener('mouseover', function() {
                if (selectedColor === 'rainbow') {
                    if (parseInt(this.getAttribute('data-lightness')) < 100) {
                        this.setAttribute('data-lightness', 100);
                    }
                    this.style.backgroundColor = changeColorToRainbow();
                } else if(selectedColor ==='black') {
                    let lightness = parseInt(this.getAttribute('data-lightness'));
                    if (lightness === 0) return;
                    lightness -= 20;
                    this.setAttribute('data-lightness', lightness);
                    this.style.backgroundColor = `hsl(0, 0%, ${lightness}%)`;
                }
            });
        }
    }
}

function clear() {
    for (let i = 0; i < gridContainer.childElementCount; i++) {
        if (gridContainer.childNodes[i].style.backgroundColor !== 'hsl(0, 0%, 100%)') {
            gridContainer.childNodes[i].setAttribute('data-lightness', 100);
            gridContainer.childNodes[i].style.backgroundColor = 'hsl(0, 0%, 100%)';
        }
    }
}

function changeColorToRainbow() {
    let hexNumbers = '0123456789ABCDEF',
        color = '#';
    for (let i = 0; i < 6; i++) {
        color += hexNumbers[Math.floor(Math.random() * 16)]
    }
    rainbowButton.style.backgroundColor = color;
    return color;
}

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {
    let rowsAndColumns = prompt('Input a number for the size of your grid. (5 - 100)');
    if (rowsAndColumns === null) return;
    rowsAndColumns = parseInt(rowsAndColumns);
    if (isNaN(rowsAndColumns)) return alert('Please input a number');
    if (rowsAndColumns < 5 || rowsAndColumns > 100) return alert('Please input a number between 5 to 100.');
    createDivs(rowsAndColumns);
});

createDivs(16);