import { CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

import { verify, decode } from 'jsonwebtoken'
import { createLogger } from '../../utils/logger'
import Axios from 'axios'
import { Jwt } from '../../auth/Jwt'
import { JwtPayload } from '../../auth/JwtPayload'

const logger = createLogger('auth')

// TODO excute by ThienNLNT - 24-10: Provide a URL that can be used to download a certificate that can be used
// to verify JWT token signature. TODO excute by ThienNLNT - 24-10:
// To get this URL you need to go to an Auth0 page -> Show Advanced Settings -> Endpoints -> JSON Web Key Set TODO excute by ThienNLNT - 24-10:
const jwksUrl = 'https://dev-pioirluq8lp64jav.us.auth0.com/.well-known/jwks.json'

export const handler = async (
    event: any
): Promise<CustomAuthorizerResult> => {
  logger.info('Authorizing a user', event.authorizationToken)
  try {
    const jwtToken = await verifyToken(event.authorizationToken)
    logger.info('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

async function verifyToken(authHeader: string): Promise<JwtPayload> {
  const token = getToken(authHeader)
  const jwt: Jwt = decode(token, { complete: true }) as Jwt

  // TODO excute by ThienNLNT - 24-10: Implement token verification
  // You should implement it similarly to how it was implemented for the exercise for the lesson 5 TODO excute by ThienNLNT - 24-10:
  // You can read more about how to do this here: https://auth0.com/blog/navigating-rs256-and-jwks/ TODO excute by ThienNLNT - 24-10:
  const response = await Axios(jwksUrl)
  const signingKey = response.data['keys'].find(
      key => key['kid'] === jwt['header']['kid']
  )
  if (!signingKey) {
    throw new Error(`Unable to find a signing key`)
  }
  const cert = signingKey.x5c[0].match(/.{1,64}/g).join('\n');
  const pem = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
  return verify(token, pem, {
    algorithms: ['RS256']
  }) as JwtPayload
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}