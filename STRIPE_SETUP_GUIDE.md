# 💳 GUÍA COMPLETA: CONFIGURAR STRIPE - LUCHRIS TRAVELS

**Fecha**: 2026-03-27
**Estado**: Sistema de Pagos Implementado ✅

---

## 📋 TABLA DE CONTENIDOS

1. [Requisitos](#requisitos)
2. [Crear Cuenta Stripe](#crear-cuenta-stripe)
3. [Obtener Claves API](#obtener-claves-api)
4. [Configurar en Render](#configurar-en-render)
5. [Probar Sistema](#probar-sistema)
6. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## 📋 REQUISITOS

- ✅ Cuenta de email (gmail, outlook, etc.)
- ✅ Acceso a Render (backend ya desplegado)
- ✅ Acceso a GitHub
- ✅ Navegador web

---

## 🔑 CREAR CUENTA STRIPE

### Paso 1: Registrarse
1. Ve a https://stripe.com/es-mx
2. Haz clic en **"Crear Cuenta"** o **"Registrarse"**
3. Ingresa tu email: `luchristravels@gmail.com`
4. Crea contraseña segura
5. Nombre de empresa: `LUCHRIS TRAVELS`
6. País: **República Dominicana**

### Paso 2: Verificación de Email
- Revisa tu email
- Haz clic en el enlace de confirmación
- Completa datos adicionales si es necesario

### Paso 3: Verificación de Identidad
- Stripe puede pedir:
  - Identificación personal
  - Información bancaria
  - Domicilio
- Completa según las indicaciones

---

## 🎯 OBTENER CLAVES API

### Acceso al Panel
1. Login en https://dashboard.stripe.com
2. En la esquina superior derecha, asegúrate de estar en **"Test Mode"** (modo de prueba)
3. En el menú izquierdo, haz clic en **"Developers"**
4. Selecciona **"API Keys"**

### Claves Que Necesitas

**1️⃣ PUBLISHABLE KEY (Clave Pública)**
- Busca la línea que dice "Publishable key"
- Comienza con: **`pk_test_`**
- Ejemplo: `pk_test_51Nc1Kn2KmX1C2D3E4F5G6H7I8J9K0L1M2N3O4P5Q6R7S8T9U`
- ✅ **¡CÓPIALA!**
- 🔓 Es seguro compartirla (va en el frontend)

**2️⃣ SECRET KEY (Clave Privada)**
- Busca la línea que dice "Secret key"
- Comienza con: **`sk_test_`**
- Ejemplo: `sk_test_51Nc1Kn2KmX1C2D3E4F5G6H7I8J9K0L1M2N3O4P5Q6R7S8T9U`
- ✅ **¡CÓPIALA!**
- 🔐 **¡NUNCA la compartas! (va en el backend)**

---

## 🚀 CONFIGURAR EN RENDER

### Paso 1: Acceder a Render
1. Ve a https://render.com
2. Login con tu cuenta de GitHub
3. En el dashboard, selecciona el proyecto **"luchris-travels-backend"**

### Paso 2: Agregar Variables de Entorno
1. Haz clic en **"Environment"** (o "Variables" según la versión)
2. Haz clic en botón **"+ Add Environment Variable"**
3. Agrega la PRIMERA variable:
   - **Clave**: `STRIPE_PUBLISHABLE_KEY`
   - **Valor**: `pk_test_51Nc1Kn2KmX1C2D3E4F5G6H7I8J9K0L1M2N3O4P5Q6R7S8T9U` (tu valor copiado)
   - Haz clic en **"Save"**

4. Agrega la SEGUNDA variable:
   - **Clave**: `STRIPE_SECRET_KEY`
   - **Valor**: `sk_test_51Nc1Kn2KmX1C2D3E4F5G6H7I8J9K0L1M2N3O4P5Q6R7S8T9U` (tu valor copiado)
   - Haz clic en **"Save"**

### Paso 3: Esperar a Redeploy
- Render se redesplegará automáticamente
- Espera 2-3 minutos hasta que el estado sea **"Live"** (verde)
- ✅ ¡Listo! Las claves están activas

---

## 📱 PROBAR EL SISTEMA

### Paso 1: Ir a la Página
1. Abre https://luchris-travels-frontend.github.io/
2. Agrega al carrito algunos productos (cruceros, tours, Disney)

### Paso 2: Ir al Carrito
1. Haz clic en **"🛒 Carrito"** en la esquina superior
2. Verifica que tus productos aparezcan
3. Haz clic en **"Finalizar Compra"**

### Paso 3: Completar Checkout
1. Elige **"👤 Comprar como Invitado"** (opción más simple)
2. Completa los datos:
   - **Nombre Completo**: Tu nombre
   - **Email**: Tu email
   - **Teléfono**: Tu teléfono

### Paso 4: Pagar con Tarjeta de Prueba
Stripe proporciona tarjetas ficticias para pruebas. **¡Usa esta!**

```
Número de Tarjeta:  4242 4242 4242 4242
Fecha de Vencimiento:  12/25 (o cualquier fecha futura)
Código CVC:  123 (o cualquier número)
```

**Importante:**
- Esta tarjeta SIEMPRE funciona en modo prueba
- No se cobra dinero real
- Es solo para pruebas

### Paso 5: Completar el Pago
1. Verifica que todos los campos estén completos
2. Marca ✅ **"Acepto los términos y condiciones"**
3. Haz clic en **"💳 Pagar Ahora"**
4. Espera a que se procese (15-30 segundos)

### Paso 6: ¡Éxito!
Si todo funciona, verás:
- Página de "¡Pago Realizado Exitosamente!"
- **Número de Transacción**: `TXN_...`
- **Estado**: ✅ Confirmado
- **Email de Confirmación** enviado

---

## 🔍 VERIFICAR EN DASHBOARD STRIPE

Para confirmar que el pago fue registrado:

1. Ve a https://dashboard.stripe.com
2. Haz clic en **"Payments"** (o "Transacciones")
3. Deberías ver tu pago listado con:
   - Estado: ✅ Completado
   - Monto: $XX.XX USD
   - Tarjeta: 4242
   - Fecha: Hoy

---

## ❌ SOLUCIONAR PROBLEMAS

### Problema: "Error: Stripe no está inicializado"
**Causa**: Las variables de entorno no están configuradas
**Solución**:
1. Verifica que agregaste ambas variables en Render
2. Verifica que los valores son correctos (comienzan con pk_test_ y sk_test_)
3. Espera 5 minutos a que Render redeploy completamente
4. Recarga la página (Ctrl+Shift+R)

### Problema: "Error de conexión"
**Causa**: El backend no responde
**Solución**:
1. Verifica que Render está "Live" (verde)
2. Abre https://luchris-travels-backend.onrender.com/api/health
3. Si ve `{"status":"OK"}`, el backend está correcto
4. Si no, espera a que Render redeploy

### Problema: La tarjeta es rechazada
**Causa**: Detalles incorrectos
**Solución**:
1. Verifica que usas exactamente: `4242 4242 4242 4242`
2. Verifica fecha futura (ej: 12/25)
3. Cualquier CVC (ej: 123)
4. Intenta nuevamente

### Problema: Nada funciona
**Solución rápida**:
1. Abre consola del navegador (F12)
2. Mira la pestaña "Console"
3. Copia el error
4. Comparte el error para que te ayude

---

## 📊 MONITOREAR PAGOS

### En Stripe Dashboard
1. Ve a https://dashboard.stripe.com
2. Pestaña **"Payments"** o **"Transacciones"**
3. Verás cada pago con:
   - Monto
   - Estado (completado/fallido)
   - Cliente (email)
   - Método (tarjeta)
   - Hora y fecha

### En Render Logs
1. Ve a https://render.com
2. Selecciona "luchris-travels-backend"
3. Pestaña **"Logs"**
4. Verás eventos como: `✅ Pago confirmado para reserva: TXN_123456789`

---

## ❓ PREGUNTAS FRECUENTES

**P: ¿Necesito pagar por Stripe?**
R: No para registrarse. Pero cuando proceses un pago real, Stripe cobra 2.9% + $0.30 USD. Las pruebas no cuestan nada.

**P: ¿Es seguro?**
R: Sí, Stripe es muy seguro. Las tarjetas se procesan directamente en servidores de Stripe, no en tu servidor.

**P: ¿Puedo usar múltiples tarjetas de prueba?**
R: Sí, Stripe tiene varias:
- `4242 4242 4242 4242` - Exitosa
- `4000 0000 0000 0002` - Tarjeta rechazada
- `4000 0000 0000 9995` - Tarjeta expirada

**P: ¿Cómo paso a pagos REALES?**
R: Cuando estés listo:
1. En Stripe, cambia a "Live Mode"
2. Obtén las claves LIVE (pk_live_ y sk_live_)
3. Actualiza en Render
4. ¡Listo! Ahora aceptarás dinero real

**P: ¿Qué pasa si alguien entra un número de tarjeta incorrecto?**
R: Stripe lo rechaza automáticamente. El usuario ve un error y puede intentar de nuevo.

**P: ¿Dónde veo el dinero?**
R: Stripe lo deposita en tu cuenta bancaria cada 2-3 días (configurable).

---

## 🎓 PRÓXIMOS PASOS

Una vez que funcione:

1. ✅ Prueba con varias tarjetas de prueba
2. ✅ Verifica que los emails de confirmación llegan
3. ✅ Revisa los pagos en Dashboard de Stripe
4. ✅ Verifica los logs en Render
5. ✅ Cuando esté perfecto, activa "Live Mode" en Stripe

---

## 📞 ¿NECESITAS AYUDA?

Si algo no funciona:

1. Abre la consola del navegador: **F12**
2. Ve a la pestaña **"Console"**
3. Intenta nuevamente y anota el error
4. Revisa que:
   - Las claves sean correctas
   - Render esté "Live"
   - La tarjeta sea 4242...
   - El email sea válido

---

**¡Listo!** Tu sistema de pagos con Stripe está configurado y funcionando. 🎉
