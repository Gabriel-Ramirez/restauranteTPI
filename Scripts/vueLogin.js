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
        nuevoCalendario: {
            color: "CCEEFF ",
            idCalendario: 0,
            nombre: "Calendario",
            usuario: ""
        },
        registro: {
            usuario: "",
            contrasenia: ""
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

        verificar() {
            $("body").removeClass("loaded");

            if (
                typeof vueLogin.registro.usuario != "undefined" &&
                typeof vueLogin.registro.contrasenia != "undefined" &&
                vueLogin.registro.usuario.trim() != "" &&
                vueLogin.registro.contrasenia.trim() != ""
            ) {
                axios
                    .get(
                        "https://tpi-project.herokuapp.com/tpi_project/tpi_calendario/usuario/" +
                        vueLogin.registro.usuario
                    )
                    .then(function(response) {
                        vueLogin.usuario = response.data;
                        console.log(vueLogin.usuario);
                        if (vueLogin.usuario != "") {
                            console.log("zhi");
                            if (
                                vueLogin.usuario.contrasenia === vueLogin.registro.contrasenia
                            ) {
                                console.log("Encontrado");
                                localStorage.setItem(
                                    "nombreUsuario",
                                    vueLogin.registro.usuario
                                );
                                window.location.assign(
                                    "https://gabriel-ramirez.github.io/FrontedTPICalendario/pages/calendario.html"
                                );
                            } else {
                                alertaModal();
                            }
                        } else {
                            console.log("no");
                            alertaModal();
                        }
                        $("body").addClass("loaded");
                    })
                    .catch(function(error) {
                        console.log(error);
                        $("body").addClass("loaded");
                    });
            } else {
                $("body").addClass("loaded");
                alertaModal();
            }
        },
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
                        "https://tpi-project.herokuapp.com/tpi_project/tpi_calendario/usuario",
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