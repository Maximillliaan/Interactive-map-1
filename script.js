const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
const generateButton = document.getElementById('generateButton');

// Canvas-Größe setzen
canvas.width = 800;
canvas.height = 600;

// Zustand für das Zeichnen
let isDrawing = false;
let points = []; // Für die generierten Striche

// Event-Listener für das Zeichnen
canvas.addEventListener('mousedown', () => { isDrawing = true; });
canvas.addEventListener('mouseup', () => { isDrawing = false; });
canvas.addEventListener('mousemove', drawLine);

// Funktion: Linie zeichnen
function drawLine(event) {
  if (!isDrawing) return;

  const x = event.offsetX;
  const y = event.offsetY;
  points.push({ x, y });

  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black';

  if (points.length > 1) {
    ctx.beginPath();
    const lastPoint = points[points.length - 2];
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
  }
}

// Funktion: Zufällige Karte generieren
function generateMap() {
  // Canvas zurücksetzen
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  points = []; // Striche löschen

  // Karte generieren
  const treeCount = 50; // Anzahl der Bäume
  const mountainCount = 20; // Anzahl der Berge

  // Bäume zeichnen (Kreise)
  for (let i = 0; i < treeCount; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = 10 + Math.random() * 10;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();
  }

  // Berge zeichnen (Dreiecke)
  for (let i = 0; i < mountainCount; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = 20 + Math.random() * 30;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - size / 2, y + size);
    ctx.lineTo(x + size / 2, y + size);
    ctx.closePath();
    ctx.fillStyle = 'brown';
    ctx.fill();
  }
}

// Event-Listener für den Generieren-Button
generateButton.addEventListener('click', generateMap);
