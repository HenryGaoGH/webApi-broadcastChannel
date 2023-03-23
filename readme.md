# 跟着 Henry 学 Web - 每天一个 Web Api

hello 大家好 今天的主题是 Broadcast Channel Api

先来看看这个 Api 是一个什么什么功能的 Api 哪?
按照官方一点的说明,此 Api 可以实现同源下浏览器不同窗口,Tab 页，frame 或者 iframe 下的 浏览器上下文 (通常是同一个网站下不同的页面) 之间的简单通讯。

这个 Api 的设计模式依然是我们熟悉的监听者模式, 安全性考量下, 官方依然准守同源的安全防护策略,

此 Api 也是运行在 Worker 中的,所以对 UI 渲染展示没有任何影响,

当然 此 Api 也是 双向访问的.

### 浏览器支持说明

[BroadcastChannel](./support.png)
