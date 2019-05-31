<template>
  <v-card>
    <v-card-title>
      Products
      <v-spacer></v-spacer>
      <v-text-field
        append-icon='search'
        label='Search'
        single-line
        hide-details
        v-model='search'
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers='headers'
      :items='customer'
      :search='search'
    >
      <template slot='items' slot-scope='props'>
        <tr>
          <!--        <tr @click='showAlert(props.item)'>-->
          <td>
            <v-edit-dialog
              lazy
            > {{ props.item.customerId }}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.customerId'
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>

          <td class='text-xs-right'>
            <v-edit-dialog
              lazy
            > {{ props.item.customerName }}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.customerName'
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class='text-xs-right'>
            <v-edit-dialog
              lazy
            > {{ props.item.phoneNo }}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.phoneNo'
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class='text-xs-right'>
            <v-edit-dialog
              lazy
            > {{ props.item.address }}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.address'
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class='text-xs-right'>
            <v-edit-dialog
              lazy
            > {{ props.item.email}}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.email'
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class='justify-center layout px-0'>
            <v-icon
              small
              class='mr-2'
              @click='editItem(props.item)'
            >
              edit
            </v-icon>
            <v-icon
              small
              @click='deleteItem(props.item)'
            >
              delete
            </v-icon>
          </td>
        </tr>
      </template>


      <v-alert slot='no-results' :value='true' color='error' icon='warning'>
        Your search for '{{ search }}' found no results.
      </v-alert>
    </v-data-table>
  </v-card>

</template>

<script>
  import {mapState,mapGetters} from 'vuex'

  export default {
    name: 'customer',
    created(){
      this.$store.dispatch('getCustomer')
      console.log('the store customer   is' , this.$store)

    },
    data() {
      return {
        dialog: false,
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        search: '',
        pagination: {},
        headers: [
          {text: 'CustomerId', align: 'center', sortable: true, value: 'customerid'},
          {text: 'CustomerName', align: 'center', sortable: true, value: 'customername'},
          {text: 'PhoneNo', align: 'center', sortable: true, value: 'phoneno'},
          {text: 'Address', align: 'center', sortable: true, value: 'address'},
          {text: 'Email', align: 'center', sortable: true, value: 'email'}
        ],
        editedIndex: -1,
        desserts: [],
        editedItem: {
          customerId: '',
          customerName: '',
          phoneNo: '',
          address: '',
          email: ''
        },
        // items: [
        //   {
        //     'customerId': '1',
        //     'customerName': 'Lone',
        //     'phoneNo': '123456789',
        //     'address': 'west  street',
        //     'email': 'user@sample.com'
        //   },
        //   {
        //     'customerId': '2',
        //     'customerName': 'hema',
        //     'phoneNo': '123456789',
        //     'address': 'south street',
        //     'email': 'user@sample.com'
        //   },
        //   {
        //     'customerId': '3',
        //     'customerName': 'mani',
        //     'phoneNo': '123456789',
        //     'address': 'north street',
        //     'email': 'user@sample.com'
        //   }
        // ]
      }
    },


    computed: {
      ...mapState({
        customer: state => state.customer.customer
      }),

      ...mapGetters('customer', {})
    },
    methods: {
      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.items.splice(item.index, 1, item)
        this.dialog = true
        console.log('updating  item', this.editedItem)
        console.log('updating index', this.editedIndex)
        this.$store.dispatch('updateCustomer', this.editedItem)

      },

      deleteItem (item) {
        const index = this.items.indexOf(item)
        confirm('Are you sure you want to delete this item? ') && this.items.splice(index, 1)
        this.$store.dispatch('deleteCustomer', this.item)

      },

      showAlert (a) {
        if (event.target.classList.contains('btn__content')) return
        alert('Alert! \n' + a.productName);
      }
    }
  }
</script>

<style scoped>
  .transactions {
    width: 100%;
  }
</style>

