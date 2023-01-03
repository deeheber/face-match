const { RekognitionClient, IndexFacesCommand, DeleteFacesCommand } = require('@aws-sdk/client-rekognition');
const rekognitionClient = new RekognitionClient({ region: process.env.AWS_REGION });

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, GetCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const dyanmodbClient = new DynamoDBClient({ region: process.env.AWS_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(dyanmodbClient);

exports.handler = async event => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

  const BucketName = event.Records[0].s3.bucket.name;
  const ObjectKey = event.Records[0].s3.object.key;
  const TableName = process.env.TABLE_NAME;
  const CollectionName = process.env.COLLECTION_NAME;

  let response;
  let statusCode;

  try {
    // Adding an image to the collection
    if (event.Records[0].eventName === 'ObjectCreated:Put') {
      console.log(`Adding image to ${CollectionName} collection`);
      const rekognitionResult = await rekognitionClient.send(
        new IndexFacesCommand({
          CollectionId: CollectionName,
          Image: {
            S3Object: {
              Bucket: BucketName,
              Name: ObjectKey
            }
          },
          MaxFaces: 1
        })
      );

      console.log('rekognitionResult ', JSON.stringify(rekognitionResult, undefined, 2));
      const FaceId = rekognitionResult.FaceRecords[0].Face.FaceId;
      console.log(`Face successfully added to ${CollectionName} collection`);

      console.log(`Adding metadata to ${TableName}`);
      await ddbDocClient.send(
        new PutCommand({
          TableName,
          Item: {
            FaceId,
            BucketName,
            ObjectKey
          }
        })
      );
      console.log('Image metadata successfully written to dynamoDB');

      response = `Image successfully added to the ${CollectionName} collection`;
    }

    // Removing an image from the collection
    if (event.Records[0].eventName === 'ObjectRemoved:Delete') {
      console.log('Getting FaceId from dynamoDB');
      const { Item } = await ddbDocClient.send(
        new GetCommand({
          TableName,
          Key: { ObjectKey }
        })
      );
      console.log(`FaceId ${Item.FaceId} successfully obtained from dynamoDB`);

      console.log(`Deteting face ${Item.FaceId} from the ${CollectionName} collection`);
      await rekognitionClient.send(
        new DeleteFacesCommand({
          CollectionId: CollectionName,
          FaceIds: [`${Item.FaceId}`]
        })
      );
      console.log(`Face ${Item.FaceId} successfully deleted from the ${CollectionName} collection`);

      console.log('Removing image metadata from dynamoDB');
      await ddbDocClient.send(
        new DeleteCommand({
          TableName,
          Key: { ObjectKey }
        })
      );
      console.log(`Image ${Item.FaceId} metadata successfully removed from dynamoDB`);

      response = `Image ${Item.FaceId} successfully removed from the ${CollectionName} collection`;
    }

    statusCode = 200;
  } catch (err) {
    console.log('An error occured ', JSON.stringify(err, undefined, 2));
    response = err.message;
    statusCode = err.statusCode || 500;
  }

  return {
    headers: {},
    statusCode,
    body: JSON.stringify(response)
  };
};
