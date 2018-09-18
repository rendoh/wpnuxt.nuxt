<template>
  <v-container>
    <transition name="slide" mode="out-in">
      <post-list :posts="posts" :key="page" />
    </transition>
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
  const response = await axios.get(`${process.env.API_URL}/wp-json/wp/v2/posts?per_page=12&page=${page}`);
  return {
    posts: response.data,
    totalPages: parseInt(response.headers['x-wp-totalpages']),
    page,
  };
}

export default {
  watchQuery: ['page'],
  // key: to => to.fullPath,
  async asyncData({ query }) {
    const page = parseInt(query.page || 1);
    return await fetchPosts(page);
  },
  components: {
    PostList,
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
  },
}
</script>

<style scoped>
.pagenation {
  text-align: center;
  margin-top: 20px;
}

.slide-enter-active {
  transition: all .3s ease-out;
}

.slide-leave-to {
  transition: all .3s ease-in;
}

.slide-enter-active, .slide-leave-active {
  transform: scale(1);
}

.slide-enter {
  opacity: 0;
  transform: scale(0.95);
}

.slide-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

</style>

