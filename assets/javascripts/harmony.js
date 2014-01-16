/* SHARED VARS */
var touch = false,
    clickEv = 'click';

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


/* Function set border sidebar */
function harmonySidebarBorder(main, sidebar, line){
  
  jQuery(line).removeAttr('style');
  
  if(getWidthBrowser() > 768){
    var m_height = jQuery(main).outerHeight();
    var s_height = jQuery(sidebar).outerHeight();
    
    var height = 0;
    if(m_height > s_height)
      height = m_height;
    else
      height = s_height;
    
    jQuery(line).css('min-height', height);
  }
}

// handles Animate
function dataAnimate(){
  $('[data-animate]').each(function(){
    
    var $toAnimateElement = $(this);
    
    var toAnimateDelay = $(this).attr('data-delay');
    
    var toAnimateDelayTime = 0;
    
    if( toAnimateDelay ) { toAnimateDelayTime = Number( toAnimateDelay ); } else { toAnimateDelayTime = 200; }
    
    if( !$toAnimateElement.hasClass('animated') ) {
      
      $toAnimateElement.addClass('not-animated');
      
      var elementAnimation = $toAnimateElement.attr('data-animate');
      
      $toAnimateElement.appear(function () {
        
        setTimeout(function() {
          $toAnimateElement.removeClass('not-animated').addClass( elementAnimation + ' animated');
        }, toAnimateDelayTime);
        
      },{accX: 0, accY: -80},'easeInCubic');
      
    }
    
  });
}

/* Function add class */
function harmonyAddClass(main, clss){
  
  jQuery(main).last().addClass(clss);
  
}

/* Fucntion get width browser */
function getWidthBrowser() {
	var myWidth;

	if( typeof( window.innerWidth ) == 'number' ) { 
		//Non-IE 
		myWidth = window.innerWidth;
		//myHeight = window.innerHeight; 
	} 
	else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) { 
		//IE 6+ in 'standards compliant mode' 
		myWidth = document.documentElement.clientWidth; 
		//myHeight = document.documentElement.clientHeight; 
	} 
	else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) { 
		//IE 4 compatible 
		myWidth = document.body.clientWidth; 
		//myHeight = document.body.clientHeight; 
	}
	
	return myWidth;
}


function handleDropdown(){
  
  // Menu
  $(".has-dropdown").hover(function (){
    if(touch == false && getWidthBrowser() > 768 ){
      $(this).find(".submenu").stop(true, true).slideDown(300);
    }
  }, function (){
    if(touch == false && getWidthBrowser() > 768 ){
      $(this).find(".submenu").hide();
    }
  });
  
  // Cart
  $("#umbrella").hover(function (){
    if(touch == false && getWidthBrowser() > 768 ){
      $(this).find("#cart-info").stop(true, true).slideDown(300);
    }
  }, function (){
    if(touch == false && getWidthBrowser() > 768 ){
      $(this).find("#cart-info").hide();
    }
  });
  
  // Login
  $("#accounts .login").hover(function (){
    if(touch == false && getWidthBrowser() > 768 ){
      $(this).find("#loginBox").stop(true, true).slideDown(300);
    }
  }, function (){
    if(touch == false && getWidthBrowser() > 768 ){
      $(this).find("#loginBox").hide();
    }
  });
  
  $("#loginBox input").focus(function() {
    $(this).parents('#loginBox').addClass('focus');
  }).blur(function() {
    $(this).parents('#loginBox').removeClass('focus');
  });
}

$(window).bind('orientationchange',function(e) {
  if(isMobile){
    fixOrientation();
  }
});


function fixOrientation() {
  
  $('.grid_list').find('li').removeClass('active');
  $('.grid_list #lgrid').addClass('active');
  
  $('#collectionListing').removeClass('list').addClass('grid');
  $('#lgrid').click();
}

$(function() {
  
  /* DETECT PLATFORM */
  $.support.touch = 'ontouchend' in document;
  
  if ($.support.touch) {
    touch = true;
    $('body').addClass('touch');
    clickEv = 'touchstart';
  }
  else{
    $('body').addClass('notouch');
    if (navigator.appVersion.indexOf("Mac")!=-1){
      if (navigator.userAgent.indexOf("Safari") > -1){
        $('body').addClass('macos');
      }
      else if (navigator.userAgent.indexOf("Chrome") > -1){
        $('body').addClass('macos-chrome');
      }
        else if (navigator.userAgent.indexOf("Mozilla") > -1){
          $('body').addClass('macos-mozilla');
        }
    }
  }
  
  /* Handle Animate */
  if(touch == false){
    dataAnimate();
  }
  
  /* Handle Dropdown */
  handleDropdown();
  

  $("img.unveil").unveil(300);
  
  /* Quantity */
  $('.selector-wrapper').on('click', '.qty-up', function() {
    var $this = $(this);
    
    var qty = $this.data('src');
    $(qty).val(parseInt($(qty).val()) + 1);
  });
  
  $('.selector-wrapper').on('click', '.qty-down', function() {
    var $this = $(this);
    
    var qty = $this.data('src');
    
    if(parseInt($(qty).val()) > 1)
    	$(qty).val(parseInt($(qty).val()) - 1);
  });

  
  /* Tooltip */
  if($('.tooltip-tipsy').length)
  $('.tooltip-tipsy').tipsy({
    gravity: 'nw',
    fade: true,
    opacity: 1
  });
  
  
  /* Hover opacity */
  $('.opacity_hover .hover').hover(function () {
    
    var opacity = $(this).parents('.opacity_hover').parent().find('.opacity_hover');
    opacity.addClass('opacity_active');
    
    $(this).parents('.opacity_hover').removeClass('opacity_active');
    
  },function () {
    
    var opacity = $(this).parents('.opacity_hover').parent().find('.opacity_hover');
    opacity.removeClass('opacity_active');
    
  });
    
  
  /* Quick Shop hover */
  $('.product-item .list-left').on('mouseover', function() {
    var $this = $(this);
    var $off = $this.offset();
    var $qshop = $this.find('.quick_shop');

    $qshop.css({
      //'top':$qshop.outerHeight(true) + 'px',
      'top':  $this.height() - 50 + 'px',
      'left': (($this.width() / 2) - ($qshop.outerWidth() / 2)) + 'px'
    }).show();
    
  }).on('mouseout', function() {
    var $this = $(this);
    var $qshop = $this.find('.quick_shop');

    $qshop.css({
      'top': '0',
      'left': '0'
    }).hide();
    
  })
  
  $('.thumbnail .list-left').on('mouseover', function() {
    var $this = $(this);
    var $off = $this.offset();
    var $qshop = $this.find('.quick_shop');

    $qshop.css({
      //'top':$qshop.outerHeight(true) + 'px',
      'top':  $this.height() -50 + 'px',
      'left': (($this.width() / 2) - ($qshop.outerWidth() / 2)) + 'px'
    }).show();
    
  }).on('mouseout', function() {
    var $this = $(this);
    var $qshop = $this.find('.quick_shop');

    $qshop.css({
      'top': '0',
      'left': '0'
    }).hide();
    
  });
  
  
  /* Sort by */
  $('#sortForm li.sort').click(function(){  // add event any time the sort box changes
    
    var button = $('#sortButton');
    var box = $('#sortBox');
    
    $('#sortButton span.ssort').html($(this).html());
    
    button.removeClass('active');
    box.hide();
  });
  sortbyPopup();
  function sortbyPopup(){
    var button = $('#sortButton');
    var box = $('#sortBox');
    var form = $('#sortBox #sortForm');
    button.removeAttr('href');
    button.mouseup(function(sort) {
      box.toggle();
      button.toggleClass('active');
    });
    form.mouseup(function() { 
      return false;
    });
    $(this).mouseup(function(sort) {
      if(!($(sort.target).parents('#sortButton').length > 0)) {
        button.removeClass('active');
        box.hide();
      }
    });
  }
  
  
  /* Grid - List */
  $("a.switcher").bind("click", function(e){
    e.preventDefault();
    
    var theid = $(this).attr("id");
    var theproducts = $("#collectionListing");
    var classNames = $(this).attr('class').split(' ');
    
    if($(this).parent().hasClass("active")) {
      // if currently clicked button has the active class
      // then we do nothing!
      return false;
    } 
    else {
      // otherwise we are clicking on the inactive button
      // and in the process of switching views!
      
      if(theid == "gridview") {
        $(this).parent().addClass("active");
        $("#listview").parent().removeClass("active");
        
        // remove the list class and change to grid
        theproducts.removeClass("list");
        theproducts.addClass("grid");
        
      }
      
      else if(theid == "listview") {
        $(this).parent().addClass("active");
        $("#gridview").parent().removeClass("active");
        
        // remove the grid view and change to list
        theproducts.removeClass("grid")
        theproducts.addClass("list");
        
      } 
    }
  });
});