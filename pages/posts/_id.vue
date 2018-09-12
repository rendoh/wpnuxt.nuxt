<template>
  <v-container class="article">
    <h1>{{ post.title.rendered }}</h1>
    <div v-html="post.content.rendered"></div>
    <div class="comment-heading">
      <h2>コメント</h2>
      <v-btn class="comment-heading-btn" @click="dialog = true">
        コメントを書く
      </v-btn>
    </div>
    <transition-group name="comment-list" tag="div" class="comments-list">
      <v-card v-for="comment of comments" :key="comment.id">
        <v-card-text>
          <p>{{ comment.author_name }}</p>
          <p>{{ comment.date | date }}</p>
          <div v-html="comment.content.rendered"></div>
        </v-card-text>
      </v-card>
    </transition-group>

    <div v-if="commentPage < totalCommentPages" class="text-xs-center">
      <v-btn @click="fetchOldComments">さらに読み込む</v-btn>
    </div>

    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-form
          v-model="valid"
          ref="form"
          @submit.prevent="postComment"
        >
          <v-card-text>
            <v-text-field
              v-model="form.author_name"
              :rules="rules.author_name"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.author_email"
              :rules="rules.author_email"
              label="Email"
              required
            ></v-text-field>
            <v-textarea
              v-model="form.content"
              :rules="rules.content"
              label="Content"
              required
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn type="submit" :disabled="!valid">送信</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios'

async function fetchPost(id) {
  const response = await axios.get(`http://wp-rest-api.localhost/wp-json/wp/v2/posts/${id}`);
  return response.data;
}

async function fetchComments(id, page = 1) {
  const response = await axios.get('http://wp-rest-api.localhost/wp-json/wp/v2/comments/', {
    params: {
      post: id,
      per_page: 5,
      page,
    },
  });
  const { headers, data } = response;
  return { totalCommentPages: headers['x-wp-totalpages'], comments: data };
}

export default {
  async asyncData({ params, error }) {
    const { id } = params;
    try {
      const [post, commentResponse] = await Promise.all([
        fetchPost(id),
        fetchComments(id),
      ]);
      return { post, comments: commentResponse.comments, totalCommentPages: commentResponse.totalCommentPages };
    } catch (e) {
      if (e.response && e.response.data) {
        const { data, message } = e.response.data;
        error({ statusCode: data.status, message })
      } else {
        error({ statusCode: 503, message: 'Service Unavailable' })
      }
    }
  },
  data() {
    return {
      dialog: false,
      valid: false,
      form: {
        content: '',
        author_name: '',
        author_email: '',
      },
      rules: {
        content: [
          v => !!v || '内容は必須項目です'
        ],
        author_name: [
          v => !!v || '名前は必須項目です'
        ],
        author_email: [
          v => !!v || 'メールアドレスは必須項目です',
          v => /.+@.+/.test(v) || 'メールアドレスの形式が正しくありません'
        ],
      },

      commentPage: 1,
    }
  },
  created() {
    console.log(this.post);
    console.log('---')
    console.log(this.comments)
  },
  methods: {
    async postComment() {
      if (!this.$refs.form.validate()) {
        return;
      }
      const {
        content,
        author_name,
        author_email,
      } = this.form;
      const response = await axios.post('http://wp-rest-api.localhost/wp-json/wp/v2/comments/', {
        post: this.$route.params.id,
        content,
        author_name,
        author_email,
      })
        .catch(e => console.log(e.response))
        .then(response => {
          const { data } = response;
          if (data.status === 'approved') {
            this.comments.splice(0, 0, data);
          } else {
            console.log('承認待ちコメントを受け付けました。')
          }

          this.clear();
          this.dialog = false;
        });
    },
    clear() {
      this.$refs.form.reset();
    },
    async fetchOldComments() {
      this.commentPage += 1;
      const { totalCommentPages, comments } = await fetchComments(this.post.id, this.commentPage);
      Object.assign(this, {
        totalCommentPages,
        comments: [...this.comments, ...comments],
      });
    },
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

.comment-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.comment-heading-btn {
  margin: 0;
}

.comment-list-enter-active, .comment-list-leave-active {
  transition: all .5s;
}

.comment-list-enter, .comment-list-leave-to {
  opacity: 0;
}

.comment-list-move {
  transition: transform .5s;
}

</style>

