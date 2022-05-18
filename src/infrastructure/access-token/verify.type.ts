import { JwtPayload } from "jsonwebtoken";
export type AccessTokenResponse = string | Error | undefined;
export type VerifyResponse = string | JwtPayload | undefined | Error;
