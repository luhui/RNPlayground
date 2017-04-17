<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [前言](#前言)
- [核心思想](#核心思想)
- [从一个需求开始](#从一个需求开始)
	- [前后端分离](#前后端分离)
	- [页面实现](#页面实现)
	- [页面跳转](#页面跳转)
		- [最简单的页面跳转](#最简单的页面跳转)
		- [react-native-router-flux](#react-native-router-flux)

<!-- /TOC -->
# 前言

前端的架构一直在演进，各种工具层出不穷，为了让新人能够更容易理解现有的架构，我们通过演进式的开发一个需求，来让大家更容易理解现有架构是根据什么原因决定出来的

# 核心思想

一部电影会有一个主线，一个框架也会有一个核心的思想，各种工具和用法都会围绕这个核心进行扩展

react-native是基于前端框架[React](https://facebook.github.io/react/)派生出来的，利用前端技术来实现跨平台的一个框架。因此其核心思想和React是一致的，即响应数据变化进行UI更新。他屏蔽了UI渲染的细节，我们只需要在布局的时候将页面和数据进行绑定，随后根据业务需求进行数据操作即可，框架本身会帮助我们进行UI更新。

代码中的[calculator.js](./calculator.js)是一个简单的+1计算器，大家可以对比传统使用Android或者iOS编写这个demo时的实现思路。

```js

export default class Calculator extends Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Button
          style={styles.instructions}
          title={"点击+1"}
          onPress={() => {
            this.setState({count: this.state.count + 1})
          }} />
        <Text style={styles.welcome}>
          {"结果: " + this.state.count}
        </Text>
      </View>
    )
  }
}

```

# 从一个需求开始

大部分移动应用，登录注册是必不可少的，而这个简单的功能，承载了界面实现、界面跳转、网络请求、数据库存储等方方面面。
因此，我们从这个小需求出发，思考一个移动端的架构是如何设计成型的，管中窥豹。

我们大致的一个功能逻辑大概会是这样：

认证首页（包含登录、注册按钮） -> 注册/登录页 -> 注册/登录成功 -> 首页 -> 登出 -> 认证首页

## 前后端分离

首先，我们应该先明确一个前提，我们应该尽可能的模块化，使前后端分离。这样的好处是方便维护，并且易于分工。

接下来的实现，我们都会基于这个原则，针对每一个单独的功能模块进行开发

## 页面实现

页面设计会包含性能优化、布局技巧、动画等等，主题庞大，这里我们先暂且略过，以最简单的页面实现功能需求。

我们先按照功能逻辑实现几个简单的界面，包括

[AuthMain.js](./AuthMain.js) -- 认证首页  
[Login.js](./Login.js) -- 登陆页  
[Register.js](./Register.js) -- 注册页  
[Main.js](./Main.js) -- 首页  


## 页面跳转

### 最简单的页面跳转

页面，本质上就是一个全屏的Component，页面跳转实际上就是根据业务需求，显示不同的Component罢了，因此在最简单的情况下，我们可以设计一个庞大的Component，这个Component里根据state的page来决定渲染哪个子Component

[SimpleTransitionApp.js](./SimpleTransitionApp.js)就是按照上述的原则实现的简单页面

```js
export default class SimpleTransitionApp extends Component {
  constructor() {
    super()
    this.state = {
      page: 'authMain'
    }
  }
  render() {
    let page = (
      <AuthMain
        showLogin={() => this.setState({page: 'login'})}
        showRegister={() => this.setState({page: 'register'})}/>
    )
    switch (this.state.page) {
      case 'login':
        page = <Login login={() => this.setState({page: 'main'})} />
        break
      case 'register':
        page = <Regisger register={() => this.setState({page: 'main'})} />
        break
      case 'main':
        page = <Main logout={() => this.setState({page: 'authMain'})} />
      default:
    }
    return (
      <View style={styles.container}>
        {page}
      </View>
    )
  }
}
```

### react-native-router-flux

随着应用越来越复杂（例如实现导航栏、页面返回、tab、侧边栏等），我们就必须把页面跳转的逻辑抽离开来，单独实现一系列的机制来为复杂的业务模型提供页面跳转框架，就如iOS里的`UINavigationController`、Android里的`Activity`、`Task机制`一样，为了解决在RN中的页面跳转问题，涌现除了许多跳转框架。在众众多的跳转框架中，我们选择了[react-native-router-flux](https://github.com/aksonov/react-native-router-flux)，他使用到了Facebook提出的`flux`思想，和后续选用的`redux`配合起来效果较好，对于常用的跳转控制也都支持，这是选中这个框架的原因。

***作者是fork了一个旧的`ExperimentalNavigation`，在这个基础上封装了基于`flux`的跳转控制，由于这个`ExperimentalNavigation`官方已经停止维护，转用[ReactNavigation](https://reactnavigation.org/)，而作者对于PR的处理也很慢，因此后续可能会改用`ReactNavigation`。***

[RouterFluxApp.js](./RouterFluxApp.js)是一个使用该框架的示例。

```js
export default class RouterFluxApp extends Component {
  render() {

    return (
      <Router>
        <Scene key='auth'>
          <Scene key='authMain' component={() => this.getPage('authMain')} />
          <Scene key='login' component={() => this.getPage('login')} />
          <Scene key='register' component={() => this.getPage('register')} />
        </Scene>
        <Scene key='main' component={() => this.getPage('main')} />
      </Router>
    )
  }

  getPage(key) {
    let page = (
      <AuthMain
        showLogin={() => Actions.login()}
        showRegister={() => Actions.register()}/>
    )
    switch (key) {
      case 'login':
        page = <Login login={() => Actions.main({type: 'reset'})} />
        break
      case 'register':
        page = <Regisger register={() => Actions.main({type: 'reset'})} />
        break
      case 'main':
        page = <Main logout={() => Actions.auth({type: 'reset'})} />
      default:
    }
    return page
  }
}
```
对比[SimpleTransitionApp.js](./SimpleTransitionApp.js)的代码可以看出，我们只是把跟入口的配置给改变了，并没有改变Component的代码，这就是React通过组件化实现前后端分离带来的好处
