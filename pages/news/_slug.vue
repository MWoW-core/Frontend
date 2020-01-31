<template>
  <card :title="article.title" color="black" class="p-4 text-gray-300">
    <article class="flex flex-col mt-4 p-4 text-gray-500">
      <h2 class="p-2">
        <pencil-icon />
        Written by {{ article.writer.name }}
      </h2>

      <h2 class="p-2">
        <category-icon />
        {{ article.category }}
      </h2>

      <h2 class="p-2">
        <calendar-icon />
        {{ toHumanDateTime(article.created_at) }}
      </h2>
    </article>

    <article>
      <h1 v-html="article.headline" class="p-4"></h1>

      <p v-html="article.comment" class="p-4"></p>
    </article>

    <hr class="border-gray-900" />

    <form v-if="user" @submit.prevent="saveCommentForm">
      <form-field :form="commentForm" attribute="comment" type="text">
        <template #label>
          &nbsp;
        </template>

        <template #input>
          <textarea
            v-model="commentForm.comment"
            class="p-2 mt-1 block w-full shadow rounded bg-semi-75 text-brand"
            rows="3"
            placeholder="Comment"
          />
        </template>
      </form-field>

      <loading-button
        :loading="state === states.SAVING_COMMENT"
        :class="{
          'text-white ripple-bg-brand': state === states.DEFAULT,
          'text-white ripple-bg-red-500': state === states.ERROR,
          'text-gray-700 bg-green-200': state === states.SAVED_COMMENT,
          'text-black bg-yellow-500': state === states.EDITING_COMMENT
        }"
        type="submit"
        class="w-full align-middle text-center select-none font-bold whitespace-no-wrap p-4 text-base leading-normal no-underline"
        >{{ state }}</loading-button
      >
    </form>

    <div class="p-2 flex flex-col">
      <card
        v-for="comment in article.comments"
        :key="comment.id"
        class="py-2 text-brand"
        color="gray-900"
      >
        <div class="flex flex-wrap items-center justify-between">
          <span>
            <h2 class="p-2 text-blue-500">
              <pencil-icon />
              {{ comment.commentator.name }}
            </h2>

            <h2 class="p-2 text-blue-500">
              <calendar-icon />
              {{ toHumanDateTime(comment.created_at) }}
            </h2>
          </span>

          <span class="p-2 mr-1">
            <trash-icon
              v-if="comment.authorization.delete"
              @click="deletingComment = comment"
              class="cursor-pointer text-brand"
            />
            <pencil-icon
              v-if="comment.authorization.update"
              @click="editComment(comment)"
              class="cursor-pointer text-brand"
            />
          </span>
        </div>

        <hr class="border-b border-gray-800" />

        <p v-html="comment.comment" class="py-4 px-2"></p>
      </card>

      <portal to="footer">
        <modal :visible="!!deletingComment" @close="deletingComment = null">
          <h1>Do you really want to delete the comment?</h1>

          <loading-button
            @click="deleteComment"
            :loading="state === states.DELETING_COMMENT"
            class="w-full align-middle ripple-bg-red-500 text-white text-center select-none font-bold whitespace-no-wrap p-4 text-base leading-normal no-underline"
          >
            Yes, delete it!
          </loading-button>
        </modal>
      </portal>
    </div>
  </card>
</template>

<script>
import { mapState } from 'vuex'
import CalendarIcon from 'vue-material-design-icons/Calendar.vue'
import PencilIcon from 'vue-material-design-icons/Pencil.vue'
import CategoryIcon from 'vue-material-design-icons/ViewHeadline.vue'
import TrashIcon from 'vue-material-design-icons/TrashCan'
import Card from '~/components/Card'
import LoadingButton from '~/components/LoadingButton'
import FormField from '~/components/FormField'
import Modal from '~/components/Modal'

const states = {
  DEFAULT: 'Comment',
  SAVING_COMMENT: 'Saving comment...',
  SAVED_COMMENT: 'Comment saved.',
  EDITING_COMMENT: 'Editing comment...',
  DELETING_COMMENT: 'Deleting comment...',
  ERROR: 'There were some errors...'
}

export default {
  validate({ params }) {
    // Must be a slug
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(params.slug)
  },

  components: {
    CalendarIcon,
    PencilIcon,
    CategoryIcon,
    TrashIcon,
    Card,
    LoadingButton,
    FormField,
    Modal
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      article: (state) => state.news.currentlyShown
    })
  },

  data: () => ({
    states,
    state: states.DEFAULT,
    errors: null,

    editingComment: null,
    deletingComment: null,

    commentForm: {
      comment: ''
    }
  }),

  async fetch({ store, params }) {
    await store.dispatch('news/show', { slug: params.slug })
  },

  methods: {
    async refresh() {
      await this.$store.dispatch('news/show', {
        slug: this.$route.params.slug
      })
    },

    async saveCommentForm() {
      const delegate = this.editingComment
        ? this.storeEditedComment
        : this.storeNewComment

      try {
        this.state = states.SAVING_COMMENT

        await delegate()

        this.state = states.SAVED_COMMENT

        await this.refresh()
      } catch (e) {
        this.state = states.ERROR
        this.errors = e
        throw e
      }
    },

    storeNewComment() {
      return this.$store.dispatch('news/comment', {
        article: this.article,
        comment: this.commentForm.comment
      })
    },

    storeEditedComment() {
      return this.$store.dispatch('comments/update', {
        id: this.editingComment.id,
        comment: this.commentForm.comment
      })
    },

    editComment(comment) {
      this.state = states.EDITING_COMMENT

      this.editingComment = comment

      this.commentForm.comment = comment.comment
    },

    async deleteComment() {
      await this.$store.dispatch('comments/delete', this.deletingComment)

      this.deletingComment = null

      await this.refresh()
    }
  }
}
</script>
