/* Єдине джерело правди для контактів і WhatsApp.
   Номер міняється тут — і одразу в усіх посиланнях на сайті. */
const PHONE_WA = '34652692097';            // для wa.me: без «+» і пробілів
const PHONE_TEL = '+34652692097';          // для tel:
const PHONE_HUMAN = '+34 652 692 097';     // як показуємо людям
const EMAIL = 'info@gridalta.es';
const INSTAGRAM = 'gridalta.es';

// Готові перші повідомлення: людина одразу пише по суті,
// а той, хто відповідає, бачить, звідки прийшов запит.
const WA_TEXTS = {
  general:     'Hola, quiero pedir presupuesto para una reforma en Valencia.',
  bano:        'Hola, quiero presupuesto para reformar un baño.',
  cocina:      'Hola, quiero presupuesto para reformar la cocina.',
  integral:    'Hola, quiero presupuesto para una reforma integral llave en mano.',
  local:       'Hola, quiero presupuesto para reformar un local / negocio.',
  cosmetica:   'Hola, me interesa una reforma cosmética (pintura, suelos, iluminación).',
  paneles:     'Hola, me interesan los paneles de pared de bambú.',
  muebles:     'Hola, me interesan muebles a medida.',
  agencia:     'Hola, soy agente inmobiliario y me interesa colaborar con vosotros.',
  obra_nueva:  'Hola, me interesa el paquete «Obra nueva» a precio fijo por m².',
  venta:       'Hola, me interesa el paquete «Venta»: preparar un piso para vender.',
  alquiler:    'Hola, me interesa el paquete «Alquiler»: home staging y reforma cosmética.',
  precio:      'Hola, quiero saber el precio exacto de mi reforma. Os mando fotos.',
  presupuesto: 'Hola, quiero un presupuesto fijo. ¿Podéis venir a medir?',
  otro:        'Hola, tengo una consulta sobre una reforma.',
};

function wa(key = 'general') {
  const text = WA_TEXTS[key] || WA_TEXTS.general;
  return `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(text)}`;
}

module.exports = { wa, WA_TEXTS, PHONE_WA, PHONE_TEL, PHONE_HUMAN, EMAIL, INSTAGRAM };
