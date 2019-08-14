const AWS = require('aws-sdk');
const { sendSuccess, sendFailure } = require('cfn-custom-resource');

exports.handler = async event => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));
  // TODO:
  // Pull down the collectionId environment variable from the parameter store https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_GetParameter.html
  // Throw error if the env var does not exist
  // Check to see if the collection exists https://docs.aws.amazon.com/rekognition/latest/dg/list-collection-procedure.html
  // Create the collection if it doesn't https://docs.aws.amazon.com/rekognition/latest/dg/create-collection-procedure.html
  try {
    console.log('COLLECTION ID: ', process.env.COLLECTION_NAME);
    await sendSuccess('CreateCollection', {}, event);
  } catch (err) {
    console.error(err.message, err);
    await sendFailure(err.message, event);
  }
};
