/*
* @Author: gbk
* @Date:   2016-06-10 16:33:15
* @Last Modified by:   gbk
* @Last Modified time: 2016-06-10 22:51:38
*/

'use strict';

require('./index.css');
const i18n = require('./i18n');
const appTpl = require('./tpls/app.handlebars');

if (window.__ie__) {

  // browser not support
  document.body.innerHTML = i18n('tip.ie');

} else {

  // render html
  document.body.innerHTML = appTpl({}, {
    helpers: {
      i18n: i18n
    }
  });

  // auto locate logo
  const main = document.getElementById('J_Main');
  let limit = 0;
  const onResize = () => {
    limit = main.parentNode.clientHeight / 2;
    onScroll();
  }
  const onScroll = () => {
    var top = document.body.scrollTop || document.documentElement.scrollTop;
    main.style.top = (top < limit ? top : limit) / 2 + 'px';
  }
  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', onResize);
  onResize();

}
