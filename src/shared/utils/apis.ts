import axios from 'axios'

export const apiKey = import.meta.env.VITE_OPENAI_API_KEY
export const FLIKI_API_KEY = import.meta.env.VITE_FLIKI
export const FLIKI_API_URL = 'https://api.fliki.ai/v1'
export const OPENAPI = 'https://api.openai.com/v1'

export const promptChatgpt = async (prompt: string) => {
  try {
    const response = await axios.post(
      `${OPENAPI}/completions`,
      {
        model: 'text-davinci-003',
        prompt: `Poem where lines end with a comma: ${prompt}`,
        max_tokens: 2943,
        n: 1,
        stop: '',
        temperature: 0.7,
        frequency_penalty: 0.2,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    )
    return response
  } catch (error) {
    return error?.response?.data?.error?.message ?? error?.message
  }
}

export const recommendMusic = async (prompt: string) => {
  try {
    const response = await axios.post(
      `${OPENAPI}/completions`,
      {
        model: 'text-davinci-003',
        prompt: `Recomend music genre or type that can be used as background music for this poem in a short recomendation sentence: ${prompt}`,
        max_tokens: 2943,
        n: 1,
        stop: '',
        temperature: 0.7,
        frequency_penalty: 0.2,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    )
    return response
  } catch (error) {
    return error?.response?.data?.error?.message ?? error?.message
  }
}

export const generateAudio = async ({
  content,
  voiceId,
  voiceStyleId = null,
}: {
  content: string
  voiceId: string
  voiceStyleId: string | null
}) => {
  try {
    const res = await axios({
      method: 'post',
      url: `${FLIKI_API_URL}/generate/audio`,
      headers: {
        Authentication: `Bearer ${FLIKI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      data: {
        content,
        voiceId,
        voiceStyleId,
      },
    })

    return res?.data ? res?.data : null
  } catch (error) {
    return error?.response?.data?.error?.message ?? error?.message
  }
}

export const generateImage = async (prompt: string) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: `${OPENAPI}/images/generations`,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      data: {
        prompt,
        n: 1,
        size: '512x512',
      },
    })

    return data ? data.data : null
  } catch (error) {
    return error?.response?.data?.error?.message ?? error?.message
  }
}
