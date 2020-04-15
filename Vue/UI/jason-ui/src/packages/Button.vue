<template>
  <button class="ja-button" :class="btnClass">
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'ja-button',
  props: {
    type: {
      type: String,
      default: '',
      validator (type) {
        if (type && !['warning', 'success', 'danger', 'info', 'primary'].includes(type)) {
          console.error('type error')
        }
        return true
      }
    },
    icon: {
      type: String,
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator (type) {
        if (type && !['left', 'right'].includes(type)) {
          console.error('type error')
        }
        return true
      }
    }
  },
  computed: {
    btnClass () {
      let classes = []
      if (this.type) {
        classes.push(`ja-button-${this.type}`)
      }
      return classes
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
