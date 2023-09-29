<template>
  <div class="app-layout">
    <RightDrawer />

    <div class="page-content">
      <!-- Page-specific content goes here -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
import RightDrawer from './RightDrawer.vue'

export default {
  components: {
    RightDrawer
  }
}
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
}

.page-content {
  margin-left: 1rem;
  flex-grow: 1;
  overflow: auto;
}
</style>
