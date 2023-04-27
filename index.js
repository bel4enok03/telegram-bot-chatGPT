require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { Configuration, OpenAIApi} = require('openai')
const chatbotToken = process.env.TELEGRAM_BOT_TOKEN;
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration);


const bot = new TelegramBot(chatbotToken, { polling: true });

bot.on('message', async (msg) => {
	const chatId = msg.chat.id;
	const text = msg.text;
	const response = await openai.createCompletion({
		model:'text-davinci-003',
		prompt:text,
		temperature:0.7,
		max_tokens:100
	}) 
	const res = response.data.choices[0].text
	bot.sendMessage(chatId, res)
});