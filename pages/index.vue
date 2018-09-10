<template>
  <div>
    <app-logo/>
    <post-list :posts="posts" />
    <nuxt-link to="/posts">投稿をもっと見る</nuxt-link>
  </div>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import PostList from '@/components/post-list.vue'
import axios from 'axios'

export default {
  async asyncData() {
    const response = await axios.get('http://wp-rest-api.localhost/wp-json/wp/v2/posts?per_page=3');
    console.log(response);
    return { posts: response.data };
  },
  created() {
    console.log(this.posts)
  },
  components: {
    AppLogo,
    PostList,
  }
}
</script>

<style>

</style>

