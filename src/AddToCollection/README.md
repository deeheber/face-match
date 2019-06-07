# AddToCollection Function

### Setup Before Using
- Run `aws rekognition create-collection --collection-id Danielle` using the AWS CLI to create the `Danielle` collection [docs](https://docs.aws.amazon.com/rekognition/latest/dg/API_CreateCollection.html)

### Description
- Uploads the image to the `Danielle` collection [docs](https://docs.aws.amazon.com/rekognition/latest/dg/API_IndexFaces.html)
- Returns collection info [docs](https://docs.aws.amazon.com/rekognition/latest/dg/API_DescribeCollection.html)

### Trigger
- Upload an images to the `CollectionImages` s3 bucket
