# 📱 Gadgets Tecnológicos — App Móvil

> **⬇️ Descargar APK:** [https://drive.google.com/file/d/1LqPGu8ujfExTMA-nV431_Woh7ATnri19/view?usp=sharing](https://drive.google.com/file/d/1LqPGu8ujfExTMA-nV431_Woh7ATnri19/view?usp=sharing)

---

## 📸 Capturas de pantalla

<!-- Agrega aquí las imágenes de la app -->
| Pantalla principal | Detalle del gadget | Formulario |
|:-:|:-:|:-:|
| ![Home](ruta/a/imagen1.png) | ![Detalle](ruta/a/imagen2.png) | ![Form](ruta/a/imagen3.png) |

> _Reemplaza las rutas con las imágenes reales de tu proyecto._

---

## 🧩 Icono y Splash Screen

La app cuenta con **ícono personalizado** y **Splash Screen** configurados para Android e iOS mediante Capacitor.

<!-- Agrega aquí una imagen del ícono o splash screen -->
| Ícono | Splash Screen |
|:-:|:-:|
| ![Ícono](ruta/a/icono.png) | ![Splash](ruta/a/splash.png) |

> _Reemplaza las rutas con las imágenes reales del ícono y splash screen._

---

## 📋 Descripción

**Gadgets Tecnológicos** es una aplicación móvil CRUD desarrollada con **Ionic + Angular + Capacitor**, que permite gestionar un catálogo de gadgets tecnológicos. Los datos se almacenan en la nube usando **Supabase**, incluyendo soporte para imágenes, videos y audios por cada producto.

---

## ✨ Funcionalidades

- 📋 **Listar** todos los gadgets registrados con imagen, nombre, marca, precio, stock y categoría
- ➕ **Agregar** nuevos gadgets con formulario completo
- ✏️ **Editar** gadgets existentes
- 🗑️ **Eliminar** gadgets con confirmación
- 🔍 **Ver detalle** completo de cada gadget
- 🖼️ **Subida de imágenes** al storage de Supabase
- 🎵 **Reproducción de audio** con controles (play / pause / stop)
- ▶️ **Reproducción de video** embebido (YouTube y TikTok)
- ☁️ **Backend en la nube** con Supabase (PostgreSQL)

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Versión |
|---|---|
| Ionic Framework | ^8.0.0 |
| Angular | ^20.0.0 |
| Capacitor | 8.3.4 |
| Supabase JS | ^2.105.4 |
| TypeScript | ~5.9.0 |
| Node.js | ≥ 18 |

---

## 🗂️ Estructura del proyecto

```
GADGETS-MOVIL/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── gadgets/          # Lista principal de gadgets
│   │   │   ├── gadget-form/      # Formulario crear/editar
│   │   │   └── gadget-detalle/   # Vista de detalle con media
│   │   ├── services/
│   │   │   └── gadgets.ts        # Servicio CRUD + Supabase Storage
│   │   ├── app.routes.ts         # Rutas de la aplicación
│   │   └── app.component.ts
│   ├── environments/
│   │   ├── environment.ts        # Configuración Supabase (dev)
│   │   └── environment.prod.ts
│   └── theme/
│       └── variables.scss        # Variables de tema Ionic
├── capacitor.config.ts           # Configuración Capacitor (Android/iOS)
├── ionic.config.json
├── angular.json
└── package.json
```

---

## 🗃️ Modelo de datos — Tabla `gadgets`

```sql
CREATE TABLE gadgets (
  id          SERIAL PRIMARY KEY,
  nombre      TEXT NOT NULL,
  marca       TEXT NOT NULL,
  precio      NUMERIC NOT NULL,
  stock       INTEGER NOT NULL,
  categoria   TEXT,
  descripcion TEXT,
  imagen_url  TEXT,
  video_url   TEXT,
  audio_url   TEXT
);
```

---

## ⚙️ Instalación y ejecución local

### Requisitos previos

- Node.js ≥ 18
- npm ≥ 9
- Ionic CLI: `npm install -g @ionic/cli`
- Capacitor CLI: `npm install -g @capacitor/cli`

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/GADGETS-MOVIL.git
cd GADGETS-MOVIL

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
# Edita src/environments/environment.ts con tus credenciales de Supabase

# 4. Ejecutar en el navegador
ionic serve
```

---

## 📲 Generar APK (Android)

```bash
# Construir el proyecto web
ionic build

# Sincronizar con Capacitor
npx cap sync android

# Abrir en Android Studio
npx cap open android
```

Desde Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**

---

## ☁️ Configuración de Supabase

En `src/environments/environment.ts`, configura tus credenciales:

```typescript
export const environment = {
  production: false,
  supabaseUrl: 'TU_SUPABASE_URL',
  supabaseKey: 'TU_SUPABASE_ANON_KEY'
};
```

Buckets de storage necesarios en Supabase:
- `gadgets-imagenes` — para imágenes de productos
- `gadgets-audios` — para archivos de audio

---

## 🛣️ Rutas de la aplicación

| Ruta | Descripción |
|---|---|
| `/gadgets` | Lista de todos los gadgets (pantalla principal) |
| `/gadget-form` | Formulario para crear un nuevo gadget |
| `/gadget-form/:id` | Formulario para editar un gadget existente |
| `/gadget-detalle/:id` | Vista de detalle con multimedia |

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos.

---

> Desarrollado con ❤️ usando Ionic + Angular + Supabase
