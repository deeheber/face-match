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
1. Clone or fork this repo
2. Signup and/or login to [Stackery](https://www.stackery.io/) (there's a free developer tier)
3. Link git and add a new stack
4. In the create stack form select your git provider and `use existing repo` > type in the URL for your repo
5. The stack will load in visual mode
6. [Add an environment variable](https://docs.stackery.io/docs/using-stackery/environments/#setting-configuration-store-values) of `"collectionId": "[collection name here]"`
7. Connect your AWS account to Stackery if you haven't yet and then [deploy your stack](https://docs.stackery.io/docs/workflow/deploying-serverless-stacks/)
8. More details on what each function does can be found in the various `README.md` files in this repo

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
