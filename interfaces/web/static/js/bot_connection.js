function get_update(){
    $.ajax({
      url: "/update",
    }).done(function(data) {
        unlock_ui();

    }).fail(function(data) {
        lock_ui();

    }).always(function(data) {
        manage_alert(data);
  });
}

function lock_ui(){
    $(".nav-link").addClass("disabled");
    update_status(false);
}

function unlock_ui(){
    $(".nav-link").removeClass("disabled");
    update_status(true);
}

function update_status(status){
    // update central status
    icon_status = $("#navbar-bot-status")
    if (status){
        icon_status.removeClass("fa-times-circle icon-red");
        icon_status.addClass("fa-check-circle icon-green");
    }else{
        icon_status.removeClass("fa-check-circle icon-green");
        icon_status.addClass("fa-times-circle icon-red");
    }

    // update reboot status
    icon_reboot = $("#navbar-bot-reboot")
    if (status){
        icon_reboot.removeClass("fa-spin");
    }else{
        icon_reboot.addClass("fa-spin");
    }
}

function manage_alert(raw_data){
    data = JSON.parse(raw_data)
    $.each(data, function(i, item) {
        create_alert(data[i].Level, data[i].Title, data[i].Message);
    })
}

function create_alert(a_level, a_title, a_msg){
    $.notify({
        title: a_title,
        message: a_msg
    },{
        type: a_level
    });
}

// Updater
$(document).ready(function () {
    setInterval(function(){ get_update(); }, 500);
});