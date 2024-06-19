<template>
    <div>
        <h1>Rövid tájélkoztató</h1>
        <h4>SOK SOK tájékoztató szöveg ezt segítsetek megírni</h4>
        <ul class="list-class">
            <li class="list-item">Ez elsősorban egy kvíz app, de tartalmaz egyéb kihívásokat is, ahol sok témában található kérdések vannak: Anime, Gaming, Sci-fi, fantasy, Streaming, youtube, IRL etc. Ezenkívül olyan feladatok amiket nem fednénk fel előre</li>
            <li class="list-item">Az egésznek semmi köze a MondoCon szervezőihez, nem hivatalos, mi csináltuk külön, teljes mértékben a szórakoztatásért</li>
            <li class="list-item">A használathoz szükséges regisztráció, csak egy felhasználónév és jelszó kell, semmilyen személyes adat NEM KELL, azért, hogy garantálni tudjuk, hogy ne vesszenek el az elért eredmények és követhetőek legyenek.</li>
            <li class="list-item">Felhasználónév megadásnál egyetleg kritérium van, az, hogy másik user nem használja már, továbbá vedd figyelembe, hogy a többi felhasználó láthatja a neved, így figyelj az esetleges doxxolásra</li>
            <li class="list-item">Jelszó esetén nincs semmilyen megkötés, bármi lehet, ezt mi egyáltalán nem látjuk, így segíteni sem tudunk ha elfelejted, ezért legyen valami olyan amit biztos nem felejtesz el</li>
            <li class="list-item">Kétféle kategóriában lehet gyűjteni pontokat / eredményt felállítani (Erről az oldaloní részletesebb info van), a második napvégén mindkettő esetén az első x helyezett kap egy kis ajándékot (Mint a múltkor, ceruza, egy alma, egy adag protein por (30g) --random faszságok), amennyiben ott lesz az eredményhíredéskor</li>
            <li class="list-item">Ezenfelül lehetnek extra feladatok, amikről érdemes időben értesülni :)</li>
            <li class="list-item">Egy-két kérdésnél lehetséges (nem kötelező) képet megadni válaszként. Ha engedélykérést dob fel az oldal, emiatt van. </li>
            <li class="list-item">Aki több sört hoz nekünk az nyer</li>
            <li class="list-item">Ha bármilyen kérdés, probléma felmerül, akkor a rendezvényen a ChangeMyMind-os srácokat keresd vagy vésgő esetben írj az xyz instagram-ra vagy végső estben írj a mondoconquest@gmail.com-ra</li>
            <h5>FOGALMAZZÁTOK ÁT ÉS ADJATOK MÉG TIPPEKET IDE, VAGY HOGY LEGYEN A TÁJÉKOZTATÁS</h5>
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
.list-class{
    text-align: start;
    margin-top: 30px;

}
.list-item{
    margin-top: 10px;
    text-align: start;
}
.button{
    width: 300px;
    height: 50px;
}
</style>