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
  watchQuery: ['page'],
  key: to => to.fullPath,
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
  transition(to, from) {
    if (!from || !from.query.page) return 'page';
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  }
}
</script>

<style scoped>
.pagenation {
  text-align: center;
  margin-top: 20px;
}

.slide-right-enter-active, .slide-right-leave-active {
  transition: all .3s;
  transform: translateX(0);
}
.slide-right-enter, .slide-right-leave-to {
  opacity: 0;
}

.slide-right-enter {
  transform: translateX(-20px);
}

.slide-right-leave-to {
  transform: translateX(20px);
}

.slide-left-enter-active, .slide-left-leave-active {
  transition: all .3s;
  transform: translateX(0);
}
.slide-left-enter, .slide-left-leave-to {
  opacity: 0;
}

.slide-left-enter {
  transform: translateX(20px);
}

.slide-left-leave-to {
  transform: translateX(-20px);
}

</style>

