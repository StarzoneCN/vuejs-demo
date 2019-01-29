// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './router/logining';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import $ from 'jquery';
import jQuery  from 'jquery';
import GlobalConstants from './utils/GlobalConstants';
import VuexStore from './store';

/*iView*/
// import iView from 'iview'
import 'iview/dist/styles/iview.css';

import { Slider, Button, Table } from 'iview';
Vue.component('IvTable', Button);
Vue.component('IvTable', Table);
Vue.component('IvSlider', Slider);


import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import VideoPlayer from 'vue-video-player'

Vue.config.productionTip = false;
Vue.prototype.GlobalConstans = GlobalConstants;

Vue.use(VideoPlayer);
Vue.use(ElementUI);
// Vue.use(iView)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    transitionName: ''
  },
  store: VuexStore,
  router,
  components: { App },
  template: '<App/>',
  watch: {
    '$route'(to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
});
