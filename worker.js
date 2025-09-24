addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
});

async function handleRequest(request) {
    if (request.method === "POST") {
        const {text, language} = await request.json();

        const prompt = `Translate the following text into ${language}: "${text}"`;

        const response = await fetch("https://api.openai.com/v1/responses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-5",
                input: prompt,
                temperature: 0.5,
                max_tokens: 100
            })
        });

        const data = await response.json();
        const translation = data.output[0].content[0].text;

        return new Response(JSON.stringify({translation}), {
            headers: {"Content-Type": "application/json"}
        });
    } else {
        return new Response("Method not allowed", {status: 405});
    }
}