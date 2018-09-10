<template>
  <div>
    <h1>{{ post.title.rendered }}</h1>
    <div v-html="post.content.rendered"></div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData({ params }) {
    const { id } = params;
    const response = await axios.get(`http://wp-rest-api.localhost/wp-json/wp/v2/posts/${id}`);
    return { post: response.data };
  },
}
</script>
