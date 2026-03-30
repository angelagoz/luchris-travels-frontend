/* ========================================
   CONFIGURACION GLOBAL - LUCHRIS TRAVELS
   ======================================== */

// URL BASE DE LA API
const CONFIG = {
    API_URL: 'https://luchris-travels-backend.onrender.com/api',

    // Endpoints de usuarios
    USUARIOS: {
        LOGIN: '/usuarios/login',
        REGISTRO: '/usuarios/registro'
    },

    // Endpoints de cruceros
    CRUCEROS: {
        LISTAR: '/cruceros',
        OBTENER: '/cruceros/:id',
        CREAR: '/cruceros',
        ACTUALIZAR: '/cruceros/:id',
        ELIMINAR: '/cruceros/:id',
        BUSCAR: '/cruceros/buscar'
    },

    // Endpoints de reservas
    RESERVAS: {
        LISTAR: '/reservas',
        OBTENER: '/reservas/:id',
        CREAR: '/reservas',
        ACTUALIZAR: '/reservas/:id',
        ELIMINAR: '/reservas/:id'
    },

    // Endpoints de pagos
    PAGOS: {
        CREAR: '/pagos/crear-pago',
        DIRECTO: '/pagos/pago-directo',
        WEBHOOK: '/pagos/webhook',
        CONFIG: '/pagos/config'
    },

    // Clave pública de Stripe
    STRIPE_PUBLISHABLE_KEY: 'pk_test_51TFcKeAbjIyskxieV0OQLVBgjMzUadc6uSMbMYNkTKOcK1dvx8dGfDNyjfmHdtRoqkjlY45VRRFG6lmenGKuUbSS00eKRPrdc1',

    // Métodos auxiliares
    obtenerURL: function(endpoint) {
        return this.API_URL + endpoint;
    }
};

console.log('✅ Configuración Global Cargada');
console.log('API_URL:', CONFIG.API_URL);
