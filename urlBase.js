const baseUri = 'https://restaurantebk.herokuapp.com/restauranteBK/tpi_restaurante';
// const baseUri = 'http://localhost:8080/restauranteBK/tpi_restaurante/';
// const baseUriFront = 'https://gabriel-ramirez.github.io/restauranteTPI',
const baseUriFront = 'http://localhost:5500'

function cerrarSesion(){
    localStorage.removeItem('token');
    window.location = "./login.html";
};