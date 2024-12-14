const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');

// Canvas-Größe
canvas.width = 800;
canvas.height = 600;

// Initialisiere den Canvas mit Hintergrundfarbe
function initializeCanvas() {
  ctx.fillStyle = '#8B4513'; // Dunkles Braun
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
initializeCanvas();

// Berge zeichnen
function drawMountain(x, y) {
  ctx.beginPath();
  ctx.moveTo(x, y); // Spitze des Dreiecks
  ctx.lineTo(x - 15, y + 30); // Linke Basis
  ctx.lineTo(x + 15, y + 30); // Rechte Basis
  ctx.closePath();
  ctx.fillStyle = '#A0522D'; // Braun für Berge
  ctx.fill();
  ctx.stroke();
}

function drawMountainChain(points) {
  points.forEach(point => drawMountain(point.x, point.y));
}

function generateMountains() {
  const chainStartX = Math.random() * canvas.width * 0.8;
  const chainStartY = Math.random() * canvas.height * 0.8;
  const isChain = Math.random() > 0.5;

  if (isChain) {
    // Erzeuge eine Bergkette
    let points = [];
    for (let i = 0; i < 5; i++) {
      points.push({
        x: chainStartX + i * 30,
        y: chainStartY + Math.random() * 20 - 10,
      });
    }
    drawMountainChain(points);
  } else {
    // Erzeuge einen einzelnen Berg
    drawMountain(chainStartX, chainStartY);
  }
}

// Wege mit Knotenpunkten
function drawPathWithNodes(path) {
  if (path.length < 2) return;

  ctx.beginPath();
  ctx.strokeStyle = '#000000'; // Schwarz für Wege
  ctx.lineWidth = 2;
  ctx.moveTo(path[0].x, path[0].y);
  for (let i = 1; i < path.length; i++) {
    ctx.lineTo(path[i].x, path[i].y);
  }
  ctx.stroke();

  path.forEach(point => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700'; // Gold für Knotenpunkte
    ctx.fill();
    ctx.stroke();
  });
}

function generatePaths() {
  const startX = Math.random() * canvas.width;
  const startY = Math.random() * canvas.height;
  const path = [];

  for (let i = 0; i < 5; i++) {
    path.push({
      x: startX + i * 50 + Math.random() * 20 - 10,
      y: startY + Math.random() * 40 - 20,
    });
  }

  drawPathWithNodes(path);
}
