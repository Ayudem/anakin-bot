const Discord = require("discord.io")
const logger = require("winston")
const config = require("./config.js")

logger.level = 'debug'

const bot = new Discord.Client({
    token: config.token,
    autorun: true
})

bot.on('ready', evt => {
    logger.info(`Bot logged in as: ${bot.username} (${bot.id})`)
})

bot.on('message', (user, userID, channelID, message, evt) => {
    if (userID === bot.id) {
        return
    }
    const details = {
        message : message,
        user : user,
        userID : userID,
        channelID : channelID,
        evt : evt
    }
    notJustTheMen(details)
    myEnemy(details)
})

const notJustTheMen = (details) => {
    const found = details.message.match(/[A-Za-zÀ-ÿ0-9_]*men[A-Za-zÀ-ÿ0-9_]*/i)
    if (found) {
        logger.debug(`Triggered by ${details.user}'s message: ${details.message}`)
        const men = found[0]
        const women = men.replace(/men/, "women")
        const children = men.replace(/men/, "children")
        bot.sendMessage({
            to: details.channelID,
            message: `Not just the ${men}, but the ${women} and ${children} too`
        })
    }
}

const myEnemy = (details) => {
    const found = details.message.match(^me | me | me$)
    if (found) {
        logger.debug(`Triggered by ${details.user}'s message: ${details.message}`)
        bot.sendMessage({
            to: details.channelID,
            message: `If you're not with me, then you're my enemy.`
        })
    }
}
