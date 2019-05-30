import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import product from './modules/product'
import customer from './modules/customer'
import purchase from './modules/purchase'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    product,
    purchase,
    customer
  }
})
