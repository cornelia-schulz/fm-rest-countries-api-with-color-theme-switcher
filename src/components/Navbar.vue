<template>
  <header class="header">
    <h1>Where in the world?</h1>
    <button>
      <i class="fas fa-moon"></i>
      Dark Mode
    </button>
  </header>
</template>

<script>
  export default {
    name: 'navbar'
  }
</script>

<style>
  .header {
    -webkit-box-shadow: 3px 4px 16px 2px rgba(209,209,209,1);
    -moz-box-shadow: 3px 4px 16px 2px rgba(209,209,209,1);
    box-shadow: 3px 4px 16px 2px rgba(209,209,209,1);
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0 5%;
    width: 100%;
  }
</style>