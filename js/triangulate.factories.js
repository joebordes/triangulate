angular.module('triangulate.factories', [])

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
				$location.path('login');
			}
			
			return $q.reject(rejection);
		}
	};
})

// site factory
.factory('Site', function($http, Setup){
	
	var site = {};
	
	// retrieve site
	site.retrieve = function(callback){
	
		// set params
		var params = {};
	
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
			
		// post to API
		$http.post(Setup.api + '/site/retrieve/', $.param(params))
			.success(callback);
			
	}
	
	// validate friendlyId for a site
	site.validateFriendlyId = function(friendlyId, successCallback, failureCallback){
	
		// set params
		var params = {
			friendlyId: friendlyId
		}
	
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/site/validate/id', $.param(params))
			.success(successCallback)
			.error(failureCallback);
	}
	
	// validate email for a site
	site.validateEmail = function(email, successCallback, failureCallback){
	
		// set params
		var params = {
			email: email
		}
	
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/site/validate/email', $.param(params))
			.success(successCallback)
			.error(failureCallback);
	}
	
	// create a site
	site.create = function(friendlyId, name, email, password, passcode, timeZone, language, userLanguage, theme, 
		successCallback, failureCallback){
	
		// set params
		var params = {
			friendlyId: friendlyId, 
			name: name, 
			email: email, 
			password: password, 
			passcode: passcode,
			timeZone: timeZone, 
			language: language, 
			userLanguage: userLanguage, 
			theme: theme
		}
	
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/site/create', $.param(params))
			.success(successCallback)
			.error(failureCallback);
	}
	
	// publish a site
	site.publish = function(successCallback, failureCallback){
		
		// API call
		$http.get(Setup.api + '/site/publish')
			.success(successCallback)
			.error(failureCallback);
	}
	
	// saves settings for the site
	site.save = function(site, successCallback, failureCallback){
			
		// set params
		var params = { 
			name: site.Name, 
			domain: site.Domain,
			primaryEmail: site.PrimaryEmail, 
			timeZone: site.TimeZone,
			language: site.Language,
			currency: site.Currency,
			showCart: site.ShowCart,
			showSettings: site.ShowSettings,
			weightUnit: site.WeightUnit,
			shippingCalculation: site.ShippingCalculation,
			shippingRate: site.ShippingRate,
			shippingTiers: site.ShippingTiers,
			taxRate: site.TaxRate,
			payPalId: site.PayPalId,
			payPalUseSandbox: site.PayPalUseSandbox,
			formPublicId: site.FormPublicId,
			formPrivateId: site.FormPrivateId
		}
	
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/site/save', $.param(params))
			.success(successCallback)
			.error(failureCallback);
	}
	
	// adds images for the site
	site.addImage = function(type, image, callback){
		
		// set params
		var params = { 
			url: image.filename, 
			type: type
		}
	
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/site/branding/image', $.param(params))
			.success(callback);
		
	}
	
	// adds images for the site
	site.updateIconBg = function(color, callback){
		
		// set params
		var params = { 
			color: color
		}
	
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/site/branding/icon/background', $.param(params))
			.success(callback);
		
	}
	
	return site;
	
})

// user factory
.factory('User', function($http, $window, Setup){
	
	var user = {};
	user.data = [];
	
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
		$http.post(Setup.api + '/user/login', $.param(params))
			.then(function(res){
			
				// set user in session
				$window.sessionStorage.user = JSON.stringify(res.data.user);
				
				return res.data;
			}, failureCallback)
			.then(successCallback);
			
	}
	
	// add a user
	user.add = function(toBeAdded, callback){
		
		// set params
		var params = {
			firstName: toBeAdded.FirstName, 
			lastName: toBeAdded.LastName, 
			role: toBeAdded.Role, 
			language: toBeAdded.Language, 
			isActive: toBeAdded.IsActive, 
			email: toBeAdded.Email, 
			password: toBeAdded.Password};
		
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/user/add', $.param(params))
			.then(function(res){
				
				// push data to factory
				user.data.push(res.data);
				
				return res.data;
				
			})
			.then(callback);
	}
	
	// edits a user
	user.edit = function(toBeEdited, callback){
	
		// set params
		var params = {
			userId: toBeEdited.UserId,
			firstName: toBeEdited.FirstName, 
			lastName: toBeEdited.LastName, 
			role: toBeEdited.Role, 
			language: toBeEdited.Language, 
			isActive: toBeEdited.IsActive, 
			email: toBeEdited.Email, 
			password: toBeEdited.Password};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/user/edit', $.param(params))
			.success(callback);
	}
	
	// removes a user
	user.remove = function(toBeRemoved, callback){
	
		// set params
		var params = {
			userId: toBeRemoved.UserId
			};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/user/remove', $.param(params))
			.then(function(res){
				
				var i = user.getIndexById(toBeRemoved.UserId);
				if(i !== -1)user.data.splice(i, 1);
				
			})
			.then(callback);
	}
	
	// retrieve a list of users for a site
	user.list = function(callback){
	
		// get list from API, ref: http://bit.ly/1gkUW4E
		$http.get(Setup.api + '/user/list/')
			.then(function(res){
			
				// set data for factory
				user.data = res.data;
				return user.data;
				
			})
			.then(callback);
	}
	
	// adds a profile image for the user
	user.addImage = function(userId, image, callback){
		
		// set params
		var params = {
			userId: userId, 
			photoUrl:image.filename
			};
	
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/user/photo/', $.param(params))
			.then(function(res){
				// set data
				var i = user.getIndexById(userId);
				user.data[i].HasPhoto = true;
				user.data[i].FullPhotoUrl = res.data;
			})
			.then(callback);
		
	}
	
	// get the index by id
	user.getIndexById = function(id){
	
		var data = user.data;
		
		for(x=0; x<data.length; x++){
			
			if(data[x].UserId == id){
				return x;
			}
			
		}
		
		return -1;
	}
	
	return user;
	
})

// role factory
.factory('Role', function($http, Setup){
	
	var role = {};
	role.data = [];
	
	// add a role
	role.add = function(toBeAdded, callback){
		
		// set params
		var params = {
			name: toBeAdded.Name, 
			canView: toBeAdded.CanView, 
			canEdit: toBeAdded.CanEdit, 
			canPublish: toBeAdded.CanPublish, 
			canRemove: toBeAdded.CanRemove, 
			canCreate: toBeAdded.CanCreate};
		
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/role/add', $.param(params))
			.then(function(res){
				// push data to factory
				role.data.push(res.data);
				
			})
			.then(callback);
	}
	
	// edits a role
	role.edit = function(toBeEdited, callback){
	
		// set params
		var params = {
			roleId: toBeEdited.RoleId,
			name: toBeEdited.Name, 
			canView: toBeEdited.CanView, 
			canEdit: toBeEdited.CanEdit, 
			canPublish: toBeEdited.CanPublish, 
			canRemove: toBeEdited.CanRemove, 
			canCreate: toBeEdited.CanCreate};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/role/edit', $.param(params))
			.success(callback);
	}
	
	// removes a role
	role.remove = function(toBeRemoved){
	
		// set params
		var params = {
			roleId: toBeRemoved.RoleId
			};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/role/remove', $.param(params))
			.then(function(res){
				
				var i = role.getIndexById(toBeRemoved.RoleId);
				if(i !== -1)role.data.splice(i, 1);
				
			});
	}
	
	// retrieve a list of roles for a site
	role.list = function(callback){
	
		// get list from API, ref: http://bit.ly/1gkUW4E
		$http.get(Setup.api + '/role/list/')
			.then(function(res){
			
				// set data for factory
				role.data = res.data;
				return role.data;
				
			})
			.then(callback);
	}

	// get the index by id
	role.getIndexById = function(id){
	
		var data = role.data;
		
		for(x=0; x<data.length; x++){
			
			if(data[x].RoleId == id){
				return x;
			}
			
		}
		
		return -1;
	}
	
	return role;
	
})

// page type factory
.factory('PageType', function($http, Setup){
	
	// init
	var pageType = {};
	pageType.data = [];
	
	// add a pagetype
	pageType.add = function(toBeAdded){
		
		// set params
		var params = {
			friendlyId: toBeAdded.FriendlyId,
			layout: toBeAdded.Layout, 
			stylesheet: toBeAdded.Stylesheet, 
			isSecure: toBeAdded.IsSecure};
		
		console.log('params');	
		console.log(params);
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/pagetype/add', $.param(params))
			.then(function(res){
				
				// push data to factory
				pageType.data.push(res.data);
				
			});
	}
	
	// edit a pagetype
	pageType.edit = function(toBeEdited){
	
		// set params
		var params = {
			pageTypeId: toBeEdited.PageTypeId, 
			typeS: toBeEdited.TypeS, 
			typeP: toBeEdited.TypeP, 
			layout: toBeEdited.Layout, 
			stylesheet: toBeEdited.Stylesheet, 
			isSecure: toBeEdited.IsSecure};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/pagetype/edit', $.param(params))
			.then(function(res){});
	}
	
	// removes a pagetype
	pageType.remove = function(toBeRemoved){
	
		// set params
		var params = {
			pageTypeId: toBeRemoved.PageTypeId
			};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/pagetype/remove', $.param(params))
			.then(function(res){
				
				var i = pageType.getIndexById(toBeRemoved.PageTypeId);
				if(i !== -1)pageType.data.splice(i, 1);
				
			});
	}
	
	// retrieve allowed pagetypes
	pageType.listAllowed = function(callback){
	
		// get list from API, ref: http://bit.ly/1gkUW4E
		$http.get(Setup.api + '/pagetype/list/allowed')
			.then(function(res){
				// set data for factory
				pageType.data = res.data;
				return pageType.data;
			})
			.then(callback);
	}
	
	// retrieve allowed pagetypes
	pageType.list = function(callback){
	
		// get list from API, ref: http://bit.ly/1gkUW4E
		$http.get(Setup.api + '/pagetype/list/all')
			.then(function(res){
			
				// set data for factory
				pageType.data = res.data;
				return pageType.data;
				
			})
			.then(callback);
	}
	
	// get the index by id
	pageType.getIndexById = function(id){
	
		var data = pageType.data;
		
		for(x=0; x<data.length; x++){
			
			if(data[x].PageTypeId == id){
				return x;
			}
			
		}
		
		return -1;
	}
	
	return pageType;
	
})

// page factory
.factory('Page', function($http, Setup){
	
	var page = {};
	page.data = [];
	
	// retrieve allowed pages
	page.listAllowed = function(callback){
	
		// post to API
		$http.get(Setup.api + '/page/list/allowed')
			.then(function(res){
				// set data for factory
				page.data = res.data;
				return page.data;
			})
			.then(callback);
	}
	
	// retrieve all pages
	page.list = function(callback){
	
		// post to API
		$http.get(Setup.api + '/page/list/all')
			.then(function(res){
				// set data for factory
				page.data = res.data;
				return page.data;
			})
			.then(callback);
	}
	
	// retrieve page
	page.retrieve = function(pageId, callback){
	
		// set params
		var params = {pageId: pageId};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
			
		// post to API
		$http.post(Setup.api + '/page/retrieve/', $.param(params))
			.success(callback);
			
	}
	
	// retrieve page
	page.retrieveExtended = function(pageId, offset, callback){
	
		// set params
		var params = {pageId: pageId};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
			
		// post to API
		$http.post(Setup.api + '/page/retrieve/', $.param(params))
			.then(function(res){
			
				var result = res.data;
			
				// get dates and locations
				result.LocalBeginDate = utilities.convertToLocalDate(result.BeginDate, offset);
				result.LocalBeginTime = utilities.convertToLocalTime(result.BeginDate, offset);
				result.LocalEndDate = utilities.convertToLocalDate(result.EndDate, offset);
				result.LocalEndTime = utilities.convertToLocalTime(result.EndDate, offset);
				result.Latitude = utilities.parseLatitude(result.LatLong);
				result.Longitude = utilities.parseLongitude(result.LatLong);
				
				return result;
			})
			.then(callback);
			
	}
	
	// retrieve content for a page
	page.retrieveContent = function(pageId, callback){
	
		// set params
		var params = {pageId: pageId};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
			
		// post to API
		$http.post(Setup.api + '/page/retrieve/content/', $.param(params))
			.success(callback);
	}
	
	// save content
	page.saveContent = function(pageId, content, image, status, callback){
		
		// set params
		var params = {pageId: pageId, content: content, status: status, image:image};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/page/content/save', $.param(params))
			.success(callback);
		
	}
	
	// save settings
	page.saveSettings = function(pageId, name, friendlyId, description, keywords, callout, layout, stylesheet, 
									beginDate, endDate, location, latitude, longitude, callback){
		
		// set params
		var params = {pageId: pageId, name: name, friendlyId: friendlyId, description: description, keywords: keywords, 
				   		callout: callout,  layout: layout, stylesheet: stylesheet,
				   		beginDate: beginDate, endDate: endDate,
				   		location: location, latitude: latitude, longitude: longitude};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		message.showMessage('progress');

		// post to API
		$http.post(Setup.api + '/page/save', $.param(params))
			.then(function(res){
				message.showMessage('success');
				return res.data;
			})
			.then(callback);
		
	}
	
	// edits tags
	page.editTags = function(toBeEdited, successCallback, failureCallback){
	
		// set params
		var params = {
			pageId: toBeEdited.PageId, 
			tags: toBeEdited.Tags};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/page/edit/tags', $.param(params))
			.success(successCallback)
			.error(failureCallback);
			
	}
	
	// add page
	page.add = function(pageTypeId, toBeAdded, successCallback, failureCallback){
	
		// set params
		var params = {
			pageTypeId: pageTypeId, 
			name: toBeAdded.Name, 
			friendlyId: toBeAdded.FriendlyId, 
			description: toBeAdded.Description};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/page/add', $.param(params))
			.then(function(res){
				page.data.push(res.data);
				
				console.log(page.data);
				return;
			}, failureCallback)
			.then(successCallback);
			
	}
	
	// remove page
	page.remove = function(toBeRemoved, successCallback, failureCallback){
		
		// set params
		var params = {
			pageId: toBeRemoved.PageId};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/page/remove', $.param(params))
			.then(function(res){
				var i = page.getIndexById(toBeRemoved.PageId);
				if(i !== -1)page.data.splice(i, 1);
				
				return;
			}, failureCallback)
			.then(successCallback);
		
	}
	
	// toggle published
	page.togglePublished = function(toBeEdited, successCallback, failureCallback){
		
		// set params
		var params = {
			pageId: toBeEdited.PageId};
						
		var url = Setup.api + '/page/publish'
		
		if(toBeEdited.IsActive == 1){
			url = Setup.api + '/page/unpublish'
		}
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(url, $.param(params))
			.then(function(res){
				
				if(toBeEdited.IsActive == 1){
					toBeEdited.IsActive = 0;
				}
				else{
					toBeEdited.IsActive = 1;
				}
				
				return;
			}, failureCallback)
			.then(successCallback);
		
	}
	
	// generates a preview for a page
	page.preview = function(pageId, content, callback){
	
		// set params
		var params = {pageId: pageId, content: content};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
			
		// post to API
		$http.post(Setup.api + '/page/content/preview', $.param(params))
			.success(callback);
	}
	
	// get the index by id
	page.getIndexById = function(id){
	
		var data = page.data;
		
		for(x=0; x<data.length; x++){
			
			if(data[x].PageId == id){
				return x;
			}
			
		}
		
		return -1;
	}
	
	return page;
	
})

// menutype factory
.factory('MenuType', function($http, Setup){
	
	// init
	var menuType = {};
	menuType.data = [];
	
	// add a menutype
	menuType.add = function(toBeAdded){
		
		// set menutype
		var params = {
			friendlyId: toBeAdded.FriendlyId,
			name: toBeAdded.Name};
		
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/menutype/add', $.param(params))
			.then(function(res){
				
				// push data to factory
				menuType.data.push(res.data);
				
			});
	}
	
	// removes a menutype
	menuType.remove = function(toBeRemoved, callback){
	
		// set params
		var params = {
			menuTypeId: toBeRemoved.MenuTypeId
			};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/menutype/remove', $.param(params))
			.then(function(res){
				
				var i = menuType.getIndexById(toBeRemoved.MenuTypeId);
				if(i !== -1)menuType.data.splice(i, 1);
				
				return;
			})
			.then(callback);
	}
	
	// retrieve allowed menutypes
	menuType.list = function(callback){
	
		// get list from API, ref: http://bit.ly/1gkUW4E
		$http.get(Setup.api + '/menutype/list')
			.then(function(res){
			
				// set data for factory
				menuType.data = res.data;
				return menuType.data;
				
			})
			.then(callback);
	}
	
	// get the index by id
	menuType.getIndexById = function(id){
	
		var data = menuType.data;
		
		for(x=0; x<data.length; x++){
			
			if(data[x].MenuTypeId == id){
				return x;
			}
			
		}
		
		return -1;
	}
	
	return menuType;
	
})

// menuitem factory
.factory('MenuItem', function($http, Setup){
	
	// init
	var menuItem = {};
	menuItem.data = [];
	
	// add a menuitem
	menuItem.add = function(toBeAdded){
		
		// set params
		var params = {
			name: toBeAdded.Name,
			cssClass: toBeAdded.CssClass,
			type: toBeAdded.Type,
			url: toBeAdded.Url,
			pageId: toBeAdded.PageId,
			priority: toBeAdded.Priority};
		
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/menuitem/add', $.param(params))
			.then(function(res){
				
				// push data to factory
				menuItem.data.push(res.data);
				
			});
	}
	
	// edits a menuitem
	menuItem.edit = function(toBeEdited, callback){
		
		// set params
		var params = {
			menuItemId: toBeEdited.MenuItemId,
			name: toBeEdited.Name,
			cssClass: toBeEdited.CssClass,
			url: toBeEdited.Url,
			pageId: toBeEdited.PageId};
		
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/menuitem/edit', $.param(params))
			.success(callback);
	}
	
	// removes a menuitem
	menuItem.remove = function(toBeRemoved, callback){
	
		// set params
		var params = {
			menuItemId: toBeRemoved.MenuItemId
			};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/menuitem/remove', $.param(params))
			.then(function(res){
				
				var i = menuItem.getIndexById(toBeRemoved.MenuItemId);
				if(i !== -1)menuItem.data.splice(i, 1);
				
				return;
			})
			.then(callback);
	}
	
	// toggles whether a menuItem is nested
	menuItem.toggleNested = function(toBeEdited, callback){
	
		// toggle isNested
		if(toBeEdited.IsNested == 1){
			isNested = 0;
		}
		else{
			isNested = 1;
		}
	
		// set params
		var params = {
			menuItemId: toBeEdited.MenuItemId,
			isNested: isNested
			};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/menuitem/toggle/nested', $.param(params))
			.then(function(res){
				
				toBeEdited.IsNested = isNested;
				
				return;
			})
			.then(callback);
	}
	
	// retrieve all menu items
	menuItem.list = function(callback){
	
		// get list from API
		$http.get(Setup.api + '/menuitem/list/all')
			.then(function(res){
			
				// set data for factory
				menuItem.data = res.data;
				return menuItem.data;
				
			})
			.then(callback);
	}
	
	// sets the order for a menu item
	menuItem.setPriority = function(menuItemId, priority){
		
		var i = menuItem.getIndexById(menuItemId);
		menuItem.data[i].Priority = priority;
		
	}
	
	// saves the priority for menu items
	menuItem.savePriorities = function(priorities, callback){
	
		// set params
		var params = {
			priorities: JSON.stringify(priorities)
			};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/menuitem/save/priorities', $.param(params))
			.success(callback);
	}
	
	// publishes the menu items for the site
	menuItem.publish = function(callback){
	
		// set params
		var params = {};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/menuitem/publish', $.param(params))
			.success(callback);
	}
	
	// get the index by id
	menuItem.getIndexById = function(id){
	
		var data = menuItem.data;
		
		for(x=0; x<data.length; x++){
			
			if(data[x].MenuItemId == id){
				return x;
			}
			
		}
		
		return -1;
	}
	
	return menuItem;
	
})

// stylesheets factory
.factory('Stylesheet', function($http, Setup){
	
	var stylesheet = {};
	stylesheet.data = [];
	
	// retrieve layouts
	stylesheet.list = function(callback){
	
		// post to API
		$http.get(Setup.api + '/stylesheet/list')
			.then(function(res){
			
				// set data for factory
				stylesheet.data = res.data;
				return stylesheet.data;
				
			})
			.then(callback);
	}
	
	// retrieves content for a stylesheet
	stylesheet.retrieve = function(name, callback){
	
		// set params
		var params = {name: name};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/stylesheet/retrieve', $.param(params))
			.success(callback);
	}
	
	// add a stylesheet
	stylesheet.add = function(toBeAdded, callback){
		
		// set params
		var params = {
			name: toBeAdded};
		
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/stylesheet/add', $.param(params))
			.then(function(res){
				
				// push data to factory
				stylesheet.data.push(toBeAdded);
				
			})
			.then(callback);
	}
	
	// publishes a stylesheet
	stylesheet.publish = function(name, content, callback){
		
		// set params
		var params = {
			name: name,
			content: content};
		
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/stylesheet/publish', $.param(params))
			.success(callback);
	}
	
	// removes a stylesheet
	stylesheet.remove = function(toBeRemoved, callback){
	
		// set params
		var params = {
			name: toBeRemoved
			};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/stylesheet/remove', $.param(params))
			.then(function(res){
				
				var i = stylesheet.getIndexById(toBeRemoved);
				if(i !== -1)stylesheet.data.splice(i, 1);
				
				return;
			})
			.then(callback);
	}
	
	// get the index by id
	stylesheet.getIndexById = function(id){
	
		var data = layout.data;
		
		for(x=0; x<data.length; x++){
			
			if(data[x] == id){
				return x;
			}
			
		}
		
		return -1;
	}
	
	return stylesheet;
	
})


// layouts factory
.factory('Layout', function($http, Setup){
	
	var layout = {};
	layout.data = [];
	
	// retrieve layouts
	layout.list = function(callback){
	
		// post to API
		$http.get(Setup.api + '/layout/list')
			.then(function(res){
			
				// set data for factory
				layout.data = res.data;
				return layout.data;
				
			})
			.then(callback);
	}
	
	// retrieves content for a layout
	layout.retrieve = function(name, callback){
	
		// set params
		var params = {name: name};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/layout/retrieve', $.param(params))
			.success(callback);
	}
	
	// add a layout
	layout.add = function(toBeAdded, callback){
		
		// set params
		var params = {
			name: toBeAdded};
		
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/layout/add', $.param(params))
			.then(function(res){
				
				// push data to factory
				layout.data.push(toBeAdded);
				
			})
			.then(callback);
	}
	
	// publishes a layout
	layout.publish = function(name, content, callback){
		
		// set params
		var params = {
			name: name,
			content: content};
		
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/layout/publish', $.param(params))
			.success(callback);
	}
	
	// removes a menuitem
	layout.remove = function(toBeRemoved, callback){
	
		// set params
		var params = {
			name: toBeRemoved
			};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/layout/remove', $.param(params))
			.then(function(res){
				
				var i = layout.getIndexById(toBeRemoved);
				if(i !== -1)layout.data.splice(i, 1);
				
				return;
			})
			.then(callback);
	}
	
	// get the index by id
	layout.getIndexById = function(id){
	
		var data = layout.data;
		
		for(x=0; x<data.length; x++){
			
			if(data[x] == id){
				return x;
			}
			
		}
		
		return -1;
	}
	
	return layout;
	
})

// themes factory
.factory('Theme', function($http, Setup){
	
	var theme = {};
	
	// retrieve themes
	theme.list = function(callback){
	
		// post to API
		$http.get(Setup.api + '/theme')
			.success(callback);
	}
	
	// retrieve pages for theme
	theme.listPages = function(callback){
	
		// post to API
		$http.get(Setup.api + '/theme/pages/list')
			.success(callback);
	}
	
	// applies a theme
	theme.apply = function(theme, callback){
	
		// set params
		var params = {
			theme: theme
			};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/theme/apply', $.param(params))
			.success(callback);
	}
	
	// resets a theme
	theme.reset = function(theme, callback){
	
		// set params
		var params = {
			theme: theme
			};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/theme/reset', $.param(params))
			.success(callback);
	}
	
	return theme;
	
})

// editor factory
.factory('Editor', function($http, Setup){
	
	var editor = {};
	
	// retrieve editor menu
	editor.list = function(callback){
	
		// post to API
		$http.get('data/editor.json?')
			.success(callback);
	}
	
	return editor;
	
})

// languages factory
.factory('Language', function($http, Setup){
	
	var language = {};
	
	// retrieve languages
	language.list = function(callback){
	
		// post to API
		$http.get('data/languages.json')
			.success(callback);
	}
	
	return language;
	
})

// currencies factory
.factory('Currency', function($http, Setup){
	
	var currency = {};
	
	// retrieve currencies
	currency.list = function(callback){
	
		// post to API
		$http.get('data/currencies.json')
			.success(callback);
	}
	
	return currency;
	
})

// images factory
.factory('Image', function($http, Setup){
	
	var image = {};
	image.data = [];
	image.updates = [];
	
	// retrieve images
	image.list = function(callback){
	
		// post to API
		$http.get(Setup.api + '/image/list/all')
			.then(function(res){
				// set data for factory
				image.data = res.data;
				return image.data;
			})
			.then(callback);
	}
	
	return image;
	
})

// icons factory
.factory('Icon', function($http, Setup){
	
	var icon = {};
	
	// retrieve icons
	icon.list = function(callback){
	
		// post to API
		$http.get('data/icons.json')
			.success(callback);
	}
	
	return icon;
	
})

// files factory
.factory('File', function($http, Setup){
	
	var file = {};
	file.data = [];
	
	// retrieve files
	file.list = function(callback){
	
		// post to API
		$http.get(Setup.api + '/file/list')
			.then(function(res){
				// set data for factory
				file.data = res.data;
				return file.data;
			})
			.then(callback);
	}
	
	// remove file
	file.remove = function(toBeRemoved, callback){
	
		// set params
		var params = {
				filename: toBeRemoved.filename
			};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/file/remove', $.param(params))
			.then(function(res){
				
				var i = file.getIndexByFilename(toBeRemoved.filename);
				if(i !== -1)file.data.splice(i, 1);
				
				return;
			})
			.then(callback);
	}
	
	// get the index by id
	file.getIndexByFilename = function(filename){
	
		var data = file.data;
		
		for(x=0; x<data.length; x++){
			
			if(data[x].filename == filename){
				return x;
			}
			
		}
		
		return -1;
	}
	
	
	return file;
	
})

// translation factory
.factory('Translation', function($http, Setup){
	
	var translation = {};
	translation.data = [];
	
	// retrieve default translation for site
	translation.retrieve = function(callback){
	
		// post to API
		$http.get(Setup.api + '/translation/retrieve')
			.then(function(res){
				// set data for factory
				translation.data = res.data;
				return translation.data;
			})
			.then(callback);
	}
	
	// clears translations for a page
	translation.clear = function(pageId){
		
		// clear translations
		translation.data[pageId] = {};
		
	}
	
	// adds a translation
	translation.add = function(pageId, key, value){
		
		// create page namespace if null
		if(translation.data[pageId] == null){
			translation.data[pageId] = {};
		}
	
		// add translation 
		translation.data[pageId][key] = value;	
	}
	
	// saves a translation
	translation.save = function(callback){
		
		// stringify the translation object
		var content = JSON.stringify(translation.data);
		
		// set params
		var params = {content: content};
			
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post to API
		$http.post(Setup.api + '/translation/save', $.param(params))
			.success(callback);
		
	}	
	
	return translation;	
})
;