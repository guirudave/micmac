/**
 * Radiance Theme JS
 *
 * Dependencies:
 * - hoverintent.jquery.js
 *
 */
/**
 * Look under your chair! console.log FOR EVERYONE!
 *
 * @see http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
 */
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());



/**
 * Page-specific call-backs
 * Called after dom has loaded.
 */
var RADIANCE = {

  common : {
    init: function(){
      $('html').removeClass('no-js').addClass('js');
      setupDropdownMenus();
      //searchPlaceholder();

      $('.nav-arrow', '#top-menu').each( function(){
        $(this).css('top', Math.ceil($(this).parent(2).height()/2) + 1);
      });
	
    }
  },

  templateIndex : {
    init: function(){
      
    }
  },

  templateProduct : {
    init: function(){
      
    }
  },

  templateCart : {
    init: function(){
      
    }
  }

}

/**
 * Fire function based upon attributes on the body tag.
 * This is the reason for "template{{ template | camelize }}" in layout/theme.liquid
 *
 * @see http://paulirish.com/2009/markup-based-unobtrusive-comprehensive-dom-ready-execution/
 */
var UTIL = {

  fire : function(func,funcname, args){
    var namespace = RADIANCE;
    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function'){
      namespace[func][funcname](args);
    }
  },

  loadEvents : function(){
    var bodyId = document.body.id;

    // hit up common first.
    UTIL.fire('common');

    // do all the classes too.
    $.each(document.body.className.split(/\s+/),function(i,classnm){
      UTIL.fire(classnm);
      UTIL.fire(classnm,bodyId);
    });
  }

};
$(document).ready(UTIL.loadEvents);



/**
 * Balances the height of rows of products/collections.
 * Finds the tallest item in a row, makes each <li> in that row as tall as the tallest.
 */
$.fn.balanceRowHeight = function(numPerRow) {
  var nPerRow = numPerRow || 4;
  var nItems = $(this).find('li').length;
  var nRows = Math.round( nItems / nPerRow );

  for( var row = 1; row <= nRows; row++ ){
    var min = row * nPerRow - nPerRow;
    var max = row * nPerRow;
    var tallestInRow = 0;
    var tallestTitleInRow = 0;

    $(this).find('li').slice(min, max).each(function(){
      if( $(this).height() > tallestInRow ){
        tallestInRow = $(this).height();
      }
      if( $(this).find('.product-information:first').height() > tallestTitleInRow ){
        tallestTitleInRow = $(this).find('.product-information').height();
      }
    }).height(tallestInRow).addClass('generated-height');
  }

  return this;
};

/**
 * Balance product grid height after all images have loaded.
 */
$(window).load( function(){
  
});

$(function(){
  
  var input = $('input#s');
  var divInput = $('div.input');
  var width = divInput.width();
  var submit = $('#searchSubmit');
  var txt = input.val();
  
  input.bind('focus', function() {
    if(input.val() === txt) {
      input.val('');
    }
    $(this).animate({color: '#000'}, 300); // text color
    $(this).parent().animate({
      width: '80px',
      backgroundColor: '#fff', // background color
      paddingRight: '43px'
    }, 300, function() {
      if(!(input.val() === '' || input.val() === txt)) {
        if(!($.browser.msie && $.browser.version < 9)) {
          submit.fadeIn(300);
        } else {
          submit.css({display: 'block'});
        }
      }
    }).addClass('focus');
  }).bind('blur', function() {
    $(this).animate({color: '#b4bdc4'}, 300); // text color
    $(this).parent().animate({
      width: width + 'px',
      backgroundColor: '#fff', // background color
      paddingRight: '15px'
    }, 300, function() {
      if(input.val() === '') {
        input.val(txt)
      }
    }).removeClass('focus');
    if(!($.browser.msie && $.browser.version < 9)) {
      submit.fadeIn(100);
    } else {
      submit.css({display: 'block'});
    }
  }).keyup(function() {
    if(input.val() === '') {
      if(!($.browser.msie && $.browser.version < 9)) {
        submit.fadeIn(300);
      } else {
        submit.css({display: 'block'});
      }
    } else {
      if(!($.browser.msie && $.browser.version < 9)) {
        submit.fadeIn(300);
      } else {
        submit.css({display: 'block'});
      }
    }
  });
});

/**
 * Support for dropdown menus
 */
function setupDropdownMenus(){
  $('#top-menu .has-dropdown').hoverIntent( navRollOver, navRollOut );

  function navRollOver(e){
    $(this).addClass('active').find('ul:first').css('top', $(this).height()).show();
  }
  function navRollOut(e){
    $(this).removeClass('active').find('ul:first').hide();
  }

}


/**
 * Popup notify add-to-cart
 */
function notifyProduct($info){
  var wait = setTimeout(function(){
    $.jGrowl($info,{life: 5000});	
  },1000);
}

/**
 *add-to-cart
 */
function AddToCart(){
	$('body').on('click', '.add-to-carts',function(e) {

	  if (typeof e !== 'undefined') e.preventDefault();

	  var form      = $(this).parents('form');
	  var cartURL = './ajax/_product-cart.html';
	  $.ajax({
				type: 'GET',
				url: cartURL,
				success: function (data) {
				  notifyProduct(data);
				},
				dataType: "html"
			});
	  
	  var thumbnail = form.parents('.thumbnail-fly').find('.thumbnail').find('img').first();
	  
	  if(thumbnail.attr('src')) {
		flyToCart(thumbnail);
	  }
	  else {
		thumbnail = form.parents('#product-information').parent().find('#product_flex').find('.slides .active').find('img').first();
		if(thumbnail.attr('src')) {
		  flyToCart(thumbnail);
		}
	  }
	  
	  $.fancybox.close();
	  });
}

function flyToCart(imgobj){
  
  if(imgobj){
    var imgsrc = imgobj.attr('src');

    imgobj.animate_from_to('#umbrella .cart-link', {
      pixels_per_second: 700, 
      initial_css: {
        'image': imgsrc
      },
      callback: function(){
      }
    });
  }
}

function addToCartFail(jqXHR, textStatus, errorThrown){
  var response = $.parseJSON(jqXHR.responseText);
  
  var $info = '<div class="error">'+ response.description +'</div>';
  notifyProduct($info);
}

/**
 * Enable placeholder switcheroo in older browsers.
 * @see http://webdesignerwall.com/tutorials/cross-browser-html5-placeholder-text
 */
/*function searchPlaceholder(){

  if(!Modernizr.input.placeholder){
    $('#top-search-input').focus(function() {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
      input.val('');
      input.removeClass('placeholder');
      }
    }).blur(function() {
      var input = $(this);
      if (input.val() == '' || input.val() == input.attr('placeholder')) {
      input.addClass('placeholder');
      input.val(input.attr('placeholder'));
      }
    }).blur();
    $('[placeholder]').parents('form').submit(function() {
      $(this).find('[placeholder]').each(function() {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
        input.val('');
      }
      })
    });
  }
}*/
jQuery(document).ready(function($) {
	AddToCart();
});