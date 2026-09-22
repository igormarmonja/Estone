/* Єдине джерело правди для WhatsApp.
   Номер міняється тут — і одразу в усіх посиланнях на сайті. */
const WA_PHONE = '34600000000';          // без «+» і пробілів

// Заготовані повідомлення: людина одразу пише по суті, менеджер бачить контекст
const WA_TEXTS = {
  general:       'Hola, me gustaría pedir presupuesto para una reforma en Valencia.',
  bano:          'Hola, quiero presupuesto para reformar un baño.',
  cocina:        'Hola, quiero presupuesto para reformar la cocina.',
  integral:      'Hola, quiero presupuesto para una reforma integral de vivienda.',
  local:         'Hola, quiero presupuesto para reformar un local comercial u oficina.',
  mantenimiento: 'Hola, necesito una reparación urgente.',
  instalaciones: 'Hola, necesito presupuesto de fontanería, electricidad o climatización.',
  proyectos:     'Hola, he visto vuestros proyectos y quiero algo parecido.',
  presupuesto:   'Hola, quiero un presupuesto cerrado. ¿Podéis pasar a ver la obra?',
};

function wa(key = 'general') {
  const text = WA_TEXTS[key] || WA_TEXTS.general;
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`;
}

module.exports = { WA_PHONE, WA_TEXTS, wa };
