<template>
  <div id="nav">
    <thehead></thehead>
  </div>
</template>

<script>
  import thehead from "./views/TheHead.vue"
  export default {
    name: "App",
    components: {
      thehead,
    },
    created() {
      console.log("app组件创建了")
    }
  }
</script>



<style>


</style>