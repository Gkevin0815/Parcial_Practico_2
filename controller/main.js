// =====================
// Controlador principal
// =====================

// Mostrar u ocultar el formulario
function crearEmpleado() {
  alert(" Entro al formulario");

  const div = document.getElementById('divAgregarEmpleado');
  div.style.display = (div.style.display === 'none' || div.style.display === '') ? 'block' : 'none';
}

// Función para agregar un empleado
function agregarEmpleado(event) {
  // ✅ Mostrar alerta al hacer clic (antes de cualquier otra acción)
  alert(" Agrego un empleado");

  // Evitar comportamiento por defecto del formulario
  if (event) event.preventDefault();

  // Obtener datos del formulario
  const cc = document.getElementById('cc').value.trim();
  const nombresyApellidos = document.getElementById('nombresyApellidos').value.trim();
  const direccion = document.getElementById('direccion').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const sueldoBase = Number(document.getElementById('sueldoBase').value);
  const tipoEmpleado = document.getElementById('tipoEmpleado').value;
  const tipoBonificacion = document.getElementById('tipoBonificacion').value;

  // Validar que no falten campos
  if (!cc || !nombresyApellidos || !direccion || !email || !telefono || !sueldoBase) {
    alert("⚠️ Por favor, completa todos los campos antes de agregar el empleado.");
    return;
  }

  // Crear nuevo empleado usando la clase
  const empleado = new Empleado(cc, nombresyApellidos, direccion, email, telefono, sueldoBase, tipoEmpleado, tipoBonificacion);

  // Guardar en localStorage
  let empleados = JSON.parse(localStorage.getItem('empleados')) || [];
  empleados.push(empleado);
  localStorage.setItem('empleados', JSON.stringify(empleados));

  // Mostrar en la tabla
  mostrarEmpleados();

  // Limpiar el formulario
  document.getElementById('formEmpleado').reset();

  // Ocultar el formulario (opcional)
  document.getElementById('divAgregarEmpleado').style.display = 'none';
}

// Mostrar empleados en tabla
function mostrarEmpleados() {
  const tbody = document.querySelector('#tablaEmpleados tbody');
  tbody.innerHTML = '';

  const empleadosGuardados = JSON.parse(localStorage.getItem('empleados')) || [];

  // Convertir a instancias de Empleado
  const empleados = empleadosGuardados.map(emp => new Empleado(
    emp.cc,
    emp.nombresyApellidos,
    emp.direccion,
    emp.email,
    emp.telefono,
    emp.sueldoBase,
    emp.tipoEmpleado,
    emp.tipoBonificacion
  ));

  empleados.forEach((emp, index) => {
    const fila = `
      <tr>
        <td>${index + 1}</td>
        <td>${emp.cc}</td>
        <td>${emp.nombresyApellidos}</td>
        <td>${emp.direccion}</td>
        <td>${emp.email}</td>
        <td>${emp.telefono}</td>
        <td>$ ${emp.sueldoBase.toLocaleString()}</td>
        <td>${emp.tipoEmpleado}</td>
        <td>${emp.tipoBonificacion}</td>
        <td>$ ${emp.sueldoTotal.toLocaleString()}</td>
      </tr>`;
    tbody.insertAdjacentHTML('beforeend', fila);
  });

  // Total de nómina
  if (empleados.length > 0) {
    const totalNomina = hallarTotalNomina();
    const filaTotal = `
      <tr class="table-secondary">
        <td colspan="9" class="text-end"><strong>Total Nómina:</strong></td>
        <td><strong>$ ${totalNomina.toLocaleString()}</strong></td>
      </tr>`;
    tbody.insertAdjacentHTML('beforeend', filaTotal);
  }
}

// Calcular el total de la nómina
function hallarTotalNomina() {
  const empleados = JSON.parse(localStorage.getItem('empleados')) || [];
  return empleados.reduce((total, emp) => {
    let adicion = 0;
    switch ((emp.tipoBonificacion || '').toUpperCase()) {
      case 'A': adicion = 200000; break;
      case 'B': adicion = 150000; break;
      case 'C': adicion = 100000; break;
      case 'D': adicion = 50000; break;
    }
    return total + Number(emp.sueldoBase) + adicion;
  }, 0);
}

// Mostrar los empleados al cargar la página
document.addEventListener('DOMContentLoaded', mostrarEmpleados);
