import { AwilixContainer } from "awilix";
import { Request } from "express";

export type CustomRequest = Request & {
    container?: AwilixContainer;
};
