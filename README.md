*This project has reached the end of its development. Please use [saleor-app-template](https://github.com/saleor/saleor-app-template) for development, instaed.*

# Saleor App, Next.js example

Bare-bones example app with webhook on product update.

Useful resources:

[Apps guide](https://docs.saleor.io/docs/3.x/developer/extending/apps/key-concepts)

[Configuring apps in dashboard](https://docs.saleor.io/docs/3.x/dashboard/apps)

## Disclaimer

This is not official Saleor project.
Treat this project more as proof of concept, there are no security checks on webhooks and rest of the app is not tested to be released on production.

## Installation



1. In App directory create file `.env.local`, use `.env.local.sample` as a reference.

2. Add Saleor URI to the `.env.local`. If you don't have running instance of Saleor, you create a [free dev account](https://cloud.saleor.io/)
   or run instance [locally](https://github.com/saleor/saleor-platform)
3. You'll need [yarn](https://yarnpkg.com/getting-started/install) to install dependencies.

```
yarn install
```

## How to add app to Saleor?

For local development you can use [localtunnel](https://github.com/localtunnel/localtunnel) or [ngrok](https://ngrok.com/) to expose your app.

1. Start App dev server

`$ yarn dev`

2. Run `appInstall` mutation from graphql client (MANAGE_APPS permission required!)

```
mutation {
  appInstall(
    input: {
      appName: "Best App"
      manifestUrl: "https://your.app.url"
      permissions: [MANAGE_PRODUCTS]
    }
  ) {
    appInstallation {
      id
      status
      appName
      manifestUrl
    }
    appErrors {
      field
      message
      code
      permissions
    }
  }
}
```

3. That's it! 🦄
