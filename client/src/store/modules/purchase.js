import Vue from 'vue'
const state = {
  purchaseNo: '',
  productId: null,
  customerName: '',
  purchaseItem: '',
  quantity: 0,
  rate: 0,
  offer: 0,
  paymentType: '',
  paid: 0,
  purchase:[]
}
const getters = {
  purchase: state => state.purchase,
}
const actions = {
  savePurchase ({commit, dispatch, state, rootState}, product) {
    // Add product to the database
    console.log('the saving product record is:', product)
    const oldCustomer = state.product.find(item => item.id === product.id)
    if (!oldCustomer) {
      Vue.axios.post('/product', product)
        .then((resp) => {
          commit('addCustomerToState', product).then(() => {
            dispatch('items') //in product.vue component
          })
        })
        .catch((err) => {
          console.log('Error saving product')
          console.log(err)
        })
    } else {
      console.log('Customer Already Exists')
      alert('This product already exist \n' + product.productId)
    }
  },


  updatePurchase ({commit, dispatch, state}, product) {
    // Update product in  the database
    const cartItem = state.product.find(item => item.id === product.productId)
    if (cartItem) {
      // product.productId = this.state.product.productId
      Vue.axios.put('/product/' + this.state.product.productId, product)
        .then((resp) => {
          console.log('The Upadating Record Is:', resp)
          commit('updateCustomerInState', product).then(() => {
            dispatch('items') //in product.vue component
          })
        })
        .catch((err) => {
          console.log('Error Updating product')
          console.log(err)
        })
    }
  },


  deletePurchase ({commit, dispatch, state}, product) {
    // Update product in  the database
    const cartItem = state.product.find(item => item.id === product.productId)
    if (cartItem) {
      // product.productId = this.state.product.productId
      Vue.axios.delete('/product/' + cartItem.productId, product)
        .then((resp) => {
          console.log('The Deleting Record Is:', product.productId)
          commit('deleteCustomerInState', product).then(() => {
            dispatch('items') //in product.vue component
          })
        })
        .catch((err) => {
          console.log('Error Updating product')
          console.log(err)
        })
    }
  },

  getPurchase ({commit, state, dispatch}) {
    //get Specific Customer From database
    // Vue.axios.get('/product/' + this.state.product.productId, product)
    Vue.axios.get('/product')
      .then((resp) => {
        let data = resp.data
        if (data && data.length > 0) {
          commit('displayCustomerToState', data).then(() => {
            dispatch('items') //in product.vue component
          })
        }
      })
      .catch((err) => {
        console.log('Darn! There was an error getting transactions by month: ' + err)
      })
  }
}
const mutations = {
  displayCustomerToState (state, data) {
    // Start by clearing the purchase state...
    state.purchase = []
    if (data && data.length > 0) {
      state.purchase.push(data)
    }
    console.log('Specific purchase  mutated: ', state.purchase)
  },
  deleteCustomerInState (state, purchase) {
    state.purchase.splice(state.purchase.indexOf(purchase.purchaseId), 1)
  },
  addCustomerToState (state, purchase) {
    state.purchase.push(purchase)
  },
  updateCustomerInState (state, purchase) {
    state.purchase.splice(state.purchase.indexOf(purchase.purchaseId), 1, purchase)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
