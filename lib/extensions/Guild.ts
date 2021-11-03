import { ClientEvents, Guild, GuildChannel, GuildMember, Message, MessageAttachment, TextChannel } from "discord.js";
import { RawGuildData } from "discord.js/typings/rawDataTypes";
//import GuildSettings from "../additions/GuildSettings";
import Cryptomat from "../Cryptomat";
import { Snowflake } from "discord-api-types";
import { config } from "@cryptomat/config/index";
import { guildSettings } from "../interfaces/guildSettings";
import { events } from "../types/events";
import { ICONS } from "../enums/icons";
import moment from "moment";
import CryptomatGuildMember from "./GuildMember";
export default class CryptomatGuild extends Guild {
   // settings: GuildSettings
   settings: guildSettings
    mutes: Map<Snowflake, {}>
    constructor(client: Cryptomat, data: RawGuildData) {
        super(client, data);

     //   this.settings = new GuildSettings(client, data.id);
      // this.settings.init();

      this.settings = {...config.guild};


        this.mutes = new Map();
    }

    logMessage(type: 0 | 1, event: events, data: Array<any>) {
        const channel = this.channels.cache.get(this.settings[type === 0 ? "modLogChannel" : "discordLogChannel"]) as TextChannel;
        switch(event) {
            case "guildMemberRemove": {
                guildMemberLeaveMessage(channel, data[0]);
                break;
            }
            case "guildMemberAdd": {
                guildMemberAddMessage(channel, data[0]);
                break;
            }
            case "guildMemberUpdate": {
                guildMemberUpdateMessage(channel, data[0], data[1]);
                break;
            }
            case "messageDelete": {
                messageDeleteMessage(channel, data[0]);
                break;
            }
            case "messageUpdate": {
                messageUpdateMessage(channel, data[0], data[1]);
                break;
            }
            case "messageDeleteBulk": {
                messageDeleteBulkMessage(channel, data[0], data[1])
                break;
            }
            case "memberBanned": {
                memberBannedMessage(channel, data[0], data[1], data[2]);
                break;
            }
            case "memberKicked": {
                memberKickedMessage(channel, data[0], data[1], data[2]);
                break;
            }
        }
   
    }
}

const guildMemberLeaveMessage = (channel: TextChannel, member: GuildMember) => {
    channel.send({embeds:[{
        author: {
            iconURL: "https://cdn.discordapp.com/emojis/904869990312865832.png",
            name: "Member Left"
        },
        description: `${member} ${member.user.tag}`,
        //@ts-ignore
        thumbnail: member.user.avatarURL() ? {
            url: member.user.avatarURL({dynamic: true})
        }: {},
        fields: (member.roles.cache.size - 1) > 0 ? [{
            name: `${ICONS.ROLES} Roles (${member.roles.cache.size - 1})`,
            value: `${member.roles.cache.filter(r => r.id !== channel.guild.id).map(v => `${v}`)}`
        }]: [],
        footer: {
        text: `ID: ${member.id}`,
        },
        color: "RED",
        timestamp: Date.now()
    }]})
}

const guildMemberAddMessage = (channel: TextChannel, member: GuildMember) => {
    channel.send({embeds:[{
        author: {
            iconURL: "https://cdn.discordapp.com/emojis/904878562069319730.png",
            name: "Member Joined"
        },
        //@ts-ignore
        thumbnail: member.user.avatarURL() ? {
            url: member.user.avatarURL({dynamic: true})
        }: {},
        description: `${member} ${member.user.tag}`,
        fields: [{
            name: `${ICONS.SUPPORTTEAM} Account Created`, 
            value: `<t:${Math.floor(member.user.createdAt.getTime() / 1000)}:R>`
        }],
        footer: {
        text: `ID: ${member.id}`,
        },
        color: "GREEN",
        timestamp: Date.now()
    }]})
}

const guildMemberUpdateMessage = (channel: TextChannel, oldMember: GuildMember, newMember: GuildMember) => {
    if(oldMember.roles.cache.size !== newMember.roles.cache.size) {
    const added = oldMember.roles.cache.size < newMember.roles.cache.size;
    const role = added ? newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id)).first(): oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id)).first()
    channel.send({embeds:[{
        author: {
            iconURL: "https://cdn.discordapp.com/emojis/866943416256167936.png",
            name: `Roles Updated`
        },
        description: `${newMember} ${newMember.user.tag}`,
        fields:[{
            name: `${ICONS.UPDATEROLE} Role ${added ? "Added" : "Removed"}`,
            value: `${role} (${role?.id})`
        }],
        footer: {
            text: `ID: ${newMember.id}`,
            },
            color: "LIGHT_GREY",
            timestamp: Date.now()
    }]})
    } else {
        channel.send({embeds:[{
            author: {
                iconURL: "https://cdn.discordapp.com/emojis/866943416256167936.png",
                name: `Nickname Updated`
            },
            description: `${newMember} ${newMember.user.tag}`,
            fields:[{
                name: `${ICONS.FRIENDS} Old Nickname`,
                value: `\`${oldMember.nickname ?? oldMember.user.username}\``
            }, {
                name: `${ICONS.NEW} New Nickname`,
                value: `\`${newMember.nickname ?? newMember.user.username}\``
            }],
            footer: {
                text: `ID: ${newMember.id}`,
                },
                color: "NAVY",
                timestamp: Date.now()
        }]})
    }
};

const messageDeleteMessage = (channel: TextChannel, message: Message) => {
    if(!message.attachments.size) {
    const value = message.content.length > 1024 ? `${message.content.slice(0, 1021)}...` : message.content;
    channel.send({embeds:[{
        author: {
            name: "Message Deleted",
            iconURL: "https://cdn.discordapp.com/emojis/905114408022343700.png"
        },
        description: `**Message sent by ${message.author} deleted in ${message.channel}**`,
        fields:[{
            name: `${ICONS.MESSAGE} Content`,
            value: value
        }],
        footer: {
            text: `Author: ${message.author.id} | Message: ${message.id}`
        },
        timestamp: Date.now(),
        color: "DARK_RED"
    }]})
    } else {
        channel.send({embeds:[{
            author: {
                name: "Image Deleted",
                iconURL: "https://cdn.discordapp.com/emojis/905114408022343700.png"
            },
            description: `**Image sent by ${message.author} deleted in ${message.channel}**`,
            image: {
                url: (message.attachments.first() as MessageAttachment).url
            },
            footer: {
                text: `Author: ${message.author.id} | Message: ${message.id}`
            },
            timestamp: Date.now(),
            color: "DARK_RED"
        }]})
    }
}

const messageUpdateMessage = (channel: TextChannel, oldMessage: Message, newMessage: Message) => {
    const oldValue = oldMessage.content.length > 1024 ? `${oldMessage.content.slice(0, 1021)}...` : oldMessage.content;
    const newValue = newMessage.content.length > 1024 ? `${newMessage.content.slice(0, 1021)}...` : newMessage.content;
    channel.send({embeds:[{
        author: {
            name: "Message Edited",
            iconURL: "https://cdn.discordapp.com/emojis/905123154630963220.png"
        },
        description: `**Message sent by ${newMessage.author} edited in ${newMessage.channel}** [Link to message](${newMessage.url})`,
        fields:[{
            name: `${ICONS.MESSAGE} Before`,
            value: oldValue
        },{
            name: `${ICONS.WRENCH} After`,
            value: newValue
        }],
        footer: {
            text: `Author: ${newMessage.author.id} | Message: ${newMessage.id}`
        },
        timestamp: Date.now(),
        color: "ORANGE"
    }]})
}

const messageDeleteBulkMessage = (channel: TextChannel, length: number, c: TextChannel) => {
    channel.send({embeds:[{
        author: {
            name: "Bulk Delete",
            iconURL: "https://cdn.discordapp.com/emojis/905114408022343700.png"
        },
        description: `**${length} Messages deleted in ${c}**`,
        color: "DARK_RED",
        timestamp: Date.now()
    }]})
}

const memberBannedMessage = (channel: TextChannel, member: CryptomatGuildMember, moderator: CryptomatGuildMember, reason: string) => {
    channel.send({embeds:[{
        author: {
            name: "Member Banned",
            iconURL: "https://cdn.discordapp.com/emojis/859424400968646676.png"
        }, 
        fields: [{
            name: `${ICONS.FRIENDS} User`,
            value: `${member} (${member.id})`
        }, {
            name: `${ICONS.GUARDIAN} Moderator`, 
            value: `${moderator} (${moderator.id})`
        }, {
            name: `${ICONS.MESSAGE} Reason`, 
            value: reason.length > 1024 ? `${reason.slice(0, 1021)}...` : reason
        }],
        timestamp: Date.now(),
        color: "RED"
    }]})
}

const memberKickedMessage = (channel: TextChannel, member: CryptomatGuildMember, moderator: CryptomatGuildMember, reason: string) => {
    channel.send({embeds:[{
        author: {
            name: "Member Kicked",
            iconURL: "https://cdn.discordapp.com/emojis/859424400557604886.png"
        }, 
        fields: [{
            name: `${ICONS.FRIENDS} User`,
            value: `${member} (${member.id})`
        }, {
            name: `${ICONS.GUARDIAN} Moderator`, 
            value: `${moderator} (${moderator.id})`
        }, {
            name: `${ICONS.MESSAGE} Reason`, 
            value: reason.length > 1024 ? `${reason.slice(0, 1021)}...` : reason
        }],
        timestamp: Date.now(),
        color: "ORANGE"
    }]})
}