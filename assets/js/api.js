const URL_CALENDAR = "https://calendarific.com/api/v2/holidays?api_key=733d861d84fa9e11d734d61ae64fe2890226564f&country=UY&year=2021";

$("#botonCalendario").click(() => {
    $("#feriados").slideDown();
    $.get(URL_CALENDAR, function (response, state) {
        if (state === "success") {
           //console.log(response);
            let feriados = response.response.holidays;
            feriados.forEach(element => {
                $("#feriados").append(`
                <div class="card col-sm-3 m-2 cardResultado" style="width: 12rem;">
                <div class="card-body">
                  <h5 class="card-title text-center">${element.name}</h5>
                  <h6 class="card-subtitle mb-2 text-muted text-center">Fecha: ${element.date.iso}</h6>
                </div>
            </div>`);
            }); 
        }
    });
});