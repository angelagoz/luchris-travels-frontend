/* ========================================
   FIX: AGREGAR ESTADO ACTIVO A PRODUCTOS
   ======================================== */

const mongoose = require('mongoose');
require('dotenv').config();
const Producto = require('./models/Producto');

async function fix() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Conectado a MongoDB');

        // Actualizar todos los productos para que tengan estado 'activo'
        const resultado = await Producto.updateMany(
            { estado: { $exists: false } },
            { $set: { estado: 'activo' } }
        );

        console.log(`✅ ${resultado.modifiedCount} productos actualizados a estado 'activo'`);
        console.log('✅ Script completado');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

fix();
