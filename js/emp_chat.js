$(function() {

    nav_bar_loaded_callbacks.push(function() {
        const search_str = window.chat_search.toLowerCase();
        const is_search = search_str.length > 0;
        for (const [person_id, owner] of Object.entries(window.all_persons)) {
            if (!owner.all_trips) continue;
            if (is_search && !owner.full_name().toLowerCase().includes(search_str)) continue;
            for (const [trip_id, trip] of Object.entries(owner.all_trips)) {
                $(".chat-list").append(`<li class="clearfix person-list-item ${window.curr_trip == trip_id ? "active" : ""}" owner_id="${person_id}" trip_id="${trip_id}">
            <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar">
            <div class="about">
                <div class="name">${owner.full_name()}</div>
                <div class="status"> <i class="fa fa-circle offline"></i> offline </div>
            </div>
        </li>`);
            }
        }

        $(".person-list-item").click(function() {
            sessionStorage.edit_user = $(this).attr("owner_id");
            sessionStorage.curr_trip = $(this).attr("trip_id");
            location.reload()
        });

        const trip = window.all_trips[window.curr_trip];
        let pet_names = [];
        for (const pet in Object.values(trip.pets)) {
            pet_names.push(pet.pet_name);
        }
        $("#chat_header_title").html("Animal Quarantine Staff Member");
        $("#chat_header_pets").html(`Flight: ${trip.flight.flight_id} | Pets: ${pet_names.join(", ")}`);
        for (const message_id of trip.message_ids) {
            const message = window.all_messages[message_id];
            const is_emp = !message.is_user;
            $("#chat_user_history").append(`<li class="clearfix">
        <div class="message-data ${is_emp ? "text-right" : ""}">
            <span class="message-data-time">${message.timestamp}</span>
        </div>
        <div class="message ${is_emp ? "other-message float-right" : "my-message"}"> ${message.msg} </div>
        </li>`);
            //     $("#chat_user_history").append(`<li class="clearfix"><div class="message-data"><span class="message-data-time">10:15 AM, Today</span></div><div class="message my-message">Project has been already finished and I have results to show you.</div>`)
            //     $("#chat_user_history").append('<li class="clearfix">\
            //     <div class="message-data">\
            //         <span class="message-data-time">10:15 AM, Today</span>\
            //     </div>\
            //     <div class="message my-message">Project has been already finished and I have results to show you.</div>\
            // </li>')
        }

        $('#person-list-search').val(
            sessionStorage.chat_search
        )

        $(document).on('keypress', function(e) {
            if (e.which == 13) {
                // pressed enter
                const msg_txt = $("#chat_text_bar").val();
                if (msg_txt.length > 0) {
                    console.log("Sending message")
                    const message_id = window.message_count;
                    const today = new Date();
                    const timestamp = today.toLocaleDateString("en-US");
                    window.all_messages[message_id] = {
                        "message_id": message_id,
                        "msg": msg_txt,
                        "is_user": false,
                        "timestamp": timestamp
                    };
                    window.all_trips[window.curr_trip].message_ids.push(message_id);
                    sessionStorage.all_messages = JSON.stringify(window.all_messages);
                    sessionStorage.all_trips = JSON.stringify(window.all_trips);
                    sessionStorage.message_count = window.message_count + 1;
                } else {
                    sessionStorage.chat_search = $('#person-list-search').val();
                }
                window.location.reload();
            }
        });

    });

});