let usuario = localStorage.getItem("usuario");
let contactos = JSON.parse(localStorage.getItem("contactos")) || ["Amigo1", "Amigo2"];
let historial = JSON.parse(localStorage.getItem("historial")) || {};

function iniciarSesion() {
  const nombre = document.getElementById("username").value.trim();
  if (nombre) {
    usuario = nombre;
    localStorage.setItem("usuario", usuario);
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("chatApp").style.display = "flex";
    cargarContactos();
  }
}

function cerrarSesion() {
  localStorage.removeItem("usuario");
  location.reload();
}

function cargarContactos() {
  const lista = document.getElementById("listaContactos");
  lista.innerHTML = "";
  contactos.forEach(nombre => {
    const li = document.createElement("li");
    li.textContent = nombre;
    li.onclick = () => seleccionarContacto(nombre);
    lista.appendChild(li);
  });
  localStorage.setItem("contactos", JSON.stringify(contactos));
}

let contactoActual = null;

function seleccionarContacto(nombre) {
  contactoActual = nombre;
  document.getElementById("nombreContacto").textContent = nombre;
  mostrarMensajes();
}

function mostrarMensajes() {
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = "";
  const mensajes = historial[contactoActual] || [];
  mensajes.forEach(msg => {
    const div = document.createElement("div");
    div.className = "message " + (msg.remitente === usuario ? "user-msg" : "other-msg");
    div.textContent = msg.texto;
    chatBox.appendChild(div);
  });
}

function enviarMensaje() {
  const input = document.getElementById("mensajeInput");
  const texto = input.value.trim();
  if (texto && contactoActual) {
    if (!historial[contactoActual]) historial[contactoActual] = [];
    historial[contactoActual].push({ remitente: usuario, texto });
    localStorage.setItem("historial", JSON.stringify(historial));
    input.value = "";
    mostrarMensajes();
  }
}

function buscarContacto() {
  const filtro = document.getElementById("buscador").value.toLowerCase();
  const lista = document.getElementById("listaContactos");
  const items = lista.getElementsByTagName("li");
  for (let item of items) {
    item.style.display = item.textContent.toLowerCase().includes(filtro) ? "flex" : "none";
  }
}

function agregarContacto() {
  const nuevo = prompt("Ingresa el nombre del nuevo contacto:");
  if (nuevo && !contactos.includes(nuevo)) {
    contactos.push(nuevo);
    cargarContactos();
    alert("Contacto agregado: " + nuevo);
  } else if (contactos.includes(nuevo)) {
    alert("Ese contacto ya existe.");
  }
}

window.onload = () => {
  if (usuario) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("chatApp").style.display = "flex";
    cargarContactos();
  }
};




