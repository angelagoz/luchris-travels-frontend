# GUÍA: SISTEMA DE COTIZACIONES

## 📋 Descripción General

El **sistema de cotizaciones** reemplaza al carrito de compras. Permite a los clientes solicitar una cotización personalizada para cruceros sin necesidad de completar un pago inmediatamente.

---

## 🎯 Cómo Funciona

### 1️⃣ Cliente Solicita Cotización
- Cliente ve detalles del crucero en `cruise-detail.html`
- Completa formulario con:
  - Nombre
  - Email
  - Teléfono
  - Fecha deseada
  - Tipo de camarote
  - Cantidad de pasajeros
  - Comentarios adicionales (opcional)
- Hace clic en "✉️ Solicitar Cotización"

### 2️⃣ Envío al Backend
- Función `solicitarCotizacion()` (script.js) valida datos
- Envía POST request a `/api/cotizaciones`
- Backend guarda en MongoDB con estado "nueva"
- Cliente recibe confirmación

### 3️⃣ Equipo LUCHRIS Responde
- En el futuro CMS Admin, se verán todas las cotizaciones
- Admin puede:
  - Ver detalles de la solicitud
  - Cambiar estado (nueva → contactada → completada)
  - Agregar respuesta personalizada
  - Enviar email al cliente

---

## 📁 Archivos Involucrados

### Frontend
- **cruise-detail.html** - Formulario de cotización (línea 317-380)
- **script.js** - Función `solicitarCotizacion()` (línea 295+)
- **config.js** - URL centralizada de API

### Backend
- **models/Cotizacion.js** - Schema MongoDB
- **routes/cotizaciones.js** - Endpoints REST
- **server/index.js** - Registro de rutas

---

## 🔄 Endpoints API

### POST /api/cotizaciones
**Crear nueva cotización**

```json
{
  "nombre": "Angela Gómez",
  "email": "angela@example.com",
  "telefono": "829-550-2847",
  "fecha": "15 de Abril 2026",
  "camarote": "Balcón",
  "pasajeros": 2,
  "comentarios": "Preferimos camarote con balcón grande"
}
```

**Respuesta:**
```json
{
  "success": true,
  "mensaje": "Cotización recibida correctamente",
  "cotizacionId": "507f1f77bcf86cd799439011"
}
```

---

### GET /api/cotizaciones
**Listar todas las cotizaciones (Admin)**

```
GET /api/cotizaciones
```

Retorna array de todas las solicitudes con sus estados.

---

### GET /api/cotizaciones/:id
**Obtener detalle de una cotización**

```
GET /api/cotizaciones/507f1f77bcf86cd799439011
```

---

### PUT /api/cotizaciones/:id
**Actualizar estado y agregar respuesta**

```json
{
  "estado": "contactada",
  "respuesta": "Estimada Angela, le enviamos opciones con descuento..."
}
```

---

### DELETE /api/cotizaciones/:id
**Eliminar cotización**

```
DELETE /api/cotizaciones/507f1f77bcf86cd799439011
```

---

## 💾 Almacenamiento Local

Las cotizaciones también se guardan en **localStorage** del navegador:

```javascript
// Acceder al historial local:
const cotizaciones = JSON.parse(localStorage.getItem('cotizaciones'));
console.log(cotizaciones);
```

---

## 🛠️ Estados de una Cotización

| Estado | Descripción |
|--------|-------------|
| `nueva` | Acaba de llegar, sin revisar |
| `contactada` | Equipo contactó al cliente |
| `completada` | Se cerró venta o cotización finalizada |
| `cancelada` | Cliente canceló solicitud |

---

## 📧 Próximas Mejoras

- [ ] Sistema de email automático
- [ ] Dashboard Admin para gestionar cotizaciones
- [ ] WhatsApp Business API integration
- [ ] Seguimiento automático
- [ ] Recordatorios por email

---

## ⚙️ Configuración

### API URL
Definida en `config.js`:
```javascript
API_URL: 'https://luchris-travels-backend.onrender.com/api'
```

### Variables de Entorno (Backend)
```
MONGODB_URI=tu_conexion_mongodb
PORT=5000
NODE_ENV=production
```

---

## 🧪 Pruebas Manuales

1. Ir a https://luchris-travels-frontend.vercel.app/cruise-detail.html
2. Llenar formulario de cotización
3. Hacer clic en "Solicitar Cotización"
4. Verificar console (F12) por logs
5. Confirmar en base de datos MongoDB Atlas

---

## 📞 Contacto

Si hay preguntas sobre el sistema:
- Teléfono: +1 (829) 550-2847
- Email: luchristravels@gmail.com

---

**Última actualización:** 26 de Marzo, 2026
