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