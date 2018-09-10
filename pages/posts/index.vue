<template>
  <v-container>
    <post-list :posts="posts" />
    <div class="pagenation">
      <v-pagination
        v-model="page"
        :length="totalPages"
        @input="input"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import PostList from '@/components/post-list.vue'
import axios from 'axios'

export default {
  async asyncData({ query }) {
    const page = query.page || 1;
    const response = await axios.get(`http://wp-rest-api.localhost/wp-json/wp/v2/posts?per_page=12&page=${page}`);
    return {
      posts: response.data,
      totalPages: parseInt(response.headers['x-wp-totalpages']),
      page,
    };
  },
  components: {
    PostList,
  },
  methods: {
    input(value) {
      console.log(value); // TODO watch page and translate to valued page
    }
  }
}
</script>

<style scoped>
.pagenation {
  text-align: center;
  margin-top: 20px;
}
</style>

