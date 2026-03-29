/* ========================================
   RUTAS: COTIZACIONES
   ======================================== */

const express = require('express');
const router = express.Router();
const Cotizacion = require('../models/Cotizacion');

// ========================================
// POST - CREAR NUEVA COTIZACIÓN
// ========================================

router.post('/', async (req, res) => {
    try {
        const { nombre, email, telefono, fecha, camarote, pasajeros, comentarios, items, monto_total } = req.body;

        // Validación básica
        if (!nombre || !email) {
            return res.status(400).json({
                success: false,
                error: 'Nombre y email son requeridos'
            });
        }

        // Crear nueva cotización (soporta dos tipos: reserva específica o carrito)
        const cotizacion = new Cotizacion({
            nombre,
            email,
            telefono: telefono || '',
            fecha: fecha || new Date(),
            camarote: camarote || 'No especificado',
            pasajeros: pasajeros || 1,
            comentarios: comentarios || '',
            // Nuevos campos para cotizaciones de carrito
            items: items || [],
            monto_total: monto_total || 0,
            tipo: items ? 'carrito' : 'reserva'
        });

        await cotizacion.save();

        console.log(`✅ Cotización creada: ${cotizacion._id}`);

        res.status(201).json({
            success: true,
            mensaje: 'Cotización recibida correctamente',
            cotizacion_id: cotizacion._id,
            cotizacionId: cotizacion._id
        });

    } catch (error) {
        console.error('Error creando cotización:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ========================================
// GET - OBTENER TODAS LAS COTIZACIONES (ADMIN)
// ========================================

router.get('/', async (req, res) => {
    try {
        // Aquí podría agregarse autenticación de admin
        const cotizaciones = await Cotizacion.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            cantidad: cotizaciones.length,
            datos: cotizaciones
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ========================================
// GET - OBTENER UNA COTIZACIÓN POR ID
// ========================================

router.get('/:id', async (req, res) => {
    try {
        const cotizacion = await Cotizacion.findById(req.params.id);

        if (!cotizacion) {
            return res.status(404).json({
                success: false,
                error: 'Cotización no encontrada'
            });
        }

        res.json({
            success: true,
            datos: cotizacion
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ========================================
// PUT - ACTUALIZAR ESTADO Y RESPUESTA
// ========================================

router.put('/:id', async (req, res) => {
    try {
        const { estado, respuesta } = req.body;

        const cotizacion = await Cotizacion.findByIdAndUpdate(
            req.params.id,
            {
                estado,
                respuesta: respuesta ? {
                    contenido: respuesta,
                    fecha: new Date(),
                    enviada_por: 'admin'
                } : undefined,
                updatedAt: new Date()
            },
            { new: true }
        );

        if (!cotizacion) {
            return res.status(404).json({
                success: false,
                error: 'Cotización no encontrada'
            });
        }

        // Enviar email si hay respuesta
        if (respuesta && cotizacion.respuesta && cotizacion.respuesta.contenido) {
            try {
                await enviarRespuestaCliente(cotizacion);
                console.log(`✅ Email de respuesta enviado a: ${cotizacion.email}`);
            } catch (emailError) {
                console.log('⚠️ Error enviando email de respuesta:', emailError.message);
            }
        }

        res.json({
            success: true,
            mensaje: 'Cotización actualizada',
            datos: cotizacion
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ========================================
// DELETE - ELIMINAR COTIZACIÓN
// ========================================

router.delete('/:id', async (req, res) => {
    try {
        const cotizacion = await Cotizacion.findByIdAndDelete(req.params.id);

        if (!cotizacion) {
            return res.status(404).json({
                success: false,
                error: 'Cotización no encontrada'
            });
        }

        res.json({
            success: true,
            mensaje: 'Cotización eliminada'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
