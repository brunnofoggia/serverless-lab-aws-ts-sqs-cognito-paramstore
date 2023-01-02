import { sendResponse } from "../functions";
import { getSecretData } from "../functions/kms";

const handler = async (event) => {
    console.log('private -> DB: ', await getSecretData('DB'));
    console.log('private -> User data: ', event.requestContext.authorizer.claims);


    return sendResponse(200, { message: `Email ${event.requestContext.authorizer.claims.email} has been authorized` });
};

export { handler };