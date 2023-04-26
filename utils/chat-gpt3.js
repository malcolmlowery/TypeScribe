import { OPENAI_API_KEY } from '@env';
import EventSource from 'react-native-sse';
import 'react-native-url-polyfill/auto'


export const handleSubmitPrompt = async () => {
    let new_content = ''

    const data = {
        model: "gpt-3.5-turbo",
        messages: [{ role: 'user', content: 'How do i cook a steak?' }],
        temperature: 0.75,
        top_p: 0.95,
        max_tokens: 100,
        stream: true,
        n: 1,
        max_tokens: 200,
      };
    
    const es = new EventSource('https://api.openai.com/v1/chat/completions', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`
        },
        method: 'POST',
        body: JSON.stringify(data),
        pollingInterval: 2500
    });

    const listener = (event) => {
        if(event.type === 'open') {

        } else if(event.type === 'message') {
            if(event.data !== '[DONE]') {
                const data = JSON.parse(event.data)
                const delta = data.choices[0].delta

                const finish_reason = data.choices[0].finish_reason
                
                if(finish_reason === 'stop') {
                    es.close()
                } else {
                    if(delta && delta.content) {
                        new_content = new_content + delta.content
                        console.log(new_content)
                    }
                }

            } else {
                es.close()
            }
        } else if(event.type === 'error') {
            console.log('Connection Error:', event.message)
        } else if(event.type === 'exception') {
            console.log('Error:', event.message, event.error)
        } 
    };

    es.addEventListener('open', listener)
    es.addEventListener('message', listener)
    es.addEventListener('error', listener)

    return () => {
        es.removeEventListener()
        es.close()
    }
}