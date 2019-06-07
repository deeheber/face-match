// TODO:
// If adding an image to the bucket (ObjectCreated:Put)
//   Grab the bucket name and object key
//   Call indexFaces
//   Get the FaceId from the Response
//   Put the bucket name, object key, and FaceId in a dynamoDB table

// If deleting image from bucket (ObjectRemoved:Delete)
//   Query the table for the bucket name / object key to get the FaceId
//   Call deleteFaces
//   Delete the row in dynamoDB

exports.handler = async (event, context) => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

  return {};
};
