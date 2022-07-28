const sql = require("mysql");

const connected = sql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'dennisiscool',
    database : 'discordImages'
});

connected.connect(err => {
    if(err) throw err;
    console.log("Connected!");
    connected.query("SHOW TABLES", console.log);
});

//Fill 'er up
//"",
var ari = [];


for (let i = 0; i < ari.length; i++){
    connected.query("insert into memesdb (memesID, memesDate, memesContent) values (0, Cast(sysdate() as Date), \'" + ari[i] + "\')", function (err, result, fields) {
        if (err) throw err;
        console.log(result);        
      });	
}