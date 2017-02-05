/**
 * Created by mathysjt on 2/5/17.
 */
import creds from "../creds/credentials.json";
import * as AWS from "aws-sdk";
var credentials = new AWS.Credentials({ accessKeyId: creds.accessKeyId,
                                        secretAccessKey: creds.secretAccessKey});
var s3 = new AWS.S3({
                        apiVersion: '2006-03-01',
                        credentials: credentials
                    });

export function listObjects() {

    return s3.listObjects({
        Bucket: 'testnodebucket1234567890'
    }).promise();

}

export function getObject(key) {
    return s3.getObject({
      Bucket: 'testnodebucket1234567890',
      Key: key
    }).promise();
}