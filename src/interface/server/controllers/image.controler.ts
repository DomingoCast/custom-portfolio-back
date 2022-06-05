import { Response } from "express";
import path from "path";
import { CustomRequest } from "../types/custom.request";

const imageController = async (
    req: CustomRequest,
    res: Response
): Promise<void | Response> => {
    res.sendFile(
        path.join(__dirname, "../../../../uploads", req.params.imageName)
    );
};

export default imageController;
