$(function() {
    const owner = window.all_persons[window.user];
    console.log(owner)
    let arr = [];
    for (const [handler_id, handler] of Object.entries(owner.all_handlers)) {
        arr.push([
            handler.full_name(),
            handler.pet_relation,
            handler.phone,
            handler.alt_phone
        ])
    }

    add_rows('#my_handler_table', arr, function() {
        // $("#my_pet_table").click(function() {
        //     sessionStorage.curr_trip = $(this).attr("trip_id");
        //     sessionStorage.curr_pet = $(this).attr("trip_id");
        // });
    });
});