const AWS = require('aws-sdk');
const rekognition = new AWS.Rekognition();

exports.handler = async (event, context) => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

  // S3 PUT event
  // {
  //   "Records": [
  //       {
  //           "eventVersion": "2.1",
  //           "eventSource": "aws:s3",
  //           "awsRegion": "us-west-2",
  //           "eventTime": "2019-06-05T16:27:27.768Z",
  //           "eventName": "ObjectCreated:Put",
  //           "userIdentity": {
  //               "principalId": "AWS:AROAIBUCOS26DRUW7IUXM:cli"
  //           },
  //           "requestParameters": {
  //               "sourceIPAddress": "107.1.126.154"
  //           },
  //           "responseElements": {
  //               "x-amz-request-id": "A960ADFFFF4E46F0",
  //               "x-amz-id-2": "2IVd+/Q6LEey6DRBiFGnSYE1ksDRxujRBjkfQtdEeSgFWEW4icsEfTLCqtKtb38ZOYgqFRiK1i4="
  //           },
  //           "s3": {
  //               "s3SchemaVersion": "1.0",
  //               "configurationId": "484beff1-20d6-4795-87b3-c100d897cef3",
  //               "bucket": {
  //                   "name": "image-detector-development-images-053662045684",
  //                   "ownerIdentity": {
  //                       "principalId": "A3MG3PEC75SLNU"
  //                   },
  //                   "arn": "arn:aws:s3:::image-detector-development-images-053662045684"
  //               },
  //               "object": {
  //                   "key": "Amazon-API-Gateway%404x.png",
  //                   "size": 15177,
  //                   "eTag": "d6be6e161cc99d04753ff976f572da9f",
  //                   "sequencer": "005CF7ED6F9E77883C"
  //               }
  //           }
  //       }
  //   ]
  // }

  const Bucket = event.Records[0].s3.bucket.name;
  const Name = event.Records[0].s3.object.key;
  const params = {
    Image: {
      S3Object: {
        Bucket,
        Name
      }
    },
    MaxLabels: 10,
    MinConfidence: 80
  };

  let response;
  let statusCode;

  try {
    response = await rekognition.detectLabels(params).promise();
    statusCode = 200;
    console.log('Successfully analyzed photo ', response);
  } catch (err) {
    response = err.message;
    statusCode = err.statusCode || 500;
    console.log('An error occured ', err);
  }

  return {
    statusCode,
    headers: {},
    response
  }
};
