/* ========================================
   MODELO: PRODUCTO (Genérico)
   Usado para: Cruceros, Tours, Disney, etc.
   ======================================== */

const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    // Identificación
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        enum: ['crucero', 'cruceros', 'tour', 'tours', 'disney', 'universal', 'boleto', 'hotel', 'destino', 'destinos', 'parques', 'seguro'],
        required: true
    },
    descripcion: String,
    descripcion_larga: String,

    // Pricing
    precio_base: {
        type: Number,
        required: true
    },
    precio_final: Number,
    moneda: {
        type: String,
        default: 'USD'
    },

    // Ubicación/Destino
    destino: String,
    origen: String,
    duracion_dias: Number,

    // Fechas
    fecha_salida: Date,
    fecha_regreso: Date,
    disponible: {
        type: Boolean,
        default: true
    },

    // Fotos y Multimedia
    fotos: [{
        url: String,
        titulo: String,
        orden: Number
    }],
    videos: [{
        url: String,
        titulo: String,
        tipo: String // 'youtube', 'vimeo', 'directo'
    }],
    foto_principal: String, // URL de la foto principal

    // Detalles específicos
    capacidad: Number,
    reservas_actuales: {
        type: Number,
        default: 0
    },
    caracteristicas: [String], // ["Pool", "Restaurante", "Casino", etc]

    // Rating y Reviews
    calificacion: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    num_reviews: {
        type: Number,
        default: 0
    },

    // Estado
    estado: {
        type: String,
        enum: ['activo', 'inactivo', 'agotado'],
        default: 'activo'
    },

    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Producto', productoSchema);
