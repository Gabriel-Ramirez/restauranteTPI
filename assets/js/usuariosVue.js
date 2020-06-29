const vueApp = new Vue({
    el: '#app',
    data: {
        alerta: {
            titulo: "Error",
            mensaje: "Texto"
        },
        usuarios: [],
        usuario: {
            "idUsuario": null,
            "nombre": "",
            "apellido": "",
            "categoria": "",
            "password": ""
        },
        usuarioSelected: {}
    },

    mounted: function () {
        this.cargarDatos();
    },

    methods: {
        agregarUsuario() {
            axios.post(baseUri + '/usuario', this.usuario, {
                    headers
                })

                .then(function (response) {

                    vueApp.cargarDatos();
                    vueApp.usuario = {
                        "idUsuario": null,
                        "nombre": "",
                        "apellido": "",
                        "categoria": "",
                        "password": ""
                    }
                    vueApp.mostrarAlerta('Exito', 'Se agrego el usuario correctamente');
                })
                .catch(function (error) {
                    console.log(error);
                    vueApp.mostrarAlerta('Error', error);
                });
        },
        editarUsuario() {
            console.log(JSON.stringify(this.usuarioSelected))
            axios.put(baseUri + '/usuario', this.usuarioSelected, {
                    headers
                })
                .then(response => {
                    console.log("se edito con exito");
                    vueApp.mostrarAlerta("Exito", "Se edito con Exito")
                })
                .catch(error => {
                    vueApp.mostrarAlerta("Error", error)
                });

        },
        eliminarUsuario: function () {
            axios.delete(baseUri + '/usuario/' + this.usuarioSelected.idUsuario, {
                    headers
                })
                .then(function (res) {
                    vueApp.cargarDatos();
                    vueApp.mostrarAlerta("Usuario Eliminado", "El usuario se eliminó de la base de datos");
                })
                .catch(function (error) {
                    // handle error
                    vueApp.mostrarAlerta("Error:", error);
                    console.log(error);
                });
        },
        //consume la API con axios
        cargarDatos: function () {
            //Carga categorias
            axios.get(baseUri + '/usuario', {
                    headers
                })
                .then(function (response) {
                    vueApp.usuarios = (response.data);
                    console.log("se cargaron los datos");
                })
                .catch(function (error) {
                    console.log(error);
                });

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
})