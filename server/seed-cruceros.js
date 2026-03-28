/* ========================================
   SCRIPT: INSERTAR CRUCEROS INICIALES
   ======================================== */

const mongoose = require('mongoose');
require('dotenv').config();
const Crucero = require('./models/Crucero');

// Datos de cruceros marítimos del PDF
const crucerosMaritimosPDF = [
    {
        nombre: 'MSC Seaview',
        naviera: 'MSC Cruises',
        descripcion: 'Ideal sin visa desde RD, perfecto para familias y grupos.',
        duracion: 7,
        salida: 'Republica Dominicana',
        servicios: ['Entretenimiento', 'Restaurante', 'Spa', 'Camarotes con balcón']
    },
    {
        nombre: 'Costa Pacifica',
        naviera: 'Costa Cruises',
        descripcion: 'Ambiente europeo con entretenimiento y gastronomía italiana.',
        duracion: 7,
        salida: 'Republica Dominicana',
        servicios: ['Gastronomía italiana', 'Entretenimiento europeo', 'Teatro', 'Discoteca']
    },
    {
        nombre: 'Norwegian Sky',
        naviera: 'Norwegian Cruise Line',
        descripcion: 'Viaje económico entre continentes.',
        duracion: 11,
        salida: 'Miami',
        servicios: ['Transatlántico', 'Económico', 'Entretenimiento', 'Buffet']
    },
    {
        nombre: 'Wonder of the Seas',
        naviera: 'Royal Caribbean',
        descripcion: 'Uno de los cruceros más grandes del mundo.',
        duracion: 7,
        salida: 'Republica Dominicana',
        servicios: ['Mega-barco', 'Parque acuático', 'Teatro Broadway', 'Entretenimiento familiar']
    },
    {
        nombre: 'Disney Wish',
        naviera: 'Disney Cruise Line',
        descripcion: 'Experiencia mágica para familias.',
        duracion: 4,
        salida: 'Miami',
        servicios: ['Personajes Disney', 'Entretenimiento infantil', 'Restaurante temático', 'Piscina familiar']
    },
    {
        nombre: 'Celebrity Edge',
        naviera: 'Celebrity Cruises',
        descripcion: 'Crucero premium moderno.',
        duracion: 7,
        salida: 'Republica Dominicana',
        servicios: ['Lujo premium', 'Restaurante Michelin', 'Camarotes amplios', 'Spa de clase mundial']
    }
];

// Función para conectar a MongoDB e insertar datos
async function seed() {
    try {
        // Conectar a MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Conectado a MongoDB');

        // Limpiar cruceros existentes (opcional - comentar si no deseas)
        // await Crucero.deleteMany({});
        // console.log('🗑️ Cruceros previos eliminados');

        // Insertar nuevos cruceros
        const resultado = await Crucero.insertMany(crucerosMaritimosPDF);
        console.log(`\n✅ ${resultado.length} cruceros insertados exitosamente!\n`);

        // Mostrar resumen
        resultado.forEach((crucero, index) => {
            console.log(`${index + 1}. ${crucero.nombre} (${crucero.naviera}) - ${crucero.duracion} noches - $${crucero._id}`);
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
