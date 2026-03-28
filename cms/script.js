/* ========================================
   CMS - JAVASCRIPT
   ======================================== */

// ========================================
// CONFIGURACION
// ========================================

const API_BASE = 'http://localhost:5000/api';
let currentTab = 'cruceros';
let currentEditId = null;
let itemsCache = {};

// Estructura de campos para cada tipo de producto
const fieldsConfig = {
    cruceros: [
        { name: 'nombre', label: 'Nombre del Crucero', type: 'text', required: true },
        { name: 'naviera', label: 'Naviera', type: 'text', required: true },
        { name: 'descripcion', label: 'Descripción', type: 'textarea', required: false },
        { name: 'duracion', label: 'Duración (días)', type: 'number', required: true },
        { name: 'salida', label: 'Salida desde', type: 'select', options: ['Republica Dominicana', 'Miami', 'Alemania', 'Austria', 'Francia', 'Hungría', 'Rumania', 'Holanda', 'Bélgica', 'Suiza', 'Italia', 'España', 'Portugal', 'Otros'], required: true },
        { name: 'servicios', label: 'Servicios (separados por coma)', type: 'textarea', required: false }
    ],
    tours: [
        { name: 'nombre', label: 'Nombre del Tour', type: 'text', required: true },
        { name: 'destino', label: 'Destino', type: 'text', required: true },
        { name: 'descripcion', label: 'Descripción', type: 'textarea', required: false },
        { name: 'duracion', label: 'Duración (días)', type: 'number', required: true },
        { name: 'precio', label: 'Precio por Persona ($)', type: 'number', required: true }
    ],
    disney: [
        { name: 'nombre', label: 'Nombre del Paquete', type: 'text', required: true },
        { name: 'descripcion', label: 'Descripción', type: 'textarea', required: false },
        { name: 'duracion', label: 'Duración (noches)', type: 'number', required: true },
        { name: 'precio', label: 'Precio por Persona ($)', type: 'number', required: true },
        { name: 'parques', label: 'Parques incluidos', type: 'textarea', required: true }
    ],
    hoteles: [
        { name: 'nombre', label: 'Nombre del Hotel', type: 'text', required: true },
        { name: 'ciudad', label: 'Ciudad', type: 'text', required: true },
        { name: 'descripcion', label: 'Descripción', type: 'textarea', required: false },
        { name: 'precioNoche', label: 'Precio por Noche ($)', type: 'number', required: true },
        { name: 'servicios', label: 'Servicios', type: 'textarea', required: false }
    ]
};

// ========================================
// INICIALIZACION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    inicializarCMS();
    cargarItems();
});

function inicializarCMS() {
    // Listeners de tabs
    document.querySelectorAll('.menu-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            cambiarTab(btn.getAttribute('data-tab'));
        });
    });

    // Botón nuevo
    document.getElementById('btn-nuevo-item').addEventListener('click', abrirModalNuevo);

    // Modal
    document.querySelector('.btn-cerrar').addEventListener('click', cerrarModal);
    document.querySelector('.btn-cancelar').addEventListener('click', cerrarModal);
    document.getElementById('form-editar').addEventListener('submit', guardarItem);

    // Logout
    document.querySelector('.btn-logout').addEventListener('click', () => {
        if (confirm('¿Cerrar sesión?')) {
            window.location.href = '../index.html';
        }
    });
}

// ========================================
// CAMBIAR TAB
// ========================================

function cambiarTab(tabName) {
    // Remover activo
    document.querySelectorAll('.menu-item').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

    // Agregar activo
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');

    // Actualizar titulo
    const titulos = {
        cruceros: 'Gestión de Cruceros',
        tours: 'Gestión de Tours',
        disney: 'Gestión de Paquetes Disney',
        hoteles: 'Gestión de Hoteles',
        reservas: 'Historial de Reservas',
        reportes: 'Reportes y Estadísticas'
    };
    document.getElementById('page-title').textContent = titulos[tabName];

    currentTab = tabName;

    if (tabName === 'reportes') {
        cargarReportes();
    } else if (tabName === 'reservas') {
        cargarReservas();
    } else {
        cargarItems();
    }
}

// ========================================
// CARGAR ITEMS
// ========================================

async function cargarItems() {
    const grid = document.getElementById(`${currentTab}-grid`);
    grid.innerHTML = '<p class="loading">Cargando...</p>';

    try {
        const response = await fetch(`${API_BASE}/cruceros`);
        const data = await response.json();

        if (data.success) {
            itemsCache[currentTab] = data.datos;
            mostrarItems(data.datos);
        } else {
            grid.innerHTML = '<p class="loading">Error al cargar datos</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        grid.innerHTML = '<p class="loading">Error de conexión</p>';
    }
}

function mostrarItems(items) {
    const grid = document.getElementById(`${currentTab}-grid`);

    if (items.length === 0) {
        grid.innerHTML = '<p class="loading">No hay items. Crea uno nuevo.</p>';
        return;
    }

    grid.innerHTML = items.map(item => `
        <div class="item-card">
            <div class="item-header">
                <h3>${item.nombre}</h3>
                <span class="item-badge">${item.naviera || item.destino || 'Activo'}</span>
            </div>
            <div class="item-details">
                <p><strong>Descripción:</strong> ${item.descripcion || 'N/A'}</p>
                <p><strong>Duración:</strong> ${item.duracion} ${currentTab === 'hoteles' ? 'noches' : 'días'}</p>
                ${item.salida ? `<p><strong>Salida:</strong> ${item.salida}</p>` : ''}
                ${item.precio ? `<p class="item-price">$${item.precio}</p>` : ''}
            </div>
            <div class="item-actions">
                <button class="btn-editar" onclick="editarItem('${item._id}')">✏️ Editar</button>
                <button class="btn-eliminar" onclick="confirmarEliminar('${item._id}')">🗑️ Eliminar</button>
            </div>
        </div>
    `).join('');
}

// ========================================
// MODAL: NUEVO ITEM
// ========================================

function abrirModalNuevo() {
    currentEditId = null;
    document.getElementById('modal-title').textContent = `Nuevo ${currentTab.slice(0, -1)}`;
    generarFormulario();
    document.getElementById('modal-editar').classList.add('active');
}

function generarFormulario() {
    const fields = fieldsConfig[currentTab] || [];
    const formFields = document.getElementById('form-fields');

    formFields.innerHTML = fields.map(field => {
        if (field.type === 'select') {
            return `
                <div class="form-group">
                    <label for="${field.name}">${field.label}</label>
                    <select id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>
                        <option value="">Seleccionar...</option>
                        ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>
                </div>
            `;
        } else if (field.type === 'textarea') {
            return `
                <div class="form-group">
                    <label for="${field.name}">${field.label}</label>
                    <textarea id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}></textarea>
                </div>
            `;
        } else {
            return `
                <div class="form-group">
                    <label for="${field.name}">${field.label}</label>
                    <input type="${field.type}" id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>
                </div>
            `;
        }
    }).join('');
}

// ========================================
// EDITAR ITEM
// ========================================

function editarItem(id) {
    currentEditId = id;
    const item = itemsCache[currentTab].find(i => i._id === id);

    if (!item) return;

    document.getElementById('modal-title').textContent = `Editar ${item.nombre}`;
    generarFormulario();

    // Llenar formulario con datos
    const fields = fieldsConfig[currentTab] || [];
    fields.forEach(field => {
        const input = document.getElementById(field.name);
        if (input) {
            input.value = item[field.name] || '';
        }
    });

    document.getElementById('modal-editar').classList.add('active');
}

// ========================================
// GUARDAR ITEM
// ========================================

async function guardarItem(e) {
    e.preventDefault();

    const formData = new FormData(document.getElementById('form-editar'));
    const data = Object.fromEntries(formData);

    try {
        const url = currentEditId
            ? `${API_BASE}/cruceros/${currentEditId}`
            : `${API_BASE}/cruceros`;

        const method = currentEditId ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            mostrarMensaje(result.mensaje, 'success');
            cerrarModal();
            cargarItems();
        } else {
            mostrarMensaje(result.error || 'Error al guardar', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al conectar con el servidor', 'error');
    }
}

// ========================================
// ELIMINAR ITEM
// ========================================

function confirmarEliminar(id) {
    const modal = document.getElementById('modal-confirmar');
    modal.classList.add('active');

    const btnEliminar = modal.querySelector('.btn-eliminar');
    btnEliminar.onclick = () => eliminarItem(id);
}

async function eliminarItem(id) {
    try {
        const response = await fetch(`${API_BASE}/cruceros/${id}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (result.success) {
            mostrarMensaje('Elemento eliminado correctamente', 'success');
            document.getElementById('modal-confirmar').classList.remove('active');
            cargarItems();
        } else {
            mostrarMensaje(result.error || 'Error al eliminar', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al conectar con el servidor', 'error');
    }
}

// ========================================
// RESERVAS
// ========================================

async function cargarReservas() {
    const tbody = document.getElementById('reservas-tbody');
    tbody.innerHTML = '<tr><td colspan="7" class="loading">Cargando...</td></tr>';

    try {
        // Por ahora mostrar mensaje
        tbody.innerHTML = '<tr><td colspan="7" class="loading">Próximamente: Gestión de Reservas</td></tr>';
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="7" class="loading">Error al cargar</td></tr>';
    }
}

// ========================================
// REPORTES
// ========================================

async function cargarReportes() {
    try {
        // Datos de ejemplo
        document.getElementById('total-ventas').textContent = '$24,500.00';
        document.getElementById('reservas-confirmadas').textContent = '45';
        document.getElementById('clientes-registrados').textContent = '128';
        document.getElementById('cruceros-activos').textContent = '12';
    } catch (error) {
        console.error('Error:', error);
    }
}

// ========================================
// UTILIDADES
// ========================================

function cerrarModal() {
    document.getElementById('modal-editar').classList.remove('active');
    document.getElementById('modal-confirmar').classList.remove('active');
}

function mostrarMensaje(texto, tipo) {
    const mensaje = document.createElement('div');
    mensaje.className = `${tipo}-message`;
    mensaje.textContent = texto;
    document.body.appendChild(mensaje);

    setTimeout(() => {
        mensaje.remove();
    }, 4000);
}

console.log('✅ CMS LUCHRIS TRAVELS - JavaScript cargado');
