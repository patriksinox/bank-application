"use strict";

//Selektory
const prihlasenieMeno = document.getElementById("prihlasenieMeno");
const prihlasenieHeslo = document.getElementById("prihlasenieHeslo");
const prihlas = document.getElementById("prihlas");
const celkovyBalanc = document.getElementById("celkovyBalanc");
const prevodMeno = document.getElementById("prevodMeno");
const prevodSuma = document.getElementById("prevodSuma");
const uverSuma = document.getElementById("uverSuma");
const zrusenieMeno = document.getElementById("zrusenieMeno");
const zruseniePin = document.getElementById("zruseniePin");
const zrusenieOdosli = document.getElementById("zrusenieOdosli");
const uverOdosli = document.getElementById("uverOdosli");
const prevodOdosli = document.getElementById("prevodOdosli");
const vklady = document.getElementById("vklady");
const vybery = document.getElementById("vybery");
const zobrazVklad = document.getElementById("zobrazVklad");
const zobrazVyber = document.getElementById("zobrazVyber");
const vypisy = document.getElementById("vypisy")
const uvitanie = document.getElementById("uvitanie");
const bankoveOkno = document.getElementById("bankoveOkno");
const infoZrusenie = document.getElementById("infoZrusenie");
const prihlaseny = document.getElementById("prihlaseny");
const casBalancu = document.getElementById("casBalancu");
const zobrazPohyb = document.getElementById("zobrazPohyb");
const odhlasenie = document.getElementById("odhlasenie");
//ucty

const ucet1 = {
    meno: "Patrik Šubjak",
    pohyby: [1490, -200, -100, -60, 60, 200, 1000],
    pin: 1111 ,
    movementsDates: [
        '2022-01-18T21:31:17.178Z',
        '2022-02-23T07:42:02.383Z',
        '2022-02-28T09:15:04.904Z',
        '2022-03-01T10:17:24.185Z',
        '2022-03-23T14:11:59.604Z',
        '2022-03-26T17:01:17.194Z',
        '2022-03-27T07:36:17.929Z',
      ],
}
const ucet2 = {
    meno: "Styra Šubjak",
    pohyby: [1.69 , 5, 200, 90, 60, 200, -200],
    movementsDates: [
        '2022-01-18T21:31:17.178Z',
        '2022-02-23T07:42:02.383Z',
        '2022-02-28T09:15:04.904Z',
        '2022-03-01T10:17:24.185Z',
        '2022-03-23T14:11:59.604Z',
        '2022-03-26T17:01:17.194Z',
        '2022-03-27T07:36:17.929Z',
      ],
    pin: 2222 ,
}
const ucet3 = {
    meno: "Knedlík Laco",
    pohyby: [800, -150, 300, -100, 90, 200, 300],
    movementsDates: [
        '2022-01-18T21:31:17.178Z',
        '2022-02-23T07:42:02.383Z',
        '2022-02-28T09:15:04.904Z',
        '2022-03-01T10:17:24.185Z',
        '2022-03-23T14:11:59.604Z',
        '2022-03-26T17:01:17.194Z',
        '2022-03-27T07:36:17.929Z',
      ],
    pin: 3333 ,
}
const ucet4 = {
    meno: "Peter Perfekt",
    pohyby: [2000, -800, -100, -60, 400, 100, 600],
    movementsDates: [
        '2022-01-18T21:31:17.178Z',
        '2022-02-23T07:42:02.383Z',
        '2022-02-28T09:15:04.904Z',
        '2022-03-01T10:17:24.185Z',
        '2022-03-23T14:11:59.604Z',
        '2022-03-26T17:01:17.194Z',
        '2022-03-27T07:36:17.929Z',
      ],
    pin: 4444 ,
}
const ucty = [ucet1,ucet2,ucet3,ucet4];

//Vytvorenie prihlasovacieho meno
ucty.forEach(ucet => {
const rozdelene = ucet.meno.split(" ");
const rozdelene1 = rozdelene[0].slice(0,1).toLowerCase();
const rozdelene2 = rozdelene[1].slice(0,1).toLowerCase();
ucet.login = rozdelene1 + rozdelene2;
})

// Prihlasenie
let aktivnyUcet;
// Čas odhlásenia
let casovac;


prihlas.addEventListener("click", function(){
aktivnyUcet = ucty.find(ucet => ucet.login === prihlasenieMeno.value.toLowerCase())
if(aktivnyUcet){
 if(aktivnyUcet.pin === Number(prihlasenieHeslo.value)){
    resetUdajov();
    bankoveOkno.style.display = "block";
        const uvitacieMeno = aktivnyUcet.meno.split(" ");
        uvitanie.textContent = `${uvitanieCas()} ${uvitacieMeno[0]} 🟢`;
        zobrazBalanc();
        zobrazVV();
        zobrazPohyby();
        casBalanc();
        if(casovac) clearInterval(casovac);
        casovac = casovacOdhlasenia();
        prihlaseny.textContent = `Si prihlásený ako ${uvitacieMeno[0]} 🟢`
    }
    else alert("Nesprávne heslo! 💥");
}
else alert("Použivateľ neexistuje! 💥");
})

//Práca s časom globálne
const cas = new Date();
const casHodina = `${cas.getHours()}`;
const uvitanieCas = function(){
    if(casHodina > 0 && casHodina <= 12) return `Dobré ráno`;
    if(casHodina >= 12 && casHodina <= 17) return `Dobrý deň`;
    if(casHodina > 17 ) return `Dobrý večer`; 
}

//Zobrazenie času Balancu účtu
function casBalanc() {
    const cas = new Date();
    casBalancu.textContent =` ${new Intl.DateTimeFormat().format(cas)} ${new Intl.DateTimeFormat("sk",{timeStyle: 'short' }).format(cas)}`;
}

//Zobrazenie celkovej sumy na účte
function zobrazBalanc() {
    const celkovaSuma = aktivnyUcet.pohyby.reduce((x, y) => x + y, 0);
    celkovyBalanc.textContent = `${celkovaSuma.toFixed(2)} €`;
}

//Zobrazenie vklady a výbery
const zobrazVV = function(){
    const vkladyUctu = aktivnyUcet.pohyby.filter(x => x > 0).reduce((x,y) => x + y,0);
    const vyberyUctu = aktivnyUcet.pohyby.filter(x => x < 0).reduce((x,y) => x + y,0);
    vklady.textContent = `${vkladyUctu} €`;
    vybery.textContent = `${vyberyUctu} €`;
}

//Čas k pohybu 
const casKpohybu = function(cas){
    //Funkcia - Koľko dní prešlo 
    const presloDni = (cas1,cas2) => Math.abs(Math.round((cas1 - cas2) / (1000 * 60 * 60 * 24)));
    const casPresiel = presloDni(+cas, +new Date());
    if(casPresiel === 0) return `Dnes`;
    if(casPresiel === 1) return `Včera`;
    if(casPresiel <= 7) return `Tento Týždeň`;
    return new Intl.DateTimeFormat().format(cas);
}



//Zobrazenie pohybov na účte
const zobrazPohyby = function(){
   
    vypisy.textContent = "";
    aktivnyUcet.pohyby.forEach((x,y) => {
        const typ = x > 0 ? `vklad` : `vyber`;
        const html = `
        <div class="row ">
        <div class="pohyb col-md-11 d-flex justify-content-center">
      <div class="pohybBtn pohyb--${typ}">${y + 1} ${typ}</div>
      <div class="pohybDatum align-self-center">${casKpohybu(new Date(aktivnyUcet.movementsDates[y]))}</div>
      <div class="pohybSuma">${x} €</div>
        </div> 
        </div> ` ;
        vypisy.insertAdjacentHTML("afterbegin",html);
    })}
    
    // Zobrazenie vkladov
    zobrazVklad.addEventListener("click", function(){
        if(casovac) clearInterval(casovac);
        casovac = casovacOdhlasenia();
        const pohybVkladov = [];
       for(const x of aktivnyUcet.pohyby){
        x > 0 ? pohybVkladov.push(x) : "";
    }
    vypisy.innerHTML = ""
    pohybVkladov.forEach((x,y) => {
        const den = aktivnyUcet.pohyby.indexOf(x);
        const typ = x > 0 ? `vklad` : `vyber`;
        const html = `
        <div class="row ">
        <div class="pohyb col-md-11 d-flex justify-content-center">
      <div class="pohybBtn pohyb--${typ}">${y + 1} ${typ}</div>
      <div class="pohybDatum align-self-center">${casKpohybu(new Date(aktivnyUcet.movementsDates[den]))}</div>
      <div class="pohybSuma">${x} €</div>
        </div> 
        </div> ` ;
        vypisy.insertAdjacentHTML("afterbegin",html);
    })
    })

    // Zobrazenie Výberov
    zobrazVyber.addEventListener("click", function(){
        if(casovac) clearInterval(casovac);
        casovac = casovacOdhlasenia();
        const pohybVyberov = [];
       for(const x of aktivnyUcet.pohyby){
        x < 0 ? pohybVyberov.push(x) : "";
    }
    vypisy.innerHTML = ""
    pohybVyberov.forEach((x,y) => {
        const den = aktivnyUcet.pohyby.indexOf(x);
        const typ = x > 0 ? `vklad` : `vyber`;
        const html = `
        <div class="row ">
        <div class="pohyb col-md-11 d-flex justify-content-center">
      <div class="pohybBtn pohyb--${typ}">${y + 1} ${typ}</div>
      <div class="pohybDatum align-self-center">${casKpohybu(new Date(aktivnyUcet.movementsDates[den]))}</div>
      <div class="pohybSuma">${x} €</div>
        </div> 
        </div> ` ;
        vypisy.insertAdjacentHTML("afterbegin",html);
    })
    })

// prevod
prevodOdosli.addEventListener("click",function(){
    if(casovac) clearInterval(casovac);
        casovac = casovacOdhlasenia();
const celkovaSuma = aktivnyUcet.pohyby.reduce( (x,y) => x + y,0);
const meno = prevodMeno.value;
const suma = prevodSuma.value;
const prevodKam = ucty.find(ucet => ucet.login === meno)
if(prevodKam && suma >= 0 && celkovaSuma >= suma){
    prevodKam.pohyby.push(Number(suma));
    prevodKam.movementsDates.push(new Date().toISOString())
    aktivnyUcet.pohyby.push(Number(-suma))
    aktivnyUcet.movementsDates.push(new Date().toISOString())
    zobrazBalanc();
    zobrazVV();
    zobrazPohyby();
    resetUdajov();
}
else if(!prevodKam) {
    alert("Zlé meno");
}
else if(prevodKam && celkovaSuma < suma){
    alert("Nedostatok peňazí na účte pre tento prevod!")
}})

//Žiadosť o úver
uverOdosli.addEventListener("click", function(){
    if(casovac) clearInterval(casovac);
    casovac = casovacOdhlasenia();
    const uver = Number(uverSuma.value);
    const pohybVkladov = [];
       for(const x of aktivnyUcet.pohyby){
        x > 0 ? pohybVkladov.push(x) : "";
    }
    const celkovyPrijem = pohybVkladov.reduce( (x,y) => x + y , 0)
    
    if(uver > 0 && (uver / 10) < celkovyPrijem){
        aktivnyUcet.pohyby.push(uver);
        aktivnyUcet.movementsDates.push(new Date().toISOString());
        zobrazBalanc();
        zobrazVV();
        zobrazPohyby();
        resetUdajov();
        alert(`Požiadal ste o úver ${uver} €, peniaze boli pridané na váš účet.💰`)
    }
    else alert("Nemôžete dostať takýto úver, nedostatočné príjmy 💥.");
})

zrusenieOdosli.addEventListener("click", function(){
    const zrusMeno = zrusenieMeno.value;
    const zrusHeslo = Number(zruseniePin.value);
    if(aktivnyUcet && zrusMeno === aktivnyUcet.login && zrusHeslo === aktivnyUcet.pin){
        const index = ucty.indexOf(aktivnyUcet);
        ucty.splice(index,1);
        bankoveOkno.style.opacity = 0;
        uvitanie.textContent = "Vitaj Použivateľ";
        alert("Účet bol zrušený.")
    }
    else if(zrusMeno !== aktivnyUcet.login || zrusHeslo !== aktivnyUcet.pin ){
        alert("Nesprávne meno alebo heslo!💥")
    }
    else {
        infoZrusenie.textContent = ("Môžeš zrušiť len vlastný účet💥!");
    }
})

//reset value okien
const resetUdajov = function(){
    prihlasenieMeno.value = "";
    prihlasenieHeslo.value = "";
    prevodMeno.value = "";
    prevodSuma.value = "";
    uverSuma.value = "";
    zrusenieMeno.value = "";
    zruseniePin.value = "";
    uverOdosli.value = "";
    prevodOdosli.value = "";
}
zobrazPohyb.addEventListener("click", function(){
    if(casovac) clearInterval(casovac);
        casovac = casovacOdhlasenia();
    zobrazPohyby()
});

//Čas na odhlásenie
const casovacOdhlasenia = function(){
    const tick = function(){
        let minuty = String(Math.trunc(cas / 60)).padStart(2,0);
        let sekundy = String(cas % 60).padStart(2,0);
        odhlasenie.textContent = `Budeš odhlasený za ${minuty}:${sekundy}`;

        if(cas === 0){
            clearInterval(casovac);
            bankoveOkno.style.display = "none";
        }
        cas--;
    }
    let cas = 300;
    tick()
   const casovac = setInterval(tick,1000)
   return casovac;
}


// Ak niekto zadá zlé meno tak musí vyhodiť notifikáciu že zadal zle - hotovo
// 1. Úver - hotovo
// 2. Zrušenie účtu - dokončiť správu aby napísalo ak je nesprávny účet alebo údaje. - hotovo
// 3. Fungovanie enteru pre potvrdenie :D - Préjsť si neskôr lebo to neviem spojiť s click listenerom.
// Úprava dizajnu

