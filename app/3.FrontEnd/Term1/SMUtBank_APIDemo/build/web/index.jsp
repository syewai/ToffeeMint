<!DOCTYPE html>
<html lang="en" class="bg-dark">

<head>
    <meta charset="utf-8" />
    <title>tBank - Trade Finance</title>
    <meta name="description" content="app, web app, responsive, admin dashboard, admin, flat, flat ui, ui kit, off screen nav" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <link rel="stylesheet" href="assets/css/bootstrap.css" type="text/css" />
    <link rel="stylesheet" href="assets/css/animate.css" type="text/css" />
    <link rel="stylesheet" href="assets/css/font-awesome.min.css" type="text/css" />
    <link rel="stylesheet" href="assets/css/font.css" type="text/css" />
    <link rel="stylesheet" href="assets/css/app.css" type="text/css" />
    <!--[if lt IE 9]>
    <script src="assets/js/ie/html5shiv.js"></script>
    <script src="assets/js/ie/respond.min.js"></script>
    <script src="assets/js/ie/excanvas.js"></script>
  <![endif]-->
</head>

<body class="">
    <section id="content" class="m-t-lg wrapper-md animated fadeInUp">
        <div class="container aside-xxl">
            <div class="navbar-brand block" href="">SMU tBank - Trade Finance</div>
            <section class="panel panel-default bg-white m-t-lg">
                <header class="panel-heading text-center">
                    <strong>Sign in</strong>
                </header>
                <form class="panel-body wrapper-lg" id="loginForm" action="home.jsp" method = "post">
                    <div class="form-group">
                        <label class="control-label">Username</label>
                        <input type="text" placeholder="Username" class="form-control input-lg" name="username" id="username">
                    </div>
                    <div class="form-group">
                        <label class="control-label">Password</label>
                        <input type="password" placeholder="Password" class="form-control input-lg" name="password" id="password">
                    </div>
                    <!--<div class="form-group">
                        <label class="control-label">Role</label>
                        <div class="">
                            <select name="role" class="form-control m-b">
                              <option value="">--Please select your role--</option>
                              <option value="importer">Importer</option>
                              <option value="exporter">Exporter</option>
                          </select>
                        </div>
                    </div>-->
                    <div class="checkbox">
                        <label><input type="checkbox"> Keep me logged in</label>
                    </div>
                    <a href="#" class="pull-right m-t-xs"><small>Forgot password?</small></a>
                    
                    <a href="applyLc.jsp"><button type="submit" class="btn btn-primary" id="login_button">Sign in</button></a>
                    <div class="line line-dashed"></div>
                </form>
            </section>
        </div>
    </section>

    <script src="assets/js/jquery.min.js"></script>
    <!-- Bootstrap -->
    <script src="assets/js/bootstrap.js"></script>
    <!-- App -->
    <script src="assets/js/app.js"></script>
    <script src="assets/js/slimscroll/jquery.slimscroll.min.js"></script>
    <script src="assets/js/app.plugin.js"></script>
    
    

</body>

</html>