import Vue from 'vue';
import Vuex from 'vuex';
import Post from '@/store/modules/posts';
import Categories from '@/store/modules/categories';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Post,
    Categories,
  },
});
