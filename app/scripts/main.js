$(document).ready(function() {
  window.onscroll=function(){
      if (document.body.scrollTop > 0) {
        document.getElementById('navbar').className = 'wrapper scroll';
      }
      else {
          document.getElementById('navbar').className = "wrapper";
      }
  };

    $('#fullpage').fullpage({
      //Navigation
      menu: false,
      lockAnchors: false,
      anchors:['home', 'about', 'skills', 'works', 'interests', 'contact'],
      navigation: false,
      navigationPosition: 'right',
      navigationTooltips: ['firstSlide', 'secondSlide'],
      showActiveTooltip: false,
      slidesNavigation: true,
      slidesNavPosition: 'bottom',

      //Scrolling
      css3: false,
      scrollingSpeed: 1200,
      autoScrolling: true,
      fitToSection: true,
      fitToSectionDelay: 1000,
      scrollBar: false,
      easing: 'easeInOutExpo',
      easingcss3: 'ease',
      loopBottom: false,
      loopTop: false,
      loopHorizontal: true,
      continuousVertical: false,
      normalScrollElements: '#element1, .element2',
      scrollOverflow: false,
      touchSensitivity: 15,
      normalScrollElementTouchThreshold: 5,

      //Accessibility
      keyboardScrolling: true,
      animateAnchor: true,
      recordHistory: true,

      //Design
      controlArrows: true,
      verticalCentered: true,
      resize : false,
      paddingTop: '0',
      paddingBottom: '0',
      fixedElements: 'h2, .footer',
      responsiveWidth: 0,
      responsiveHeight: 0,

      //Custom selectors
      sectionSelector: '.section',
      slideSelector: '.slide',

      //events
      onLeave: function(index, nextIndex, direction){},
      afterLoad: function(anchorLink, index){},
      afterRender: function(){},
      afterResize: function(){},
      afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
      onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
  });
});
