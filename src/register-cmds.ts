import "dotenv/config";
import { REST, Routes, ApplicationCommandOptionType } from "discord.js";

const commands = [
  {
    name: "hello",
    description: "Hello how are you",
  },
  {
    name: "twosum",
    description: "Add 2 numbers",
    options: [
      {
        name: "first",
        description: "first number",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
      {
        name: "second",
        description: "second number",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
  {
    name: "embed",
    description: "embed",
  },
  {
    name: "ask-gpt",
    description: "expect a vague answer",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

(async () => {
  console.log("Registering slash cmds...");
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID!,
        process.env.GUILD_ID!
      ),
      { body: commands }
    );
    console.log("Slash cmds registered successfully!!");
  } catch (error) {
    console.log(error);
  }
})();
