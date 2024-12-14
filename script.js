const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');

// Canvas-Größe
canvas.width = 800;
canvas.height = 600;

// Zustand und Datenstrukturen
let isDrawing = false;
let currentPath = [];
let paths = [];

// Event-Listener für das Zeichnen
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

function startDrawing(event) {
  isDrawing = true;
  currentPath = [];
}

function draw(event) {
  if (!isDrawing) return;

  const x = event.offsetX;
  const y = event.offsetY;
  currentPath.push({ x, y });

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  redrawPaths();
  drawPath(currentPath, 'blue');
}

function stopDrawing() {
  isDrawing = false;
  if (currentPath.length > 0) {
    paths.push(currentPath);
  }
  currentPath = [];
  detectAndFillClosedAreas();
}

// Zeichnet einen Pfad
function drawPath(path, color = 'black') {
  if (path.length < 2) return;

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.moveTo(path[0].x, path[0].y);
  for (let i = 1; i < path.length; i++) {
    ctx.lineTo(path[i].x, path[i].y);
  }
  ctx.stroke();
}

// Zeichnet alle Pfade neu
function redrawPaths() {
  paths.forEach(path => drawPath(path));
}

// Geschlossene Flächen erkennen und füllen
function detectAndFillClosedAreas() {
  paths.forEach(path => {
    if (path.length < 3) return;

    const start = path[0];
    const end = path[path.length - 1];
    const distance = Math.sqrt(
      Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2)
    );

    if (distance < 10) {
      fillArea(path);
    }
  });
}

// Fläche füllen
function fillArea(path) {
  ctx.beginPath();
  ctx.moveTo(path[0].x, path[0].y);
  for (let i = 1; i < path.length; i++) {
    ctx.lineTo(path[i].x, path[i].y);
  }
  ctx.closePath();
  ctx.fillStyle = 'rgba(0, 128, 0, 0.5)';
  ctx.fill();
}
