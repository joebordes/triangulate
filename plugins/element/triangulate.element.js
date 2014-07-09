// create namespace
var triangulate = triangulate || {};
triangulate.element = triangulate.element || {};

// h1 element
triangulate.element.h1 = {

	// creates h1
	create:function(){
	
		// generate uniqId
		var id = triangulate.editor.generateUniqId('h1', 'h1');
		
		// build html
		var html = triangulate.editor.defaults.elementMenu +
					'<div class="editable-content" contentEditable="true"></div>';
					
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['data-id'] = id;
		attrs['class'] = 'triangulate-h1';
		attrs['data-cssclass'] = '';
		
		// append element to the editor
		triangulate.editor.append(
			 utilities.element('div', attrs, html)
		);
		
		// setup paste filter
		$('#'+id+' [contentEditable=true]').paste();
		
		return true;
		
	},
	
	// parse h1
	parse:function(node){
	
		// get params
		var id = $(node).attr('id');
		
		// build html
		var html = triangulate.editor.defaults.elementMenu +
					'<div class="editable-content" contentEditable="true">' + $(node).html() + '</div>';
					
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['data-id'] = id;
		attrs['class'] = 'triangulate-h1';
		attrs['data-cssclass'] = $(node).attr('class');
		
		// return element
		return utilities.element('div', attrs, html);
				
	},
	
	// generate h1
	generate:function(node){

  		// html for tag
  		var html = $(node).find('[contentEditable=true]').html();
  		
		// tag attributes
		var attrs = [];
		attrs['id'] = $(node).attr('data-id');
		attrs['class'] = $(node).attr('data-cssclass');
		
		// return element
		return utilities.element('h1', attrs, html, true);
		
	}
	
};

// h2 element
triangulate.element.h2 = {

	// creates h2
	create:function(){
	
		// generate uniqId
		var id = triangulate.editor.generateUniqId('h2', 'h2');
		
		// build html
		var html = triangulate.editor.defaults.elementMenu +
					'<div class="editable-content" contentEditable="true"></div>';
					
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['data-id'] = id;
		attrs['class'] = 'triangulate-h2';
		attrs['data-cssclass'] = '';
		
		// append element to the editor
		triangulate.editor.append(
			 utilities.element('div', attrs, html)
		);
		
		// setup paste filter
		$('#'+id+' [contentEditable=true]').paste();
		
		return true;
		
	},
	
	// parse h2
	parse:function(node){
	
		// get params
		var id = $(node).attr('id');
		
		// build html
		var html = triangulate.editor.defaults.elementMenu +
					'<div class="editable-content" contentEditable="true">' + $(node).html() + '</div>';
					
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['data-id'] = id;
		attrs['class'] = 'triangulate-h2';
		attrs['data-cssclass'] = $(node).attr('class');
		
		// return element
		return utilities.element('div', attrs, html);
				
	},
	
	// generate h2
	generate:function(node){

  		// html for tag
  		var html = $(node).find('[contentEditable=true]').html();
  		
		// tag attributes
		var attrs = [];
		attrs['id'] = $(node).attr('data-id');
		attrs['class'] = $(node).attr('data-cssclass');
		
		// return element
		return utilities.element('h2', attrs, html, true);
		
	}
	
};

// h3 element
triangulate.element.h3 = {

	// creates h3
	create:function(){
	
		// generate uniqId
		var id = triangulate.editor.generateUniqId('h3', 'h3');
		
		// build html
		var html = triangulate.editor.defaults.elementMenu +
					'<div class="editable-content" contentEditable="true"></div>';
					
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['data-id'] = id;
		attrs['class'] = 'triangulate-h3';
		attrs['data-cssclass'] = '';
		
		// append element to the editor
		triangulate.editor.append(
			 utilities.element('div', attrs, html)
		);
		
		// setup paste filter
		$('#'+id+' [contentEditable=true]').paste();
		
		return true;
		
	},
	
	// parse h3
	parse:function(node){
	
		// get params
		var id = $(node).attr('id');
		
		// build html
		var html = triangulate.editor.defaults.elementMenu +
					'<div class="editable-content" contentEditable="true">' + $(node).html() + '</div>';
					
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['data-id'] = id;
		attrs['class'] = 'triangulate-h3';
		attrs['data-cssclass'] = $(node).attr('class');
		
		// return element
		return utilities.element('div', attrs, html);
				
	},
	
	// generate h3
	generate:function(node){

  		// html for tag
  		var html = $(node).find('[contentEditable=true]').html();
  		
		// tag attributes
		var attrs = [];
		attrs['id'] = $(node).attr('data-id');
		attrs['class'] = $(node).attr('data-cssclass');
		
		// return element
		return utilities.element('h3', attrs, html, true);
		
	}
	
};

// h4 element
triangulate.element.h4 = {

	// creates h4
	create:function(){
	
		// generate uniqId
		var id = triangulate.editor.generateUniqId('h4', 'h4');
		
		// build html
		var html = triangulate.editor.defaults.elementMenu +
					'<div class="editable-content" contentEditable="true"></div>';
					
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['data-id'] = id;
		attrs['class'] = 'triangulate-h4';
		attrs['data-cssclass'] = '';
		
		// append element to the editor
		triangulate.editor.append(
			 utilities.element('div', attrs, html)
		);
		
		// setup paste filter
		$('#'+id+' [contentEditable=true]').paste();
		
		return true;
		
	},
	
	// parse h4
	parse:function(node){
	
		// get params
		var id = $(node).attr('id');
		
		// build html
		var html = triangulate.editor.defaults.elementMenu +
					'<div class="editable-content" contentEditable="true">' + $(node).html() + '</div>';
					
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['data-id'] = id;
		attrs['class'] = 'triangulate-h4';
		attrs['data-cssclass'] = $(node).attr('class');
		
		// return element
		return utilities.element('div', attrs, html);
				
	},
	
	// generate h4
	generate:function(node){

  		// html for tag
  		var html = $(node).find('[contentEditable=true]').html();
  		
		// tag attributes
		var attrs = [];
		attrs['id'] = $(node).attr('data-id');
		attrs['class'] = $(node).attr('data-cssclass');
		
		// return element
		return utilities.element('h4', attrs, html, true);
		
	}
	
};

// h5 element
triangulate.element.h5 = {

	// creates h5
	create:function(){
	
		// generate uniqId
		var id = triangulate.editor.generateUniqId('h5', 'h5');
		
		// build html
		var html = triangulate.editor.defaults.elementMenu +
					'<div class="editable-content" contentEditable="true"></div>';
					
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['data-id'] = id;
		attrs['class'] = 'triangulate-h5';
		attrs['data-cssclass'] = '';
		
		// append element to the editor
		triangulate.editor.append(
			 utilities.element('div', attrs, html)
		);
		
		// setup paste filter
		$('#'+id+' [contentEditable=true]').paste();
		
		return true;
		
	},
	
	// parse h5
	parse:function(node){
	
		// get params
		var id = $(node).attr('id');
		
		// build html
		var html = triangulate.editor.defaults.elementMenu +
					'<div class="editable-content" contentEditable="true">' + $(node).html() + '</div>';
					
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['data-id'] = id;
		attrs['class'] = 'triangulate-h5';
		attrs['data-cssclass'] = $(node).attr('class');
		
		// return element
		return utilities.element('div', attrs, html);
				
	},
	
	// generate h5
	generate:function(node){

  		// html for tag
  		var html = $(node).find('[contentEditable=true]').html();
  		
		// tag attributes
		var attrs = [];
		attrs['id'] = $(node).attr('data-id');
		attrs['class'] = $(node).attr('data-cssclass');
		
		// return element
		return utilities.element('h5', attrs, html, true);
		
	}
	
};

// p element
triangulate.element.p = {

	// initialize p
	init:function(){
	
		// keydown event
		$(document).on('keydown', '.triangulate-p [contentEditable=true]', function(event){
		
			// ENTER KEY
			if(event.keyCode == '13'){
				
				// get a reference to the editor
				var editor = $(this).parents('.container');
			
				// create a new p element
				triangulate.element.p.create(editor);
				
				// focus on the new element
				$(this.parentNode.nextSibling).find('div').focus();
				
				event.preventDefault();
				return false;
			}
			
		});
				
	},

	// creates p
	create:function(){
	
		// generate uniqId
		var id = triangulate.editor.generateUniqId('p', 'p');
		
		// build html
		var html = triangulate.editor.defaults.elementMenu +
					'<div class="editable-content" contentEditable="true"></div>';
					
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['data-id'] = id;
		attrs['class'] = 'triangulate-p';
		attrs['data-cssclass'] = '';
		
		// append element to the editor
		triangulate.editor.append(
			 utilities.element('div', attrs, html)
		);
		
		// setup paste filter
		$('#'+id+' [contentEditable=true]').paste();
		
		return true;
		
	},
	
	// parse p
	parse:function(node){
	
		// get params
		var id = $(node).attr('id');
		
		// build html
		var html = triangulate.editor.defaults.elementMenu +
					'<div class="editable-content" contentEditable="true">' + $(node).html() + '</div>';
				
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['data-id'] = id;
		attrs['class'] = 'triangulate-p';
		attrs['data-cssclass'] = $(node).attr('class');
		
		// return element
		return utilities.element('div', attrs, html);
				
	},
	
	// generate p
	generate:function(node){
	
  		// html for tag
  		var html = $(node).find('[contentEditable=true]').html();
  		
		// tag attributes
		var attrs = [];
		attrs['id'] = $(node).attr('data-id');
		attrs['class'] = $(node).attr('data-cssclass');
		
		// return element
		return utilities.element('p', attrs, html, true);
		
	}
	
};

triangulate.element.p.init();

// blockquote element
triangulate.element.q = {

	// creates blockquote
	create:function(){
	
		// generate uniqId
		var id = triangulate.editor.generateUniqId('q', 'q');
		
		// build html
		var html = '<i class="in-textbox fa fa-quote-left"></i>' + 
					triangulate.editor.defaults.elementMenu +
					'<div class="editable-content" contentEditable="true"></div>';
					
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['data-id'] = id;
		attrs['class'] = 'triangulate-q';
		attrs['data-cssclass'] = '';
		
		// append element to the editor
		triangulate.editor.append(
			 utilities.element('div', attrs, html)
		);
		
		// setup paste filter
		$('#'+id+' [contentEditable=true]').paste();
		
		return true;
		
	},
	
	// parse blockquote
	parse:function(node){
	
		// get params
		var id = $(node).attr('id');
		
		// build html
		var html = '<i class="in-textbox fa fa-quote-left"></i>' + 
					triangulate.editor.defaults.elementMenu +
					'<div class="editable-content" contentEditable="true">' + $(node).html() + '</div>';
					
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['data-id'] = id;
		attrs['class'] = 'triangulate-q';
		attrs['data-cssclass'] = $(node).attr('class');
		
		// return element
		return utilities.element('div', attrs, html);
		
	},
	
	// generate blockquote
	generate:function(node){
	
  		// html for tag
  		var html = $(node).find('[contentEditable=true]').html();
  		
		// tag attributes
		var attrs = [];
		attrs['id'] = $(node).attr('data-id');
		attrs['class'] = $(node).attr('data-cssclass');
		
		// return element
		return utilities.element('blockquote', attrs, html, true);
		
	}
	
};

// ul element
triangulate.element.ul = {

	// initialize ul
	init:function(){
	
		// keydown event
		$(document).on('keydown', '.triangulate-ul [contentEditable=true]', function(event){
		
			// ENTER KEY
			if(event.keyCode == '13'){
				
				// add contentEditable block after the element
				$(this).after(
					'<div contentEditable="true"></div>'
				);
				
				$(this.nextSibling).focus();
				
				event.preventDefault();
				return false;
				
			}
			// DELETE KEY
			else if(event.keyCode == '8'){
			
				var h = $(this).html().trim();
				h = utilities.replaceAll(h, '<br>', '');
				
				if(h==''){
			
					var parent = $(this.parentNode);
					var divs = $(this.parentNode).find('div');
					
					if(divs.length>1){
						$(this).remove();
						
					
						var last = parent.find('div:last');
						
						last.focus();
						last.select();
					}
					
					event.preventDefault();
					return false;					
				}
				
			}
			
		});
		
	},

	// creates ul
	create:function(){
	
		// generate uniqId
		var id = triangulate.editor.generateUniqId('ul', 'ul');
		
		// build html
		var html = triangulate.editor.defaults.elementMenu +
					'<div class="editable-content" contentEditable="true"></div>';
					
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['data-id'] = id;
		attrs['class'] = 'triangulate-ul';
		attrs['data-cssclass'] = '';
		
		// append element to the editor
		triangulate.editor.append(
			 utilities.element('div', attrs, html)
		);
		
		// setup paste filter
		$('#'+id+' [contentEditable=true]').paste();
		
		return true;
		
	},
	
	// parse ul
	parse:function(node){
	
		// build html
		var html = triangulate.editor.defaults.elementMenu;
				
		// parse lis				
		var lis = $(node).children();			
					
		for(y=0; y<lis.length; y++){
		
			// tag attributes
			var attrs = [];
			attrs['data-id'] = $(lis[y]).attr('id');
			attrs['data-cssclass'] = $(lis[y]).attr('class');
			attrs['contentEditable'] = 'true';
			
			// return element
			html += utilities.element('div', attrs, $(lis[y]).html());
		}
		
		// get params
		var id = $(node).attr('id');
		
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['data-id'] = id;
		attrs['class'] = 'triangulate-ul';
		attrs['data-cssclass'] = $(node).attr('class');
		
		// return element
		return utilities.element('div', attrs, html);
				
	},
	
	// generate ul
	generate:function(node){
	
  		// html for tag
  		var html = '';
  		
  		// get lis
  		var lis = $(node).find('[contentEditable=true]');
  		
  		for(var y=0; y<lis.length; y++){
  		
			// tag attributes
			var attrs = [];
			attrs['id'] = $(lis[y]).attr('data-id');
			attrs['class'] = $(lis[y]).attr('data-cssclass');
		
			// create li
			html += utilities.element('li', attrs, $(lis[y]).html(), true);
			
	  	}
	  	
		// tag attributes
		var attrs = [];
		attrs['id'] = $(node).attr('data-id');
		attrs['class'] = $(node).attr('data-cssclass');
		
		// return element
		return utilities.element('ul', attrs, html);
		
	}
	
};

triangulate.element.ul.init();

// ol element
triangulate.element.ol = {

	// initialize ol
	init:function(){
	
		// keydown event
		$(document).on('keydown', '.triangulate-ol [contentEditable=true]', function(event){
		
			// ENTER KEY
			if(event.keyCode == '13'){
				
				// add contentEditable block after the element
				$(this).after(
					'<div contentEditable="true"></div>'
				);
				
				$(this.nextSibling).focus();
				
				event.preventDefault();
				return false;
				
			}
			// DELETE KEY
			else if(event.keyCode == '8'){
			
				var h = $(this).html().trim();
				h = utilities.replaceAll(h, '<br>', '');
				
				if(h==''){
			
					var parent = $(this.parentNode);
					var divs = $(this.parentNode).find('div');
					
					if(divs.length>1){
						$(this).remove();
						
					
						var last = parent.find('div:last');
						
						last.focus();
						last.select();
					}
					
					event.preventDefault();
					return false;					
				}
				
			}
			
		});
		
	},

	// creates ol
	create:function(){
	
		// generate uniqId
		var id = triangulate.editor.generateUniqId('ol', 'ol');
		
		// build html
		var html = triangulate.editor.defaults.elementMenu +
					'<div class="editable-content" contentEditable="true"></div>';
					
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['data-id'] = id;
		attrs['class'] = 'triangulate-ol';
		attrs['data-cssclass'] = '';
		
		// append element to the editor
		triangulate.editor.append(
			 utilities.element('div', attrs, html)
		);
		
		// setup paste filter
		$('#'+uniqId+' [contentEditable=true]').paste();
		
		return true;
		
	},
	
	// parse ol
	parse:function(node){
	
		// build html
		var html = triangulate.editor.defaults.elementMenu;
	
		// parse lis				
		var lis = $(node).children();			
					
		for(y=0; y<lis.length; y++){
			
			// set attributes
			var attrs = [];
			attrs['data-id'] = $(lis[y]).attr('id');
			attrs['data-cssclass'] = $(lis[y]).attr('class');
			attrs['contentEditable'] = 'true';
			
			// return element
			html += utilities.element('div', attrs, $(lis[y]).html());
		}
		
		var id = $(node).attr('id');
		
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['data-id'] = id;
		attrs['class'] = 'triangulate-ol';
		attrs['data-cssclass'] = $(node).attr('class');
		
		// return element
		return utilities.element('div', attrs, html);
				
	},
	
	// generate ol
	generate:function(node){
	
		// html for tag
  		var html = '';
	
  		// get lis
  		var lis = $(node).find('[contentEditable=true]');
  		
  		for(var y=0; y<lis.length; y++){
  		
			// tag attributes
			var attrs = [];
			attrs['id'] = $(lis[y]).attr('data-id');
			attrs['class'] = $(lis[y]).attr('data-cssclass');
		
			// create li
			html += utilities.element('li', attrs, $(lis[y]).html());
			
	  	}
	  	
		// tag attributes
		var attrs = [];
		attrs['id'] = $(node).attr('data-id');
		attrs['class'] = $(node).attr('data-cssclass');
		
		// return element
		return utilities.element('ol', attrs, html);
		
	}
	
};

triangulate.element.ol.init();

// table element
triangulate.element.table = {

	// initialize table
	init:function(){
	
		// keydown event
		$(document).on('keydown', '.table [contentEditable=true]', function(event){
		
			// ENTER KEY
			if(event.keyCode == '13'){
				
				// add row
				var table = $(el).find('table');
				var cols = $(table).attr('data-columns');
		
				var html = '<tr>';
		
				for(var x=0; x<cols; x++){
					html += '<td contentEditable="true"></td>';
				}
		
				html += '</tr>';
				
				// for headers (TH) prepend the row to the tbody
				if($(this).get(0).nodeName == 'TH'){
				
					$(el).find('tbody').prepend(html);
					$(el).find('tbody').find('[contentEditable=true]').get(0).focus();
				}
				else{ // for non-headers, insert the row after the current row
					var tr = $(this).parents('tr')[0];
					
					$(tr).after(html);
			
					$(tr).next().find('[contentEditable=true]').get(0).focus();
					
				}
				
				event.preventDefault();
				return false;
				
			}
			// DELETE KEY
			else if(event.keyCode == '8'){
			
				var h = $(this).html().trim();
				h = utilities.replaceAll(h, '<br>', '');
				
				if(h==''){
			
					var previous = $(this.parentNode.previousSibling);
				
					$(this.parentNode).remove();
					
					if(previous){
						$(previous).find('td')[0].focus();
					}
					
					return false;					
					
				}	
			}

		});
		
		// handle remove
		$(document).on('click', '.config[data-action="triangulate.element.table"] .remove', function(){
			var node = $(triangulate.editor.currNode);
			
			if(node){
				node.remove();
				triangulate.editor.currNode = null;
				
				// hide config
				$('.context-menu').find('.config').removeClass('active');
			}
			
		});
		
		// handle column change
		$(document).on('change', '.config[data-action="triangulate.element.table"] [name="columns"]', function(){
			var node = $(triangulate.editor.currNode);
			var form = $('.config[data-action="triangulate.element.table"]');
			
			var columns = $(form).find('input[name=columns]').val();
			var curr_columns = $(node).find('thead th').length;
			
			// update columns
            if(columns > curr_columns){ // add columns
	            
	            var toBeAdded = columns - curr_columns;
	            
	            var table = $(node).find('table');
				var trs = table.find('tr');
		
				// walk through table
				for(var x=0; x<trs.length; x++){
					
					// add columns
					for(var y=0; y<toBeAdded; y++){
						if(trs[x].parentNode.nodeName=='THEAD'){
							$(trs[x]).append('<th contentEditable="true"></th>');
						}
						else{
							$(trs[x]).append('<td contentEditable="true"></td>');
						}
					}
				}
		
				var n_cols = columns;
				
				table.removeClass('col-'+curr_columns);
				table.addClass('col-'+(n_cols));
				table.attr('data-columns', (n_cols));
	            
            }
            else if(columns < curr_columns){ // remove columns
            
            	var toBeRemoved = curr_columns - columns;
	            
	            var table = $(node).find('table');
				var trs = table.find('tr');
		
				// walk through table
				for(var x=0; x<trs.length; x++){
					
					// add columns
					for(y=0; y<toBeRemoved; y++){
						if(trs[x].parentNode.nodeName=='THEAD'){
							$(trs[x]).find('th:last-child').remove();
						}
						else{
							$(trs[x]).find('td:last-child').remove();
						}
					}
				}
		
				var n_cols = columns;
				
				table.removeClass('col-'+curr_columns);
				table.addClass('col-'+(n_cols));
				table.attr('data-columns', (n_cols));
            
            }

		});
		
		// handle row change
		$(document).on('change', '.config[data-action="triangulate.element.table"] [name="rows"]', function(){
		
			var node = $(triangulate.editor.currNode);
			var form = $('.config[data-action="triangulate.element.table"]');
			
            var rows = $(form).find('input[name=rows]').val();
			var curr_rows = $(node).find('tbody tr').length;
			var columns = $(node).find('thead th').length;
			
			// handle rows
            if(rows > curr_rows){ // add rows
	            
	            var toBeAdded = rows - curr_rows;
	            
	            var table = $(node).find('table');
				
				// add rows
				for(y=0; y<toBeAdded; y++){
					var html = '<tr>';

					for(x=0; x<columns; x++){
						html += '<td contentEditable="true"></td>';
					}
			
					html += '</tr>';
			
					$(table).find('tbody').append(html);
				}
	            
            }
            else if(rows < curr_rows){ // remove columns
            
            	var toBeRemoved = curr_rows - rows;
	            
	            var table = $(node).find('table');
	            
				// remove rows
				for(y=0; y<toBeRemoved; y++){
					table.find('tbody tr:last-child').remove();
				}

            }


		});
		
	},

	// creates table
	create:function(){
	
		// generate uniqId
		var id = triangulate.editor.generateUniqId('table', 'table');
		
		// build html
		var html = triangulate.editor.defaults.elementMenu +
					'<table class="table table-striped table-bordered col-2">'+
					'<thead><tr>'+
					'<th contentEditable="true"></th>'+
					'<th contentEditable="true"></th>'+
					'</tr></thead>'+
					'<tbody><tr>'+
					'<td contentEditable="true"></td>'+
					'<td contentEditable="true"></td>'+
					'</tr></tbody>'+
					'</table>';
					
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['data-id'] = id;
		attrs['class'] = 'triangulate-table';
		attrs['data-cssclass'] = '';
		attrs['data-columns'] = '2';
		attrs['data-rows'] = '1';
		
		// append element to the editor
		triangulate.editor.append(
			 utilities.element('div', attrs, html)
		);
		
		// setup paste filter
		$('#'+id+' [contentEditable=true]').paste();
		
		return true;
		
	},
	
	// parse table
	parse:function(node){
	
		// build html
		var html = triangulate.editor.defaults.elementMenu;
		
		// get columns and rows			
		var columns = $(node).find('thead th').length;
	
       	var rows = '';

       	var tr = $(node).find('thead tr');
    
       	rows += '<thead><tr>';

       	var ths = $(tr).find('th');

		for(var d=0; d<ths.length; d++){
			
			var attrs = [];
			attrs['data-id'] = $(ths[d]).attr('id');
			attrs['data-cssclass'] = $(ths[d]).attr('class');
			attrs['contentEditable'] = 'true';
			
			// return element
			rows += utilities.element('th', attrs, $(ths[d]).html());
		}

       	rows += '</tr></thead>';
       	
        var trs = $(node).find('tbody tr');

        rows += '<tbody>';

        for(var t=0; t<trs.length; t++){
			rows += '<tr>';
			var tds = $(trs[t]).find('td');

			for(var d=0; d<tds.length; d++){
				
				var attrs = [];
				attrs['data-id'] = $(tds[d]).attr('id');
				attrs['data-cssclass'] = $(tds[d]).attr('class');
				attrs['contentEditable'] = 'true';
				
				// return element
				rows += utilities.element('td', attrs, $(tds[d]).html());
			}

			rows += '</tr>';
		}

		rows += '</tbody>';
		
        html += '<table class="table table-striped table-bordered col-'+columns+'">' + rows + '</table>';
       
		// tag attributes
		var attrs = [];
		attrs['id'] = $(node).attr('id');
		attrs['data-id'] = $(node).attr('id');
		attrs['class'] = 'triangulate-table';
		attrs['data-cssclass'] = $(node).attr('class');
		attrs['data-columns'] = columns;
		attrs['data-rows'] =  $(node).find('tbody tr').length;
		
		
		// return element
		return utilities.element('div', attrs, html);
				
	},
	
	// generate table
	generate:function(node){
	
		// get params
		var id = $(node).attr('data-id');
  		var cssClass = $(node).attr('data-cssclass');
  
  		// html for tag
  		var table = $(node).find('table');
 		var cols = $(table).attr('data-columns');

 		// get thead and tbody
		html = '<thead>';

		var tr = $(table).find('thead tr');		

		html += '<tr>';
		var ths = $(tr).find('th');
		
		for(var d=0; d<ths.length; d++){
	
			// tag attributes
			var attrs = [];
			attrs['id'] = $(ths[d]).attr('data-id');
			attrs['class'] = $(ths[d]).attr('data-cssclass');
		
			// create th
			html += utilities.element('th', attrs, $(ths[d]).html(), true);
			
		}
		html += '</tr>';		

		html+='</thead>';
		html+='<tbody>';

		var trs = $(table).find('tbody tr');

		for(var t=0; t<trs.length; t++){
			html += '<tr>';
			var tds = $(trs[t]).find('td');

			for(var d=0; d<tds.length; d++){
				
				// tag attributes
				var attrs = [];
				attrs['id'] = $(tds[d]).attr('data-id');
				attrs['class'] = $(tds[d]).attr('data-cssclass');
			
				// create td
				html += utilities.element('td', attrs, $(tds[d]).html(), true);
		
			}
			html += '</tr>';
		}

		html += '</tbody>';
  		
  		
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['class'] = $(table).attr('class');
		attrs['data-columns'] = cols;
		
		// return element
		return utilities.element('table', attrs, html);
		
	}
	
};

triangulate.element.table.init();

// hr element
triangulate.element.hr = {

	// creates hr
	create:function(){
	
		// generate uniqId
		var id = triangulate.editor.generateUniqId('hr', 'hr');
		
		// build html
		var html = triangulate.editor.defaults.elementMenu +
					'<div class="line"></div>';
					
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['data-id'] = id;
		attrs['class'] = 'triangulate-hr';
		attrs['data-cssclass'] = '';
		
		// append element to the editor
		triangulate.editor.append(
			 utilities.element('div', attrs, html)
		);
		
		return true;
		
	},
	
	// parse hr
	parse:function(node){
	
		// get params
		var id = $(node).attr('id');
		
		// build html
		var html = triangulate.editor.defaults.elementMenu +
					'<div class="line"></div>';
					
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['data-id'] = id;
		attrs['class'] = 'triangulate-hr';
		attrs['data-cssclass'] = $(node).attr('class');
		
		// return element
		return utilities.element('div', attrs, html);
				
	},
	
	// generate hr
	generate:function(node){
	
		// get params
		var id = $(node).attr('data-id');
  
  		// html for tag
  		var html = '';
  		
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['class'] = $(node).attr('data-cssclass');
		
		// return element
		return utilities.element('hr', attrs, html);
		
	}
	
};


// image element
triangulate.element.image = {

	// init image
	init:function(){
		
		// handle row change
		$(document).on('change', '.config[data-action="triangulate.element.image"] [name="display"]', function(){
		
			var node = $(triangulate.editor.currNode);
		
			var form = $('.config[data-action="triangulate.element.table"]');
			var display = $(this).val();
			var src = $(node).find('img').attr('src');
			var html = $(node).find('[contentEditable=true]').html() || '';
			
			// update html
			$(node).html(triangulate.element.image.html(display, src, html));
			
		});
		
	},
	
	// helper method to get HTML for the image based on alignment
	html:function(display, src, html){
		
		var content = triangulate.editor.defaults.elementMenu +
					'<img src="' + src + '">' +
					'<div class="editable-content" contentEditable="true">' + html + '</div>';
		
		// build html
		if(display=='standalone'){
			content = triangulate.editor.defaults.elementMenu +
					'<img src="' + src + '">';
		}
		else if(display=='right'){
			content = triangulate.editor.defaults.elementMenu +
					'<div class="editable-content" contentEditable="true">' + html + '</div>' +
					'<img src="' + src + '">';
		}
		
		return content;
		
	},
	
	// adds an image
	addImage:function(image){
	
		// generate uniqId
		var id = triangulate.editor.generateUniqId('image', 'image');
		
		// build html
		var html = triangulate.editor.defaults.elementMenu +
					'<img src="' + image.fullUrl + '">' +
					'<div class="editable-content" contentEditable="true"></div>';
					
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['data-id'] = id;
		attrs['class'] = 'triangulate-image';
		attrs['data-cssclass'] = 'triangulate-image';
		attrs['data-display'] = 'left';
		attrs['data-link'] = '';
		attrs['data-title'] = '';
		attrs['data-target'] = '';
		
		// append element to the editor
		triangulate.editor.append(
			 utilities.element('div', attrs, html)
		);
		
		// setup paste filter
		$('#'+id+' [contentEditable=true]').paste();
		
		// hide dialog
		$('#imagesDialog').modal('hide');
		
		return true;
	
	},

	// create image
	create:function(){
		
		// tell the dialog which plugin is calling it
		$('#imagesDialog').attr('data-plugin', 'triangulate.element.image');
		
		// show dialog
		$('#imagesDialog').modal('show');
				
	},
	
	// parse image
	parse:function(node){
	
		// get params
		var id = $(node).attr('id');		
		var src = $(node).find('img').attr('src');
		var link = $(node).find('a').attr('href') || $(node).find('a').attr('ui-sref') || '';
		var title = $(node).find('a').attr('title') || '';
		var target = $(node).find('a').attr('target') || '';
		
		// get scope from page
		var scope = angular.element($("section.main")).scope();
		
		// get domain from scope
		var domain = '//' + scope.site.Domain + '/';
		
		// update src with full domain
		src = domain + src;
		
		// get display class
		var display = $(node).attr('data-display') || 'left';
		
		// set html
		var html = triangulate.element.image.html(display, src, $(node).find('p').html());
		
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['data-id'] = id;
		attrs['class'] = 'triangulate-image';
		attrs['data-cssclass'] = $(node).attr('class');
		attrs['data-display'] = display;
		attrs['data-link'] = link;
		attrs['data-title'] = title;
		attrs['data-target'] = target;
		
		// return element
		return utilities.element('div', attrs, html);
				
	},
	
	// generate image
	generate:function(node){
	
		// get params
		var id = $(node).attr('data-id');
  		var display = $(node).attr('data-display');
  		var cssClass = $(node).attr('data-cssclass');
  		var link = $(node).attr('data-link') || '';
  		var title = $(node).attr('data-title') || '';
  		var target = $(node).attr('data-target') || '';
  		
  		// build html
  		var html = '';
  		var startLink = '';
  		var endLink = '';
  		
  		if(link != ''){
	  		// external links should have http
			if(link.indexOf('http') == -1){
				startLink = '<a ui-sref="'+link+'"';
			}
			else{
				startLink = '<a href="'+link+'"';
			}
			
			// add title
			if(title != ''){
				startLink += ' title="' + title + '"';
			}
			
			// add target
			if(target != ''){
				startLink += ' target="' + target + '"';
			}
			
			// close start of <a>
			startLink += '>';
			
			// close <a>
			endLink = '</a>';
  		}
  		
  		// set image src
  		var src = $(node).find('img').attr('src');
  		
  		// removes the domain from the img
  		if(src != ''){
	  		
	  		var parts = src.split('files/');
	  		src = 'files/' + parts[1];
	  		
  		}
  		
  		var html = startLink + '<img src="' + src + '">' + endLink;
  
  		// html for tag
  		if(display == 'left'){
	  		
	  		html = startLink + '<img src="' + src + '">' + endLink + 
	  					'<p>' + $(node).find('[contentEditable=true]').html() + '</p>';
	  		
  		}
  		else if(display == 'right'){
	  		html =  '<p>' + $(node).find('[contentEditable=true]').html() + '</p>' +
	  					startLink + '<img src="' + src + '">' + endLink;
  		}
  		
		// tag attributes
		var attrs = [];
		
		attrs['id'] = id;
		attrs['class'] = cssClass;
		attrs['data-display'] = display;
		
		// return element
		return utilities.element('div', attrs, html, true);
		
	}
	
};

triangulate.element.image.init();

// pre component
triangulate.element.pre = {

	init:function(){
		
		// handle html div click
		$(document).on('click', '.triangulate-pre div', function(){
			$(this).parent().toggleClass('active');	
		});
		
	},

	// creates pre
	create:function(){
	
		// generate uniqId
		var id = triangulate.editor.generateUniqId('pre', 'pre');
		
		// build html
		var html = triangulate.editor.defaults.elementMenu +
					'<div class="title triangulate-element"><i class="fa fa-terminal"></i> '+
					'<span node-text="description">PRE</span>' +
					'<i class="fa fa-angle-down"></i></div>' +
					'<textarea></textarea>';
					
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['data-id'] = id;
		attrs['class'] = 'triangulate-pre';
		attrs['data-cssclass'] = 'prettyprint linenums pre-scrollable';
		attrs['data-description'] = 'PRE';
		
		// append element to the editor
		triangulate.editor.append(
			 utilities.element('div', attrs, html)
		);
	
		return true;
		
	},
	
	// parse code
	parse:function(node){
	
		// get params
		var id = $(node).attr('id');
		var description = $(node).attr('description');
		var code = $(node).html();
		
		// build html
		var html = triangulate.editor.defaults.elementMenu +
					'<div class="title triangulate-element"><i class="fa fa-terminal"></i> '+
					'<span node-text="description">' + description + '</span>' +
					'<i class="fa fa-angle-down"></i></div>' +
					'<textarea>' + code + '</textarea>';
					
		// tag attributes
		var attrs = [];
		attrs['id'] = id;
		attrs['data-id'] = id;
		attrs['class'] = 'triangulate-pre';
		attrs['data-cssclass'] = $(node).attr('class');
		attrs['data-description'] = description;
		
		// return element
		return utilities.element('div', attrs, html);
				
	},
	
	// generate code
	generate:function(node){

		// tag attributes
		var attrs = [];
		attrs['id'] = $(node).attr('data-id');
		attrs['class'] = $(node).attr('data-cssclass');
		attrs['description'] = $(node).attr('data-description');
		
		var code = $(node).find('textarea').val();
		
		// return element
		return utilities.element('PRE', attrs, code);
		
	}
	
};

triangulate.element.pre.init();

