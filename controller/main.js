// =====================
// Controlador principal
// =====================

// Mostrar u ocultar el formulario
function crearEmpleado() {
   alert("Entró a agregar empleado");
  const div = document.getElementById('divAgregarEmpleado');
  div.style.display = (div.style.display === 'none' || div.style.display === '') ? 'block' : 'none';
}

// Función para agregar un empleado
function agregarEmpleado() {
  alert(" Agrego un empleado");

  // Crear objeto empleado
  const empleado = new Empleado(
    document.getElementById('cc').value,
    document.getElementById('nombresyApellidos').value,
    document.getElementById('direccion').value,
    document.getElementById('email').value,
    document.getElementById('telefono').value,
    Number(document.getElementById('sueldoBase').value),
    document.getElementById('tipoEmpleado').value,
    document.getElementById('tipoBonificacion').value
  );

  // Calcular bonificación
  let adicion = 0;
  switch (empleado.tipoBonificacion.toUpperCase()) {
    case 'A': adicion = 200000; break;
    case 'B': adicion = 150000; break;
    case 'C': adicion = 100000; break;
    case 'D': adicion = 50000; break;
  }
  empleado.sueldoTotal = empleado.sueldoBase + adicion;

  // Guardar en localStorage
  let empleados = JSON.parse(localStorage.getItem('empleados')) || [];
  empleados.push(empleado);
  localStorage.setItem('empleados', JSON.stringify(empleados));

  // Actualizar tabla
  mostrarEmpleados();

  // Limpiar formulario
  document.getElementById('formEmpleado').reset();
}

// Mostrar empleados en tabla
function mostrarEmpleados() {
  const tbody = document.querySelector('#tablaEmpleados tbody');
  tbody.innerHTML = '';

  // Recuperar los datos del localStorage
  const empleadosGuardados = JSON.parse(localStorage.getItem('empleados')) || [];

  // Convertirlos nuevamente a instancias de la clase Empleado
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

  // Mostrar cada empleado en la tabla
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

  // Mostrar total de nómina
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




