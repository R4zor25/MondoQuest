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
  <h2>Általános tájékoztató (Érdemes elolvasni vagy nem)</h2>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Alapvetően két kategóriában lehet kérdéseket / feladatokat elvégezni story/végtelen mód</li>
    <li class="list-group-item">Story mód esetén a tudnivalók:
      <dt>
        <li>100 kérdésből áll, minden 10. különleges kérdés / feladat</li>
        <li>A kérdések különböző nehézségűek, amely jelzésre is kerül a kérdés feltételekor. Minél nehezebb annál több pontot ér, viszont rossz válasz esetén levonás van.</li>
        <li>Különleges kérdések esetén szükség lehet képet feltölteni, mint válasz.</li>
        <li>Ezeknek az értékelése kézzel történik, amit időnként mi teszünk meg. Ezek a képek felkerülnek a galériába is, ahol bármelyik regisztrált felhasználó megnézheti</li>
        <li>Story mód esetén két dologból áll össze a végső pontszám: A kérdésekből kapott pontszám és az 1. és 100. kérdés teljesítése között eltelt idő.</li>
        <li>Alapből a kérdések lehetnek egyszerű szövegesek, olyan amihez kép tartozik, olyan amihez hang illetve speciális. Kép esetén ha szükséges, akkor rányomva lehetőség van belenagyítani.</li>
        <li>A kérdés megválaszolása után lehetőség van értékelni a kérdést, ami visszajelzés felénk és az összes többi játékos felé is.</li>
      </dt>
    </li>
    <li class="list-group-item">Végtelen mód esetén tudnivalók:
      <dt>
        <li>A Story módhoz képest ritkábban vannak speciális feladatok.</li>
        <li>A kérdéseket addig tartanak, amíg az összes általunk készített kérdésre nem adsz választ. (Egy kérdés csak egyszer jelenik meg :) )</li>
        <li>A pontszám egyedül a megválaszolt kérdésekből jön, nincs idő faktor.</li>
      </dt>
    </li>
    <li class="list-group-item">Mindkét kategóriából a legjobban teljesítő kap egy apró nyereményt, amennyiben igazolja, hogy tényleg ő az és vasárnap délután 15:00 körül megkeresi a change my mind-os srácokat.</li>
    <h2>Ha hibába futsz, kérlek legyél türelmes az oldallal és viszont ha úgy nem oldódik meg azt kérlek jelezd nekünk.</h2>
    <h1>Ha nem érdekel a leírás, akkor csak Have Fun és érezd jól magad.</h1>
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