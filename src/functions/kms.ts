import aws from "aws-sdk";
import fs from "fs";
import path from "path";

async function getSecretData(secretName) {
    let kms = new aws.KMS();

    const secretsFilePath = path.join(
        process.env.LAMBDA_TASK_ROOT,
        "secret-baker-secrets.json"
    );
    const file = fs.readFileSync(secretsFilePath);
    const secrets = JSON.parse(file.toString());
    const params = {
        CiphertextBlob: Buffer.from(secrets[secretName]["ciphertext"], "base64"),
        EncryptionContext: { PARAMETER_ARN: secrets[secretName]["arn"] }
    };
    const response = await kms.decrypt(params).promise();
    return response.Plaintext.toString("ascii");
}

export {
    getSecretData
};