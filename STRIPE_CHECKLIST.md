# ✅ STRIPE - CHECKLIST RÁPIDA

**Tiempo estimado**: 15 minutos
**Dificultad**: Muy fácil

---

## 📋 ANTES DE EMPEZAR

- [ ] Tienes una cuenta de email (gmail, outlook, etc.)
- [ ] Acceso a Render.com (donde está el backend)
- [ ] Navegador web actualizado

---

## 🔑 PASO 1: CREAR CUENTA STRIPE

### 1.1 Registrarse (5 minutos)
- [ ] Ve a https://stripe.com/es-mx
- [ ] Haz clic en "Crear Cuenta" o "Sign Up"
- [ ] Ingresa email: `luchristravels@gmail.com`
- [ ] Crea contraseña
- [ ] Nombre empresa: `LUCHRIS TRAVELS`
- [ ] País: **República Dominicana**
- [ ] Haz clic en "Crear Cuenta"

### 1.2 Verificar Email (2 minutos)
- [ ] Revisa tu email
- [ ] Haz clic en el enlace de confirmación
- [ ] Stripe te pedirá más información (completa según indicaciones)

### 1.3 Verificación de Identidad (Opcional)
- [ ] Si Stripe lo pide, completa verificación
- [ ] (Esto puede tardar 24-48 horas, pero pruebas funcionan sin esto)

---

## 🎯 PASO 2: OBTENER CLAVES (2 minutos)

### 2.1 Ir al Dashboard
- [ ] Login en https://dashboard.stripe.com
- [ ] En esquina superior derecha, verifica que estés en **"Test Mode"** ← IMPORTANTE
- [ ] En menú izquierdo, haz clic en **"Developers"**
- [ ] Haz clic en **"API Keys"**

### 2.2 Copiar Clave Pública (Publishable)
- [ ] Busca la sección "Publishable key"
- [ ] Verifica que comience con **`pk_test_`** (importante el "test")
- [ ] Haz clic en **"Copy"** (icono de portapapeles)
- [ ] **¡Guárdala en un bloc de notas! ← CLAVE #1**
- [ ] Ejemplo: `pk_test_51Nc1Kn2KmX1C2D3E4F5G6H7I8J9K0L1M2N3O4P5Q6R7S8T9U`

### 2.3 Copiar Clave Privada (Secret)
- [ ] Busca la sección "Secret key"
- [ ] Verifica que comience con **`sk_test_`** (importante el "test")
- [ ] Haz clic en **"Copy"** (icono de portapapeles)
- [ ] **¡Guárdala en un bloc de notas! ← CLAVE #2**
- [ ] Ejemplo: `sk_test_51Nc1Kn2KmX1C2D3E4F5G6H7I8J9K0L1M2N3O4P5Q6R7S8T9U`

---

## 🚀 PASO 3: CONFIGURAR EN RENDER (5 minutos)

### 3.1 Entrar a Render
- [ ] Ve a https://render.com
- [ ] Login con GitHub
- [ ] Selecciona el proyecto **"luchris-travels-backend"**

### 3.2 Agregar Variables
- [ ] En el panel, busca pestaña **"Environment"** o **"Variables"**
- [ ] Haz clic en **"+ Add Environment Variable"**

#### Variable 1 - Clave Pública
- [ ] **Nombre**: `STRIPE_PUBLISHABLE_KEY`
- [ ] **Valor**: Pega la clave que copiaste (pk_test_...)
- [ ] Haz clic en **"Save"**

#### Variable 2 - Clave Privada
- [ ] Haz clic nuevamente en **"+ Add Environment Variable"**
- [ ] **Nombre**: `STRIPE_SECRET_KEY`
- [ ] **Valor**: Pega la clave que copiaste (sk_test_...)
- [ ] Haz clic en **"Save"**

### 3.3 Esperar Redeploy
- [ ] Render se redesplegará automáticamente
- [ ] Espera 2-3 minutos hasta que el estado sea **"Live"** (color verde)
- [ ] ✅ ¡Listo!

---

## 📱 PASO 4: PROBAR EL SISTEMA (2 minutos)

### 4.1 Ir a la Página
- [ ] Abre https://luchris-travels-frontend.github.io/
- [ ] Agrega 2-3 productos al carrito
- [ ] Haz clic en **"🛒 Carrito"**

### 4.2 Ir a Checkout
- [ ] Verifica que tus productos aparezcan
- [ ] Haz clic en **"Finalizar Compra"**

### 4.3 Completar Datos
- [ ] Elige **"👤 Comprar como Invitado"**
- [ ] Completa los campos:
  - **Nombre Completo**: Tu nombre
  - **Email**: Tu email
  - **Teléfono**: Tu teléfono (ej: 8295502847)

### 4.4 Pagar con Tarjeta de Prueba
**Usa EXACTAMENTE estos números:**
```
Número:  4242 4242 4242 4242  (importante: todos "4")
Fecha:   12/25  (o cualquier mes/año futuro)
CVC:     123    (cualquier número de 3 dígitos)
Nombre:  John Doe (o tu nombre)
```

### 4.5 Enviar Pago
- [ ] Verifica que la caja dice **"Acepto los términos"** (marcado)
- [ ] Haz clic en **"💳 Pagar Ahora"**
- [ ] Espera 10-15 segundos...

### 4.6 ¡Éxito!
- [ ] Deberías ver: **"¡Pago Realizado Exitosamente!"**
- [ ] Aparecerá un **"Número de Transacción"** (TXN_...)
- [ ] **Estado**: ✅ Confirmado
- [ ] ✅ ¡Tu sistema de pagos funciona!

---

## 🔍 VERIFICAR EN STRIPE DASHBOARD

### Ver el Pago que Acabas de Hacer
- [ ] Ve a https://dashboard.stripe.com
- [ ] Haz clic en **"Payments"** (o "Transacciones")
- [ ] Deberías ver tu pago listado:
  - Monto: $XX.XX USD
  - Tarjeta: 4242
  - Estado: ✅ Succeeded
  - Fecha: Hoy

---

## ❌ SI ALGO NO FUNCIONA

### Error: "Stripe no está inicializado"
- [ ] Verifica que agregaste las 2 variables en Render
- [ ] Verifica que Render está "Live" (color verde)
- [ ] Espera 5 minutos más
- [ ] Recarga la página: **Ctrl+Shift+R**

### Error: "Error de conexión"
- [ ] Abre https://luchris-travels-backend.onrender.com/api/health
- [ ] Deberías ver: `{"status":"OK"}`
- [ ] Si no, Render no está listo. Espera más.

### La tarjeta es rechazada
- [ ] Verifica que copiaste EXACTO: `4242 4242 4242 4242`
- [ ] Verifica que el mes/año sea FUTURO (ej: 12/25)
- [ ] Intenta nuevamente

---

## 🎉 ¡FELICIDADES!

Ahora tu sistema de pagos con Stripe está **100% FUNCIONAL**.

**Lo que ocurrió:**
1. ✅ Creaste cuenta en Stripe
2. ✅ Obtuviste claves de prueba (pk_test_ y sk_test_)
3. ✅ Configuraste Render con esas claves
4. ✅ Probaste el pago con tarjeta ficticia
5. ✅ El dinero se procesó exitosamente

**Próximos pasos (Opcional):**
- Prueba con varias tarjetas de prueba
- Revisa los emails de confirmación
- Cuando estés listo, activa "Live Mode" en Stripe para aceptar pagos reales

---

## 📞 AYUDA RÁPIDA

| Problema | Solución |
|----------|----------|
| No puedo crear cuenta en Stripe | Usa otro email o intenta en incógnito |
| No veo las claves en Stripe | Verifica estar en "Test Mode" (no "Live Mode") |
| Render no se redeploy | Espera 3-5 minutos más |
| El checkout se congela | Abre consola (F12) y busca errores rojos |
| El pago falla | Verifica usar exacto 4242 4242 4242 4242 |

---

**¿Listo?** Comienza por el Paso 1. Todo debería funcionar en menos de 20 minutos. ✅
