# ManageCollection Function

### Description
- When an image is added to the `CollectionImages` bucket, it uploads the image to the collection [docs](https://docs.aws.amazon.com/rekognition/latest/dg/API_IndexFaces.html)
- When an image is deleted from the `CollectionImages`, it deletes the image from the collection [docs](https://docs.aws.amazon.com/rekognition/latest/dg/API_DeleteFaces.html)

### Triggers
- Upload an images to the `CollectionImages` s3 bucket
- Delete an images from the `CollectionImages` s3 bucket
