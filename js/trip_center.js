$(function() {
    $('#start-datepicker-trip-ctr').datepicker({
        format: "mm/dd/yyyy"
    }).datepicker(
        'setDate', sessionStorage["filter_start"]
    ).on('change', function() {
        sessionStorage["filter_start"] = $(this).val()
        window.location.reload();
    });

    $('#end-datepicker-trip-ctr').datepicker({
        format: "mm/dd/yyyy"
    }).datepicker(
        'setDate', sessionStorage["filter_end"]
    ).on('change', function() {
        // $('#exp-datepicker').hide();
        sessionStorage["filter_end"] = $(this).val()
        window.location.reload();
    });

    $('#filter_search_bar').val(
        sessionStorage["filter_search"]
    )
    $(document).on('keypress', function(e) {
        if (e.which == 13) {
            //pressed enter
            sessionStorage["filter_search"] = $('#filter_search_bar').val();
            window.location.reload();
        }
    });

    // var checkExist = setInterval(function() {
    //     if (.length) {
    //         console.log("Exists!");
    //         clearInterval(checkExist);
    //     } else {
    //         console.log("DOESNT EXIT YET")
    //     }
    // }, 100); // check every 100ms

    // console.log("BAR", $(".search_bar_right"))
    // document.getElementById("filter_search_bar").value = "My value";


    // $(".search_bar_right").val("Hello");

});

$(document).ready(function() {
    table_count = 0
    $.getScript("js/add_row_dynamically.js", function() {
        statuses = ["Incoming", "Waiting", "Checked_In", "Completed"];

        const document_status_value = {
            "Not Received": 2,
            "Received": 1,
            "Verified": 0,
            "Rejected": -1,
            "Expired": -2
        };

        const filter_start_date = new Date(sessionStorage["filter_start"]);
        const filter_end_date = new Date(sessionStorage["filter_end"]);
        const has_start_date = !isNaN(filter_start_date.getTime());
        const has_end_date = !isNaN(filter_end_date.getTime());
        const search_str = sessionStorage["filter_search"].toLowerCase();
        const has_search_str = search_str.length > 0;

        for (const person_status of statuses) {
            let arr = [];
            table_count += 1
            for (const [person_id, owner] of Object.entries(window.all_persons)) {
                for (const [trip_id, trip] of Object.entries(owner.all_trips)) {
                    if (has_start_date && new Date(trip.flight.arrival_time) < filter_start_date) {
                        continue;
                    }

                    if (has_end_date && new Date(trip.flight.arrival_time) > filter_end_date) {
                        continue;
                    }

                    let document_status = "Not Received";
                    let document_score = 2;
                    for (const [document_id, trip_document] of Object.entries(trip.trip_documents)) {
                        const score = document_status_value[trip_document.sts];
                        if (score < document_score) {
                            document_score = score;
                            document_status = trip_document.sts;
                        }
                    }
                    // if (trip.person_status === undefined) {
                    //     console.error("Cannot read person status of trip:", trip.trip_id);
                    //     continue;
                    // }
                    // console.log("Pet Count:", trip.pets.length, trip)
                    for (const [pet_id, pet] of Object.entries(trip.pets)) {
                        const trip_pet = trip.trip_pets[pet_id];
                        const handler = window.all_persons[trip_pet.handler_id];
                        if (trip_pet.handler_status != person_status) continue;
                        if (has_search_str &&
                            !owner.full_name().toLowerCase().includes(search_str) &&
                            !pet.pet_name.toLowerCase().includes(search_str) &&
                            !handler.full_name().toLowerCase().includes(search_str)) {
                            continue;
                        }
                        // console.log("CMP;", trip_pet.handler_status, person_status)
                        const pet_sts = trip_pet["pet_status"];
                        const handler_sts = trip_pet.handler_status;
                        if (!trip || !trip.flight) {
                            console.error(`ERROR: MISSING FLIGHT - ${trip_id}`);
                            continue;
                        }
                        arr.push([
                            `<a class="nav-link person-link" href="person_registration.html" user_id="${owner.person_id}">${owner.full_name()}</a>`,
                            `<a class="nav-link" href="pet_registration.html">${pet.pet_name}</a>`,
                            `<select class="form-control status_dropdown" trip_id="${trip_id}" pet_id="${pet_id}">
                                <option${pet_sts == "Incoming" ? " selected" : ""}>Incoming</option>\
                                <option${pet_sts == "In Transit" ? " selected" : ""}>In Transit</option>\
                                <option${pet_sts == "Present" ? " selected" : ""}>Present</option>\
                                <option${pet_sts == "Picked Up" ? " selected" : ""}>Picked Up</option>\
                            </select>`,
                            `<a class="nav-link person-link" href="person_registration.html" user_id="${handler.person_id}">${handler.full_name()}</a>`,
                            `<select class="form-control handler_status_dropdown" trip_id="${trip_id}" pet_id="${pet_id}">
                                <option${handler_sts == "Incoming" ? " selected" : ""}>Incoming</option>\
                                <option${handler_sts == "Waiting" ? " selected" : ""}>Waiting</option>\
                                <option${handler_sts == "Checked_In" ? " selected" : ""}>Checked_In</option>\
                                <option${handler_sts == "Completed" ? " selected" : ""}>Completed</option>\
                            </select>`,
                            time_since(trip.update_time),
                            trip.flight.time_until_arrival(),
                            document_status,
                        ]);

                    }
                }
            }
            add_rows(`#${person_status}_table`, arr, function() {
                table_count -= 1
                if (table_count == 0) {
                    $('.person-link').on('click', function() {
                        sessionStorage.edit_user = $(this).attr("user_id");
                    });

                    // console.log("Detect Change for STATUS")
                    $('.status_dropdown').change(function() {
                        const trip_id = $(this).attr("trip_id");
                        const pet_id = $(this).attr("pet_id");
                        window.all_trip_pets[trip_id][pet_id].pet_status = $(this).children('option:selected').val();
                        sessionStorage["all_trip_pets"] = JSON.stringify(window.all_trip_pets);
                    });
                    $('.handler_status_dropdown').change(function() {
                        const trip_id = $(this).attr("trip_id");
                        const pet_id = $(this).attr("pet_id");
                        window.all_trip_pets[trip_id][pet_id].handler_status = $(this).children('option:selected').val();
                        sessionStorage["all_trip_pets"] = JSON.stringify(window.all_trip_pets);
                        window.location.reload();
                    });
                    // $("#filter_search_bar").val("HELLO")
                    // console.log($("#filter_search_bar"))
                }
            });
        }

    });
});