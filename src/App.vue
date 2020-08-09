<template>
  <v-app>
    <v-main>
      <Header />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';

@Component({
  components: {
    Header,
  },
})
export default class Home extends Vue {}
</script>
