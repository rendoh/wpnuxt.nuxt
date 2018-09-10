<template>
  <v-container grid-list-md class="container">
    <v-layout wrap>
      <v-flex v-for="post of posts" :key="post.id" xs4 class="flex-item">
        <v-card class="card" ripple :to="`/posts/${post.id}`" hover>
          <v-card-title>
            <h2>{{ post.title.rendered }}</h2>
          </v-card-title>
          <v-card-text>
            <p>{{ post.excerpt.rendered | ellipsis }}</p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['posts'],
  filters: {
    ellipsis(value) {
      if (!value || value.length < 30) return value;
      return `${value.substr(0, 30)}…`;
    }
  },
}
</script>

<style scoped>
.container {
  padding: 0;
}
.flex-item {
  display: flex;
}
.card {
  width: 100%;
}
</style>


