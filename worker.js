const BASE_URL = 'https://sessionserver.mojang.com/session/minecraft/profile/';

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

const getData = async (url) => {
  const response = await fetch(url);
  return response.json();
}

async function handleRequest(request) {
  const { pathname } = new URL(request.url);

  const uuid = pathname.split('/')[1];

  if (!uuid)
    return new Response(JSON.stringify({ message: 'Use /<uuid>', status: 404 }), {
      headers: { 'Content-Type': 'application/json' },
      status: 404,
    });;

  try {
    const data = await getData(`${BASE_URL}${uuid}`);

    if (data.errorMessage)
      return new Response(JSON.stringify({ message: data.errorMessage, status: 400 }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });;

  
    const textureValue = data.properties.find((p) => p.name === 'textures')?.value;
    const textureData = JSON.parse(atob(textureValue));
    const url = textureData.textures.SKIN.url;

    return new Response(JSON.stringify({ skin_url: url, uuid, minecraft_name: data.name, status: 200 }), {
      headers: { 'Content-Type': 'application/json' },
    });;
  } catch(e) {
      return new Response(JSON.stringify({ message: 'Somethin went wrong. Try again later.', status: 500 }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
    });;
  }
}
