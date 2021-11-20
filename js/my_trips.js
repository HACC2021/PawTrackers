// if (!window.all_trips) all_trips = JSON.parse(sessionStorage.all_trips);

$.getScript("js/add_row_dynamically.js", function() {
    console.log("Add Rows Call")
    const user_person = window.all_persons[window.user];
    let arr = [];
    for (const [trip_id, trip] of Object.entries(user_person.all_trips)) {
        for (const [pet_id, pet] of Object.entries(trip.pets)) {
            let document_status = "Not Received";
            let document_score = 2;
            for (const [document_id, trip_document] of Object.entries(trip.trip_documents)) {
                const score = document_status_value[trip_document.sts];
                if (score < document_score) {
                    document_score = score;
                    document_status = trip_document.sts;
                }
            }

            const trip_pet = trip.trip_pets[pet_id];
            const handler = window.all_persons[trip_pet.handler_id];
            console.log("user trip:", trip)
            arr.push([
                `<a class="nav-link person-link flight_item" href="user_trip_view.html" trip_id="${trip_id}" pet_id="${pet_id}"">${trip.flight.flight_id}</a>`,
                trip.flight.arrival_time,
                `<a class="nav-link person-link" href="pet_registration.html">${pet.pet_name}</a>`,
                `<a class="nav-link person-link" href="trip_registration.html">${trip.program.program_name}</a>`,
                `<a class="nav-link person-link" href="person_registration.html">${handler.full_name()}</a>`,
                trip_pet.handler_status,
                document_status
            ]);
        }
    }
    add_rows('#my_trip_table', arr, function() {
        $(".flight_item").click(function() {
            sessionStorage.curr_trip = $(this).attr("trip_id");
            sessionStorage.curr_pet = $(this).attr("trip_id");
        });
    });
});