$(document).ready(function() {
    $("textarea").on("paste keyup", function (event) {
        let count = $(this).val().length
        let counterVal = 140 - count;
        console.log(count, counterVal)
        if (counterVal >= 0) {
            $(this).siblings('.counter').text(counterVal).removeClass(' invalidLength');
        } else {
            $(this).siblings('.counter').text(counterVal).addClass(' invalidLength');
        }
        console.log(event);
    });
});