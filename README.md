# Serveur nodeJS pour application Facebook

Le serveur permet une connexion à l'API facebook et de faire quelques requêtes afin de récupérer la liste des pages associées à un utilisateur ainsi que les posts d'une page.

Le serveur dispose aussi d'une URL de retour pour le webhook facebook afin de recevoir les modifications de Posts d'une page ainsi qu'un Server-Sent Events afin de notifier les clients connectés au serveur.

## Configuration 

Copier le fichier env-exemple en .env et renseigner les différentes valeurs. 

- USE_LOCALHOST_SSL : true pour utiliser le SSL en local. Vous pouvez par exemple utiliser mkcert pour générer les certificats SSL https://github.com/FiloSottile/mkcert
- CLIENT_URL : URL de l'application client
- SESSION_SECRET: Secret pour le cookie de session
- FACEBOOK_CLIENT_ID: ID de l'application facebook
- FACEBOOK_CLIENT_SECRET: Secret de l'application facebook
- FACEBOOK_CALLBACK_URL: URL de retour pour la connexion Facebook
- FACEBOOK_HUB_VERIFY_TOKEN: Token de vérification pour l'appel du webhook (doit être le même que celui utilisé dans l'application)
  

## Lancement 

```js
npm start
```

## Autre

Pour la partie webhook et Server-Sent Events, j'utilise une application heroku afin de pouvoir tester le webhook Facebook. 

