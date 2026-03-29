// ============================================
// MINIFICACIÓN DE ARCHIVOS CSS Y JS
// ============================================

const fs = require('fs');
const path = require('path');

// Función simple para minificar CSS
function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remover comentarios /* */
    .replace(/\/\/.*$/gm, '') // Remover comentarios //
    .replace(/\s+/g, ' ') // Remover espacios múltiples
    .replace(/\s*([{}:;,>+~])\s*/g, '$1') // Remover espacios alrededor de caracteres especiales
    .replace(/;\}/g, '}') // Remover punto y coma antes de }
    .trim();
}

// Función simple para minificar JavaScript
function minifyJS(js) {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remover comentarios /* */
    .replace(/\/\/.*$/gm, '') // Remover comentarios //
    .replace(/\n\s*\n/g, '\n') // Remover líneas vacías múltiples
    .replace(/\s+/g, ' ') // Remover espacios múltiples
    .replace(/\s*([{}:;,()[\]<>=!&|?+\-*/])\s*/g, '$1') // Remover espacios alrededor de operadores
    .trim();
}

// Archivos a minificar
const files = [
  {
    src: './styles.css',
    dest: './styles.min.css',
    minifier: minifyCSS
  },
  {
    src: './script.js',
    dest: './script.min.js',
    minifier: minifyJS
  },
  {
    src: './carrito-simple.js',
    dest: './carrito-simple.min.js',
    minifier: minifyJS
  },
  {
    src: './lazy-load.js',
    dest: './lazy-load.min.js',
    minifier: minifyJS
  },
  {
    src: './config.js',
    dest: './config.min.js',
    minifier: minifyJS
  }
];

console.log('🔄 Iniciando minificación...\n');

files.forEach(file => {
  try {
    const filePath = path.join(__dirname, file.src);
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Archivo no encontrado: ${file.src}`);
      return;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const minified = file.minifier(content);

    const destPath = path.join(__dirname, file.dest);
    fs.writeFileSync(destPath, minified, 'utf8');

    const originalSize = (Buffer.byteLength(content) / 1024).toFixed(2);
    const minifiedSize = (Buffer.byteLength(minified) / 1024).toFixed(2);
    const reduction = (((1 - minifiedSize / originalSize) * 100).toFixed(1));

    console.log(`✅ ${file.src}`);
    console.log(`   Original: ${originalSize} KB → Minified: ${minifiedSize} KB (${reduction}% reducción)\n`);

  } catch (error) {
    console.error(`❌ Error minificando ${file.src}:`, error.message);
  }
});

console.log('✅ Minificación completada');
console.log('\n📝 Próximo paso: Actualiza index.html y producto-detalle.html para usar archivos .min.css y .min.js');
