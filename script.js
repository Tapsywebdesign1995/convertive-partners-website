const zones = [
  { city: "New York", zone: "EST / UTC−5", id: "America/New_York" },
  { city: "London", zone: "GMT / UTC+0", id: "Europe/London" },
  { city: "Dubai", zone: "GST / UTC+4", id: "Asia/Dubai" },
  { city: "Singapore", zone: "SGT / UTC+8", id: "Asia/Singapore" }
];

const grid = document.querySelector('#clockGrid');
const timeFormatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
const dateFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

function renderClocks() {
  const now = new Date();
  grid.innerHTML = zones.map((place, index) => {
    const time = new Intl.DateTimeFormat('en-US', { timeZone: place.id, hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }).format(now);
    const date = new Intl.DateTimeFormat('en-US', { timeZone: place.id, weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }).format(now);
    return `<article class="clock-card ${index === 0 ? 'local' : ''}"><div class="city">${place.city}</div><div class="zone">${place.zone}${index === 0 ? ' · Your time' : ''}</div><div class="time">${time}</div><div class="date">${date}</div></article>`;
  }).join('');
}

renderClocks();
setInterval(renderClocks, 1000);

document.querySelector('#addClock').addEventListener('click', () => {
  const next = zones.length === 4
    ? { city: 'Los Angeles', zone: 'PST / UTC−8', id: 'America/Los_Angeles' }
    : zones.length === 5
      ? { city: 'Sydney', zone: 'AEDT / UTC+11', id: 'Australia/Sydney' }
      : { city: 'Paris', zone: 'CET / UTC+1', id: 'Europe/Paris' };
  if (zones.length < 7) {
    zones.push(next);
    grid.classList.add('expanded');
    grid.style.gridTemplateColumns = `repeat(${Math.min(zones.length, 4)}, 1fr)`;
    renderClocks();
  } else {
    document.querySelector('#addClock').textContent = 'All time zones added';
    document.querySelector('#addClock').disabled = true;
  }
});
