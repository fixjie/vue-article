<template>
  <div ref="editor"
       class=".qf-editor"></div>
</template>

<script>
import E from 'wangeditor'
export default {
  name: 'editor',
  data () {
    return {
      editorContent: ''
    }
  },
  methods: {
  },
  props: {
    content: {
      type: String
    }
  },
  mounted () {
    this.editor = new E(this.$refs.editor)
    // this.editor.customConfig.onchange = (html) => {
    //   this.editorContent = html
    // }
    this.editor.create()
    this.editor.txt.html(this.content)
    // this.editorContent = this.content
  },
  watch: {
    content () {
      this.editor.txt.html(this.content)
      // this.editorContent = this.content
    }
  }
}
</script>

<style lang="less" scoped>

</style>
