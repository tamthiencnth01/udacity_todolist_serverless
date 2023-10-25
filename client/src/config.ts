// TODO excute by ThienNLNT - 24-10: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'ocxk67hwdj'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO excute by ThienNLNT - 24-10: Create an Auth0 application and copy values from it into this map. For example:
  // domainTODO excute by ThienNLNT - 24-10:: 'dev-nd9990-p4.us.auth0.com',
  domain: 'dev-pioirluq8lp64jav.us.auth0.com',            // Auth0 domainTODO excute by ThienNLNT - 24-10:
  clientId: 'fe39mwr86k4ZauV1WGJDFPUWW79qBhLT',          // Auth0 client id TODO excute by ThienNLNT - 24-10:
  callbackUrl: 'http://localhost:3000/callback'
}
