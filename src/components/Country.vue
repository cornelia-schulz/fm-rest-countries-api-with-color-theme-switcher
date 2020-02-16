<template>
  <div class="country-container">
    <div class="navigation">
      <button>
        Back
      </button>
    </div>
    <div class="country-wrapper">
      <img
        :alt="country.name"
        :src="country.flag"
      />
      <div class="country">
        <h2>{{ country.name }}</h2>
        <div class="country-info">
          <p><b>Native Name: </b>{{ country.nativeName }}</p>
          <p><b>Population: </b>{{ country.population }}</p>
          <p><b>Region: </b>{{ country.region }}</p>
          <p><b>Sub Region: </b>{{ country.subregion }}</p>
          <p><b>Capital: </b>{{ country.capital }}</p>
          <p><b>Top Level Domain: </b>{{ country.topLevelDomain[0] }}</p>
          <p>
            <b>Currencies: </b>
            <span v-for="currency in country.currencies" :key="currency">{{ currency.name }}</span>
        </p>
        <p>
          <b>Languages: </b>
          <span v-for="language in country.languages" :key="language">{{ language.name }}</span>
        </p>
        </div>
        <div class="border-info">
          <span><b>Border Countries</b></span>
          <button v-for="borderCountry in country.borders" :key="borderCountry">{{ borderCountry }}</button>
        </div>
        <!-- {{country}} -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['country-data'],
    data () {
      return {
        country: this.$route.params.country,
        countryName: this.$route.params.name
      }
    },
    created () {

    },
    name: 'Country'
  }
</script>

<style></style>