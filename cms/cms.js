/* ========================================
   CMS - JAVASCRIPT
   ======================================== */

const API_BASE = 'http://localhost:5000/api';
let currentType = 'crucero';
let editingId = null;
let allItems = [];

// Configuración de campos por tipo de producto
const fieldsConfig = {
    crucero: [
        { name: 'nombre', label: 'Nombre del Crucero', type: 'text', required: true },
        { name: 'naviera', label: 'Naviera (ej: MSC, Costa, etc.)', type: 'text', required: true },
        { name: 'descripcion', label: 'Descripción', type: 'textarea', required: false },
        { name: 'duracion', label: 'Duración (días)', type: 'number', required: true },
        { name: 'salida', label: 'Salida desde', type: 'select', options: ['Republica Dominicana', 'Miami', 'Alemania', 'Austria', 'Francia', 'Hungría', 'Rumania', 'Holanda', 'Bélgica', 'Suiza', 'Italia', 'España', 'Portugal'], required: true },
        { name: 'servicios', label: 'Servicios (separados por coma)', type: 'textarea', required: false }
    ],
    boleto: [
        { name: 'nombre', label: 'Nombre del Vuelo (ej: SDQ-Miami)', type: 'text', required: true },
        { name: 'descripcion', label: 'Descripción del vuelo', type: 'textarea', required: false },
        { name: 'precio_base', label: 'Precio ($)', type: 'number', required: true },
        { name: 'origen', label: 'Aeropuerto Origen (ej: Santo Domingo - SDQ)', type: 'text', required: true },
        { name: 'destino', label: 'Aeropuerto Destino (ej: Miami - MIA)', type: 'text', required: true },
        { name: 'duracion_dias', label: 'Duración (días)', type: 'number', required: true },
        { name: 'caracteristicas', label: 'Características (separadas por coma)', type: 'textarea', required: false }
    ],
    disney: [
        { name: 'nombre', label: 'Nombre del Paquete', type: 'text', required: true },
        { name: 'descripcion', label: 'Descripción del paquete', type: 'textarea', required: false },
        { name: 'precio_base', label: 'Precio por persona ($)', type: 'number', required: true },
        { name: 'duracion_dias', label: 'Duración (noches)', type: 'number', required: true },
        { name: 'destino', label: 'Destino (ej: Orlando, California)', type: 'text', required: true },
        { name: 'caracteristicas', label: 'Características (separadas por coma)', type: 'textarea', required: false }
    ],
    tour: [
        { name: 'nombre', label: 'Nombre del Tour', type: 'text', required: true },
        { name: 'descripcion', label: 'Descripción del tour', type: 'textarea', required: false },
        { name: 'precio_base', label: 'Precio por persona ($)', type: 'number', required: true },
        { name: 'destino', label: 'Destino', type: 'text', required: true },
        { name: 'duracion_dias', label: 'Duración (días)', type: 'number', required: true },
        { name: 'caracteristicas', label: 'Características (separadas por coma)', type: 'textarea', required: false }
    ]
};

// Títulos por tipo
const titles = {
    crucero: 'Gestión de Cruceros',
    boleto: 'Gestión de Boletos Aéreos',
    disney: 'Gestión de Paquetes Disney',
    tour: 'Gestión de Tours'
};

// API endpoints por tipo
const endpoints = {
    crucero: '/cruceros',
    boleto: '/productos/tipo/boleto',
    disney: '/productos/tipo/disney',
    tour: '/productos/tipo/tour'
};

// ========================================
// INICIALIZACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Menu buttons
    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.addEventListener('click', () => cambiarTipo(btn.dataset.type));
    });

    // Nuevo button
    document.getElementById('btn-nuevo').addEventListener('click', abrirModal);

    // Modal buttons
    document.getElementById('btn-close-modal').addEventListener('click', cerrarModal);
    document.getElementById('btn-cancelar').addEventListener('click', cerrarModal);
    document.getElementById('form-producto').addEventListener('submit', guardarProducto);

    // Search
    document.getElementById('search-box').addEventListener('input', filtrarItems);

    // Cargar items iniciales
    cargarItems();
});

// ========================================
// CAMBIAR TIPO DE PRODUCTO
// ========================================

function cambiarTipo(type) {
    currentType = type;
    editingId = null;

    // Actualizar menu activo
    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.type === type);
    });

    // Actualizar título
    document.getElementById('section-title').textContent = titles[type];

    // Cargar items
    cargarItems();
}

// ========================================
// CARGAR ITEMS DEL API
// ========================================

async function cargarItems() {
    const container = document.getElementById('items-container');
    container.innerHTML = '<p class="loading-text">Cargando...</p>';

    try {
        const endpoint = endpoints[currentType];
        const response = await fetch(`${API_BASE}${endpoint}`);
        const data = await response.json();

        if (data.success && data.datos) {
            allItems = data.datos;
            mostrarItems(allItems);
        } else {
            container.innerHTML = '<p class="loading-text">Sin productos. ¡Crea uno nuevo!</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<p class="loading-text">Error al cargar datos</p>';
    }
}

// ========================================
// MOSTRAR ITEMS EN GRID
// ========================================

function mostrarItems(items) {
    const container = document.getElementById('items-container');

    if (items.length === 0) {
        container.innerHTML = '<p class="loading-text">Sin productos. ¡Crea uno nuevo!</p>';
        return;
    }

    container.innerHTML = items.map(item => crearCardHTML(item)).join('');

    // Agregar listeners
    container.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', () => editarProducto(btn.dataset.id));
    });

    container.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => eliminarProducto(btn.dataset.id, btn.dataset.nombre));
    });
}

// ========================================
// CREAR HTML DE TARJETA
// ========================================

function crearCardHTML(item) {
    const precio = item.precio_base || item.precio || 'N/A';
    const duracion = item.duracion_dias || item.duracion || 'N/A';
    const destino = item.destino || item.salida || '';

    return `
        <div class="item-card">
            <div class="item-header">
                <h3>${item.nombre}</h3>
            </div>
            <div class="item-meta">
                ${destino ? `<span>📍 ${destino}</span>` : ''}
                ${duracion !== 'N/A' ? `<span>⏱️ ${duracion} ${currentType === 'boleto' ? 'días' : 'noches'}</span>` : ''}
            </div>
            ${item.descripcion ? `<p class="item-desc">${item.descripcion.substring(0, 100)}...</p>` : ''}
            ${precio !== 'N/A' ? `<div class="item-price">$${precio}</div>` : ''}
            <div class="item-actions">
                <button class="btn-edit" data-id="${item._id}">✏️ Editar</button>
                <button class="btn-delete" data-id="${item._id}" data-nombre="${item.nombre}">🗑️ Eliminar</button>
            </div>
        </div>
    `;
}

// ========================================
// FILTRAR ITEMS
// ========================================

function filtrarItems() {
    const search = document.getElementById('search-box').value.toLowerCase();
    const filtered = allItems.filter(item =>
        item.nombre.toLowerCase().includes(search) ||
        (item.descripcion && item.descripcion.toLowerCase().includes(search)) ||
        (item.destino && item.destino.toLowerCase().includes(search))
    );
    mostrarItems(filtered);
}

// ========================================
// ABRIR MODAL (NUEVO)
// ========================================

function abrirModal(itemData = null) {
    editingId = itemData ? itemData._id : null;
    const modal = document.getElementById('modal-form');
    const title = document.getElementById('modal-title');
    const form = document.getElementById('form-producto');

    title.textContent = editingId ? 'Editar Producto' : 'Nuevo Producto';
    form.reset();

    // Crear campos del formulario
    const fieldsContainer = document.getElementById('form-fields');
    fieldsContainer.innerHTML = fieldsConfig[currentType]
        .map(field => crearFieldHTML(field, itemData))
        .join('');

    modal.classList.remove('hidden');
}

// ========================================
// CREAR CAMPO DEL FORMULARIO
// ========================================

function crearFieldHTML(field, itemData = null) {
    const value = itemData ? (itemData[field.name] || '') : '';
    const required = field.required ? 'required' : '';
    const requiredClass = field.required ? 'required' : '';

    switch (field.type) {
        case 'textarea':
            return `
                <div class="form-group">
                    <label for="${field.name}" class="${requiredClass}">${field.label}</label>
                    <textarea id="${field.name}" name="${field.name}" ${required}>${
                        Array.isArray(value) ? value.join(', ') : value
                    }</textarea>
                </div>
            `;
        case 'select':
            return `
                <div class="form-group">
                    <label for="${field.name}" class="${requiredClass}">${field.label}</label>
                    <select id="${field.name}" name="${field.name}" ${required}>
                        <option value="">Seleccionar...</option>
                        ${field.options.map(opt => `
                            <option value="${opt}" ${value === opt ? 'selected' : ''}>${opt}</option>
                        `).join('')}
                    </select>
                </div>
            `;
        case 'number':
            return `
                <div class="form-group">
                    <label for="${field.name}" class="${requiredClass}">${field.label}</label>
                    <input type="number" id="${field.name}" name="${field.name}" value="${value}" ${required}>
                </div>
            `;
        default:
            return `
                <div class="form-group">
                    <label for="${field.name}" class="${requiredClass}">${field.label}</label>
                    <input type="text" id="${field.name}" name="${field.name}" value="${value}" ${required}>
                </div>
            `;
    }
}

// ========================================
// CERRAR MODAL
// ========================================

function cerrarModal() {
    document.getElementById('modal-form').classList.add('hidden');
    editingId = null;
}

// ========================================
// GUARDAR PRODUCTO (CREATE o UPDATE)
// ========================================

async function guardarProducto(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Convertir servicios/características a array
    if (data.servicios) {
        data.servicios = data.servicios.split(',').map(s => s.trim()).filter(s => s);
    }
    if (data.caracteristicas) {
        data.caracteristicas = data.caracteristicas.split(',').map(s => s.trim()).filter(s => s);
    }

    // Agregar tipo
    data.tipo = currentType;

    try {
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId
            ? `${API_BASE}${endpoints[currentType]}/${editingId}`
            : `${API_BASE}${endpoints[currentType]}`;

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            alert(editingId ? '✅ Producto actualizado' : '✅ Producto creado');
            cerrarModal();
            cargarItems();
        } else {
            alert('❌ Error: ' + (result.error || 'No se pudo guardar'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('❌ Error al guardar');
    }
}

// ========================================
// EDITAR PRODUCTO
// ========================================

async function editarProducto(id) {
    try {
        const response = await fetch(`${API_BASE}${endpoints[currentType]}/${id}`);
        const result = await response.json();

        if (result.success || result.dato || result.datos) {
            const item = result.datos || result.dato;
            abrirModal(item);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar el producto');
    }
}

// ========================================
// ELIMINAR PRODUCTO
// ========================================

async function eliminarProducto(id, nombre) {
    if (!confirm(`¿Eliminar "${nombre}"? Esta acción no se puede deshacer.`)) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}${endpoints[currentType]}/${id}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (result.success) {
            alert('✅ Producto eliminado');
            cargarItems();
        } else {
            alert('❌ Error: ' + (result.error || 'No se pudo eliminar'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('❌ Error al eliminar');
    }
}
