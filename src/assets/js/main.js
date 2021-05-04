/*
	Intensify by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly').scrolly({
				offset: function() {
					return $header.height();
				}
			});

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right'
				});

	});

})(jQuery);



////////////////
function deleteurl(id)
{
	var userid = '7364';
 //  alert(id);return false ; 
	swal({
  title: "Are you sure?",
  text: "Once deleted, you will not be able to recover this url!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
   
		$.ajaxSetup ({cache: false});
	 $.ajax({
					type: "POST",
					url: base_url + "index.php/shorten/deleteurl/"+id+"/"+userid,
					  dataType:"html",
				   beforeSend : function(){
			   // document.getElementById('page_loader').style.display='block';
				$('.loader_mask').fadeIn('slow'); 
				// $("html, body").animate({ scrollTop: 180 }, "slow");
			},
					success:
					function(data){
						 $('.loader_mask').hide(); 
					 //   alert (data); return false ;
						
					  swal("Your url has been deleted!!", "", "success");
						
						$("#mainurl").html(data);
						
					  
					}
				});
				
				
				
	
  } //else {
   // swal("Your imaginary file is safe!");
// }
});
	
	
	
}