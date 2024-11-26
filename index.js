const GRID_WIDTH_IN_PX = 500;

const grid = document.querySelector(".grid");
const squaresPerSideInput = document.querySelector("#squaresPerSideInput");
const colorPickerInput = document.querySelector("#colorInput");
const resetButton = document.querySelector("#resetGridButton");

const initialNumberOfSquaresPerSide = squaresPerSideInput.value;
let isMouseDown = false;
let currentBrushColor = colorPickerInput.value;

const addMouseListeners = () => {
  document.addEventListener("mousedown", () => (isMouseDown = true));
  document.addEventListener("mouseup", () => (isMouseDown = false));
};

const setGridContainerDimensions = () => {
  grid.style.width = `${GRID_WIDTH_IN_PX}px`;
};

const paintCell = (cell) => {
  cell.style.backgroundColor = currentBrushColor;
};

const resetGrid = () => generateGrid(squaresPerSideInput.value);

const generateGrid = (side) => {
  grid.innerHTML = "";
  for (let i = 0; i < side ** 2; i++) {
    const cell = document.createElement("div");

    cell.style.width = `${GRID_WIDTH_IN_PX / side}px`;
    cell.classList.add("cell");

    grid.appendChild(cell);
  }
};

function main() {
  addMouseListeners();
  setGridContainerDimensions();
  generateGrid(initialNumberOfSquaresPerSide);

  colorPickerInput.addEventListener("change", (e) => {
    currentBrushColor = e.target.value;
  });

  grid.addEventListener("mouseover", (e) => {
    if (isMouseDown) {
      paintCell(e.target);
    }
  });

  squaresPerSideInput.addEventListener("change", (e) => {
    resetGrid();
    if (e.target.value > 100) e.target.value = 100;
    if (e.target.value < 4) e.target.value = 4;
    generateGrid(e.target.value);
  });

  resetButton.addEventListener("click", resetGrid);
}

main();
