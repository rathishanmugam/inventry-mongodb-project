import Vue from 'vue'
import Router from 'vue-router'
import Customer from '../customer/customerDetails'
import HomePage from '../home/HomePage.vue'
import Product from '../Product/ProductDetail.vue'
import BrowseCompany from '../company/BrowseCompany.vue'
import CompanyLG from '../company/CompanyLG.vue'
import CompanySony from '../company/CompanySony.vue'
import CompanySamsang from '../company/CompanySamsung.vue'
import CompanyViedocon from '../company/CompanyViedocon.vue'
import SidebarStandard from '../sidebars/SidebarStandard.vue'
// import SidebarBuild from '../sidebars/SidebarBuild.vue'
import Login from '../home/Login.vue'
import Purchase from '../purchase/purchaseDetails'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/',
    name: 'Home',
    components: {
      default: HomePage,
      sidebar: SidebarStandard
    }
  }, {
    path: '/product',
    name: 'Product',
    component: Product
  }, {
    path: '/customer',
    name: 'Customer',
    component: Customer
  }, {
    path: '/purchase',
    name: 'Purchase',
    component: Purchase
  }, {
    path: '/company/browse',
    name: 'BrowseCompany',
    component: BrowseCompany,
    children: [
      {
        name: 'BrowseSony',
        path: 'heads',
        component: CompanySony
      },
      {
        name: 'BrowseLG',
        path: 'arms',
        component: CompanyLG
      }, {
        name: 'BrowseSamsang',
        path: 'toros',
        component: CompanySamsang
      }, {
        name: 'BrowseViedocon',
        path: 'bases',
        component: CompanyViedocon
      }]
  }]

})
