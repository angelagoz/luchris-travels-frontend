/* ========================================
   SCRIPT: INSERTAR TOURS INTERNACIONALES
   ======================================== */

const mongoose = require('mongoose');
require('dotenv').config();
const Producto = require('./models/Producto');

// Tours Internacionales
const tours = [
    // COLOMBIA
    {
        nombre: 'Colombia - Triángulo del Café & Bogotá',
        tipo: 'tour',
        descripcion: 'Recorre el corazón cafetalero colombiano, visita plantaciones de café y la capital Bogotá con sus museos.',
        precio_base: 1890,
        duracion_dias: 7,
        destino: 'Colombia',
        caracteristicas: ['Vuelo incluido', 'Hotel 4 estrellas', 'Tours con guía', 'Comidas incluidas', 'Plantaciones de café', 'Museos Bogotá']
    },
    {
        nombre: 'Colombia - Cartagena & Islas del Rosario',
        tipo: 'tour',
        descripcion: 'Playas paradisíacas, ciudad colonial de Cartagena y buceo en las Islas del Rosario.',
        precio_base: 2150,
        duracion_dias: 6,
        destino: 'Colombia',
        caracteristicas: ['Vuelo incluido', 'Hotel frente al mar', 'Snorkel y buceo', 'Tour por la ciudad', 'Comidas incluidas', 'Transporte']
    },

    // PERÚ
    {
        nombre: 'Perú - Machu Picchu & Valle Sagrado',
        tipo: 'tour',
        descripcion: 'La joya del Imperio Inca. Machu Picchu, Cusco y el Valle Sagrado en una experiencia inolvidable.',
        precio_base: 2499,
        duracion_dias: 8,
        destino: 'Perú',
        caracteristicas: ['Machu Picchu incluido', 'Hotel 4 estrellas', 'Guía arqueólogo', 'Transporte privado', 'Acclimatación', 'Tours guiados']
    },
    {
        nombre: 'Perú - Lima & Líneas de Nazca',
        tipo: 'tour',
        descripcion: 'La capital gastronómica, museos prehispánicos y vuelo sobre las misteriosas Líneas de Nazca.',
        precio_base: 1799,
        duracion_dias: 5,
        destino: 'Perú',
        caracteristicas: ['Vuelo sobre Nazca', 'Hotel 4 estrellas', 'Tour gastronómico', 'Museos incluidos', 'Transporte', 'Guía especializado']
    },

    // MÉXICO
    {
        nombre: 'México - Cancún, Riviera Maya & Tulum',
        tipo: 'tour',
        descripcion: 'Playas de arena blanca, ruinas mayas en Tulum, cenotes y resorts todo incluido en la Riviera Maya.',
        precio_base: 1650,
        duracion_dias: 6,
        destino: 'México',
        caracteristicas: ['Resort todo incluido', 'Playas privadas', 'Ruinas mayas', 'Cenotes', 'Tours acuáticos', 'Entretenimiento']
    },
    {
        nombre: 'México - Ciudad de México & Oaxaca',
        tipo: 'tour',
        descripcion: 'Teotihuacán, museos de clase mundial en CDMX y la colorida Oaxaca con su arte y gastronomía.',
        precio_base: 1899,
        duracion_dias: 7,
        destino: 'México',
        caracteristicas: ['Teotihuacán', 'Museos CDMX', 'Arte y cultura', 'Gastronomía', 'Hotel 4 estrellas', 'Tours guiados']
    },

    // BRASIL
    {
        nombre: 'Brasil - Río de Janeiro & Cataratas de Iguazú',
        tipo: 'tour',
        descripcion: 'Playas icónicas de Río, Cristo Redentor y las espectaculares Cataratas de Iguazú en la frontera con Argentina.',
        precio_base: 2299,
        duracion_dias: 8,
        destino: 'Brasil',
        caracteristicas: ['Cristo Redentor', 'Cataratas Iguazú', 'Playas de Río', 'Hotel 5 estrellas', 'Transporte interno', 'Tours premium']
    },
    {
        nombre: 'Brasil - São Paulo & Amazonas',
        tipo: 'tour',
        descripcion: 'La metrópolis brasileña y una aventura en la selva amazónica con lodge de lujo y tours por la selva.',
        precio_base: 2599,
        duracion_dias: 9,
        destino: 'Brasil',
        caracteristicas: ['Lodge Amazonas', 'Tours por selva', 'São Paulo', 'Encuentro con fauna', 'Hospedaje de lujo', 'Expertos naturales']
    },

    // PANAMÁ
    {
        nombre: 'Panamá - Canal, Bocas del Toro & San Blas',
        tipo: 'tour',
        descripcion: 'Maravilla de ingeniería del Canal de Panamá, islas paradisíacas y la cultura kuna en Archipiélago de San Blas.',
        precio_base: 1799,
        duracion_dias: 6,
        destino: 'Panamá',
        caracteristicas: ['Canal de Panamá', 'Bocas del Toro', 'San Blas (Kuna Yala)', 'Hotel 4 estrellas', 'Tours acuáticos', 'Guía local']
    },
    {
        nombre: 'Panamá - Panamá Viejo & Boquete',
        tipo: 'tour',
        descripcion: 'Historia colonial en Panamá Viejo, ciudad moderna y el pueblo de montaña Boquete para senderismo y café.',
        precio_base: 1599,
        duracion_dias: 5,
        destino: 'Panamá',
        caracteristicas: ['Panamá Viejo', 'Ciudad moderna', 'Boquete', 'Senderismo', 'Hotel 4 estrellas', 'Tours cultura y naturaleza']
    },

    // CURAÇAO
    {
        nombre: 'Curaçao - Willemstad, Playas & Buceo',
        tipo: 'tour',
        descripcion: 'Isla multicultural con playas de aguas turquesas, capital colorida de Willemstad y buceo de clase mundial.',
        precio_base: 1499,
        duracion_dias: 5,
        destino: 'Curaçao',
        caracteristicas: ['Buceo avanzado', 'Playas privadas', 'Willemstad colonial', 'Hotel 4 estrellas', 'Tours acuáticos', 'Snorkel incluido']
    },
    {
        nombre: 'Curaçao - Klein Curaçao & Aventura Acuática',
        tipo: 'tour',
        descripcion: 'Isla paradisíaca de Klein Curaçao para buceo, snorkel, playas vírgenes y aventuras acuáticas extremas.',
        precio_base: 1699,
        duracion_dias: 5,
        destino: 'Curaçao',
        caracteristicas: ['Klein Curaçao', 'Buceo técnico', 'Snorkel premium', 'Hotel 5 estrellas', 'Barco privado', 'Comidas gourmet']
    },

    // TURQUÍA
    {
        nombre: 'Turquía - Estambul, Capadocia & Éfeso',
        tipo: 'tour',
        descripcion: 'Mezquita Azul, globos en Capadocia, ruinas romanas en Éfeso y el exótico Bazar de Estambul.',
        precio_base: 2199,
        duracion_dias: 8,
        destino: 'Turquía',
        caracteristicas: ['Globos aerostáticos', 'Ruinas romanas', 'Bazar histórico', 'Hotel 4 estrellas', 'Tours culturales', 'Crucero en el Bósforo']
    },
    {
        nombre: 'Turquía - Pamukkale, Hierápolis & Playas de Egeo',
        tipo: 'tour',
        descripcion: 'Travertinos blancos de Pamukkale, playas azules del Egeo y la antigua ciudad de Hierápolis.',
        precio_base: 1899,
        duracion_dias: 6,
        destino: 'Turquía',
        caracteristicas: ['Pamukkale', 'Playas Egeo', 'Termas naturales', 'Hotel 5 estrellas', 'Tours de bienestar', 'Gastronomía turca']
    },

    // FRANCIA
    {
        nombre: 'Francia - París, Versalles & Costa Azul',
        tipo: 'tour',
        descripcion: 'Eiffel, Louvre, Palacio de Versalles y las playas de la Riviera Francesa en Niza y Cannes.',
        precio_base: 2599,
        duracion_dias: 9,
        destino: 'Francia',
        caracteristicas: ['Eiffel', 'Museos París', 'Versalles', 'Costa Azul', 'Hotel 5 estrellas', 'Clase de cocina francesa']
    },
    {
        nombre: 'Francia - Provence, Lavanda & Vinos de Burdeos',
        tipo: 'tour',
        descripcion: 'Campos de lavanda en Provence, viñedos de clase mundial en Burdeos y pueblos medievales.',
        precio_base: 2299,
        duracion_dias: 7,
        destino: 'Francia',
        caracteristicas: ['Campos lavanda', 'Viñedos Burdeos', 'Avignon', 'Hotel boutique', 'Degustación vinos', 'Tours gastronómicos']
    },

    // JAPÓN
    {
        nombre: 'Japón - Tokio, Kyoto & Monte Fuji',
        tipo: 'tour',
        descripcion: 'Modernidad en Tokio, templos zen en Kyoto, vistas espectaculares del Monte Fuji y cultura samurái.',
        precio_base: 3299,
        duracion_dias: 10,
        destino: 'Japón',
        caracteristicas: ['Monte Fuji', 'Templos Kyoto', 'Tokio moderno', 'Tren bala', 'Hotel 5 estrellas', 'Ceremonia del té']
    },
    {
        nombre: 'Japón - Osaka, Hiroshima & Santuarios Sagrados',
        tipo: 'tour',
        descripcion: 'Castillo de Osaka, sitio de paz en Hiroshima y los sagrados santuarios sintoístas de Japón.',
        precio_base: 2999,
        duracion_dias: 8,
        destino: 'Japón',
        caracteristicas: ['Castillo Osaka', 'Hiroshima paz', 'Santuarios', 'Baños onsen', 'Hotel tradicional', 'Guía especializado']
    },

    // CHINA
    {
        nombre: 'China - Gran Muralla, Pekín & Terracota',
        tipo: 'tour',
        descripcion: 'Gran Muralla, Ciudad Prohibida en Pekín y el ejército de terracota en Xi´an — milenios de historia.',
        precio_base: 2799,
        duracion_dias: 9,
        destino: 'China',
        caracteristicas: ['Gran Muralla', 'Ciudad Prohibida', 'Ejército terracota', 'Hotel 5 estrellas', 'Tren de lujo', 'Guía arqueólogo']
    },
    {
        nombre: 'China - Shanghai, Guilin & Crucero Li',
        tipo: 'tour',
        descripcion: 'Metrópolis futurista de Shanghai, montañas de Guilin y crucero panorámico en el río Li.',
        precio_base: 2599,
        duracion_dias: 8,
        destino: 'China',
        caracteristicas: ['Shanghai moderna', 'Montañas Guilin', 'Crucero río Li', 'Hotel 5 estrellas', 'Gastronomía', 'Tours culturales']
    },

    // EUROPA (MULTIDESTINO)
    {
        nombre: 'Europa - Circuito París, Amsterdam, Berlín & Praga',
        tipo: 'tour',
        descripcion: 'Tour por 4 capitales europeas. París romántica, Amsterdam con sus canales, Berlín histórico y Praga mágica.',
        precio_base: 2899,
        duracion_dias: 12,
        destino: 'Europa',
        caracteristicas: ['4 capitales', 'Tren europeo', 'Hotel 4 estrellas', 'Tours guiados', 'Crucero Ámsterdam', 'Comidas incluidas']
    },
    {
        nombre: 'Europa - Italia: Roma, Florencia, Venecia & Amalfi',
        tipo: 'tour',
        descripcion: 'La Italia clásica. Coliseo en Roma, arte en Florencia, canales en Venecia y playas de Amalfi.',
        precio_base: 2999,
        duracion_dias: 10,
        destino: 'Europa',
        caracteristicas: ['Coliseo Roma', 'Uffizi Florencia', 'Gondola Venecia', 'Costa Amalfi', 'Hotel 5 estrellas', 'Comidas gourmet']
    },

    // DUBAI
    {
        nombre: 'Dubai - Lujo y Desierto: Burj Khalifa & Desierto',
        tipo: 'tour',
        descripcion: 'Rascacielos futuristicos, safaris en desierto dorado, compras en malls de lujo y playas del Golfo Pérsico.',
        precio_base: 1999,
        duracion_dias: 5,
        destino: 'Dubai',
        caracteristicas: ['Burj Khalifa', 'Safari desierto', 'Palm Jumeirah', 'Hotel 5 estrellas', 'Compras de lujo', 'Playas privadas']
    },
    {
        nombre: 'Dubai & Abu Dhabi - Emiratos de Lujo',
        tipo: 'tour',
        descripcion: 'Dubai y Abu Dhabi combinados. Ciudades futuristas, Mezquita Sheikh Zayed y experiencias de clase mundial.',
        precio_base: 2299,
        duracion_dias: 6,
        destino: 'Dubai',
        caracteristicas: ['Dubai & Abu Dhabi', 'Mezquita Zayed', 'Desierto', 'Hotel 5 estrellas', 'Crucero dhow', 'Tours premium']
    },

    // GEORGIA
    {
        nombre: 'Georgia - Tbilisi, Caucaso & Montañas',
        tipo: 'tour',
        descripcion: 'Capital bohemia Tbilisi, viñedos ancestrales, montañas del Cáucaso y monasterios medievales.',
        precio_base: 1599,
        duracion_dias: 7,
        destino: 'Georgia',
        caracteristicas: ['Tbilisi', 'Viñedos Georgia', 'Montañas Caucaso', 'Monasterios', 'Hotel 4 estrellas', 'Gastronomía local']
    },
    {
        nombre: 'Georgia - Ruta de Seda: Bakuriani & Gori',
        tipo: 'tour',
        descripcion: 'Pueblos de montaña, fortalezas históricas, playas del Mar Negro y pueblos antiguos de la Ruta de Seda.',
        precio_base: 1799,
        duracion_dias: 8,
        destino: 'Georgia',
        caracteristicas: ['Mar Negro', 'Fortalezas', 'Monasterios', 'Montaña', 'Hotel 4 estrellas', 'Tours históricos']
    },

    // ITALIA
    {
        nombre: 'Italia - Roma Clásica: Coliseo, Vaticano & Trevi',
        tipo: 'tour',
        descripcion: 'Roma eterna. Coliseo, Foro Romano, Basílica de San Pedro, Capilla Sixtina y la Fontana de Trevi.',
        precio_base: 2199,
        duracion_dias: 5,
        destino: 'Italia',
        caracteristicas: ['Coliseo', 'Vaticano', 'Capilla Sixtina', 'Hotel 4 estrellas', 'Tours arqueológicos', 'Comidas italianas']
    },
    {
        nombre: 'Italia - Toscana: Florencia, Siena & Viñedos Chianti',
        tipo: 'tour',
        descripcion: 'Corazón del arte renacentista. Florencia con la Galería Uffizi, Siena medieval y viñedos de Chianti.',
        precio_base: 2399,
        duracion_dias: 6,
        destino: 'Italia',
        caracteristicas: ['Uffizi Florencia', 'Siena', 'Viñedos Chianti', 'Hotel boutique', 'Clases de cocina', 'Degustación vinos']
    },
    {
        nombre: 'Italia - La Dolce Vita: Venecia, Milán & Lago Como',
        tipo: 'tour',
        descripcion: 'Venecia mágica con gondolas, Milán fashion capital y el romántico Lago Como.',
        precio_base: 2599,
        duracion_dias: 7,
        destino: 'Italia',
        caracteristicas: ['Gondola Venecia', 'Milán fashion', 'Lago Como', 'Hotel 5 estrellas', 'Tours de moda', 'Crucero lago']
    },
    {
        nombre: 'Italia - Amalfi, Pompeya & Capri',
        tipo: 'tour',
        descripcion: 'Costa Amalfitana espectacular, ruinas de Pompeya y la isla paradisíaca de Capri.',
        precio_base: 2299,
        duracion_dias: 6,
        destino: 'Italia',
        caracteristicas: ['Costa Amalfi', 'Pompeya', 'Isla Capri', 'Hotel 5 estrellas', 'Tours arqueológicos', 'Playas privadas']
    },

    // CHILE
    {
        nombre: 'Chile - Atacama, Uyuni & Patagonia',
        tipo: 'tour',
        descripcion: 'Desierto de Atacama el más árido del mundo, Salar de Uyuni (frontera con Bolivia) y Patagonia salvaje.',
        precio_base: 2699,
        duracion_dias: 10,
        destino: 'Chile',
        caracteristicas: ['Desierto Atacama', 'Salar Uyuni', 'Patagonia', 'Hotel 5 estrellas', 'Tours aventura', 'Guía montañero']
    },
    {
        nombre: 'Chile - Santiago, Viñas & Carretera Austral',
        tipo: 'tour',
        descripcion: 'Capital cosmopolita, viñedos de clase mundial y la legendaria Carretera Austral entre glaciares.',
        precio_base: 2399,
        duracion_dias: 8,
        destino: 'Chile',
        caracteristicas: ['Santiago', 'Viñedos', 'Carretera Austral', 'Hotel 5 estrellas', 'Degustación vinos', 'Tours de naturaleza']
    },
    {
        nombre: 'Chile - Isla de Pascua & Los Lagos',
        tipo: 'tour',
        descripcion: 'Misterio de los Moai en Rapa Nui, bosques de los Lagos y volcanes de la Patagonia.',
        precio_base: 2899,
        duracion_dias: 9,
        destino: 'Chile',
        caracteristicas: ['Isla Pascua Moai', 'Los Lagos', 'Volcanes', 'Hotel 5 estrellas', 'Tours arqueológicos', 'Natura pristina']
    },

    // USA
    {
        nombre: 'USA - Nueva York: Luces de la Gran Manzana',
        tipo: 'tour',
        descripcion: 'Times Square, Central Park, Estatua de la Libertad, Broadway y los mejores restaurantes de Nueva York.',
        precio_base: 1699,
        duracion_dias: 5,
        destino: 'USA',
        caracteristicas: ['Broadway', 'Central Park', 'Estatua Libertad', 'Hotel 5 estrellas', 'Tours Broadway', 'Comidas gourmet']
    },
    {
        nombre: 'USA - Florida: Miami, Orlando & Keys',
        tipo: 'tour',
        descripcion: 'Miami moderno, parques temáticos en Orlando y las islas Keys con sus playas paradisíacas.',
        precio_base: 1899,
        duracion_dias: 7,
        destino: 'USA',
        caracteristicas: ['Miami', 'Orlando parques', 'Florida Keys', 'Hotel 5 estrellas', 'Tours acuáticos', 'Aventuras']
    },
    {
        nombre: 'USA - California: Los Ángeles, San Diego & Yosemite',
        tipo: 'tour',
        descripcion: 'Playas de California, Hollywood, Disneyland, San Diego y el Parque Yosemite.',
        precio_base: 2099,
        duracion_dias: 8,
        destino: 'USA',
        caracteristicas: ['Hollywood', 'Disneyland', 'San Diego', 'Yosemite', 'Hotel 5 estrellas', 'Tours naturales']
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Conectado a MongoDB');

        const resultado = await Producto.insertMany(tours);
        console.log(`\n✅ ${resultado.length} tours insertados exitosamente!\n`);

        resultado.forEach((tour, index) => {
            console.log(`${index + 1}. ${tour.nombre} - ${tour.duracion_dias} días - $${tour.precio_base}`);
        });

        console.log('\n✅ Script completado');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

seed();
