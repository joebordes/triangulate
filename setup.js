angular.module('triangulate.setup', [])
.constant('Setup', {
	debug: 			true,
	
	// urls where your app (url), api and sites folder are publicly available
	url: 			'http://path-to-app.com',
	api: 			'http://path-to-api.com',
	sites: 			'http://path-to-sites.com',
	
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
	copy: 			'Made by Matthew Smith in Manchester, MO',
	
	// google maps API key
	gapiKey:		''
	
});