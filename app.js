let materias = JSON.parse(localStorage.getItem('materias')) || [];

const form = document.getElementById('formulario');
const tabla = document.getElementById('tabla').querySelector('tbody');
const contador = document.getElementById('contador');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const nombre = document.getElementById('nombre').value;
  const codigo = document.getElementById('codigo').value;
  const semestre = parseInt(document.getElementById('semestre').value);
  const creditos = parseInt(document.getElementById('creditos').value);

  const materia = { nombre, codigo, semestre, creditos, aprobada: false };
  materias.push(materia);
  guardarMaterias();
  actualizarTabla();
  form.reset();
});

function actualizarTabla() {
  tabla.innerHTML = "";
  let aprobadas = 0;

  materias.forEach((materia, index) => {
    const fila = document.createElement('tr');
    if (materia.aprobada) fila.classList.add('aprobada');

    fila.innerHTML = `
      <td>${materia.nombre}</td>
      <td>${materia.codigo}</td>
      <td>${materia.semestre}</td>
      <td>${materia.creditos}</td>
      <td><button onclick="marcarAprobada(${index})">${materia.aprobada ? "✅" : "❌"}</button></td>
    `;
    tabla.appendChild(fila);

    if (materia.aprobada) aprobadas++;
  });

  contador.textContent = aprobadas;
}

function marcarAprobada(index) {
  materias[index].aprobada = !materias[index].aprobada;
  guardarMaterias();
  actualizarTabla();
}

function guardarMaterias() {
  localStorage.setItem('materias', JSON.stringify(materias));
}

actualizarTabla(); // cargar al inicio
