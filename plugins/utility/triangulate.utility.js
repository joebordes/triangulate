// create namespace
var triangulate = triangulate || {};
triangulate.utility = triangulate.utility || {};

// load utility
triangulate.utility.load = {

	pageId: null,

	// init
	init:function(){
		
		$(document).on('click', '#selectPage li', function(){
			var pageId = $(this).attr('data-pageid');

			triangulate.utility.load.pageId = pageId;

			$('#selectPage li').removeClass('selected');
			$(this).addClass('selected');
		});
		
		$(document).on('click', '#selectThemePage li', function(){
			var location = $(this).attr('data-location');

			triangulate.utility.load.location = location;

			$('#selectThemePage li').removeClass('selected');
			$(this).addClass('selected');
		});

		$(document).on('click', '#loadLayout', function(){

			if(triangulate.utility.load.pageId==-1){
				message.showMessage('error');
				return;
			}

			$.ajax({
				url: triangulate.editor.api +  '/page/content/retrieve',
				type: 'POST',
				beforeSend : function(xhr) {
				 	xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
			    },
				data: {pageId: triangulate.utility.load.pageId},
				success: function(data){
				
					// update html
					$(triangulate.editor.el).html(data);
					
					// refresh editor
	    			triangulate.editor.refresh();

					// hide modal
					$('#loadLayoutDialog').modal('hide');
				}
			});

		});
		
		$(document).on('click', '#loadLayoutFromTheme', function(){

			if(triangulate.utility.load.location==null){
				message.showMessage('error');
				return;
			}

			$.ajax({
				url: triangulate.editor.api + '/theme/page/content',
				type: 'post',
				beforeSend : function(xhr) {
				 	xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.token);
			    },
				data: {location: triangulate.utility.load.location},
				success: function(data){
					
					// update editor
					$(triangulate.editor.el).html(data);
					
					// create editor
	    			triangulate.editor.refresh();

					$('#loadLayoutDialog').modal('hide');
				}
			});

		});
		
		$(document).on('click', '#loadLayoutFromCode', function(){
		
			var data = $('#load-code').val();
		
			$(triangulate.editor.el).html(data);
			
			// create editor
			triangulate.editor.refresh();

			$('#loadLayoutDialog').modal('hide');
			

		});
		
	},

	// creates bold text
	create:function(){
	
		// reset segmented control
		//utilities.resetSegmentedControl('#loadLayoutDialog .segmented-control');
		
		// get the content and image from the editor
		var content = triangulate.editor.getContent();
		
		// style content
		$('#load-code').val(style_html(content));
		
		
		// get scope from page
		var scope = angular.element($("section.main")).scope();
		
		scope.retrievePages();
		scope.retrievePagesForTheme();
		
	
		// show the dialog
		$('#loadLayoutDialog').modal('show');
		
	}
	
};

triangulate.utility.load.init();

// load utility
triangulate.utility.layout = {

	init:function(){
		// create COLS
		$(document).on('click', '.cols5050', function(){
		
			var uniqId = triangulate.editor.generateUniqId('block', 'block');
			
			var html = '<div id="'+uniqId+'" class="block row" data-nested="not-nested" data-containerid=""  data-containercssclass="">' +
					'<div class="col col-md-6 sortable">' +
					'</div>' +
					'<div class="col col-md-6 sortable">' +
					'</div>' +
					'<span class="block-actions"><span>#'+ uniqId + ' .block.row</span>' + 
					triangulate.editor.defaults.blockMenu + '</span></div>';
					
			
			// append to editor
			$(triangulate.editor.el).append(
				html
			);
			
			// re-init sortable
			triangulate.editor.setupSortable();
			
			// reset triangulate.editor.currNode (new content should be added to the end)
			triangulate.editor.currNode = null;
			
			// hide modal
			$('#layoutDialog').modal('hide'); 
		});
	
		// create COLS 7/3
		$(document).on('click', '.cols73', function(){
		
			var uniqId = triangulate.editor.generateUniqId('block', 'block');
			
			var html = '<div id="'+uniqId+'" class="block row" data-nested="not-nested" data-containerid=""  data-containercssclass="">' +
							'<div class="col col-md-9 sortable">' +
							'</div>' +
							'<div class="col col-md-3 sortable">' +
							'</div>' +
							'<span class="block-actions"><span>#'+ uniqId + ' .block.row</span>' +
							triangulate.editor.defaults.blockMenu + '</span></div>';
			
			// append to editor
			$(triangulate.editor.el).append(
				html
			);
			
			// re-init sortable
			triangulate.editor.setupSortable();
			
			// reset triangulate.editor.currNode (new content should be added to the end)
			triangulate.editor.currNode = null;
			
			// hide modal
			$('#layoutDialog').modal('hide');  
		});
		
		// create COLS 3/7
		$(document).on('click', '.cols37', function(){
		
			var uniqId = triangulate.editor.generateUniqId('block', 'block');
			
			var html = '<div id="'+uniqId+'" class="block row" data-nested="not-nested" data-containerid=""  data-containercssclass="">' +
							'<div class="col col-md-3 sortable">' +
							'</div>' +
							'<div class="col col-md-9 sortable">' +
							'</div>' +
							'<span class="block-actions"><span>#'+ uniqId + ' .block.row</span>' +
							triangulate.editor.defaults.blockMenu + '</span></div>';
			
			// append to editor
			$(triangulate.editor.el).append(
				html
			);
			
			// re-init sortable
			triangulate.editor.setupSortable();
			
			// reset triangulate.editor.currNode (new content should be added to the end)
			triangulate.editor.currNode = null;
			
			// hide modal
			$('#layoutDialog').modal('hide');  
		});
	
		// create COLS 3/3/3
		$(document).on('click', '.cols333', function(){
		
			var uniqId = triangulate.editor.generateUniqId('block', 'block');
			
			var html = '<div id="'+uniqId+'" class="block row" data-nested="not-nested" data-containerid=""  data-containercssclass="">' +
							'<div class="col col-md-4 sortable">' +
							'</div>' +
							'<div class="col col-md-4 sortable">' +
							'</div>' +
							'<div class="col col-md-4 sortable">' +
							'</div>' +
							'<span class="block-actions"><span>#'+ uniqId + ' .block.row</span>' +
							triangulate.editor.defaults.blockMenu + '</span></div>';
			
			// append to editor
			$(triangulate.editor.el).append(
				html
			);
			
			// re-init sortable
			triangulate.editor.setupSortable();
			
			// reset triangulate.editor.currNode (new content should be added to the end)
			triangulate.editor.currNode = null;
			
			// hide modal
			$('#layoutDialog').modal('hide'); 
			
		});
		
		// create COLS 4*25
		$(document).on('click', '.cols425', function(){
		
			var uniqId = triangulate.editor.generateUniqId('block', 'block');
			
			var html = '<div id="'+uniqId+'" class="block row" data-nested="not-nested" data-containerid=""  data-containercssclass="">' +
							'<div class="col col-md-3 sortable">' +
							'</div>' +
							'<div class="col col-md-3 sortable">' +
							'</div>' +
							'<div class="col col-md-3 sortable">' +
							'</div>' +
							'<div class="col col-md-3 sortable">' +
							'</div>' +
							'<span class="block-actions"><span>#'+ uniqId + ' .block.row</span>' +
							triangulate.editor.defaults.blockMenu + '</span></div>'; 
			
			// append to editor
			$(triangulate.editor.el).append(
				html
			);
			
			// re-init sortable
			triangulate.editor.setupSortable();
			
			// reset triangulate.editor.currNode (new content should be added to the end)
			triangulate.editor.currNode = null;
			
			// hide modal
			$('#layoutDialog').modal('hide');  
		});
		
		// create SINGLE COL
		$(document).on('click', '.single', function(){
		
			var uniqId = triangulate.editor.generateUniqId('block', 'block');
			
			var html = '<div id="'+uniqId+'" class="block row" data-nested="not-nested" data-containerid=""  data-containercssclass="">' +
					'<div class="col col-md-12 sortable"></div>' +
					 '<span class="block-actions"><span>#'+ uniqId + ' .block.row</span>' +
					 triangulate.editor.defaults.blockMenu + '</span></div>';
			
			// append to editor
			$(triangulate.editor.el).append(
				html
			);
			
			// re-init sortable
			triangulate.editor.setupSortable();
			
			// reset triangulate.editor.currNode (new content should be added to the end)
			triangulate.editor.currNode = null;
			
			// hide modal
			$('#layoutDialog').modal('hide'); 
		});
		
	},

	// creates bold text
	create:function(){
	
		$('#layoutDialog').modal('show');	
		
	}
	
};

triangulate.utility.layout.init();