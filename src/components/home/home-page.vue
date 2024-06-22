<template>
  <div class="frame">
    <Navbar class="navbar" @toggle-sidebar="toggleSidebar" />
    <Sidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
  <carousel class="carousel"  :items-to-show="imageCount" :wrapAround="true" :transition="500" :autoplay= 2000>
    <slide v-for="slide in this.imageList" :key="slide">
      <img class="img-fluid img-thumbnail slide-image" :src="slide" alt="">
    </slide>
    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
  <h2>Általános tájékoztató (Érdemes elolvasni)</h2>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Tudnivaló 1</li>
    <li class="list-group-item">Tudnivaló 2</li>
    <li class="list-group-item">Tudnivaló 3</li>
    <li class="list-group-item">Tudnivaló 4</li>
    <li class="list-group-item">Tudnivaló 5</li>
    <li class="list-group-item">Tudnivaló 6</li>
  </ul>
</div>
</template>

<script>
import Navbar from "../component/navbar-component.vue";
import Sidebar from "../component/new-sidebar-component.vue";
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    Navbar,
    Sidebar
  },
  data() {
    return {
      isSidebarVisible: true,
      imageList: [
        "https://picsum.photos/1920/1080",
        "https://picsum.photos/400/301",
        "https://picsum.photos/400/302",
        "https://picsum.photos/400/303",
        "https://picsum.photos/400/304",
        "https://picsum.photos/400/305",
        "https://picsum.photos/400/306",
        "https://picsum.photos/400/307",
        "https://picsum.photos/400/308",
      ],
      imageCount: 3,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    getImageCount() {
    if( screen.width <= 760 ) {
                    return 1;
                }
                else if (760 <= screen.width && screen.width < 2000) {
                    return 3;
                } else {
                   return 6;
                }
   },
  },

  mounted() {
    this.imageCount = this.getImageCount();
  },
};
</script>

<style scoped>
.frame {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #333;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #343a40;
  overflow-x: hidden;
  transition: transform 0.3s ease;
  z-index: 1000; 
}

.carousel{
  width: 100%;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
}

.slide-image{
  margin-left: 30px;
  margin-right: 30px;
  min-width: 15vh;
}

h1, h2, h3, h4, h5, h6, li {
  color: #ccc;
  background: #333;
}
</style>