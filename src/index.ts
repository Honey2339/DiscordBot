import {
  Client,
  GatewayIntentBits,
  IntentsBitField,
  EmbedBuilder,
} from "discord.js";
import "dotenv/config";
import { joinVoiceChannel, getVoiceConnection } from "@discordjs/voice";
import runChat from "./palm-interaction";

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.on("ready", (c) => {
  console.log(`Bot is online ${c.user.username}!`);
});

client.on("messageCreate", async (message) => {
  if (message.content == "Karni") {
    message.reply("Gay");
    message.react("🤔");
  }
});

client.on("interactionCreate", async (interaction: any) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName == "hello") {
    interaction.reply(`Hello how are you ${interaction.user.username}`);
  }
  if (interaction.commandName == "twosum") {
    const num1Options = interaction.options.get("first");
    const num2Options = interaction.options.get("second");

    if (num1Options && num2Options) {
      const num1 = num1Options.value as number;
      const num2 = num2Options.value as number;
      interaction.reply(`The sum is ${num1 + num2}`);
    } else {
      interaction.reply("Missing one or more options");
    }
  }
  if (interaction.commandName == "embed") {
    const embed = new EmbedBuilder()
      .setTitle("Creator - Sky5")
      .setDescription("This bot is created by Honey2339/Sky5")
      .setColor("Aqua")
      .setFooter({ text: "Honey2339" })
      .setImage(
        "https://res.cloudinary.com/dw6gjaepa/image/upload/v1705389001/jwtswlb0qyc9otbv25if.png"
      )
      .addFields({ name: "Random", value: "Random" });
    interaction.reply({ embeds: [embed] });
  }
  if (interaction.commandName == "ask-gpt") {
    interaction.reply("You are use **!ask (YOUR MESSAGE)** to ask chat gpt");
  }
});

client.on("messageCreate", (message) => {
  if (message.content == "!join") {
    const member = message.guild?.members.cache.get(message.author.id);
    const voiceChannel = member?.voice.channel;
    if (voiceChannel) {
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guildId,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });
    } else {
      message.reply("You are not in a voice channel");
    }
  }
});

client.on("messageCreate", (message) => {
  if (message.content === "!dc") {
    const voiceConnection = getVoiceConnection(message.guildId!);
    if (voiceConnection) {
      voiceConnection.destroy();
      message.channel.send("Disconnected From The Voice Channel");
    } else {
      message.channel.send("Bot is not in voice channel");
    }
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.substring(0, 4) == "!ask") {
    const USERMESSAGE = message.content.slice(5) as string;
    const response = await runChat(USERMESSAGE);
    await message.reply(response.slice(0, 1999));
  }
});

client.login(process.env.TOKEN);
