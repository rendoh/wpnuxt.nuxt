<template>
  <v-container class="conatiner">
    <h1 class="hero">
      WP + NUXT + Lambda
    </h1>
    <post-list :posts="posts" />
    <div class="text-xs-center">
      <v-btn to="/posts" class="link">投稿をもっと見る</v-btn>
    </div>
  </v-container>
</template>

<script>
import PostList from '@/components/post-list.vue'
import axios from 'axios'

export default {
  async asyncData() {
    const response = await axios.get(`${process.env.API_URL}/wp-json/wp/v2/posts?per_page=3`);
    return { posts: response.data };
  },
  components: {
    PostList,
  }
}
</script>

<style scoped>
.hero {
  font-weight: bold;
  font-size: 85px;
  text-align: center;
  color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-shadow: 0 0 5px #1976d2;
  line-height: 1.25;
}

.link {
  margin: 20px 0 0;
}
</style>
