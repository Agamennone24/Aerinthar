// ===== AERINTHAR - DATABASE E CONTENUTI (come l'editor di un RPG: mappe, eventi, comandi) =====
const W=32,H=18;
const CN=["Scarabeo Sacro","Guardia di Menfi","Arciere del Nilo","Sciacallo del Deserto","Sacerdote di Thoth","Mummia Errante","Coccodrillo di Sobek","Scriba Ombra","Falco di Horus","Guardia Medjay","Maga di Iside","Sfinge Guardiana","Sacerdote di Anubi","Scorpione di Serqet","Cavaliere del Sole","Faraone Risorto","Apopi il Divoratore","Oracolo di Ra","Anubi, Giudice","Ra, Dio del Sole","Shabti Pedone","Destriero del Carro","Obelisco Vivente","Pilone Guardiano","Regina Cobra","Re Divino","Gatto di Bastet","Ippopotamo di Taweret","Sekhmet, Leonessa","Osiride, Re Eterno","Fabbro di Ptah","Lanciere Nubiano","Fenice di Bennu","Avvoltoio di Nekhbet","Carro da Guerra","Cobra di Wadjet"];
const ITEMS={pozione:{name:"Pozione",heal:30,desc:"Recupera 30 HP"}};
const ENEMIES={lupo:{name:"Lupo d'ombra",kind:"wolf",hp:26,atk:7,def:2,exp:12,gold:6,drop:[[35,.5],[3,.35]]},
 vespa:{name:"Vespa di brina",kind:"slime",hp:18,atk:6,def:1,exp:8,gold:4,drop:[[0,.4],[26,.3]]}};
const HERO0={lv:1,exp:0,hp:40,mhp:40,mp:10,mmp:10,atk:8,def:4};
const mk=f=>Array.from({length:H},()=>Array(W).fill(f)),R_=(m,x,y,w,h,c)=>{for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)if(m[j]&&m[j][i]!==undefined)m[j][i]=c},
frame=(m,c)=>{R_(m,0,0,W,1,c);R_(m,0,H-1,W,1,c);R_(m,0,0,1,H,c);R_(m,W-1,0,1,H,c)};
const P=(hair,cloth,skin="#e8b890")=>({k:"p",hair,cloth,skin});
const DATA={start:{map:"sentiero",x:3,y:9,d:1},maps:{}};
// ---- Mondo reale (fantasy): primo luogo ----
{const m=mk(".");frame(m,"T");R_(m,1,8,30,2,",");R_(m,24,5,4,8,",");R_(m,5,12,5,4,"~");R_(m,4,3,2,1,"F");R_(m,12,13,3,1,"F");R_(m,20,14,2,1,"F");R_(m,10,3,3,2,"T");R_(m,22,2,3,2,"T");
 [[25,5],[29,5],[25,12],[29,12]].forEach(([x,y])=>m[y][x]="O");m[8][28]="V";m[9][28]="V";
 DATA.maps.sentiero={name:"Sentiero del Vento Quieto",world:0,m,ev:[
 {x:8,y:7,look:P("#6a4a2a","#3a6a8a"),name:"Orren",pages:[
  {if:{n:"met"},trig:"act",cmds:[["say","Orren","Ehi, tu! Non si vede nessuno da queste parti da giorni."],["say","@h","Cerco informazioni sui luoghi dove il vento tace."],["say","Orren","Allora sei nel posto giusto. Questo sentiero ha la fama di essere... silenzioso."],["say","Orren","Prendi queste carte. Nei luoghi strani, a volte, si comportano in modo diverso."],["card",0],["card",1],["card",2],["card",3],["card",4],["card",5],["card",6],["card",7],["set","met",true],["say","Orren","Se incontri dei lupi d'ombra, sconfiggili: a volte lasciano altre carte."]]},
  {if:{a:"met"},trig:"act",cmds:[["say","Orren","Segui il sentiero verso est. C'è una pietra antica, laggiù. Non toccarla se non sei pronto."]]}]},
 {x:14,y:11,look:P("#aa8a4a","#8a4a4a"),name:"Mira",pages:[{trig:"act",cmds:[["say","Mira","Il vento qui non soffia mai davvero. Come se trattenesse il respiro."],["say","Mira","Mia nonna diceva che certe pietre ricordano chi le ha attraversate."]]}]},
 {x:18,y:9,look:{k:"wolf"},name:"Lupo",solid:1,pages:[{if:{n:"e_lupo1"},trig:"touch",cmds:[["battle",["lupo"]],["iflast",[["set","e_lupo1",true],["gold",5]],[]]]}]},
 {x:21,y:6,look:{k:"slime"},name:"Vespa",solid:1,pages:[{if:{n:"e_vespa1"},trig:"touch",cmds:[["battle",["vespa","vespa"]],["iflast",[["set","e_vespa1",true]],[]]]}]},
 {x:4,y:5,look:{k:"chest"},name:"Forziere",solid:1,pages:[{if:{n:"c1"},trig:"act",cmds:[["say","","Apri il forziere..."],["item","pozione",3],["set","c1",true]]},{if:{a:"c1"},trig:"act",cmds:[["say","","Il forziere è vuoto."]]}]},
 {x:28,y:8,look:{k:"none"},name:"Pietra del Varco",solid:0,pages:[
  {if:{n:"met"},trig:"act",cmds:[["say","","Una pietra antica, fredda al tatto. Meglio non toccarla."]]},
  {if:{a:"met"},trig:"act",cmds:[["say","","La pietra vibra. Il vento, per la prima volta, soffia."],["say","@h","Sento qualcosa... come se mi chiamasse."],["set","varco",true],["tp","soglia",4,9,1]]}]}]}}
// ---- Aerinthar: mondo parallelo (violetto, cristalli, Kharum in lontananza) ----
{const m=mk(".");frame(m,"#");R_(m,1,8,30,2,",");for(let r=0;r<6;r++)R_(m,15-r,1+r,2*r+2,1,"P");[[6,4],[9,13],[24,12],[27,5],[12,3]].forEach(([x,y])=>m[y][x]="K");m[8][3]="V";m[9][3]="V";
 DATA.maps.soglia={name:"Soglia di Aerinthar",world:1,m,ev:[
 {x:15,y:9,look:P("#c8b8f0","#4a3a7a"),name:"Orvael",pages:[
  {if:{n:"custode1"},trig:"act",cmds:[["say","Orvael","Sei arrivato fin qui. Non tutti attraversano. Sai già chi sono?"],["say","@h","Ho la sensazione di averti già visto."],["say","Orvael","Forse. Qui il tuo nome è un altro, e il mio pure. Dimostra di saper schierare le tue carte."],["cbattle",{ed:[0,1,3,4,2,5,7,9,20,26],diff:0}],["iflast",[["set","custode1",true],["card",8],["say","Orvael","Tieni il Falco. Verso nord, oltre i cristalli, Kharum ti aspetta."]],[["say","Orvael","Non ancora. Riprova quando sarai pronto."]]]]},
  {if:{a:"custode1"},trig:"act",cmds:[["say","Orvael","Kharum è la piramide che vedi a nord. Non andare da solo."]]}]},
 {x:27,y:4,look:{k:"p",hair:"#c0261e",cloth:"#2a2030",skin:"#e8b890",scythe:1},name:"Falce Scarlatta",pages:[
  {if:{a:"custode1",n:"falce1"},trig:"act",cmds:[["say","???","..."],["say","Falce Scarlatta","Così sei tu."],["say","@h","Chi sei?"],["say","Falce Scarlatta","Ancora presto per saperlo. Continua a camminare."],["set","falce1",true]]},
  {if:{a:"falce1"},trig:"act",cmds:[["say","Falce Scarlatta","..."]]}]},
 {x:5,y:14,look:{k:"chest"},name:"Forziere",solid:1,pages:[{if:{n:"c2"},trig:"act",cmds:[["say","","Un forziere di cristallo scuro."],["card",9],["set","c2",true]]},{if:{a:"c2"},trig:"act",cmds:[["say","","Vuoto."]]}]},
 {x:3,y:8,look:{k:"none"},name:"Varco",pages:[{trig:"act",cmds:[["say","","Il Varco brilla piano. Dall'altra parte c'è il vento."],["tp","sentiero",27,8,3]]}]}]}}
