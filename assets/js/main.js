/* Gridalta — interacciones de la interfaz */
(function () {
  'use strict';

  var doc = document;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- header */
  var masthead = doc.querySelector('[data-masthead]');
  if (masthead) {
    var lastY = window.scrollY;
    var threshold = 40;

    var onScroll = function () {
      var y = window.scrollY;
      masthead.classList.toggle('is-stuck', y > threshold);

      // Ocultar al bajar, mostrar al subir (solo fuera del hero)
      if (y > 260 && y > lastY && !doc.body.classList.contains('is-locked')) {
        masthead.classList.add('is-hidden');
      } else {
        masthead.classList.remove('is-hidden');
      }
      lastY = y;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------------------------------------------------------- drawer */
  var burger = doc.querySelector('[data-burger]');
  var drawer = doc.querySelector('[data-drawer]');

  if (burger && drawer) {
    var setDrawer = function (open) {
      burger.setAttribute('aria-expanded', String(open));
      drawer.classList.toggle('is-open', open);
      drawer.setAttribute('aria-hidden', String(!open));
      doc.body.classList.toggle('is-locked', open);
    };

    burger.addEventListener('click', function () {
      setDrawer(burger.getAttribute('aria-expanded') !== 'true');
    });

    drawer.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { setDrawer(false); }
    });

    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        setDrawer(false);
        burger.focus();
      }
    });
  }

  /* -------------------------------------------------------------- revelado */
  var revealables = doc.querySelectorAll('.reveal');

  if (revealables.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

      Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });
    }
  }

  /* ------------------------------------------------------------- acordeón */
  Array.prototype.forEach.call(doc.querySelectorAll('[data-acc]'), function (group) {
    var triggers = group.querySelectorAll('.acc__trigger');

    Array.prototype.forEach.call(triggers, function (trigger) {
      trigger.addEventListener('click', function () {
        var isOpen = trigger.getAttribute('aria-expanded') === 'true';

        // Un solo panel abierto por grupo
        Array.prototype.forEach.call(triggers, function (t) {
          t.setAttribute('aria-expanded', 'false');
        });

        trigger.setAttribute('aria-expanded', String(!isOpen));
      });
    });
  });

  /* ---------------------------------------------------------------- botón */
  var floatWa = doc.querySelector('[data-float]');
  if (floatWa) {
    var toggleFloat = function () {
      floatWa.classList.toggle('is-visible', window.scrollY > 600);
    };
    toggleFloat();
    window.addEventListener('scroll', toggleFloat, { passive: true });
  }

  /* ------------------------------------------------------------ marquesina */
  // Duplica el contenido para un bucle continuo sin saltos
  Array.prototype.forEach.call(doc.querySelectorAll('[data-marquee]'), function (track) {
    track.innerHTML += track.innerHTML;
  });

  /* ----------------------------------------------------------- formulario */
  var form = doc.querySelector('[data-form]');

  if (form) {
    var status = form.querySelector('[data-form-status]');

    var showError = function (field, message) {
      field.classList.add('has-error');
      var slot = field.querySelector('.field__error');
      if (slot) { slot.textContent = message; }
    };

    var clearError = function (field) {
      field.classList.remove('has-error');
      var slot = field.querySelector('.field__error');
      if (slot) { slot.textContent = ''; }
    };

    var validate = function (control) {
      var field = control.closest('.field') || control.closest('.consent');
      if (!field) { return true; }

      var value = (control.value || '').trim();

      if (control.type === 'checkbox') {
        return control.checked;
      }

      if (control.hasAttribute('required') && !value) {
        showError(field, 'Este campo es obligatorio.');
        return false;
      }

      if (control.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        showError(field, 'Introduce un correo electrónico válido.');
        return false;
      }

      if (control.type === 'tel' && value && !/^[+()\d\s.-]{9,}$/.test(value)) {
        showError(field, 'Introduce un teléfono válido.');
        return false;
      }

      clearError(field);
      return true;
    };

    Array.prototype.forEach.call(form.querySelectorAll('input, select, textarea'), function (control) {
      control.addEventListener('blur', function () { validate(control); });
      control.addEventListener('input', function () {
        var field = control.closest('.field');
        if (field && field.classList.contains('has-error')) { validate(control); }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var controls = form.querySelectorAll('input, select, textarea');
      var valid = true;
      var firstBad = null;

      Array.prototype.forEach.call(controls, function (control) {
        if (!validate(control)) {
          valid = false;
          if (!firstBad) { firstBad = control; }
        }
      });

      if (!valid) {
        if (status) {
          status.textContent = 'Revisa los campos marcados antes de enviar.';
          status.classList.add('is-visible');
        }
        if (firstBad) { firstBad.focus(); }
        return;
      }

      // Sin backend configurado: se deja constancia y se confirma al usuario.
      // Conecta aquí tu endpoint (Formspree, Netlify Forms, API propia…).
      if (status) {
        status.textContent = 'Gracias por escribirnos. Hemos recibido tu solicitud y te responderemos en menos de 24 horas laborables.';
        status.classList.add('is-visible');
      }
      form.reset();
    });
  }

  /* ------------------------------------------------- animación del hero */
  // El hero carga primero un fotograma fijo y sólo después cambia al GIF:
  // así la primera pintada es inmediata y quien pide menos movimiento
  // se queda con la imagen quieta.
  var motion = doc.querySelector('[data-motion]');

  if (motion && !reduceMotion) {
    Array.prototype.forEach.call(motion.querySelectorAll('source'), function (s) {
      s.src = s.getAttribute('data-src');
    });
    if (typeof motion.play === 'function') {
      motion.load();
      var started = motion.play();
      // Safari en iOS con ahorro de batería rechaza la reproducción:
      // el póster se queda visible y no hay nada que arreglar.
      if (started && typeof started.catch === 'function') {
        started.catch(function () {});
      }
    }
  }

  /* ------------------------------------------------------------------ año */
  Array.prototype.forEach.call(doc.querySelectorAll('[data-year]'), function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
