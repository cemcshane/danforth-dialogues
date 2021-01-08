$( document ).ready(function() {
    const states = ['INTERNATIONAL', 'Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
    let majors = students = [];

    jQuery.get("data/majors.txt", function(data) {
        majors = data.split("\n\n");
        majors.forEach(function(major) {
            let id = major.replace(/[^A-Za-z]/g, '');
            $("#list").append("<option value=\"" + major +"\"></option>");
        });             
    });

    jQuery.get("data/students.json", function(data) {
        data.students.forEach(function(studentInfo) {
            const template = $("#student-template").html();
            let studentBox = $(template).appendTo("#students");
            studentBox.find("h2").text(studentInfo.name);
            studentBox.find(".major-data").text(studentInfo.major);
            studentBox.find(".hometown-data").text(studentInfo.hometown);
            studentBox.find(".email-data").text(studentInfo.email);
            studentBox.find(".quote-box p").text('"' + studentInfo.quote + '"');
            studentInfo.filterTags.forEach(function(tag) {
                studentBox.addClass(tag);
            })
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
                $("#list").append("<option value=\"" + major +"\"></option>");
            });
        }
        else {
            states.forEach(function(state) {
                $("#list").append("<option value=\"" + state +"\"></option>");
            });
        }
    });

    $("#filter-button").click(function() {
        const selection = $("#filter-box").val();
        const tag = selection.replace(/[^A-Za-z]/g, '');
        $("#reset-button").css("visibility", "visible");
        $("#students").children().each(function() {
            if(!$(this).hasClass(tag)) {
                $(this).hide();
            }
            else{
                $(this).show();
            }
        });
    });

    $("#reset-button").click(function() {
        $("#reset-button").css("visibility", "hidden");
        $("#filter-box").val("");
        $("#students").children().each(function() {
            $(this).show();
        });
    });
});
