# 🚢 LUCHRIS TRAVELS - Sistema Completo de Cotizaciones

## 📌 Visión General

Sistema profesional para agencia de viajes que permite:
- ✅ Clientes solicitan cotizaciones de cruceros
- ✅ Admin gestiona todas las solicitudes
- ✅ Responde y hace seguimiento de cada cotización
- ✅ Conversión de cotizaciones a reservas

---

## 🚀 Acceso Rápido

### Para Clientes
1. **Sitio Principal:** https://luchris-travels-frontend.vercel.app
2. **Ver Detalle Crucero:** https://luchris-travels-frontend.vercel.app/cruise-detail.html
3. **Solicitar Cotización:** Completa formulario en página de detalle

### Para Admin
1. **Herramientas:** https://luchris-travels-frontend.vercel.app/tools.html
2. **Panel Admin:** https://luchris-travels-frontend.vercel.app/admin-login.html
3. **Credenciales:** admin@luchris.com / admin123

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Vercel)                     │
│  - index.html: Página principal con catálogo            │
│  - cruise-detail.html: Detalles + formulario cotización │
│  - admin-login.html: Login del panel admin              │
│  - admin-cotizaciones.html: Dashboard de gestión        │
│  - tools.html: Página de herramientas                   │
└─────────────────────────────────────────────────────────┘
                          ↕↕↕ API REST
┌─────────────────────────────────────────────────────────┐
│                    BACKEND (Render)                      │
│  - Node.js + Express                                    │
│  - Rutas: /api/cotizaciones, /api/usuarios, etc.       │
│  - Models: Cotizacion, Usuario, Reserva, Crucero       │
└─────────────────────────────────────────────────────────┘
                          ↕↕↕
┌─────────────────────────────────────────────────────────┐
│              BASE DE DATOS (MongoDB Atlas)               │
│  - Collections: cotizaciones, usuarios, reservas, etc.  │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Flujo de Cotización

```
1. CLIENTE SOLICITA
   └─ Completa formulario en cruise-detail.html
   └─ Valida datos en frontend
   └─ Envía POST a /api/cotizaciones
   └─ Recibe confirmación

2. BACKEND PROCESA
   └─ Valida datos
   └─ Guarda en MongoDB
   └─ Estado: "nueva"
   └─ Retorna éxito

3. ADMIN GESTIONA
   └─ Accede a admin-cotizaciones.html
   └─ Ve cotización en tabla
   └─ Click en "✉️" para responder
   └─ Escribe respuesta + cambia estado

4. SISTEMA ACTUALIZA
   └─ PUT a /api/cotizaciones/:id
   └─ Guarda respuesta
   └─ Cambia estado a "contactada"

5. SEGUIMIENTO
   └─ Admin puede ver historial
   └─ Cambiar a "completada" si cerró venta
   └─ O "cancelada" si cliente rechazó
```

---

## 🔧 Principales Características

### Sistema de Cotizaciones
- **Frontend:** Formulario intuitivo en cruise-detail.html
- **Backend:** Endpoints REST completos
- **Validación:** En cliente y servidor
- **Base de Datos:** Almacenamiento persistente en MongoDB

### Panel Admin
- **Tabla dinámico:** Todas las cotizaciones con filtros
- **Estadísticas en tiempo real:** Nuevas, contactadas, completadas
- **Respuestas:** Modal para escribir y enviar
- **Estados:** Nueva → Contactada → Completada/Cancelada
- **Auto-refresh:** Cada 30 segundos

### Seguridad
- **Autenticación:** Token en localStorage (mejorable con JWT backend)
- **Validación:** Datos requeridos en ambos lados
- **Base de Datos:** MongoDB en nube (Atlas)
- **Secretos:** Variables de entorno (.env)

---

## 📁 Estructura de Archivos

### Frontend
```
├── index.html                 # Página principal
├── cruise-detail.html         # Detalles del crucero + cotización
├── admin-login.html           # Login del panel
├── admin-cotizaciones.html    # Dashboard admin
├── tools.html                 # Página de herramientas
├── styles.css                 # Estilos globales
├── script.js                  # JavaScript principal
├── config.js                  # Configuración de API
└── auth.js                    # Sistema de autenticación
```

### Backend
```
server/
├── index.js                   # Servidor principal
├── package.json               # Dependencias
├── models/
│   ├── Cotizacion.js         # Schema de cotizaciones
│   ├── Usuario.js            # Schema de usuarios
│   ├── Reserva.js            # Schema de reservas
│   └── Crucero.js            # Schema de cruceros
└── routes/
    ├── cotizaciones.js       # Endpoints para cotizaciones
    ├── usuarios.js           # Endpoints para usuarios
    ├── reservas.js           # Endpoints para reservas
    └── pagos.js              # Endpoints para pagos
```

---

## 🌐 URLs de Deployments

| Componente | URL | Estado |
|-----------|-----|--------|
| **Frontend** | https://luchris-travels-frontend.vercel.app | ✅ Vivo |
| **Backend** | https://luchris-travels-backend.onrender.com | ✅ Vivo |
| **Base de Datos** | MongoDB Atlas | ✅ Vivo |
| **GitHub Frontend** | github.com/angelagoz/luchris-travels-frontend | 📦 Repo |
| **GitHub Backend** | github.com/angelagoz/luchris-travels-backend | 📦 Repo |

---

## 📚 Documentación Disponible

| Archivo | Descripción |
|---------|------------|
| **COTIZACIONES_GUIA.md** | Sistema de cotizaciones para clientes |
| **ADMIN_GUIA.md** | Panel administrativo completo |
| **CLAUDE.md** | Reglas y pautas del proyecto |
| **memory.md** | Log de avances y tareas completadas |
| **README_SISTEMA.md** | Este archivo |

---

## 🔐 Credenciales (Cambiar en Producción)

### Admin Panel
```
Email: admin@luchris.com
Contraseña: admin123
```

### Variables de Entorno Backend
```
MONGODB_URI=tu_conexion_mongodb
JWT_SECRET=tu_secreto_jwt
STRIPE_PUBLIC_KEY=tu_clave_publica
STRIPE_SECRET_KEY=tu_clave_secreta
PORT=5000
NODE_ENV=production
```

---

## 📱 API REST Endpoints

### Cotizaciones
```
POST   /api/cotizaciones           # Crear nueva
GET    /api/cotizaciones           # Listar todas
GET    /api/cotizaciones/:id       # Ver detalle
PUT    /api/cotizaciones/:id       # Actualizar
DELETE /api/cotizaciones/:id       # Eliminar
```

### Usuarios
```
POST   /api/usuarios/registro      # Registrarse
POST   /api/usuarios/login         # Iniciar sesión
GET    /api/usuarios/:id           # Perfil
PUT    /api/usuarios/:id           # Actualizar
```

### Reservas
```
POST   /api/reservas               # Crear reserva
GET    /api/reservas               # Listar
GET    /api/reservas/:id           # Detalle
```

---

## 🛠️ Herramientas Disponibles

### Página Tools (tools.html)
Acceso centralizado a:
- Panel Admin
- Sitio Principal
- Documentación
- Estado del sistema
- Próximas mejoras

---

## 🚀 Mejoras Futuras (Roadmap)

### Fase 3: Comunicaciones
- [ ] Emails automáticos (Nodemailer/SendGrid)
- [ ] Notificaciones por WhatsApp Business
- [ ] SMS de confirmación
- [ ] Recordatorios automáticos

### Fase 4: Análisis
- [ ] Dashboard de reportes
- [ ] Gráficos de conversión
- [ ] Análisis de datos
- [ ] Exportar reportes (PDF/Excel)

### Fase 5: CRM
- [ ] Historial completo de interacciones
- [ ] Seguimiento de clientes
- [ ] Tarea automáticas
- [ ] Calendario de eventos

### Fase 6: Pagos
- [ ] Integración Stripe completa
- [ ] Pagos en línea
- [ ] Planes de pago
- [ ] Facturación automática

---

## 💻 Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura
- **CSS3** - Estilos responsive
- **JavaScript vanilla** - Sin frameworks
- **Vercel** - Hosting

### Backend
- **Node.js** - Runtime
- **Express** - Framework web
- **MongoDB** - Base de datos
- **Mongoose** - ODM
- **Render** - Hosting

### DevOps
- **GitHub** - Control de versiones
- **Git Hooks** - Auto-deploy
- **MongoDB Atlas** - BD en nube
- **Vercel** - Deploys automáticos
- **Render** - Deploys automáticos

---

## 📋 Checklist de Producción

### Seguridad
- [ ] Cambiar credenciales por defecto
- [ ] Configurar JWT en backend
- [ ] Habilitar HTTPS
- [ ] Validar entrada en backend
- [ ] Rate limiting en API
- [ ] CORS configurado correctamente

### Performance
- [ ] Minificar CSS/JS
- [ ] Optimizar imágenes
- [ ] Caché en navegador
- [ ] CDN para assets
- [ ] Lazy loading

### Datos
- [ ] Backups automáticos
- [ ] Replicación en BD
- [ ] Plan de recuperación
- [ ] Logs de acceso

### Monitoreo
- [ ] Sentry para errores
- [ ] LogRocket para sesiones
- [ ] Google Analytics
- [ ] Alertas de downtime

---

## 📞 Contacto & Soporte

**LUCHRIS TRAVELS**
- 📞 +1 (829) 550-2847
- 📧 luchristravels@gmail.com
- 📍 Baní, República Dominicana

---

## 📄 Licencia

Todos los derechos reservados © 2026 LUCHRIS TRAVELS

---

**Última actualización:** 26 de Marzo, 2026
**Versión:** 2.9
**Estado:** ✅ En producción
