angular.module('triangulate.setup', [])
.constant('Setup', {
	debug: 			false,
	
	// urls where your app (url), api and sites folder are publicly available
	url: 			'https://app.mytriangulate.com',
	api: 			'https://app.mytriangulate.com/api',
	sites: 			'http://sites.mytriangulate.com',
	site:			'http://{{friendlyId}}.mytriangulate.com',
	
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
	
	// app branding (please provide attribution if you change the branding)
	app:			'Triangulate',
	version:		'1.0',
	copy: 			'Made by Matthew Smith in Manchester, MO',
	email:			'matt@matthewsmith.com',
	
	//links
	pricingLink:	'http://triangulate.io/page/pricing'
	
});
