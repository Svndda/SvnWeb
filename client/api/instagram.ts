// api/instagram.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { username } = req.query;

  // Si username es un array, tomamos el primer elemento, si no, el string.
  const userToQuery = Array.isArray(username) ? username[0] : username;

  if (!userToQuery) {
    return res.status(400).json({ error: 'Username is required' });
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-host': 'instagram120.p.rapidapi.com',
      'x-rapidapi-key': "c0e0fffbaamsh2852b5610ff2e7bp1e7e8fjsn979c9edd92de"
    },
    body: JSON.stringify({ username: userToQuery, maxId: "" })
  };

  try {
    const response = await fetch('https://instagram120.p.rapidapi.com/api/instagram/posts', options);
    
    // Si la respuesta no es JSON, capturamos el texto para depurar
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Respuesta no es JSON:", text);
        return res.status(502).send("Error: La API externa no devolvió JSON");
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching Instagram data' });
  }
}