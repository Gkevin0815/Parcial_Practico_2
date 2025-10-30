class Empleado{
	//atributos

	//Constructor

		//contructor vacío - En la nueva versión no es necesario...
	//constructor(){}

	constructor(cc,nombresyApellidos,direccion,email,telefono,sueldoBase,
		tipoEmpleado,tipoBonificacion){
		this.cc = cc;
		this.nombresyApellidos = nombresyApellidos;
		this.direccion=direccion;
		this.email=email;
		this.telefono=telefono;
		this.sueldoBase=sueldoBase;
		this.tipoEmpleado=tipoEmpleado;
		this.tipoBonificacion=tipoBonificacion;

		//Sueldo total

		this.sueldoTotal = this.calcularSueldoTotal();
	}

	//Métodos

	calcularSueldoTotal() {
    let adicion = 0;
    switch (this.tipoBonificacion) {
      case "A":
        adicion = 200000;
        break;
      case "B":
        adicion = 150000;
        break;
      case "C":
        adicion = 100000;
        break;
      case "D":
        adicion = 50000;
        break;
      default:
        adicion = 0;
    }
}




