import { AwilixContainer } from "awilix";
import { Request, Response } from "express";
import { Post } from "../../../../core/domain/post/post";
import { User } from "../../../../core/domain/user/user";
import ConflictError from "../../../../core/errors/conflict-error";
import validatePost from "../../../../infrastructure/user/validate-post/validate-post";

type CustomRequest = Request<{}, {}, Omit<Post, "id" | "posts" | "user">> & {
    container?: AwilixContainer;
    user?: User;
};

const postPostController = async (
    req: CustomRequest,
    res: Response
): Promise<Response | void> => {
    const container = req.container!.cradle;
    const post = { ...req.body, thumbnail: req.file!.filename };
    const validate = validatePost(post);
    if (validate !== true) {
        container.logger.error(validate);
        return res.status(400).send({ message: validate });
    }
    const collection = await container.collectionRepository.getById(
        post.collection
    );
    let response;
    if (collection) {
        const newPost = {
            ...post,
            user: req.user,
            collection: collection,
            thumbnail: req.file!.filename,
        };
        // console.log("[new post]", newPost);
        response = await container.createPostUseCase(newPost);
        if (response) {
            container.logger.info(response);
            return res.status(200).send({ message: "Post has been created" });
        }
    }
    throw new ConflictError("Wrong collection");
};

export default postPostController;
