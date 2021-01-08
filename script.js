$( document ).ready(function() {
    const states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
    let majors = [];

    jQuery.get("data/majors.txt", function(data) {
        majors = data.split("\n\n");
        majors.forEach(function(major) {
            let id = major.replace(/[^A-Za-z]/g, '');
            $("#list").append("<option id=\"" + id +"\">" + major + "</option>");
        });             
    });

    $("#filter-tabs li").click(function() {
        const tab = $(this).attr("id");
        $(".clicked").removeClass("clicked");
        $(this).addClass("clicked");
        $("#filter-box").attr("placeholder", "Choose a " + tab);
        $("#filter-box").val("");
        $("#list").empty();
        if(tab=="major") {
            majors.forEach(function(major) {
                let id = major.replace(/[^A-Za-z]/g, '');
                $("#list").append("<option id=\"" + id +"\">" + major + "</option>");
            });
        }
        else {
            states.forEach(function(state) {
                let id = state.replace(/[^A-Za-z]/g, '');
                $("#list").append("<option id=\"" + id +"\">" + state + "</option>");
            });
        }
    });

    $("#filter-button").click(function() {
        const tab = $(".clicked").attr("id");
        const selection = $("#filter-box option:selected").attr("id");
    });
});
