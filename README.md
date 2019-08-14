# face-match

## Description
- This stack allows you to upload and delete images from a collection.
- You can then upload other images (outside of the collection) and the program searches the images in the collection for a face match with the other images that were uploaded.
- Could be used for facial recognition to unlock something like a diary or a door.

### Technologies Used
- [Stackery](https://www.stackery.io/)
- [AWS](https://aws.amazon.com/)
  - [AWS SAM](https://aws.amazon.com/serverless/sam/)
  - CloudFormation
  - S3
  - Lambda
  - DynamoDB
  - Rekognition
- [Node](https://nodejs.org/en/)

![Setup](https://user-images.githubusercontent.com/12616554/59531815-d409d500-8e9b-11e9-9852-ec5c5e70d8cc.png)

### Command line setup
- Install and configure the [AWS CLI](https://aws.amazon.com/cli/) if you haven't yet
- Run `aws rekognition create-collection --collection-id [collection name here]` using the AWS CLI on the command line to create a new rekognition collection [docs](https://docs.aws.amazon.com/rekognition/latest/dg/API_CreateCollection.html)
- You will need the value of what you named your collection in step 6 below

### Directions to run/deploy
1. Sign up for [Stackery](https://www.stackery.io/) (there's a free developer tier)
2. [Create an environment](https://docs.stackery.io/docs/using-stackery/environments/)
3. Add `CollectionId` env var that satisfies the regex pattern `[a-zA-Z0-9_.\-]+` (this is a Rekognition collection naming constraint). Should not match the name of any existing rekognition collections that you have unless you want this program to alter that existing collection.
4. [Run `stackery deploy --interactive-setup`](https://docs.stackery.io/docs/api/cli/stackery_deploy/) via the [Stackery CLI](https://docs.stackery.io/docs/using-stackery/cli/) --- choose to use the environment you created in step 2
5. Add images to the created s3 buckets in the AWS s3 console and check out the cloudwatch logs for the results
6. More details on what each function does can be found in the various `README.md` files in this repo

### Outstanding TODO Items / Open Bugs
See [open issues](https://github.com/deeheber/face-match/issues)

### Logging Issues
If you find a bug or have a question, feel free to open a new issue and our maintainers will reply as soon as they possibly can. Please describe the issue including steps to reproduce if there are any.

### Pull Request Process
1. Fork the respository
2. Make any changes you'd like
3. Open a new PR against `master` with a description of the proposed changes as well as any other information you find relevant.
4. If your PR fixes an open issue be sure to write `fixes #[ issue number here ]`

### Finding Help
Please send a direct message to [@deeheber on Twitter](https://twitter.com/deeheber) if any of your questions have not been addressed by the documentation in this repository.
