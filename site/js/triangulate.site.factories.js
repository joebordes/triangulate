angular.module('triangulate.site.factories', [])

// site factory
.factory('Site', function($http){
	
	var site = {};
	
	// retrieve languages
	site.retrieve = function(callback){
	
		// post to API
		$http.get('data/site.json')
			.success(callback);
	}
	
	return site;
	
})

// adds authentication header to API requests, #ref: https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/
.factory('authInterceptor', function ($rootScope, $q, $window, $location) {
	return {
		request:function (config) {
			config.headers = config.headers || {};
			if($window.sessionStorage.token){
				config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
			}
			
			return config || $q.when(config);
		},
	
		responseError:function(rejection){
			
			if(rejection.status === 401){
				// handle the case where the user is not authenticated
				//location.href = Setup.url;
				//alert('401');
				$location.path('login');
			}
			
			return $q.reject(rejection);
		}
	};
})

// setup factory
.factory('Menu', function($http){
	
	var menu = {};
	
	// retrieve languages
	menu.list = function(callback){
	
		// post to API
		$http.get('data/menu.json')
			.success(callback);
	}
	
	return menu;
	
})

// setup factory
.factory('Page', function($http, $rootScope){
	
	var page = {};
	
	// retrieve languages
	page.list = function(type, pagesize, current, orderby, successCallback, failureCallback){
		
		// set params
		var params = {
			siteId: $rootScope.site.SiteId,
			type: type,
			pagesize: pagesize,
			current: current,
			orderby: orderby,
		}
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post($rootScope.site.API + '/page/published/list', $.param(params))
			.success(successCallback)
			.error(failureCallback);
			
	}
	
	return page;
	
})

// user factory
.factory('User', function($http, $rootScope, $window){

	var user = {};

	// retrieves a user
	user.retrieve = function(){
	
		var user = JSON.parse($window.sessionStorage.user);
		
		return user;
	}
	
	// login API call
	user.login = function(email, password, successCallback, failureCallback){
	
		// set params
		var params = {
			email: email,
			password: password
		}
	
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post($rootScope.site.API + '/user/login', $.param(params))
			.success(function(data){
				
				// set user in session
				$window.sessionStorage.user = JSON.stringify(data.user);
				
				// call callback
				successCallback(data);
				
			})
			.error(failureCallback);
					
	}
	
	// add a user
	user.add = function(toBeAdded, siteId, successCallback, failureCallback){
		
		// set params
		var params = {
			siteId: siteId,
			firstName: toBeAdded.FirstName, 
			lastName: toBeAdded.LastName, 
			email: toBeAdded.Email, 
			password: toBeAdded.Password};
		
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post($rootScope.site.API + '/user/add/member', $.param(params))
			.success(successCallback)
			.error(failureCallback);
			
	}
	
	return user;
	
})

// setup factory
.factory('Form', function($http, $rootScope){
	
	var form = {};
	
	// submit form
	form.submit = function(siteId, pageId, params, successCallback, failureCallback){
	
		params['siteId'] = siteId;
		params['pageId'] = pageId;
		
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post($rootScope.site.API + '/form', $.param(params))
			.success(successCallback)
			.error(failureCallback);
			
	}
	
	return form;
	
})
;