const baseUri = 'https://restaurantebk.herokuapp.com/restauranteBK/tpi_restaurante';
// const baseUri = 'http://localhost:8080/restauranteBK/tpi_restaurante';
// const baseUriFront = 'https://gabriel-ramirez.github.io/restauranteTPI',
const baseUriFront = 'http://localhost:5500';

const headers = {
    'Content-Type':'application/json;charset=utf-8',
    'JWT': localStorage.getItem('token'),
    "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, jwt, mensaje"
}

function cerrarSesion(){
    localStorage.removeItem('token');
    window.location = "./login.html";
};