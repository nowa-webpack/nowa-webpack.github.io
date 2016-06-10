# 图片和 svg 的使用

---

## 引用图片资源

在项目中引用图片资源，可以通过如下方式：

```js
const starImage = require('../../images/star.png');
...
render() {
    return <img src={starImage} alt="">
}
```

> file-loader 会将图片转成 base64 的 data-uri，从而减少图片请求。  
> 但若图片非常巨大 >5M，则强烈建议将图片上传专门的图片 cdn，然后引用绝对路径。

## 引用 svg 资源

在项目中引用 svg 资源，可以通过如下方式：

```js
const StarSvg = require('../../images/star.svg');
...
render() {
    return <StarSvg className="star-svg"/>
}
```

> 此时，svg 被当作一个 react component 来加载  
> 可以通过 css 属性 `fill` 来改变 svg 的颜色

```css
.star-svg {
    fill: red;
}
```
