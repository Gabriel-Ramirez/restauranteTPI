$('.form').find('input, textarea').on('keyup blur focus', function(e) {

    var $this = $(this),
        label = $this.prev('label');

    if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.removeClass('highlight');
        }
    } else if (e.type === 'focus') {

        if ($this.val() === '') {
            label.removeClass('highlight');
        } else if ($this.val() !== '') {
            label.addClass('highlight');
        }
    }

});

$('.tab a').on('click', function(e) {

    e.preventDefault();

    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');

    target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();

    $(target).fadeIn(600);

});


// Esto es el backgroud del body -----------------------------------------


particlesJS("bg", {
    "particles": {
        "number": {
            "value": 300,
            "density": {
                "enable": true,
                "value_area": 315
            }
        },
        "color": {
            "value": "#000000"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.5,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 5.5,
                "opacity_min": 0.2,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 0.9,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": false,
                "mode": "repulse"
            },
            "onclick": {
                "enable": false,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});
var count_particles, stats, update;
count_particles = document.querySelector('.js-count-particles');
update = function() {
    if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
        if (count_particles != undefined && count_particles != null)
            count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
    }
    requestAnimationFrame(update);
};
requestAnimationFrame(update);
let cas1 = ((document.documentElement.clientHeight - document.getElementById("frmLogin").offsetHeight) / 2);
document.getElementById("frmLogin").style.marginTop = cas1 + "px";

// alert modal
let modal = $(".alert-wrapper .alert"),
    overlay = $(".alert-wrapper .overlay"),
    close = $(".alert-wrapper .btn-wrap button");



function alertaModal() {
    $(".alert-wrapper").css("display", "inline");
    if ($(window).width() < 960) {
        $(".alert").css("top", "-85%");
        $(".alert").css("left", "0%");
        $(".alert").css("transform", "unset");
        let wid = document.getElementById("frmLogin").offsetWidth;
        document.getElementById("alerta").style.width = (wid - 10) + "px";
        $("#fmrLogin").removeAttr("style");

    }
    overlay.addClass("show");
    modal.addClass("show");

    close.click(function() {
        overlay.removeClass("show");
        modal.removeClass("show");
        $(".alert-wrapper").css({
            display: "none"
        });
    });
};

// fin alerta
// inicio validaciones form
// $("input[type=button]").on("click", function() {
//     console.log("hey yo");
//     var yourFormElement = $("form")[0];
//     yourFormElement.checkValidity();
//     yourFormElement.reportValidity();
//     if (yourFormElement.reportValidity()) {}
// });
//   fin validaciones