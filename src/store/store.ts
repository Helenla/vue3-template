import { createStore } from 'vuex'
import { state } from "./state";
import { mutations } from "./mutations";
import { getters } from "./getters";
import { actions } from './actions';
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state,
  mutations,
  getters,
  actions,
  modules: {},
  plugins: [
    createPersistedState({
      reducer(val) {
        console.log(val)
        return {
          // 设置在这里的内容，如果缓存里有，会默认取缓存数据
        };
      }
    })
  ]
});
