$(function() {
    console.log("Setting CURR TRIP to 0")
    window.curr_trip = "0";
    nav_bar_loaded_callbacks.push(function() {
        const trip = window.all_trips[window.curr_trip];
        let pet_names = [];
        for (const pet in Object.values(trip.pets)) {
            pet_names.push(pet.pet_name);
        }
        $("#chat_header_title").html("Animal Quarantine Staff Member");
        $("#chat_header_pets").html(`Flight: ${trip.flight.flight_id} | Pets: ${pet_names.join(", ")}`);
        for (const message_id of trip.message_ids) {
            const message = window.all_messages[message_id];
            $("#chat_user_history").append(`<li class="clearfix">
        <div class="message-data ${message.is_user ? "text-right" : ""}">
            <span class="message-data-time">${message.timestamp}</span>
        </div>
        <div class="message ${message.is_user ? "other-message float-right" : "my-message"}"> ${message.msg} </div>
    </li>`);
            //     $("#chat_user_history").append(`<li class="clearfix"><div class="message-data"><span class="message-data-time">10:15 AM, Today</span></div><div class="message my-message">Project has been already finished and I have results to show you.</div>`)
            //     $("#chat_user_history").append('<li class="clearfix">\
            //     <div class="message-data">\
            //         <span class="message-data-time">10:15 AM, Today</span>\
            //     </div>\
            //     <div class="message my-message">Project has been already finished and I have results to show you.</div>\
            // </li>')
        }

        $(document).on('keypress', function(e) {
            if (e.which == 13) {
                console.log("Sending message")
                    // pressed enter
                const message_id = window.message_count;
                const today = new Date();
                const timestamp = today.toLocaleDateString("en-US");
                window.all_messages[message_id] = {
                    "message_id": message_id,
                    "msg": $("#chat_text_bar").val(),
                    "is_user": true,
                    "timestamp": timestamp
                };
                window.all_trips[window.curr_trip].message_ids.push(message_id);
                sessionStorage.all_messages = JSON.stringify(window.all_messages);
                sessionStorage.all_trips = JSON.stringify(window.all_trips);
                sessionStorage.message_count = window.message_count + 1;
                location.reload();
            }
        });

    });



});