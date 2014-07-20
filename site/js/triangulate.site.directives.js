angular.module('triangulate.site.directives', [])

// menu
.directive('triangulateMenu', function($rootScope, Menu){
	
	return{
		
		restrict: 'E',
		scope: {
			type: '@'
		},
		replace: true,
		templateUrl: 'templates/triangulate/menu.html',
		link: function(scope, element, attr){
		
			scope.currentPageId = $rootScope.page.PageId;
			
			Menu.list(scope.type, function(data){
			
				console.log('[triangulate.debug] Menu.list');
				console.log(data);
				
				scope.menuItems = data;
			});
			
		}
		
	}
	
})

// search
.directive('triangulateSearch', function($rootScope, $i18next, Translation){
	
	return{
		
		restrict: 'E',
		scope: {
			type: '@'
		},
		replace: true,
		templateUrl: 'templates/triangulate/search.html',
		link: function(scope, element, attr){
		
			scope.currentPageId = $rootScope.page.PageId;
			scope.term = '';
			scope.showResults = false;
			scope.searching = false;
			scope.noResults = false;
			
			// hide search when the body is clicked
			$('body').on('click', function(){
			
				// open up the dialog
				$(element).removeClass('open');
				
			});
			
			// searches the translation files for the term, returns pages that have them
			scope.search = function(){
			
				scope.searching = true;
				
				// open up the dialog
				$(element).addClass('open');
				
				var locale = $i18next.options.lng;
				
				// clear out results
				scope.results = [];
				
				// search translations for the string
				Translation.search(scope.term, locale, function(data){
					
					scope.searching = false;
					scope.results = data;
					
				});
				
				return false;
				
			}
		}
		
	}
	
})

// map
.directive('triangulateMap', function(Menu){
	
	return{
		
		restrict: 'E',
		scope: {
			address: '@',
			id: '@',		
		},
		templateUrl: 'templates/triangulate/map.html',
		link: function(scope, element, attr){

			new triangulate.Map({
				el: $(element),
				id: scope.id,
				address: scope.address
			});
			
		}
		
	}
	
})

// add point to map
.directive('triangulateAddPoint', function(Menu, $state){
	
	return{
		
		restrict: 'A',
		link: function(scope, element, attr){
		
			var name = attr.name;
			var location = attr.location;
			var description = attr.description;
			var url = $state.href(attr.url);	// conver URL to href
			var latLong = attr.latLong;
			var mapId = attr.mapId;
			var latitude = null;
			var longitude = null;
			
			// get latitude and longitude
			if(latLong != null){

				var point = latLong.replace('POINT(', '').replace(')', '');
				var arr = point.split(' ');

				// set latitude and longitude
				latitude = arr[0];
				longitude = arr[1];
			}
			
	
			if(latitude != null && longitude != null){
			
				// create content for map
				var content = '<div class="map-marker-content content">' +
									'<h4><a href="' + url + '">' + name + '</a></h4>' +
									'<h5>' + location + '</h5>' +
									'<p>' + description + '</p>' +
									'</div>';
				
				// add point
				triangulate.Map.CreatePoint(mapId, latitude, longitude, content);
				
			}
				
			
		}
		
	}
	
})

// calendar
.directive('triangulateCalendar', function(Menu){
	
	return{
		
		restrict: 'E',
		scope: {
			id: '@',		
		},
		templateUrl: 'templates/triangulate/calendar.html',
		link: function(scope, element, attr){

			new triangulate.Calendar({
				el: $(element).find('.triangulate-calendar').get(0),
				weeks: 2
			});
			
		}
		
	}
	
})

// map
.directive('triangulateAddEvent', function(Menu, $state){
	
	return{
		
		restrict: 'A',
		link: function(scope, element, attr){
		
			var name = attr.name;
			var location = attr.location;
			var description = attr.description;
			var url = $state.href(attr.url);	// conver URL to href
			var beginDate = attr.beginDate;
			var endDate = attr.endDate;
			var calendarId = attr.calendarId;
		
			if(beginDate != null && endDate != null){
			
				// create begin and end from moment
				var m_begin = moment(beginDate, "YYYY-MM-DD HH:mm:ss");
				var m_end = moment(endDate, "YYYY-MM-DD HH:mm:ss");
			
				// create time display
				var time = m_begin.format('h:mm a') + ' - ' + m_end.format('h:mm a');
			
				// create content for event
				var content = '<div class="event content">' +
										'<h4><a href="' + url + '">' + name + '</a></h4>' +
										'<h5>' + time + '</h5>' +
										'<p>' + description + '</p>' +
										'</div>';
				
				// add even to the calendar
				triangulate.Calendar.AddEvent(calendarId, beginDate, endDate, content);
			}
				
		}
		
	}
	
})

// content
.directive('triangulateContent', function(Menu){
	
	return{
		
		restrict: 'E',
		scope: {
			url: '@'
		},
		templateUrl: 'templates/triangulate/content.html',
		link: function(scope, element, attr){
		
			// set pageId in scope
			scope.page = scope.$parent.page;
			scope.site = scope.$parent.site;
			
			var replaced = scope.url.replace('/', '.');
			
			// show preview
			if(document.URL.indexOf('?preview') != -1 && (scope.pageUrl == scope.url)){
				scope.templateUrl = 'templates/preview/' + replaced + '.html';	
			}
			else{
				scope.templateUrl = 'templates/page/' + replaced + '.html';
			}
			
			
		}
		
	}
	
})

// list
.directive('triangulateList', function(Page){
	
	return{
		
		restrict: 'E',
		scope: {
			url: '@',
			id: '@'
		},
		templateUrl: function(element, attr){
			return 'templates/triangulate/' + attr.display + '.html';
		},
		link: function(scope, element, attr){
		
			// get inputs from attributes
			var type = attr.type;
			var pagesize = attr.pagesize;
			var current = 0;
			var orderby = attr.orderby;
			
			// list page
			Page.list(type, pagesize, current, orderby, 
				function(data){  // success
			
					console.log('[triangulate.debug] Page.list');
					console.log(data);
					
					scope.pages = data;
					
				},
				function(){ // failure
					
					
				});
			
		}
		
	}
	
})

// form
.directive('triangulateForm', function($rootScope, Form){
	
	return{
		
		restrict: 'E',
		scope: {
			id: '@',
			cssClass: '@',
			type: '@',
			action: '@',
			success: '@',
			error: '@',
			submit: '@'
		},
		transclude: true,
		templateUrl: 'templates/triangulate/form.html',
		link: function(scope, element, attr){
		
			// setup temporary model
			scope.temp = {
				firstName: ''
			};
		
			// set loading
			scope.showLoading = false;
			scope.showSuccess = false;
			scope.showError = false;		
			
			// handles the form submission
			scope.submitForm = function(temp){
			
				// get reference to fields
				var el = $(element).find('.triangulate-form-fields');
				
				// get fields scope
				var fscope = angular.element($(el)).scope();
				
				// holds the params from the form
				var params = {};
				
				for(key in fscope.temp){
				
					// everything besides checkboxes should be strings
					if(typeof(fscope.temp[key]) === 'string'){
						params[key] = fscope.temp[key];
					}
					else{ // special handling for checkbox`	
						var str = '';
						var obj = fscope.temp[key]
						
						// build comma separated list of values
						for(skey in obj){
						
							// the false value of the checkbox is blank ('')
							if(obj[skey] != ''){
								str += obj[skey] + ',';
							}
						
						}
						
						// set to key, remove trailing comma
						params[key] = str.replace(/,\s*$/, '');;
					}
				
				}
				
				// submit form
				Form.submit($rootScope.page.PageId, params, 
					function(data){  // success
						scope.showLoading = false;
						scope.showSuccess = true;
						scope.showError = false;
						
					},
					function(){ // failure
						scope.showLoading = false;
						scope.showSuccess = false;
						scope.showError = true;
					});
				
			}
			
		}
		
	}
	
})

// form
.directive('triangulateSlideshow', function($rootScope){
	
	return{
		
		restrict: 'E',
		scope: {
			id: '@'
		},
		templateUrl: 'templates/triangulate/slideshow.html',
		transclude: true,
		link: function(scope, element, attr){

			// setup slideshow
			$el = $(element);
	
			$($el).find('.owl-carousel').owlCarousel({
				autoPlay : 3000,
			    stopOnHover : true,
			    navigation:true,
			    paginationSpeed : 1000,
			    goToFirstSpeed : 2000,
			    singleItem : true,
			    autoHeight : true,
			    transitionStyle:"fade"
			});
			
		
		}
		
	}
	
})

// login
.directive('triangulateLogin', function($rootScope, $window, $state, User){
	
	return{
		
		restrict: 'E',
		scope: {
			id: '@',
			class: '@',
			success: '@',
			error: '@',
			button: '@'
		},
		transclude: true,
		templateUrl: 'templates/triangulate/login.html',
		link: function(scope, element, attr){
		 
			// setup user
			scope.toLogin = {
				Email: '',
				Password: ''
			}
			
			// set loading
			scope.showLoading = false;
			scope.showSuccess = false;
			scope.showError = false;
			
			// handle logged in user
			scope.loggedIn = false;
			scope.user = User.retrieve();
			
			if(scope.user != null){
				scope.loggedIn = true;
			}
			
			// login user
			scope.login = function(toLogin){
				
				// set status
				scope.loading = true;
				scope.showSuccess = false;
				scope.showError = false;
				
				// login user
				User.login(toLogin.Email, toLogin.Password, 
					function(data){		// success
					
						// set logged in user
						scope.user = User.retrieve();
						
						if(scope.user != null){
							scope.loggedIn = true;
						}
						
						// set status
						scope.showLoading = false;
						scope.showError = false;
						scope.showSuccess = true;
						
						
					},
					function(){		// failure
					
						// set status
						scope.showLoading = false;
						scope.showSuccess = false;
						scope.showError = true;
						
					});
				
			}
			
			// logout user
			scope.logout = function(){
				
				User.logout();
				scope.loggedIn = false;
				
			}
			
		}
		
	}
	
})

// registration
.directive('triangulateRegistration', function($rootScope, User){
	
	return{
		
		restrict: 'E',
		scope: {
			id: '@',
			class: '@',
			success: '@',
			error: '@',
			required: '@',
			button: '@'
		},
		transclude: true,
		templateUrl: 'templates/triangulate/registration.html',
		link: function(scope, element, attr){
	
			// setup user
			scope.user = {
				FirstName: '',
				LastName: '',
				Email: '',
				Password: ''
			}
			
			// set loading
			scope.showLoading = false;
			scope.showSuccess = false;
			scope.showError = false;
			scope.showRequired = false;
			
			// register user
			scope.register = function(user){
				
				// set status
				scope.loading = true;
				scope.showSuccess = false;
				scope.showError = false;
				
				// login user
				User.add(user, $rootScope.site.SiteId,
					function(data){		// success
						
						// set status
						scope.showLoading = false;
						scope.showError = false;
						scope.showSuccess = true;
					},
					function(){		// failure
					
						// set status
						scope.showLoading = false;
						scope.showSuccess = false;
						scope.showError = true;
					});
				
			}
			
			
		}
		
	}
	
})

// welcome
.directive('triangulateWelcome', function(User){
	
	return{
		
		restrict: 'E',
		scope: {},
		templateUrl: 'templates/triangulate/welcome.html',
		link: function(scope, element, attr){
	
			scope.loggedIn = false;
			scope.user = User.retrieve();
			
			if(scope.user != null){
				scope.loggedIn = true;
			}
			
			// logs a user out
			scope.logout = function(){
				User.logout();
				scope.loggedIn = false;
			}
			
		}
		
	}
	
})

// welcome
.directive('triangulateSelectLanguage', function(User, Translation, $i18next){
	
	return{
		
		restrict: 'E',
		scope: {},
		templateUrl: 'templates/triangulate/select-language.html',
		link: function(scope, element, attr){
		
			scope.language = $i18next.options.lng;
			
			// list locales for the site
			Translation.listLocales(function(data){
				
				scope.locales = data;
				
				console.log('[triangulate.debug] Translation.listLocales');
				console.log(scope.locales);
				
			});
			
			// sets the language
			scope.setLanguage = function(locale){
				// set language to locale specified
				$i18next.options.lng =  locale;
				
				scope.language = locale;
			}
		}
		
	}
	
})

// simple toggle
.directive('triangulateToggle', function($rootScope){
	
	return{
		
		restrict: 'A',
		scope: {},
		link: function(scope, element, attr){
	
			$(element).on('click', function(){
				
				$('body').toggleClass(attr.toggleClass); 
				
			});
			
		}
		
	}
	
})
;