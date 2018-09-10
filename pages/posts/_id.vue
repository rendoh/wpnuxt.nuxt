<template>
  <v-container class="article">
    <h1>{{ post.title.rendered }}</h1>
    <div v-html="post.content.rendered"></div>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData({ params, error }) {
    const { id } = params;
    try {
      const response = await axios.get(`http://wp-rest-api.localhost/wp-json/wp/v2/posts/${id}`);
      return { post: response.data };
    } catch (e) {
      if (e.response && e.response.data) {
        const { data, message } = e.response.data;
        error({ statusCode: data.status, message })
      } else {
        error({ statusCode: 503, message: 'Service Unavailable' })
      }
    }
  },
}
</script>

<style scoped>

.article >>> img {
  max-width: 100%;
}

</style>

