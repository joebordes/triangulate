angular.module('triangulate.setup', [])
.constant('Setup', {
	debug: 			false,
	
	// urls where your app (url), api and sites folder are publicly available
	url: 			'https://app.mytriangulate.com',
	api: 			'https://app.mytriangulate.com/api',
	sites: 			'http://sites.mytriangulate.com',
	site:			'http://{{friendlyId}}.mytriangulatesites.com',
	terms:			'http://mytriangulate.com/terms-of-service',
	
	// default theme
	themeId: 		'simple',
	
	// branding
	logo: 			'images/triangulate-icon.png',
	icon: 			'images/triangulate-icon.png',
	brand: 			'triangulate',
	
	// default lanugage
	language: 		'en',

	// public keys
	stripePubKey:	'',
	
	// pascode used by create (must match value set in API)
	passcode: 		'',
	
	// app branding
	app:			'Triangulate',
	version:		'1.01',
	copy: 			'Made by Matthew Smith in Manchester, MO',
	email:			'matt@matthewsmith.com',
	
	//links
	pricingLink:	'http://mytriangulate.com/page/pricing'
	
});
