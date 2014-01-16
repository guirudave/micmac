jQuery(document).ready(function($) {
    //navigation mobile
    $(".toggleMenu").click(function(e) {
      e.preventDefault();
      $(this).toggleClass("active");
      $(".nav-mobile").slideToggle('slow');
    });
    adjustMenu();
    
    //login popup
    loginPopup();
    
    //main slideshow
    $('#homepage_slider').flexslider({
      controlNav: false,
      animation: "slide",
      slideshow: "true",
      slideshowSpeed: 5*1000,
      after: function(slider) {
      /* auto-restart player if paused after action */
      if (!slider.playing) {
      slider.play();
    }
                                     }
                                     });
    
    //home tabs
    $(".head_tabs").click(function() {
      
      if(!$(this).parent().hasClass('active')) {
        //  First remove class "active" from currently active tab
        $(".head_tabs").parent().removeClass("active");
        
        //  Here we get the data-src(parent) value of the selected tab
        var $src_tab = $(this).attr("data-src");
        
        //  Now add class "active" to the selected/clicked tab
        $($src_tab).parent().addClass("active");
        
        //  Hide all tab content
        $(".content_tabs").hide();
        
        //  Here we get the href value of the selected tab
        var $selected_tab = $(this).attr("href");
        
        //  Show the selected tab content
        if(isMobile.any())
          $($selected_tab).show();
        else
          $($selected_tab).fadeIn();
        
        // Scroll to content
        $('html, body').animate({
          scrollTop: $($selected_tab).offset().top - 100
        }, 300); 
        
        //  Here we get the href value of the selected tab
        var $selected_carousel = $(this).attr("data-crs");
        
        // Update the selected carsoule content
        if($selected_carousel != ""){
          
          //	Here we call function "execCarousel"
          execCarousel($selected_carousel);
        }
        
        
      }
      
      //  At the end, we add return false so that the click on the link is not executed
      return false;
    });
    
    //	Here we init carousel, call function "initCarousel"
    initCarousel();
    
    //featured categories
    if($("#featured-collections").length){
      $("#featured-collections").carouFredSel({
        circular: false,
        infinite: false,
        responsive: true,
        //mousewheel: true,
        width: '100%',
        prev: '#prev-ft-collections',
        next: '#next-ft-collections',
        auto: false,
        swipe: {
          onMouse: true,
          onTouch: true
        },
        items: {
          width: 300,
          height: 430,	//	optionally resize item-height
          visible: {
            min: 1,
            max: 4
          }
        },
        scroll: {
          onBefore: function(){
            if(touch == false){
              var that = $("#featured-collections");
              var items = that.find('.not-animated');
              items.removeClass('not-animated').unbind('appear');
              
              items = that.find('.animated');
              items.removeClass('animated').unbind('appear');
            }
          }
        }
      });
    }
    
    //logo slider
    if($("#logo-slider").length){
      $("#logo-slider").carouFredSel({
        circular: false,
        infinite: false,
        responsive: true,
        //mousewheel: true,
        width: '100%',
        prev: '#prev-logo-slider',
        next: '#next-logo-slider',
        auto: false,
        swipe: {
          onMouse: true,
          onTouch: true
        },
        items: {
          width: 160,
          height: 100,	//	optionally resize item-height
          visible: {
            min: 1,
            max: 6
          }
        },
        scroll: {
          onBefore: function(){
            if(touch == false){
              var that = $("#logo-slider");
              var items = that.find('.not-animated');
              items.removeClass('not-animated').unbind('appear');
              
              items = that.find('.animated');
              items.removeClass('animated').unbind('appear');
            }
          }
        }
      });
    }
    
    //fancybox
    $(".fancybox").fancybox({
      'hideOnContentClick': true,
      padding: 0
    });
    $(".quick_shop").fancybox({
      width: '900px',
      height: '660px',
      autoSize: false,
      padding: 10
    });
    
    //image thumb
    if($('#carousel-product').length){
      $('#carousel-product').carouFredSel({
        circular: false,
        infinite: false,
        responsive: true,
        //mousewheel: true,
        width:'100%',
        auto: false,
        swipe: {
          onMouse: true,
          onTouch: true
        },
        items: {
          visible: {
            width:82,
            height: 100,
            min: 1,
            max: 6
          }
        }
      });
    }
    
    $('#carousel-product li').click(function() {
      if(!$(this).hasClass('active')){
        $('#product_flex li').removeClass('active').hide();
        var img = $(this).attr('data-img');
        $(img).fadeIn().addClass('active');
        
        $('#carousel-product li').removeClass('active');
        $(this).addClass('active');
      }
    });
    
    //related item
    if(getWidthBrowser() < 1024){
      $('#prod-related').trigger('destroy', true);
      initReletedCarousel(350);
    }
    else {
      $('#prod-related').trigger('destroy', true);
      initReletedCarousel(270);
    }
    
    //Featured Product
    if(getWidthBrowser() < 1024){
      $('#product-sliders').trigger('destroy', true);
      initFeaturedProductsCarousel(350);
    }
    else {
      $('#product-sliders').trigger('destroy', true);
      initFeaturedProductsCarousel(300);
    }
    
    //slider footer
    if($("#bt-slider").length){
      $("#bt-slider").carouFredSel({
        circular: false,
        infinite: false,
        responsive: true,
        //mousewheel: true,
        width: '100%',
        prev: '#prev-bt-slider',
        next: '#next-bt-slider',
        auto: false,
        swipe: {
          onMouse: true,
          onTouch: true
        },
        items: {
          width: 340,
          height: 190,	//	optionally resize item-height
          visible: {
            min: 1,
            max: 3
          }
        },
        scroll: {
          onBefore: function(){
            if(touch == false){
              var that = $("#bt-slider");
              var items = that.find('.not-animated');
              items.removeClass('not-animated').unbind('appear');
              
              items = that.find('.animated');
              items.removeClass('animated').unbind('appear');
            }
          }
        }
      });
      
      var li_slider = $('#bt-slider').find('li');
      li_slider.each(function( index ) {
        switch(index % 3){
          case 0:
            $(this).addClass('text-left');
            break;
            
          case 1: 
            $(this).addClass('text-center');
            break;
            
          case 2: 
            $(this).addClass('text-right');
            break;
        }
      });
    }
});
  
  
  // Twitter
  !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
  
  
  var hideTwitterAttempts = 0;
  function hideTwitterBoxElements() {
    setTimeout( function() {
      if ( $('[class*=twitter-timeline]').length ) {
        $('[class*=twitter-timeline]').each( function(){
          
          $(this).css({'width': '100%'});
          var ibody = $(this).contents().find('body' );            
          if ( ibody.find('.timeline .stream .h-feed li.tweet').length ) {
            ibody.find('.p-name').css({'font-size': '12px', 'color': '#87d3d4'});
            ibody.find('.e-entry-title').css({'font-size': '12px', 'color': '#6d718b'});
          }
          else {
            $(this).hide();
          }
        });
      }
      hideTwitterAttempts++;
      if ( hideTwitterAttempts < 3 ) {
        hideTwitterBoxElements();
      }
    }, 1500);
  }
  
  // somewhere in your code after html page load
  hideTwitterBoxElements();
  
  //search
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
  
  function initFeaturedProductsCarousel(width){
    if($("#product-sliders").length){
      $("#product-sliders").carouFredSel({
        circular: false,
        infinite: false,
        responsive: true,
        
        //mousewheel: true,
        width: '100%',
        prev: '#prev-product-slider',
        next: '#next-product-slider',
        auto: false,
        swipe: {
          onMouse: true,
          onTouch: true
        },
        items: {
          width: width,
          height: 450,	//	optionally resize item-height
          visible: {
            min: 1,
            max: 4
          }
        },
        scroll: {
          onBefore: function(){
            if(touch == false){
              var that = $("#product-sliders");
              var items = that.find('.not-animated');
              items.removeClass('not-animated').unbind('appear');
              
              items = that.find('.animated');
              items.removeClass('animated').unbind('appear');
            }
          }
        }
      });
    }
  }
  function execCarousel($carousel) {
    if($($carousel).length){
      $($carousel).carouFredSel({
        responsive: true,
        circular: false,
        infinite: false,
        width: '100%',
        prev: $($carousel).attr("data-prev"),
        next: $($carousel).attr("data-next"),
        auto: false,
        swipe:{
          onMouse:true,
          onTouch: true
        },
        items: {
          width: 300,
          visible: {
            min: 1,
            max: 4
          }
        },
        scroll: {
          onBefore: function(){
            if(touch == false){
              var that = $($carousel);
              var items = that.find('.not-animated');
              items.removeClass('not-animated').unbind('appear');
              
              items = that.find('.animated');
              items.removeClass('animated').unbind('appear');
            }
          }
        }
      });
    }
  }
  
  //	Here we init all the carousel
  function initCarousel()
  {
    //	Only init the carousel for the content in actived tab, because after click the tab, we will init it again
    var $tabs = $("#tabs li.active").first();
    
    //  Here we get the data-crs(carousel) value of the selected tab
    var $carousel = $($tabs).find("a").attr("data-crs");
    
    //	Here we call function "execCarousel"
    execCarousel($carousel);
  }
  
  //	Here we exec the carousel
  function execCarousel($carousel) {
    if($($carousel).length){
      $($carousel).carouFredSel({
        responsive: true,
        circular: false,
        infinite: false,
        width: '100%',
        prev: $($carousel).attr("data-prev"),
        next: $($carousel).attr("data-next"),
        auto: false,
        swipe:{
          onMouse:true,
          onTouch: true
        },
        items: {
          width: 300,
          visible: {
            min: 1,
            max: 4
          }
        },
        scroll: {
          onBefore: function(){
            if(touch == false){
              var that = $($carousel);
              var items = that.find('.not-animated');
              items.removeClass('not-animated').unbind('appear');
              
              items = that.find('.animated');
              items.removeClass('animated').unbind('appear');
            }
          }
        }
      });
    }
  }
  
  function initReletedCarousel(width){
    if($("#prod-related").length){
      $("#prod-related").carouFredSel({
        circular: false,
        infinite: false,
        responsive: true,
        //mousewheel: true,
        width: '100%',
        prev: '#prev-prod-related',
        next: '#next-prod-related',
        auto: false,
        swipe: {
          onMouse: false,
          onTouch: true
        },
        items: {
          width: 270,
          height:440,
          visible: {
            min: 1,
            max: 3
          }
        },
        scroll: {
          onBefore: function(){
            if(touch == false){
              var that = $("#prod-related");
              var items = that.find('.not-animated');
              items.removeClass('not-animated').unbind('appear');
              
              items = that.find('.animated');
              items.removeClass('animated').unbind('appear');
            }
          }
        }
      });
    }
  }
  
  
  var adjustMenu = function() {
    if(getWidthBrowser() < 1024 || isMobile.any()){
      $(".toggleMenu").css("display", "inline-block");
      if (!$(".toggleMenu").hasClass("active")) {
        $(".nav-mobile").hide();
      } else {
        $(".nav-mobile").show();
      }
      $(".nav-mobile li").unbind('mouseenter mouseleave');
      $(".nav-mobile li a.parent .nav-arrow").unbind('click').bind('click', function(e) {
        // must be attached to anchor element to prevent bubbling
        e.preventDefault();
        
        var $parent = $(this).parent();
        
        if($parent.hasClass('toggle')){
          $parent.removeClass('toggle');
        }else{
          $parent.addClass('toggle'); 
        }
        
        $parent.next().toggle('slow');
      });
    } 
  }
  
  //login popup
  function loginPopup(){
    var button = $('#loginButton');
    var box = $('#loginBox');
    var form = $('#loginBox #customer_login');
    button.removeAttr('href');
    button.mouseup(function(login) {
      box.toggle();
      button.toggleClass('active');
    });
    form.mouseup(function() { 
      return false;
    });
    $(this).mouseup(function(login) {
      if(!($(login.target).parents('#loginButton').length > 0)) {
        button.removeClass('active');
        box.hide();
      }
    });
  }
  
  //resize
  $(window).resize(function() {
    
    $('#homepage_slider').oneTime(500, function() {
      $('#homepage_slider').resize();
      
      $('#homepage_slider').stopTime();
    });
  });
  
  $(window).bind('resize orientationchange', function() {
    ww = document.body.clientWidth;
    adjustMenu();
  });