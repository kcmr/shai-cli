//@ts-check
const { Configuration, OpenAIApi } = require('openai')
const [, , query] = process.argv

// TODO: get the user shell (zsh, bash?)
// console.log(process.env.SHELL)

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

async function createCompletion(query) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Get a one-line command for a zsh shell:\n\n${query}`,
    temperature: 0,
    max_tokens: 100,
    top_p: 1.0,
    frequency_penalty: 0.2,
    presence_penalty: 0.0,
    stop: ['\n'],
  })

  return response.data.choices[0].text
}

createCompletion(query).then(console.log)
