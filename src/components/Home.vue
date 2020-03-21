<template>
  <div
    class="container"
    :class="dark ? 'dark' : 'light'"
  >
    <div class="search-wrapper">
      <input
        class="icon search"
        :class="dark ? 'element-dark' : 'element-light'"
        placeholder="&#xF002; Search for a country..."
        type="text"
        v-on:keyup="findCountry($event.target.value)"
      />
      <select
        class="filter-options"
        :class="dark ? 'element-dark' : 'element-light'"
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
import { EventBus } from '../event-bus.js';

export default {
  name: 'home',
  data () {
    return {
      countries: null,
      countryData: null,
      dark: false,
      filteredCountries: null,
      regions: null
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
    },
    switchDisplayMode() {
      EventBus.$on('switch-theme', dark => {
      this.dark = dark;
      });
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
    
    EventBus.$on('switch-theme', dark => {
      this.dark = dark;
    });
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

  .search {
    border: none;
    border-radius: $border-radius;
    color: $dark-grey;
    font-family: "FontAwesome 5 Free", "Open Sans", Verdana, sans-serif;
    font-style: normal;
    font-weight: normal;
    line-height: 2.5rem;
    min-width: 320px;
    padding: 0.5rem;
    text-decoration: inherit;
  }

  .filter-options {
    border: none;
    border-radius: $border-radius;
    color: $dark-grey;
    line-height: 2.5em;
    padding: 0.5rem;

    &:after {
      content: "ccc";
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

  .search {
    margin-bottom: 1rem;
    width: 100%;
  }
}

@media only screen and (max-width: 450px) {
  .country-card {
    flex-basis: 100%;
  }
}
</style>