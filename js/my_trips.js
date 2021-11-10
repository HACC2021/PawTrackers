// if (!window.all_trips) all_trips = JSON.parse(sessionStorage.all_trips);

$.getScript("js/add_row_dynamically.js", function() {
    console.log("Add Rows Call")
    if (!window.user) user = JSON.parse(sessionStorage.user);
    if (!window.user) {
        console.log("User is not defined");
        return;
    }
    if (!window.user.all_trips) {
        console.log("User Trips are not defined");
        return;
    }
    console.log("BOI:", window.user)
    let arr = [];
    for (const [trip_id, trip] of Object.entries(window.user.all_trips)) {
        console.log("user trip:", trip)
        arr.push([
            trip.flight.flight_no,
            trip.flight.flight_date,
            trip.pets.length,
            trip.program.program_name,
            trip.handlers.length,
            trip.owner_status,
            trip.trip_documents.length
        ]);
    }
    console.log("ARRRRR:", arr);
    add_rows('#my_trip_table', arr);
});

$(document).ready(function() {
    $("#submit_trip").click(function() {
        date = $('#flight_datepicker').val()
        airline = $('#airline_dropdown').children('option:selected').val()
        flight_no = "<a href='user_trip_view.html'>" + $('#flight_no_dropdown').children('option:selected').val()
        program = $('#program_dropdown').children('option:selected').html()
        pet_count = 0
        handler = "Self"
        sts = "Incoming"
        doc_sts = "Incomplete"
        action_buttons = '<a class="btn btn-primary" href="user_trip_view.html"><i class="far fa-eye"></i></a><a class="btn btn-success" href="trip_registration.html"><i class="fas fa-edit"></i></a><a class="btn btn-danger" href="trip_registration.html"><i class="far fa-trash-alt"></i></a>'

        var trip_arr = Array()
        if (sessionStorage.trip_arr) {
            trip_arr = JSON.parse(sessionStorage.trip_arr)
        }
        trip_arr.push([flight_no, date, pet_count, program, handler, sts, doc_sts, action_buttons])
        sessionStorage.trip_arr = JSON.stringify(trip_arr)
    });
});