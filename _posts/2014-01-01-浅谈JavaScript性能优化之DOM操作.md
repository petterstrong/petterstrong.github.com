---
layout: post
title:  "浅谈js dom优化"
date:   2014-01-01 18:20:31 +0530
categories: jekyll update
---

	Don't aim for success if you want it; just do what you love and believe in, and it will come naturally.
### ***引言***


>文档对象模型（DOM）是一个独立于特定语言的应用程序接口。

在浏览器中，DOM接口是以JavaScript实现的，通过DOM操作浏览器页面内的元素节点，这使得DOM成为JavaScript中的重要组成部分。

在富客户端网页应用中，新节点元素都是通过DOM操作实现的。尽管DOM提供了丰富的接口供外部调用，但使用DOM的代价很大，频繁对DOM操作是比较损耗性能的，所以关于DOM的性能优化是前端性能优化的一个重要关注点。在本文中我不会对浏览器的渲染机制做过多赘述（如果想详细了解浏览器的工作机制，请参考文章[《浏览器的工作原理：新式网络浏览器揭秘》][jekyll-id]）。

[jekyll-id]: http://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/
<br/>
>*这里先简单叙述一下DOM操作为何会影响性能：*
>*在浏览器中，DOM的实现和ECMAScript的实现是**互相分离**的。例如：在IE中ECMAScript的实现在jscript.dll中，而DOM的实现在mshtml.dll中；在Chrome中使用WebKit中的WebCore处理DOM和渲染，但ECMAScript是在V8引擎中实现的，其他浏览器的情况类似。所以通过JavaScript代码调用DOM接口，相当于两个独立模块的交互。相比较在同一模块中的调用，这种跨模块的调用其性能损耗是很高的。但DOM操作对性能影响最大其实还是因为它导致了浏览器 的**重绘（repaint）**和**重排（reflow）**。*


了解浏览器的渲染机制之后，我们可以知道，重排的代价要比重绘大，重绘会影响部分元素，而重排则可能会影响全部元素，无论哪种影响都是我们不想发生的。实际环境中，如下的DOM操作会导致重绘或重排：

- 增加，删除或修改可见DOM元素

- 页面初始化的渲染

- 移动DOM元素

- 修改css样式，改变DOM元素的尺寸大小

- DOM内容被修改，使得尺寸被撑大

- 浏览器窗口尺寸改变

- 浏览器窗口滚动




可以看到，这些操作是DOM操作中比较常见的。现代浏览器会针对重排或重绘做性能优化，比如，把DOM操作积累一批后统一做一次重排或重绘。但在有些情况下，浏览器会立即重排或重绘。比如请求如下的DOM元素布局信息:

	- offsetTop/Left/Width/Height
	- scrollTop/Left/Width/Height
	- clientTop/Left/Width/Heigh
	- getComputedStyle()或 currentStyle
因为这些值都是动态计算的，所以浏览器需要尽快完成页面的绘制，然后计算返回值，从而打乱了重排或重绘的优化。


###***正文***

既然DOM操作带来的页面重绘或重排是不可避免的，那么我们可以遵循一些最佳实践方法来降低由于重排或重绘带来的影响。如下是一些具体的实践方法：

**1. 合并多次的DOM操作为单次的DOM操作**

最常见频繁进行DOM操作的是频繁修改DOM元素的样式，代码类似如下：

	element.style.color = '#f00';
	element.style.background = '#999';
	element.style.left = '10px';

这种编码方式会因为频繁更改DOM元素的样式，触发页面多次的重排或重绘，上面介绍过，现代浏览器针对这种情况有性能的优化，它会合并DOM操作，但并不是所有的浏览器都存在这样的优化。

改进方案有多种，推荐的方式把DOM操作尽量合并，代码可如下优化

	//解决方案：我们可以创建一个样式名，并把要修改的样式规则都放到这个类名上，然后在使用该样式时调用函数，同时实现表现，行为的相分离


**2.  把DOM元素离线或隐藏后修改**

把DOM元素从页面流中脱离或隐藏，这样处理后，只会在DOM元素脱离和添加时，或者是隐藏和显示时才会造成页面的重绘或重排，对脱离了页面布局流的DOM元素操作就不会导致页面的性能问题。这种方式适合那些需要大批量修改DOM元素的情况。具体的方式主要有三种：

（1） 使用文档片段

文档片段是一个轻量级的document对象，并不会和特定的页面关联。通过在文档片段上进行DOM操作，可以降低DOM操作对页面性能的影响，这种方式是创建一个文档片段，并在此片段上进行必要的DOM操作，操作完成后将它附加在页面中。对页面性能的影响只存在于最后把文档片段附加到页面的这一步操作上。代码类似如下：

```
var fragment = document.createDocumentFragment()
//一些基于fragment的大量DOM操作
...
document.getElementById('myElement').appendChild(fragment);
```

（2） 通过设置DOM元素的display样式为none来隐藏元素

这种方式是通过隐藏页面的DOM元素，达到在页面中移除元素的效果，经过大量的DOM操作后恢复元素原来的display样式。对于这类会引起页面重绘或重排的操作，就只有隐藏和显示DOM元素这两个步骤了。代码类似如下：
	
	var myElement = document.getElementById('myElement');
	myElement.style.display = 'none';
	//一些基于myElement的大量DOM操作
	...
	myElement.style.display = 'none';


（3） 克隆DOM元素到内存中

这种方式是把页面上的DOM元素克隆一份到内存中，然后再在内存中操作克隆的元素，操作完成后使用此克隆元素替换页面中原来的DOM元素。这样一来，影响性能的操作就只是最后替换元素的这一步操作了，在内存中操作克隆元素不会引起页面上的性能损耗。代码类似如下：

	var old = document.getElementById('myElement');
	var clone = old.cloneNode(true);
	// 一些基于clone的大量DOM操作
	...
	old.parentNode.replaceChild(clone,old);

在在现代的浏览器中，因为有了DOM操作的优化，所以应用如上的方式后可能并不能明显感受到性能的改善。但是在仍然占有市场的一些旧浏览器中，应用以上这三种编码方式则可以大幅提高页面渲染性能。



**3.  设置具有动画效果的DOM元素的position属性为fixed或absolute**

把页面中具有动画效果的元素设置为绝对定位，使得元素脱离页面布局流，从而避免了页面频繁的重排，只涉及动画元素自身的重排了。这种做法可以提高动 画效果的展示性能。如果把动画元素设置为绝对定位并不符合设计的要求，则可以在动画开始时将其设置为绝对定位，等动画结束后恢复原始的定位设置。在很多的网站中，页面的顶部会有大幅的广告展示，一般会动画展开和折叠显示。如果不做性能的优化，这个效果的性能损耗是很明显的。使用这里提到的优化方案，则可以提高性能。


**4.  谨慎取得DOM元素的布局信息**

前面讨论过，获取DOM的布局信息会有性能的损耗，所以如果存在重复调用，最佳的做法是尽量把这些值缓存在局部变量中。

		for(var i = 0 ,len =oLi.length ; i < len ; i++){
			// do something
		}		
**5.使用事件委托来减少事件处理器的数量**












