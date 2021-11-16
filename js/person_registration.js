$(document).ready(function() {
    $("#submit_person").click(function() {
        console.log("Running submit")
        const first_name = $('#first_name').val();
        const middle_initial = $('#middle_initial').val();
        const last_name = $('#last_name').val();
        const dob = $('#person_dob').val();
        const pet_relation = $('#pet_relation_dropdown').children('option:selected').html();
        const military_type = $('input[name="military_type_radio"]:checked').val();
        const id_num = $('#id_num').val();
        const id_type = $('#id_type').val();
        const id_state = $('#id_state').val();
        const id_exp = $('#id_exp_date').val();
        const addr_line1 = $('#addr_line1').val();
        const addr_line2 = $('#addr_line2').val();
        const city = $('#city').val();
        const state = $('#state').val();
        const zipcode = $('#zipcode').val();
        const hi_line1 = $('#hi_addr1').val();
        const hi_line2 = $('#hi_addr2').val();
        const hi_city = $('#hi_city').val();
        const hi_island = $('#hi_island').val();
        const hi_zipcode = $('#hi_zipcode').val();
        const phone = $('#phone').val();
        const alt_phone = $('#alt_phone').val();
        const country_addr = $('#phone_country').val();
        const email = $('#email').val();

        const person = new Person(first_name, middle_initial, last_name, dob, pet_relation, military_type,
            id_num, id_type, id_state, id_exp, addr_line1, addr_line2, city, state, zipcode, hi_line1,
            hi_line2, hi_city, hi_island, hi_zipcode, phone, alt_phone, country_addr, email);

        console.log(person)
        if (!sessionStorage.user) {
            sessionStorage.user = JSON.stringify(person);
        } else {
            let user = JSON.parse(sessionStorage.user);
            user.all_handlers.push(person);
            sessionStorage.user = JSON.stringify(user);
        }
        if (!sessionStorage.all_people) {
            let obj = {};
            obj[person.person_id] = person
            sessionStorage.all_people = JSON.stringify(obj);
        } else {
            let all_people = JSON.parse(sessionStorage.all_people);
            all_person[person.person_id] = person;
            sessionStorage.all_people = JSON.stringify(all_people);
        }

    });
});

$(function() {
    const person = window.all_persons[window.edit_user];
    console.log(person)
    $('#first_name').val(person.first_name);
    $('#middle_initial').val(person.middle_initial);
    $('#last_name').val(person.last_name);
    // $('#dob-datepicker-person').val(person.dob);
    // for(let child of $('#pet_relation_dropdown').children('option:selected')){
    //     selected = none;
    //     child.val() = person.pet_relation
    // }
    // $('#pet_relation_dropdown').children('option:selected').html();
    // $('input[name="military_type_radio"]:checked').val(person.military_type);
    $('#id_num').val(person.id_num);
    // $('#exampleFormControlSelect1').val(person.id_type);
    $('#id_state').val(person.id_state);
    // $('#id_exp_date').val();
    $('#addr_line1').val(person.addr_line1);
    $('#addr_line2').val(person.addr_line2);
    $('#city').val(person.city);
    $('#state').val(person.state);
    $('#zipcode').val(person.zipcode);
    $('#hi_line1').val(person.hi_line1);
    $('#hi_line2').val(person.hi_line2);
    $('#hi_city').val(person.city);
    // $('#exampleFormControlSelect1').val(person.hi_island);
    $('#hi_zipcode').val(person.zipcode);
    $('#phone').val(person.phone);
    $('#alt_phone').val(person.alt_phone);
    $('#country_addr').val(person.country_addr);
    $('#email').val(person.email);
    $('#dob-datepicker-person').datepicker({
        format: "mm/dd/yyyy"
    }).datepicker(
        'setDate', person.dob
    ).on('change', function() {
        // $('#dob-datepicker').hide();
    });
    $('#exp-datepicker-person').datepicker({
        format: "mm/dd/yyyy"
    }).datepicker(
        'setDate', sessionStorage["filter_start"]
    ).on('change', function() {
        // $('#exp-datepicker').hide();
    });
});