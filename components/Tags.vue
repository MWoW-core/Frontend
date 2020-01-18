<script>
export default {
  model: {
    prop: 'tags',
    event: 'update'
  },

  props: {
    deleteKey: {
      type: Array,
      default: () => ['backspace']
    },
    addKey: {
      type: Array,
      default: () => ['enter']
    },
    tags: {
      required: true
    }
  },

  data: () => ({
    tag: ''
  }),

  methods: {
    addTag() {
      if (this.tag.length === 0 || this.tags.includes(this.tag)) {
        return
      }

      this.$emit('update', [...this.tags, this.tag])
      this.tag = ''
    },

    removeTag(tag) {
      this.$emit('update', this.tags.filter(t => t !== tag))
    },

    removeTagIfBlank(e) {
      if (this.tag.length === 0) {
        this.$emit('update', this.tags.slice(0, -1))
      }
    }
  },

  render() {
    return this.$scopedSlots.default({
      tags: this.tags,

      removeTag: this.removeTag,
      addTag: this.addTag,

      bindings: {
        value: this.tag
      },

      events: {
        input: keyboardEvent => {
          this.tag = keyboardEvent.target.value
        },

        keydown: keyboardEvent => {
          if (this.deleteKey.includes(keyboardEvent.key)) {
            this.removeTagIfBlank()
          }

          if (this.addKey.includes(keyboardEvent.key)) {
            this.addTag()
            e.preventDefault()
          }
        }
      }
    })
  }
}
</script>
