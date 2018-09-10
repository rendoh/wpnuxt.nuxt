<template>
  <ul>
    <li v-for="post of posts" :key="post.id">
      <nuxt-link :to="`/posts/${post.id}`">
        <h2>{{ post.title.rendered }}</h2>
        <p>{{ post.excerpt.rendered }}</p>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['posts'],
}
</script>

