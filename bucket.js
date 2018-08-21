const Storage = require('@google-cloud/storage');

const storage = new Storage({
  projectId: 'learning-207204',
  keyFilename: 'learning-fe55727c9f92.json'
});

const bucketName = 'storage-bucket-learning';
/**
 * Create Bucket
 */
// storage
//   .createBucket(bucketName)
//   .then(() => {
//     console.log(`Bucket ${bucketName} created.`);
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });

/**
 * List Buckets in Project
 */
// storage
//   .getBuckets()
//   .then(results => {
//     const buckets = results[0];

//     console.log('Buckets:');
//     buckets.forEach(bucket => {
//       console.log(bucket.name);
//     });
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });

/**
 * Delete a Bucket
 */
// storage
//   .bucket(bucketName)
//   .delete()
//   .then(() => {
//     console.log(`Bucket ${bucketName} deleted.`);
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });

/**
 * List files from Bucket
 */
// storage
//   .bucket(bucketName)
//   .getFiles()
//   .then(results => {
//     const files = results[0];

//     console.log('Files:');
//     files.forEach(file => {
//       console.log(file.name);
//     });
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });