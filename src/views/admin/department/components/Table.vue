<template>
  <tabs animation="slide" :only-fade="false" is-boxed>
    <tab-pane label="部门信息">
      
    </tab-pane>
    <tab-pane label="Music">Music Tab</tab-pane>
    <tab-pane label="Videos" selected>Video Tab</tab-pane>
    <tab-pane label="Documents" disabled>Document Tab</tab-pane>
  </tabs>
</template>

<script>
import { Tabs, TabPane } from 'vue-bulma-tabs'

export default {
  components: {
    Tabs,
    TabPane
  }
}
</script>