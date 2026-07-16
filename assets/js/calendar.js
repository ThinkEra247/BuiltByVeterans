/**
 * Built By Veterans — Custom Discovery Call Calendar
 * Fetches available times from Calendly API via Netlify function proxy
 * and books directly via POST /invitees through the book-discovery-call function.
 * v2.0
 */
(function () {
  'use strict';

  const API_BASE = '/.netlify/functions/calendly-available-times';

  // State
  let currentDate = new Date();
  let selectedDate = null;
  let availableSlots = {};
  let isLoading = false;

  // DOM references
  let calendarEl, monthLabel, gridEl, slotsEl, slotsListEl;

  function init() {
    calendarEl = document.getElementById('bvv-calendar');
    if (!calendarEl) return;
    render();
    fetchMonth(currentDate);
  }

  function render() {
    calendarEl.innerHTML = `
      <div class="bvv-cal-header">
        <h3>SELECT A DAY</h3>
        <div class="bvv-cal-nav">
          <button class="bvv-cal-prev" aria-label="Previous month">&lsaquo;</button>
          <span class="bvv-cal-month"></span>
          <button class="bvv-cal-next" aria-label="Next month">&rsaquo;</button>
        </div>
      </div>
      <div class="bvv-cal-weekdays">
        <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
      </div>
      <div class="bvv-cal-grid"></div>
      <div class="bvv-cal-timezone">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
        <span>${getTimezoneLabel()}</span>
      </div>
      <div class="bvv-cal-slots" style="display:none;">
        <h4 class="bvv-cal-slots-title"></h4>
        <div class="bvv-cal-slots-list"></div>
      </div>
    `;

    monthLabel = calendarEl.querySelector('.bvv-cal-month');
    gridEl = calendarEl.querySelector('.bvv-cal-grid');
    slotsEl = calendarEl.querySelector('.bvv-cal-slots');
    slotsListEl = calendarEl.querySelector('.bvv-cal-slots-list');

    calendarEl.querySelector('.bvv-cal-prev').addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      selectedDate = null;
      slotsEl.style.display = 'none';
      fetchMonth(currentDate);
    });

    calendarEl.querySelector('.bvv-cal-next').addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      selectedDate = null;
      slotsEl.style.display = 'none';
      fetchMonth(currentDate);
    });

    renderGrid();
  }

  function renderGrid() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    monthLabel.textContent = `${getMonthName(month)} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let html = '';
    for (let i = 0; i < firstDay; i++) {
      html += '<span class="bvv-cal-day empty"></span>';
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const dateObj = new Date(year, month, d);
      const isPast = dateObj < today;
      const hasSlots = availableSlots[dateStr] && availableSlots[dateStr].length > 0;
      const isSelected = selectedDate === dateStr;
      const isToday = dateObj.getTime() === today.getTime();

      let cls = 'bvv-cal-day';
      if (isPast) cls += ' past';
      if (hasSlots && !isPast) cls += ' available';
      if (isSelected) cls += ' selected';
      if (isToday) cls += ' today';
      html += `<span class="${cls}" data-date="${dateStr}">${d}</span>`;
    }
    gridEl.innerHTML = html;

    gridEl.querySelectorAll('.bvv-cal-day.available').forEach(el => {
      el.addEventListener('click', () => {
        selectedDate = el.dataset.date;
        renderGrid();
        showSlots(selectedDate);
      });
    });
  }

  function showSlots(dateStr) {
    const slots = availableSlots[dateStr] || [];
    if (slots.length === 0) { slotsEl.style.display = 'none'; return; }

    const dateObj = new Date(dateStr + 'T00:00:00');
    const dayLabel = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    calendarEl.querySelector('.bvv-cal-slots-title').textContent = dayLabel;

    slotsListEl.innerHTML = slots.map(slot => {
      const time = new Date(slot.start_time);
      const label = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      return `<button class="bvv-cal-slot" data-time="${slot.start_time}">${label}</button>`;
    }).join('');

    slotsListEl.querySelectorAll('.bvv-cal-slot').forEach(btn => {
      btn.addEventListener('click', () => showBookingForm(dateStr, btn.dataset.time));
    });

    slotsEl.style.display = 'block';
  }

  function showBookingForm(dateStr, slotTime) {
    const time = new Date(slotTime);
    const timeLabel = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const dateLabel = time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

    calendarEl.innerHTML = `
      <div class="bvv-cal-booking">
        <button class="bvv-cal-back" aria-label="Back to calendar">\u2190 Back</button>
        <h3>Confirm Your Discovery Call</h3>
        <div class="bvv-cal-booking-details">
          <span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>${dateLabel}</span>
          <span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>${timeLabel} \u00b7 45 min</span>
        </div>
        <form class="bvv-cal-form" id="bvv-booking-form">
          <div class="bvv-cal-field">
            <label for="bvv-name">Name *</label>
            <input type="text" id="bvv-name" name="name" required placeholder="Your full name">
          </div>
          <div class="bvv-cal-field">
            <label for="bvv-email">Email *</label>
            <input type="email" id="bvv-email" name="email" required placeholder="you@company.com">
          </div>
          <div class="bvv-cal-field">
            <label>What type of organization are you?</label>
            <div class="bvv-cal-radio-group">
              <label><input type="radio" name="org_type" value="Dental Practice"> Dental Practice</label>
              <label><input type="radio" name="org_type" value="Law Firm"> Law Firm</label>
              <label><input type="radio" name="org_type" value="Medical Office"> Medical Office</label>
              <label><input type="radio" name="org_type" value="Other"> Other</label>
            </div>
          </div>
          <input type="hidden" name="start_time" value="${slotTime}">
          <button type="submit" class="bvv-cal-submit">Schedule Discovery Call \u2192</button>
        </form>
      </div>
    `;

    calendarEl.querySelector('.bvv-cal-back').addEventListener('click', () => {
      render();
      fetchMonth(currentDate);
    });

    document.getElementById('bvv-booking-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('bvv-name').value.trim();
      const email = document.getElementById('bvv-email').value.trim();
      const orgType = document.querySelector('input[name="org_type"]:checked');
      const submitBtn = calendarEl.querySelector('.bvv-cal-submit');

      submitBtn.textContent = 'Booking...';
      submitBtn.disabled = true;

      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Chicago';
        const res = await fetch('/.netlify/functions/book-discovery-call', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            start_time: slotTime,
            name: name,
            email: email,
            timezone: timezone,
            org_type: orgType ? orgType.value : ''
          })
        });

        const result = await res.json();

        if (result.success) {
          const timeDisplay = new Date(slotTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
          const dateDisplay = new Date(slotTime).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
          calendarEl.innerHTML = `
            <div class="bvv-cal-confirmation">
              <div class="bvv-cal-check">\u2713</div>
              <h3>Discovery Call Booked!</h3>
              <p>A confirmation has been sent to <strong>${email}</strong></p>
              <p class="bvv-cal-confirm-details">${dateDisplay} at ${timeDisplay}</p>
              <p style="color:var(--text-muted);font-size:13px;margin-top:16px">You'll receive a calendar invite with Google Meet details shortly.</p>
              <button class="bvv-cal-back" style="margin-top:20px" onclick="location.reload()">\u2190 Schedule Another</button>
            </div>
          `;
        } else {
          submitBtn.textContent = 'Schedule Discovery Call \u2192';
          submitBtn.disabled = false;
          const msg = result.details || result.error || 'Something went wrong.';
          alert('Booking error: ' + msg);
        }
      } catch (err) {
        console.error('Booking failed:', err);
        submitBtn.textContent = 'Schedule Discovery Call \u2192';
        submitBtn.disabled = false;
        alert('Unable to complete booking. Please try again or call us at (210) 830-4747.');
      }
    });
  }

  async function fetchMonth(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const now = new Date();
    let startDate;

    if (year === now.getFullYear() && month === now.getMonth()) {
      startDate = new Date(now.getTime() + 300000);
    } else if (new Date(year, month + 1, 0) < now) {
      isLoading = false;
      availableSlots = {};
      renderGrid();
      return;
    } else {
      startDate = new Date(year, month, 1);
    }

    isLoading = true;
    renderGrid();
    const endTime = new Date(year, month + 1, 0, 23, 59, 59).toISOString();

    try {
      const res = await fetch(`${API_BASE}?start_time=${encodeURIComponent(startDate.toISOString())}&end_time=${encodeURIComponent(endTime)}`);
      const data = await res.json();
      availableSlots = {};
      if (data.collection && data.collection.length > 0) {
        data.collection.forEach(slot => {
          const localDate = new Date(slot.start_time);
          const dateStr = `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, '0')}-${String(localDate.getDate()).padStart(2, '0')}`;
          if (!availableSlots[dateStr]) availableSlots[dateStr] = [];
          availableSlots[dateStr].push(slot);
        });
      }
    } catch (err) {
      console.warn('Calendar: Could not fetch available times.', err);
    }
    isLoading = false;
    renderGrid();
  }

  function getMonthName(month) {
    return ['January','February','March','April','May','June','July','August','September','October','November','December'][month];
  }

  function getTimezoneLabel() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const offset = new Date().toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ').pop();
      return `${tz.replace(/_/g, ' ')} (${offset})`;
    } catch (e) { return 'Local Time'; }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
