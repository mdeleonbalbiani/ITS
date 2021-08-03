//------ VALIDACIONES ------------
const form = document.getElementById('user-form');
const submitButton = document.getElementById('submit-btn');

let timeout = null;
  //Objeto para validacion de errores en input y usarlo para habilitación de boton
let errors = {
    primerEscrito: true,
    primerParcial: true,
    segundoEscrito: true,
    segundoParcial: true,
    tercerEscrito: true,
    faltas: true,
}

document.querySelectorAll('.form-box').forEach((box) => {
  const boxInput = box.querySelector('input');

  boxInput.addEventListener('keydown', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log(`Input: ${boxInput.name} value: `, boxInput.value);
      validation(box, boxInput);
    }, 300);
  });
});

 //Funcion para validacion de inputs
validation = (box, boxInput) => {

    if (boxInput.name == 'primerEscrito') {
        if ((boxInput.value < 0) || (boxInput.value > 12) || (isNaN(boxInput.value)) || (boxInput.value==="")) {
            showError(true, box, boxInput);
          } else {
            showError(false, box, boxInput);
          }
    }

    if (boxInput.name == 'primerParcial') {
        if ((boxInput.value < 0) || (boxInput.value > 12) || (isNaN(boxInput.value)) || (boxInput.value==="")) {
            showError(true, box, boxInput);
          } else {
            showError(false, box, boxInput);
          }
    }

    if (boxInput.name == 'segundoEscrito') {
        if ((boxInput.value < 0) || (boxInput.value > 12) || (isNaN(boxInput.value)) || (boxInput.value==="")) {
            showError(true, box, boxInput);
          } else {
            showError(false, box, boxInput);
          }
    }

    if (boxInput.name == 'segundoParcial') {
        if ((boxInput.value < 0) || (boxInput.value > 12) || (isNaN(boxInput.value)) || (boxInput.value==="")) {
            showError(true, box, boxInput);
          } else {
            showError(false, box, boxInput);
          }
    }

    if (boxInput.name == 'tercerEscrito') {
        if ((boxInput.value < 0) || (boxInput.value > 12) || (isNaN(boxInput.value)) || (boxInput.value==="")) {
            showError(true, box, boxInput);
          } else {
            showError(false, box, boxInput);
          }
    }

    if (boxInput.name == 'faltas') {
        if ((boxInput.value < 0) || (isNaN(boxInput.value)) || (boxInput.value==="")) {
            showError(true, box, boxInput);
          } else {
            showError(false, box, boxInput);
          }
    }
 //Llamada de la funcion para habilitar/deshabilitar boton
 submitController();
};

//Funcion para agregar clases de error o success
showError = (check, box, boxInput) => {
  if (check) {
    box.classList.remove('form-success');
    box.classList.add('form-error');
    errors[boxInput.name] = true;
  } else {
    box.classList.remove('form-error');
    box.classList.add('form-success');
    errors[boxInput.name] = false;
  }
};

//Funcion para habilitar o deshabilitar el boton
function submitController(){
    if (errors.primerEscrito || errors.primerParcial || errors.segundoEscrito || errors.segundoParcial || errors.tercerEscrito || errors.faltas) {
        submitButton.toggleAttribute('disabled', true)
    } else {
        submitButton.toggleAttribute('disabled', false)
    }
}



// SELECCION DE DATOS

let seleccion = document.getElementById('seleccion');

seleccion.addEventListener('change', (event) => {
    let text = seleccion.options[seleccion.selectedIndex].innerText;
    switch (event.target.value) {
        case "1":
            mostrarForm(true);
            sessionStorage.setItem('Nombre', text);
            break;
        case "2":
            mostrarForm(true);
            sessionStorage.setItem('Nombre', text);
            break;
        case "3":
            mostrarForm(true);
            sessionStorage.setItem('Nombre', text);
            break;
        case "4":
            mostrarForm(true);
            sessionStorage.setItem('Nombre', text);
            break;
        case "5":
            mostrarForm(true);
            sessionStorage.setItem('Nombre', text);
            break;
        case "6":
            mostrarForm(true);
            sessionStorage.setItem('Nombre', text);
            break;
        case "7":
            mostrarForm(true);
            sessionStorage.setItem('Nombre', text);
            break;
        case "8":
            mostrarForm(true);
            sessionStorage.setItem('Nombre', text);
            break;
        case "9":
            mostrarForm(true);
            sessionStorage.setItem('Nombre', text);
            break;
        case "10":
            mostrarForm(true);
            sessionStorage.setItem('Nombre', text);
            break;
        case "11":
            mostrarForm(true);
            sessionStorage.setItem('Nombre', text);
            break;
        default:
            mostrarForm(false);
            break;
    }
});

function mostrarForm(boolean) {
    if (boolean) {
        form.classList.remove('formHidden');
    }
    else{
        form.classList.add('formHidden');
    }
}

// ENTIDAD

class Promedio{
    constructor(nombre, primerEscrito, primerParcial, segundoEscrito, segundoParcial, tercerEscrito, faltas) {
        this.nombre = nombre;
        this.primerEscrito = Number(primerEscrito);
        this.primerParcial = Number(primerParcial);
        this.segundoEscrito = Number(segundoEscrito);
        this.segundoParcial = Number(segundoParcial);
        this.tercerEscrito = Number(tercerEscrito);
        this.faltas = Number(faltas);
        this.promedioFinal;
        this.devolucionFinal;
    }
    calculoPromedio(){
        let promedioParciales = (this.primerParcial + this.segundoParcial)*0.75;
        let promedioEscritos = (this.primerEscrito + this.segundoEscrito + this.tercerEscrito)*0.25;
        this.promedioFinal = (promedioEscritos + promedioParciales)/2;
    }
    devolucion() {
        if (this.faltas < 22) {
            if (this.promedioFinal < 7 && this.promedioFinal >= 4) {
                this.devolucionFinal = "El alumno debe rendir examen en diciembre";
            } else if (this.promedioFinal < 4) {
                this.devolucionFinal = "El alumno debe rendir examen en febrero";
            } else if (this.promedioFinal > 7){
                this.devolucionFinal = "El alumno aprobó la materia con nota " + this.promedioFinal;
            }
        }else{
            this.devolucionFinal = "El alumno debe recursar la materia, no llego a las asistencias minimas necesarias";
        }
    }
}

// ARRAY
let alumnos = [];

// --

let table = document.getElementById("table");
let btnGuardar = document.getElementById("submit-btn");

// FUNCIONES
function guardarDatos(e) {
    e.preventDefault();
    let nombre = sessionStorage.getItem('Nombre');
    let primerEscrito = document.getElementById("primerEscrito").value;
    let primerParcial = document.getElementById("primerParcial").value;
    let segundoEscrito = document.getElementById("segundoEscrito").value;
    let segundoParcial = document.getElementById("segundoParcial").value;
    let tercerEscrito = document.getElementById("tercerEscrito").value;
    let faltas = document.getElementById("faltas").value;

    const listaAlumnos = JSON.parse(localStorage.getItem("alumnos"));

    if (localStorage.getItem("alumnos") != null) {
        listaAlumnos.push(new Promedio(nombre, primerEscrito, primerParcial, segundoEscrito, segundoParcial, tercerEscrito, faltas));
        listaAlumnos.forEach(alumno => {
            alumno.calculoPromedio();
            alumno.devolucion();
        });
        localStorage.setItem("alumnos", JSON.stringify(listaAlumnos));
    }
    else {
        localStorage.clear();
        alumnos.push(new Promedio(nombre, primerEscrito, primerParcial, segundoEscrito, segundoParcial, tercerEscrito, faltas));
        alumnos.forEach(alumno => {
            alumno.calculoPromedio();
            alumno.devolucion();
        });
        localStorage.setItem("alumnos", JSON.stringify(alumnos));
    }
}

function mostrar() {
    const imprimirDatos = JSON.parse(localStorage.getItem("alumnos"));
    if (imprimirDatos != null) {
        imprimirDatos.forEach(element => {
            let tabla = document.createElement("tr")

            let td1 = document.createElement("td")
            td1.setAttribute("class", "col-3")
            td1.textContent = `${element.nombre}`
            tabla.appendChild(td1)

            let td2 = document.createElement("td")
            td2.style.textAlign = "center";
            td2.setAttribute("class", "col-2")
            td2.textContent = `${element.promedioFinal}`
            tabla.appendChild(td2)

            let td3 = document.createElement("td")
            td3.setAttribute("class", "col-4")
            td3.textContent = `${element.devolucionFinal}`
            tabla.appendChild(td3)

            table.appendChild(tabla);
        });
    }else{
        console.log("No hay datos en el array");
    }
}

//  EVENTOS

btnGuardar.addEventListener("click", guardarDatos);

mostrar();
