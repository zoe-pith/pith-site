
(function() {
  /*! modernizr 3.3.1 (Custom Build) | MIT *
  * http://modernizr.com/download/?-touchevents-setclasses !*/
  !function(e,n,t){function o(e,n){return typeof e===n}function s(){var e,n,t,s,a,i,r;for(var l in c)if(c.hasOwnProperty(l)){if(e=[],n=c[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(s=o(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],r=i.split("."),1===r.length?Modernizr[r[0]]=s:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=s),f.push((s?"":"no-")+r.join("-"))}}function a(e){var n=u.className,t=Modernizr._config.classPrefix||"";if(p&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),p?u.className.baseVal=n:u.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):p?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function r(){var e=n.body;return e||(e=i(p?"svg":"body"),e.fake=!0),e}function l(e,t,o,s){var a,l,f,c,d="modernizr",p=i("div"),h=r();if(parseInt(o,10))for(;o--;)f=i("div"),f.id=s?s[o]:d+(o+1),p.appendChild(f);return a=i("style"),a.type="text/css",a.id="s"+d,(h.fake?h:p).appendChild(a),h.appendChild(p),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(n.createTextNode(e)),p.id=d,h.fake&&(h.style.background="",h.style.overflow="hidden",c=u.style.overflow,u.style.overflow="hidden",u.appendChild(h)),l=t(p,e),h.fake?(h.parentNode.removeChild(h),u.style.overflow=c,u.offsetHeight):p.parentNode.removeChild(p),!!l}var f=[],c=[],d={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){c.push({name:e,fn:n,options:t})},addAsyncTest:function(e){c.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=d,Modernizr=new Modernizr;var u=n.documentElement,p="svg"===u.nodeName.toLowerCase(),h=d._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];d._prefixes=h;var m=d.testStyles=l;Modernizr.addTest("touchevents",function(){var t;if("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch)t=!0;else{var o=["@media (",h.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");m(o,function(e){t=9===e.offsetTop})}return t}),s(),a(f),delete d.addTest,delete d.addAsyncTest;for(var v=0;v<Modernizr._q.length;v++)Modernizr._q[v]();e.Modernizr=Modernizr}(window,document);

  // state
  var state = {
    menuIsVisible: false
  };

  menuMouseEvents();
  turnips();

  setTimeout(audio, 500); // delay so that initial load of page doesn't result in sound, ya?

  switch (window.location.pathname) {
    case '/pith-site/':
      home();
      break;
  }

  function menuMouseEvents() {
    var pageLinks = document.querySelectorAll('.page-link');
    var lastMouseMoveTime;

    if (Modernizr.touchevents) {
      setMenuIsVisible(true);
      return;
    }

    setInterval(function() {
      if (state.menuIsVisible && lastMouseMoveTime && new Date() - lastMouseMoveTime > 3000) {
        setMenuIsVisible(false);
      }
    }, 200);

    window.addEventListener('mousemove', function() {
      setMenuIsVisible(true);

      lastMouseMoveTime = new Date();
    }, false);

    function setMenuIsVisible(visible) {
      if (state.menuIsVisible === visible) return;

      for (var i = 0; i < pageLinks.length; i++) {
        pageLinks[i].style.opacity = visible ? 1.0 : 0.0;
      }

      state.menuIsVisible = visible;
    }
  }

  function audio() {
    var pageLinks = document.querySelectorAll('.page-link');
    var sounds = ['sizzle_1.mp3', 'sizzle_2.mp3', 'bubble.mp3', 'egg.mp3'];

    var audio = document.createElement('audio');
    if (!audio.canPlayType('audio/mp3')) {
      console.log('no mp3 support!');
      return;
    }

    for (var i = 0; i < pageLinks.length; i++) {
      addHoverListener(pageLinks[i]);
    }

    function addHoverListener(pageLink) {
      pageLink.addEventListener('mouseenter', function() {
        if (!state.menuIsVisible) {
          return;
        }

        var src = originify('/media/sounds/' + sounds[Math.floor(sounds.length * Math.random())]);
        audio.src = src;
        audio.play();
      }, false);
    }
  }

  function turnips() {
    var transitionTime = 8000;
    var leftTurnip = document.querySelector('.left-turnip-image-zone');
    var centerTurnip = document.querySelector('.center-turnip-image-zone');
    var rightTurnip = document.querySelector('.right-turnip-image-zone');

    setTimeout(function() {
      moveTurnip(leftTurnip);
      setTimeout(function() {
        moveTurnip(rightTurnip);
        setTimeout(function() {
          moveTurnip(centerTurnip);
        }, 8000);
      }, 5000);
    }, 6000);

    function moveTurnip(turnip) {
      if (!turnip) return;

      if (!turnip._currentTop) {
        turnip._currentTop = 0;
      }
      if (!turnip._height) {
        turnip._height = turnip.getBoundingClientRect().height / 3;
      }

      var nextTop = -turnip._height * 0.25 + Math.random() * turnip._height * 0.3;

      turnip.style.transform = 'translateY(' + nextTop + 'px)';

      setTimeout(function() {
        moveTurnip(turnip);
      }, transitionTime + Math.random() * 3000 + 3000);
    }
  }

  function originify(path) {
    return window.location.origin + '/pith-site' + path;
  }

  function home() {
    var splash = document.querySelector('.home-splash');
    setTimeout(function() {
      splash.style.opacity = 0;
      setTimeout(function() {
        splash.parentNode.removeChild(splash);
      }, 1000);
    }, 2500);
  }

})();
