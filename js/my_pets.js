$(function() {
    const owner = window.all_persons[window.user];
    console.log(window.all_persons[window.user])
    let arr = [];
    for (const [pet_id, pet] of Object.entries(owner.all_pets)) {
        let most_recent_trip = owner.all_trips[0];
        for (const [trip_id, trip] of Object.entries(owner.all_trips)) {
            if (trip.arrival_time < most_recent_trip.arrival_time) {
                most_recent_trip = trip;
            }
        }
        const trip_pet = most_recent_trip.trip_pets[pet_id];
        arr.push([
            pet.pet_name, !trip_pet ? "None" : trip_pet.pet_status,
            pet.birth_date,
            pet.species,
            pet.microchip_nums.join(", ")
        ])
    }

    add_rows('#my_pet_table', arr, function() {
        // $("#my_pet_table").click(function() {
        //     sessionStorage.curr_trip = $(this).attr("trip_id");
        //     sessionStorage.curr_pet = $(this).attr("trip_id");
        // });
    });
});