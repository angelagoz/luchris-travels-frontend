/* ========================================
   SCRIPT: INSERTAR CRUCEROS FLUVIALES
   ======================================== */

const mongoose = require('mongoose');
require('dotenv').config();
const Crucero = require('./models/Crucero');

// Datos de cruceros fluviales del PDF
const cruceirosFluvialesPDF = [
    {
        nombre: 'AmaMagna',
        naviera: 'AmaWaterways',
        descripcion: 'Experiencia de lujo en ríos europeos.',
        duracion: 7,
        salida: 'Alemania',
        servicios: ['Lujo premium', 'Restaurante gourmet', 'Excursiones incluidas', 'Crucero fluvial']
    },
    {
        nombre: 'Viking River Cruise',
        naviera: 'Viking',
        descripcion: 'Viaje cultural y relajado.',
        duracion: 8,
        salida: 'Alemania',
        servicios: ['Viaje cultural', 'Guías expertos', 'Excursiones', 'Crucero fluvial']
    }
];

// Función para conectar a MongoDB e insertar datos
async function seed() {
    try {
        // Conectar a MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Conectado a MongoDB');

        // Insertar nuevos cruceros fluviales
        const resultado = await Crucero.insertMany(cruceirosFluvialesPDF);
        console.log(`\n✅ ${resultado.length} cruceros fluviales insertados exitosamente!\n`);

        // Mostrar resumen
        resultado.forEach((crucero, index) => {
            console.log(`${index + 1}. ${crucero.nombre} (${crucero.naviera}) - ${crucero.duracion} noches - Salida: ${crucero.salida}`);
        });

        console.log('\n✅ Script completado');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Ejecutar
seed();
