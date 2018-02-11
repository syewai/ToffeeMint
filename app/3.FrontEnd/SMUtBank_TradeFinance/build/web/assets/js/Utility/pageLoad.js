function pageLoad() {
    $(document).ready(function (e) {

        var getUserItem = sessionStorage.getItem('user');
        var user = $.parseJSON(getUserItem);
        var usertype = user.usertype;
        if (usertype === "importer" || usertype === "exporter") {
            var getPageItem = sessionStorage.getItem('page');
            if (getPageItem !== null) {
                var newPageJSON = $.parseJSON(getPageItem);
                //var refNum = newPageJSON.refNum;
                var newPage = newPageJSON.page;
                if (newPage === "homeTemplate" || newPage === "viewLcLogTemplate") {
                    newPage = "../" + newPage;
                }
                //console.log(newPage);
                //empty content
                $('#content').load(newPage + ".html");
                sessionStorage.removeItem('page');
            } else {
                $('#content').empty();
                $('#content').load('../homeTemplate.html');
                //e.defaultPrevented(); 
            }


            $('.pages').click(function () {
                $('#content').empty();
                var page = $(this).attr('href');
                //var page = this.id;
                if (page === "homeTemplate" || page === "viewLcLogTemplate") {
                    page = "../" + page;
                }
                //console.log(page);
                $('#content').empty();
                $('#content').load(page + ".html");
                return false;
            });

        } else if (usertype === "shipper") {
            $('#content').empty();
            $('#content').load('home.html');
            //e.defaultPrevented();
            $('.pages').click(function () {
                var page = $(this).attr('href');
                //var page = this.id;
                //console.log(page);
                $('#content').empty();
                $('#content').load(page + ".html");
                return false;
            });

        }

    });
}