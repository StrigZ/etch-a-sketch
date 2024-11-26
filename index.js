const GRID_WIDTH_IN_PX = 500;

const grid = document.querySelector(".grid");
const squaresPerSideInput = document.querySelector("#squaresPerSideInput");
const colorPickerInput = document.querySelector("#colorInput");
const resetButton = document.querySelector("#resetGridButton");
const rainbowModeButton = document.querySelector("#rainbowModeButton");
const shadingModeButton = document.querySelector("#shadingModeCheckbox");

const initialNumberOfSquaresPerSide = squaresPerSideInput.value;
let isMouseDown = false;
let isRainbowModeOn = false;
let isShadingModeOn = false;
let currentBrushColor = colorPickerInput.value;

const addListeners = () => {
  document.addEventListener("mousedown", () => (isMouseDown = true));
  document.addEventListener("mouseup", () => (isMouseDown = false));

  colorPickerInput.addEventListener("change", (e) => {
    currentBrushColor = e.target.value;
  });

  grid.addEventListener("mouseover", (e) => {
    if (isMouseDown) {
      paintCell(e.target);
    }
  });

  grid.addEventListener("click", (e) => {
    if (e.target.classList.contains("grid")) {
      return;
    }

    paintCell(e.target);
  });

  squaresPerSideInput.addEventListener("change", (e) => {
    if (e.target.value > 100) e.target.value = 100;
    if (e.target.value < 4) e.target.value = 4;
    generateGrid(e.target.value);
  });

  resetButton.addEventListener("click", resetGrid);

  rainbowModeButton.addEventListener("click", (e) => {
    if (isRainbowModeOn) {
      isRainbowModeOn = false;
      e.target.classList.remove("active");
    } else {
      isRainbowModeOn = true;
      e.target.classList.add("active");
    }
  });

  shadingModeButton.addEventListener("change", (e) => {
    isShadingModeOn = !isShadingModeOn;
  });
};

const setGridContainerDimensions = () => {
  grid.style.width = `${GRID_WIDTH_IN_PX}px`;
  grid.style.height = `${GRID_WIDTH_IN_PX}px`;
};

const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const increaseBrightness = (cell) => {
  if (cell.style.filter) {
    const preValue = +cell.style.filter.match(/[0-9]+/g);
    if (preValue === 100) {
      return;
    }
    const newValue = preValue + 10;
    cell.style.filter = `brightness(${newValue}%)`;
  } else {
    cell.style.filter = "brightness(50%)";
  }
};

const paintCell = (cell) => {
  if (isRainbowModeOn) {
    cell.style.backgroundColor = getRandomColor();
  } else {
    cell.style.backgroundColor = currentBrushColor;
    if (isShadingModeOn) {
      increaseBrightness(cell);
    }
  }
};

const resetGrid = () => generateGrid(squaresPerSideInput.value);

const generateGrid = (side) => {
  grid.innerHTML = "";
  for (let i = 0; i < side ** 2; i++) {
    const cell = document.createElement("div");
    const gridSide = GRID_WIDTH_IN_PX;
    const cellSide = gridSide / side;

    cell.style.width = `${cellSide}px`;
    cell.classList.add("cell");

    grid.appendChild(cell);
  }
};

function main() {
  addListeners();
  setGridContainerDimensions();
  generateGrid(initialNumberOfSquaresPerSide);
}

main();
