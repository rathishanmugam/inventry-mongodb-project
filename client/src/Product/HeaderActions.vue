<template>
  <div class="d-flex align-center" style="margin-left: auto">
    <v-menu open-on-hover bottom offset-y>
      <v-btn icon slot="activator">
        <v-icon>person</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile v-on:click="showProfile">
          <v-list-tile-action>
            <v-icon>more_vert</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Show User</v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-on:click="showProduct">
          <v-list-tile-action>
            <v-icon>assignment</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Show Product</v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-on:click="logOut">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Log Out</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-btn icon>
      <v-icon>notifications</v-icon>
    </v-btn>
    <v-dialog v-model="profileDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6>
                <v-text-field label="First name" v-model="user.first" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Last name" v-model="user.last" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email" v-model="user.email" hint="This is also your login username" persistent-hint
                              required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" v-model="user.password" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Verify Password" v-model="user.verfiyPassword" type="password"
                              hint="When changing your password, please enter twice" persistent-hint
                              :rules="[
                    () => user.password == user.verfiyPassword || 'Passwords entered do not match'
                  ]"
                              required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="profileDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="saveProfile">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-dialog v-model="productDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Product Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6>
                <v-select
                  prepend-icon="credit_card"
                  v-bind:items="ProductName"
                  :value="product.productName"
                  v-model="product.productName"
                  label="select product name"
                  single-line
                  bottom
                ></v-select>
                <v-text-field label="Product type" v-model="product.productModel" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Product Cost" v-model="product.cost" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Product stock" v-model="product.stock" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Product sold" v-model="product.sold" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="productDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="saveProduct">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        profileDialog: false,
        productDialog: false,
        product: {
          productId: null,
          productName: '',
          productModel: '',
          cost: 0,
          stock: 0,
          sold: 0,
          balance: 0
        },
        ProductName: [
          {text: 'LG', value: 'LG'},
          {text: 'Sony', value: 'Sony'},
          {text: 'Viedocon', value: 'Viedocon'},
          {text: 'Samsang', value: 'Samgsang'}
        ],
        user: {
          first: '',
          last: '',
          email: '',
          password: '',
          verfiyPassword: '',
          isActive: true
        }
      }
    },
    methods: {
      showProfile: function () {
        this.profileDialog = true
      },
      showProduct: function () {
        this.productDialog = true
      },
      saveProfile: function () {
        let vm = this
        this.$store.dispatch('updateUserProfile', this.user).then(() => {
          vm.password = vm.verfiyPassword = ''
        })
        this.profileDialog = false
      },
      saveProduct: function () {
        console.log('Saving transaction record:', this.product)
        this.productDialog = false
      },
      logOut: function () {
        // TODO
        console.log('User logout requested...')
        this.$router.push({path: '/login'})

      }
    },
    mounted: function () {
      const loggedInUser = this.$store.state.user

      this.user.first = loggedInUser.first
      this.user.last = loggedInUser.last
      this.user.email = loggedInUser.email
    }
  }
</script>

<style>

</style>
