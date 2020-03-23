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
  import { EventBus } from '../event-bus.js';

  export default {
    data() {
      return {
        buttonText: ' Dark Mode',
        dark: false
      }
    },
    methods: {
      switchDisplayMode() {
        this.dark = !this.dark;
        this.buttonText = this.dark ? ' Light Mode' : ' Dark Mode';
        EventBus.$emit('switch-theme', this.dark);
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
    padding: 2rem 5%;
    width: 100%;
  }

  .home-link {
    color: $black;
    text-decoration: none;
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