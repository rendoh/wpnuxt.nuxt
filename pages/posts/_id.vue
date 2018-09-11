<template>
  <v-container class="article">
    <h1>{{ post.title.rendered }}</h1>
    <div v-html="post.content.rendered"></div>

    <h2>コメント</h2>
    <div class="comments-list">
      <v-card v-for="comment of comments" :key="comment.id">
        <v-card-text>
          <p>{{ comment.author_name }}</p>
          <p>{{ comment.date | date }}</p>
          <div v-html="comment.content.rendered"></div>
        </v-card-text>
      </v-card>
    </div>

    <button @click="postComment">post</button>
  </v-container>
</template>

<script>
import axios from 'axios'

async function fetchPost(id) {
  const response = await axios.get(`http://wp-rest-api.localhost/wp-json/wp/v2/posts/${id}`);
  return response.data;
}

async function fetchComments(id) {
  const response = await axios.get(`http://wp-rest-api.localhost/wp-json/wp/v2/comments/?post=${id}`);
  return response.data;
}

export default {
  async asyncData({ params, error }) {
    const { id } = params;
    try {
      const [post, comments] = await Promise.all([
        fetchPost(id),
        fetchComments(id),
      ]);
      return { post, comments };
    } catch (e) {
      if (e.response && e.response.data) {
        const { data, message } = e.response.data;
        error({ statusCode: data.status, message })
      } else {
        error({ statusCode: 503, message: 'Service Unavailable' })
      }
    }
  },
  created() {
    console.log(this.post);
    console.log('---')
    console.log(this.comments)
  },
  methods: {
    postComment() {
      axios.post('http://wp-rest-api.localhost/wp-json/wp/v2/comments/', {
        post: this.$route.params.id,
        content: 'lorem ipsum dolor sit amet!',
        author_name: 'Me!',
        author_email: 'r-endo@studio-spoon.co.jp',
      }).catch(e => console.log(e.response));
    }
  },
  filters: {
    date(value) {
      const date = new Date(value);
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    }
  }
}
</script>

<style scoped>

.article >>> img {
  max-width: 100%;
}

.comments-list > *:not(:last-child) {
  margin-bottom: 8px;
}

</style>

