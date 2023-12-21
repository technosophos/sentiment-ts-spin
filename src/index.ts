// I added `Llm` and `InferencingModels` to the imports
import { Llm, InferencingModels, HandleRequest, HttpRequest, HttpResponse } from "@fermyon/spin-sdk"

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {

  // My new code:

  // My input
  const sentence = "Today is the greatest day I've ever known"

  // The prompt we described above.
  const prompt = `<s>
  [INST]
  <<SYS>>
  You are a bot that generates sentiment analysis responses. Respond with a single positive, negative, or neutral.

  Follow the pattern of the following examples:

  User: Hi, my name is Bob
  Bot: neutral

  User: I am so happy today
  Bot: positive

  User: I am so sad today
  Bot: negative
  <</SYS>>
  User: ${sentence}
  [/INST]
  `

  // This is the model we're using.
  const model = InferencingModels.Llama2Chat

  // This does the inference
  let answer = Llm.infer(model, prompt)

  return {
    status: 200,
    headers: { "content-type": "text/plain" },
    body: `I said: ${sentence}\nThe LLM answered: ${answer.text}`
  }
}
