// triangulate app
// triangulate.controllers 	-> js/triangulate.controllers.js
// triangulate.factories 	-> js/triangulate.factories.js
// triangulate.directives	-> js/triangulate.directives.js
angular.module('triangulate', ['ui.router', 
	'ui.codemirror',
	'triangulate.setup',
	'triangulate.controllers',
	'triangulate.factories',
	'triangulate.directives',
	'triangulate.filters',
	'jm.i18next'])

// disable header during development
/*
.config(['$httpProvider', function($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
}])*/

// configure the module
.config(function($stateProvider, $urlRouterProvider, $i18nextProvider, $httpProvider) {

	// config $il8nextProvider
	$i18nextProvider.options = {
        lng: 'en',
        useCookie: false,
        useLocalStorage: false,
        fallbackLng: 'en',
        resGetPath: 'locales/__lng__/__ns__.json'
    };
	
	// set authInterceptor
	$httpProvider.interceptors.push('authInterceptor');
	
	// set states
	$stateProvider
		.state('login', {
		  url: "/login",
		  templateUrl: "templates/login.html",
		  controller: 'LoginCtrl'
		})
		
		.state('create', {
		  url: "/create",
		  templateUrl: "templates/create.html",
		  controller: 'CreateCtrl'
		})
		
		.state('app', {
		  url: "/app",
		  abstract: true,
		  templateUrl: "templates/menu.html",
		  controller: 'MenuCtrl'
		})
		
		.state('app.pages', {
		  url: "/pages",
		  views: {
		    'content' :{
		      templateUrl: "templates/pages.html",
		      controller: 'PagesCtrl'
		    }
		  }
		})
		
		.state('app.content', {
		  url: "/content/:id",
		  views: {
		    'content' :{
		      templateUrl: "templates/content.html",
		      controller: 'ContentCtrl'
		    }
		  }
		})
		
		.state('app.menus', {
		  url: "/menus",
		  views: {
		    'content' :{
		      templateUrl: "templates/menus.html",
		      controller: 'MenusCtrl'
		    }
		  }
		})
		
		.state('app.layouts', {
		  url: "/layouts",
		  views: {
		    'content' :{
		      templateUrl: "templates/layouts.html",
		      controller: 'LayoutsCtrl'
		    }
		  }
		})
		
		.state('app.styles', {
		  url: "/styles",
		  views: {
		    'content' :{
		      templateUrl: "templates/styles.html",
		      controller: 'StylesCtrl'
		    }
		  }
		})
		
		.state('app.settings', {
		  url: "/settings",
		  views: {
		    'content' :{
		      templateUrl: "templates/settings.html",
		      controller: 'SettingsCtrl'
		    }
		  }
		})
		
		.state('app.theme', {
		  url: "/theme",
		  views: {
		    'content' :{
		      templateUrl: "templates/theme.html",
		      controller: 'ThemeCtrl'
		    }
		  }
		})
		
		.state('app.branding', {
		  url: "/branding",
		  views: {
		    'content' :{
		      templateUrl: "templates/branding.html",
		      controller: 'BrandingCtrl'
		    }
		  }
		})
		
		.state('app.files', {
		  url: "/files",
		  views: {
		    'content' :{
		      templateUrl: "templates/files.html",
		      controller: 'FilesCtrl'
		    }
		  }
		})
		
		.state('app.users', {
		  url: "/users",
		  views: {
		    'content' :{
		      templateUrl: "templates/users.html",
		      controller: 'UsersCtrl'
		    }
		  }
		})
		
		.state('app.roles', {
		  url: "/roles",
		  views: {
		    'content' :{
		      templateUrl: "templates/roles.html",
		      controller: 'RolesCtrl'
		    }
		  }
		})
		
		.state('app.scripts', {
		  url: "/scripts",
		  views: {
		    'content' :{
		      templateUrl: "templates/scripts.html",
		      controller: 'ScriptsCtrl'
		    }
		  }
		});
	
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/login');
  
})

.run(function($rootScope, $i18next, $window, Setup, $sce) {

	// set app title
	$rootScope.title = Setup.app;
		
});

function initialize(){};

