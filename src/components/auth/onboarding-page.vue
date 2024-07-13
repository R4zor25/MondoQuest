<template>
    <div class="frame">
        <h1>Előzetes tájékoztató</h1>
        <h1>TLDR; Kvíz App, feleletválasztós kérdésekkel és egyéb feladatokkal</h1>
        <ul class="list-class">
            <li class="important-list-item">Az egésznek semmi köze a MondoCon szervezőihez, nem hivatalos, mi csináltuk külön, teljes mértékben a szórakoztatásért</li>
            <li class="green-book-item">KERESSÉTEK A ZÖLD FÜZETEKET!</li>
            <li class="list-item">Ez elsősorban egy feleltválasztós kvíz app, de tartalmaz egyéb feladatokat is, ahol sok témában található kérdések vannak: Anime, Gaming, Sci-fi, Fantasy, Streaming, Youtube, IRL etc. Ezenkívül olyan feladatok amiket nem fednénk fel előre</li>
            <li class="list-item">A használathoz szükséges regisztráció, csak egy felhasználónév és jelszó kell, azért, hogy garantálni tudjuk, hogy ne vesszenek el az elért eredmények és követhetőek legyenek. SEMMILYEN SZEMÉLYES ADAT/ELÉRHETŐSÉG NEM KELL</li>
            <li class="list-item">Felhasználónév megadásnál egyetlen kritérium van, az, hogy másik user nem használja már a megadott felhasználónevet, továbbá vedd figyelembe, hogy a többi felhasználó láthatja a neved, így figyelj az esetleges doxxolásra</li>
            <li class="list-item">Jelszó esetén nincs semmilyen megkötés, bármi lehet, ezt mi egyáltalán nem látjuk, így segíteni sem tudunk ha elfelejted, ezért legyen valami olyan amit biztos nem felejtesz el</li>
            <li class="list-item">Kétféle kategóriában lehet gyűjteni pontokat / eredményt felállítani (Erről az oldaloní részletesebb info van), a második napvégén (16:00, helyszín Frédi, Béni és Hawaii Inges harmadik srác környéke) mindkét kategória esetén az első 3 helyezett kap egy kis ajándékot, amennyiben ott van. (Ne gondoljatok nagy dolgokra, inkább fun :)) </li>
            <li class="list-item">Néhány kérdésnél képet kell megadni válaszként. Ha nem szeretnéd teljesíteni, akkor csak fényképezd le a betont és azt töltd fel hogy tovább tudj haladni, viszont azért nem jár a pont :) </li>
            <li class="list-item">Ezek a fényképek, amennyiben elfogadásra kerülnek az adott feladathoz, akkor kikerülnek egy közös galériába, amely megtekinthető minden bejelentkezett felhasználó számára.</li>
            <li class="list-item">Ha bármilyen kérdés, probléma merül fel, akkor a rendezvényen a Frédit, Brédit vagy a Hawaii Inges srácot keresd vagy végső esetben írj az MondoconQuest instagram-ra vagy a mondoconquest@gmail.com-ra. Pozitív viszajelzéseket is szívesen fogadunk :)</li>
            
        </ul>
        <button class="button" @click="navigateToLogin">Tovább</button>
    </div>
</template>

<script>
export default {
    methods: {
        navigateToLogin() {
            this.$router.replace('/login');
        }
    }
}
</script>
<style scoped>


.frame {
    background-image: url('@/assets/peak.jpeg');
    background-size: cover;
    background-position: center;
  min-height: 100vh; /* minimum magasság a képernyő magassága */
  width: 100%;
  padding: 20px; /* adj hozzá némi paddinget, hogy a tartalom ne tapadjon közvetlenül a szélekhez */
}

h1, h4 {
  color: #fff;
  text-shadow: #000 0px 0px 15px;
  transition: text-shadow 0.3s ease-in-out;
  text-align: center;
  background: none;
  font-weight: 700;
}

.list-class{
    text-align: start;
    margin-top: 30px;
    color: #ccc;

}
.list-item{
    margin-top: 10px;
    text-align: start;
    color: #fff;
  text-shadow: #000 0px 0px 15px;
  transition: text-shadow 0.3s ease-in-out;
  background: none;
  font-weight: 700;
}

.important-list-item{
    margin-top: 10px;
    text-align: start;
    color: #f00;
    text-transform: uppercase;
  text-shadow: #fff 0px 0px 15px;
  transition: text-shadow 0.3s ease-in-out;
  font-size: xx-large;
  background: none;
  font-weight: 700;
}

.green-book-item{
    margin-top: 10px;
    text-align: start;
    color: #f00;
    text-transform: uppercase;
  text-shadow: #fff 0px 0px 15px;
  transition: text-shadow 0.3s ease-in-out;
  background: none;
  font-size: xx-large;
  font-weight: 700;
}
.button{
    width: 300px;
    height: 50px;
}
</style>