<template>
  <div class="country-container">
    <div class="navigation">
      <button class="back-btn">
        <router-link :to="{ name: 'home' }" >Back</router-link>
      </button>
    </div>
    <div class="country-wrapper">
      <div class="flag">
        <img
        :alt="country.name"
        :src="country.flag"
      />
      </div>
      <div class="country">
        <h2>{{ country.name }}</h2>
        <div class="country-info">
          <ul>
            <li><b>Native Name: </b>{{ country.nativeName }}</li>
            <li><b>Population: </b>{{ country.population }}</li>
            <li><b>Region: </b>{{ country.region }}</li>
            <li><b>Sub Region: </b>{{ country.subregion }}</li>
            <li><b>Capital: </b>{{ country.capital }}</li>
          </ul>
          <ul>
            <li>
              <b>Top Level Domain: </b>
              <span v-for="(tld, index) in country.topLevelDomain" :key="index">{{ tld }}</span>
            </li>
            <li>
              <b>Currencies: </b>
              <span v-for="(currency, index) in country.currencies" :key="index">
                {{ currency.name }}
                <span v-if="country.currencies.length > 1 && index < country.currencies.length -1">, </span>
              </span>
            </li>
            <li>
              <b>Languages: </b>
              <span
                v-for="(language, index) in country.languages"
                :key="index"
              >
                {{ language.name }}
                <span v-if="country.languages.length > 1 && index < country.languages.length - 1">, </span>
              </span>
            </li>
          </ul>
        </div>
        <div class="border-info">
          <span><b>Border Countries: </b></span>
          <button v-for="(borderCountry, index) in borderCountries" :key="index">{{ borderCountry }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      borderCountries: [],
      borders: [],
      countries: {},
      country: {},
      countryName: this.$route.params.name
    }
  },
  methods: {
    getBorderCountries() {}
  },
  mounted() {
    axios
    .get('https://restcountries.eu/rest/v2/name/' + this.countryName)
    .then(response => (
    this.country = response.data[0],
    this.borders = response.data[0].borders
    )).then (() => (
      axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => (
        this.countries = response.data
        )).then(() => (
          this.borderCountries = this.borders.map(b => this.countries.find(c => c.alpha3Code.toUpperCase() === b.toUpperCase()).name)
        ))
    ))
    
  },
  name: 'Country'
}
</script>

<style lang="scss">
  @import "../assets/scss/variables.scss";

  .country-container {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    justify-content: space-between;
    padding: 0 5%;
    width: 100%;
  }

  .country-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .back-btn {
    background-color: $very-light-grey;
    box-shadow: $box-shadow;
    border: none;
    border-radius: $border-radius;
    margin: 4rem 0;
    padding: 0.7rem 2rem;
  }

  .back-btn a {
    color: $very-dark-blue-text;
    font-size: $details-font-size;
    text-decoration: none;
  }

  .flag {
    flex-basis: 50%;
  }

  .flag { 
    img {
      width: 100%;
    }
  }

  .country {
    flex-basis: 55%;
    margin-left: 2rem;
    padding: 2rem 2rem 6rem;

    h2 {
      font-size: 2rem;
    }
  }

  .country-info {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    font-size: $details-font-size;
    height: 10rem;
    
    ul {
      margin: 2rem 0;
    }

    ul li {
      line-height: 2rem;
      list-style-type: none;
    }
  }

  .border-info {
    margin: 2rem 0;

    span {
      font-size: 1.2em;
      line-height: 3rem;
    }

    button {
      background-color: $very-light-grey;
      box-shadow: $box-shadow;
      border: none;
      border-radius: $border-radius;
      margin-bottom: 0.5rem;
      margin-left: 0.5rem;
      padding: 0.4rem 1rem;
    }
  }

  @media only screen and (max-width: 768px) {
    .country-wrapper {
      flex-wrap: wrap;
    }

    .country {
      margin-left: 0;
      padding: 2rem 0;
    }

    .flag {
      flex-basis: 100%;
    }

    .country-info {
      height: auto;
    }
  }
</style>