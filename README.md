# face-match

### Command line setup
- Install and configure the [AWS CLI](https://aws.amazon.com/cli/) if you haven't yet
- Run `aws rekognition create-collection --collection-id [collection name here]` using the AWS CLI on the command line to create a new rekognition collection [docs](https://docs.aws.amazon.com/rekognition/latest/dg/API_CreateCollection.html)
- You will need the value of what you named your collection in step 6 below

## Directions to run/deploy
1. Clone or fork this repo
2. Signup and/or login to [Stackery](https://www.stackery.io/) (there's a free developer tier)
3. Link git and create a new stack
4. In the create stack form in the `Stack Blueprint` section (at the bottom will need to make selections to get it to show) select `specify remote source` and paste in the URL to your cloned or forked repo
5. The stack will load in visual mode
6. Update the `COLLECTION_NAME` variable in template mode to match what you named the collection (should be in two places)
7. Connect your AWS account to Stackery if you haven't yet and then [deploy your stack](https://docs.stackery.io/docs/workflow/deploying-serverless-stacks/)
8. More details on what each function does can be found in the various `README.md` files in this repo

## Questions???
Contact @deeheber on Twitter
