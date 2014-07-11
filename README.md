# Triangulate

Triangulate is an open source, responsive content management system built on the AngularJS platform. Triangulate features a complete REST API, a lightning fast AngularJS UI, an easy-to-use drag-and-drop editor, Bootstrap 3, multilingual support, and beautiful themes available at triangulate.io. 

### Developer Preview Instructions
This is a developer preview of the application. During the preview only submit bugs to track.  Do not submit feature requests.  Installation support will not be available during the preview. 

Learn more about Triangulate at: http://triangulate.io (coming soon)

View our documentation at: http://triangulate.io/#/page/documentation (coming soon)

### Create Directory Structure
###### 1. Create the directory structure for triangulate

```
	.../triangulate
		.../triangulate/app
		.../triangulate/api
		.../triangulate/sites
```
		
```
	// go to your HTML root
	cd var/www/html
	
	// create directories
	mkdir triangulate
	
	// switch directories
	cd triangulate
	
	// create app, api, sites
	mkdir app
	mkdir api
	mkdir sites
```

###### 2. Make the sites directory writeable
```
	chown -R apache [path]/triangulate/sites
```

### Setup domains
###### 1. Setup your domains for Triangulate

```
	.../triangulate
		.../triangulate/app		-> http://app.path-to-app.com
		.../triangulate/api		-> http://api.path-to-app.com
		.../triangulate/sites	-> http://sites.path-to-app.com
```

###### 2. (alternate) or use a single domain

```
	.../triangulate
		.../triangulate/app		-> http://path-to-app.com/app
		.../triangulate/api		-> http://path-to-app.com/api
		.../triangulate/sites	-> http://path-to-app.com/sites
```

### Setup App
###### 1. Clone Triangulate app repository https://github.com/madoublet/triangulate.
```
	// switch to app directory
	cd app
	
	// clone Triangulate repository
	git clone https://github.com/madoublet/triangulate.git .
```

###### 2. Update settings in /setup.js.  You need to setup the url, api, and sites to match your domains.
```
	angular.module('triangulate.setup', [])
	.constant('Setup', {
		debug: 			true,
		
		// urls where your app (url), api and sites folder are publicly available
		url: 			'http://app.path-to-triangulate.com',
		api: 			'http://api.path-to-triangulate.com',
		sites: 			'http://sites.path-to-triangulate.com',
		
		// default theme
		themeId: 		'simple',
		
		// branding
		logo: 			'images/triangulate-icon.png',
		icon: 			'images/triangulate-icon.png',
		brand: 			'triangulate',
		
		// default lanugage
		language: 		'en',
		
		// pascode used by create (must match value set in API)
		passcode: 		'ilovetriangulate',
		
		// app branding
		app:			'Triangulate',
		version:		'1.0',
		copy: 			'Made by Matthew Smith in Manchester, MO'
		
	});
```

###### 3.  Uncomment and Add Google Maps API Key to index.html
```
<!-- Google maps API (for geocoding) 
    <script src="https://maps.googleapis.com/maps/api/js?key=[Google Maps API KEY]&sensor=false"></script>
    -->
```

### Create DB
###### 1. Create a database using the MySQL schema at https://github.com/madoublet/triangulate-php-apache-api/blob/master/schema.sql

### Create API
###### 1. Clone Triangulate API repository https://github.com/madoublet/triangulate-php-apache-api.
```
	// switch to app directory
	cd api
	
	// clone Triangulate repository
	git clone https://github.com/madoublet/triangulate-php-apache-api .
```

###### 2. Update database connection parameters and set paths and URLs in setup.php
```
	// DB connection parameters
	define('DB_HOST', 'localhost');
	define('DB_NAME', 'triangulate');
	define('DB_USER', 'dbuser');
	define('DB_PASSWORD', 'dbpass');
	
	// URL of the application
	define('APP_URL', 'http://app.path-to-triangulate.com');
	
	// location of the app folder
	define('APP_LOCATION', '../app');
	
	// URL of the API
	define('API_URL', 'http://api.path-to-triangulate.com');
	
	// URL of sites produced by the app
	define('SITES_URL', 'http://sites.path-to-triangulate.com');
	
	// location of the sites folder
	define('SITES_LOCATION', '../sites');
```

###### 3. Setup CORS to allow the app and sites to access the API
```
	define ('CORS', serialize (array (
	    'http://app.triangulate.io',
	    'http://sites.triangulate.io'
	    )));
```

### Create First Site
###### 1. Create first site at http://path.totriangulate.com/create