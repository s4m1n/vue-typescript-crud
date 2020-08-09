<template>
  <v-app-bar app color="secondary" dark>
    <v-toolbar-title>
      <router-link class="link-style" to="/">CRUD</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn text rounded to="/posts">Posts</v-btn>
    <v-btn text rounded to="/categories">Categories</v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Header extends Vue {}
</script>

<style>
.link-style {
  color: white;
  text-decoration: none;
}
</style>
