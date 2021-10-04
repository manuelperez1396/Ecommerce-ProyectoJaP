const logIn = [];
const ingresar = () => {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("password").value;
    if (user && pass) {
       document.getElementById("user").value="";
       document.getElementById("password");
       logIn.push({user});
       localStorage.setItem("usuario",user);
        window.location="home.html";
    } else {
        alert("Usuario y contraseña no deben ser vacíos");
      }  
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("ingresar-boton").addEventListener("click", ingresar);
});