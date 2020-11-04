# CreateOrRemoveCollection Function

### Description
- This function grabs the `collectionId` environment variable from the parameter store.
- Throws an error if that parameter does not exsit.

### Create or Update
- Checks to see if a collection by that name exists in rekognition.
- If not, creates the new collection by the name.

#### Delete
- Deletes the collection if it exists in rekognition.

### Triggers
- This function triggers on every deploy.
