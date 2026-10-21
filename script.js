function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem('usuarios')) || {};
}

function mensaje(texto, color) {
  const m = document.getElementById('mensaje');
  if (!m) return;
  m.textContent = texto;
  m.style.color = color || '#c0392b';
  m.style.display = 'block';
  clearTimeout(m._t);
  m._t = setTimeout(() => m.style.display = 'none', 4000);
}

function registrar(e) {
  e.preventDefault();
  const email = document.getElementById('regEmail').value.trim();
  const fecha = document.getElementById('regFecha').value;
  const usuario = document.getElementById('regUsuario').value.trim();
  const pass = document.getElementById('regPass').value;
  const pass2 = document.getElementById('regPass2').value;
  const usuarios = obtenerUsuarios();

  if (!email || !fecha || !usuario || !pass || !pass2) return mensaje('Bete eremu guztiak.');
  if (pass !== pass2) return mensaje('Pasahitzak ez datoz bat.');
  if (usuarios[usuario]) return mensaje('Erabiltzaile hori badago jada.');
  if (email[email]) return mensaje('Email hori badago jada.');

  usuarios[usuario] = { pass, email, fecha };
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  window.location.href = 'Saioahasi.html?registrado=1';
}

function iniciarSesion(e) {
  e.preventDefault();
  const usuario = document.getElementById('loginUsuario').value.trim();
  const pass = document.getElementById('loginPass').value;
  const mantener = document.getElementById('mantener').checked;
  const usuarios = obtenerUsuarios();

  if (!usuarios[usuario] || usuarios[usuario].pass !== pass)
    return mensaje('Erabiltzaile edo pasahitz okerra.');

  localStorage.removeItem('sesion');
  sessionStorage.removeItem('sesion');
  (mantener ? localStorage : sessionStorage).setItem('sesion', usuario);

  const destino = sessionStorage.getItem('destino') || 'index.html';
  sessionStorage.removeItem('destino');
  window.location.href = destino;
}

function cerrarSesion() {
  localStorage.removeItem('sesion');
  sessionStorage.removeItem('sesion');
  window.location.href = 'Saioahasi.html';
}

function usuarioActual() {
  return localStorage.getItem('sesion') || sessionStorage.getItem('sesion');
}

function actualizarIcono() {
  const icono = document.querySelector('.link_e');
  if (!icono) return;
  icono.href = usuarioActual() ? 'Erabiltzailea.html' : 'Saioahasi.html';
}

function cargarPerfil() {
  const nombre = usuarioActual();
  if (!nombre) {
    window.location.href = 'Saioahasi.html';
    return;
  }
  const datos = obtenerUsuarios()[nombre];
  if (!datos) {
    cerrarSesion();
    return;
  }
  document.getElementById('perfilUsuario').textContent = nombre;
  document.getElementById('perfilEmail').textContent = datos.email;
  document.getElementById('perfilFecha').textContent = datos.fecha;

  passPerfil = datos.pass;
  document.getElementById('verPass').innerHTML = ICONO_OJO_TACHADO;
}

const ICONO_OJO = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';

const ICONO_OJO_TACHADO = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';

let passPerfil = '';
let passVisible = false;

function alternarPass() {
  passVisible = !passVisible;
  document.getElementById('perfilPass').textContent = passVisible ? passPerfil : '••••••••••••••••';
  document.getElementById('verPass').innerHTML = passVisible ? ICONO_OJO : ICONO_OJO_TACHADO;
}

function abrirCatalogo() {
  if (usuarioActual()) {
    window.location.href = 'katalogo.html';
  } else {
    sessionStorage.setItem('destino', 'katalogo.html');
    window.location.href = 'Saioahasi.html?acceso=1';
  }
}

function protegerPagina() {
  if (!usuarioActual()) {
    sessionStorage.setItem('destino', location.pathname.split('/').pop());
    window.location.replace('Saioahasi.html?acceso=1');
  }
}