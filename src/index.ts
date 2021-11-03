require("dotenv").config();
import "module-alias/register";
import Cryptomat from "@cryptomat/lib/Cryptomat";
import { Structures } from "discord.js";
import CryptomatGuild from "@cryptomat/lib/extensions/Guild";
import CryptomatGuildMember from "@cryptomat/lib/extensions/GuildMember";

Structures.extend("GuildMember", () => CryptomatGuildMember)
Structures.extend("Guild", () => CryptomatGuild)

const client = new Cryptomat();
client.login(process.env.TOKEN);



