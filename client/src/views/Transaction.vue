<template>
  <div class="Cart">
      <Navbar/>
      <br>
      <br>
      <br>
      <br>
      <h2 style="text-align: center;">Transaction History</h2>
      <br>
      <div class="container">
        <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Item</th>
            <th scope="col">Qty</th>
            <th scope="col">Sub Price</th>
            <th scope="col">Transfer Fee</th>
            <th scope="col">Total Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cart) in carts" :key="cart.id">
            <td> {{ cart.updatedAt.split('T')[0] }}</td>
            <td scope="row"><b>{{ cart.itemId.name }}</b>
              <br>
              {{ cart.itemId.price }}
              <br>
              <img :src="`${cart.itemId.image}`" alt="" border=3 height=200 width=150>
            </td>
            <td>{{ cart.qty }}</td>
            <td>{{ cart.subPrice }}</td>
            <td>{{ cart.ongkir }}</td>
            <td>{{ cart.subPrice + cart.ongkir }}</td>
            <td>
            <button type="button" @click="deleteCart(cart._id)" class="btn btn-secondary mr-1">Delete</button>
            <button v-if="cart.status == 'checkout'" type="button" @click="delivered(cart._id)" class="btn btn-secondary mr-1">Delivered</button>
            </td>
          </tr>
        </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import myAxios from '@/configs/myAxios.js'

export default {
  name: 'Transaction',
  components: {
    Navbar
  },
  data () {
    return {
      carts: [],
      id: '',
    }
  },
  methods: {
    delivered(id) {
      myAxios({
        method: 'put',
        url: `/click/carts/confirm/${id}`,
        data: {
          status: 'delivered'
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.fetchCart()
      })
      .catch(console.log)
    },
    fetchCart () {
      myAxios({
        method: 'get',
        url: '/click/carts/user/history',
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
    saveId (id) {
      this.id = id
    }
  },
  created () {
    this.fetchCart()
  }

}
</script>

<style scoped>
.modal-content {
  top: 30vh !important;
}
</style>
