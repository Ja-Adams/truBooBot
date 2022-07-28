const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('booping').setDescription('Replies with pong!'),
    new SlashCommandBuilder().setName('bootester').setDescription('Replies with success'),
    new SlashCommandBuilder().setName('bootrue').setDescription('TRUE'),
    new SlashCommandBuilder().setName('boofalse').setDescription('FALSE'),
	new SlashCommandBuilder().setName('booqb').setDescription('Generate a sample pack of the mighty CUBE'),
	new SlashCommandBuilder().setName('boomeme').setDescription('Random meme'),
	new SlashCommandBuilder().setName('booqbally').setDescription('Show off CUBE allied colored info'),
	new SlashCommandBuilder().setName('booqbenmy').setDescription('Show off CUBE enemy colored info'),
	new SlashCommandBuilder().setName('booqbspec').setDescription('Show off CUBE special info'),
	new SlashCommandBuilder().setName('boowip').setDescription('Never know what\'ll happen'),
	new SlashCommandBuilder().setName('boosocialcredit').setDescription('See server\'s social credit status'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

//after making any changes, use: node deploy-commands.js
// while I'm here: node index.js

