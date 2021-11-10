$(function() {
    $('[data-toggle="popover"]').popover({
        html: true,
        sanitize: false,
        placement: 'bottom',
        title: function() {
            return $("#popover-head").html();
        },
        content: function() {
            console.log("Pop over CONTENT")
            return $("#popover-content").html();
        }
    }).on('shown.bs.popover', function() {

        // Trying to get date picker to show :(
        // $('#reservationDate').datepicker({
        //     format: "dd/mm/yyyy"
        // }).on('change', function() {
        //     $('.reservationDate').hide();
        // });
    });
})