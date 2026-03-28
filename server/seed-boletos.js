/* ========================================
   SCRIPT: INSERTAR BOLETOS AÉREOS
   ======================================== */

const mongoose = require('mongoose');
require('dotenv').config();
const Producto = require('./models/Producto');

// Boletos Aéreos
const boletosAereos = [
    {
        nombre: 'Santo Domingo - Miami (Ida y Vuelta)',
        tipo: 'boleto',
        descripcion: 'Vuelos regulares con aerolíneas reconocidas. Equipaje incluido.',
        precio_base: 280,
        caracteristicas: ['Equipaje 23kg', 'Comida a bordo', 'Entretenimiento', 'WiFi'],
        origen: 'Santo Domingo (SDQ)',
        destino: 'Miami (MIA)',
        duracion_dias: 1
    },
    {
        nombre: 'Santo Domingo - Nueva York (Ida y Vuelta)',
        tipo: 'boleto',
        descripcion: 'Conexión directa. Perfecto para negocios o turismo en la Gran Manzana.',
        precio_base: 350,
        caracteristicas: ['Equipaje 23kg', 'Comida premium', 'Entretenimiento en vuelo', 'Asiento preferente'],
        origen: 'Santo Domingo (SDQ)',
        destino: 'Nueva York (JFK)',
        duracion_dias: 1
    },
    {
        nombre: 'Santo Domingo - San Juan, Puerto Rico (Ida y Vuelta)',
        tipo: 'boleto',
        descripcion: 'Vuelo corto (1 hora). Ideal para escapadas de fin de semana.',
        precio_base: 220,
        caracteristicas: ['Equipaje 23kg', 'Snack a bordo', 'WiFi gratis', 'Tarjeta de embarque digital'],
        origen: 'Santo Domingo (SDQ)',
        destino: 'San Juan (SJU)',
        duracion_dias: 1
    },
    {
        nombre: 'Santo Domingo - Cancún (Ida y Vuelta)',
        tipo: 'boleto',
        descripcion: 'Acceso a playas mexicanas y parques temáticos. Incluye documentación.',
        precio_base: 290,
        caracteristicas: ['Equipaje 23kg', 'Comida', 'Asiento seleccionado', 'Seguro de viaje'],
        origen: 'Santo Domingo (SDQ)',
        destino: 'Cancún (CUN)',
        duracion_dias: 1
    },
    {
        nombre: 'Santo Domingo - Madrid (Ida y Vuelta)',
        tipo: 'boleto',
        descripcion: 'Vuelo transatlántico. Puerta de entrada a Europa. Incluye escala.',
        precio_base: 650,
        caracteristicas: ['Equipaje 2x23kg', 'Comida completa', 'Entretenimiento premium', 'Asiento cómodo'],
        origen: 'Santo Domingo (SDQ)',
        destino: 'Madrid (MAD)',
        duracion_dias: 1
    },
    {
        nombre: 'Santo Domingo - Bogotá (Ida y Vuelta)',
        tipo: 'boleto',
        descripcion: 'Conexión a Sudamérica. Vuelo con conexión. Tarifas económicas.',
        precio_base: 320,
        caracteristicas: ['Equipaje 23kg', 'Comida', 'Conexión con tiempo', 'Sala de espera'],
        origen: 'Santo Domingo (SDQ)',
        destino: 'Bogotá (BOG)',
        duracion_dias: 1
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Conectado a MongoDB');

        const resultado = await Producto.insertMany(boletosAereos);
        console.log(`\n✅ ${resultado.length} boletos aéreos insertados exitosamente!\n`);

        resultado.forEach((boleto, index) => {
            console.log(`${index + 1}. ${boleto.nombre} - $${boleto.precio_base}`);
        });

        console.log('\n✅ Script completado');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

seed();
