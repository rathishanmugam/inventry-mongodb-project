import Vue from 'vue'

export default {
  state: {

    purchaseItem: []
  },
  getters: {
    purchase: state => {
      return state.purchaseItem
    }
  },
  actions: {
    savePurchase({commit, dispatch, state, rootState}, product) {
      // Add product to the database
      console.log('the saving product record is:', product)
      const oldCustomer = state.product.find(item => item.id === product.id)
      if (!oldCustomer) {
        Vue.axios.post('/purchase', product)
          .then((resp) => {
            commit('addCustomerToState', product)
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


    updatePurchase({commit, dispatch, state}, product) {
      // Update product in  the database
      const cartItem = state.product.find(item => item.id === product.productId)
      if (cartItem) {
        // product.productId = this.state.product.productId
        Vue.axios.put('/purchase/' + this.state.product.productId, product)
          .then((resp) => {
            console.log('The Upadating Record Is:', resp)
            commit('updateCustomerInState', product)
          })
          .catch((err) => {
            console.log('Error Updating product')
            console.log(err)
          })
      }
    },


    deletePurchase({commit, dispatch, state}, product) {
      // Update product in  the database
      const cartItem = state.product.find(item => item.id === product.productId)
      if (cartItem) {
        // product.productId = this.state.product.productId
        Vue.axios.delete('/purchase/' + cartItem.productId, product)
          .then((resp) => {
            console.log('The Deleting Record Is:', product.productId)
            commit('deleteCustomerInState', product)
          })
          .catch((err) => {
            console.log('Error Updating product')
            console.log(err)
          })
      }
    },

    getPurchase({commit, state, dispatch}) {
      //get Specific Customer From database
      // Vue.axios.get('/product/' + this.state.product.productId, product)
      Vue.axios.get('/purchase')
        .then((resp) => {
          let data = resp.data
          console.log('response data:', data)
          if (data && data.length > 0) {
            commit('displayCustomerToState', data)
          }
        })
        .catch((err) => {
          console.log('Darn! There was an error getting purchase from table: ' + err)
        })
    }
  },
  mutations: {
    displayCustomerToState(state, data) {
      // Start by clearing the purchase state...
      state.purchaseItem = []
      if (data && data.length > 0) {
        state.purchaseItem.push(data)
        console.log('Specific purchase  mutated: ', state.purchaseItem)
      }
    },
    deleteCustomerInState(state, purchase) {
      state.purchaseItem.splice(state.purchaseItem.indexOf(purchase.purchaseId), 1)
    },
    addCustomerToState(state, purchase) {
      state.purchaseItem.push(purchase)
    },
    updateCustomerInState(state, purchase) {
      state.purchaseItem.splice(state.purchaseItem.indexOf(purchase.purchaseId), 1, purchase)
    }
  }
}
