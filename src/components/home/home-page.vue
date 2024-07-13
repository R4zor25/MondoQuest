<template>
  <div class="frame">
    <Navbar class="navbar" @toggle-sidebar="toggleSidebar" />
    <Sidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
  <carousel class="carousel"  :items-to-show="imageCount" :wrapAround="true" :transition="500" :autoplay= 5000>
    <slide v-for="slide in this.imageList" :key="slide">
      <img class="img-fluid img-thumbnail slide-image" :src="getImageSrc(slide)" alt="">
    </slide>
    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
  <ul class="list-group list-group-flush">
    <h2>Általános tájékoztató (Érdemes elolvasni vagy nem, majd eldöntöd)</h2>
    <h3>TLDR; Story és végtelen módban lehet kérdéseket megválaszolni és feladatokat teljesíteni, a legjobbak apró nyereményben részesülnek</h3>
    <h1 class="green-book-item">KERESSÉTEK A ZÖLD FÜZETEKET!</h1>
    <li class="list-group-item">Alapvetően két kategóriában lehet kérdéseket / feladatokat elvégezni story/végtelen mód</li>
    <li class="list-group-item">Story mód esetén a tudnivalók:
      <dt>
        <li>100 kérdésből áll, minden 20. különleges kérdés / feladat</li>
        <li>A Story mód kitöltése csak egyszer lehetséges, nincs újrakezdési lehetőség.</li>
        <li>A kérdések különböző nehézségűek, amely jelzésre is kerül a kérdés feltételekor. Minél nehezebb annál több pontot ér, viszont rossz válasz esetén levonás van.</li>
        <li>Különleges kérdések esetén szükség lehet képet feltölteni, mint válasz.</li>
        <li>Ezeknek az értékelése kézzel történik, amit időnként mi teszünk meg. Az általunk elfogadott képek felkerülnek a galériába is, ahol bármelyik regisztrált felhasználó megnézheti őket</li>
        <li>Story mód esetén két dologból áll össze a végső pontszám: A kérdésekből kapott pontszám és az 1. kérdés megkezdése és a 100. kérdés teljesítése között eltelt idő.</li>
        <li>Alapból a kérdések lehetnek egyszerű szövegesek, olyan amihez kép tartozik, olyan amihez hang illetve speciális is. Kép esetén ha szükséges, akkor rányomva lehetőség van belenagyítani.</li>
        <li>A kérdés megválaszolása után lehetőség van értékelni a kérdést, ami visszajelzés felénk és az összes többi játékos felé is. :)</li>
      </dt>
    </li>
    <li class="list-group-item">Végtelen mód esetén tudnivalók:
      <dt>
        <li>A Story módhoz képest ritkábban vannak speciális feladatok.</li>
        <li>A kérdéseket addig tartanak, amíg az összes általunk készített kérdésre nem adsz választ. (Egy kérdés csak egyszer jelenik meg)</li>
        <li>Kérdések a helszínen is kerülnek felvételre, így érdemes lehet visszanézni még akkor is, ha végigértl rajta.</li>
        <li>A pontszám egyedül a megválaszolt kérdésekből jön, nincs idő faktor.</li>
        <li></li>
      </dt>
    </li>
    <li class="list-group-item">Mindkét kategóriából a legjobban teljesítő 3 játékos kap egy apró nyereményt, amennyiben igazolja, hogy tényleg ő az és vasárnap délután 16:00 körül megkeresi a Frédit, Bénit és a Hawaii Inges srácot.</li>
    <h2>Ha hibába futsz, kérlek legyél türelmes az oldallal. Először próbáld újra, aztán próbálj meg kijelentkezni és bejelentkezni, aztán ha az idő sem oldja meg, akkor jelezd nálunk a hibát kérlek. </h2>
    <h2>CONTACTS: Email: mondoconquest@gmail.com, Instagram: MondoconQuest</h2>
    <h2>Pozitív visszajelzéseket is szívesen fogadunk :)</h2> 
  </ul>
</div>
</template>

<script>
import Navbar from "../component/navbar-component.vue";
import Sidebar from "../component/new-sidebar-component.vue";
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import store from "@/store";
import axios from "axios";

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
      isSidebarVisible: false,
      imageList: [],
      imageCount: 3,
      token: null
    };
  },
  methods: {
    //TODO képbetöltő végpont
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    getImageSrc(image) {
      return `data:image/png;base64,${image.imageFile}`;
    },
    getImageCount() {
    if( screen.width <= 760 ) {
                    return 1;
                }
                else if (760 <= screen.width && screen.width < 2000) {
                    return 4;
                } else {
                   return 6;
                }
   },
   async fetchLatest10Images() {
    try {
        const response = await axios.get('https://mondo-quest.fly.dev/api/question/interactive/latest',{
          headers: {
            'Authorization': `Bearer ${this.token}` // Beállítjuk a header-t, hogy tartalmazza a JWT tokent
          }
        });
        this.imageList = response.data;
      } catch (error) {
        console.error('Error fetching images:', error);
      }
   }
  },

  mounted() {
    this.token = store.getters.getUser.token;
    this.imageCount = this.getImageCount();
    this.fetchLatest10Images();
  },
};
</script>

<style scoped>
.frame {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100vh; /* minimum magasság a képernyő magassága */
  width: 100%;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/peak.jpeg');
  background-size: cover;
  background-position: center;
}

.frame::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100vh; /* minimum magasság a képernyő magassága */
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* Sötétítő réteg */
  z-index: 0;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
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
  max-height: 50vh;
}

h1, h2, h3, h4, h5, h6, li {
  color: #fff;
  /*text-shadow: #000 0px 0px 15px;*/
  transition: text-shadow 0.3s ease-in-out;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  background-color: rgba(0, 0, 0, 0.3); /* Áttetsző háttérszín a szöveg mögött */
  text-align: center;
  background: none;
  z-index: 1;
}

.list-group-item {
  color: #fff;
  text-shadow: #000 0px 0px 15px;
  transition: text-shadow 0.3s ease-in-out;
  text-align: center;
  background: none;
  font-weight: 700;
  z-index: 1;
}

.green-book-item{
    margin-top: 10px;
    text-align: center;
    color: #f00;
    text-transform: uppercase;
  text-shadow: #fff 0px 0px 15px;
  transition: text-shadow 0.3s ease-in-out;
  background: none;
  font-size: xx-large;
  font-weight: 700;
}
</style>