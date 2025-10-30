class Empleado {
  // Constructor
  constructor(cc, nombresyApellidos, direccion, email, telefono, sueldoBase, tipoEmpleado, tipoBonificacion) {
    this.cc = cc;
    this.nombresyApellidos = nombresyApellidos;
    this.direccion = direccion;
    this.email = email;
    this.telefono = telefono;
    this.sueldoBase = Number(sueldoBase);
    this.tipoEmpleado = tipoEmpleado;
    this.tipoBonificacion = tipoBonificacion;

    // Calcular sueldo total al crear el objeto
    this.sueldoTotal = this.calcularSueldoTotal();
  }

  // Método para calcular el sueldo total
  calcularSueldoTotal() {
    let adicion = 0;
    switch (this.tipoBonificacion.toUpperCase()) {
      case "A": adicion = 200000; break;
      case "B": adicion = 150000; break;
      case "C": adicion = 100000; break;
      case "D": adicion = 50000; break;
      default: adicion = 0;
    }
    return this.sueldoBase + adicion; // ✅ Esta línea es esencial
  }
}




