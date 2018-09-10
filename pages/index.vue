<template>
  <div>
    <post-list :posts="posts" />
    <nuxt-link to="/posts">投稿をもっと見る</nuxt-link>
  </div>
</template>

<script>
import PostList from '@/components/post-list.vue'
import axios from 'axios'

export default {
  async asyncData() {
    const response = await axios.get('http://wp-rest-api.localhost/wp-json/wp/v2/posts?per_page=3');
    return { posts: response.data };
  },
  created() {
    console.log(this.posts)
  },
  components: {
    PostList,
  }
}
</script>
