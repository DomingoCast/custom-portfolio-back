import registerUserUseCase from "../../core/use-cases/user/register-user.use-case";
import { setUpEmail } from "../email/emailer.output";
import createUserRepository from "../persistance/user/user.datasource";

import * as awilix from "awilix";
import getLogger from "../logger/get-logger";
import createHashFunction from "../password/create-hash-function";
import loginUseCase from "../../core/use-cases/user/login-user.use-case";
import accessToken from "../access-token/access-token";
import passwordUserUseCase from "../../core/use-cases/user/pasword-user.use-case";
import { magicUseCase } from "../../core/use-cases/user/magic.use-case";
import createCollectionUseCase from "../../core/use-cases/collection/create-collection.use-case";
import createCollectionRepository from "../persistance/collection/collection.datasource";
import getCollectionsUseCase from "../../core/use-cases/collection/get-collections.use-case";
import getCollectionUseCase from "../../core/use-cases/collection/get-collection.use-case";
import createPostUseCase from "../../core/use-cases/post/create-post.use-case";
import createPostRepository from "../persistance/post/post.datasource";
import getCollectionAndPostsUseCase from "../../core/use-cases/post/get-collection-and-posts.use-case";

export const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
    registerUserUseCase: awilix.asFunction(registerUserUseCase),
    passwordUserUseCase: awilix.asFunction(passwordUserUseCase),
    createCollectionUseCase: awilix.asFunction(createCollectionUseCase),
    createPostUseCase: awilix.asFunction(createPostUseCase),
    getCollectionsUseCase: awilix.asFunction(getCollectionsUseCase),
    getCollectionAndPosts: awilix.asFunction(getCollectionAndPostsUseCase),
    loginUseCase: awilix.asFunction(loginUseCase),
    magicUseCase: awilix.asFunction(magicUseCase),
    userRepository: awilix.asFunction(createUserRepository),
    collectionRepository: awilix.asFunction(createCollectionRepository),
    postRepository: awilix.asFunction(createPostRepository),
    emailSender: awilix.asFunction(setUpEmail),
    accessToken: awilix.asFunction(accessToken),
    logger: awilix.asFunction(getLogger),
    hashFunction: awilix.asFunction(createHashFunction),
});
