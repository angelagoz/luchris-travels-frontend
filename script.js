/* ========================================
   LUCHRIS TRAVELS - JAVASCRIPT
   ======================================== */

// Nota: Carrito de compras está manejado por carrito-app.js
// Esta sección contiene funciones específicas de página

// ========================================
// AGREGAR AL CARRITO - Página de Detalles
// ========================================

function inicializarFormularioReserva() {
    const form = document.querySelector('.form-reserva');
    if (!form) return;

    const selectFecha = form.querySelector('select:nth-of-type(1)');
    const selectCamarote = form.querySelector('select:nth-of-type(2)');
    const inputPasajeros = form.querySelector('input[type="number"]');
    const precioTotal = document.querySelector('#precio-total');
    const btnAgregar = form.querySelector('.btn-primary');

    // Validación: si no existen los elementos necesarios, salir
    if (!selectFecha || !selectCamarote || !inputPasajeros || !btnAgregar) return;

    // Precios base por camarote
    const preciosCamarote = {
        interior: 899,
        balcon: 1299,
        suite: 2499
    };

    // Actualizar precio total
    function actualizarPrecio() {
        const camarote = selectCamarote.value;
        const pasajeros = parseInt(inputPasajeros.value) || 1;
        const precioBase = preciosCamarote[camarote] || 0;
        const total = precioBase * pasajeros;

        if (precioTotal) {
            precioTotal.textContent = `$${total.toLocaleString()}`;
        }
    }

    if (selectCamarote) selectCamarote.addEventListener('change', actualizarPrecio);
    if (inputPasajeros) inputPasajeros.addEventListener('change', actualizarPrecio);

    // Agregar al carrito
    btnAgregar.addEventListener('click', function(e) {
        e.preventDefault();

        const fecha = selectFecha.value;
        const camarote = selectCamarote.value;
        const pasajeros = parseInt(inputPasajeros.value) || 1;

        if (!fecha || !camarote) {
            alert('Por favor selecciona fecha y tipo de camarote');
            return;
        }

        const precioBase = preciosCamarote[camarote];
        const producto = {
            id: `crucero_${Date.now()}`,
            nombre: `Crucero Oasis of the Seas - ${camarote}`,
            fecha: fecha,
            camarote: camarote,
            precio: precioBase,
            cantidad: pasajeros
        };

        carrito.agregar(producto);
    });

    actualizarPrecio();
}

// ========================================
// BOTONES VER DETALLES
// ========================================

function inicializarBotonesDetalles() {
    const botonesDetalles = document.querySelectorAll('.btn-secondary');

    botonesDetalles.forEach(btn => {
        if (btn.textContent.includes('Ver Detalles')) {
            btn.addEventListener('click', function() {
                // Simular navegación a página de detalles
                window.location.href = 'cruise-detail.html';
            });
        }
    });
}

// ========================================
// GALERIA DE FOTOS - Detalles Crucero
// ========================================

function inicializarGaleria() {
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Cambiar imagen principal
                mainImage.src = this.src;
                mainImage.style.opacity = '0.5';

                setTimeout(() => {
                    mainImage.style.opacity = '1';
                }, 150);

                // Actualizar thumbnail activo
                thumbnails.forEach(t => t.style.opacity = '0.7');
                this.style.opacity = '1';
            });
        });
    }
}

// ========================================
// FORMULARIO DE CONTACTO
// ========================================

function inicializarFormularioContacto() {
    const formularios = document.querySelectorAll('.contacto-form');

    formularios.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const nombre = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const mensaje = form.querySelector('textarea').value;

            // Validación simple
            if (!nombre || !email || !mensaje) {
                alert('Por favor completa todos los campos');
                return;
            }

            // Validar email
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(email)) {
                alert('Por favor ingresa un email válido');
                return;
            }

            // Simular envío
            console.log('Formulario enviado:', { nombre, email, mensaje });

            carrito.mostrarMensaje('¡Mensaje enviado! Pronto nos pondremos en contacto');

            // Limpiar formulario
            form.reset();
        });
    });
}

// ========================================
// MENU RESPONSIVO
// ========================================

function inicializarMenuResponsivo() {
    // Esta función preparada para cuando agreguemos menú hamburguesa
    // Por ahora el menú es simple y se adapta con CSS media queries
}

// ========================================
// TRANSICIONES SUAVES
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Agregar clase cuando la página se carga
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 0);
});

// ========================================
// SCROLL SUAVE
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#carrito-btn') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========================================
// BOTONES DE CAMAROTES (Ver Detalles de Crucero)
// ========================================

function inicializarBotonesCamarotes() {
    const botonesCarrito = document.querySelectorAll('.btn-camarote');

    botonesCarrito.forEach(btn => {
        btn.addEventListener('click', function() {
            // Scroll al formulario de reserva
            const reserva = document.querySelector('.carrito-reserva');
            if (reserva) {
                reserva.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Preseleccionar el camarote
                const tipoCamarote = this.getAttribute('data-type');
                const selectCamarote = document.querySelector('.form-reserva select:nth-of-type(2)');
                if (selectCamarote) {
                    selectCamarote.value = tipoCamarote;
                    // Disparar evento de cambio para actualizar precio
                    selectCamarote.dispatchEvent(new Event('change'));
                }
            }
        });
    });
}

// ========================================
// ANIMACION AL HACER SCROLL
// ========================================

function inicializarAnimacionScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos de producto
    document.querySelectorAll('.producto-card, .miembro-card, .beneficio-card, .testimonio-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// ========================================
// INICIALIZAR TODO
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarFormularioReserva();
    inicializarBotonesDetalles();
    inicializarGaleria();
    inicializarFormularioContacto();
    inicializarMenuResponsivo();
    inicializarBotonesCamarotes();
    inicializarAnimacionScroll();
});

// ========================================
// UTILIDADES
// ========================================

// Función para formatear moneda
function formatearMoneda(cantidad) {
    return new Intl.NumberFormat('es-DO', {
        style: 'currency',
        currency: 'DOP'
    }).format(cantidad);
}

// Función para validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para obtener parámetro de URL
function obtenerParametroURL(nombre) {
    const params = new URLSearchParams(window.location.search);
    return params.get(nombre);
}

// ========================================
// BARRA DE BUSQUEDA Y FILTROS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Elementos de tabs
    const searchTabs = document.querySelectorAll('.search-tab');
    const formContainers = document.querySelectorAll('.search-form-container');
    const botonesNuevo = document.querySelectorAll('.btn-buscar');

    // Event listeners para tabs
    searchTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');

            // Remover clase active de todos los tabs
            searchTabs.forEach(t => t.classList.remove('active'));
            formContainers.forEach(form => form.classList.remove('active'));

            // Agregar clase active al tab clickeado
            this.classList.add('active');
            const formActiva = document.getElementById(`form-${tabName}`);
            if (formActiva) {
                formActiva.classList.add('active');
            }
        });
    });

    // Event listeners para botones de búsqueda
    botonesNuevo.forEach(boton => {
        boton.addEventListener('click', function() {
            const formContenedor = this.closest('.search-filters');
            if (formContenedor) {
                const valores = {
                    inputs: {}
                };

                // Recopilar valores del formulario
                formContenedor.querySelectorAll('.filter-input').forEach(input => {
                    if (input.value) {
                        valores.inputs[input.id] = input.value;
                    }
                });

                console.log('🔍 Búsqueda realizada:', valores);
                // Aquí se conectará con el backend para hacer la búsqueda real
                alert('Búsqueda iniciada. Pronto conectaremos esto con el servidor.');
            }
        });
    });
});

// ========================================
// SOLICITAR COTIZACIÓN
// ========================================

async function solicitarCotizacion(event) {
    event.preventDefault();

    // Obtener datos del formulario
    const form = event.target;
    const formData = new FormData(form);

    const cotizacion = {
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        telefono: formData.get('telefono'),
        fecha: formData.get('fecha'),
        camarote: formData.get('camarote'),
        pasajeros: parseInt(formData.get('pasajeros')),
        comentarios: formData.get('comentarios') || ''
    };

    // Validar datos
    if (!cotizacion.nombre || !cotizacion.email || !cotizacion.telefono || !cotizacion.fecha || !cotizacion.camarote) {
        alert('❌ Por favor completa todos los campos requeridos');
        return;
    }

    // Mostrar estado de envío
    const btnSubmit = form.querySelector('button[type="submit"]');
    const textoOriginal = btnSubmit.textContent;
    btnSubmit.disabled = true;
    btnSubmit.textContent = '⏳ Enviando...';

    try {
        // Enviar al backend
        const response = await fetch(CONFIG.obtenerURL('/cotizaciones'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cotizacion)
        });

        const data = await response.json();

        if (response.ok && data.success) {
            // Éxito
            alert('✅ ¡Cotización recibida!\n\nNos contactaremos con los detalles en breve.\n\nGracias por confiar en LUCHRIS TRAVELS');
            form.reset();
            btnSubmit.textContent = textoOriginal;
            btnSubmit.disabled = false;

            // Opcional: Guardar en localStorage
            const cotizaciones = JSON.parse(localStorage.getItem('cotizaciones') || '[]');
            cotizaciones.push({
                ...cotizacion,
                fechaEnvio: new Date().toISOString()
            });
            localStorage.setItem('cotizaciones', JSON.stringify(cotizaciones));
        } else {
            // Error del servidor
            alert('⚠️ Error: ' + (data.error || 'No se pudo procesar la cotización'));
            btnSubmit.textContent = textoOriginal;
            btnSubmit.disabled = false;
        }
    } catch (error) {
        // Error de conexión
        console.error('Error enviando cotización:', error);
        alert('❌ Error al enviar la cotización. Por favor intenta de nuevo o llama al +1 (829) 550-2847');
        btnSubmit.textContent = textoOriginal;
        btnSubmit.disabled = false;
    }
}

// ========================================
// CARGAR PRODUCTOS DINÁMICOS
// ========================================

async function cargarProductosDinamicos() {
    try {
        const [cruceros, tours, disney] = await Promise.all([
            fetch(CONFIG.obtenerURL('/productos/tipo/crucero')).then(r => r.json()),
            fetch(CONFIG.obtenerURL('/productos/tipo/tour')).then(r => r.json()),
            fetch(CONFIG.obtenerURL('/productos/tipo/disney')).then(r => r.json())
        ]);

        if (cruceros.success && cruceros.datos.length > 0) {
            console.log('✅ Cruceros cargados:', cruceros.datos.length);
        }
        if (tours.success && tours.datos.length > 0) {
            console.log('✅ Tours cargados:', tours.datos.length);
        }
        if (disney.success && disney.datos.length > 0) {
            console.log('✅ Disney cargados:', disney.datos.length);
        }
    } catch (error) {
        console.warn('⚠️ No se pudieron cargar productos dinámicos:', error.message);
    }
}

// Ejecutar al cargar la página
window.addEventListener('load', cargarProductosDinamicos);

console.log('✅ LUCHRIS TRAVELS - JavaScript cargado exitosamente');
