<template>
  <div class="Cart">
      <Navbar/>
      <br>
      <br>
      <br>
      <br>
      <h2 style="text-align: center;">All Transaction</h2>
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
            <th scope="col">Customer</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cart) in carts" :key="cart.id">
            <td>{{ cart.updatedAt.split('T')[0] }}</td>
            <td scope="row"><b>{{ cart.itemId.name }}</b>
              <br>
              Rp.{{ cart.itemId.price }}
              <br>
              <img :src="`${cart.itemId.image}`" alt="" border=3 height=200 width=150>
            </td>
            <td>{{ cart.qty }}</td>
            <td>Rp.{{ cart.subPrice }}</td>
            <td>Rp.{{ cart.ongkir }}</td>
            <td>Rp.{{ cart.subPrice + cart.ongkir }}</td>
            <td>{{ cart.userId.name }} <br><i>{{ cart.userId.email}}</i></td>
            <td>{{ cart.status }}</td>
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
  name: 'UserTransaction',
  components: {
    Navbar
  },
  data() {
    return {
      carts: ''
    }
  },
  methods: {
    fetchCart () {
      myAxios({
        method: 'get',
        url: '/click/carts',
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
  },
  created() {
    this.fetchCart()
  }
}
</script>

<style>

</style>