function n(){return(n=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&(n[e]=r[e])}return n}).apply(this,arguments)}function t(n,t){return t.nodeType===Node.ELEMENT_NODE&&n.push(t),n}var r=!1,e=new Set;function o(n){e.forEach(function(t){t(n)})}function u(u,i){var c,s=[],a=[],f=new IntersectionObserver(function(n){requestAnimationFrame(function(){n.forEach(function(n){n.intersectionRatio>0?(s.forEach(function(t){return t(n.target)}),a.length<=0&&f.unobserve(n.target)):a.forEach(function(t){return t(n.target)})})})},i);function l(n){return{addClass:function(t){return n.push(function(n){return n.classList.add(t)}),this},removeClass:function(t){return n.push(function(n){return n.classList.remove(t)}),this},toggle:function(t){return n===s?(s.push(function(n){return n.classList.add(t)}),a.push(function(n){return n.classList.remove(t)})):(a.push(function(n){return n.classList.add(t)}),s.push(function(n){return n.classList.remove(t)})),this},do:function(t){return n.push(t),this},end:function(){return n.push(function(){return f.disconnect()}),this}}}return(c=u,"string"==typeof c?Array.from(document.querySelectorAll(c)):Array.isArray(c)?c:"length"in c?Array.from(c).reduce(t,[]):[c]).forEach(function(n){f.observe(n)}),n({},l(s),{onScrollProgress:function(n){return s.push(function(t){var u=document.documentElement.clientHeight,i=t.offsetTop-u,c=t.offsetTop+t.offsetHeight-i,s=function(){var r=(window.pageYOffset||document.documentElement.scrollTop)-i;n(function(n,t,r){if(void 0===r)return Math.min(n,t);if(r<t){var e=[r,t];t=e[0],r=e[1]}return Math.min(Math.max(n,t),r)}(r/c,0,1),t)};t.scrollCallback=s,function(n){e.add(n),r||(window.addEventListener("scroll",o),r=!0)}(s),s()}),a.push(function(n){n.scrollCallback&&function(n){e.delete(n),r&&0===e.size&&(window.removeEventListener("scroll",o),r=!1)}(n.scrollCallback)}),this},else:n({},l(a))})}export{u as onStage};