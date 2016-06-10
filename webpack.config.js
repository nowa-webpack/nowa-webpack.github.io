/*
* @Author: gbk
* @Date:   2016-06-10 18:37:02
* @Last Modified by:   gbk
* @Last Modified time: 2016-06-10 18:53:12
*/

'use strict';

const path = require('path');

module.exports = (config) => {
  config.module.loaders.push({
    test: /\.ttf$/,
    loader: 'url',
    include: path.join(process.cwd(), 'src')
  }, {
    test: /\.handlebars$/,
    loader: 'handlebars',
    include: path.join(process.cwd(), 'src')
  });
};
