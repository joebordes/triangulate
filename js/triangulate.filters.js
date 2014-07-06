angular.module('triangulate.filters', [])

.filter('notags', function() {
    return function(text) {
    
    	if(text === '' || text === null)return 'No tags';
    	else return text;
      
	}
})

.filter('fromNow', function() {
    return function(text) {
    	var st = moment.utc(text, 'YYYY-MM-DD HH:mm:ss');
		return st.fromNow();
	}
});
