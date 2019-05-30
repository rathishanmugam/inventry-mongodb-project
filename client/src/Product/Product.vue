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
      :items='items'
      :search='search'
    >
      <template slot='items' slot-scope='props'>
        <tr>
          <!--        <tr @click='showAlert(props.item)'>-->
          <td>
            <v-edit-dialog
              lazy
            > {{ props.item.productId }}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.productId'
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class='text-xs-right'>

            <v-select

              v-bind:items='productname'
              v-model='props.item.productName'
              single-line
              bottom
            ></v-select>
          </td>
          <td class='text-xs-right'>
            <v-edit-dialog
              lazy
            > {{ props.item.productModel }}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.productModel'
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class='text-xs-right'>
            <v-edit-dialog
              lazy
            > {{ props.item.productOffer }}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.productOffer'
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class='text-xs-right'>
            <v-edit-dialog
              lazy
            > {{ props.item.cost | currency }}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.cost'
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class='text-xs-right'>
            <v-edit-dialog
              lazy
            > {{ props.item.stock }}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.stock'
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class='text-xs-right'>
            <v-edit-dialog
              lazy
            > {{ props.item.sold }}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.sold'
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class='text-xs-right'>
            <v-edit-dialog
              lazy
            > {{ props.item.balance }}
              <v-text-field
                slot='input'
                label='Edit'
                v-model='props.item.balance'
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
  export default {
    data() {
      return {
        dialog: false,
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        search: '',
        pagination: {},
        headers: [
          {text: 'ProductId', align: 'center', sortable: true, value: 'productid'},
          {text: 'ProductName', align: 'center', sortable: true, value: 'productname'},
          {text: 'ProductModel', align: 'center', sortable: true, value: 'productmodel'},
          {text: 'ProductOffer', align: 'center', sortable: true, value: 'productoffer'},
          {text: 'Cost', align: 'center', sortable: true, value: 'cost'},
          {text: 'Stock', align: 'center', sortable: true, value: 'stock'},
          {text: 'Sold', align: 'center', sortable: true, value: 'sold'},
          {text: 'Balance', align: 'center', sortable: true, value: 'balance'},
          {text: 'Action', align: 'center', sortable: false, value: 'action'}

        ],
        productname: [
          {text: 'LG', value: 'LG'},
          {text: 'Sony', value: 'Sony'},
          {text: 'Viedocon', value: 'Viedocon'},
          {text: 'Samsang', value: 'Samsang'}
        ],
        editedIndex: -1,
        desserts: [],
        editedItem: {
          productId: '',
          productName: '',
          productModel: '',
          productOffer: '',
          cost: 0.0,
          stock: 0,
          sold: 0,
          balance: 0
        },
        items: [
          {
            'productId': '1',
            'productName': 'LG',
            'productModel': 'LG-m1',
            'productOffer': 'pongal offer',
            'cost': 12378.0,
            'stock': 20,
            'sold': 10,
            'balance': 10
          },
          {
            'productId': '2',
            'productName': 'LG',
            'productModel': 'LG-m2',
            'productOffer': 'diwalli  offer',
            'cost': 123400.0,
            'stock': 20,
            'sold': 10,
            'balance': 10
          },
          {
            'productId': '3',
            'productName': 'Samsang',
            'productModel': 'Samsang-m1',
            'productOffer': 'diwalli  offer',
            'cost': 12378.0,
            'stock': 20,
            'sold': 10,
            'balance': 10
          },
          {
            'productId': '4',
            'productName': 'Samsang',
            'productModel': 'Samsang-m2',
            'productOffer': 'diwalli  offer',
            'cost': 12378.0,
            'stock': 20,
            'sold': 10,
            'balance': 10
          },
          {
            'productId': '5',
            'productName': 'Sony',
            'productModel': 'Sony-m1',
            'productOffer': 'pongal offer',
            'cost': 12378.0,
            'stock': 20,
            'sold': 10,
            'balance': 10
          },
          {
            'productId': '6',
            'productName': 'Sony',
            'productModel': 'Sony-m2',
            'productOffer': 'pongal offer',
            'cost': 12378.0,
            'stock': 20,
            'sold': 10,
            'balance': 10
          },
          {
            'productId': '7',
            'productName': 'Viedocon',
            'productModel': 'Viedocon-m1',
            'productOffer': 'pongal offer',
            'cost': 12378.0,
            'stock': 20,
            'sold': 10,
            'balance': 10
          },
          {
            'productId': '8',
            'productName': 'Viedocon',
            'productModel': 'Viedocon-m2',
            'productOffer': 'pongal offer',
            'cost': 12378.0,
            'stock': 20,
            'sold': 10,
            'balance': 10
          }
        ]
      }
    },
    // created() {
    //   this.getProduct()
    // },

    // computed:{
    //   items() {
    //     return this.$store.getters.product
    //     console.log("the items got :" + items)
    //   }
    // },
    methods: {
      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.items.splice(item.index, 1, item)
        this.dialog = true
        console.log('updating  item', this.editedItem)
        console.log('updating index', this.editedIndex)
        this.$store.dispatch('updateProduct', this.editedItem)

      },

      deleteItem (item) {
        const index = this.items.indexOf(item)
        confirm('Are you sure you want to delete this item? ') && this.items.splice(index, 1)
        this.$store.dispatch('deleteProduct', this.item)

      },

      showAlert (a) {
        if (event.target.classList.contains('btn__content')) return
        alert('Alert! \n' + a.productName)
      }
    }
  }
</script>

<style scoped>
  .transactions {
    width: 100%;
  }
</style>
