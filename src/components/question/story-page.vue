<template>
    <div>
    <Navbar @toggle-sidebar="toggleSidebar" />
    <Sidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
        <h1>Story Page IN PROGRESS</h1>
    </div>
</template>

<script>
  import Navbar from "../component/navbar-component.vue";
  import Sidebar from "../component/new-sidebar-component.vue";
export default {
    components: {
      Navbar, Sidebar
    },
    data(){
        return {
            isSidebarVisible: true
        };
    },
    methods:{
        toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    }
    }

}
</script>

<style>

</style>