

$(document).ready(function (e) {
    var getUserItem = sessionStorage.getItem('user');
    var user = $.parseJSON(getUserItem);
    var usertype = user.usertype;
    if (usertype === "importer" || usertype === "exporter") {
        $('#content').load('../homeTemplate.html');
        //e.defaultPrevented();
        $('.pages').click(function () {
            var page = $(this).attr('href');
            //var page = this.id;
            if (page === "homeTemplate" || page === "viewLcLogTemplate") {
                page = "../" + page;
            }
            console.log(page);
            $('#content').load(page + ".html");
            return false;
        });

    } else if (usertype === "shipper") {
        $('#content').load('home.html');
        //e.defaultPrevented();
        $('.pages').click(function () {
            var page = $(this).attr('href');
            //var page = this.id;
            console.log(page);
            $('#content').load(page + ".html");
            return false;
        });

    }

});


