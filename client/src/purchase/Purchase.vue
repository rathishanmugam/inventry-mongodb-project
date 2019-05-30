<template>
  <v-card>
    <v-card-title>
      Purchase
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <tr>
          <!--        <tr @click="showAlert(props.item)">-->
          <td>
            <v-edit-dialog
              lazy
            > {{ props.item.purchaseNo }}
              <v-text-field
                slot="input"
                label="Edit"
                v-model="props.item.purchaseNo"
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td>
            <v-edit-dialog
              lazy
            > {{ props.item.productId }}
              <v-text-field
                slot="input"
                label="Edit"
                v-model="props.item.productId"
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class="text-xs-right">
            <v-edit-dialog
              lazy
            > {{ props.item.customerName }}
              <v-text-field
                slot="input"
                label="Edit"
                v-model="props.item.customerName"
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class="text-xs-right">
            <v-edit-dialog
              lazy
            > {{ props.item.purchaseItem }}
              <v-text-field
                slot="input"
                label="Edit"
                v-model="props.item.purchaseItem"
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class="text-xs-right">
            <v-edit-dialog
              lazy
            > {{ props.item.quantity }}
              <v-text-field
                slot="input"
                label="Edit"
                v-model="props.item.quantity"
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class="text-xs-right">
            <v-edit-dialog
              lazy
            > {{ props.item.rate | currency }}
              <v-text-field
                slot="input"
                label="Edit"
                v-model="props.item.rate"
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class="text-xs-right">
            <v-edit-dialog
              lazy
            > {{ props.item.offer| currency }}
              <v-text-field
                slot="input"
                label="Edit"
                v-model="props.item.offer"
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class="text-xs-right">

            <v-select

              v-bind:items="paymentTypes"
              v-model="props.item.paymentType"
              single-line
              bottom
            ></v-select>
          </td>
          <td class="text-xs-right">
            <v-edit-dialog
              lazy
            > {{ props.item.paid | currency}}
              <v-text-field
                slot="input"
                label="Edit"
                v-model="props.item.paid"
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class="text-xs-right">
            <v-edit-dialog
              lazy
            > {{ props.item.purchaseDate }}
              <v-text-field
                slot="input"
                label="Edit"
                v-model="props.item.purchaseDate"
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
        </tr>
      </template>


      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
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
          {text: 'PurchaseNo', align: 'center', sortable: true, value: 'purchaseno'},
          {text: 'ProductId', align: 'center', sortable: true, value: 'productid'},
          {text: 'CustomerName', align: 'center', sortable: true, value: 'customername'},
          {text: 'PurchaseItem', align: 'center', sortable: true, value: 'purchaseitem'},
          {text: 'Quantity', align: 'center', sortable: true, value: 'quantity'},
          {text: 'Rate', align: 'center', sortable: true, value: 'rate'},
          {text: 'Offer', align: 'center', sortable: true, value: 'offer'},
          {text: 'PaymentType', align: 'center', sortable: true, value: 'paymenttype'},
          {text: 'Paid', align: 'center', sortable: true, value: 'paid'},
          {text: 'PurchaseDate', align: 'center', sortable: true, value: 'purchasedate'},
          {text: 'Action', align: 'center', sortable: false, value: 'action'}

        ],
        paymentTypes: [
          { text: 'Credit Card', value: 'Credit Card' },
          { text: 'Debit Card', value: 'Debit Card' },
          { text: 'Check', value: 'Check' },
          { text: 'Deposit', value: 'Deposit' }
        ],
        editedIndex: -1,
        desserts: [],
        editedItem: {
          purchaseNo:'',
          customerName:'',
          productId: '',
          purchaseItem: '',
          quantity: '',
          rate:0.0,
          offer: 0.0,
          paymentType: '',
          paid: 0.0,
          purchaseDate: ''
        },
        items: [
          {
            "purchaseNo":  "p1",
            "productId":  "1",
            "customerName": "tony",
            "purchaseItem": "LG-m1",
            "quantity": 1,
            "rate": 10000,
            "offer": 1000,
            "paymentType": "credit card",
            "paid": 9000,
            "purchaseDate": "2018-06-04"
          },
          {
            "purchaseNo":  "p2",
            "productId":  "6",
            "customerName": "lucy",
            "purchaseItem": "Sony-m2",
            "quantity": 1,
            "rate": 10000,
            "offer": 1000,
            "paymentType": "debit card",
            "paid": 9000,
            "purchaseDate": "2019-05-04"
          },
          {
            "purchaseNo":  "p3",
            "productId":  "2",
            "customerName": "john",
            "purchaseItem": "LG-m2",
            "quantity": 1,
            "rate": 10000,
            "offer": 1000,
            "paymentType": "debit card",
            "paid": 9000,
            "purchaseDate": "2019-05-04"
          }
        ]
      }
    },
    methods: {
      editItem(item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.items.splice(item.index, 1, item)
        this.dialog = true
        console.log("updating  item", this.editedItem)
        console.log("updating index", this.editedIndex)

      },

      deleteItem(item) {
        const index = this.items.indexOf(item)
        confirm('Are you sure you want to delete this item? ') && this.items.splice(index, 1)

      },

      showAlert(a) {
        if (event.target.classList.contains('btn__content')) return;
        alert('Alert! \n' + a.purchaseNo);
      }
    }
  }
</script>

<style scoped>
  .transactions {
    width: 100%;
  }
</style>
