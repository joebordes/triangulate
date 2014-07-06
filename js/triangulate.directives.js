angular.module('triangulate.directives', [])

.directive('triangulateValidateSiteId', function(Site) {
    return {
        // attribute
        restrict: 'A',
       
        link: function(scope, element, attrs) {
        
        	element.bind('blur', function(){
        	
        		$el = $(this);
        		
        		$validating = $el.parent().find('.triangulate-validating');
        		$valid = $el.parent().find('.triangulate-valid');
        		$invalid = $el.parent().find('.triangulate-invalid');
        		
	        	$validating.show();
	        	$valid.hide();
	        	$invalid.hide();
	       
				var name = $el.val();
				var friendlyId = $el.attr('data-id');
				
				if(name == ''){
					$validating.hide();
					$invalid.show();
					return;
				}
				
				// validate id
				Site.validateFriendlyId(friendlyId, 
					function(data){ // success
						$validating.hide();
						$valid.show();
					},
					function(data){ // failure
						$validating.hide();
						$invalid.show();
					});
					        	
	        	
        	}); 	
          
        }
    };
})

.directive('triangulateValidateSiteEmail', function(Site) {
    return {
        // attribute
        restrict: 'A',
       
        link: function(scope, element, attrs) {
        
        	element.bind('blur', function(){
        	
        		$el = $(this);
        		
        		$validating = $el.parent().find('.triangulate-validating');
        		$valid = $el.parent().find('.triangulate-valid');
        		$invalid = $el.parent().find('.triangulate-invalid');
        		
	        	$validating.show();
	        	$valid.hide();
	        	$invalid.hide();
	       
				var email = $el.val();
				
				if(email == ''){
					$validating.hide();
					$invalid.show();
					return;
				}
				
				// validate id
				Site.validateEmail(email, 
					function(data){ // success
						$validating.hide();
						$valid.show();
					},
					function(data){ // failure
						$validating.hide();
						$invalid.show();
					});
					        	
	        	
        	}); 	
          
        }
    };
})

.directive('triangulateCreateId', function() {
    return {
        // attribute
        restrict: 'A',
       
        link: function(scope, element, attrs) {
        
        	element.bind('keyup', function(){
        	
        		$el = $(this);
        		
        		var keyed = $el.val().toLowerCase().replace(/[^a-zA-Z 0-9]+/g,'').replace(/\s/g, '-');
				keyed = keyed.substring(0,25);
				
	        	scope.$apply(function() {
		          scope.friendlyId = keyed;
		        });
	        	
        	});  	
          
        }
    };
})

.directive('triangulateValidatePasscode', function(Setup) {
    return {
        // attribute
        restrict: 'A',
       
        link: function(scope, element, attrs) {
        
        	element.bind('blur', function(){
        	
        		$el = $(this);
        		
        		$validating = $el.parent().find('.triangulate-validating');
        		$valid = $el.parent().find('.triangulate-valid');
        		$invalid = $el.parent().find('.triangulate-invalid');
        		
	        	$validating.show();
	        	$valid.hide();
	        	$invalid.hide();
	       
				var passcode = $el.val();
				
				if(passcode !== Setup.passcode){
					$validating.hide();
					$invalid.show();
					return;
				}
				else{
					$validating.hide();
					$valid.show();
				}
					        	
	        	
        	}); 	
          
        }
    };
})

.directive('dropZone', function(Image, Setup) {
  	return function(scope, element, attrs) {
 
	  	Dropzone.autoDiscover = false;
 
	  	$(element).dropzone({ 
            url: Setup.api + '/file/post',
            headers: { 'Authorization': 'Bearer ' + window.sessionStorage.token},
            clickable: true,
            sending: function(file, xhr, formData){
            
				if(attrs.filename != '' && attrs.filename != null){
				  formData.append('overwrite', attrs.filename);
				}
				
				$(element).find('.dz-message').hide();
				
				return true;
	            
            },
            success: function(file, response){
                var image = response;
                
                if(attrs.target == 'editor'){

	                // call method to update list
	                scope.$apply(attrs.callback);
	                
	                // call method to add image
	                scope.$apply('addImage(image)');
                }
                else if(attrs.target == 'branding'){
                
	                // call method to update list
	                scope.$apply(attrs.callback);
	                
	                scope.image = response;
	                
	                // call method to add image
	                scope.$apply('addImage(image)');
                }
                else if(attrs.target == 'profile'){
                
	                // call method to update list
	                scope.$apply(attrs.callback);
	                
	                scope.image = response;
	                
	                // call method to add image
	                scope.$apply('addImage(image)');
                }
                else{
	                // call method to update list
	                scope.$apply(attrs.callback);
                }
            }
            
        });
	  	
		
	}
});
