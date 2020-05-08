
$('tr').on('dblclick', function() {
    $('#addModal').modal('show');
});


$('#guasap').scrollspy();
  
    //Cuando el modal se muestre
$('#modalNuevaOrden').on('show.bs.modal', function() {
console.log("me mostré");
$( "#generales" ).addClass( "active" );
$('#asaber').scrollspy();
    });

    //Cuando el modal se cierre
$('#modalNuevaOrden').on('hide.bs.modal', function() {
        console.log("me escondí");
   $( "#ordenDelNav" ).addClass( "active" );
    });


//te da el número de pixeles donde se encuentra el scroll
function onScrollEvent(){
    var elmnt = document.getElementById("guasap").scrollTop;
    //35 px
    if(elmnt<34){
        $( "#generales" ).addClass( "active" );
    }
}


