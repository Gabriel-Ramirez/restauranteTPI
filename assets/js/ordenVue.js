const vordenes = new Vue({
    el: '#ordenes',
    data: {
        ordenes: [],
        categorias: [],
        productos: [],
        orderByCampo: "",
        orderByAsc: 1,
        textoBusqueda: "",
        textoBusquedaCategoria: "",
        detalleOrdenes: [],
        productoSelected: "",
        categoriaSelected: 1,
        detallesDeNuevaOrden: [],
        detallesDeOrdenes: [],
        precioTotal: "",
        totalNuevaOrden: 0,
        productoSelectedAgregar: "",
        ordenesEstado: true,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'JWT': localStorage.getItem("token"),
            "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, jwt, mensaje",

        },
        nuevoDetalleOrden: {
            "cantidad": 0,
            "idOrden": 0,
            "idProducto": 0,
            "precioUnitario": 0
        },
        detalleOrdenSelected: [],
        cambio: 0,
        efectivo: "",
        alerta: {
            titulo: "Error",
            mensaje: "Texto"
        },
        nuevaOrden: {
            "cliente": " ",
            "estado": "A",
            "fecha": " ",
            "idOrden": 0,
            "mesa": " ",
            "observacion": " ",
            "total": 0
        },
        ordenSelected: {
            "cliente": " ",
            "estado": "A",
            "fecha": " ",
            "idOrden": 0,
            "idUsuario": {
                "idUsuario": '',
                "nombre": ''
            },
            "mesa": " ",
            "observacion": " ",
            "total": 0
        },
        ordenSeleccionada: 1,
        nuevoProducto: '',
        nuevoProductoidCategoria: '',
        nuevoProductoNombre: '',
        nuevoProductoPrecio: '',
        nuevoProductoEsPreparado: ''
    },

    mounted: function () {
        this.token = localStorage.getItem('token')
        this.cargarDatos();
    },
    methods: {

        orderBy: function (campo) {
            console.log(campo);
            if (this.orderByCampo == campo)
                this.orderByAsc *= -1;
            this.orderByCampo = campo;

            if (campo === "numeroDeOrden") {
                this.ordenes.sort(function (a, b) {
                    // Se debe usar vueProduct.orderByAsc
                    // porque this ya no hace referencia al objeto vue
                    console.log("ordenar por numero de orden")
                    return vordenes.orderByAsc *
                        (a.idOrden - b.idOrden);
                });
            }
            if (campo === "mesa") {
                this.ordenes.sort(function (a, b) {
                    return vordenes.orderByAsc *
                        (a.mesa - b.mesa);
                });
            }
            if (campo === "cliente") {
                vordenes.orderByAsc === 1 ? vordenes.ordenes.sort((a, b) => (a.cliente > b.cliente) ? 1 : -1) : vordenes.ordenes.sort((a, b) => (a.cliente < b.cliente) ? 1 : -1);
            }
            if (campo === "mesero") {
                vordenes.orderByAsc === 1 ? vordenes.ordenes.sort((a, b) => (a.idUsuario.nombre > b.idUsuario.nombre) ? 1 : -1) : vordenes.ordenes.sort((a, b) => (a.idUsuario.nombre < b.idUsuario.nombre) ? 1 : -1);
            }
            if (campo === "fecha") {
                vordenes.orderByAsc === 1 ? vordenes.ordenes.sort((a, b) => (a.fecha > b.fecha) ? 1 : -1) : vordenes.ordenes.sort((a, b) => (a.fecha < b.fecha) ? 1 : -1);
            }

            if (campo == "total") {
                this.ordenes.sort(function (a, b) {
                    // Se debe usar vueProduct.orderByAsc
                    // porque this ya no hace referencia al objeto vue
                    return vordenes.orderByAsc * (a.total - b.total);
                });

            }
        },
        quitarAdetalle(productoSelected) {
            var cantidad = 0;
            this.nuevoDetalleOrden.idOrden = this.ordenSelected.idOrden;
            this.nuevoDetalleOrden.idProducto = this.productos[this.productoSelected].idProducto;
            this.nuevoDetalleOrden.precioUnitario = this.productos[this.productoSelected].precio;
            this.nuevoDetalleOrden.cantidad = cantidad;

            if (this.detallesDeNuevaOrden.length != 0) {
                for (var index = 0; index < this.detallesDeNuevaOrden.length; index++) {
                    const element = this.detallesDeNuevaOrden[index];
                    if (element.idProducto === this.nuevoDetalleOrden.idProducto && element.idOrden === this.nuevoDetalleOrden.idOrden) {
                        cantidad = element.cantidad;
                        if (cantidad > 0) {
                            cantidad = cantidad - 1;
                            vordenes.detallesDeNuevaOrden[index].cantidad = cantidad;
                        }
                        if (cantidad === 0) {
                            this.detallesDeNuevaOrden.splice(index, 1);
                        }
                    }
                }
            }


            this.nuevoDetalleOrden = {
                    "cantidad": 0,
                    "idOrden": 0,
                    "idProducto": 0,
                    "precioUnitario": 0
                },
                this.obtenerElTotalNuevaOrden();
            console.log(this.detallesDeNuevaOrden);
        },
        actualizarTotalOrden() {
            var totalAnterior = this.ordenSelected.total;
            this.ordenSelected.total = (this.precioTotal + totalAnterior).toFixed(2);
            console.log(this.ordenSelected.total);
            axios.put(baseUri + '/orden', {
                    headers
                }, this.ordenSelected)
                .then(function (response) {
                    console.log("Se actualizo el total");
                    vordenes.cargarDatos();
                })
                .catch(function (error) {
                    console.log("No se actualizo el total");
                    console.log(error)
                })

        },
        agregarAOrdenDB() {
            console.log("agregar a orden DB...");
            debugger;
            for (let index = 0; index < this.detalleOrdenes.length; index++) {
                const yaEnorden = this.detalleOrdenes[index];
                for (let i = 0; i < this.detallesDeNuevaOrden.length; i++) {
                    const porAgregar = this.detallesDeNuevaOrden[i];
                    if (yaEnorden.idOrden === porAgregar.idOrden && yaEnorden.idProducto === porAgregar.idProducto) {
                        var NuevaCantidad = yaEnorden.cantidad + porAgregar.cantidad;
                        porAgregar.cantidad = NuevaCantidad;
                        console.log("ya hay un producto igual en la orden")
                        axios.put(baseUri + '/orden', {
                                headers
                            }, porAgregar)
                            .then(function (response) {
                                vordenes.cargarDatos();
                                vordenes.actualizarTotalOrden();
                                console.log("se agrego con exito")
                                vordenes.mostrarAlertaCambio('Exito', 'Se agrego a la orden correctamente');
                            })
                            .catch(function (error) {
                                console.log(error);
                                vordenes.mostrarAlertaCambio('Error', error);
                            });
                    } else {
                        if (yaEnorden.idOrden === porAgregar.idOrden) {
                            console.log("no hay productos iguales en la orden")
                            axios.post(baseUri + '/orden', {
                                    headers
                                }, porAgregar)
                                .then(function (response) {
                                    vordenes.cargarDatos();
                                    vordenes.actualizarTotalOrden();
                                    console.log("se agrego con exito")
                                    vordenes.mostrarAlertaCambio('Exito', 'Se agrego a la orden correctamente');
                                }).catch(function (error) {
                                    vordenes.cargarDatos();
                                });
                        }
                    }

                }

            }

        },
        btnAgregarProductos() {
            this.nuevoDetalleOrden = {
                    "cantidad": 0,
                    "idOrden": 0,
                    "idProducto": 0,
                    "precioUnitario": 0
                },
                this.detallesDeNuevaOrden = [],
                this.productoSelected = "";
            this.categoriaSelected = 1,
                this.textoBusquedaProducto = ""

        },

        iniciarNuevaOrden() {
            this.nuevoDetalleOrden = {
                    "cantidad": 0,
                    "idOrden": 0,
                    "idProducto": 0,
                    "precioUnitario": 0
                },
                this.nuevaOrden = {
                    "cliente": " ",
                    "estado": "A",
                    "fecha": " ",
                    "idOrden": 0,
                    "mesa": " ",
                    "observacion": " ",
                    "total": 0
                },
                this.detallesDeNuevaOrden = []
        },

        obtenerElTotalNuevaOrden() {
            this.precioTotal = this.detallesDeNuevaOrden.reduce((total, item) => {
                return total + (item.precioUnitario * item.cantidad);
            }, 0);

            this.totalNuevaOrden = this.precioTotal.toFixed(2);
        },
        buscarCantidad: function (p) {
            producto = this.productos[p];
            for (const iterator of this.detallesDeNuevaOrden) {
                if (iterator.idProducto === producto.idProducto) {
                    return iterator.cantidad;
                }
            }
            return 0;
        },

        cobrarDesdeModal() {

            this.nuevaOrdenDB();
            this.mostrarCobrar();
        },

        nuevaOrdenDB() {

            this.nuevaOrden.idUsuario = parseInt(localStorage.getItem('idUsuario'));
            this.totalNuevaOrden = 0;
            this.nuevaOrden.fecha = new Date();
            this.obtenerElTotalNuevaOrden();
            this.nuevaOrden.total = parseFloat(this.totalNuevaOrden);

            console.log('..' + this.headers.JWT);
            console.log(this.nuevaOrden)
            axios.post(baseUri + '/orden', this.nuevaOrden, {
                    headers: this.headers
                })
                .then(function (response) {
                    console.log(response.data)
                    vordenes.ordenSelected = response.data;
                    vordenes.detallesDeNuevaOrden.map(item => {
                        item.idOrden = response.data.idOrden;
                        return item;
                    })
                    console.log(vordenes.detallesDeNuevaOrden)
                    for (var iterator of vordenes.detallesDeNuevaOrden) {
                        axios.post(baseUri + '/detalleorden', iterator, {
                                headers
                            }, )
                            .then(function (res) {
                                vordenes.iniciarNuevaOrden();
                                console.log('recargando los datos')
                                vordenes.cargarDatos();
                                vordenes.mostrarAlertaCambio('Exito', 'Se agrego la orden');
                            })
                            .catch(function (e) {
                                vordenes.mostrarAlertaCambio('Error', e)
                            })
                    }
                    console.log("Se creo la ordnde")

                })
                .catch(function (error) {
                    console.log(error)
                })

            this.cargarDatos();
            this.nuevaOrden = "";

        },

        agregarAdetalle(productoSelected) {
            var cantidad = 0;
            this.nuevoDetalleOrden.idOrden = this.ordenSelected.idOrden;
            this.nuevoDetalleOrden.idProducto = this.productos[this.productoSelected].idProducto;
            this.nuevoDetalleOrden.precioUnitario = this.productos[this.productoSelected].precio;
            this.nuevoDetalleOrden.cantidad = cantidad;

            if (this.detallesDeNuevaOrden.length === 0) {
                this.nuevoDetalleOrden.cantidad = 1;
                vordenes.detallesDeNuevaOrden.push(this.nuevoDetalleOrden);
            } else {
                for (var index = 0; index < this.detallesDeNuevaOrden.length; index++) {
                    const element = this.detallesDeNuevaOrden[index];
                    if (element.idProducto === this.nuevoDetalleOrden.idProducto && element.idOrden === this.nuevoDetalleOrden.idOrden) {
                        cantidad = element.cantidad;
                        cantidad = cantidad + 1;
                        vordenes.detallesDeNuevaOrden[index].cantidad = cantidad;
                    }
                }

                var producto = vordenes.detallesDeNuevaOrden.find(dno => {
                    return dno.idProducto === vordenes.nuevoDetalleOrden.idProducto;
                });

                if (typeof producto === 'undefined') {
                    this.nuevoDetalleOrden.cantidad = 1;
                    vordenes.detallesDeNuevaOrden.push(this.nuevoDetalleOrden);
                }
            }

            this.nuevoDetalleOrden = {
                "cantidad": 0,
                "idOrden": 0,
                "idProducto": 0,
                "precioUnitario": 0
            }
            this.obtenerElTotalNuevaOrden();
        },

        buscar: function (x) {
            if (this.textoBusqueda == "")
                return true;
            var ord = this.ordenes[x].idOrden + this.ordenes[x].mesero + this.ordenes[x].mesa + this.ordenes[x].cliente + this.frontEndDateFormat(this.ordenes[x].fecha);
            ord = ord.toUpperCase();
            console.log(ord);

            if (ord.indexOf(this.textoBusqueda.toUpperCase()) >= 0)
                return true;
            else
                return false;

        },
        buscarCategoria: function (x) {

            if (this.textoBusquedaCategoria == "")
                return true;

            var cad = this.productos[x].nombreProducto +
                this.productos[x].idProducto +
                this.productos[x].precio;
            cad = cad.toUpperCase();

            if (cad.indexOf(this.textoBusquedaCategoria.toUpperCase()) >= 0)
                return true;
            else
                return false;
        },
        mldCerrarOrden() {
            if (this.ordenSelected.estado == 'A') {
                $('#modalCerrarOrden').modal('show');
            }
        },
        mldCobrarOrden() {
            if (this.ordenSelected.estado == 'A') {
                $('#modalCobrar').modal('show');
            }
        },
        cargarDatos: function () {
            // console.log(this.token);
            axios.get(baseUri + '/orden', {
                    headers
                })
                .then(function (res) {
                    vordenes.ordenes = res.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });

            //PRODUCTOS
            axios.get(baseUri + '/producto', {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'jwt': this.token,
                        "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, jwt, mensaje"
                    }
                })
                .then(function (res) {
                    vordenes.productos = res.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });

            //Cargar Categorias
            axios.get(baseUri + '/categoria', {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'jwt': this.token,
                        "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, jwt, mensaje"
                    }
                })
                .then(function (res) {
                    vordenes.categorias = res.data;
                })
                .catch(function (error) {
                    console.log(error);
                });


            //Cargar detalle de orden
            axios.get(baseUri + '/detalleorden', {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'jwt': this.token,
                        "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, jwt, mensaje"
                    }
                })
                .then(function (res) {
                    vordenes.detalleOrdenes = res.data;
                })
                .catch(function (error) {
                    console.log(error);
                });

            //Detalle Orden
            axios.get(baseUri + '/detalleorden', {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'jwt': this.token,
                        "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, jwt, mensaje"
                    }
                })
                .then(function (res) {
                    vordenes.detalleOrden = res.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });

        },

        nombreProducto: function (idProd) {
            return this.productos.find(function (p) {
                return p.idProducto == idProd
            }).nombreProducto;
        },

        cerrarOrden: function () {
            this.ordenSelected.estado = 'c';
            this.ordenSelected.idUsuario = this.ordenSelected.idUsuario.idUsuario;
            axios.put(baseUri + '/orden', this.ordenSelected, {
                    headers
                })
                .then(function (response) {
                    vordenes.mostrarAlertaCambio('Exito', 'La orden fue cerrada');
                })
                .catch(function (e) {
                    vordenes.mostrarAlertaCambio('Error', 'No se pudo cerrar la orden');
                })

        },

        obtenerDetalleOrden: function () {
            this.detalleOrdenSelected = this.detalleOrden.filter(item => {
                return item.detalleOrdenPK.idOrden === this.ordenSelected.idOrden
            });

            this.productoSelected = this.detalleOrden.find(prod => {
                return this.detalleOrdenSelected.idProducto === this.productos.idProducto
            });

            $('#addModal').modal('show');

            this.precioTotal = this.detalleOrdenSelected.reduce((total, item) => {
                return total + (item.precioUnitario * item.cantidad);
            }, 0);

            this.precioTotal = this.precioTotal.toFixed(2);

        },

        obtenerOrden: function () {
            this.ordenSeleccionada = this.ordenes.find(ord => {
                return ord === this.ordenSelected
            })
            // console.log(this.ordenSeleccionada.idOrden);
            this.mostrarCobrar();
        },

        mostrarCobrar: function () {
            $('#modalCobrar').modal('show');
        },

        cobrar: function () {
            this.efectivo = "";
            this.cambio = "";
            this.obtenerOrden();
            this.mostrarCobrar();

        },

        cobrarOrden() {
            console.log(this.ordenSelected.estado);
            if (this.ordenSelected.estado == 'A') {
                console.log("verificacion de efectivo");
                if (this.efectivo > this.ordenSelected.total) {
                    this.cambio = this.efectivo - this.ordenSelected.total;
                    let cobrar = {
                        "cliente": this.ordenSelected.cliente,
                        "estado": "C",
                        "fecha": this.ordenSelected.fecha,
                        "idUsuario": parseInt(localStorage.getItem('idUsuario')),
                        "idOrden": parseInt(this.ordenSelected.idOrden),
                        "mesa": this.ordenSelected.mesa,
                        "observacion": this.ordenSelected.observacion,
                        "total": parseFloat(this.ordenSelected.total)
                    }
                    console.log(cobrar)
                    axios.put(baseUri + '/orden', cobrar, {
                            headers: this.headers
                        })
                        .then(response => {
                            console.log(response);
                            vordenes.mostrarAlertaCambio("Exito: ", "Cambio:$" + (this.cambio).toFixed(2) + "   Total:$" + this.ordenSelected.total + "   Efectivo:$" + this.efectivo);
                            vordenes.cargarDatos();
                        })
                        .catch(error => {
                            this.mostrarAlertaCambio("Error", error)
                        });
                } else {
                    this.mostrarAlertaCambio('Error:', 'Efectivo insuficiente');
                }
            } else {
                this.mostrarAlertaCambio('Error', 'La Orden ya fue cerrada o cobrada');
            }
        },

        mostrarAlertaCambio: function (titu, msg) {
            this.alerta.titulo = titu;
            this.alerta.mensaje = msg;

            $("#alertaCambio").show('fade');
            setTimeout(function () {
                $("#alertaCambio").hide('fade');
            }, 5000);

        },
        cerrarAlerta: function () {
            $('#alertaCambio').hide('fade');
        },
        frontEndDateFormat: function (datetime) {
            let date = new Date(datetime);
            var year = date.getFullYear();
            var month = (1 + date.getMonth()).toString();
            month = month.length > 1 ? month : '0' + month;
            var day = date.getDate().toString();
            day = day.length > 1 ? day : '0' + day;
            return day + '-' + month + '-' + year;
        },

    },

});

$(document).ready(function () {

    $('#btnCobrar').click(function () {
        $('#myAlert').show('fade');

        setTimeout(function () {
            $('#myAlert').hide('fade');
        }, 4000);

    });

    $('#linkClose').click(function () {
        $('#myAlert').hide('fade');
    });

});