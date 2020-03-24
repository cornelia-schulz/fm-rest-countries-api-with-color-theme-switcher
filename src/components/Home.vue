<template>
  <div
    class="container"
    :class="dark ? 'dark' : 'light'"
  >
    <div class="search-wrapper">
      <div
        class="search-input-wrapper"
        :class="dark ? 'element-dark' : 'element-light'"
        name="search-term"
      >
        <span class="search-icon">
        <i class="fas fa-search"></i>
      </span>
      <input
        class="icon search"
        placeholder="Search for a country..."
        type="text"
        v-on:keyup="findCountry($event.target.value)"
      />
      </div>
      <div
        class="filter-wrapper"
        :class="dark ? 'element-dark' : 'element-light'"
      >
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
      <span class="filter-icon"><i class="fas fa-chevron-down"></i></span>
      </div>
    </div>
    <div class="card-container">
      <router-link
        class="country-card"
        :class="dark ? 'element-dark' : 'element-light'"
        v-for="(country, index) in countries"
        :key="index"
        :to="{ name: 'country', params: { name: country.name, country: country, countries: countries }}"
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
      </router-link>
    </div>
  </div>
</template>

<script charset="utf-8">
import axios from 'axios';

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
  computed: {
    dark () {
      return this.$store.state.dark
    }
  },
  methods: {
    filterCountriesByRegion(region) {
      this.resetCountries();
      if (region !== 'Show all countries') {
        this.countries = this.countries.filter(country => country.region.toLowerCase() === region.toLowerCase());
      }
    },
    findCountry(name) {
      this.resetCountries();
      this.countries = this.countries.filter(country => country.name.toLowerCase().includes(name.toLowerCase()));
    },
    getRegions(countries) {
      this.regions = [...new Set(countries.map(country => country.region))];
      this.regions.splice(0, 0, 'Show all countries');
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

<style lang="scss">
  @import "../assets/scss/variables.scss";

  .container {
    margin: 0 5%;
  }

  .search-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 24px 0;
  }

  .search-input-wrapper {
    align-items: center;
    border-radius: $border-radius;
    color: $dark-grey;
    display: flex;
    line-height: 2.5rem;
    padding: 0.5rem;
  }

  .search-icon {
    padding: 0 1rem;
  }

  .search {
    background-color: $very-light-grey;
    border: none;
    color: $dark-grey;
    min-width: 320px;
    text-decoration: inherit;

    .element-dark & {
      background-color: $dark-blue;
    }
  }

  .filter-wrapper {
    border-radius: $border-radius;
    line-height: 2.5em;
    padding: 0.5rem;

    &.element-dark {
      color: $very-light-grey;
    }
  }

  .filter-options {
    background-color: $very-light-grey;
    border: none;
    color: $dark-grey;

    .element-dark & {
      background-color: $dark-blue;
    }
  }

  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .country-card {
    border-radius: $border-radius;
    flex-basis: 21%;
    margin: 15px 0;
    text-decoration: none;
  }

  .image-wrapper {
    background-position: center;
    background-size: cover;
    height: 10rem;
    width: 100%;
  }

  .card-content {
    padding: 2rem 1.5rem;

    h2 {
      font-size: $details-font-size;
      line-height: 2.5rem;
    }

    p {
      font-size: $home-font-size;
      line-height: 1.7rem;
    }
  }

@media only screen and (max-width: 1000px) {
  .country-card {
    flex-basis: 31%;
  }
}

@media only screen and (max-width: 600px) {
  .country-card {
    flex-basis: 48%;
  }

  .search-input-wrapper {
    margin-bottom: 1rem;
  }

  .search {
    width: 100%;
  }
}

@media only screen and (max-width: 450px) {
  .country-card {
    flex-basis: 100%;
  }
}
</style>