import * as Discord from "discord.js";
import { Logger } from "tslog";
import { config } from "dotenv";

config();
const console = new Logger();
process.on("uncaughtException", (err) => console.error(err));

const cli = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.DirectMessageReactions,
    Discord.GatewayIntentBits.DirectMessageTyping,
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.GuildBans,
    Discord.GatewayIntentBits.GuildEmojisAndStickers,
    Discord.GatewayIntentBits.GuildIntegrations,
    Discord.GatewayIntentBits.GuildInvites,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildMessageReactions,
    Discord.GatewayIntentBits.GuildMessageTyping,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildPresences,
    Discord.GatewayIntentBits.GuildScheduledEvents,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.GuildWebhooks,
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.MessageContent,
  ],
  partials: [Discord.Partials.Channel],
});
cli.on("ready", async () => {
  console.info("ready");
});
cli.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  if (!msg.guild) return;
  if (!msg.member) return;
  if (msg.channel.type == Discord.ChannelType.GuildText) {
    if (!msg.member.roles.cache.find((r) => r.name == "staff")) return;
    let res = msg.content.match(/(rm )([1-9]*[0-9])/);
    if (res == null) return;
    let num = Number(res[2]);
    if (num) {
      msg.channel.bulkDelete(num);
    }
  }
});
cli.login();
