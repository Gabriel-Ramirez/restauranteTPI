const vueApp = new Vue({
    el: '#app',
    data: {
        alerta: {
            titulo: "Error",
            mensaje: "Texto"
        },
        categorias: [],
        categoriaSeleccionada: {
            "idCategoria": 0,
            "nombreCategoria": ""
        },
        catSelected: 0,
        categoriaEdit: 0,
        nuevaCategoria: {
            "idCategoria": 0,
            "nombreCategoria": ""
        },
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'jwt': localStorage.getItem("token"),
            "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, jwt, mensaje"
        }

    },

    mounted: function () {
        this.cargarDatos();
    },

    methods: {
        agregarCategoria() {
            axios.post(baseUri + '/categoria', this.nuevaCategoria,{
                headers: this.headers
            })
                .then(function (response) {
                    vueApp.cargarDatos();
                    vueApp.nuevaCategoria = {
                        "idCategoria": 0,
                        "nombreCategoria": ""
                    }
                    vueApp.mostrarAlerta('Exito', 'Se agrego la categoria correctamente');
                })
                .catch(function (error) {
                    console.log(error);
                    vueApp.mostrarAlerta('Error', error);
                });
        },

        mostrarCategoria() {
            console.log(this.categorias[this.categoriaSeleccionada]);
        },


        editarCategoria() {
            axios.put(baseUri + '/categoria', {
                //Este es el body de la request que se envia
                    idCategoria: this.categoriaSeleccionada.idCategoria,
                    nombreCategoria: this.categoriaSeleccionada.nombreCategoria
                }, {
                    headers: this.headers
                })
                .then(response => {
                    this.mostrarAlerta("Exito", "Se edito con Exito")
                    // console.log(response);
                })
                .catch(error => {
                    this.mostrarAlerta("Error", error)
                    // console.log(err);
                });

        },


        eliminarCategoria: function () {

            axios.delete(baseUri + '/Categoria/' + this.categoriaSeleccionada.idCategoria)
                .then(function (res) {
                    console.log("DELETE PRODUCTO");
                    vueApp.cargarDatos();
                    vueApp.mostrarAlerta("Producto Eliminado", "El producto se eliminó de la base de datos");

                })
                .catch(function (error) {
                    // handle error
                    vueApp.mostrarAlerta("Error:", error);

                    console.log(error);
                });
        },

        nombreCategoria() {
            return this.categoriaSeleccionada.nombreCategoria
            // this.catSelected = this.categorias.find(cat =>{
            //   return cat.idCategoria === this.categoriaSeleccionada

            // });
            // console.log(this.catSelected.nombreCategoria);
        },


        //consume la API con axios
        cargarDatos: function () {
            //Carga categorias
<<<<<<< HEAD
            axios.get(baseUri + '/categoria', {
                    headers: this.headers
                })
=======
            axios.get(baseUri + '/categoria', {headers})
>>>>>>> 66e267081f138e11472ac8ed5614a4dcc3e32bea
                .then(function (response) {
                    vueApp.categorias = response.data;
                    console.log("se cargaron los datos");
                })
                .catch(function (error) {
                    console.log(error);

                });

            // //Carga productos
            // axios.get(baseUri+'/producto')
            //     .then(function(response) {
            //         vueApp.productos = response.data;
            //     })
            //     .catch(function(error) {
            //         console.log(error);
            //     });
        },

        mostrarAlerta: function (titu, msg) {
            this.alerta.titulo = titu;
            this.alerta.mensaje = msg;

            $("#miAlerta").show('fade');
            setTimeout(function () {
                $("#miAlerta").hide('fade');
            }, 5000);

        },
        cerrarAlerta: function () {
            $('#miAlerta').hide('fade');
        },

    },

    computed: {
        categoriaActiva() {
            this.categoriaEdit = this.categorias.find(it => {
                console.log(this.categoriaSeleccionada.idCategoria);
                return it.idCategoria === this.categoriaSeleccionada.idCategoria
            });
            console.log(this.categoriaEdit);
        },

    }



})