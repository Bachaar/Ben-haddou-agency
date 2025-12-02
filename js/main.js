// Basic interactivity: mobile nav toggle, prefill booking trip from buttons,
// simple form validation + simulated submit (replace with real backend as needed)

document.addEventListener('DOMContentLoaded', function() {
  // year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.style.display = expanded ? '' : 'block';
    });
  }

  // Tour buttons prefill trip select and scroll to contact form
  document.querySelectorAll('button[data-tour]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tour = btn.getAttribute('data-tour');
      const tripSelect = document.getElementById('trip-select');
      if (tripSelect) {
        // attempt to select exact match, otherwise set value and add option
        let found = Array.from(tripSelect.options).find(o => o.value === tour);
        if (!found) {
          const opt = document.createElement('option');
          opt.value = tour; opt.textContent = tour;
          tripSelect.appendChild(opt);
        }
        tripSelect.value = tour;
      }
      // scroll to contact form
      document.getElementById('contact')?.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // Booking form submit handling (no backend). Use mailto as fallback.
  const bookingForm = document.getElementById('booking-form');
  const status = document.getElementById('form-status');
  const mailtoBtn = document.getElementById('contact-mailto');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const formData = new FormData(bookingForm);
      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const phone = formData.get('phone') || '';
      const trip = formData.get('trip') || 'Unspecified';
      const message = formData.get('message') || '';

      if (!name || !email || !message) {
        status.textContent = 'Please fill Name, Email and Message.';
        status.style.color = '#b53a3a';
        return;
      }

      // Construct an email body and open mail client as a fallback.
      const subject = encodeURIComponent(`Booking request: ${trip} — ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nTrip: ${trip}\n\nMessage:\n${message}`
      );

      // Try to POST to an endpoint (if you have one). Here we open mailto as fallback:
      window.location.href = `mailto:info@benhaddoutravel.com?subject=${subject}&body=${body}`;

      status.textContent = 'Opening your mail client to send the booking. If nothing happens, email us at info@benhaddoutravel.com';
      status.style.color = 'var(--deep-green)';
    });
  }

  if (mailtoBtn) {
    mailtoBtn.addEventListener('click', () => {
      window.location.href = 'mailto:info@benhaddoutravel.com';
    });
  }
});