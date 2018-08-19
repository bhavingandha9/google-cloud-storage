const Storage = require('@google-cloud/storage');

const storage = new Storage({
  projectId: '',
  keyFilename: ''

});

const bucketName = '';
const encryptionKey = ''
/**
 * Create Bucket
 */
storage
  .createBucket(bucketName)
  .then(() => {
    console.log(`Bucket ${bucketName} created.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

/**
 * List Buckets in Project
 */
storage
  .getBuckets()
  .then(results => {
    const buckets = results[0];

    console.log('Buckets:');
    buckets.forEach(bucket => {
      console.log(bucket.name);
    });
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

/**
 * Delete a Bucket
 */
storage
  .bucket(bucketName)
  .delete()
  .then(() => {
    console.log(`Bucket ${bucketName} deleted.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

/**
 * List files from Bucket
 */
storage
  .bucket(bucketName)
  .getFiles()
  .then(results => {
    const files = results[0];

    console.log('Files:');
    files.forEach(file => {
      console.log(file.name);
    });
  })
  .catch(err => {
    console.error('ERROR:', err);
  });


/**
 * List files by Prefix
 */
const options = {
  prefix: prefix,
};

if (delimiter) {
  options.delimiter = delimiter;
}

// Lists files in the bucket, filtered by a prefix
storage
  .bucket(bucketName)
  .getFiles(options)
  .then(results => {
    const files = results[0];

    console.log('Files:');
    files.forEach(file => {
      console.log(file.name);
    });
  })
  .catch(err => {
    console.error('ERROR:', err);
  });



/**
 * Upload a file
 */

storage
  .bucket(bucketName)
  .upload(filename, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    metadata: {
      // Enable long-lived HTTP caching headers
      // Use only if the contents of the file will never change
      // (If the contents will change, use cacheControl: 'no-cache')
      cacheControl: 'public, max-age=31536000',
    },
  })
  .then(() => {
    console.log(`${filename} uploaded to ${bucketName}.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });


/**
 * Download a file
 */

const options = {
  destination: destFilename,
};

storage
  .bucket(bucketName)
  .file(srcFilename)
  .download(options)
  .then(() => {
    console.log(
      `gs://${bucketName}/${srcFilename} downloaded to ${destFilename}.`
    );
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

/**
 * Delete a file
 */

storage
  .bucket(bucketName)
  .file(filename)
  .delete()
  .then(() => {
    console.log(`gs://${bucketName}/${filename} deleted.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });


/**
 * Get Metadata
 */

storage
  .bucket(bucketName)
  .file(filename)
  .getMetadata()
  .then(results => {
    const metadata = results[0];

    console.log(`File: ${metadata.name}`);
    console.log(`Bucket: ${metadata.bucket}`);
    console.log(`Storage class: ${metadata.storageClass}`);
    console.log(`Self link: ${metadata.selfLink}`);
    console.log(`ID: ${metadata.id}`);
    console.log(`Size: ${metadata.size}`);
    console.log(`Updated: ${metadata.updated}`);
    console.log(`Generation: ${metadata.generation}`);
    console.log(`Metageneration: ${metadata.metageneration}`);
    console.log(`Etag: ${metadata.etag}`);
    console.log(`Owner: ${metadata.owner}`);
    console.log(`Component count: ${metadata.component_count}`);
    console.log(`Crc32c: ${metadata.crc32c}`);
    console.log(`md5Hash: ${metadata.md5Hash}`);
    console.log(`Cache-control: ${metadata.cacheControl}`);
    console.log(`Content-type: ${metadata.contentType}`);
    console.log(`Content-disposition: ${metadata.contentDisposition}`);
    console.log(`Content-encoding: ${metadata.contentEncoding}`);
    console.log(`Content-language: ${metadata.contentLanguage}`);
    console.log(`Metadata: ${metadata.metadata}`);
    console.log(`Media link: ${metadata.mediaLink}`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });


/**
 * Make file public
 */

storage
  .bucket(bucketName)
  .file(filename)
  .makePublic()
  .then(() => {
    console.log(`gs://${bucketName}/${filename} is now public.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });



/** 
 * Generate signed url
 */

const options = {
  action: 'read',
  expires: '03-17-2025',
};

storage
  .bucket(bucketName)
  .file(filename)
  .getSignedUrl(options)
  .then(results => {
    const url = results[0];

    console.log(`The signed url for ${filename} is ${url}.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });


/**
 * Move File
 */

storage
  .bucket(bucketName)
  .file(srcFilename)
  .move(destFilename)
  .then(() => {
    console.log(
      `gs://${bucketName}/${srcFilename} moved to gs://${bucketName}/${destFilename}.`
    );
  })
  .catch(err => {
    console.error('ERROR:', err);
  });



/** 
 * Copy file
 */

storage
  .bucket(srcBucketName)
  .file(srcFilename)
  .copy(storage.bucket(destBucketName).file(destFilename))
  .then(() => {
    console.log(
      `gs://${srcBucketName}/${srcFilename} copied to gs://${destBucketName}/${destFilename}.`
    );
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

/**
 * Uploading a encrypted file
 */

const options = {
  // The path to which the file should be uploaded, e.g. "file_encrypted.txt"
  destination: destFilename,
  // Encrypt the file with a customer-supplied key.
  // See the "Generating your own encryption key" section above.
  encryptionKey: encryptionKey
};

// Encrypts and uploads a local file, e.g. "./local/path/to/file.txt".
// The file will only be retrievable using the key used to upload it.
storage
  .bucket(bucketName)
  .upload(srcFilename, options)
  .then(() => {
    console.log(
      `File ${srcFilename} uploaded to gs://${bucketName}/${destFilename}.`
    );
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

/**
 * Downloading encrypted key
 */

const options = {
  // The path to which the file should be downloaded, e.g. "./file.txt"
  destination: destFilename,
};

// Descrypts and downloads the file. This can only be done with the key used
// to encrypt and upload the file.
storage
  .bucket(bucketName)
  .file(srcFilename)
  .setEncryptionKey(encryptionKey)
  .download(options)
  .then(() => {
    console.log(`File ${srcFilename} downloaded to ${destFilename}.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });


/**
 * Rotate Encryption key
 */

storage
  .bucket(bucketName)
  .file(fileName, {
    encryptionKey: encryptionKey,  //Old
  })
  .rotateEncryptionKey({
    encryptionKey: '' //New encryption key
  })
  .then(() => {
    console.log(`Encryption key rotated successfully.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });