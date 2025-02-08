<template>
  <textarea ref="editor1" name="editor1" id="editor1" cols="30" rows="10"></textarea>
</template>
<script>
import { onMounted, ref } from "vue";
export default {
  name: "CkEditor", // Change the component name to "CkEditor"
  props: ["content"],
  setup(props) {
    const content = ref(props.content);
    let ckEditor;
    onMounted(() => {
      // initial ck editor
      ckEditor = window.CKEDITOR.replace("editor1");
      ckEditor.setData(content.value);
    });
  },
};
</script>
<style scoped>
#cke_editor1 .cke_top {
  border-bottom: 1px solid #d9dee3;
  background: #f5f5f9 !important;
  padding: 6px 8px 2px;
}
</style>
