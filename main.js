//Definicion del array
let alumnos = [];

class Promedio{
    constructor(nombre, primerEscrito, primerParcial, segundoEscrito, segundoParcial, tercerEscrito, faltas) {
        this.nombre = nombre;
        this.primerEscrito = primerEscrito;
        this.primerParcial = primerParcial;
        this.segundoEscrito = segundoEscrito;
        this.segundoParcial = segundoParcial;
        this.tercerEscrito = tercerEscrito;
        this.faltas = faltas;
        this.promedioFinal;
    }
    calculoPromedio(){
        let promedioParciales = (this.primerParcial + this.segundoParcial)*0.75;
        let promedioEscritos = (this.primerEscrito + this.segundoEscrito + this.tercerEscrito)*0.25;
        this.promedioFinal = (promedioEscritos + promedioParciales)/2;
    }
    devolucion() {
        if (this.faltas < 22) {
            if (this.promedioFinal < 7 && this.promedioFinal >= 4) {
                alert("El alumno debe rendir examen en diciembre");
            } else if (this.promedioFinal < 4) {
            alert("El alumno debe rendir examen en febrero");
            } else if (this.promedioFinal > 7){
                alert("El alumno aprobó la materia con nota " + this.promedioFinal);
            }
        }else{
            alert("El alumno debe recursar la materia, no llego a las asistencias minimas necesarias");
        }
    }
}

//Validaciones de datos
function validacionFaltas(faltas){
    while ( (faltas < 0) || (isNaN(faltas)) || (faltas==="") ) {
        alert("Número de faltas no válido")
        faltas = parseInt(prompt("Ingrese nuevamente las faltas por favor"))
    }
    return faltas;
}
function validacionNotas(dato){
    while ( (dato < 0) || (dato > 12) || (isNaN(dato)) || (dato==="") ) {
        alert("Nota no válida");
        dato = parseInt(prompt("Ingrese una nota válida"));
    }
    return dato;
}

//Funcion para ingreso de datos
function agregarDatosDeAlumno() {
	let nombre = prompt("Ingrese el nombre del alumno");
	let primerEscrito = parseInt(prompt("Ingrese la nota del primer escrito"));
	primerEscrito = validacionNotas(primerEscrito);
	let primerParcial = parseInt(prompt("Ingrese la nota del primer parcial"));
	primerParcial = validacionNotas(primerParcial);
	let segundoEscrito = parseInt(prompt("Ingrese la nota del segundo escrito"));
	segundoEscrito = validacionNotas(segundoEscrito);
	let segundoParcial = parseInt(prompt("Ingrese la nota del segundo parcial"));
	segundoParcial = validacionNotas(segundoParcial);
	let tercerEscrito = parseInt(prompt("Ingrese la nota del tercer escrito"));
	tercerEscrito = validacionNotas(tercerEscrito);
	let faltas = parseInt(prompt("Ingrese la cantidad de faltas que tuvo el alumno"));
	faltas = validacionFaltas(faltas);

	return new Promedio(nombre, primerEscrito, primerParcial, segundoEscrito, segundoParcial, tercerEscrito, faltas);
}

//Ingreso de nuevo alumno
const nuevoAlumno = agregarDatosDeAlumno();
alumnos.push(nuevoAlumno);
nuevoAlumno.calculoPromedio();

//Devoluciones al user sobre nuevoAlumno
alert("El promedio final del alumno es: " + nuevoAlumno.promedioFinal);
nuevoAlumno.devolucion();

//Ingreso de nuevo alumno
const nuevoAlumno1 = agregarDatosDeAlumno();
alumnos.push(nuevoAlumno1);
nuevoAlumno1.calculoPromedio();

//Devoluciones al user sobre nuevoAlumno1
alert("El promedio final del alumno es: " + nuevoAlumno1.promedioFinal);
nuevoAlumno1.devolucion();

//Ingreso de nuevo alumno
const nuevoAlumno2 = agregarDatosDeAlumno();
alumnos.push(nuevoAlumno2);
nuevoAlumno2.calculoPromedio();

//Devoluciones al user sobre nuevoAlumno2
alert("El promedio final del alumno es: " + nuevoAlumno2.promedioFinal);
nuevoAlumno2.devolucion();

//Consologeo para verificar el array
console.log(alumnos);