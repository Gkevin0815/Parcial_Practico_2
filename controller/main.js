//Controlador principal
//Funciones

//CRUD (Create, Read, Update, Delete)
//Función Agregar Empleado (C - Crear)
function crearEmpleado(){

	document.getElementById('divAgregarEmpleado').style.display='block';
	//alert("Entró a crear Empleado");
}

function agregarEmpleado(){
	alert ("entró a agregar empleado");

	// Cargar empleados guardados al iniciar
    document.addEventListener("DOMContentLoaded", mostrarEmpleados);

    // Manejar envío del formulario
    document.getElementById('formEmpleado').addEventListener('submit', function(e) {
      e.preventDefault();

      const empleado = new Empleado(
        document.getElementById('cc').value,
        document.getElementById('nombresyApellidos').value,
        document.getElementById('direccion').value,
        document.getElementById('email').value,
        document.getElementById('telefono').value,
        document.getElementById('sueldoBase').value,
        document.getElementById('tipoEmpleado').value,
        document.getElementById('tipoBonificacion').value
      );

      // Obtener lista existente o crear nueva
      let empleados = JSON.parse(localStorage.getItem('empleados')) || [];

      // Agregar nuevo empleado
      empleados.push(empleado);

      // Guardar nuevamente
      localStorage.setItem('empleados', JSON.stringify(empleados));

      // Actualizar tabla
      mostrarEmpleados();

      // Limpiar formulario
      e.target.reset();
    });

    // Mostrar empleados en tabla
    function mostrarEmpleados() {
      const tbody = document.querySelector('#tablaEmpleados tbody');
      tbody.innerHTML = '';

      const empleados = JSON.parse(localStorage.getItem('empleados')) || [];

      empleados.forEach((emp, index) => {
        // Validar datos
        emp.sueldoBase = Number(emp.sueldoBase) || 0;

        // Calcular sueldoTotal si no existe (compatibilidad con datos antiguos)
        if (emp.sueldoTotal === undefined || emp.sueldoTotal === null) {
          let adicion = 0;
          switch ((emp.tipoBonificacion || '').toString().toUpperCase()) {
            case 'A': adicion = 200000; break;
            case 'B': adicion = 150000; break;
            case 'C': adicion = 100000; break;
            case 'D': adicion = 50000; break;
            default: adicion = 0;
          }
          emp.sueldoTotal = emp.sueldoBase + adicion;
        }

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
        tbody.innerHTML += fila;
      });

      // 🔹 Usamos la función hallarTotalNomina() para calcular la suma total
      const totalNomina = hallarTotalNomina();

      // Fila de total de nómina (solo una)
      if (empleados.length > 0) {
        const filaTotal = `
          <tr class="table-secondary">
            <td colspan="9" class="text-end"><strong>Total Nómina:</strong></td>
            <td><strong>$ ${totalNomina.toLocaleString()}</strong></td>
          </tr>`;
        tbody.insertAdjacentHTML('beforeend', filaTotal);
  }
}


  function hallarTotalNomina() {
  const empleados = JSON.parse(localStorage.getItem('empleados')) || [];
  let total = 0;

  empleados.forEach(emp => {
    let adicion = 0;
    switch ((emp.tipoBonificacion || '').toString().toUpperCase()) {
      case 'A': adicion = 200000; break;
      case 'B': adicion = 150000; break;
      case 'C': adicion = 100000; break;
      case 'D': adicion = 50000; break;
      default: adicion = 0;
    }
    emp.sueldoBase = Number(emp.sueldoBase) || 0;
    total += emp.sueldoBase + adicion;
  });

  return total;
}




