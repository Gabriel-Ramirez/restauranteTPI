var vueLogin = new Vue({
    el: "#frmLogin",
    data: {
        usuarioVerificar: {
            usuario: "",
            contrasenia: ""
        },
        nuevoUsuario: {
            apellido: "",
            contrasenia: "",
            email: "",
            idUsuario: 0,
            nombre: "",
            usuario: ""
        },

        registro: {
            nombre: "",
            password: ""
        },

        usuario: "",
        contador: 0,

        alerta: {
            titulo: "Error",
            mensaje: "Texto"
        }
    },
    mounted: function() {
        this.cargado();
    },

    methods: {
        cargado() {
            $("body").addClass("loaded");
        },

        verificar2(){
            $("body").removeClass("loaded");
            console.log(vueLogin.registro);
            axios.post(baseUri+"usuario/login", vueLogin.registro)
            .then(function(response){
                console.log(response.status);
                if(response.status === 200){
                    localStorage.setItem('token', response.headers.jwt);
                    window.location.assign(
                        baseUriFront+"/index.html"
                    );
                    $("body").removeClass("loaded");

                }

            })
            .catch(function(e){
                $("body").addClass("loaded");
                this.alertaModal();
            })

        },
        // verificar() {
        //     $("body").removeClass("loaded");

        //     if (
        //         typeof vueLogin.registro.usuario != "undefined" &&
        //         typeof vueLogin.registro.contrasenia != "undefined" &&
        //         vueLogin.registro.usuario.trim() != "" &&
        //         vueLogin.registro.contrasenia.trim() != ""
        //     ) {
        //         axios
        //             .post(baseUri+"usuario/login",vueLogin.registro.usuario)
        //             .then(function(response) {
        //                 vueLogin.usuario = response.data;
        //                 console.log(vueLogin.usuario);
        //                 if (vueLogin.usuario != "") {
        //                     if (
        //                         vueLogin.usuario.contrasenia === vueLogin.registro.contrasenia
        //                     ) {
        //                         console.log("Encontrado");
        //                         localStorage.setItem(
        //                             "nombreUsuario",
        //                             vueLogin.registro.usuario
        //                         );
        //                         window.location.assign(
        //                             "http://127.0.0.1:5500/orden.html"
        //                         );
        //                     } else {
        //                         alertaModal();
        //                     }
        //                 } else {
        //                     console.log("no");
        //                     alertaModal();
        //                 }
        //                 $("body").addClass("loaded");
        //             })
        //             .catch(function(error) {
        //                 console.log(error);
        //                 $("body").addClass("loaded");
        //             });
        //     } else {
        //         $("body").addClass("loaded");
        //         alertaModal();
        //     }
        // },
       
        agregarUsuario() {
            $("body").removeClass("loaded");
            // validacion
            console.log("hey yo");
            var yourFormElement = $("form")[0];
            yourFormElement.checkValidity();
            yourFormElement.reportValidity();
            console.log(yourFormElement.reportValidity());
            if (yourFormElement.reportValidity()) {
                axios
                    .post(
                        baseUri+"/usuario",
                        this.nuevoUsuario
                    )
                    .then(function(response) {
                        vueLogin.nuevoCalendario.usuario = vueLogin.nuevoUsuario;
                        axios
                            .post(
                                "https://tpi-project.herokuapp.com/tpi_project/tpi_calendario/calendario",
                                vueLogin.nuevoCalendario
                            )
                            .then(function(response) {
                                localStorage.setItem(
                                    "idCalendarioLS",
                                    JSON.stringify(vueLogin.nuevoCalendario)
                                );
                                window.setTimeout(() => {
                                    window.location.assign(
                                        "https://gabriel-ramirez.github.io/FrontedTPICalendario/pages/calendario.html"
                                    );
                                }, 2000);
                            })
                            .catch(function(error) {
                                console.log(error);
                                $("body").addClass("loaded");
                            });
                        vueLogin.nuevoUsuario = {
                            apellido: "",
                            contrasenia: "",
                            email: "",
                            idUsuario: 0,
                            nombre: "",
                            usuario: ""
                        };
                    })
                    .catch(function(error) {
                        console.log(error);
                        $("body").addClass("loaded");
                    });
            } else {
                $("body").addClass("loaded");
            }
        }
    }
});