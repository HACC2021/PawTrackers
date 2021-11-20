function is_user_mode() {
    return window.user_mode == true;
}

// allow html pages to include html scripts in '/components'
load_html_count = 0
nav_bar_loaded_callbacks = []
$(function() {
    console.log("Including html files...")
    var includes = $('[data-include]')
    $.each(includes, function() {
        var base_file_name = $(this).data('include');
        if (base_file_name == 'vertical_menu') {
            base_file_name = (is_user_mode() ? "user_" : "emp_") + base_file_name;
        }
        var file = 'components/' + base_file_name + '.html'

        load_html_count += 1
        $(this).load(file, function() {
            load_html_count -= 1

            if (load_html_count == 0) {
                console.log("HTML File Loaded")


                var navLink = document.createElement("a");
                navLink.href = "#";
                navLink.className = "nav-item";
                navLink.id = "toggle_link";
                navLink.innerHTML = is_user_mode() ? "User Mode" : "Employee Mode";

                var navItem = document.createElement("li");
                navItem.className = "nav-link";
                navItem.id = "toggle_mode";
                navItem.appendChild(navLink);

                document.getElementById("h_menu").appendChild(navItem);


                $('#toggle_mode').on('click', function() {
                    sessionStorage.user_mode = !is_user_mode();
                    window.location.href = "index.html";
                    // document.getElementById("toggle_link").innerHTML = is_user_mode() ? "User Mode" : "Employee Mode";
                });


                console.log("Setting active item in menu")
                var url = window.location.href;

                // passes on every "a" tag
                $("#h_menu a").each(function() {
                    // checks if its the same on the address bar
                    if (url == (this.href)) {
                        $(this).closest("li").addClass("active");
                    }
                });

                // passes on every "a" tag
                $("#v_menu a").each(function() {
                    // checks if its the same on the address bar
                    if (url == (this.href)) {
                        $(this).closest("li").addClass("active");
                    }
                });

                if ($('[data-toggle="popover"]').length > 0) {
                    $('[data-toggle="popover"]').popover({
                        html: true,
                        sanitize: false,
                        placement: 'bottom',
                        title: function() {
                            return $("#popover-head").html();
                        },
                        content: function() {
                            console.log("Pop over CONTENT in SETUP")
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
                }

                console.log(`.${is_user_mode() ? "emp" : "user"}_menu a`)
                $(`.${is_user_mode() ? "emp" : "user"}_menu`).each(function() {
                    $(this).addClass("d-none")
                });

                for (const callback of nav_bar_loaded_callbacks) {
                    if (callback) {
                        callback();
                    }
                }


            }

        })

    })
})

$(document).ready(function() {
    console.log("Document Loaded")
});

// console.log("Clearing SESSION");
// sessionStorage.clear();

json_import_count = 0;

function json_ready() {
    console.log("JSONS ARE READY")

    // DOESNT INCLUDE FLIGHTS
    const global_params = ["pet", "trip", "person", "document", "program", "message"];
    for (const global_param of global_params) {
        let obj = {};
        for (const json_obj of window[`${global_param}s_json`]) {
            if (json_obj[`${global_param}_id`] !== undefined) {
                // console.log(global_param, json_obj[`${global_param}_id`])
                obj[json_obj[`${global_param}_id`]] = json_obj;
            }
        }
        sessionStorage[`all_${global_param}s`] = JSON.stringify(obj);
        // console.log(`Creating: all_${global_param}s`)
        // console.log(`sessionStorage["all_${global_param}s"] = JSON.stringify(obj);`)
    }
    //FLIGHTS
    let load_flights = {};
    for (const [airline, airline_obj] of Object.entries(flights_json)) {
        load_flights[airline] = {}
        for (const [flight_id, flight_obj] of Object.entries(airline_obj)) {
            flight_obj["airline"] = airline;
            flight_obj["flight_id"] = flight_id;
            load_flights[airline][flight_id] = flight_obj;
        }
    }
    sessionStorage.all_flights = JSON.stringify(load_flights);

    //PET TRIP
    let load_trip_pets = {};
    for (const trip_pet of trip_pets_json) {
        if (!load_trip_pets[trip_pet["trip_id"]]) load_trip_pets[trip_pet["trip_id"]] = {};
        load_trip_pets[trip_pet["trip_id"]][trip_pet["pet_id"]] = trip_pet;
    }
    sessionStorage.all_trip_pets = JSON.stringify(load_trip_pets);

    //COUNT MESSAGES
    let message_count = 0;
    for (const obj of window.messages_json) {
        message_count += 1;
    }
    console.log("Message Count", message_count)
    sessionStorage.message_count = JSON.stringify(message_count);

    sessionStorage.user = JSON.stringify(users_json["user"]);
    sessionStorage.edit_user = "0";
    sessionStorage.curr_trip = "0";
    sessionStorage.curr_pet = "0";

    sessionStorage.user_mode = JSON.stringify(true);

    sessionStorage.filter_start = "";
    sessionStorage.filter_end = "";
    sessionStorage.filter_search = "";
    sessionStorage.chat_search = "";
    console.log("CHAT:", sessionStorage.chat_search)

    sessionStorage.session_stored = true;

    load_global_from_session();
}

function load_global_from_session() {
    const global_params = {
        "pet": [Pet, [
            ["visitor", "person"],
            ["pet_document", "document"]
        ]],
        "trip": [Trip, [
            ["trip_document", "document"],
            ["message", "message"]
        ]],
        "person": [Person, [
            ["handler", "person"],
            ["pet", "pet"],
            ["trip", "trip"]
        ]],
        "document": [Document, []],
        "program": [Program, []],
        "flight": [Flight, []],
        "trip_pet": [Trip_Pet, []],
        "message": [Message, []]
    };
    for (const [global_param, param_data] of Object.entries(global_params)) {
        const param_class = param_data[0];

        // console.log(`window["all_${global_param}s"] = JSON.parse(sessionStorage["all_${global_param}s"]);`);
        // console.log(sessionStorage[`all_${global_param}s`]);
        const all_id = `all_${global_param}s`;
        window[all_id] = {};
        for (let [obj_id, obj] of Object.entries(JSON.parse(sessionStorage[all_id]))) {
            window[all_id][obj_id] = new param_class(obj);
        }
    }

    for (const [airline, airline_obj] of Object.entries(window.all_flights)) {
        for (const [flight_id, flight_obj] of Object.entries(airline_obj)) {
            window.all_flights[airline][flight_id] = new Flight(flight_obj);
        }
    }

    for (let trip of Object.values(window.all_trips)) {
        // console.log("TRIP ID:", trip["trip_id"]);
        // console.log("ELSE", window.all_trip_pets)
        trip.flight = window.all_flights[trip.airline][trip.flight_id]
        trip.program = window.all_programs[trip.program_id]
        const trip_id = trip["trip_id"];
        trip.pets = {};
        if (window.all_trip_pets[trip_id] === undefined) continue;
        const trip_pets = window.all_trip_pets[trip["trip_id"]];
        // console.log("Trip pets:", trip_pets)
        for (const [pet_id, trip_pet] of Object.entries(trip_pets)) {
            trip.trip_pets[pet_id] = new Trip_Pet(trip_pet);
            // trip.pet_ids.push(pet_id);
            trip.pets[pet_id] = window.all_pets[pet_id];
            // console.log("Created Trip Pet | Trip:", trip_id, "Pet:", pet_id)
            // console.log("Trip:", trip);
        }
    }

    for (const [global_param, param_data] of Object.entries(global_params)) {
        // console.log(`${global_param} -> ${param_data}`)

        const [param_class, arg_values] = param_data;
        for (const [obj_id, obj] of Object.entries(window[`all_${global_param}s`])) {
            let arg_arr = []
                // console.log(`${global_param} -> ${typeof(arg_values)} ${arg_values}`)
            for (const [arg_name, arg_type] of arg_values) {
                let arg_obj = {};
                // console.log(`Iterating: ${arg_name}_ids of ${global_param}`)
                // console.log(obj)
                if (obj[`${arg_name}_ids`] === undefined) {
                    console.error(`Error: Cannot find ${arg_name}_ids in ${global_param}`, obj)
                    continue;
                }
                // console.log("GO:", global_param, arg_name, "IDS:", obj[`${arg_name}_ids`])
                for (const arg_id of obj[`${arg_name}_ids`]) {
                    // console.log(arg_id, `window["all_${arg_type}s"][${arg_id}]`, window[`all_${arg_type}s`][arg_id])
                    arg_obj[arg_id] = window[`all_${arg_type}s`][arg_id];
                }
                arg_arr.push(arg_obj)
            }
            window[`all_${global_param}s`][obj[`${global_param}_id`]] = new param_class(obj, ...arg_arr);
            // console.log("CLASS:", global_param, arg_arr)
            // console.log("Stored:", window[`all_${global_param}s`][obj[`${global_param}_id`]])
        }
    }

    window.message_count = JSON.parse(sessionStorage.message_count);
    window.chat_search = sessionStorage.chat_search;
    window.user = JSON.parse(sessionStorage.user);
    window.edit_user = JSON.parse(sessionStorage.edit_user);
    window.curr_trip = JSON.parse(sessionStorage.curr_trip);
    window.curr_pet = JSON.parse(sessionStorage.curr_pet);

    window.user_mode = JSON.parse(sessionStorage.user_mode);

    window.filter_start = sessionStorage.filter_start;
    window.filter_end = sessionStorage.filter_end;
    window.filter_search = sessionStorage.filter_search;
    window.chat_search = sessionStorage.chat_search;
    console.log("Storing Message Count:", window.message_count)
    window.message_count = JSON.parse(sessionStorage.message_count);
}

if (sessionStorage.session_stored) {

    console.log("Loading globals from session")
    const var_ids = ["program", "flight", "document", "pet", "trip", "person", "message"];
    for (const var_id of var_ids) {
        const all_id = `all_${var_id}s`;
        if (!sessionStorage[all_id]) {
            console.error("Cannot load sessionStorage at id:", all_id);
            continue;
        } else {
            // console.log("\n\n\n\nSESSION:", sessionStorage[all_id])
        }
        window[all_id] = JSON.parse(sessionStorage[all_id]);
    }
    load_global_from_session();

} else {
    console.log("Reparsing JSON")
    const global_params = ["program", "flight", "pet", "document", "trip", "user", "person", "trip_pet", "message"];
    json_import_count = global_params.length;
    for (const global_param of global_params) {
        $.getJSON(`assets/init_${global_param}s.json`, function(json) {
            console.log("Loaded:", `init_${global_param}s.json`)
            window[`${global_param}s_json`] = json;
            json_import_count -= 1;
            if (json_import_count == 0)
                json_ready();
        });
    }
}