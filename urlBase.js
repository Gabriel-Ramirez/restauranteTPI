const baseUri = 'https://restaurantebk.herokuapp.com/restauranteBK/tpi_restaurante/';
//const baseUri = 'http://localhost:3000/api';
const baseUriFront = 'http://127.0.0.1:5500'

function cerrarSesion(){
    localStorage.removeItem('token');
    window.location = "./login.html";
};