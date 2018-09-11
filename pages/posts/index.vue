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

async function fetchPosts(page) {
  const response = await axios.get(`http://wp-rest-api.localhost/wp-json/wp/v2/posts?per_page=12&page=${page}`);
  return {
    posts: response.data,
    totalPages: parseInt(response.headers['x-wp-totalpages']),
    page,
  };
}

export default {
  async asyncData({ query }) {
    const page = parseInt(query.page || 1);
    return await fetchPosts(page);
  },
  components: {
    PostList,
  },
  watch: {
    async page(value) {
      const data = await fetchPosts(value);
      Object.assign(this, data);
    },
  },
  methods: {
    input(value) {
      this.$router.push({
        path: 'posts',
        query: {
          page: value,
        },
      });
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

