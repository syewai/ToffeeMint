(function() {

    function init() {
        $('#submitButton').click(submitButtonHandler);
    }

    function submitButtonHandler(evt) {
        var lc = document.getElementById('lc');

        //prevent form submission
        evt.preventDefault();
        evt.stopPropagation();

        // $('#post-results-container').fadeOut();
        // $('.ajaxLoader').css('display', 'inline-block');

        //Perform a serverside validation check


        //make the AJAX call
        $.ajax({
            url: '/lc',
            type: 'POST',
            data: {
                expiryDate: lc.expiryDate.value,
                expiryPlace: lc.expiryPlace.value,
                amount: lc.amount.value,
                currency: lc.currency.value
            },
            success: postSuccessHandler
        });
    }

    function postSuccessHandler(jsonData) {
        //notification triggered. 

        /*var $data = $('#post-results-container .data');

        //reset the UI
        $data.html('');
        $('.ajaxLoader').hide();

        //update the UI with the data returned from the AJAX call 
        $.each(jsonData, function(key, val) {
            $data.append('<li><b>' + key + '</b>' + val + '</li>');
        });

        $('#post-results-container').fadeIn();*/
    };

    //init on document ready
    $(document).ready(init);
})();