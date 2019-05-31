import Vue from 'vue'
import axios from 'axios'

export default {
  namespaced: true,
  state: {

    product: []
  },
  getters: {},
  actions: {
    saveProduct({commit, dispatch, state, rootState}, product) {
      // Add product to the database
      console.log('the saving product record is:', product)
      const oldProduct = state.product.find(item => item.id === product.id)
      let newStock = state.product.stock + product.stock
      let newProduct = {
        productId: product.productId,
        productName: product.productName,
        productModel: product.productModel,
        productOffer: product.productOffer,
        cost: product.cost,
        stock: newStock,
        sold: state.product.sold,
        balance: state.product.balance
      }
      if (!oldProduct) {
        Vue.axios.post('/product', product)
          .then((resp) => {
            commit('addProductToState', product)
          })
          .catch((err) => {
            console.log('Error saving product')
            console.log(err)
          })
      } else {
        console.log('Product Already Exists')
        Vue.axios.put('/product/' + this.state.product.productId, newProduct)
        commit('incrementProductStock', newProduct)

        alert('This product already exist \n' + product.productId)
      }
    },
    updateProduct({commit, dispatch, state}, product) {
      // Update product in  the database
      const cartItem = state.product.find(item => item.id === product.productId)
      if (cartItem) {
        // product.productId = this.state.product.productId
        Vue.axios.put('/product/' + this.state.product.productId, product)
          .then((resp) => {
            console.log('The Upadating Record Is:', resp)
            commit('updateProductInState', product)
          })
          .catch((err) => {
            console.log('Error Updating product')
            console.log(err)
          })
      }
    },
    deleteProduct({commit, dispatch, state}, product) {
      // Update product in  the database
      const cartItem = state.product.find(item => item.id === product.productId)
      if (cartItem) {
        // product.productId = this.state.product.productId
        Vue.axios.delete('/product/' + cartItem.productId, product)
          .then((resp) => {
            console.log('The Deleting Record Is:', product.productId)
            commit('deleteProductInState', product)

          })
          .catch((err) => {
            console.log('Error Updating product')
            console.log(err)
          })
      }
    },

    getProduct({commit, state, dispatch}) {

      Vue.axios.get('/product')
        .then((resp) => {
          let data = resp.data
          if (data && data.length > 0) {
            commit('displayProductToState', data)
          }
        })
        .catch((err) => {
          console.log('Darn! There was an error getting product from table: ' + err)
        })
    }
  },

  mutations: {

    displayProductToState(state, data) {
      // Start by clearing the product state...
      // state.product = []
      if (data && data.length > 0) {
        state.product.push(data)
      }
      console.log('Specific product  mutated: ', state.product)
    },
    deleteProductInState(state, product) {
      state.product.splice(state.product.indexOf(product.productId), 1)
    },
    addProductToState(state, product) {
      state.product.push(product)
    },
    updateProductInState(state, product) {
      state.product.splice(state.product.indexOf(product.productId), 1, product)
    }
  }
}


