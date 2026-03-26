/* ========================================
   AUTENTICACION - SISTEMA COMPLETO
   ======================================== */

class SistemaAutenticacion {
    constructor() {
        this.token = localStorage.getItem('token_luchris');
        this.usuario = JSON.parse(localStorage.getItem('usuario_luchris') || 'null');
        this.inicializar();
    }

    // VERIFICAR SI ESTÁ AUTENTICADO
    estaAutenticado() {
        return !!this.token && !!this.usuario;
    }

    // OBTENER USUARIO ACTUAL
    obtenerUsuario() {
        return this.usuario;
    }

    // OBTENER TOKEN
    obtenerToken() {
        return this.token;
    }

    // LOGIN
    async login(email, contrasena) {
        try {
            const response = await fetch(CONFIG.obtenerURL(CONFIG.USUARIOS.LOGIN), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, contrasena })
            });

            const data = await response.json();

            if (data.success) {
                this.setToken(data.token);
                this.setUsuario(data.usuario);
                return { success: true, usuario: data.usuario };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // REGISTRO
    async registro(datosUsuario) {
        try {
            const response = await fetch(CONFIG.obtenerURL(CONFIG.USUARIOS.REGISTRO), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosUsuario)
            });

            const data = await response.json();

            if (data.success) {
                this.setToken(data.token);
                this.setUsuario(data.usuario);
                return { success: true, usuario: data.usuario };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // LOGOUT
    logout() {
        localStorage.removeItem('token_luchris');
        localStorage.removeItem('usuario_luchris');
        this.token = null;
        this.usuario = null;
        window.location.href = 'index.html';
    }

    // GUARDAR TOKEN
    setToken(token) {
        this.token = token;
        localStorage.setItem('token_luchris', token);
    }

    // GUARDAR USUARIO
    setUsuario(usuario) {
        this.usuario = usuario;
        localStorage.setItem('usuario_luchris', JSON.stringify(usuario));
    }

    // INICIALIZAR - ACTUALIZAR NAVBAR
    inicializar() {
        this.actualizarNavbar();
    }

    // ACTUALIZAR NAVBAR
    actualizarNavbar() {
        const navbar = document.querySelector('.nav-menu');
        if (!navbar) return;

        // Remover botones de auth anteriores
        const botonesAuth = navbar.querySelectorAll('.btn-auth-nav');
        botonesAuth.forEach(btn => btn.remove());

        // Crear nuevo botón
        if (this.estaAutenticado()) {
            // Usuario autenticado
            const btnPerfil = document.createElement('li');
            btnPerfil.className = 'btn-auth-nav';
            btnPerfil.innerHTML = `
                <a href="perfil.html">👤 ${this.usuario.nombre}</a>
            `;
            navbar.insertBefore(btnPerfil, navbar.lastElementChild);

            const btnLogout = document.createElement('li');
            btnLogout.className = 'btn-auth-nav';
            btnLogout.innerHTML = `<a href="#" onclick="autenticacion.logout(); return false;">🚪 Cerrar Sesión</a>`;
            navbar.appendChild(btnLogout);
        } else {
            // No autenticado
            const btnLogin = document.createElement('li');
            btnLogin.className = 'btn-auth-nav';
            btnLogin.innerHTML = `<a href="login.html">🔓 Iniciar Sesión</a>`;
            navbar.insertBefore(btnLogin, navbar.lastElementChild);

            const btnRegistro = document.createElement('li');
            btnRegistro.className = 'btn-auth-nav';
            btnRegistro.innerHTML = `<a href="registro.html" class="btn-registro">📝 Registrarse</a>`;
            navbar.insertBefore(btnRegistro, navbar.lastElementChild);
        }
    }

    // REQUIERE AUTENTICACION - REDIRIGE SI NO ESTÁ AUTENTICADO
    requerirAutenticacion() {
        if (!this.estaAutenticado()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    // OBTENER HEADERS CON AUTENTICACION
    obtenerHeaders() {
        const headers = {
            'Content-Type': 'application/json'
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        return headers;
    }

    // LLAMADA API CON AUTENTICACION
    async llamadaAPI(url, options = {}) {
        const headers = this.obtenerHeaders();
        const respuesta = await fetch(url, {
            ...options,
            headers: { ...headers, ...options.headers }
        });

        // Si recibimos 401, el token expiró
        if (respuesta.status === 401) {
            this.logout();
            return null;
        }

        return respuesta.json();
    }
}

// ========================================
// INICIALIZAR GLOBALMENTE
// ========================================

let autenticacion;

document.addEventListener('DOMContentLoaded', () => {
    autenticacion = new SistemaAutenticacion();
});

console.log('✅ Sistema de Autenticación Cargado');
