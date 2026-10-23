const {app,BrowserWindow}=require("electron");
app.commandLine.appendSwitch("autoplay-policy","no-user-gesture-required");
app.whenReady().then(()=>{const w=new BrowserWindow({width:1280,height:720,autoHideMenuBar:true,backgroundColor:"#000",title:"Aerinthar"});w.loadFile("index.html")});
app.on("window-all-closed",()=>app.quit());
