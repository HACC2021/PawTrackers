const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
$(function() {
    const trip = window.all_trips[window.curr_trip];
    const pet = window.all_pets[window.curr_pet];
    const flight = trip.flight;
    const trip_pet = trip.trip_pets[pet.pet_id];

    const [year, month, day] = flight.arrival_time.split(" ")[0].split("-");



    let pet_arr = [];
    let document_arr = [];
    let handler_arr = [];
    for (const [single_pet_id, single_pet] of Object.entries(trip.pets)) {
        const single_trip_pet = trip.trip_pets[single_pet_id];
        if (single_trip_pet.handler_id != trip_pet.handler_id) continue;

        let document_status = "Not Received";
        let document_score = 2;
        for (const [document_id, trip_document] of Object.entries(single_pet.pet_documents)) {
            const score = document_status_value[trip_document.sts];
            if (score < document_score) {
                document_score = score;
                document_status = trip_document.sts;
            }
            document_arr.push([
                trip_document.doc_type,
                single_trip_pet.pet_name,
                trip_document.doc_status,
                time_since(trip_document.submission_time),
                time_since(trip_document.exp_time),
                "-None-"
            ])
        }
        pet_arr.push([
            single_pet.pet_name,
            single_trip_pet.pet_status,
            time_since(trip.flight.arrival_time),
            document_status,
            single_pet.microchip_nums.join(", "),
            "-None-"
        ])

        const handler = window.all_persons[single_trip_pet.handler_id]
        handler_arr.push([
            handler.full_name(),
            single_trip_pet.handler_status,
            time_since(trip.flight.arrival_time),
            handler.pet_relation
        ])
    }

    $("#loc_txt").html(`${flight.short_dep}-HNL`);
    $("#flight_date_txt").html(`${months[month-1]} ${day}, ${year}`);
    $("#status_txt").html(`Status: ${trip_pet.handler_status}`);
    $("#update_txt").html(`Updated: ${time_since(trip.update_time)}`);
    $("#eta_check_in_txt").html(`ETA Check In: ${time_since(trip.eta_check_in_time)}`);
    add_rows("#pet_table", pet_arr)
    add_rows("#document_table", document_arr)
    add_rows("#handler_table", handler_arr)
});