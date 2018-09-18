<template>
  <v-app>
    <v-toolbar color="primary" dark fixed>
      <v-toolbar-title>
        <nuxt-link class="home" to="/">WPNuxt</nuxt-link>
      </v-toolbar-title>
    </v-toolbar>
    <div class="content">
      <nuxt />
    </div>
  </v-app>
</template>

<style scoped>
.content {
  padding-top: 64px;
  z-index: 1;
  position: relative;
}
.home {
  color: #fff;
  text-decoration: none;
}

.canvas {
  position: fixed;
  z-index: 0;
  height: 100%;
  width: 100%;
}
</style>

