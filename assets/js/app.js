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

function identificaciónDeGrupo() {
    let textoTitulo = document.getElementsByClassName("idGrupo")[0].innerText;
    //console.log(textoTitulo);
    let identificatorioGrupo = 0;
    switch (true) {
        case textoTitulo === "1ero IB (EMT)":
            identificatorioGrupo = 1;
            break;
        case textoTitulo === "3ero DD (EMP)":
            identificatorioGrupo = 2;
            break;
        case textoTitulo === "2do IA (EMT)":
            identificatorioGrupo = 3;
            break;
        case textoTitulo === "1ero MB (EMT)":
            identificatorioGrupo = 4;
            break;
        default:
            identificatorioGrupo = 0;
            break;
    }
    return identificatorioGrupo;
}

function guardarDatos(e){
    e.preventDefault();

    let nombre = sessionStorage.getItem('Nombre');
    let primerEscrito = document.getElementById("primerEscrito").value;
    let primerParcial = document.getElementById("primerParcial").value;
    let segundoEscrito = document.getElementById("segundoEscrito").value;
    let segundoParcial = document.getElementById("segundoParcial").value;
    let tercerEscrito = document.getElementById("tercerEscrito").value;
    let faltas = document.getElementById("faltas").value;
    let idGrupo = identificaciónDeGrupo();

    let alumno = new Promedio(nombre, primerEscrito, primerParcial, segundoEscrito, segundoParcial, tercerEscrito, faltas, idGrupo);
        alumno.calculoPromedio();
        alumno.devolucion();

    const listaAlumnos = JSON.parse(localStorage.getItem("alumnos"));
    if (localStorage.getItem("alumnos") != null) {
        
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
        alumnos.push(alumno);
        localStorage.setItem("alumnos", JSON.stringify(alumnos));
        mensajeExito();
        setTimeout('document.forms[0].reset()', 2000);
        btnGuardar.toggleAttribute('disabled', true);
    }
    
}

function filterArray(){
    listadoAlumnos = JSON.parse(localStorage.getItem("alumnos"));

    /* -- FILTRADO DE GRUPOS --  */

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

    /* console.log(listaGrupo1);
    console.log(listaGrupo2);
    console.log(listaGrupo3);
    console.log(listaGrupo4); */

    /* -- FILTRADO DE ALUMNOS -- */

    /* listaGrupo1.forEach(element => {
        alumnoGrupo1 =  Math.max(Math, element.promedioFinal);
        
    });
   
    console.log(typeof alumnoGrupo1); */
    /* console.log(typeof alumnoGrupo2);
    console.log(typeof alumnoGrupo3);
    console.log(typeof alumnoGrupo4); */


    /* -- FILTRADO DE APROBADOS -- */

    let aprobadosGrupo1 = 0;
    let desaprobadosGrupo1 = 0;

    listaGrupo1.forEach(element => {
        if (element.promedioFinal >= 7) {
            aprobadosGrupo1 += 1;
        }
        else{
            desaprobadosGrupo1 += 1;
        }
     });

    let aprobadosGrupo2 = 0;
    let desaprobadosGrupo2 = 0;
    listaGrupo2.forEach(element => {
        if (element.promedioFinal >= 7) {
            aprobadosGrupo2 += 1;
        }
        else{
            desaprobadosGrupo2 += 1;
        }
     });

    let aprobadosGrupo3 = 0;
    let desaprobadosGrupo3 = 0;
    listaGrupo3.forEach(element => {
        if (element.promedioFinal >= 7) {
            aprobadosGrupo3 += 1;
        }
        else{
            desaprobadosGrupo3 += 1;
        }
     });

    let aprobadosGrupo4 = 0;
    let desaprobadosGrupo4 = 0;
    listaGrupo4.forEach(element => {
        if (element.promedioFinal >= 7) {
            aprobadosGrupo4 += 1;
        }
        else{
            desaprobadosGrupo4 += 1;
        }
     });


    /* -- LLAMADA DE FUNCIONES MOSTRAR -- */

    let grupo = identificaciónDeGrupo();
    switch (grupo) {
        case 1:
            mostrarPromedios(listaGrupo1);
            /* mostrarAlumno(alumnoGrupo1); */
            mostrarGrafica(aprobadosGrupo1, desaprobadosGrupo1)
            break;
        case 2:
            mostrarPromedios(listaGrupo2);
            /* mostrarAlumno(alumnoGrupo2); */
            mostrarGrafica(aprobadosGrupo2, desaprobadosGrupo2)
            break;
        case 3:
            mostrarPromedios(listaGrupo3);
            /* mostrarAlumno(alumnoGrupo3); */
            mostrarGrafica(aprobadosGrupo3, desaprobadosGrupo3)
            break;
        case 4:
            mostrarPromedios(listaGrupo4);
            /* mostrarAlumno(alumnoGrupo4); */
            mostrarGrafica(aprobadosGrupo4, desaprobadosGrupo4)
            break;
        default:
            break;
    }
}

function mostrarPromedios(array){
    $("#imprimirPromedios").empty();
    if (array != null) {
        array.forEach(element => {
            $("#imprimirPromedios").append(`
            <div class="card col-sm-3 m-2 cardResultado" style="width: 13rem;">
                <div class="card-body">
                    <h5 class="card-title text-center text-white">${element.nombre}</h5>
                    <h6 class="card-subtitle mb- text-center text-warning">Promedio: ${element.promedioFinal}</h6>
                    <p class="card-text text-center text-white">${element.devolucionFinal}</p>
                </div>
            </div>
            `)
        });
    }
    else{
        console.log("El array esta vacio");
    }   
}

function mostrarAlumno(array) {
    $("#imprimirAlumno").empty();
    if (array != null) {
        array.forEach(element => {
            $("#imprimirAlumno").append(`
            <div class="card col-sm-3 m-2 cardResultado" style="width: 13rem;">
                <div class="card-body">
                    <h5 class="card-title text-center text-white">${element.nombre}</h5>
                    <h6 class="card-subtitle mb- text-center text-warning">Promedio: ${element.promedioFinal}</h6>
                    <p class="card-text text-center text-white">${element.devolucionFinal}</p>
                </div>
            </div>
            `)
        });
    }
    else{
        console.log("El array esta vacio");
    } 
}

function mostrarGrafica(nroAprobados, nroDesaprobados) {
    let grafica = $("#grafica");
    let xValues = ["Aprobados", "Desaprobados"];
    let yValues = [nroAprobados, nroDesaprobados];
    let barColors = ["green", "red"];

    let newChart = new Chart(grafica, {
    type: "doughnut",
    data: {
        labels: xValues,
        datasets: [{
        backgroundColor: barColors,
        data: yValues
        }]
    }
    });
}
    

// EVENTOS
btnGuardar.addEventListener("click", guardarDatos);
$(".resultados").click(filterArray);
