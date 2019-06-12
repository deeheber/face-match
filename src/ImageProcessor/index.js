// TODO:
// Grab the put s3 object bucket and name (done possibly???)
// Compose request params something like ---
//   const params = {
//     CollectionId: 'Danielle',
//     FaceMatchThreshold: 95,
//     Image: {
//     S3Object: {
//       Bucket,
//       Name
//     }
//     },
//     MaxFaces: 5
//   };
//   await rekognition.searchFacesByImage(params).promise()
// Determine if there are matches > return/console.log the results

const AWS = require('aws-sdk');
const rekognition = new AWS.Rekognition();

exports.handler = async (event, context) => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

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

  console.log('PARAMS ', JSON.stringify(params, undefined, 2));

  let response;
  let statusCode;

  try {
    response = await rekognition.detectLabels(params).promise();
    statusCode = 200;
    console.log('Successfully analyzed photo ', JSON.stringify(response, undefined, 2));
  } catch (err) {
    response = err.message;
    statusCode = err.statusCode || 500;
    console.log('An error occured ', JSON.stringify(err, undefined, 2));
  }

  return {
    statusCode,
    headers: {},
    response
  }
};
