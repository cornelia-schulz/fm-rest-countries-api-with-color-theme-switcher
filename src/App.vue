<template>
  <div
    :class="dark ? 'dark' : 'light'"
    id="app"
  >
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  },
  computed: {
    dark () {
      return this.$store.state.dark
    }
  },
  name: 'app'
}
</script>

<style lang=scss>
  @import "./assets/scss/reset.scss";
  @import "./assets/scss/styles.scss";
</style>
