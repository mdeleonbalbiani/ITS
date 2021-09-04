//Iniciar sesión
$("#submit").click(()=>{
    let usuario, pass;

    usuario = document.getElementById("nroId").value;
    pass = document.getElementById("pass").value;
    
    if (usuario == "0000001" && pass == "user"){ 
        window.location = "index.html";
        localStorage.setItem("Sesión iniciada", true)
    } 
    else{ 
        $(".errorLogin").removeAttr("hidden")
        document.getElementById("nroId").value = "";
        document.getElementById("pass").value = "";
    } 
});

//Cerrar sesión
$("#cerrarSesion").click(()=>{
    localStorage.removeItem("Sesión iniciada");
    window.location = "login.html";
});