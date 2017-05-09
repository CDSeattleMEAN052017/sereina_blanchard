$(document).ready(function(){   

    // $("button").on("click", function() {
    //     $(this).css("background", "red");
    // })

    $("button").on("click", function () {
        $(this).toggleClass("red");
    });

    $("button").hover(
        function() {
            $(this).addClass("green");
        }, function() {
            $(this).removeClass("green");
        }
    );



});