// I added `Llm` and `InferencingModels` to the imports
import { Llm, InferencingModels, HandleRequest, HttpRequest, HttpResponse } from "@fermyon/spin-sdk"

// We'll use this to get the data out of the request.
const decoder = new TextDecoder();

export const handleRequest: HandleRequest = async function (request: HttpRequest): Promise<HttpResponse> {

  // My input
  //const sentence = "Today is the greatest day I've ever known"
  const sentence = decoder.decode(request.body)

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
    headers: { "content-type": "application/json" },
    body: JSON.stringify(answer)
  }
}
