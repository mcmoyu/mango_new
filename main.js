import App from './App'

import $ from "jquery"

uni.$ = $;
Vue.prototype.$ = $;

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false

/**
 * 获取App跳转URLScheme
 */
Vue.prototype.jumpToApp = {
	/**
	 * @param {String} url 最终链接
	 */
	TB: (url) => {
		let urlScheme = url.replace(/https?/i, "taobao");
		uni.jumpToAppByApp(urlScheme);
	},
	/**
	 * @param {String} url 最终链接
	 */
	JD: (url) => {
		let urlScheme = "openApp.jdMobile://virtual?params=" + encodeURIComponent(`{"category":"jump","des":"m","sourceValue":"babel-act","sourceType":"babel","url":"${url}","M_sourceFrom":"h5auto","msf_type":"auto"}`);
		uni.jumpToAppByApp(urlScheme);
	},
	/**
	 * @param {String} url 接口返回的URLScheme
	 */
	PDD: (url) => {
		let urlScheme = "pddopen://?h5Url=" + encodeURIComponent(url);
		uni.jumpToAppByApp(urlScheme);
	},
	/**
	 * @param {String} url 接口返回的URLScheme
	 */
	DY: (url) => {
		uni.jumpToAppByApp(url);
	},
	MT: (url) => {
		return url;
	},
	ELM: (url) => {
		return url;
	},
	WPH: (url) => {
		return url;
	}
}

Vue.prototype.getWebUrl = {
	TB: (url) => {
		
	}
}


App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif