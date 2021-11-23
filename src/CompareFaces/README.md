# CompareFaces Function

### Description
- Detects largest face in the uploaded image
- Searches the collection specified in your environment variable for matching faces
[docs](https://docs.aws.amazon.com/rekognition/latest/dg/API_SearchFacesByImage.html)
- Note it is currently set to return FaceMatches in the `FaceMatches` array if the `FaceMatchThreshold` is at or above 90. You can change this in the `index.js` file around line 12.

### Trigger
- Upload an image to the `Images` s3 bucket
