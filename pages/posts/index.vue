<template>
  <post-list :posts="posts" />
</template>

<script>
import PostList from '@/components/post-list.vue'
import axios from 'axios'

export default {
  async asyncData() {
    const response = await axios.get('http://wp-rest-api.localhost/wp-json/wp/v2/posts?per_page=10');
    console.log(response);
    return { posts: response.data };
  },
  components: {
    PostList,
  },
}
</script>
