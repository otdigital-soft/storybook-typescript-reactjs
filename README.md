# Dashboard

## Requirements

1. [node 15+](https://nodejs.org/en/)
2. [yarn](https://classic.yarnpkg.com/en/docs/getting-started)


## Development

### Prepare hosts

Edit `etc/hosts` and add following entries:

    127.0.0.1    first.example.com
    127.0.0.1    second.example.com
    127.0.0.1    third.example.com

### Install dependencies
    
    yarn

### Copy & update env variables

    cp .env.development.example .env.development.local

### Start the app
    
    yarn start

You can now view the app in the [browser](http://first.example.com:3000).

## Storybook

We use Storybook to test and maintain our components.

### Start storybook

    yarn storybook

You can now view the stories in the [browser](http://localhost:6006).

### Reload storybook

When changing less variables in `antThemeVariables.js` you have to restart storybook server every time you make changes (hot-reloading won't work).
It's tedious job, so you can run `storybook:reload` to automatically watch changes in `antThemeVariables.js` and restart the server.

    yarn storybook:reload

### Build storybook
    
    yarn build-storybook

### API schema

We generate typescript schema for API from the OpenAPI. To update the schema run:

    make generateschema

## Deployment

    yarn build


Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready to be deployed!