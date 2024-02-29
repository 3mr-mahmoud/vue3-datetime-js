<template>
  <div id="app" :class="{ 'sidebar-open': sidebarOpen }">
    <div class="main-content">
      <div class="container">
        <SimpleDate />
      </div>
    </div>
  </div>
</template>

<script>
import SimpleDate from './components/examples/SimpleDate.vue'

export default {
  name: 'App',
  components: {
    SimpleDate
  },
  data() {
    return {
      sidebarOpen: false
    }
  },
  watch: {
    $route() {
      this.sidebarOpen = false
    }
  }
}
</script>
