<template>
  <v-container>
    <post-list :posts="posts" />
    <p class="text-xs-center">
      <v-btn to="/posts" class="link">投稿をもっと見る</v-btn>
    </p>
  </v-container>
</template>

<script>
import PostList from '@/components/post-list.vue'
import axios from 'axios'

export default {
  async asyncData() {
    const response = await axios.get('http://wp-rest-api.localhost/wp-json/wp/v2/posts?per_page=3');
    return { posts: response.data };
  },
  components: {
    PostList,
  }
}
</script>

<style scoped>
.link {
  margin: 20px 0 0;
}
</style>

