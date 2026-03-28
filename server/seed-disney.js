/* ========================================
   SCRIPT: INSERTAR PAQUETES DISNEY
   ======================================== */

const mongoose = require('mongoose');
require('dotenv').config();
const Producto = require('./models/Producto');

// Paquetes Disney
const paquetesDisney = [
    {
        nombre: 'Disney World 5 Noches',
        tipo: 'disney',
        descripcion: 'Experiencia completa en Magic Kingdom, Epcot, Hollywood Studios y Animal Kingdom.',
        duracion_dias: 5,
        precio_base: 1800,
        caracteristicas: ['Hotel 4 estrellas', 'Entradas a 4 parques', 'Transporte', 'Desayuno incluido'],
        destino: 'Orlando, Florida'
    },
    {
        nombre: 'Disney World 7 Noches',
        tipo: 'disney',
        descripcion: 'Paquete completo con tiempo de relajación en resort. Acceso a todos los parques temáticos.',
        duracion_dias: 7,
        precio_base: 2400,
        caracteristicas: ['Hotel 5 estrellas', 'Entradas a 4 parques', 'Transporte VIP', 'Todas las comidas'],
        destino: 'Orlando, Florida'
    },
    {
        nombre: 'Disneyland California 4 Noches',
        tipo: 'disney',
        descripcion: 'Disneyland Resort en Anaheim con parques temáticos y aventuras para toda la familia.',
        duracion_dias: 4,
        precio_base: 1600,
        caracteristicas: ['Hotel frente al parque', 'Entradas a 2 parques', 'Desayuno y almuerzo'],
        destino: 'Anaheim, California'
    },
    {
        nombre: 'Disney Cruise Line 7 Días',
        tipo: 'disney',
        descripcion: 'Crucero mágico con entretenimiento Disney, personajes y destinos caribeños.',
        duracion_dias: 7,
        precio_base: 2200,
        caracteristicas: ['Crucero Disney', 'Camarote familiar', 'Todas las comidas', 'Entretenimiento'],
        destino: 'Caribe'
    },
    {
        nombre: 'Disney World + Orlando 10 Noches',
        tipo: 'disney',
        descripcion: 'Combo: Disney World (5 noches) + Universal Studios y parques de Orlando (5 noches).',
        duracion_dias: 10,
        precio_base: 3500,
        caracteristicas: ['Hoteles 4-5 estrellas', 'Todos los parques', 'Transporte completo', 'Comidas variadas'],
        destino: 'Orlando, Florida'
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Conectado a MongoDB');

        const resultado = await Producto.insertMany(paquetesDisney);
        console.log(`\n✅ ${resultado.length} paquetes Disney insertados exitosamente!\n`);

        resultado.forEach((paquete, index) => {
            console.log(`${index + 1}. ${paquete.nombre} - ${paquete.duracion} noches - $${paquete.precio}`);
        });

        console.log('\n✅ Script completado');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

seed();
