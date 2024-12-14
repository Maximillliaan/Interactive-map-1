// Grundlegende Canvas-Initialisierung
const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');

// Größe des Canvas
canvas.width = 800;
canvas.height = 600;

// Noise-Bibliothek laden (entweder als externe Bibliothek oder selbst geschrieben)
const simplex = new SimplexNoise();

// Zeichne Karte
function generateMap() {
  const resolution = 10; // Größe der Pixel
  for (let x = 0; x < canvas.width; x += resolution) {
    for (let y = 0; y < canvas.height; y += resolution) {
      const value = simplex.noise2D(x * 0.01, y * 0.01); // Perlin-Noise
      const color = value > 0 ? `rgb(34, 139, 34)` : `rgb(0, 0, 255)`; // Grün für Land, Blau für Wasser
      ctx.fillStyle = color;
      ctx.fillRect(x, y, resolution, resolution);
    }
  }
}

generateMap();
