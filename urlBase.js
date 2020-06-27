const baseUri = 'https://restaurantebk.herokuapp.com/restauranteBK/tpi_restaurante';
// const baseUri = 'http://localhost:8080/restauranteBK/tpi_restaurante';
// const baseUriFront = 'https://gabriel-ramirez.github.io/restauranteTPI',
const baseUriFront = 'http://localhost:5500';

const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'JWT': localStorage.getItem('token'),
    "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, jwt, mensaje"
}

function cerrarSesion() {
    localStorage.removeItem('token');
    window.location = "./login.html";
};


//chequear el token
function checkJWT() {
    if (location.pathname === "/login.html") {} else {
        if (localStorage.getItem('token') === null) {
            //Verifica si estamos en github pages o en local
            if (location.origin === 'https://gabriel-ramirez.github.io') {
                //Si estamos en el repo
                location.href = location.origin + "/restauranteTPI/login.html";
            } else {
                //Si estamos en local
                location.href = location.origin + "/login.html";
            }
        } else {
            //Si existe el token y verifica que sea uno valido
            axios.get(baseUri + '/usuario/checkJWT/'+localStorage.getItem('token'))
                .then(response => {
                    console.log("JWT: ","valido");
                })
                .catch(function (error) {
                    console.log(error);
                    localStorage.removeItem("token");
                    checkJWT();
                });
        }
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    checkJWT();
});