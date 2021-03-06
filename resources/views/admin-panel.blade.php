<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Laravel</title>

    <link href="/vendor/trumbowyg/dist/ui/trumbowyg.min.css" rel="stylesheet" >
	<link href="{{ asset('/css/boilerplate.css') }}" rel="stylesheet">
	<link href="{{ asset('/css/admin-panel.css') }}" rel="stylesheet">

	<!-- Fonts -->
	<link href='//fonts.googleapis.com/css?family=Roboto:400,300' rel='stylesheet' type='text/css'>

	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->
</head>
<body>
	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle Navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="{{ url('/') }}">Project Grasshopper</a>
			</div>

			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			    @if (!Auth::guest())
                    <ul class="nav navbar-nav">
                        <li><a href="{{ url('/admin') }}">Home</a></li>
                        <li><a href="{{ url('/admin/answers') }}">Antwoorden</a></li>
                    </ul>
                @endif

				<ul class="nav navbar-nav navbar-right">
					@if (Auth::guest())
						<li><a href="{{ url('/auth/login') }}">Login</a></li>
						<li><a href="{{ url('/auth/register') }}">Register</a></li>
					@else
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{{ Auth::user()->name }} <span class="caret"></span></a>
							<ul class="dropdown-menu" role="menu">
								<li><a href="{{ url('/auth/logout') }}">Logout</a></li>
							</ul>
						</li>
					@endif
				</ul>
			</div>
		</div>
	</nav>


    <div class="container">
    	<div class="row">
    		<div class="col-md-10 col-md-offset-1">

    		    @if(isset($message))
            	    <div class="alert alert-info" role="alert">
            	        <strong>{{ $message }}</strong>
            	    </div>
            	@endif

	            @yield('content')

	        </div>
	    </div>
	</div>

	<!-- Scripts -->
	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/js/bootstrap.min.js"></script>
    <script src="/vendor/trumbowyg/dist/trumbowyg.min.js"></script>
    <script src="/js/admin-panel.js"></script>

</body>
</html>
