<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <button class="btn btn-outline-secondary button" @click="toggleSidebar">
        <i class="bi bi-list"></i>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBarComponent',
  methods: {
    toggleSidebar() {
      this.$emit('toggle-sidebar');
    }
  }
};
</script>

<style scoped>
.navbar {
  position: absolute; /* Ensures the Navbar does not affect the document flow */
  top: 0;
  background: #333;
  transition: transform 0.3s ease;
  z-index: 500; /* Below Sidebar */
}
</style>