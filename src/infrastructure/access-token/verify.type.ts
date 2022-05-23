import { JwtPayload } from "jsonwebtoken";
export type AccessTokenResponse = string | undefined;
export type VerifyResponse = string | JwtPayload | undefined;
