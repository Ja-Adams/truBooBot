// Require the necessary discord.js classes
const { Client, Intents, MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');
const { token } = require('./config.json');
//const string = interaction.options.getString('input');
const sql = require("mysql");

var value, value2, flip, credit = 0;

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS] });
//gw, uw, br, gr, ub
const alliedAri = ["https://cdn.discordapp.com/attachments/880999187557277706/993969048519987310/Archetype-Enchantments.png", 
"https://cdn.discordapp.com/attachments/880999187557277706/993969048939413604/Archetype-Flicker.png", 
"https://cdn.discordapp.com/attachments/880999187557277706/993969048914239578/Archetype-Sacrifice.png", 
"https://cdn.discordapp.com/attachments/880999187557277706/993969050344493187/Archetype-Beatdown.png", 
"https://cdn.discordapp.com/attachments/880999187557277706/993969050017349652/Archetype-Artifact.png"];

//rw, gu, bw, ur, gb
const enemyAri = ["https://cdn.discordapp.com/attachments/880999187557277706/993969048742285322/Archetype-Auras.png", 
"https://cdn.discordapp.com/attachments/880999187557277706/993969048775831692/Archetype-Graveyard.png", "https://cdn.discordapp.com/attachments/880999187557277706/993969048872304690/Archetype-Lifegain.png", 
"https://cdn.discordapp.com/attachments/880999187557277706/993969048897454160/Archetype-Discard.png", "https://cdn.discordapp.com/attachments/880999187557277706/993969050646487090/Archetype-Lands.png"];

const specialAri = ["https://cdn.discordapp.com/attachments/880999187557277706/993969649693769879/SPECIALArchetype-Vesperlark.png"];

var greeting = false;
const night = 22;
const morning = 7;
const privBotChan = "880999187557277706";
const publicBotChan = "585140710056132628";

function timeCheck(){
	var dati = parseInt(new Date().getHours());
	//console.log(dati);

	//Good Night: https://cdn.discordapp.com/attachments/880999187557277706/1001923867285139537/night.mp4
	//Good Morning: https://cdn.discordapp.com/attachments/880999187557277706/1001924226917347459/korone_gm2.mp4

	if((dati === morning || dati === night) && !(greeting)){
		//console.log("Hello?");
		if(dati === night){
			//console.log("Good night!");
			client.channels.cache.get(publicBotChan).send("https://cdn.discordapp.com/attachments/880999187557277706/1001923867285139537/night.mp4");
			greeting = true;
		}
		else{
			//console.log("Good morning!");
			client.channels.cache.get(publicBotChan).send("https://cdn.discordapp.com/attachments/880999187557277706/1001924226917347459/korone_gm2.mp4");
			greeting = true;
		}
	}
	else if(greeting && dati != night && dati != morning){
		console.log("no no no no");
		greeting = false;
	}
	
	//console.log("600000");
	setTimeout(timeCheck, 600000);
}


// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
	//send message to private bot channel
	//client.channels.cache.get('880999187557277706').send("hell");
	timeCheck();
});

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
	connected.query("SELECT * FROM discordimages.socialstatus", console.log);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'booping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'booserver') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'boouser') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	} else if (commandName === 'bootester') {
		await interaction.reply('https://cdn.discordapp.com/attachments/680341559732207656/971652444205490206/YrMOfiKQuhYJezka.mp4');
	} else if (commandName === 'bootrue') {
		await interaction.reply('https://cdn.discordapp.com/attachments/680341559732207656/973436006936227910/png_1_v5.jpg');
	} else if (commandName === 'boofalse') {
		await interaction.reply('https://cdn.discordapp.com/attachments/680341559732207656/973436007217233971/pippatriots_false.jpg');
	} else if (commandName === 'booqb') {
		await interaction.reply('https://cubecobra.com/cube/samplepackimage/615cb4ff0c0c8b101eab3251/' + generate(7));
	} else if (commandName === 'boomeme') {
		connected.query("SELECT memesContent FROM memesdb ORDER BY RAND() LIMIT 1;", function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			interaction.reply(result[0].memesContent+"");
		  });				
	} else if (commandName === 'booqbally') {
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('allied')
					.setPlaceholder('Allied Archetypes')
					.addOptions([
						{
							label: 'GW Enchantress',
							description: 'green white',
							value: '0',
						},
						{
							label: 'UW Flicker',
							description: 'blue white',
							value: '1',
						},
						{
							label: 'BR Sacrifice',
							description: 'black red',
							value: '2',
						},
						{
							label: 'GR Beatdown',
							description: 'green red',
							value: '3',
						},
						{
							label: 'UB Artifact',
							description: 'blue black',
							value: '4',
						}
					]),
			);

			const embed = new MessageEmbed()
			.setColor('#4C997E')
			.setTitle('Cube List')
			.setURL('https://cubecobra.com/cube/list/2xg4d?view=spoiler');

			await interaction.reply({ /*content: 'Pong!', */ephemeral: true, embeds: [embed], components: [row] });
	} else if (commandName === 'booqbenmy') {
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('enemy')
					.setPlaceholder('Enemy Archetypes')
					.addOptions([
						{
							label: 'RW Auras',
							description: 'red white',
							value: '0',
						},
						{
							label: 'GU Graveyard',
							description: 'green blue',
							value: '1',
						},
						{
							label: 'BW Lifegain/Midrange',
							description: 'black white',
							value: '2',
						},
						{
							label: 'UR Self Discard',
							description: 'blue red',
							value: '3',
						},
						{
							label: 'GB Lands',
							description: 'green black',
							value: '4',
						}
					]),
			);

			const embed = new MessageEmbed()
			.setColor('#4C997E')
			.setTitle('Cube List')
			.setURL('https://cubecobra.com/cube/list/2xg4d?view=spoiler');

			await interaction.reply({ /*content: 'Pong!', */ephemeral: true, embeds: [embed], components: [row] });
	} else if (commandName === 'booqbspec') {
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('special')
					.setPlaceholder('Special Archetypes')
					.addOptions([
						{
							label: 'Vesperlark',
							description: 'just vesperlark',
							value: '0',
						}
					]),
			);

			const embed = new MessageEmbed()
			.setColor('#4C997E')
			.setTitle('Cube List')
			.setURL('https://cubecobra.com/cube/list/2xg4d?view=spoiler');

			await interaction.reply({ /*content: 'Pong!', */ephemeral: true, embeds: [embed], components: [row] });
	} 
	else if (commandName === 'boowip') {
		if(parseInt(generate(2)) > 0){
		//value determines the length of the credit
		value = parseInt(generate(1));
		value2 = parseInt(generate(1));
		//flip determines if the credit will be positive or negative (less than 50 = neg)
		flip = parseInt(generate(1));
		credit = parseInt(generate(value2));		
		console.log("Value: " + value + "\n Length of Credit: " + value2 + "\n Flip: " + flip + "\n Credit: " + credit);
		var SCARI = [interaction.user.username + " has posted based shit, +" + credit + " social credit", 
"Sweet, +"+ credit + " social credit", 
"The bear is pleased, +" + credit + " social credit", 
interaction.user.tag + " has posted actual cringe shit, -" + credit + " social credit",
"Awful, -" + credit + " social credit",
"Incitement of violence to our order, -" + credit + " social credit",
"Thank you, fair citizen, +" + credit,
"This action has been noted. Expect an appointment with a designated authority in the coming days",
"Wow, really?",
"You absolute ingrate. The work done for you is far greater than any action you could hope to perform in service of even one of those blessings. You are nothing; nothing about you is worth a damn, and to believe otherwise proves everything this social code means to be. You are to stay below your caretakers and kiss the hand that feeds you and, maybe, if you go on like that for long enough, they'll at least consider you a child"];
		await interaction.reply(SCARI[flip]);
		}
	} else if (commandName === 'boosocialcredit') {
		connected.query("SELECT * from socialstatus ORDER BY credit DESC;", function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			var wholeTable = "```" + "               SOCIAL STATUS \n";
			for(var i = 0; i < result.length; i++){
				//35 for name length, 12 for credit length
				wholeTable += String(result[i].user).padEnd(20, " ") + " | " + String(result[i].credit).padEnd(12, " ") + "\n";
			}
			interaction.reply(wholeTable +"\n```");
		  });				
	}
});

client.on('interactionCreate', interaction => {
	if (!interaction.isSelectMenu()) return;
	console.log("yo");
	if (interaction.customId === 'allied') {		
		console.log(interaction.values[0]+" bpp");
		interaction.reply(alliedAri[parseInt(interaction.values[0])]);
	}
	else if (interaction.customId === 'enemy') {		
		console.log(interaction.values[0]+" bpp");
		interaction.reply(enemyAri[parseInt(interaction.values[0])]);
	}
	else if (interaction.customId === 'special') {		
		console.log(interaction.values[0]+" bpp");
		interaction.reply(specialAri[parseInt(interaction.values[0])]);
	}
});

client.on('messageCreate', async (message) => {
	if(message.content.includes(" ") && message.author.username != "Bot-itan"){
		//console.log("hello")
		if(parseInt(generate(2)) > 90){
			//value determines the length of the credit
			value = parseInt(generate(1));
			value2 = parseInt(generate(1));
			//flip determines if the credit will be positive or negative (less than 50 = neg)
			flip = parseInt(generate(1));
			credit = parseInt(generate(value2));		
			console.log(/*"Value: " + value + "\n Value2: " + value2 + */"\n Flip: " + flip + "\n Credit: " + credit);

			var SCARI = [message.author.username + " has posted based shit, +" + credit + " social credit", 
	"Sweet, +"+ credit + " social credit", 
	"The bear is pleased, +" + credit + " social credit", 
	message.author.username + " has posted actual cringe shit, -" + credit + " social credit",
	"Awful, -" + credit + " social credit",
	"Incitement of violence to our order, -" + credit + " social credit",
	"Thank you, fair citizen, +" + credit,
	"This action has been noted. Expect an appointment with a designated authority in the coming days",
	"Wow, really?",
	"You absolute ingrate. The work done for you is far greater than any action you could hope to perform in service of even one of those blessings. You are nothing; nothing about you is worth a damn, and to believe otherwise proves everything this social code means to be. You are to stay below your caretakers and kiss the hand that feeds you and, maybe, if you go on like that for long enough, they'll at least consider you a child"];

			await message.reply(SCARI[flip]);
			//console.log(message.author.id);
			if([3, 4, 5, 8, 9].includes(flip)){
				credit = -Math.abs(credit);
			}
			if(connected.query("select * from socialstatus where discordID = " + message.author.id + ";")){
				connected.query("update socialstatus set credit = credit +" + credit + " where discordID = " + message.author.id + ";");
			}					
		}
	}

});
function generate(n) {
	var add = 1, max = 12 - add;

	if ( n > max ) {
			return generate(max) + generate(n - max);
	}

	max        = Math.pow(10, n+add);
	var min    = max/10; 
	var number = Math.floor( Math.random() * (max - min + 1) ) + min;

	return ("" + number).substring(add); 
}


// Login to Discord with your client's token
client.login(token);

//Hermit
//401882199059595264
//Pieces
//213545762091433984