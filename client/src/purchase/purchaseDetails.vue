<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Purchase</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.purchaseNo" label="Purchase No"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.productId" label="Product Id"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.customerName" label="Customer Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.purchaseItem" label="Purchase Item"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.quantity" label="Quantity"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.rate" label="Rate"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.offer" label="Offer"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    v-bind:items="purchaseTypes"
                    v-model="editedItem.paymentType"
                    label="Payment Type"
                    single-line
                    bottom
                  ></v-select>
                  <!--                  <v-text-field v-model="editedItem.paymentType" label="Payment Type"></v-text-field>-->
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.paid" label="Paid"></v-text-field>
                </v-flex>
                <!--                <v-flex xs12 sm6 md4>-->
                <!--                  <v-text-field v-model="editedItem.purchaseDate" label="Purchase Date"></v-text-field>-->
                <v-flex xs12 sm6 md4>
                  <v-menu
                    ref="datePicker"
                    lazy
                    :close-on-content-click="false"
                    v-model="transactionDatePicker"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-right="40"
                    max-width="290px"
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      label="Select Transaction Date"
                      v-model="editedItem.purchaseDate"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker
                      v-model="editedItem.purchaseDate"
                      v-on:input="$refs.datePicker.save(editedItem.purchaseDate)"
                    >
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <!--                </v-flex>-->
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="purchase"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.purchaseNo}}</td>
        <td class="text-xs-right">{{ props.item.productId }}</td>
        <td class="text-xs-right">{{ props.item.customerName }}</td>
        <td class="text-xs-right">{{ props.item.purchaseItem }}</td>
        <td class="text-xs-right">{{ props.item.quantity }}</td>
        <td class="text-xs-right">{{ props.item.rate }}</td>
        <td class="text-xs-right">{{ props.item.offer }}</td>
        <td class="text-xs-right">{{ props.item.paymentType }}</td>
        <td class="text-xs-right">{{ props.item.paid }}</td>
        <td class="text-xs-right">{{ props.item.purchaseDate }}</td>

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
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click=" ">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'

  export default {
    name: 'purchase Details',
    created() {
      this.$store.dispatch('getPurchase')
      console.log('the store  purchase is', this.$store)

    },
    data: () => ({
      transactionDatePicker: false,
      dialog: false,
      headers: [
        {text: 'PurchaseNo', sortable: true, value: 'purchaseno'},
        {text: 'ProductId', sortable: true, value: 'productid'},
        {text: 'CustomerName', sortable: true, value: 'customername'},
        {text: 'PurchaseItem', sortable: true, value: 'purchaseitem'},
        {text: 'Quantity', sortable: true, value: 'quantity'},
        {text: 'Rate', sortable: true, value: 'rate'},
        {text: 'Offer', sortable: true, value: 'offer'},
        {text: 'PaymentType', sortable: true, value: 'paymenttype'},
        {text: 'Paid', sortable: true, value: 'paid'},
        {text: 'PurchaseDate', sortable: true, value: 'purchasedate'},
        {text: 'Action', sortable: false, value: 'name'}

      ],
      purchaseTypes: [
        {text: 'Credit Card', value: 'Credit Card'},
        {text: 'Debit Card', value: 'Debit Card'},
        {text: 'Check', value: 'Check'},
        {text: 'Deposit', value: 'Deposit'}
      ],
      // purchase: [],
      editedIndex: -1,
      editedItem: {
        purchaseNo: '',
        customerName: '',
        productId: '',
        purchaseItem: '',
        quantity: '',
        rate: 0.0,
        offer: 0.0,
        paymentType: '',
        paid: 0.0,
        purchaseDate: ''
      },
      defaultItem: {
        purchaseNo: '',
        customerName: '',
        productId: '',
        purchaseItem: '',
        quantity: '',
        rate: 0.0,
        offer: 0.0,
        paymentType: '',
        paid: 0.0,
        purchaseDate: ''
      }
    }),


    computed: {
      ...mapState({
        purchase: state => state.purchase.purchaseItem
      }),

      ...mapGetters('purchase', {}),

      formTitle() {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },

    },

    watch: {
      dialog(val) {
        val || this.close()
      }
    },

    // created() {
    //   this.initialize()
    // },

    methods: {
      // initialize() {
      //   this.purchase = [
      //     {
      //       "purchaseNo": "p1",
      //       "productId": "1",
      //       "customerName": "tony",
      //       "purchaseItem": "LG-m1",
      //       "quantity": 1,
      //       "rate": 10000,
      //       "offer": 1000,
      //       "paymentType": "Credit Card",
      //       "paid": 9000,
      //       "purchaseDate": "2018-06-04"
      //     },
      //     {
      //       "purchaseNo": "p2",
      //       "productId": "6",
      //       "customerName": "lucy",
      //       "purchaseItem": "Sony-m2",
      //       "quantity": 1,
      //       "rate": 10000,
      //       "offer": 1000,
      //       "paymentType": "Debit Card",
      //       "paid": 9000,
      //       "purchaseDate": "2019-05-04"
      //     },
      //     {
      //       "purchaseNo": "p3",
      //       "productId": "2",
      //       "customerName": "john",
      //       "purchaseItem": "LG-m2",
      //       "quantity": 1,
      //       "rate": 10000,
      //       "offer": 1000,
      //       "paymentType": "Debit Card",
      //       "paid": 9000,
      //       "purchaseDate": "2019-05-04"
      //     }
      //   ]
      // },

      editItem(item) {
        this.editedIndex = this.purchase.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        this.$store.dispatch('updatePurchase', this.editedItem)

      },

      deleteItem(item) {
        const index = this.purchase.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.purchase.splice(index, 1)
        this.$store.dispatch('deletePurchase', this.item)

      },

      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.purchase[this.editedIndex], this.editedItem)
        } else {
          this.purchase.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>
