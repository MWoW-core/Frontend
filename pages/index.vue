<template>
  <div class="bg-black px-2 rounded w-full">
    <heading class="text-brand">
      <single-select
        @change="
          (category) =>
            $router.push({
              path: $route.path,
              query: {
                ...$route.query,
                category
              }
            })
        "
        :options="categories"
      />
    </heading>

    <div class="flex flex-wrap justify-center m-4 p-4">
      <card
        v-for="article in news.data"
        :key="article.id"
        class="m-2 w-full text-gray-300"
        color="gray-800"
      >
        <heading slot="heading" class="text-center rounded">
          <nuxt-link :to="`/news/${article.slug}`">
            <link-icon />
            {{ article.title }}
          </nuxt-link>
        </heading>

        <span class="flex flex-col mt-4 p-4 text-gray-500">
          <h2 class="p-2">
            <pencil-icon />
            Written by {{ article.writer.name }}
          </h2>

          <h2
            @click="
              $router.push({
                path: $route.path,
                query: {
                  ...$route.query,
                  category: article.category
                }
              })
            "
            class="p-2 text-brand"
          >
            <category-icon />
            In {{ article.category }}
          </h2>

          <h2 class="p-2">
            <calendar-icon />
            {{ article.created_at }}
          </h2>
        </span>

        <h1 v-html="article.headline" class="p-4"></h1>

        <hr class="border-gray-900" />

        <div class="p-2 flex justify-between w-full">
          <div class="flex items-center text-brand px-2">
            <nuxt-link :to="`/news/${article.slug}`">
              <link-icon />
              Read more.
            </nuxt-link>
          </div>

          <div class="flex items-center text-brand px-2">
            <comment-icon />
            {{ article.comments_count }}
          </div>
        </div>
      </card>
    </div>

    <pagination :meta="news.meta" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CommentIcon from 'vue-material-design-icons/CommentMultiple.vue'
import LinkIcon from 'vue-material-design-icons/Link.vue'
import CalendarIcon from 'vue-material-design-icons/Calendar.vue'
import PencilIcon from 'vue-material-design-icons/Pencil.vue'
import CategoryIcon from 'vue-material-design-icons/ViewHeadline.vue'
import Card from '~/components/Card'
import Pagination from '~/components/Pagination'
import Heading from '~/components/Heading'
import SingleSelect from '~/components/SingleSelect'

export default {
  components: {
    Card,
    Pagination,
    Heading,
    SingleSelect,
    CommentIcon,
    LinkIcon,
    CalendarIcon,
    PencilIcon,
    CategoryIcon
  },

  watchQuery: ['category', 'page', 'perPage'],

  computed: {
    ...mapState({
      news: (state) => state.news.news,
      categories: (state) => state.news.categories
    })
  },

  async fetch({ store, route }) {
    if (store.state.news.categories.length === 0) {
      await store.dispatch('news/fetchCategories')
    }

    await store.dispatch('news/fetch', {
      query: {
        category: route.query.category || null,
        perPage: route.query.perPage || 5,
        page: route.query.page || 1
      }
    })
  }
}
</script>
