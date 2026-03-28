/**
 * Sistema de Autenticación del CMS LUCHRIS TRAVELS
 * Este archivo proporciona funciones para verificar y gestionar sesiones
 */

// Verificar si existe sesión activa
function verificarAutenticacion() {
    const sesion = JSON.parse(localStorage.getItem('cms_sesion'));

    // Si no hay sesión o ha expirado, redirigir a login
    if (!sesion || !sesion.activa) {
        // Guardar página actual para redirigir después del login
        const paginaActual = window.location.pathname;
        localStorage.setItem('cms_pagina_destino', paginaActual);
        window.location.href = 'login.html';
        return false;
    }

    return true;
}

// Obtener datos de sesión actual
function obtenerSesion() {
    return JSON.parse(localStorage.getItem('cms_sesion'));
}

// Obtener datos del usuario actual
function obtenerUsuarioActual() {
    const sesion = obtenerSesion();
    return {
        id: sesion?.usuario_id,
        usuario: sesion?.usuario,
        nombre: sesion?.nombre,
        rol: sesion?.rol,
        email: sesion?.email
    };
}

// Verificar si el usuario tiene un rol específico
function tieneRol(rolRequerido) {
    const sesion = obtenerSesion();
    return sesion?.rol === rolRequerido || sesion?.rol === 'admin';
}

// Mostrar información del usuario en la página
function mostrarUsuarioActual() {
    const usuario = obtenerUsuarioActual();
    const elementoUsuario = document.getElementById('usuario-actual');

    if (elementoUsuario && usuario.nombre) {
        elementoUsuario.textContent = usuario.nombre;
    }
}

// Cerrar sesión (logout)
function logout() {
    if (confirm('¿Estás seguro de que deseas salir del CMS?')) {
        localStorage.removeItem('cms_sesion');
        localStorage.removeItem('cms_pagina_destino');
        window.location.href = 'login.html';
    }
}

// Ejecutar verificación cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación
    if (!window.location.pathname.includes('login.html')) {
        verificarAutenticacion();
    }

    // Mostrar usuario actual si el elemento existe
    mostrarUsuarioActual();

    // Usar función de logout global
    window.logout = logout;
});
