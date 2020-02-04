<template>
  <div class="container">
    <div class="search"></div>
    <div class="card-container">
      <div 
        class="country-card"
        v-for="country in info"
        :key="country.id"
        >
          <img :alt="country.name" src="country.flag" />
          <h2>{{ country.name }}</h2>
          <p>Population: {{ country.population }}</p>
          <p>Region: {{ country.region }}</p>
          <p>Capital: {{ country.capital }}</p>
          <!-- {{ country }} -->
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

<style></style>