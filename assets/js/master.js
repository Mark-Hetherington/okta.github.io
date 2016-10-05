(function($) {

  $('.mobile-toggle').click(function() {
    $('body').toggleClass('mobile-nav-active');
  });

  $('#top-nav .SearchIcon').on('click', function(e) {
    $(this).parent().toggleClass('search-active');
    $('#top-nav #q').focus();
  });

  $('#top-nav').on('click', '.has-dropdown > a', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).parent().toggleClass('dropdown-active');
  });

  $('.Sidebar-toggle').on('click', function(e) {
    e.stopPropagation();
    $(this).parent().toggleClass('Sidebar-active');
  });

  $('#top-nav').on('click', '.has-dropdown > .dropdown-window', function(e) {
    e.preventDefault();
    e.stopPropagation();
  });

  $('#top-nav #q, .Sidebar h2').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
  });

  $('#top-nav').on('click', '.has-dropdown > .dropdown-window a', function(e) {
    e.stopPropagation();
  });

  $('#top-nav .SearchIcon, .Sidebar a').on('click', function(e) {
    e.stopPropagation();
  });

  $(window).bind('click', function() {
    $('#top-nav .has-dropdown').removeClass('dropdown-active');
    $('#top-nav.search-active').removeClass('search-active');
  });

  $('header, .Sidebar').bind('click', function() {
    $('.Sidebar.Sidebar-active').removeClass('Sidebar-active');
  });

	var initSearch = function() {
		var cx = '005121479574088032773:mmh_vhv8uns';
		var gcse = document.createElement('script');
		gcse.type = 'text/javascript';
		gcse.async = true;
		gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
		'//cse.google.com/cse.js?cx=' + cx;
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(gcse, s);
	}

	initSearch();

})(jQuery);

