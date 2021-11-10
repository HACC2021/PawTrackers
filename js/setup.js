function is_user_mode() {
    return sessionStorage.is_user_mode === 'true'
}

// allow html pages to include html scripts in '/components'
load_html_count = 0
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
                    sessionStorage.is_user_mode = !is_user_mode();
                    location.reload();
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


            }

        })

    })
})

$(document).ready(function() {
    console.log("Document Loaded")
});

// if (window.first_run === undefined) {
//     window.first_run = false;
//     console.log("Clearing SESSION");
//     sessionStorage.clear();
// }

json_import_count = 7;

function json_ready() {
    json_import_count -= 1;
    if (json_import_count != 0) return;
    console.log("JSONS ARE READY")

    //PROGRAMS
    window.programs = {};
    for (const program of program_json) {
        window.programs[program.program_id] = program;
    }
    sessionStorage.programs = JSON.stringify(window.programs);

    //FLIGHTS
    window.flights = {};
    for (const [airline, airline_obj] of Object.entries(flights_json)) {
        window.flights[airline] = {}
        for (const [flight_no, flight_obj] of Object.entries(airline_obj)) {
            window.flights[airline][flight_no] = {
                "flight_date": flight_obj["flight_date"],
                "airline": airline,
                "flight_no": flight_no,
                "departure": flight_obj["departure"]
            };
        }
    }
    sessionStorage.flights = JSON.stringify(window.flights); // SINGLE PASS ONLY -- KEEP


    //PERSONS
    window.all_persons = {};
    for (const person_obj of persons_obj) {
        const first_name = person_obj["first_name"];
        const middle = person_obj["middle"];
        const last_name = person_obj["last_name"];
        const dob = person_obj["dob"];
        const pet_relation = person_obj["pet_relation"];
        const military_type = person_obj["military_type"];
        const id_num = person_obj["id_num"];
        const id_type = person_obj["id_type"];
        const id_state = person_obj["id_state"];
        const id_exp = person_obj["id_exp"];
        const addr_line1 = person_obj["addr_line1"];
        const addr_line2 = person_obj["addr_line2"];
        const city = person_obj["city"];
        const state = person_obj["state"];
        const zipcode = person_obj["zipcode"];
        const hi_line1 = person_obj["hi_line1"];
        const hi_line2 = person_obj["hi_line2"];
        const hi_city = person_obj["hi_city"];
        const hi_island = person_obj["hi_island"];
        const hi_zipcode = person_obj["hi_zipcode"];
        const phone = person_obj["phone"];
        const alt_phone = person_obj["alt_phone"];
        const country_addr = person_obj["country_addr"];
        const email = person_obj["email"];
        const handler_ids = person_obj["handler_ids"];
        const pet_ids = person_obj["pet_ids"];
        const trip_ids = person_obj["trip_ids"];

        const person = new Person(first_name, middle, last_name, dob, pet_relation, military_type, id_num, id_type, id_state, id_exp, addr_line1, addr_line2, city, state, zipcode, hi_line1, hi_line2, hi_city, hi_island, hi_zipcode, phone, alt_phone, country_addr, email, handler_ids, pet_ids, trip_ids);
        window.all_persons[person.person_id] = person;
    }

    //PETS
    window.all_pets = {};
    for (const pet_obj of pets_json) {
        const pet_name = pet_obj["pet_name"];
        const species = pet_obj["species"];
        const country = pet_obj["country"];
        const dob = pet_obj["dob"];
        const breed = pet_obj["breed"];
        const sex = pet_obj["sex"];
        const sprayed = pet_obj["sprayed"];
        const color = pet_obj["color"];
        const microchip_nums = pet_obj["microchip_nums"];
        const visitor_ids = pet_obj["visitor_ids"];
        const document_ids = pet_obj["document_ids"];

        var pet = new Pet(pet_name, species, country, dob, breed, sex, sprayed, color, microchip_nums, visitor_ids, document_ids);
        window.all_pets[pet.pet_id] = pet;
    }

    //DOCUMENTS
    window.all_documents = {};
    for (const doc_obj of documents_json) {
        const doc_name = doc_obj["doc_name"];
        const type = doc_obj["type"];
        const sts = doc_obj["sts"];
        const link = doc_obj["link"];
        const is_trip = doc_obj["is_trip"];
        const is_pet = doc_obj["is_pet"];

        const document = new Document(doc_name, type, sts, link, is_trip, is_pet);
        window.all_documents[document.document_id] = document;
    }
    sessionStorage.all_documents = JSON.stringify(window.all_documents); // ONE PASS ONLY - SO KEEP


    // TRIPS
    window.all_trips = {};
    for (const trip_obj of trips_json) {
        const airline = trip_obj["airline"];
        const flight_no = trip_obj["flight_no"];
        const program_id = trip_obj["program_id"];
        const owner_status = trip_obj["owner_status"];
        const covid_status = trip_obj["covid_status"];

        const pet_statuses = trip_obj["pet_statuses"];
        const handler_ids = trip_obj["handler_ids"];
        const trip_documents_ids = trip_obj["trip_documents_ids"];
        // const chat_ids = trip_obj["chat_ids"]; // chat id is not set up yet.
        const flight = window.flights[airline][flight_no];
        const program = window.programs[program_id];
        // const chat = {}; // chat id is not set up yet.
        const trip = new Trip(flight, program, owner_status, covid_status, pet_statuses, handler_ids, trip_documents_ids);
        window.all_trips[trip.trip_id] = trip;
    }

    // SECOND PASS
    // =============================================================================================

    // PETS
    for (const [pet_id, pet] of Object.entries(window.all_pets)) {
        pet.visitors = {};
        for (const visitor_id of pet.visitor_ids) {
            pet.visitors[visitor_id] = all_persons[visitor_id];
        }
        pet.documents = {};
        for (const document_id of pet.document_ids) {
            pet.documents[document_id] = all_documents[document_id];
        }
    }
    sessionStorage.all_pets = JSON.stringify(window.all_pets);


    //TRIPS
    for (const [trip_id, trip] of Object.entries(window.all_trips)) {
        trip.pets = {};
        console.log("Tripper:", trip)
        for (const [pet_id, pet_status] of Object.entries(trip.pet_statuses)) {
            trip.pets[pet_id] = window.all_pets[pet_id];
        }
        trip.handlers = {};
        for (const handler_id of trip.handler_ids) {
            trip.handlers[handler_id] = window.all_persons[handler_id];
        }
        trip.trip_documents = {};
        for (const trip_document_id of trip.trip_documents_ids) {
            trip.trip_documents[trip_document_id] = window.all_documents[trip_document_id];
        }
    }
    sessionStorage.all_trips = JSON.stringify(window.all_trips);

    //PERSONS
    for (const [person_id, person] of Object.entries(window.all_persons)) {
        person.all_handlers = {};
        for (const handler_id of person.handler_ids) {
            person.all_handlers[handler_id] = window.all_persons[handler_id];
        }
        person.all_pets = {};
        for (const pet_id of person.pet_ids) {
            person.all_pets[pet_id] = window.all_pets[pet_id];
        }
        person.all_trips = {};
        for (const trip_id of person.trip_ids) {
            person.all_trips[trip_id] = window.all_trips[trip_id];
        }
    }
    sessionStorage.all_persons = JSON.stringify(window.all_persons);

    // AFTER SECOND PASS
    // =============================================================================================

    //User
    const user_id = user_json["user"];
    window.user = window.all_persons[user_id]
    sessionStorage.user = JSON.stringify(window.user);

    if (sessionStorage.edit_user === undefined) {
        sessionStorage.edit_user = JSON.stringify(null);
    }

    if (sessionStorage.is_user_mode === undefined) {
        sessionStorage.is_user_mode = JSON.stringify(true);
    }
}
$.getJSON("assets/programs.json", function(json) {
    window.program_json = json;
    json_ready();
});
$.getJSON("assets/flights.json", function(json) {
    window.flights_json = json;
    json_ready();
});
$.getJSON("assets/init_pets.json", function(json) {
    window.pets_json = json;
    json_ready();
});
$.getJSON("assets/init_documents.json", function(json) {
    window.documents_json = json;
    json_ready();
});
$.getJSON("assets/init_trips.json", function(json) {
    window.trips_json = json;
    json_ready();
});
$.getJSON("assets/init_user.json", function(json) {
    window.user_json = json;
    json_ready();
});
$.getJSON("assets/init_persons.json", function(json) {
    window.persons_obj = json;
    json_ready();
});


// if (!sessionStorage.programs) {
//     console.log("Only Pass: Programs")
//     $.ajax({
//         url: "assets/programs.json",
//         async: false,
//         dataType: 'json',
//         success: function(json) {
//             window.programs = {};
//             for (const program of json) {
//                 window.programs[program.program_id] = program;
//             }
//             console.log("Programs PRE JSON:", window.programs)
//             sessionStorage.programs = JSON.stringify(window.programs);
//         }
//     });
//     console.log("Programs:", window.programs);
// }

// // if (window.programs === undefined) {
// //     console.log("Programs Shortcut")
// //     window.programs = JSON.parse(sessionStorage.programs);
// // }

// if (!sessionStorage.flights) {
//     console.log("Only Pass: Flights")
//     $.ajax({
//         url: "assets/flights.json",
//         async: false,
//         dataType: 'json',
//         success: function(json) {
//             window.flights = {};
//             for (const [airline, airline_obj] of Object.entries(json)) {
//                 window.flights[airline] = {}
//                 for (const [flight_no, flight_obj] of Object.entries(airline_obj)) {
//                     // console.log("Flight:", airline, flight_no)
//                     window.flights[airline][flight_no] = {
//                         "flight_date": flight_obj["flight_date"],
//                         "airline": airline,
//                         "flight_no": flight_no,
//                         "departure": flight_obj["departure"]
//                     };
//                 }
//             }
//             sessionStorage.flights = JSON.stringify(window.flights); // SINGLE PASS ONLY -- KEEP

//         }
//     });
// }
// // if (window.flights === undefined) {
// //     console.log("Flights Shortcut")
// //     window.flights = JSON.parse(sessionStorage.flights);
// // }

// if (sessionStorage.all_persons === undefined) {
//     console.log("Only Pass: PERSONS - Incomplete")
//     sessionStorage.all_persons = JSON.stringify({});
// }

// if (sessionStorage.all_pets === undefined) {
//     console.log("First Pass: Pets")
//     $.ajax({
//         url: "assets/init_pets.json",
//         async: false,
//         dataType: 'json',
//         success: function(json) {
//             window.all_pets = {};
//             for (const pet_obj of json) {
//                 const pet_name = pet_obj["pet_name"];
//                 const species = pet_obj["species"];
//                 const country = pet_obj["country"];
//                 const dob = pet_obj["dob"];
//                 const breed = pet_obj["breed"];
//                 const sex = pet_obj["sex"];
//                 const sprayed = pet_obj["sprayed"];
//                 const color = pet_obj["color"];
//                 const microchip_nums = pet_obj["microchip_nums"];

//                 window.pet = new Pet(pet_name, species, country, dob, breed, sex, sprayed, color, microchip_nums);
//                 window.all_pets[pet.pet_id] = pet;
//                 console.log("PET HERE:", window.all_pets[pet.pet_id]);
//             }
//         }
//     });
// }

// if (sessionStorage.all_documents === undefined) {
//     console.log("First Pass: Documents")
//     $.ajax({
//         url: "assets/init_documents.json",
//         async: false,
//         dataType: 'json',
//         success: function(json) {
//             window.all_documents = {};
//             for (const doc_obj of json) {
//                 const doc_name = doc_obj["doc_name"];
//                 const type = doc_obj["type"];
//                 const sts = doc_obj["sts"];
//                 const link = doc_obj["link"];
//                 const is_trip = doc_obj["is_trip"];
//                 const is_pet = doc_obj["is_pet"];

//                 const document = new Document(doc_name, type, sts, link, is_trip, is_pet);
//                 window.all_documents[document.document_id] = document;
//             }
//             sessionStorage.all_documents = JSON.stringify(window.all_documents); // ONE PASS ONLY - SO KEEP

//         }
//     });
// }
// // if (window.all_documents === undefined) {
// //     console.log("Document Shortcut")
// //     window.all_documents = JSON.parse(sessionStorage.all_documents);
// // }

// if (sessionStorage.all_trips === undefined) {
//     console.log("First Pass: Trips")
//     $.ajax({
//         url: "assets/init_trips.json",
//         async: false,
//         dataType: 'json',
//         success: function(json) {
//             window.all_trips = {};
//             for (const trip_obj of json) {
//                 console.log("OBJ:", trip_obj)
//                 const airline = trip_obj["airline"];
//                 const flight_no = trip_obj["flight_no"];
//                 const program_id = trip_obj["program_id"];
//                 // const chat_ids = trip_obj["chat_ids"]; // chat id is not set up yet.
//                 console.log("Flights:", window.flights);
//                 console.log("Airline:", airline, window.flights[airline]);
//                 console.log("Flight Num:", window.flights[airline][flight_no])
//                 const flight = window.flights[airline][flight_no];
//                 const program = window.programs[program_id];
//                 // const chat = {}; // chat id is not set up yet.
//                 const trip = new Trip(flight, program);
//                 window.all_trips[trip.trip_id] = trip;
//             }
//         }
//     });
// }

// // SECOND PASS
// // =============================================================================================

// // if (!sessionStorage.all_persons) {
// //     sessionStorage.all_persons = JSON.stringify({});
// // }

// if (sessionStorage.all_pets === undefined) {
//     console.log("Second Pass: Pets");
//     $.ajax({
//         url: "assets/init_pets.json",
//         async: false,
//         dataType: 'json',
//         success: function(json) {
//             for (const pet_obj of json) {
//                 const visitor_ids = pet_obj["visitor_ids"];
//                 const document_ids = pet_obj["document_ids"];

//                 let visitors = {};
//                 for (const visitor_id of visitor_ids) {
//                     visitors[visitor_id] = all_people[visitor_id];
//                 }
//                 let documents = {};
//                 for (const document_id of document_ids) {
//                     documents[document_id] = all_documents[document_id];
//                 }
//                 console.log("PEt:", window.all_pets[pet.pet_id])
//                 const pet = window.all_pets[pet.pet_id];
//                 pet.visitors = visitors;
//                 pet.documents = documents;
//             }
//             sessionStorage.all_pets = JSON.stringify(window.all_pets);
//         }
//     });
// }
// // if (window.all_pets === undefined) {
// //     console.log("Pets Shortcut");
// //     window.all_pets = JSON.parse(sessionStorage.all_pets);
// // }


// if (sessionStorage.all_trips === undefined) {
//     console.log("Second Pass: Trips");
//     $.ajax({
//         url: "assets/init_trips.json",
//         async: false,
//         dataType: 'json',
//         success: function(json) {
//             for (const trip_obj of json) {
//                 const pet_ids = trip_obj["pet_ids"];
//                 const handler_ids = trip_obj["handler_ids"];
//                 const trip_documents_ids = trip_obj["trip_documents_ids"];

//                 let pets = {};
//                 for (const pet_id of pet_ids) {
//                     pets[pet_id] = window.all_pets[pet_id];
//                 }
//                 let handlers = {};
//                 for (const handler_id of handler_ids) {
//                     handlers[handler_id] = window.all_people[handler_id];
//                 }
//                 let trip_documents = {};
//                 for (const trip_document_id of trip_documents_ids) {
//                     trip_documents[trip_document_id] = window.all_documents[trip_document_id];
//                 }

//                 let trip = window.all_trips[trip.trip_id];
//                 trip.pets = pets;
//                 trip.handlers = handlers;
//                 trip.trip_documents = documents;
//             }
//             sessionStorage.all_trips = JSON.stringify(all_trips);
//         }
//     });
// }
// // if (window.all_trips === undefined) {
// //     console.log("Trips Shortcut");
// //     window.all_trips = JSON.parse(sessionStorage.all_trips);
// // }




// // AFTER SECOND PASS
// // =============================================================================================

// if (sessionStorage.user === undefined) {
//     $.ajax({
//         url: "assets/init_user.json",
//         async: false,
//         dataType: 'json',
//         success: function(json) {
//             const user_id = json["user"];
//             window.user = window.all_persons[user_id]
//             sessionStorage.user = JSON.stringify(window.user);
//         }
//     });
// }

// if (sessionStorage.edit_user === undefined) {
//     sessionStorage.edit_user = JSON.stringify(null);
// }

// if (sessionStorage.is_user_mode === undefined) {
//     sessionStorage.is_user_mode = JSON.stringify(true);
// }