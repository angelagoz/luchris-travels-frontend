/* ========================================
   MODELO: COTIZACIÓN
   ======================================== */

const mongoose = require('mongoose');

const cotizacionSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    telefono: String,
    fecha: { type: Date, default: Date.now },
    camarote: String,
    pasajeros: Number,
    comentarios: String,
    items: Array,
    monto_total: Number,
    tipo: String,
    estado: { type: String, default: 'nueva' },
    respuesta: Object,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cotizacion', cotizacionSchema);
