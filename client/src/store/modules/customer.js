import Vue from 'vue'

const state = {
  email: '',
  customerId: null,
  customerName: '',
  address: '',
  phoneNo: '',
  customer: []
}
const getters = {
  customer: state => state.customer
}
const actions = {
  saveCustomer({commit, dispatch, state, rootState}, customer) {
    // Add customer to the database
    console.log('the saving customer record is:', customer)
    const oldCustomer = state.customer.find(item => item.id === customer.id)
    if (!oldCustomer) {
      Vue.axios.post('/customer', customer)
        .then((resp) => {
          commit('addCustomerToState', customer).then(() => {
            dispatch('items') //in customer.vue component
          })
        })
        .catch((err) => {
          console.log('Error saving customer')
          console.log(err)
        })
    } else {
      console.log('Customer Already Exists')
      alert('This customer already exist \n' + customer.customerId)
    }
  },


  updateCustomer({commit, dispatch, state}, customer) {
    // Update customer in  the database
    const cartItem = state.customer.find(item => item.id === customer.customerId)
    if (cartItem) {
      // customer.customerId = this.state.customer.customerId
      Vue.axios.put('/customer/' + this.state.customer.customerId, customer)
        .then((resp) => {
          console.log('The Upadating Record Is:', resp)
          commit('updateCustomerInState', customer).then(() => {
            dispatch('items') //in customer.vue component
          })
        })
        .catch((err) => {
          console.log('Error Updating customer')
          console.log(err)
        })
    }
  },


  deleteCustomer({commit, dispatch, state}, customer) {
    // Update customer in  the database
    const cartItem = state.customer.find(item => item.id === customer.customerId)
    if (cartItem) {
      // customer.customerId = this.state.customer.customerId
      Vue.axios.delete('/customer/' + cartItem.customerId, customer)
        .then((resp) => {
          console.log('The Deleting Record Is:', customer.customerId)
          commit('deleteCustomerInState', customer).then(() => {
            dispatch('items') //in customer.vue component
          })
        })
        .catch((err) => {
          console.log('Error Updating customer')
          console.log(err)
        })
    }
  },

  getCustomer({commit, state, dispatch}) {
    //get Specific Customer From database
    // Vue.axios.get('/customer/' + this.state.customer.customerId, customer)
    Vue.axios.get('/customer')
      .then((resp) => {
        let data = resp.data
        if (data && data.length > 0) {
          commit('displayCustomerToState', data).then(() => {
            dispatch('items')
          })
        }
      })
      .catch((err) => {
        console.log('Darn! There was an error getting transactions by month: ' + err)
      })
  }
}
const mutations = {
  displayCustomerToState(state, data) {
    // Start by clearing the customer state...
    state.customer = []
    if (data && data.length > 0) {
      state.customer.push(data)
    }
    console.log('Specific customer  mutated: ', state.customer)
  },
  deleteCustomerInState(state, customer) {
    state.customer.splice(state.customer.indexOf(customer.customerId), 1)
  },
  addCustomerToState(state, customer) {
    state.customer.push(customer)
  },
  updateCustomerInState(state, customer) {
    state.customer.splice(state.customer.indexOf(customer.customerId), 1, customer)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
