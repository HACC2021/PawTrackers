$(function() {
    $('#start-datepicker-trip-ctr').datepicker({
        format: "mm/dd/yyyy"
    }).on('change', function() {
        // $('#dob-datepicker').hide();
    });
    $('#end-datepicker-trip-ctr').datepicker({
        format: "mm/dd/yyyy"
    }).on('change', function() {
        // $('#exp-datepicker').hide();
    });
});

$(document).ready(function() {
    $.getScript("js/add_row_dynamically.js", function() {
        console.log("Add Rows Call")
        statuses = ["Incoming", "Waiting", "Checked In", "Completed"];

        const document_status_value = {
            "Not Received": 2,
            "Received": 1,
            "Verified": 0,
            "Rejected": -1,
            "Expired": -2
        };
        for (const person_status of statuses) {
            let arr = [];
            for (const [person_id, owner] of Object.entries(window.all_persons)) {
                for (const [trip_id, trip] of Object.entries(owner.all_trips)) {
                    // console.log("Trip:", trip_id);
                    let document_status = "Not Received";
                    let document_score = 2;
                    for (const [document_id, trip_document] of Object.entries(trip.trip_documents)) {
                        const score = document_status_value[trip_document.sts];
                        if (score < document_score) {
                            document_score = score;
                            document_status = trip_document.sts;
                        }
                    }
                    console.log(trip.owner_status, person_status)
                    if (trip.owner_status != person_status) continue;
                    for (const [pet_id, pet] of Object.entries(trip.pets)) {
                        // console.log("PEt:", pet_id)
                        const handler = trip.handlers.length == 0 || true ? "None" : trip.handlers[0].first_name;
                        const sts = trip.pet_statuses[pet_id];
                        console.log("SUper sts:", sts)
                        arr.push([
                            owner.full_name(),
                            pet.pet_name,
                            `<select class="form-control" id="#${person_status}_${trip.trip_id}_status_dropdown">
                                '<option${sts == "Incoming" ? " selected" : ""}>Incoming</option>'
                                <option${sts == "In Transit" ? " selected" : ""}>In Transit</option>\
                                <option${sts == "Present" ? " selected" : ""}>Present</option>\
                                <option${sts == "Picked Up" ? " selected" : ""}>Picked Up</option>\
                            </select>`,
                            handler,
                            new Date(trip.update_time).toLocaleDateString("en-US"),
                            "10 mins",
                            document_status,

                        ]);
                    }
                }
            }
            add_rows(`#${person_status}_table`, arr);
        }
    });
});