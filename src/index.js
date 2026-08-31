import 'dotenv/config';
import {
  Client,
  Events,
  GatewayIntentBits,
  InteractionContextType,
  ApplicationIntegrationType,
  SlashCommandBuilder,
} from 'discord.js';

const { DISCORD_TOKEN, OWNER_USER_ID } = process.env;

if (!DISCORD_TOKEN) throw new Error('Missing DISCORD_TOKEN environment variable.');
if (!OWNER_USER_ID) throw new Error('Missing OWNER_USER_ID environment variable.');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Controlla se il bot e online.')
    .setIntegrationTypes(
      ApplicationIntegrationType.GuildInstall,
      ApplicationIntegrationType.UserInstall,
    )
    .setContexts(
      InteractionContextType.Guild,
      InteractionContextType.BotDM,
      InteractionContextType.PrivateChannel,
    ),
  new SlashCommandBuilder()
    .setName('server')
    .setDescription('Mostra informazioni sul contesto corrente.')
    .setIntegrationTypes(
      ApplicationIntegrationType.GuildInstall,
      ApplicationIntegrationType.UserInstall,
    )
    .setContexts(
      InteractionContextType.Guild,
      InteractionContextType.BotDM,
      InteractionContextType.PrivateChannel,
    ),
].map(command => command.toJSON());

client.once(Events.ClientReady, async readyClient => {
  console.log(`Online come ${readyClient.user.tag}`);

  // Global commands are required for user-installed apps.
  await readyClient.application.commands.set(commands);
  console.log(`Registrati ${commands.length} comandi globali.`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  // Security boundary: only the configured Discord account can execute commands.
  if (interaction.user.id !== OWNER_USER_ID) {
    await interaction.reply({
      content: 'Questo comando e riservato al proprietario del bot.',
      ephemeral: true,
    });
    return;
  }

  if (interaction.commandName === 'ping') {
    await interaction.reply({ content: `Pong! ${client.ws.ping} ms`, ephemeral: true });
    return;
  }

  if (interaction.commandName === 'server') {
    const text = interaction.guild
      ? `Server: ${interaction.guild.name}\nServer ID: ${interaction.guild.id}`
      : 'Il comando e stato eseguito fuori da un server.';

    await interaction.reply({ content: text, ephemeral: true });
  }
});

client.login(DISCORD_TOKEN);
