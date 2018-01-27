

    $(document).ready(function(e){
        $('#content').load('../homeTemplate.html');
        //e.defaultPrevented();
        $('.pages').click(function(){
            var page = $(this).attr('href');
            //var page = this.id;
            if (page === "homeTemplate" || page === "viewLcLogTemplate") {
                    page = "../" + page;
            }
            console.log(page);
            $('#content').load(page+".html");
            return false;
        });
    });
    

