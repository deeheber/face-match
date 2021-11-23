# face-match

## Description
- This stack allows you to upload and delete images from a Rekognition collection.
- You can then upload other images (outside of the Rekognition collection) and then Rekognition searches the images in the collection for a face match with the other images that were uploaded.
- Could be used for facial recognition to unlock something like a diary or a door.
- See [this open issue](https://github.com/deeheber/face-match/issues/16) for future plans to make this less manual

### Technologies Used
- [AWS](https://aws.amazon.com/)
  - [AWS SAM](https://aws.amazon.com/serverless/sam/)
  - CloudFormation
  - S3
  - Lambda
  - DynamoDB
  - Rekognition
- [Node](https://nodejs.org/en/)

### Architecture Overview
![Architecture](https://user-images.githubusercontent.com/12616554/142489428-4a4aa476-5dbf-41a1-96fe-b84fceabcf70.png)

### Directions to run/deploy
1. Install NodeJS v.14, AWS CLI, and [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) on your local machine if you don't have it yet
2. Create your Rekognition collection using the AWS CLI (id should satisfy the regex pattern `[a-zA-Z0-9_.\-]+`). Note this **should not match the id of any existing rekognition collections** that you have unless you want this program to alter that existing collection
    ```bash
    aws rekognition create-collection --collection-id <YOUR COLLECTION ID HERE>
    ```
    Full CLI docs [here](https://docs.aws.amazon.com/cli/latest/reference/rekognition/create-collection.html)
4. Run [`sam build`](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-build.html) and [`sam deploy --guided`](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-deploy.html). When prompted for `RekognitionId` parameter's value, **make sure to add the same collection id from step #2**. Select `Y` to save your config file as `samconfig.toml` in the root of the project (the default setting).
5. Add images to the created S3 buckets in the AWS S3 console and check the Cloudwatch logs for the results. I like to use the `sam logs` command instead of looking for the logs in the AWS console...something like this (update `-n` to be the name of the function you want to view logs for and the `--stack-name` to whatever you named the stack)
  ```bash
  sam logs --stack-name face-match --config-file samconfig.toml -n ManageCollection --tail
  ```
6. More details on what each function does can be found in the various `README.md` files in this repo
7. Delete the Rekognition collection when finished (Recommended for good AWS account hygene)
    ```bash
    aws rekognition delete-collection --collection-id <YOUR COLLECTION ID HERE>
    ```
    Full CLI docs [here](https://docs.aws.amazon.com/cli/latest/reference/rekognition/delete-collection.html)

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
