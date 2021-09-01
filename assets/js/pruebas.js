


function filterArray(){
    /* $("#imprimirGrafica").empty(); */
    listadoAlumnos = JSON.parse(localStorage.getItem("alumnos"));

    if (listadoAlumnos != null) {
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

let mayoresNotasGrupo1 = listaGrupo1.sort(((a, b) => b.promedioFinal - a.promedioFinal));
let alumnoGrupo1 = mayoresNotasGrupo1[0];

let mayoresNotasGrupo2 = listaGrupo2.sort(((a, b) => b.promedioFinal - a.promedioFinal));
let alumnoGrupo2 = mayoresNotasGrupo2[0];

let mayoresNotasGrupo3 = listaGrupo3.sort(((a, b) => b.promedioFinal - a.promedioFinal));
let alumnoGrupo3 = mayoresNotasGrupo3[0];

let mayoresNotasGrupo4 = listaGrupo4.sort(((a, b) => b.promedioFinal - a.promedioFinal));
let alumnoGrupo4 = mayoresNotasGrupo4[0];

/* console.log(alumnoGrupo1);
console.log(alumnoGrupo2);
console.log(alumnoGrupo3);
console.log(alumnoGrupo4); */


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
        mostrarAlumno(alumnoGrupo1);
        mostrarGrafica(aprobadosGrupo1, desaprobadosGrupo1)
        break;
    case 2:
        mostrarPromedios(listaGrupo2);
        mostrarAlumno(alumnoGrupo2);
        mostrarGrafica(aprobadosGrupo2, desaprobadosGrupo2)
        break;
    case 3:
        mostrarPromedios(listaGrupo3);
        mostrarAlumno(alumnoGrupo3);
        mostrarGrafica(aprobadosGrupo3, desaprobadosGrupo3)
        break;
    case 4:
        mostrarPromedios(listaGrupo4);
        mostrarAlumno(alumnoGrupo4);
        mostrarGrafica(aprobadosGrupo4, desaprobadosGrupo4)
        break;
    default:
        break;
}
    } else {
        console.log("No hay ingresos de alumnos");
    }
    
}