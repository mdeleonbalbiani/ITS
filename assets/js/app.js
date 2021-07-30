const form = document.getElementById('user-form');
const submitButton = document.getElementsByClassName('btnSubmit');

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

  boxInput.addEventListener('keydown', (event) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
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

    //Declaracion del array
let alumnos = [];

    //Creacion de la clase contructora con sus funciones
class Promedio{
    constructor(primerEscrito, primerParcial, segundoEscrito, segundoParcial, tercerEscrito, faltas) {
        this.primerEscrito = Number(primerEscrito);
        this.primerParcial = Number(primerParcial);
        this.segundoEscrito = Number(segundoEscrito);
        this.segundoParcial = Number(segundoParcial);
        this.tercerEscrito = Number(tercerEscrito);
        this.faltas = Number(faltas);
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
                return "El alumno debe rendir examen en diciembre";
            } else if (this.promedioFinal < 4) {
                return"El alumno debe rendir examen en febrero";
            } else if (this.promedioFinal > 7){
                return "El alumno aprobó la materia con nota " + this.promedioFinal;
            }
        }else{
            return "El alumno debe recursar la materia, no llego a las asistencias minimas necesarias";
        }
    }
}
function mostrar(e) {
        //Previene que se refresque la página
    e.preventDefault();
        //Se remueve el evento para que no se pueda calcular más que una vez
    e.target.removeEventListener(e.type, mostrar);
        //Lectura de valores de cada input y se guardan en variables
    let primerEscrito = document.getElementById("primerEscrito").value;
    let primerParcial = document.getElementById("primerParcial").value;
    let segundoEscrito = document.getElementById("segundoEscrito").value;
    let segundoParcial = document.getElementById("segundoParcial").value;
    let tercerEscrito = document.getElementById("tercerEscrito").value;
    let faltas = document.getElementById("faltas").value;
        //Se crea un nuevo objeto de tipo Promedio, y este se pushea al array alumnos
    alumnos.push(new Promedio(primerEscrito, primerParcial, segundoEscrito, segundoParcial, tercerEscrito, faltas));
    
    alumnos.forEach(alumnos => {
            //Para cada posicion de alumnos se llama a la funcion del objeto
        alumnos.calculoPromedio();
            //Se crean parrafos para mostrar en pantalla resultados
        let resultadoNota = document.getElementById("resultadoNota");
        resultadoNota.textContent = alumnos.promedioFinal;
        let resultadoJuicio = document.getElementById("resultadoJuicio");
        resultadoJuicio.textContent = alumnos.devolucion();
    });
}

    //Se agrega evento submit
form.addEventListener('submit', mostrar);
