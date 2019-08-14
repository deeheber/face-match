const AWS = require('aws-sdk');
const rekognition = new AWS.Rekognition();
const { sendSuccess, sendFailure } = require('cfn-custom-resource');

exports.handler = async event => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

  try {
    const CollectionId = process.env.COLLECTION_NAME || '';
    console.log('COLLECTION ID ENV VAR: ', process.env.COLLECTION_NAME);

    if (CollectionId === '') {
      throw new Error('Collection id env parameter does not exist');
    }

    const { CollectionIds } = await rekognition.listCollections({}).promise();
    console.log('EXISTING COLLECTIONS: ', CollectionIds);

    // Create the collection if it does not exist
    if (!CollectionIds.includes(CollectionId)) {
      console.log(`Creating new collection: ${CollectionId}`);
      await rekognition.createCollection({ CollectionId }).promise();
      console.log('New collection successfully created.');
    }
    await sendSuccess('CreateCollection', {}, event);
  } catch (err) {
    console.error(err.message, err);
    await sendFailure(err.message, event);
  }
};
