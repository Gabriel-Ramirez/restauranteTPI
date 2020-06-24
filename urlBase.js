const baseUri = 'https://restaurantebk.herokuapp.com/restauranteBK/tpi_restaurante/';
//const baseUri = 'http://localhost:3000/api';
const baseUriFront = 'https://gabriel-ramirez.github.io/restauranteTPI'

function cerrarSesion(){
    localStorage.removeItem('token');
    window.location = "./login.html";
};