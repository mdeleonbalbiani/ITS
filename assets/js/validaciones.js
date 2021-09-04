//------ VALIDACIONES ------------
const submitButton = $("#submit-btn");

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
      //console.log(`Input: ${boxInput.name} value: `, boxInput.value);
      validation(box, boxInput);
    }, 300);
  });
});

 //Funcion para validacion de inputs
validation = (box, boxInput) => {

    if (boxInput.name == 'primerEscrito') {
        if ((boxInput.value <= 0) || (boxInput.value > 12) || (isNaN(boxInput.value)) || (boxInput.value==="")) {
            showError(true, box, boxInput);
          } else {
            showError(false, box, boxInput);
          }
    }

    if (boxInput.name == 'primerParcial') {
        if ((boxInput.value <= 0) || (boxInput.value > 12) || (isNaN(boxInput.value)) || (boxInput.value==="")) {
            showError(true, box, boxInput);
          } else {
            showError(false, box, boxInput);
          }
    }

    if (boxInput.name == 'segundoEscrito') {
        if ((boxInput.value <= 0) || (boxInput.value > 12) || (isNaN(boxInput.value)) || (boxInput.value==="")) {
            showError(true, box, boxInput);
          } else {
            showError(false, box, boxInput);
          }
    }

    if (boxInput.name == 'segundoParcial') {
        if ((boxInput.value <= 0) || (boxInput.value > 12) || (isNaN(boxInput.value)) || (boxInput.value==="")) {
            showError(true, box, boxInput);
          } else {
            showError(false, box, boxInput);
          }
    }

    if (boxInput.name == 'tercerEscrito') {
        if ((boxInput.value <= 0) || (boxInput.value > 12) || (isNaN(boxInput.value)) || (boxInput.value==="")) {
            showError(true, box, boxInput);
          } else {
            showError(false, box, boxInput);
          }
    }

    if (boxInput.name == 'faltas') {
        if ((boxInput.value < 0) || (isNaN(boxInput.value)) || (boxInput.value==="") || (boxInput.value > 999)) {
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
        submitButton.attr('disabled', true)
    } else {
        submitButton.attr('disabled', false)
    }
}