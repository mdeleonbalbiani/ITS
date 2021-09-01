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
        /* **Ambos parciales tienen un peso del 75% del total del promedio final** 
           **Los tres escritos tienen un peso del restante 25%** */
        let promedioParciales = (this.primerParcial + this.segundoParcial)*0.75;
        let promedioEscritos = (this.primerEscrito + this.segundoEscrito + this.tercerEscrito)*0.25;
        let promedio = (promedioEscritos + promedioParciales)/2;
        /* La nota maxima es 12 */
        if (promedio > 12) { promedio = 12; }
        return this.promedioFinal = promedio;
    }
    devolucion() {
        /* **El alumno debe tener como minimo 22 clases asistidas**
           **De otra forma, sin importar el promedio obtenido, deberá recursar la materia** */
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

// SELECTOR
let btnGuardar = document.getElementById("submit-btn");

// FUNCIONES

//Funciones de mensajes de exito o error respectivamente, usando plugin
mensajeExito = () => {toastr["success"]("Calculado su promedio final y generada su devolución", "Alumno cargado exitosamente");}
mensajeError = () => {toastr["error"]("El promedio de esta alumno ya fue calculado y guardado", "Alumno ya ingresado");}

//Se identifica en qué grupo estamos trabajando
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

//Se guardan los datos del alumno ingresado
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

    //Se evalua si el array ya contenia información o no
    const listaAlumnos = JSON.parse(localStorage.getItem("alumnos"));
    if (localStorage.getItem("alumnos") != null) {
        //Se valida que el alumno no haya sido ingresado anteriormente
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

/*Se filtra el array de todos los alumnos y se crea un nuevo array para cada grupo */
function filtrarArrayPorGrupos() {
    listadoAlumnos = JSON.parse(localStorage.getItem("alumnos"));
    if (listadoAlumnos != null) {
        const listaGrupo1 = listadoAlumnos.filter(function (element) {
            return (element.idGrupo === 1);
        });
        const listaGrupo2 = listadoAlumnos.filter(function (element) {
            return (element.idGrupo === 2);
        });
        const listaGrupo3 = listadoAlumnos.filter(function (element) {
            return (element.idGrupo === 3);
        });
        const listaGrupo4 = listadoAlumnos.filter(function (element) {
            return (element.idGrupo === 4);
        });
        sessionStorage.setItem('Lista Grupo 1', JSON.stringify(listaGrupo1));
        sessionStorage.setItem('Lista Grupo 2', JSON.stringify(listaGrupo2));
        sessionStorage.setItem('Lista Grupo 3', JSON.stringify(listaGrupo3));
        sessionStorage.setItem('Lista Grupo 4', JSON.stringify(listaGrupo4));

        let grupo = identificaciónDeGrupo();
        switch (grupo) {
            case 1:
                mostrarPromedios(listaGrupo1);
                break;
            case 2:
                mostrarPromedios(listaGrupo2);
                break;
            case 3:
                mostrarPromedios(listaGrupo3);
                break;
            case 4:
                mostrarPromedios(listaGrupo4);
                break;
            default:
                break;
        }
    } 
    else {
        console.log("No hay ingresos de alumnos");
    }
}
/*Se filtra el array de todos los grupos y se crean un nuevos arrays con los alumnos con mayor nota por grupo */
function filtrarArrayMejorAlumno() {
    listadoAlumnos = JSON.parse(localStorage.getItem("alumnos"));
    if (listadoAlumnos != null) {
        listaGrupo1 = JSON.parse(sessionStorage.getItem('Lista Grupo 1'));
        listaGrupo2 = JSON.parse(sessionStorage.getItem('Lista Grupo 2'));
        listaGrupo3 = JSON.parse(sessionStorage.getItem('Lista Grupo 3'));
        listaGrupo4 = JSON.parse(sessionStorage.getItem('Lista Grupo 4'));

        let mayoresNotasGrupo1 = listaGrupo1.sort(((a, b) => b.promedioFinal - a.promedioFinal));
        let alumnoGrupo1 = mayoresNotasGrupo1[0];

        let mayoresNotasGrupo2 = listaGrupo2.sort(((a, b) => b.promedioFinal - a.promedioFinal));
        let alumnoGrupo2 = mayoresNotasGrupo2[0];

        let mayoresNotasGrupo3 = listaGrupo3.sort(((a, b) => b.promedioFinal - a.promedioFinal));
        let alumnoGrupo3 = mayoresNotasGrupo3[0];

        let mayoresNotasGrupo4 = listaGrupo4.sort(((a, b) => b.promedioFinal - a.promedioFinal));
        let alumnoGrupo4 = mayoresNotasGrupo4[0];

        let grupo = identificaciónDeGrupo();
        switch (grupo) {
            case 1:
                mostrarAlumno(alumnoGrupo1);
                break;
            case 2:
                mostrarAlumno(alumnoGrupo2);
                break;
            case 3:
                mostrarAlumno(alumnoGrupo3);
                break;
            case 4:
                mostrarAlumno(alumnoGrupo4);
                break;
            default:
                break;
        }
    }else {
        console.log("Todavía no hay alumnos ingresados para calcular el mejor");
    }
}
/*Se filtra el array de todos los grupos y se crean dos nuevos array, los alumnos aprobados y los alumnos desaprobados */
function filtrarArrayPorAprobacion(){
    listadoAlumnos = JSON.parse(localStorage.getItem("alumnos"));
    if (listadoAlumnos != null) {
        let listaGrupo1 = JSON.parse(sessionStorage.getItem('Lista Grupo 1'));
        let listaGrupo2 = JSON.parse(sessionStorage.getItem('Lista Grupo 2'));
        let listaGrupo3 = JSON.parse(sessionStorage.getItem('Lista Grupo 3'));
        let listaGrupo4 = JSON.parse(sessionStorage.getItem('Lista Grupo 4'));

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

        let grupo = identificaciónDeGrupo();
        switch (grupo) {
            case 1:
                mostrarGrafica(aprobadosGrupo1, desaprobadosGrupo1)
                break;
            case 2:
                mostrarGrafica(aprobadosGrupo2, desaprobadosGrupo2)
                break;
            case 3:
                mostrarGrafica(aprobadosGrupo3, desaprobadosGrupo3)
                break;
            case 4:
                mostrarGrafica(aprobadosGrupo4, desaprobadosGrupo4)
                break;
            default:
                break;
        }
    }else {
        console.log("No se pude generar gráfica aún");
    }
}
//Función que imprime en pantalla los resultados de los promedios
function mostrarPromedios(array){
    $("#imprimirPromedios").empty();
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

//Función que imprime en pantalla el alumno con mejor nota
function mostrarAlumno(alumno) {
    $("#imprimirAlumno").empty();
    $("#imprimirAlumno").append(`
        <div class="card col-sm-3 m-2 cardResultado" style="width: 13rem;">
            <div class="card-body">
                <h5 class="card-title text-center text-white">${alumno.nombre}</h5>
                <h6 class="card-subtitle mb- text-center text-warning">Promedio: ${alumno.promedioFinal}</h6>
                <p class="card-text text-center text-white">${alumno.devolucionFinal}</p>
            </div>
        </div>
        `)
}

//Función que crea la grafica de aprobados y desaprobados del grupo
function mostrarGrafica(nroAprobados, nroDesaprobados) {
    let grafica = $("#grafica");
    let xValues = ["Aprobados", "Desaprobados"];
    let yValues = [nroAprobados, nroDesaprobados];
    let barColors = ["green", "red"];

    new Chart(grafica, {
        type: "doughnut",
        data: {
            labels: xValues,
            datasets: [{
            backgroundColor: barColors,
            data: yValues
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: '#000',
                        font: {
                            size: 15
                        }
                    }
                }
            }
        }
    });
}
// EVENTOS
btnGuardar.addEventListener("click", guardarDatos);
$(".resultados").click(filtrarArrayPorGrupos);
$(".mejorAlumno").click(filtrarArrayMejorAlumno);
$(".grafica").click(filtrarArrayPorAprobacion)

