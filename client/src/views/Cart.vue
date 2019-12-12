<template>
  <div class="Cart">
      <Navbar/>
      <br>
      <br>
      <br>
      <br>
      <h2 style="text-align: center;">Cart</h2>
      <br>
      <div class="container">
        <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Price per Item</th>
            <th scope="col">Price Total</th>
            <th scope="col">Qty</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cart) in carts" :key="cart.id">
            <th scope="row">
              {{ cart.itemId.name }}
              <br>
              <img :src="`${cart.itemId.image}`" alt="" border=3 height=200 width=150>
            </th>
            <td>{{ cart.itemId.price }}</td>
            <td>{{ cart.subPrice }}</td>
            <td>{{ cart.qty }}</td>
            <td>
            <button type="button" class="btn btn-secondary mr-1" data-toggle="modal" data-target="#editForm" @click="saveId(cart._id)">Edit</button>
            <button type="button" class="btn btn-secondary mr-1" data-toggle="modal" data-target="#ongkirForm" @click="saveId(cart._id)">Checkout</button>
            <button type="button" @click="deleteCart(cart._id)" class="btn btn-secondary mr-1">Delete</button>
            </td>
          </tr>
        </tbody>
        </table>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="editForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Quantity Item</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <form>
            <div class="form-group">
              <label>Quantity</label>
              <input type="number" class="form-control" v-model="qty">
            </div>
            </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" @click="editQty" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal Ongkir -->
      <div class="modal fade" id="ongkirForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Transfer Fee Form</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <form>
            <div class="form-group">
              <label>City</label>
                <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" v-model="selected">
                  <option selected>Choose...</option>
                  <option 
                  v-bind:value="{id: city.city_id}"
                  v-for="(city, i) in cities" :key="i">{{ city.city_name}}</option>
                </select>
              <label>Transfer Fee</label>
              <br>
              <input v-model="ongkir">
            </div>
            </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" @click="trueCart" class="btn btn-primary" data-dismiss="modal">Checkout</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import myAxios from '@/configs/myAxios.js'

export default {
  name: 'Cart',
  components: {
    Navbar
  },
  data () {
    return {
      carts: [],
      qty: '',
      id: '',
      cities: [],
      selected: '',
      ongkir: ''
    }
  },
  methods: {
    fetchCart () {
      myAxios({
        method: 'get',
        url: '/click/carts/user/pending',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.carts = data.carts
          console.log(data.carts)
        })
        .catch(console.log)
    },
    deleteCart (id) {
      myAxios({
        method: 'delete',
        url: `/click/carts/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data.message)
          this.fetchCart()
        })
        .catch(console.log)
    },
    trueCart () {
      myAxios({
        method: 'put',
        url: `/click/carts/${this.id}`,
        data: {
          status: 'checkout',
          ongkir: this.ongkir
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data.message)
          this.fetchCart()
        })
        .catch(console.log)
    },
    editQty () {
      myAxios({
        method: 'put',
        url: `/click/carts/${this.id}`,
        data: {
          qty: this.qty
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.qty = ''
          console.log(data.message)
          this.fetchCart()
        })
        .catch(console.log)
        .always($('#editForm').modal('hide'))
    },
    saveId (id) {
      alert('uhuy')
      this.id = id
      myAxios({
        method: 'GET',
        url: '/click/carts/city',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
          this.cities = data.rajaongkir.results
      })
      .catch(console.log)
    }
  },
  created () {
    this.fetchCart()
  },
  watch: {
    selected: function(val) {
      myAxios({
        method: 'GET',
        url: `click/carts/ongkir/${this.selected.id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        console.log(data.rajaongkir.results[0].costs[1].cost[0].value)
        this.ongkir = data.rajaongkir.results[0].costs[1].cost[0].value
      })
    }
  }

}
</script>

<style scoped>
.modal-content {
  top: 25vh !important;
}
</style>

