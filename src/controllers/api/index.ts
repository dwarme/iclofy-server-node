import apiControllerAuth from "./apiControllerAuth";
import apiControllerPost from "./apiControllerPost";
import apiControllerUser from "./apiControllerUser";

const apiController = {
    auth: apiControllerAuth,
    user: apiControllerUser,
    post: apiControllerPost,
}

export default apiController;