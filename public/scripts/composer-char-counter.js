$(document).ready(function() {
    // console.log('properly linked');
    // $("textarea").on("keyup", (event) => console.log(event.key));
    // $("textarea").on("keypress", (event) => console.log(event));

    $("textarea").on("keyup", function (event) {
        // console.log(event);
        let count = $(this).val().length
        let counterVal = 140 - count;
        if (counterVal >= 0) {
            $(this).siblings('.counter').text(counterVal).removeClass(' invalidLength');
        } else {
            $(this).siblings('.counter').text(counterVal).addClass(' invalidLength');
        }
        console.log(counterVal);
    });
});