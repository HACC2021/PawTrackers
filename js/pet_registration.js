$(document).ready(function() {
    $("body").on("click", ".add_new_frm_field_btn", function() {
        console.log("clicked");
        var index = $(".form_field_outer").find(".form_field_outer_row").length + 1;
        $(".form_field_outer").append(`
            <div class="row form_field_outer_row">
                <div class="form-group col-md-3"><input type="text" class="form-control w_90" name="first_name[]" id="first_name_${index}" placeholder="First name" /></div>
                <div class="form-group col-md-2"><input type="text" class="form-control w_90" name="mi[]" id="mi_${index}" placeholder="MI" /></div>
                <div class="form-group col-md-3"><input type="text" class="form-control w_90" name="last_name[]" id="last_name_${index}" placeholder="Last name" /></div>
                <div class="form-group col-md-2"><input type="text" class="form-control w_90" name="id_no[]" id="id_no_${index}" placeholder="Last 4 digits" /></div>
                <div class="form-group col-md-2 add_del_btn_outer"><button class="btn_round remove_node_btn_frm_field" disabled><i class="fas fa-trash-alt"></i></button></div>
            </div>
`);
        $(".form_field_outer").find(".remove_node_btn_frm_field:not(:first)").prop("disabled", false);
        $(".form_field_outer").find(".remove_node_btn_frm_field").first().prop("disabled", true);


    });
});
$(document).ready(function() {
    //===== delete the form fixed row
    $("body").on("click", ".remove_node_btn_frm_field", function() {
        $(this).closest(".form_field_outer_row").remove();
        console.log("success");
    });
});

$(document).ready(function() {
    $("body").on("click", ".add_new_frm_field_btn_2", function() {
        console.log("clicked");
        var index = $(".form_field_outer_2").find(".form_field_outer_row_2").length + 1;
        $(".form_field_outer_2").append(`
            <div class="row form_field_outer_row_2">
                <div class="form-group col-md-8"><input type="text" class="form-control w_90" name="microchip_no[]" id="microchip_no_${index}" placeholder="Enter microchip #" /></div>
                <div class="form-group col-md-2 add_del_btn_outer_2"><button class="btn_round remove_node_btn_frm_field_2" disabled><i class="fas fa-trash-alt"></i></button></div>
            </div>
`);
        $(".form_field_outer_2").find(".remove_node_btn_frm_field_2:not(:first)").prop("disabled", false);
        $(".form_field_outer_2").find(".remove_node_btn_frm_field_2").first().prop("disabled", true);


    });
});
$(document).ready(function() {
    //===== delete the form fixed row
    $("body").on("click", ".remove_node_btn_frm_field_2", function() {
        $(this).closest(".form_field_outer_row_2").remove();
        console.log("success");
    });
});

$(function() {
    $('#dob-datepicker-pet').datepicker({
        format: "mm/dd/yyyy"
    }).on('change', function() {
        // $('#dob-datepicker').hide();
    });
    $('#exp-datepicker-pet').datepicker({
        format: "mm/dd/yyyy"
    }).on('change', function() {
        // $('#exp-datepicker').hide();
    });
});