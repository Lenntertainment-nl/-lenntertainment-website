// Cloudflare Pages Function scaffold.
// Intentionally no API key in frontend.
// Configure OPENAI_API_KEY as a secret in Cloudflare before enabling.
export async function onRequestPost(context) {
  return new Response(JSON.stringify({
    reply: "AI-backend nog niet geactiveerd. Configureer eerst de server-side AI-koppeling."
  }), {headers: {"content-type":"application/json"}});
}
