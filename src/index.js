/*
* @Author: gbk
* @Date:   2016-06-10 16:33:15
* @Last Modified by:   gbk
* @Last Modified time: 2016-06-11 21:55:13
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
  document.body.innerHTML = appTpl({
    features: (function(features) {
      for (var i = 0; i < 9; i++) {
        features.push({
          title: 'feature' + i + '.title',
          desc: 'feature' + i + '.desc'
        });
      }
      features[i - 1].last = true;
      return features;
    })([])
  }, {
    helpers: {
      i18n: i18n
    }
  });

  // auto locate logo
  const main = document.getElementById('J_Main');
  const onScroll = function() {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var docHeight = document.documentElement.clientHeight;
    if (scrollTop > (docHeight - main.clientHeight - 20) / 2) {
      main.style.top = (docHeight - main.clientHeight - 20) / 2 + 'px';
    } else {
      main.style.top = 0;
    }
  }
  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', onScroll);
  onScroll();

}
