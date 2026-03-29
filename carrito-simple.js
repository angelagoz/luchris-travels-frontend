// CARRITO MEJORADO CON LOCALSTORAGE
localStorage.setItem('carrito_productos', JSON.stringify([]));

function agregarCarrito(nombre, precio, tipo) {
    let carrito = JSON.parse(localStorage.getItem('carrito_productos')) || [];
    carrito.push({ nombre, precio, tipo, id: Date.now() });
    localStorage.setItem('carrito_productos', JSON.stringify(carrito));
    alert('✅ ' + nombre + ' agregado al carrito!');
    actualizarContador();
    guardarEnHistorico(nombre, precio);
}

function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito_productos')) || [];
    carrito = carrito.filter(p => p.id !== id);
    localStorage.setItem('carrito_productos', JSON.stringify(carrito));
    actualizarContador();
}

function vaciarCarrito() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        localStorage.setItem('carrito_productos', JSON.stringify([]));
        actualizarContador();
        alert('✅ Carrito vaciado');
    }
}

function obtenerTotalCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito_productos')) || [];
    return carrito.reduce((total, p) => total + p.precio, 0);
}

function obtenerCantidadProductos() {
    let carrito = JSON.parse(localStorage.getItem('carrito_productos')) || [];
    return carrito.length;
}

function actualizarContador() {
    let carrito = JSON.parse(localStorage.getItem('carrito_productos')) || [];
    let contador = document.getElementById('carrito-count');
    if (contador) {
        contador.textContent = carrito.length;
        contador.style.display = carrito.length > 0 ? 'block' : 'none';
    }
    // Mostrar badge de total en navbar si existe
    let totalBadge = document.getElementById('carrito-total');
    if (totalBadge) {
        let total = obtenerTotalCarrito();
        totalBadge.textContent = '$' + total.toLocaleString();
    }
}

function guardarEnHistorico(nombre, precio) {
    let historico = JSON.parse(localStorage.getItem('historial_visitas')) || [];
    historico.push({
        producto: nombre,
        precio: precio,
        fecha: new Date().toLocaleString(),
        id: Date.now()
    });
    // Guardar solo últimas 10 visitas
    if (historico.length > 10) {
        historico = historico.slice(-10);
    }
    localStorage.setItem('historial_visitas', JSON.stringify(historico));
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarContador();
});
