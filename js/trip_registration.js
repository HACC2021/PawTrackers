$(function() {
    console.log("Loading trip registration JS")
    $('#program_dropdown').change(function() {
        if (!window.programs) programs = JSON.parse(sessionStorage.programs);
        const program_id = $(this).children('option:selected').attr('program_id');
        const program = window.all_programs[program_id];
        const price = Number(program.base_price)
        const tax = price * 0.0472
        $('#subtotal_val').html(`$${price.toFixed(2)}`)
        $('#tax_val').html(`$${tax.toFixed(2)}`)
        $('#total_val').html(`$${(price + tax).toFixed(2)}`)
    });

    $('#airline_dropdown').change(function() {
        $('#flight_id_dropdown')
            .find('option').remove().end()
            .append($('<option>').text("--Select--"));
        const airline_id = $(this).children('option:selected').attr('airline_id');
        const flight_objs = window.all_flights[airline_id];
        for (const [flight_id, _] of Object.entries(flight_objs)) {
            $('#flight_id_dropdown').append($('<option>', {
                text: flight_id
            }));
        }
    });
});

$(document).ready(function() {
    $("#submit_trip").click(function() {
        if (!window.flights) flights = JSON.parse(sessionStorage.flights);
        if (!window.all_trips) all_trips = JSON.parse(sessionStorage.all_trips)
        const airline = $('#airline_dropdown').children('option:selected').attr("airline_id")
        const flight_id = $('#flight_id_dropdown').children('option:selected').val()
        const program_id = $('#program_dropdown').children('option:selected').attr("program_id")
            // const action_buttons = '<a class="btn btn-primary" href="user_trip_view.html"><i class="far fa-eye"></i></a><a class="btn btn-success" href="trip_registration.html"><i class="fas fa-edit"></i></a><a class="btn btn-danger" href="trip_registration.html"><i class="far fa-trash-alt"></i></a>'

        const flight = new Flight(JSON.parse(sessionStorage.flights)[airline][flight_id])
        const program = new Program(JSON.parse(sessionStorage.programs)[program_id])
        all_trips.push(new Trip(flight, program))
        sessionStorage.all_trips = JSON.stringify(all_trips)
    });
});