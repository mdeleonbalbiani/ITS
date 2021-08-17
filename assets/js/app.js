// ENTIDAD

class Promedio{
    constructor(nombre, primerEscrito, primerParcial, segundoEscrito, segundoParcial, tercerEscrito, faltas, idGrupo) {
        this.nombre = nombre;
        this.primerEscrito = Number(primerEscrito);
        this.primerParcial = Number(primerParcial);
        this.segundoEscrito = Number(segundoEscrito);
        this.segundoParcial = Number(segundoParcial);
        this.tercerEscrito = Number(tercerEscrito);
        this.faltas = Number(faltas);
        this.promedioFinal;
        this.devolucionFinal;
        this.idGrupo = idGrupo;
    }
    calculoPromedio(){
        let promedioParciales = (this.primerParcial + this.segundoParcial)*0.75;
        let promedioEscritos = (this.primerEscrito + this.segundoEscrito + this.tercerEscrito)*0.25;
        return this.promedioFinal = (promedioEscritos + promedioParciales)/2;
    }
    devolucion() {
        if (this.faltas < 22) {
            if (this.promedioFinal < 7 && this.promedioFinal >= 4) {
                return this.devolucionFinal = "El alumno debe rendir examen en diciembre";
            } else if (this.promedioFinal < 4) {
                return this.devolucionFinal = "El alumno debe rendir examen en febrero";
            } else if (this.promedioFinal > 7){
                return this.devolucionFinal = "El alumno aprobó la materia con nota " + this.promedioFinal;
            }
        }else{
            return this.devolucionFinal = "El alumno debe recursar la materia, no llego a las asistencias minimas necesarias";
        }
    }
}

// ARRAY
let alumnos = [];

// --
let btnGuardar = document.getElementById("submit-btn");

// FUNCIONES

mensajeExito = () => {toastr["success"]("Calculado su promedio final y generada su devolución", "Alumno cargado exitosamente");}
mensajeError = () => {toastr["error"]("El promedio de esta alumno ya fue calculado y guardado", "Alumno ya ingresado");}


function guardarDatos(e){
    e.preventDefault();

    let identificatorioGrupo = 0;
    if ($("#idGrupo1")) {
        identificatorioGrupo = 1;
    }
    else if ($("#idGrupo2")) {
        identificatorioGrupo = 2;
    }
    else if ($("#idGrupo3")) {
        identificatorioGrupo = 3;
    }
    else if ($("#idGrupo4")) {
        identificatorioGrupo = 3;
    }

    let nombre = sessionStorage.getItem('Nombre');
    let primerEscrito = document.getElementById("primerEscrito").value;
    let primerParcial = document.getElementById("primerParcial").value;
    let segundoEscrito = document.getElementById("segundoEscrito").value;
    let segundoParcial = document.getElementById("segundoParcial").value;
    let tercerEscrito = document.getElementById("tercerEscrito").value;
    let faltas = document.getElementById("faltas").value;
    let idGrupo = identificatorioGrupo;

    const listaAlumnos = JSON.parse(localStorage.getItem("alumnos"));
    if (localStorage.getItem("alumnos") != null) {
        let alumno = new Promedio(nombre, primerEscrito, primerParcial, segundoEscrito, segundoParcial, tercerEscrito, faltas, idGrupo);
        alumno.calculoPromedio();
        alumno.devolucion();

        let alumnoExiste = false;
        for (const i of listaAlumnos) {
            if (i.nombre === nombre) {
                alumnoExiste = true;
                mensajeError();
                setTimeout('document.forms[0].reset()', 2000);
                btnGuardar.toggleAttribute('disabled', true)
                console.log("Alumno already exist");
                break
            }
        }
        if (!alumnoExiste) {
            listaAlumnos.push(alumno);
            localStorage.setItem("alumnos", JSON.stringify(listaAlumnos));
            mensajeExito();
            setTimeout('document.forms[0].reset()', 2000);
            btnGuardar.toggleAttribute('disabled', true);
        }
    }
    else {
        localStorage.clear();
        let alumno = new Promedio(nombre, primerEscrito, primerParcial, segundoEscrito, segundoParcial, tercerEscrito, faltas, idGrupo);
        alumno.calculoPromedio();
        alumno.devolucion();
        alumnos.push(alumno);
        
        localStorage.setItem("alumnos", JSON.stringify(alumnos));
        mensajeExito();
        setTimeout('document.forms[0].reset()', 2000);
        btnGuardar.toggleAttribute('disabled', true);
    }
    
}

function filterGrupos(){
    
    listadoAlumnos = JSON.parse(localStorage.getItem("alumnos"));

    let listaGrupo1 = listadoAlumnos.filter(function (element) {
        return (element.idGrupo === 1);
    });

    let listaGrupo2 = listadoAlumnos.filter(function (element) {
        return (element.idGrupo === 2);
    });

    let listaGrupo3 = listadoAlumnos.filter(function (element) {
        return (element.idGrupo === 3);
    });

    let listaGrupo4 = listadoAlumnos.filter(function (element) {
        return (element.idGrupo === 4);
    });

    if ($("#idGrupo1")) {
        mostrar(listaGrupo1);
    }
    else if ($("#idGrupo2")) {
        mostrar(listaGrupo2);
    }
    else if ($("#idGrupo3")) {
        mostrar(listaGrupo3);
    }
    else if ($("#idGrupo4")) {
        mostrar(listaGrupo4);
    }

}

function mostrar(array){

    $("#imprimir").empty();
    if (array != null) {
        array.forEach(element => {
            $("#imprimir").append(`
            <div class="card col-sm-3 m-2 cardResultado" style="width: 13rem;">
                <div class="card-body">
                    <h5 class="card-title text-center">${element.nombre}</h5>
                    <h6 class="card-subtitle mb-2 text-muted text-center">Promedio: ${element.promedioFinal}</h6>
                    <p class="card-text text-center">${element.devolucionFinal}</p>
                </div>
            </div>
            `)
        });
    }
    else{
        console.log("El array esta vacio");
    }
        
    }
    

// EVENTOS
btnGuardar.addEventListener("click", guardarDatos);
$(".resultados").click(filterGrupos)
//filterGrupos();
