const AWS = require('aws-sdk');
const rekognition = new AWS.Rekognition();

exports.handler = async (event, context) => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

  const Bucket = event.Records[0].s3.bucket.name;
  const Name = event.Records[0].s3.object.key;
  const params = {
    CollectionId: process.env.COLLECTION_NAME,
    FaceMatchThreshold: 90,
    Image: {
      S3Object: {
        Bucket,
        Name
      }
    }
  };
  console.log('PARAMS ', JSON.stringify(params, undefined, 2));

  let response;
  let statusCode;

  try {
    response = await rekognition.searchFacesByImage(params).promise();
    statusCode = 200;
    console.log('Face comparison results ');
    console.log(JSON.stringify(response, undefined, 2));
  } catch (err) {
    response = err.message;
    statusCode = err.statusCode || 500;
    console.log('An error occured ', JSON.stringify(err, undefined, 2));
  }

  return {
    statusCode,
    headers: {},
    response
  };
};
