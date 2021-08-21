// SELECCION DE DATOS

let seleccion = document.getElementById('seleccion');
const form = document.getElementById('user-form');

seleccion.addEventListener('change', (event) => {
    let text = seleccion.options[seleccion.selectedIndex].innerText;
    if (event.target.value >= 1) {
        mostrarForm(true);
        sessionStorage.setItem('Nombre', text);
    }
    else{
        mostrarForm(false);
    }
});

function mostrarForm(boolean) {
    if (boolean) {
        //form.reset();
        form.classList.remove('formHidden');
    }
    else{
        form.classList.add('formHidden');
    }
}