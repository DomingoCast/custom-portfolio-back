import { JwtPayload } from "jsonwebtoken";
export type VerifyResponse = string | JwtPayload | undefined | Error;
export type AccessTokenResponse = string | Error | undefined;
