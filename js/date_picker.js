$(function() {

    // INITIALIZE DATEPICKER PLUGIN
    // $('.datepicker').datepicker({
    //     clearBtn: true,
    //     format: "mm/dd/yyyy",
    //     autoclose: true
    // });


    // FOR DEMO PURPOSE
    // $('#reservationDate').on('change', function() {
    //     var pickedDate = $('input').val();
    //     $('#pickedDate').html(pickedDate);
    //     $('#reservationDate').close();
    // });

    $('#reservationDate').datepicker({
        format: "mm/dd/yyyy"
    }).on('change', function() {
        $('.reservationDate').hide();
    });
});