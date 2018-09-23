<template>
  <div class="main">
    <div class="sidebar">
      <sidebar></sidebar>
    </div>
    <div class="footer">
      <footer></footer>
   </div>
   <div class="head">
     <head></head>
   </div>
   <div class="app">
     <app></app>
   </div>
  </div>
</template>
<script>
import { sidebar, head, footer, app } from './components'
export default {
  components: {
    sidebar,
    head,
    footer,
    app
  }
}
</script>
<style scoped>

</style>
