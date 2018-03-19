# cookie.js

方便管理浏览器cookie！

## 背景分析

在原生的JavaScript语句中，我们可以通过下面的两个属性获取cookie的相关内容：

1. `navigator.cookieEnabled`
<br>该属性返回当前浏览器是否支持cookie操作。（返回类型：Boolean）
<br>目前而言几乎绝大多数浏览器都支持cookie，只有那些有特殊需求的用户才会去禁用浏览器的cookie。如果相关应用需要使用到cookie功能，请务必确保浏览器是否支持cookie操作，否则应不给于处理。

2. `document.cookie`
<br>该属性是浏览器提供给开发人员管理当前域下的所有cookie的唯一途径（该属性可读写）。
<br>对该属性进行读操作，可以获取已有的所有cookie所组成的字符串内容。
<br>对该属性进行写操作，则可以添加cookie或者对cookie进行重新赋值。

代码实例：

```js

//写入cookie
document.cookie = 'name=Jerry Sun';
document.cookie = 'sex=male';

//取得cookie字符串
var str = document.cookie; //=> 'name=Jerry Sun; sex=male'

```

原生操作并不能满足快速创建、编辑、移除某个cookie的需求，因此我们围绕这三点对cookie操作进行了补充完善，从而构成了现在你所看到的cookie函数。希望它能够帮助你快速编辑cookie。

## 使用*cookie(name, [value, [options]])*

### 创建/编辑cookie

默认针对当前域名下的根目录有效，同时它的有效期在会话结束后失效。

```js

cookie('name', 'Jerry Sun');
cookie('sex', 'male');

```

### 获取cookie

如果目标cookie不存在，将返回null。

```js

cookie('name'); //=> 'Jerry Sun'
cookie('sex');  //=> 'male'
cookie('age');  //=> null

```

### 移除cookie

将cookie的值设置为null，则表示移除该cookie。

```js

cookie('name', null);
cookie('sex', null);

```

### `options.expires`

该选项用来设置cookie的过期时间(时间单位默认为：天)，如果不设置过期时间则默认为会话结束后失效。

```js

//cookie有效期为1天
cookie('name', 'Spring Long', {expires: 1});

//cookie有效期为1年（365天）
cookie('name', 'Spring Long', {expires: 365});

```

### `options.unit`

该选项用来设置过期时间所使用的时间单位。可设置的值有：`day` - 天（默认），`hour` - 小时，`minute` - 分钟，`second` - 秒。

```js

//cookie有效期为1天
cookie('name', 'Spring Long', {expires: 1, unit: 'day'});

//cookie有效期为1小时
cookie('name', 'Spring Long', {expires: 1, unit: 'hour'});

```

### `options.path`

该选项用来设置可访问cookie的目录名称，默认值为：“/”，表示网站根目录。

一个网站可以根据path路径的不同而创建多个具有相同名称的cookie。这种情况下如果需要进行cookie的删除操作，则需要指明添加cookie时所设置的path路径。

比如在网站首页创建cookie时指定path为'/news'，那么该cookie仅在'/news/'目录下的页面中可以访问。首页以及其他目录下的页面将无法访问，不过可以通过指定`{path: '/news'}`来移除这个cookie。

```js

//创建cookie
cookie('age', 22, {path: '/news'});

//移除cookie
cookie('age', null, {path: '/news'});

```

### `options.domain`

该选项用来指定可访问cookie的主机名，默认为当前访问域名。

默认情况下，二级域名之间创建的cookie是不能相互被访问的。比如www.fedlife.cn访问不了demo.fedlife.cn域名下创建的cookie。如果需要实现二级域名之间能够互相被访问，则需要设置domain属性值为`.fedlife.cn`，这样才能保证`images.fedlife.cn`、`static.fedlife.cn`、`www.fedlife.cn`等域名下的网页也能够正常访问demo.fedlife.cn域名下的网页所创建的cookie。

当在demo.fedlife.cn下创建一个cookie时，如果将该cookie的domain值指定为其他二级域名，那么该cookie将创建失败。如果将该cookie的domain值指定为`.fedlife.cn`，那么必须指定`{domain: '.fedlife.cn'}`才能移除该cookie。


```js

//创建cookie
cookie('height', 175, {domain: '.fedlife.cn'});

//移除cookie
cookie('height', null, {domain: '.fedlife.cn'});

```

### `options.secure`

该选项用来指定是否启用安全性，默认值为：false。

默认情况下，使用http协议进行连接的页面即可访问cookie。但是当创建cookie时，如果设置了该选项为`true`，那么就只有通过https或者其它安全协议连接的页面才能访问该cookie。


```js

cookie('country', 'China', {secure: true});

```

## 补充声明

该cookie插件的目的主要在于简化创建、编辑、移除某个cookie的操作，在能够满足日常操作需求的同时亦能保持代码的简洁性，因此并没有扩展其他特性需求，比如：将所有cookie以对象形式返回、清除所有cookie内容、多个cookie通过JSON格式赋值等等。

如果你需要使用这些特性，可以尝试下面的内容：

1. [carhartl/jquery-cookie](https://github.com/carhartl/jquery-cookie)
2. [js-coder/cookie.js](https://github.com/js-coder/cookie.js)
3. [aralejs/cookie](https://github.com/aralejs/cookie)