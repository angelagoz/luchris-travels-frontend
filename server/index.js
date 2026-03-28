/* ========================================
   LUCHRIS TRAVELS - SERVIDOR BACKEND
   ======================================== */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========================================
// SERVIR ARCHIVOS ESTÁTICOS (CMS y Frontend)
// ========================================

app.use('/cms', express.static('../cms'));
app.use(express.static('../'));

// ========================================
// CONEXION A MONGODB
// ========================================

const conectarBD = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Conectado a MongoDB');
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error);
        process.exit(1);
    }
};

conectarBD();

// ========================================
// RUTAS
// ========================================

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', mensaje: 'Servidor LUCHRIS TRAVELS funcionando' });
});

// INIT DB - Agregar productos iniciales
app.get('/api/init-db', async (req, res) => {
    try {
        const Producto = require('./models/Producto');
        const count = await Producto.countDocuments();
        if (count > 0) return res.json({ success: true, mensaje: `Ya hay ${count} productos` });

        const productos = [
            { nombre: 'Oasis of the Seas', tipo: 'crucero', descripcion: 'Crucero de lujo por el Caribe.', precio_base: 1299, origen: 'Santo Domingo', destino: 'Caribe', duracion_dias: 7, caracteristicas: ['Piscina', 'Restaurante', 'Casino'], fotos: [{ url: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&h=300&fit=crop', titulo: 'Crucero', orden: 1 }], calificacion: 4.9, num_reviews: 523, estado: 'activo' },
            { nombre: 'Symphony of the Seas', tipo: 'crucero', descripcion: 'Tecnología y entretenimiento premium.', precio_base: 1499, origen: 'Santo Domingo', destino: 'Caribe', duracion_dias: 7, caracteristicas: ['SPA', 'Restaurante'], fotos: [{ url: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=500&h=300&fit=crop', titulo: 'Symphony', orden: 1 }], calificacion: 4.8, num_reviews: 412, estado: 'activo' },
            { nombre: 'Tour Estambul - Cappadocia', tipo: 'tour', descripcion: 'Turquía con vuelos en globo aerostático.', precio_base: 1899, destino: 'Turquía', duracion_dias: 10, caracteristicas: ['Globos', 'Hoteles 5 estrellas'], fotos: [{ url: 'https://images.unsplash.com/photo-1568876694728-451bbf694b39?w=500&h=300&fit=crop', titulo: 'Turquia', orden: 1 }], calificacion: 4.9, num_reviews: 287, estado: 'activo' },
            { nombre: 'Tour Dubái & Abu Dhabi', tipo: 'tour', descripcion: 'Desierto, playas y modernidad.', precio_base: 2199, destino: 'Emiratos', duracion_dias: 8, caracteristicas: ['Safari', 'Burj Khalifa'], fotos: [{ url: 'https://images.unsplash.com/photo-1512453694694-ffc87bad4701?w=500&h=300&fit=crop', titulo: 'Dubai', orden: 1 }], calificacion: 4.8, num_reviews: 198, estado: 'activo' },
            { nombre: 'Disney World - Orlando', tipo: 'disney', descripcion: 'Parque temático más icónico del mundo.', precio_base: 899, destino: 'Orlando USA', duracion_dias: 5, caracteristicas: ['Magic Kingdom', 'EPCOT', 'Hollywood'], fotos: [{ url: 'https://images.unsplash.com/photo-1546576389-4d0d3cad0784?w=500&h=300&fit=crop', titulo: 'Disney', orden: 1 }], calificacion: 4.9, num_reviews: 789, estado: 'activo' },
            { nombre: 'Universal Studios - Orlando', tipo: 'disney', descripcion: 'Harry Potter y Jurassic World.', precio_base: 799, destino: 'Orlando USA', duracion_dias: 3, caracteristicas: ['Harry Potter', 'Transformers', 'Minions'], fotos: [{ url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=300&fit=crop', titulo: 'Universal', orden: 1 }], calificacion: 4.7, num_reviews: 456, estado: 'activo' },
            { nombre: 'Santo Domingo - Madrid', tipo: 'boleto', descripcion: 'Vuelo transatlántico con escala.', precio_base: 650, origen: 'SDQ', destino: 'MAD', duracion_dias: 1, caracteristicas: ['Directo', 'Comida incluida'], fotos: [{ url: 'https://images.unsplash.com/photo-1552866332-6f991c1d638f?w=500&h=300&fit=crop', titulo: 'Madrid', orden: 1 }], calificacion: 4.8, num_reviews: 245, estado: 'activo' },
            { nombre: 'Santo Domingo - Bogotá', tipo: 'boleto', descripcion: 'Conexión a Sudamérica. Económico.', precio_base: 320, origen: 'SDQ', destino: 'BOG', duracion_dias: 1, caracteristicas: ['1 conexion', 'Economico'], fotos: [{ url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop', titulo: 'Bogota', orden: 1 }], calificacion: 4.5, num_reviews: 182, estado: 'activo' },
            { nombre: 'Santo Domingo - Cancún', tipo: 'boleto', descripcion: 'Acceso a playas mexicanas.', precio_base: 290, origen: 'SDQ', destino: 'CUN', duracion_dias: 1, caracteristicas: ['Directo', 'Playas'], fotos: [{ url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=300&fit=crop', titulo: 'Cancun', orden: 1 }], calificacion: 4.6, num_reviews: 198, estado: 'activo' },
            { nombre: 'Santo Domingo - Puerto Rico', tipo: 'boleto', descripcion: 'Vuelo corto ideal fin de semana.', precio_base: 230, origen: 'SDQ', destino: 'SJU', duracion_dias: 1, caracteristicas: ['Corto', 'Rapido'], fotos: [{ url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop', titulo: 'Puerto Rico', orden: 1 }], calificacion: 4.7, num_reviews: 156, estado: 'activo' },
            { nombre: 'Barceló Bávaro Grand Resort', tipo: 'hotel', descripcion: 'Resort 5 estrellas all-inclusive Punta Cana.', precio_base: 450, destino: 'Punta Cana', duracion_dias: 3, caracteristicas: ['All-inclusive', 'Playas privadas', 'Spa'], fotos: [{ url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop', titulo: 'Barcelo', orden: 1 }], calificacion: 4.8, num_reviews: 412, estado: 'activo' },
            { nombre: 'Meliá Caribe Tropical', tipo: 'hotel', descripcion: 'All-inclusive con animación nocturna.', precio_base: 380, destino: 'Punta Cana', duracion_dias: 3, caracteristicas: ['All-inclusive', 'Entretenimiento'], fotos: [{ url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=300&fit=crop', titulo: 'Melia', orden: 1 }], calificacion: 4.6, num_reviews: 356, estado: 'activo' },
            { nombre: 'Hard Rock Punta Cana', tipo: 'hotel', descripcion: 'Resort temático de rock premium.', precio_base: 520, destino: 'Punta Cana', duracion_dias: 3, caracteristicas: ['Tematico', 'Premium', 'Playas'], fotos: [{ url: 'https://images.unsplash.com/photo-1564501049351-005e2b74b612?w=500&h=300&fit=crop', titulo: 'Hard Rock', orden: 1 }], calificacion: 4.7, num_reviews: 298, estado: 'activo' }
        ];
        await Producto.insertMany(productos);
        res.json({ success: true, mensaje: `✅ ${productos.length} productos creados` });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

// Rutas de cruceros
app.use('/api/cruceros', require('./routes/cruceros'));

// Rutas de usuarios
app.use('/api/usuarios', require('./routes/usuarios'));

// Rutas de reservas
app.use('/api/reservas', require('./routes/reservas'));

// Rutas de pagos
app.use('/api/pagos', require('./routes/pagos'));

// Rutas de cotizaciones
app.use('/api/cotizaciones', require('./routes/cotizaciones'));

// Rutas de productos (cruceros, tours, disney)
app.use('/api/productos', require('./routes/productos'));

// ========================================
// MANEJO DE ERRORES
// ========================================

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Error interno del servidor',
        mensaje: err.message
    });
});

// ========================================
// INICIAR SERVIDOR
// ========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor LUCHRIS TRAVELS ejecutándose en puerto ${PORT}`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`⏰ Iniciado: ${new Date().toISOString()}`);
});
// Force redeploy Sat Mar 28 16:28:24     2026
