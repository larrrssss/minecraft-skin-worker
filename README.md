# Minecraft Skin Worker 

Cloudflare worker to get the skin texture url for a given uuid.

## Usage

Make a `GET` request to following url

```
https://minecraft-skin.larrrssss.workers.dev/:uuid
```

## Response

```json
{
  "skin_url": "http://textures.minecraft.net/texture/9d089d19977d7001618d0a3f3ed58c48e5c2989fce9539377bb833d74eb0f3d1",
  "uuid": "e9013c2f-da01-425f-a48b-516f55e94386",
  "minecraft_name": "GommeHD",
  "status": 200
}
```
