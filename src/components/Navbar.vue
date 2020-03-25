<template>
  <header
    class="header"
    :class="dark ? 'element-dark' : 'element-light'"
  >
    <router-link
      class="home-link"
      :to="{ name: 'home' }"
    >
      <h1>Where in the world?</h1>
    </router-link>
    <button
      class="btnMode"
      :class="dark ? 'element-dark' : 'element-light'"
      @click="switchDisplayMode"
    >
      <i :class="dark ? 'fas fa-lightbulb' : 'fas fa-moon'"></i>
      <span>{{ buttonText }}</span>
    </button>
  </header>
</template>

<script>
  export default {
    data() {
      return {
        buttonText: ' Dark Mode'
      }
    },
    computed: {
    dark () {
      return this.$store.state.dark
    }
  },
    methods: {
      switchDisplayMode() {
        this.$store.dispatch('switchDisplayMode');
      }
    },
    name: 'navbar'
  }
</script>

<style lang="scss">
  @import "../assets/scss/variables.scss";
  
  .header {
    display: flex;
    justify-content: space-between;
    padding: 1.9rem 5%;
    width: 100%;
  }

  .home-link {
    color: $black;
    text-decoration: none;

    .element-dark & {
      color: $very-light-grey;
    }
  }

  .btnMode {
    border: none;
    box-shadow: none;

    &.element-light {
      border: none;
      box-shadow: none;
    }  
  }

  @media only screen and (max-width: 375px) {
    .header {
      h1 {
        font-size: 1.2em;
      }
    }
  }
</style>