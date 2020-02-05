<template>
  <div class="container">
    <div class="search"></div>
    <div class="card-container">
      <div 
        class="country-card"
        v-for="country in info"
        :key="country.id"
        >
          <div
            class="image-wrapper"
            :style="{ backgroundImage: 'url(' + country.flag + ')' }"
          >
          </div>
          <div class="card-content">
            <h2>{{ country.name }}</h2>
            <p>Population: {{ country.population }}</p>
            <p>Region: {{ country.region }}</p>
            <p>Capital: {{ country.capital }}</p>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  data () {
    return {
      info: null
    }
  },
  mounted () {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => (this.info = response.data))
  }
}
</script>

<style>
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  .country-card {
    -webkit-box-shadow: 3px 4px 16px 2px rgba(209,209,209,1);
    -moz-box-shadow: 3px 4px 16px 2px rgba(209,209,209,1);
    box-shadow: 3px 4px 16px 2px rgba(209,209,209,1);
    flex-basis: 21%;
    margin: 15px 0;
  }

  .image-wrapper {
    background-position: center;
    background-size: cover;
    height: 150px;
    width: 100%;
  }

  .card-content {
    padding: 0 15px;
  }
</style>