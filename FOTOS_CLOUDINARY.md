# 📸 Configuración de Subida de Fotos - LUCHRIS TRAVELS

## ¿Por Qué Cloudinary?

Cloudinary es un servicio **gratuito** que almacena tus fotos en la nube. Ventajas:
- ✅ Gratis hasta 25 GB de almacenamiento
- ✅ Acceso desde cualquier lugar
- ✅ Sin servidor propio necesario
- ✅ CDN rápido (las fotos se cargan veloz)
- ✅ Optimización automática de imágenes

---

## PASO 1: Registrarse en Cloudinary

1. Ve a https://cloudinary.com/
2. Haz clic en **"Sign Up"** (arriba a la derecha)
3. Completa:
   - Email: tu email
   - Password: contraseña segura
   - Full Name: Tu nombre
4. Haz clic en **"Create Account"**
5. Verifica tu email

---

## PASO 2: Obtener Credenciales

1. Abre tu dashboard de Cloudinary (después de confirmar email)
2. Busca la sección **"API Keys"** (lado derecho, o en Settings)
3. Verás:
   - **Cloud Name**: Cópialo
   - **API Key**: Cópialo
   - **API Secret**: Cópialo (NO lo compartas)

Guarda estos datos en un lugar seguro.

---

## PASO 3: Integrar en el Admin

### Opción A: Upload Widget (MÁS FÁCIL - SIN BACKEND)

El widget de Cloudinary permite subir fotos directamente desde el navegador sin backend.

**En `admin-productos.html`, reemplaza la sección de carga de fotos:**

```html
<!-- ANTES (actual) -->
<div class="form-group">
    <label>Foto Principal</label>
    <div class="file-upload">
        <input type="file" id="foto-principal" accept="image/*">
        <label class="file-upload-label" for="foto-principal">
            📸 Haz clic o arrastra una imagen
        </label>
    </div>
</div>

<!-- DESPUÉS (con Cloudinary) -->
<div class="form-group">
    <label>Foto Principal</label>
    <button type="button" id="upload-button" class="btn" style="width: 100%;">
        📸 Subir Foto
    </button>
    <input type="hidden" id="foto-url">
    <div id="foto-preview" style="margin-top: 10px;"></div>
</div>
```

**Agrega esto al final del `<body>` en `admin-productos.html`:**

```html
<!-- Cloudinary Upload Widget -->
<script src="https://upload-widget.cloudinary.com/latest/index.js"></script>
<script>
    const CLOUDINARY_CLOUD_NAME = "TU_CLOUD_NAME_AQUI";
    const CLOUDINARY_UPLOAD_PRESET = "TU_UPLOAD_PRESET_AQUI";

    document.getElementById('upload-button').addEventListener('click', () => {
        cloudinary.openUploadWidget({
            cloudName: CLOUDINARY_CLOUD_NAME,
            uploadPreset: CLOUDINARY_UPLOAD_PRESET,
            sources: ['local', 'url', 'camera'],
            multiple: false,
            resourceType: 'image'
        }, (error, result) => {
            if (!error && result && result.event === 'success') {
                const imageUrl = result.info.secure_url;
                document.getElementById('foto-url').value = imageUrl;

                // Mostrar preview
                document.getElementById('foto-preview').innerHTML =
                    `<img src="${imageUrl}" style="max-width: 200px; border-radius: 4px;">`;

                console.log('✅ Foto subida:', imageUrl);
            }
        });
    });
</script>
```

### Opción B: Unsigned Upload (SIN CREDENCIALES SENSIBLES)

1. En tu dashboard de Cloudinary, ve a **Settings → Upload**
2. Busca **"Unsigned Requests"**
3. Haz clic en **"Enable unsigned requests"**
4. Te dará un **Upload Preset**. Cópialo.
5. Reemplaza `TU_UPLOAD_PRESET_AQUI` en el código con ese valor

---

## PASO 4: Obtener Cloud Name y Upload Preset

### Cloud Name:
- Está en el dashboard, muy visible (arriba a la izquierda)
- Ej: `mycloudname123`

### Upload Preset:
- Settings → Upload → "Unsigned Upload" → Copia el preset
- Ej: `unsigned_upload_preset_abc123`

---

## PASO 5: Actualizar admin-productos.html

1. Abre `admin-productos.html` en tu editor
2. Busca esta línea (cerca del final del `<head>`):
   ```html
   <script src="config.js"></script>
   ```
3. Agrega ANTES de ella:
   ```html
   <script src="https://upload-widget.cloudinary.com/latest/index.js"></script>
   ```
4. En la sección de Guardar Producto, agrega la URL de la foto:
   ```javascript
   const producto = {
       nombre: document.getElementById('nombre').value,
       // ... otros campos ...
       foto_principal: document.getElementById('foto-url').value
   };
   ```

---

## PASO 6: Testear la Subida

1. Abre `https://tudominio.com/admin-productos.html`
2. Haz clic en "➕ Nuevo Producto"
3. Haz clic en "📸 Subir Foto"
4. Selecciona una imagen
5. ¡Debería subirse automáticamente!

---

## ¿Cómo agregar MÚLTIPLES fotos?

Para agregar galería de fotos a un producto:

```html
<div class="form-group">
    <label>Galería de Fotos</label>
    <button type="button" id="upload-gallery" class="btn" style="width: 100%; margin-bottom: 10px;">
        🖼️ Agregar Fotos
    </button>
    <div id="galeria-preview" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;"></div>
</div>
```

```javascript
let fotosGaleria = [];

document.getElementById('upload-gallery').addEventListener('click', () => {
    cloudinary.openUploadWidget({
        cloudName: CLOUDINARY_CLOUD_NAME,
        uploadPreset: CLOUDINARY_UPLOAD_PRESET,
        multiple: true, // Permitir múltiples
        resourceType: 'image'
    }, (error, result) => {
        if (!error && result && result.event === 'success') {
            fotosGaleria.push(result.info.secure_url);

            // Mostrar preview
            document.getElementById('galeria-preview').innerHTML = fotosGaleria
                .map(url => `<img src="${url}" style="width: 100%; border-radius: 4px;">`)
                .join('');
        }
    });
});
```

---

## 🔒 Seguridad: NO COMPARTAS:

- ❌ API Secret (nunca)
- ✅ Cloud Name (es público)
- ✅ Upload Preset (si usas unsigned)

---

## 💬 ¿Preguntas?

Si algo no funciona:
1. Verifica que Cloud Name sea correcto
2. Verifica que Upload Preset exista
3. Asegúrate de permitir "Unsigned Requests" en Cloudinary
4. Revisa la consola del navegador (F12) para errores

---

## 📊 Límites Gratuitos de Cloudinary

| Plan | Almacenamiento | Transformaciones | Costo |
|------|---|---|---|
| **Free** | 25 GB | Ilimitadas | $0 |
| **Pro** | 500 GB | Ilimitadas | $99/mes |
| **Advanced** | 1+ TB | Ilimitadas | Custom |

Para LUCHRIS TRAVELS, el plan Free es más que suficiente.

---

**¡Listo! Ya puedes subir fotos desde el admin.** 🎉
