/*
	Components for default triangulate CMS widgets
*/
var triangulate = triangulate || {};


// triangulate.Form
triangulate.Form = function(config){

	// set context for event
	var context = config.el;
	
	// hide spinner by default
	$(context).find('.icon-spinner').hide();
	
	// set required fields
	triangulate.Form.SetRequired(context);
	
	// handle click of button
	$(context).find('button').on('click', function(){
		
		var hasError = triangulate.Form.Validate(context, config);
		
		if(hasError == false){
			if (triangulate.Form.hasCaptcha(context)) {
				$('#recaptcha').removeClass('alert alert-danger');
				$(context).find('.icon-spinner').show();
				
				$.when($.ajax({
					url: config.api + '/form/checkCaptcha',
					type: 'POST',
					data: {siteId: config.siteId, pageId: config.pageId,
						recaptcha_challenge_field: $('#recaptcha_challenge_field').val(),
						recaptcha_response_field: $('#recaptcha_response_field').val()}
				}))
				.then(function (data, textStatus, jqXHR) {
					$(context).find('.icon-spinner').hide();
					if (data=='OK') {
						triangulate.Form.Process(context);
					} else {
						$(context).find('.alert-danger').show();
						$('#recaptcha').addClass('alert alert-danger').show();
					}
					Recaptcha.reload();
				});
				
			} else {
				triangulate.Form.Process(context, config);
			}
		}
		
		return false;
		
	});
	
}

// sets required fields for the form
triangulate.Form.SetRequired = function(el){
   
	var fields = $(el).find('div.form-group');
		
	for(var x=0; x<fields.length; x++){
		var req = $(fields[x]).attr('data-required');	
		
		var label = $(fields[x]).find('label:first');
		
		if(req=='true'){
			$(label).html('* '+$(label).html());
			$(fields[x]).addClass('required');
		}	
	}
   
}

// check if the current form has a reCaptcha field
triangulate.Form.hasCaptcha = function(el) {
	var hasCaptcha = false;
	var fields = $(el).find('div.form-group');
	var x=0;
	while (x<fields.length && !hasCaptcha) {
		hasCaptcha = ($(fields[x]).attr('data-type')=='recaptcha');
		x++;
	}
	return hasCaptcha;
}

// validates fields in the form
triangulate.Form.Validate = function(el, config){
	
	var siteId = config.siteId;
    var pageId = config.pageId;
	
	// build body
	var fields = $(el).find('div.form-group');

	var hasError = false;

	for(var x=0; x<fields.length; x++){
		var label = $(fields[x]).find('label').html();
		var label = (!label ? '' : label.replace('* ', ''));
		var text = '';
		
		var type = $(fields[x]).attr('data-type');
		var required = false;
		var req = $(fields[x]).attr('data-required');
		if(req){
			if(req=='true')required = true;
		}
		
		if(type=='text'){
			text = $.trim($(fields[x]).find('input[type=text]').val());
			
			if(required==true && text==''){
				hasError = true;
				$(fields[x]).addClass('error');
			}
			else{
				$(fields[x]).removeClass('error');
			}
		}
		else if(type=='textarea'){
			text = $.trim($(fields[x]).find('textarea').val());
			
			if(required==true && text==''){
				hasError = true;
				$(fields[x]).addClass('error');
			}
			else{
				$(fields[x]).removeClass('error');
			}
	
		}
		else if(type=='select'){
			text = $(fields[x]).find('select').val();
			
			if(required==true && text==''){
				hasError = true;
				$(fields[x]).addClass('error');
			}
			else{
				$(fields[x]).removeClass('error');
			}
		}
		else if(type=='radiolist'){
			text = $(fields[x]).find('input[type=radio]:checked').val();
			
			if(text==undefined)text = '';
			
			if(required==true && text==''){
				hasError = true;
				$(fields[x]).addClass('error');
			}
			else{
				$(fields[x]).removeClass('error');
			}
			
		}
		else if(type=='checkboxlist'){
			var checkboxes = $(fields[x]).find('input[type=checkbox]:checked');
			
			for(var y=0; y<checkboxes.length; y++){
				text += '<span class="item">'+$(checkboxes[y]).val()+'</span>';
			}
			
			if(required==true && text==''){
				hasError = true;
				$(fields[x]).addClass('error');
			}
			else{
				$(fields[x]).removeClass('error');
			}
			
		}
	
	}
	
	if(hasError == true){
		$(el).find('.alert-danger').show();
	}

	return hasError;

	
}

// processes the form
triangulate.Form.Process = function(el, config){
	
	var siteId = config.siteId;
	var pageId = config.pageId;
	
	// build body
	var fields = $(el).find('div.form-group');
	
	var body = '<table>';
	var hasError = false;

	for(var x=0; x<fields.length; x++){
		var label = $(fields[x]).find('label').html();
		var label = (!label ? '' : label.replace('* ', ''));
		var text = '';
		
		var type = $(fields[x]).attr('data-type');
		
		if(type=='recaptcha') continue; // do not add recaptcha field to email

		var required = false;
		var req = $(fields[x]).attr('data-required');
		if(req){
			if(req=='true')required = true;
		}
		
		var span = '<span class="value">';
					
		if(type=='text'){
			text = $.trim($(fields[x]).find('input[type=text]').val());
			text = span+text+'</span>';
		}
		else if(type=='textarea'){
			text = $.trim($(fields[x]).find('textarea').val());
			text = span+text+'</span>';
		}
		else if(type=='select'){
			text = $(fields[x]).find('select').val();
			text = span+text+'</span>';
		}
		else if(type=='radiolist'){
			text = $(fields[x]).find('input[type=radio]:checked').val();
			
			if(text==undefined)text = '';
			text = span+text+'</span>';
		}
		else if(type=='checkboxlist'){
			var checkboxes = $(fields[x]).find('input[type=checkbox]:checked');
			
			for(var y=0; y<checkboxes.length; y++){
				text += '<span class="item">'+$(checkboxes[y]).val()+'</span>';
			}
			
			text = span+text+'</span>';
		}
	
		body += '<tr><td style="padding: 5px 25px 5px 0;">'+label+':</td><td style="padding: 5px 0">'+text+'</td></tr>';
	}
	
	body += '</table>'
	
	if(hasError == false){
	
        $(el).find('.icon-spinner').show();
        
        // post to API
        $.ajax({
            url: config.api + '/form',
			type: 'POST',
			data: {siteId: siteId, pageId: pageId, body: body},
			success: function(data){
			
                $(el).find('.error').removeClass('error');
    			
				$('div.formgroup input').val('');
				$('div.formgroup textarea').val('');
				$('div.formgroup select').val('');
				$('div.formgroup input[type=radio]').attr('checked', false);
				$('div.formgroup input[type=checkbox]').attr('checked', false);
				
				
				$(el).find('input').val('');
				$(el).find('select').val('');
				$(el).find('textarea').val('');
				$(el).find('.alert-danger').hide();
				$(el).find('.alert-success').show();
				$(el).find('.icon-spinner').hide();
			}
        });

	}
	else{
		$(el).find('.alert-danger').show();
	}
	
}

// triangulate.Map
triangulate.maps = [];

triangulate.Map = function(config){

	this.el = config.el;
	this.address = config.address;
	
	// get DOM id of map
	var mapId = config.id;
	
	//alert( $(this.el).html() );
	
	// create the map
	var mapOptions = {
      center: new google.maps.LatLng(38.6272, 90.1978),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

	// create the map              
	var container = $(config.el).find('.map-container').get(0);
	
    var map = new google.maps.Map(container, mapOptions);

	// add it to the associative array
	triangulate.maps[mapId] = {
		reference:map, 
		bounds:new google.maps.LatLngBounds(),
		markers: []
		};	
	
	// look for a default address
	if(this.address != null && this.address != undefined){
	
	    // geo-code the address
	    var geocoder = new google.maps.Geocoder();
	    
	    geocoder.geocode({'address': this.address}, function(results, status){
	    
	        if (status == google.maps.GeocoderStatus.OK){
	            // #ref: https://developers.google.com/maps/documentation/javascript/reference#LatLng
	            triangulate.Map.CreatePoint(mapId, results[0].geometry.location.lat(), results[0].geometry.location.lng(), results[0].formatted_address);
	        }
	    
	    });
	    
    }
	
}

// creates and adds a point to a map
triangulate.Map.CreatePoint = function(mapId, latitude, longitude, content){
	
    // create coords
    var coords = new google.maps.LatLng(latitude, longitude);
    
    // create info window
    var infowindow = new google.maps.InfoWindow({
        content: content
    });
    
    // create marker
    var marktext = $("<div/>").html(content).text();
    
    //alert(mapId);
    
    var marker = new google.maps.Marker({
        position: coords,
        map: triangulate.maps[mapId].reference,
        title: marktext
    });
    
    // push marker to array
    triangulate.maps[mapId].markers.push(marker);
    
    // set map
    var map =  triangulate.maps[mapId].reference;
    
	// handle click of marker (future)
	google.maps.event.addListener(marker, 'click', function() {
    	infowindow.open(map, marker);
		});
    
    // extend the bounds based on the new marker
    triangulate.maps[mapId].bounds.extend(marker.position);
    
    // fit the map to the bounds
    triangulate.maps[mapId].reference.fitBounds(triangulate.maps[mapId].bounds);

}

// creates and adds a point to a map
triangulate.Map.ClearPoints = function(mapId){

	if(triangulate.maps[mapId]){

		for (var i = 0; i < triangulate.maps[mapId].markers.length; i++ ) {
			triangulate.maps[mapId].markers[i].setMap(null);
		}
		
		triangulate.maps[mapId].markers.length = 0;
		
	}

}

// triangulate.Calendar
triangulate.Calendar = function(config){

	this.el = config.el;
	this.weeks = config.weeks;

	var now = moment();

	// build calendar
	triangulate.Calendar.Build(this.el, now, this.weeks);

}

// build calendar
triangulate.Calendar.Build = function(el, m_start, weeks){

	// set begin and end
	var m_start = m_start.startOf('day');
	var m_end = moment(m_start).startOf('day').add('days', weeks*7);


	// build weekdays
	var days = moment.weekdaysShort();

	var container = '<div class="triangulate-calendar-container">';

	var day = parseInt(m_start.format('d'));

	// create title
	var title = '<div class="title">' +
				 m_start.format('dddd, MMMM Do') + ' - ' + m_end.format('dddd, MMMM Do') +
				 '<i class="prev fa fa-angle-left" ' +
				 'data-start="' + m_start.format('YYYY-MM-DD HH:mm:ss') + '" data-weeks="' + weeks + '" ' +
				 'data-list="' + $(el).attr('data-list') + '"' +
				 '></i>' +
				 '<i class="next fa fa-angle-right" ' +
				 'data-start="' + m_start.format('YYYY-MM-DD HH:mm:ss') + '" data-weeks="' + weeks + '" ' +
				 'data-list="' + $(el).attr('data-list') + '"' +
				 '></i>' +
				 '</div>'

	// create header (weeks)
	var header =  '<div class="header">';

	for(x=0; x<days.length; x++){
		header += '<span>' + days[x] + '</span>';
	}

	header += '</div>';

	container += '<div class="week">';

	var pastDate = true;
	var cssClass = '';


	for(x=0; x<(7*weeks)+day+1; x++){

		// create offset
		var offset = x - day;

		// get date
		var curr_date = moment(m_start).add('days', offset);

		// current day
		var curr_day = parseInt(curr_date.format('d'));

		// difference b/w days
        var diff = curr_date.diff(m_start, 'days');
        
		if(diff >= 0){
			cssClass = ' active';
		}

		if(moment(curr_date).isSame(moment(), 'day')){
			cssClass += ' today';
		}
        
		if(offset==0){
			container += '<span class="day'+cssClass+'" data-date="'+curr_date.format('YYYY-MM-DD')+'">';
			pastDate = true;
		}
		else{
			container += '<span class="day'+cssClass+'" data-date="'+curr_date.format('YYYY-MM-DD')+'">';
		}

		container += '<span class="day-number">'+curr_date.format('D') + '</span>';

		container += '</span>';

		if((x+1)%7==0){
			container+='</div><div class="week">';
		}

    }

    container += '</div></div>';


    $(el).html(title+header+container);

}

// adds an event to a calendar, el is a DOM reference to the calendar
triangulate.Calendar.AddEvent = function(calendarId, beginDate, endDate, content){

	var el = $('#' + calendarId);

	// create begin and end from moment
	var m_begin = moment(beginDate, "YYYY-MM-DD HH:mm:ss");
	var m_end = moment(endDate, "YYYY-MM-DD HH:mm:ss");

	var els = $(el).find('[data-date='+m_begin.format('YYYY-MM-DD')+']');

	if(els.length > 0){
		$(els[0]).append(content);
	}				


}
