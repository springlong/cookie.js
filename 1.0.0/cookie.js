/**
 * @file        集成于jQuery中的Cookie操作
 * @version     1.0.0
 * @author      龙泉 <yangtuan2009@126.com>
 */
(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        // AMD module
        define(factory);
    }
    else if(typeof module !== "undefined" && module.exports) {
        // Node/CommonJS
        // Seajs build
        module.exports = factory();
    }
    else {
        // 浏览器全局模式
        root.cookie = factory();
    }

})(this, function () {

    /**
     * Cookie操作
     * @param  {String}     name                cookie的名称（区分大小写）
     * @param  {String}     [value]             cookie的值
     * @param  {Object}     [options]           配置选项（仅在设置Cookie时有效）
     * @param  {Number}     [options.expires]   指定当前cookie的有效时间（默认单位：天），默认值为：""，表示会话结束后失效（等同于设置为0）。
     * @param  {String}     [options.unit]      过期时间的单位，默认值为：“day”，表示天，可以是： second minute hour day
     * @param  {String}     [options.path]      指定可访问cookie的目录名称，默认值为：“/”，表示网站根目录。
     * @param  {String}     [options.domain]    指定可访问cookie的主机名，默认值为：""，表示当前访问域名。
     * @param  {Boolean}    [options.secure]    是否启用安全性，默认值为：false。
     * @return {String|null|undefined}          不提供value参数时将返回指定cookie的值（如果该cookie未设置则返回null）；提供value参数时表示设置指定cookie的值（如果设置为null则表示删除某个cookie） ，此时返回undefined。
     */
    function cookie (name, value, options) {

        var expires = "",
            path = "/",
            domain = "",
            secure = "",
            unit = "",
            reg, result, e_date;

        if(value === undefined){
            //IE、Firefox、Chrome支持空字符串的Cookie名称，Opera的Presto版本和Safari则不支持
            reg = /^\s*$/.test(name + "") ? new RegExp("\\b([^=;]*)(;|$)") : new RegExp("\\b" + name + "=([^;]*)");
            return (result = reg.exec(document.cookie)) !== null ? decodeURIComponent(result[1]) : null;
        }

        options  = options || {};
        expires = options.expires ? options.expires : "";
        path    = options.path    ? options.path : "/";
        domain  = options.domain  ? ";domain=" + options.domain : "";
        secure  = options.secure  ? ";secure=" : "";
        unit    = options.unit    ? options.unit : "day";

        expires = value === null ? -1 : expires;
        if(expires !== ""){
            //过期时间值必须是GMT时间格式，通过toGMTString()方法即可将一个时间值转换为GMT格式;
            if(unit === "second"){
                (e_date = new Date()).setSeconds(e_date.getSeconds() + (parseInt(expires) || -1));  

            }else if(unit === "minute"){
                (e_date = new Date()).setMinutes(e_date.getMinutes() + (parseInt(expires) || -1));  

            }else if(unit === "hour"){
                (e_date = new Date()).setHours(e_date.getHours() + (parseInt(expires) || -1));  

            }else{
                (e_date = new Date()).setDate(e_date.getDate() + (parseInt(expires) || -1));   
            }
            expires = ";expires=" + e_date.toGMTString();
        }

        document.cookie = name + "=" + encodeURIComponent(value) + expires + ";path=" + path + domain + secure;
    };

    return cookie;
});