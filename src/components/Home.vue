<template>
  <div class="container">
    <div class="search-wrapper">
      <input class="search"/>
      <select
        class="filter-options"
        v-on:change="filterCountriesByRegion($event.target.value)"
      >
        <option
          v-for="(region, index) in regions"
          :key="index"
          :value="region"
        >
          {{ region }}
        </option>
      </select>
    </div>
    <div class="card-container">
      <div 
        class="country-card"
        v-for="country in countries"
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
      countries: null,
      countryData: null,
      filteredCountries: null,
      regions: null
    }
  },
  methods: {
    filterCountriesByRegion(region) {
      this.resetCountries();
      this.countries = this.countries.filter(country => country.region.toLowerCase() === region.toLowerCase());
    },
    getRegions(countries) {
      this.regions = [...new Set(countries.map(country => country.region))];
      this.regions.splice(0, 0, 'Filter by region');
    },
    resetCountries() {
      this.countries = this.countryData.map(country => country);
    }
  },
  mounted () {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => (
        this.countries = response.data,
        this.countryData = response.data,
        this.getRegions(response.data)
        ))
  }
}
</script>

<style>
  .container {
    margin: 0 5%;
  }

  .search-wrapper {
    display: flex;
    justify-content: space-between;
    margin: 24px 0;
  }

  .search {
    -webkit-box-shadow: 3px 4px 16px 2px rgba(209,209,209,1);
    -moz-box-shadow: 3px 4px 16px 2px rgba(209,209,209,1);
    box-shadow: 3px 4px 16px 2px rgba(209,209,209,1);
    border: none;
    line-height: 2.5em;
    min-width: 320px;
  }

  .filter-options {
    line-height: 2.5em;
  }

  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
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