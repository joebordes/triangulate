angular.module('triangulate.site.controllers', [])

// app controller
.controller('PageCtrl', function($scope, $state, $location, $rootScope, pageMeta, Site) {

	// set user
	$scope.user = $rootScope.user;
	
	// redirect if user is not logged in
	if(pageMeta.IsSecure == true && $scope.user == null){
		
		console.log('[triangulate.message] page requires login, user not logged in');
			
		$state.go('login');
		
	}
	else if(pageMeta.IsSecure == true && $scope.user != null){	// check if the user is allowed to view the site
		
		var isAllowed = false;
		
		// users with All can view the page
		if($rootScope.user.CanView == 'All'){
			console.log('[triangulate.message] valid permissions');
			isAllowed = true;
		}
		else if($rootScope.user.CanView.indexOf(pageMeta.PageTypeId) != -1){
			console.log('[triangulate.message] valid permissions');
			isAllowed = true;
		}
		
		if(isAllowed == false){
			console.log('[triangulate.message] invalid permissions');
			$state.go('login');
		}
		else{
			console.log('[triangulate.message] valid permissions');
		}
		
	}
	
	// set page variables from route meta
	var page = {
		PageId: pageMeta.PageId,
		Url: pageMeta.Url,
		FriendlyId: pageMeta.FriendlyId,
		Name: pageMeta.Name,
		Description: pageMeta.Description,
		Keywords: pageMeta.Keywords,
		Callout: pageMeta.Callout,
		BeginDate: pageMeta.BeginDate,
		EndDate: pageMeta.EndDate,
		Location: pageMeta.Location,
		LatLong: pageMeta.LatLong,
		Layout: pageMeta.Layout,
		Stylesheet: pageMeta.Stylesheet,
		FullStylesheetUrl: pageMeta.FullStylesheetUrl,
		Image: pageMeta.Image,
		LastModifiedDate: pageMeta.LastModifiedDate,
		FirstName: pageMeta.FirstName,
		LastName: pageMeta.LastName,
		PhotoUrl: pageMeta.PhotoUrl
	}
	
	// set page to $scope and $rootScope
	$scope.page = page
	$rootScope.page = page;
		
	// retrieve site
	Site.retrieve(function(data){
	
		// set site to $scope and $rootScope
		$scope.site = data;
		$rootScope.site = data;
		
	});
	
	// toggle settings
	$scope.toggleSettings = function(){
		$('body').toggleClass('show-settings');
	}
	
	// toggle cart
	$scope.toggleCart = function(){
		$('body').toggleClass('show-cart');
	}

});