# 📊 Guía: Dashboard de Estadísticas

## 🎯 Descripción

Panel completo de análisis y reportes que permite al admin:
- ✅ Ver KPIs principales en tiempo real
- ✅ Analizar tendencias de cotizaciones
- ✅ Identificar camarotes y fechas populares
- ✅ Hacer seguimiento de clientes VIP
- ✅ Evaluar desempeño del negocio

---

## 🚀 Acceso

**URL:** https://luchris-travels-frontend.vercel.app/admin-estadisticas.html

**Requisitos:**
- Estar logueado en panel admin
- Auto-redirect desde login si no estás autenticado

---

## 📈 KPIs Principales

Cuatro métricas clave en la parte superior:

### 1️⃣ Cotizaciones Totales
- **Qué es:** Total de solicitudes recibidas
- **Por qué importa:** Mide demanda del producto
- **Objetivo:** 50+ cotizaciones/mes

### 2️⃣ Tasa de Conversión
- **Qué es:** % de cotizaciones completadas
- **Cálculo:** (Completadas / Total) × 100
- **Objetivo:** 25% mínimo

### 3️⃣ Tiempo Promedio de Respuesta
- **Qué es:** Horas promedio para responder
- **Métrica:** De creación a primera respuesta
- **Objetivo:** < 24 horas

### 4️⃣ Clientes Satisfechos
- **Qué es:** Estimación de satisfacción
- **Cálculo:** Conversión + 20% (aproximado)
- **Objetivo:** 95%+

---

## 📊 Gráficos Disponibles

### Gráfico 1: Cotizaciones por Día
- **Tipo:** Gráfico de línea
- **Datos:** Últimos 7 días
- **Uso:** Ver tendencia semanal
- **Interpretación:**
  - Picos = Días de mayor demanda
  - Bajadas = Oportunidad de promoción

### Gráfico 2: Distribución por Estado
- **Tipo:** Gráfico de dona
- **Estados:** Nueva, Contactada, Completada, Cancelada
- **Uso:** Ver distribución de procesos
- **Interpretación:**
  - Muchas "nuevas" = Necesita más respuestas
  - Pocas "completadas" = Mejorar conversión

### Gráfico 3: Camarotes Más Solicitados
- **Tipo:** Gráfico de barras horizontal
- **Datos:** Total de solicitudes por tipo
- **Uso:** Identificar preferencias
- **Interpretación:**
  - Interior es el más popular (precio)
  - Suite tiene menor demanda

### Gráfico 4: Fechas Más Populares
- **Tipo:** Gráfico de barras vertical
- **Datos:** Top 5 fechas de salida
- **Uso:** Planificar disponibilidad
- **Interpretación:**
  - Fechas pico = Mayor demanda
  - Planificar promotoras en fechas bajas

---

## 👥 Tabla: Top 10 Clientes

| Columna | Descripción |
|---------|------------|
| **Nombre** | Nombre del cliente |
| **Email** | Email de contacto |
| **Cotizaciones** | Total de solicitudes |
| **Valor Total** | Ingreso estimado |
| **Estado** | Estado actual |

### Cómo Usarla
- Identificar clientes VIP
- Priorizarlos en respuestas
- Hacer seguimiento personalizado
- Ofrecerles descuentos especiales

---

## 🔍 Interpretación de Datos

### Escenario 1: Tasa de Conversión Baja
```
Conversión: 8% (Objetivo: 25%)
```
**Problemas posibles:**
- Respuestas lentas
- Precios no competitivos
- Falta de información clara

**Soluciones:**
- Responder más rápido (< 24h)
- Revisar precios de competencia
- Mejorar plantillas de respuesta

---

### Escenario 2: Muchas Cotizaciones "Nuevas"
```
Nueva: 45 | Contactada: 8 | Completada: 3
```
**Problemas:**
- Respuestas retrasadas
- Admin sobrecargado

**Soluciones:**
- Asignar más admin
- Automatizar respuestas iniciales
- Establecer SLA de respuesta

---

### Escenario 3: Camarote Suite Sin Demanda
```
Interior: 120 | Balcón: 85 | Suite: 2
```
**Problemas:**
- Precio muy alto
- Mal posicionamiento
- Falta de promoción

**Soluciones:**
- Ofrecerlo en promociones
- Crear bundle con interior
- Destacar lujo y beneficios

---

## 🎯 Objetivos Recomendados

### Corto Plazo (30 días)
- [ ] Responder todas en < 24h
- [ ] Alcanzar 100 cotizaciones
- [ ] Conversión mínima: 15%

### Mediano Plazo (90 días)
- [ ] Conversión: 20%
- [ ] Respuesta promedio: < 12h
- [ ] 200 cotizaciones acumuladas

### Largo Plazo (1 año)
- [ ] Conversión: 30%+
- [ ] Respuesta promedio: < 6h
- [ ] 1000+ cotizaciones
- [ ] 95% satisfacción

---

## 💡 Estrategias Basadas en Datos

### Si Interior es Muy Popular
**Oportunidad:** Upsell a Balcón
- Mostrar comparativa
- Ofrecerse mejoras por poco más $
- Destacar diferencias

### Si Hay Fecha Pico
**Oportunidad:** Crear demanda en otras fechas
- Promociones especiales
- Descuentos por off-peak
- Bundling con fechas populares

### Si Conversión es Baja
**Acción:** Revisar plantillas de respuesta
- Agregar testimonios
- Mostrar fotos del crucero
- Incluir itinerario detallado
- Destacar ofertas limitadas

---

## 📱 Funciones (Próximas)

### Exportar a PDF
```
(En desarrollo)
Descargar reportes completos con:
- Todos los gráficos
- Tablas de datos
- Análisis de tendencias
- Recomendaciones
```

### Filtrado por Período
```
Actual: Mes
Opciones:
- Este Mes
- Trimestre
- Año
- Todo el Tiempo
```

### Alertas Automáticas
```
(Próximo)
Notificaciones cuando:
- Cotización espera > 24h
- Conversión baja
- Fecha pico detectada
- Cliente VIP requiere atención
```

---

## 🔐 Datos y Privacidad

- ✅ Datos agregados (no identifica individuos)
- ✅ Análisis locales (en tu navegador)
- ✅ No se almacena historial de búsquedas
- ✅ Datos protegidos en MongoDB

---

## 📞 Preguntas Frecuentes

**P: ¿Por qué la conversión es estimada?**
R: No tienes sistema de pago online aún. Es un estimado basado en completadas.

**P: ¿Se actualizan los datos en tiempo real?**
R: Sí, cada vez que recargas la página o cada 30 segundos en cotizaciones.

**P: ¿Puedo ver datos históricos?**
R: Sí, filtra por período (mes, trimestre, año, todo).

**P: ¿Qué significa "Valor Total Estimado"?**
R: Es el precio base del camarote × cantidad de pasajeros (sin descuentos).

---

## 🆘 Solución de Problemas

### Los gráficos no cargan
- Recargar página (F5)
- Verificar conexión a internet
- Revisar consola (F12) por errores

### Datos no se actualizan
- Esperar 30 segundos
- Recargar página manual
- Verificar que haya cotizaciones en BD

### Tabla vacía
- Sin datos en el período seleccionado
- Crear cotizaciones de prueba
- Esperar a clientes reales

---

## 📊 Roadmap de Mejoras

- [ ] Exportar a PDF con graficos
- [ ] Alertas automáticas
- [ ] Comparativa mes anterior
- [ ] Predicción de tendencias (ML)
- [ ] Segmentación de clientes
- [ ] Email de resumen automático
- [ ] Dashboard móvil optimizado

---

**Última actualización:** 26 de Marzo, 2026
**Versión:** 1.0
