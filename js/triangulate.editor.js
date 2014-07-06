// setup namespace
var triangulate = triangulate || {};
triangulate.editor = triangulate.editor || {};

// holds current row and node
triangulate.editor.currNode = null;
triangulate.editor.currElement = null;
triangulate.editor.currConfig = null;
triangulate.editor.prefix = '';
triangulate.editor.menu = null;
triangulate.editor.api = '';

// reference to the editor
triangulate.editor.el = null;
triangulate.editor.pageId = null;

// swaps nodes
jQuery.fn.swap = function(b){ 
	b = jQuery(b)[0]; 
	var a = this[0]; 
	var t = a.parentNode.insertBefore(document.createTextNode(''), a); 
	b.parentNode.insertBefore(a, b); 
	t.parentNode.insertBefore(b, t); 
	t.parentNode.removeChild(t); 
	return this; 
};

function setupSortable(){
	$('.sortable').sortable({
			handle:'.move', 
			connectWith: '.sortable', 
			placeholder: 'editor-highlight', 
			opacity:'0.6', 
			tolerance: 'pointer',
			receive: function(event, ui) {
	           if($(ui.item).is('a')){
		           $('#editor-container').find('a.ui-draggable').replaceWith('<div id="editor-placeholder" class="editor-highlight"></div');
	           }
	        }
		});
}

// set sortable function
triangulate.editor.setupSortable = function(){
	setupSortable();
}

// set debug for the editor
triangulate.editor.debug = true;

// defaults
triangulate.editor.defaults = {
	showIndividualLayoutOptions: false,

	elementMenu: '<a class="move fa fa-arrows"></a>',
					
	blockMenu: '<a class="expand-menu fa fa-ellipsis-v"></a>' +
			'<div class="element-menu">' + 
			'<a class="duplicate fa fa-copy"></a>' +
			'<a class="up fa fa-chevron-up"></a><a class="down fa fa-chevron-down"></a>' +
			'<a class="config-block fa fa-cog"></a>'+
			'<a class="remove-block fa fa-minus-circle"></a></div>'
};


// instantiate editor
triangulate.editor.setup = function(config){

	// set contextual variables
	triangulate.editor.el = config.el;
	triangulate.editor.pageId = config.pageId;
	triangulate.editor.api = config.api;
	
	// set namespaced globals
	triangulate.editor.menu = config.menu;
	
	// show loading
	$('#editor-loading').show();
	
	// get content
	$.ajax({
		url: config.api + '/page/content/retrieve',
		type: 'POST',
		beforeSend : function(xhr) {
		 	xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
	    },
		data: {pageId: this.pageId},
		success: function(data){
		
			// hide loading
			$('#editor-loading').show();
		
			//set data
			$(triangulate.editor.el).html(data);
			
			// build the editor
			triangulate.editor.build();
            
            // oh so pretty
            prettyPrint();
        }
	});
	
}

// setup plugins
triangulate.editor.setupPlugins = function(){
	
	// setup mapping between elements for inputs
	$(document).on('keyup change', 'input[data-map], textarea[data-map]', function(){
	
		var value = $(this).val();
		var map = $(this).attr('data-map');
		var attr = $(this).attr('data-attr');
		
		// clean html
		var clean = utilities.replaceAll(value, '<', '&lt;');
		clean = utilities.replaceAll(clean, '>', '&gt;');
		
		if(map == 'node'){
			$(triangulate.editor.currNode).attr(attr, value);
			$(triangulate.editor.currNode).find('[data-text="' + attr.replace('data-', '') + '"]').text(value);
			$(triangulate.editor.currNode).find('[data-html="' + attr.replace('data-', '') + '"]').html(value);
			$(triangulate.editor.currNode).find('[data-html-clean="' + attr.replace('data-', '') + '"]').html(clean);
			
		}
		
		if(map == 'element'){
			$(triangulate.editor.currElement).attr(attr, value);
			$(triangulate.editor.currElement).find('[data-text="' + attr.replace('data-', '') + '"]').text(value);
			$(triangulate.editor.currNode).find('[data-html="' + attr.replace('data-', '') + '"]').html(value);
			$(triangulate.editor.currElement).find('[data-html-clean="' + attr.replace('data-', '') + '"]').html(clean);
		}
		
	});
	
	// setup mapping between elements
	$(document).on('change', 'select[data-map]', function(){
		
		var value = $(this).val();
		var map = $(this).attr('data-map');
		var attr = $(this).attr('data-attr');
		
		if(map == 'node'){
			$(triangulate.editor.currNode).attr(attr, value);
			$(triangulate.editor.currNode).find('[data-text="' + attr.replace('data-', '') + '"]').text(value);
		}
		
		if(map == 'element'){
			$(triangulate.editor.currElement).attr(attr, value);
			$(triangulate.editor.currElement).find('[data-text="' + attr.replace('data-', '') + '"]').text(value);
		}
	});
	
	// remove plugin
	$(document).on('click', '.plugin-remove', function(){
		
		var node = $(triangulate.editor.currNode);
			
		if(node){
			node.remove();
			triangulate.editor.currNode = null;
			
			// hide config
			$('.context-menu').find('.config').removeClass('active');
		}
		
	});
	
	// remove element
	$(document).on('click', '.element-remove', function(){
		
		var el = $(triangulate.editor.currElement);
			
		if(el){
			el.remove();
			triangulate.editor.currElement = null;
		}
		
	});
	
}

// parses the html
triangulate.editor.parseHTML = function(){

	var top = triangulate.editor.el;

	function parseModules(node){
			var children = $(node).children();
			var response = '';
			
			for(var x=0; x<children.length; x++){
		  		var node = children[x];
		  		var cssclass = '';
		  		
		  		// get tag from node
		  		var tag = node.nodeName.toUpperCase();
		  		
		  		// get index from the menu
		  		var i = utilities.getIndexByAttribute(triangulate.editor.menu, 'tag', tag);
		  		
		  		// execute the parse method for the plugin
		  		if(i != -1){
			  		var action =triangulate.editor.menu[i].action + '.parse';
			  		
			  		try{
			  			var html = utilities.executeFunctionByName(action, window, node);
			  			response += html;
			  		}
			  		catch(e){
				  		console.log('[triangulate.Editior.error] could not execute the parse method on the plugin');
			  		}
		  		}
		 
		  		
		 }
		
		return response;
	}
	  
  	var html = '';
	  
  	var blocks = $(top).find('div.block');
	  
  	if(blocks.length==0){
		html += '<div id="block-000" class="block sortable">';
		html += parseModules(top);
		html += '<span class="block-actions"><span>#block-000 .block.row</span>' +
					triangulate.editor.defaults.blockMenu + '</span></div>'; 
	}
	else{
		// walk through blocks
		for(var y=0; y<blocks.length; y++){
	  		var id = $(blocks[y]).attr('id');
		  	var cssclass = $(blocks[y]).attr('class');
		  	var cssclass_readable = '.' + utilities.replaceAll(cssclass, ' ', '.');
		  	
		  	// get nested
		  	var nested = $(blocks[y]).attr('data-nested');
		  	var containerId = $(blocks[y]).attr('data-containerid');
		  	var containerCssClass = $(blocks[y]).attr('data-containercssclass');
		  	
		  	// check for undefined
		  	if(nested == undefined){
				nested = 'not-nested';
			}
			
			if(containerId == undefined){
				containerId = '';
			}
			
			if(containerCssClass == undefined){
				containerCssClass = '';
			}
		  	
		  	// replace row and block
		  	cssclass = jQuery.trim(utilities.replaceAll(cssclass, 'block row', ''));

			if(id==undefined || id=='')id='undefined';

		  	html += '<div id="'+id+'" class="block row" data-cssclass="' + cssclass + '" ' +
		  				'data-nested="' + nested + '" ' +
		  				'data-containerid="' + containerId + '" ' +
		  				'data-containercssclass="' + containerCssClass + '" ' +
		  				'>';        
		  
		  	// determine if there are columns
		  	var cols = $(blocks[y]).find('.col');
  
			for(var z=0; z<cols.length; z++){
				var className = $(cols[z]).attr('class'); 

		  		html += '<div class="'+className+' sortable">';
		  		html += parseModules(cols[z]);
		  		html += '</div>';
		  }

		  html += '<span class="block-actions"><span>#'+ id + ' ' + cssclass_readable + '</span>' +
		  			triangulate.editor.defaults.blockMenu + '</span></div>';
		}
	}

	return html;
	
}

// sets up the menu events
triangulate.editor.setupMenuEvents = function(){

	// set reference to element
	var editor = triangulate.editor.el;

	// set up draggable
	$('.editor-menu a.draggable').draggable({
      connectToSortable: '.sortable',
      helper: 'clone',
      revert: 'true',
      appendTo: 'body'
    });
    
    // handle click/dragstop
    $('#editor-menu').on('dragstop click', '.editor-menu a', function(){
	    var action = $(this).attr('data-action') + '.create';
	    
	    //alert(action);
	    
	    utilities.executeFunctionByName(action, window);
    });
    
    // setup text events
	$('.context-menu a').on('mousedown touchstart', function(e){
		var action = $(this).attr('data-action') + '.create';
		utilities.executeFunctionByName(action, window);
		
		return false;
	});
    
}

// sets up persistent events for the editor
triangulate.editor.setupPersistentEvents = function(){
	
	// setup context
	var el = $(triangulate.editor.el);
	var context = $(triangulate.editor.el);
	
	// make blocks sortable
	setupSortable();
	
	// set triangulate.editor.currNode when div is focused
	$(el).on('click focusin', '.sortable>div', function(){
		triangulate.editor.currNode = this;
		
		// set current node class
		$(triangulate.editor.el).find('.current-node').removeClass('current-node');
		$(triangulate.editor.currNode).addClass('current-node');
		
		// get widget class
		var cssClass = $(this).prop('class').trim();
		
		var classes = $(this).prop('class').split(' ');
	  		
  		if(classes.length > 0){
	  		cssClass = classes[0];
  		}
  		
  		// set active in menu
		if(cssClass != ''){
			$('.editor-actions .'+cssClass).addClass('active');
		}
		
		// get index from the menu
		var i = utilities.getIndexByAttribute(triangulate.editor.menu, 'class', cssClass);
		
		if(i != -1){
			var node = this;
			var element = triangulate.editor.currElement;
	  		var action = triangulate.editor.menu[i].action;
	  		var form = $('.context-menu').find('[data-action="'+action+'"]');
	  		
	  		// hide config
	  		$('.context-menu').find('.config').removeClass('active');
	  		
	  		if(form){
	  			// add activate
		  		form.addClass('active');
		  		triangulate.editor.currConfig = form;
		  		
		  		// get scope of the content
		  		var scope = angular.element($("section.main")).scope();
		  		
		  		// reset node
		  		scope.$apply(function(){
				    scope.node = {}
				});
		  		
		  		// setup check for data attributes
		  		var expr = /^data\-(.+)$/;
			
		  		// walk through attributes of node
			    $.each($(node).get(0).attributes, function(index, attr) {
			        if (expr.test(attr.nodeName)) {
			            var key = attr.nodeName.replace('data-', '');
			           	var value = attr.nodeValue;
			           	
					   	// this enables binding to type=number fields for numeric values
			           	if($.isNumeric(value) === true){
				           	value = parseFloat(value);
			           	}
		  		
					   	// apply the nvp to ContentCtrl scope
				  		scope.$apply(function(){
						    scope.node[key] = value;
						});
			        }
			    });
			   	
		  		// execute config action for plugin
		  		action += '.config';
		  		
		  		try{
		  			utilities.executeFunctionByName(action, window, node, form);
		  		}
		  		catch(e){
			  		console.log('[triangulate.editor] config action not available for plugin');
		  		}
	  		}
  		}
	});
	
	
	$(el).on('focusout', '.sortable div', function(){
		$('.editor-actions a').removeClass('active');
	});
	
	// handle remove-block
	$(el).on('click', '.remove-block', function(){
		$(this.parentNode.parentNode.parentNode).remove();
		
		$(context).find('.up').removeClass('disabled');
		$(context).find('.up').first().addClass('disabled');

		$(context).find('.down').removeClass('disabled');
		$(context).find('.down').last().addClass('disabled');
		
		return false;
	});
	
	// handle expand-menu
	$(el).on('click', '.expand-menu', function(){
		$(this).toggleClass('active');
		$(this).next().toggleClass('active');
	});
	
	
	// add sku
	$(el).on('click', '.add-sku', function(){
		var id = $(this.parentNode).attr('id');
		skuDialog.show(id);
		return false;
	});
	
	// set current element
	$(el).on('focusin click', 'textarea, input, [contenteditable=true], .triangulate-element', function(){
		triangulate.editor.currElement = this;
		
		// set current node class
		$(triangulate.editor.el).find('.current-element').removeClass('current-element');
		$(triangulate.editor.currElement).addClass('current-element');
		
		// get scope of the content
  		var scope = angular.element($("section.main")).scope();
  	
  		// walk through attributes of element
  		var element = triangulate.editor.currElement;
  		
  		if(element){
  		
  			// reset scope.element
	  		scope.$apply(function(){
			    scope.element = {};
			});
  		
  			// setup check for data attributes
		  	var expr = /^data\-(.+)$/;
  		
  			// set attributes for element
	  		$.each($(element).get(0).attributes, function(index, attr) {
		        if (expr.test(attr.nodeName)) {
		            var key = attr.nodeName.replace('data-', '');
		           	var value = attr.nodeValue;
		           	
				   	// this enables binding to type=number fields for numeric values
		           	if($.isNumeric(value) === true){
			           	value = parseFloat(value);
		           	}
	  		
				   	// apply the nvp to ContentCtrl scope
			  		scope.$apply(function(){
					    scope.element[key] = value;
					});
		        }
			});
  		}
  		
	});
	
	// remove click
	$(el).on('click', '.remove', function(){
		$(this.parentNode.parentNode).remove();
		context.find('a.'+this.parentNode.className).show();
		triangulate.editor.currNode = null;
		return false;
	}); 

	// config click
	$(el).on('click', '.config', function(){
		$(this.parentNode.parentNode).find('.expand-menu').toggleClass('active');
		$(this.parentNode.parentNode).find('.element-menu').toggleClass('active');

		var moduleId = $(this.parentNode.parentNode).attr('id');

		var id = $(this.parentNode.parentNode).attr('data-id');
		var cssClass = $(this.parentNode.parentNode).attr('data-cssclass');
		
		elementConfigDialog.show(moduleId, id, cssClass);

		triangulate.editor.currNode = null;
		return false;
	}); 

	// config block click
	$(el).on('click', '.config-block', function(){
		var blockId = $(this.parentNode.parentNode.parentNode).attr('id');
		var id = $(this.parentNode.parentNode.parentNode).attr('id');
		var cssClass = $(this.parentNode.parentNode.parentNode).attr('data-cssclass');
		var nested = $(this.parentNode.parentNode.parentNode).attr('data-nested');
		var containerId = $(this.parentNode.parentNode.parentNode).attr('data-containerid');
		var containerCssClass = $(this.parentNode.parentNode.parentNode).attr('data-containercssclass');
		
		blockConfigDialog.show(blockId, id, cssClass, nested, containerId, containerCssClass);

		triangulate.editor.currNode = null;
		return false;
	}); 

	// remove field click
	$(el).on('click', '.remove-field', function(){
		$(this.parentNode).remove();
		return false;
	});
	
	// add image click
	$(el).on('click', '.add-image', function(){
		var editor = $('#'+$(this).parents('.editor').attr('id'));
	
		var d = this.parentNode.parentNode;
		var id = $(d).attr('id');

		imagesDialog.show(editor, 'slideshow', id);
	});
	
	// config list click   
	$(el).on('click', '.config-list', function(){
		var editor = $('#'+$(this).parents('.editor').attr('id'));
		var id=$(this.parentNode.parentNode).attr('id');
		listDialog.show(editor, 'edit', id);
		return false;
	});
	
	// config html click
	$(el).on('click', '.config-html', function(){
		var editor = $('#'+$(this).parents('.editor').attr('id'));
		
		var id=$(this.parentNode.parentNode).attr('id');
		var desc=$(this.parentNode.parentNode).attr('data-desc');
		var type=$(this.parentNode.parentNode).attr('data-type');
		
		htmlDialog.show(editor, desc, type, 'edit', id);
		return false;
	});
	
	// config html click
	$(el).on('click', '.config-field', function(){
		var editor = $('#'+$(this).parents('.editor').attr('id'));
		
		var container = $(this).parents('.field-container').get(0);
		
		fieldDialog.edit(container);
		return false;
	});

	// config plugin click
	$(el).on('click', '.config-plugin', function(){
		var id=$(this.parentNode.parentNode).attr('id');
		var type=$(this.parentNode.parentNode).attr('data-type');
		configPluginsDialog.show(id, type);
		return false;
	});
	
	// config form click
	$(el).on('click', '.config-form', function(){
		var id=$(this.parentNode.parentNode).attr('id');
		formDialog.show(id);
		return false;
	});

	// handle html div click
	$(el).on('click', '.html div', function(){
		$(this).parent().toggleClass('active');	
	});
		
	// handle switch
	$(el).on('click', '.switch', function(){
		$(this.parentNode).find('a').removeClass('selected');
		$(this).addClass('selected');
		return false;
	});
	
	// handle down
	$(el).on('click', '.down', function(){
		if($(this).hasClass('disabled')){return false;}

		var curr = $(this.parentNode.parentNode.parentNode);
		var next = $(this.parentNode.parentNode.parentNode).next();

		$(curr).swap(next); 
		
		$(context).find('a.up').removeClass('disabled');
		$(context).find('a.up').first().addClass('disabled');

		$(context).find('a.down').removeClass('disabled');
		$(context).find('a.down').last().addClass('disabled'); 
		
		return false;
	});

	// handle up
	$(el).on('click', '.up', function(){
		if($(this).hasClass('disabled')){return false;}
		  
		var curr = $(this.parentNode.parentNode.parentNode);
		var next = $(this.parentNode.parentNode.parentNode).prev();
		  
		$(curr).swap(next); 
		
		$(context).find('a.up').removeClass('disabled');
		$(context).find('a.up').first().addClass('disabled');

		$(context).find('a.down').removeClass('disabled');
		$(context).find('a.down').last().addClass('disabled'); 
		
		return false;
	});
	
	// handle duplicate
	$(el).on('click', '.duplicate', function(){
	
		var curr = $(this.parentNode.parentNode.parentNode);
		
		var clone = curr.clone();
		
		//$(clone).insertAfter(curr);
		var editor = $(context).get(0);
		
		// generate new block id
		var blockid = triangulate.editor.GenerateUniqId(editor, 'block', 'block');
	
		// set new blockid
		$(clone).attr('id', blockid);
		
		// default
		var cssClass = '';
		
		// set new readable
		if($(clone).attr('data-cssclass') !== undefined && $(clone).attr('data-cssclass') !== null){
			var cssClass = $(clone).attr('data-cssclass').trim().replace(/\s/g, '.');
		}
		
		if(cssClass != ''){
			cssClass = ' .block.row.'+cssClass;
		}
		else{
			cssClass = ' .block.row';
		}
		
		$(clone).find('.block-actions span').texi18n.t('#'+blockid+cssClass);
		
		// find all blocks in clone
		var blocks = $(clone).find('.col>div');
		
		// walkthough blocks
		for(x=0; x<blocks.length; x++){
			
			var cssClass = $(blocks[x]).attr('class');
			
			// ensures a unique id for cloned elements
			var offset = x;
			
			// generate a uniqid
			var newid = triangulate.editor.generateUniqId(cssClass, cssClass, offset);
			
			// set new id
			$(blocks[x]).attr('id', newid);
			
			//aleri18n.t('id='+$(blocks[x]).attr('id'));
			
			var dataid = $(blocks[x]).attr('data-id');
			
			if (typeof dataid !== 'undefined' && dataid !== false) {
			    $(blocks[x]).attr('data-id', newid);
			}
			
		}
		
		// insert clone
		$(clone).insertAfter(curr);
		
		return false;
	});

	
	// setup sorting on .shelf-items, forms, slideshows
	$('.shelf-items').sortable({handle: '.move', placeholder: 'editor-highlight', opacity:'0.6', axis:'y'});
	$('.form div').sortable({handle: '.move', placeholder: 'editor-highlight', opacity:'0.6', axis:'y'});
	$('.slideshow div').sortable({handle:'img', items:'span.image', placeholder: 'editor-highlight', opacity:'0.6', axis:'x'});
	
	// setup paste
	$('[contentEditable=true]').paste();
}

// appends content to the editor
triangulate.editor.append = function(html){ 

	// set reference to element
	var el = triangulate.editor.el;
	
	// if dragged placeholder exists
	if($('#editor-placeholder').length > 0){
		var node = $('#editor-placeholder');
		
		var temp = $(node).after(html).get(0);
		
		var added = $(temp).next();
		
		$('[contentEditable=true], input, textarea').blur();
		$(added).find('[contentEditable=true], input, textarea').first().focus();
		
		$(node).remove();
		
		triangulate.editor.currNode = $(added);
	}
	else{
		var blocks = $(el).find('div.block');
		var length = blocks.length;
		
		// appends it toe currnode (if set) or the last block if not set
		if(triangulate.editor.currNode){
		
			var temp = $(triangulate.editor.currNode).after(html).get(0);
			
			var added = $(temp).next();
			
			$('[contentEditable=true], input, textarea').blur();
			$(added).find('[contentEditable=true], input, textarea').first().focus();
			
			triangulate.editor.currNode = $(added);
		
		}
		else if(length>0){  
			var curr = blocks[length-1]; // get last block
			
			var cols = $(curr).find('div.col');
			
			if(cols.length>0){
				curr = $(cols[0]);
				triangulate.editor.currNode = $(html).appendTo(curr);
			}
			
			// arrh! focus!
			$(curr).find('[contentEditable=true], input, textarea').focus();
		}
	}

}

// gets the current description for the content in the editor
triangulate.editor.getDescription = function(){ 

	var el = triangulate.editor.el;

	// get dom element if need be
	if(el.jquery){
		el = el.get(0);
	}
	
	var divs = $(el).find('div.p');
	
	var desc = '';

	for(var x=0; x<divs.length; x++){
		desc += $.trim($(divs[x]).find('div').text());
	}

	if(desc.length>200){
		desc = desc.substring(0, 200) + '...';
	}
	
	return desc;
	
}

// gets the primary image (first) for the editor
triangulate.editor.getPrimaryImage = function(){

	var el = triangulate.editor.el; 

	// get dom element if need be
	if(el.jquery){
		el = el.get(0);
	}
	
	// get the first image
	var imgs = $(el).find('div.block .img img');
	
	if(imgs.length==0){
		imgs = $(el).find('div.block span.image img');
	}
	
	var image = '';
	
	if(imgs && imgs.length>0){
		var parts = imgs[0].src.split('/');
		
		if(parts.length>0){
			image = parts[parts.length-1];
		}
	}
	
	if(image.substr(0,2)=='t-'){
		image = image.substr(2);
	}
	
	return image;
}

// get headlines from content
triangulate.editor.getTranslations = function(prefix){
	
	var el = triangulate.editor.el;
	
	var els = $(el).find('.triangulate-h1, .triangulate-h2, .triangulate-h3, .triangulate-h4, .triangulate-h5, .triangulate-p, .triangulate-q');
	
	var translations = {};
	
	
	for(x=0; x<els.length; x++){
	
		var id = $(els[x]).attr('id');
	
		// add to array
		if(id != '' && id != undefined){
		
			// get content to be translated
			var html = $(els[x]).find('[contentEditable=true]').html();
		
			// trim content
			html = $.trim(html);
			
			// create translation 
			translations[prefix + id] = html;
		}
		
	}
	
	return translations;
}


// gets the content from the editor
triangulate.editor.getContent = function(){ 

	var el = triangulate.editor.el;

	// get dom element if need be
	if(el.jquery){
		el = el.get(0);
	}
	
	var html = '';
		
	// gets html for a given block
	function getBlockHtml(block){
	
		var newhtml = '';
	  
	  	var divs = $(block).find('div');
	  
	  	for(var x=0; x<divs.length; x++){
	  	
	  		var cssClass = $(divs[x]).attr('class');
	  	
	  		if(cssClass != undefined){
	  			var classes = $(divs[x]).attr('class').split(' ');
	  		
		  		if(classes.length > 0){
			  		cssClass = classes[0];
		  		}
		  		
		  		// get index from the menu
		  		var i = utilities.getIndexByAttribute(triangulate.editor.menu, 'class', cssClass);
		  		
		  		// execute the generate method for the plugin
		  		if(i != -1){
			  		var action =triangulate.editor.menu[i].action + '.generate';
			  		var node = divs[x];
			  		
			  		try{
			  			var html = utilities.executeFunctionByName(action, window, node);
			  			newhtml += html;
			  		}
			  		catch(e){
				  		console.log('[triangulate.Editor.generate] parse, error=' + e.message);
			  		}
		  		}
		  		
		  	}
	  				
	  	}
	
	  	return newhtml;
	}
	
	var blocks = $(el).find('div.block');
	
	// walk through blocks
	for(var y=0; y<blocks.length; y++){
	  	var id = $(blocks[y]).attr('id');
	  	var cssclass = $(blocks[y]).attr('data-cssclass');
	
	  	if(cssclass==undefined || cssclass=='')cssclass = '';
	
	  	if(cssclass!=''){
	  		cssclass = ' ' + cssclass;
	  	}
	  
	  	if(id==undefined || id=='')id='block-'+y;
	  	
	  	// set nested
	  	var nested = $(blocks[y]).attr('data-nested');
	  	var containerId = $(blocks[y]).attr('data-containerid');
	  	var containerCssClass = $(blocks[y]).attr('data-containercssclass');
	  	
	  	// check undefined
	  	if(nested == undefined){
			nested = 'not-nested';
		}
		
		if(containerId == undefined){
			containerId = '';
		}
		
		if(containerCssClass == undefined){
			containerCssClass = '';
		}
		
		// set defaults to blank
		var containerIdHtml = '';
		var containerClassHtml = '';
		
		// if an id is specified build html for it
		if($.trim(containerId) != ''){
			containerIdHtml = ' id="' + containerId + '"';
		}
		
		// add a space to separate it from .container
		if($.trim(containerCssClass) != ''){
			containerClassHtml = ' ' + containerCssClass;
		}
		
		// add container for nested blocks
	  	if(nested == 'nested'){
		  	html += '<div' + containerIdHtml + ' class="container' + containerClassHtml + '">';
	  	}
	  	
	  	// row HTML
	  	html += '<div id="'+id+'" class="block row' + cssclass + '" ' +
	  			'data-nested="' + nested + '" ' +
	  			'data-containerid="' + containerId + '" ' +
	  			'data-containercssclass="' + containerCssClass + '"' +
	  			'>';
	  
	  	// determine if there are columns
	  	var cols = $(blocks[y]).find('.col');
	
	  	if(cols.length==0){
			html += getBlockHtml(blocks[y]);
	  	}
	  	else{
			for(var z=0; z<cols.length; z++){
		  		var className = $(cols[z]).attr('class').replace(' sortable', '').replace(' ui-sortable', '');
		  
		  		html += '<div class="'+className+'">';
		  		html += getBlockHtml(cols[z]);
		  		html += '</div>';
			}
	  	}
	
	  	html+= '</div>';
	  	
	  	// close container
	  	if(nested == 'nested'){
		  	html += '</div>';
	  	}
	
	}
	
	return html;
	
}

// generates a unique id for elements 
triangulate.editor.generateUniqId = function(className, prefix, offset){

	var el = triangulate.editor.el;

	// set a default
	if(offset === undefined || offset === null){
		offset = 0;
	}
	
	// get dom element
	if(el.jquery){
		el = el.get(0);
	}
	
	var length = $(el).find('.'+className).length + 1 + offset;
	var uniqId = triangulate.editor.prefix+prefix +'-'+ length;
	
	// find a uniqId
	while($('#'+uniqId).length > 0){
		length++;
		uniqId = prefix +'-'+ length;
	}
	
	return uniqId;
}

// build the editor
triangulate.editor.build = function(){

	var el = triangulate.editor.el;
	var menu = triangulate.editor.menu
	
	// get dom element
	if(el.jquery){
		el = el.get(0);
	}

  	if(triangulate.editor.debug == true){
	  	console.log('[triangulate.editor] enter Build');
  	}
  	
  	// adds the editor class
  	$(el).addClass('editor');
  	
  	if(triangulate.editor.debug == true){
	  	console.log('[triangulate.editor] before ParseHTML');
  	}
  
	// parse HTML
	var response = triangulate.editor.parseHTML();
	
	// set HTML
  	$(el).html(response); 
  	
  	// trigger contentLoaded
	$(el).trigger('triangulate.editor.contentLoaded');
  	
  	// enable tooltip
  	if(!Modernizr.touch){ 
  		$('#editor-menu a').tooltip({container: 'body', placement: 'bottom'});
  	}
  	
  	if(triangulate.editor.debug == true){
	  	console.log('[triangulate.editor] before setupMenuEvents');
  	}
	
	// setup menu item events
	triangulate.editor.setupMenuEvents(el);
	
	if(triangulate.editor.debug == true){
	  	console.log('[triangulate.editor] before setupPersistentEvents');
  	}
	
	// setup persistent events
	triangulate.editor.setupPersistentEvents(el);
	
	if(triangulate.editor.debug == true){
	  	console.log('[triangulate.editor] before setupPlugins');
  	}
	
	triangulate.editor.setupPlugins();
	
}

// build the editor
triangulate.editor.refresh = function(){

	var el = triangulate.editor.el;

	// parse HTML
	var response = triangulate.editor.parseHTML();
	
	// set HTML
  	$(el).html(response);
  	
  	// re-init sortable
	setupSortable();

}