const { RekognitionClient, SearchFacesByImageCommand } = require('@aws-sdk/client-rekognition');
const client = new RekognitionClient({ region: process.env.AWS_REGION });

exports.handler = async event => {
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
    response = await client.send(new SearchFacesByImageCommand(params));
    statusCode = 200;
    console.log('Face matches: ', response.FaceMatches.length);
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
