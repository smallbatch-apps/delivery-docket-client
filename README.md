# Delivery Docket Client

This is the client for a delivery docket system. It connects to a NodeJS API as available at [smallbatch-apps/delivery-docket](https://github.com/smallbatch-apps/delivery-docket).

## Installing and running software

Clone the repository and run the following commands.

```
npm install
npm run start
```

## API Connection

API setup is described in its own readme, but once that is started, the `/src/services/` files might need to have their api url constants changed.

## Deployment Warning

It is critically important that the application is deployed to a hosting solution that properly handles static hosting. Specifically the application **must** have its error handler and success handlers all point to `/index.html`. Certain areas of the application will refresh the url to reset state. This will cause the entire application to crash if the host is not properly configured.