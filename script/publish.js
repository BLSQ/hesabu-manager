const path = require("path");
const fs = require("fs");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  apiVersion: "2006-03-01",
});

const uploadFile = (file, bucketName, region) => {
  const uploadParams = { Bucket: bucketName, Key: "", Body: "" };
  AWS.config.update({ region });

  const fileStream = fs.createReadStream(file);
  fileStream.on("error", function(err) {
    console.log("File Error", err);
    exit(-1);
  });
  uploadParams.Body = fileStream;
  uploadParams.Key = path.basename(file);

  // call S3 to retrieve upload file to specified bucket
  s3.upload(uploadParams, function(err, data) {
    if (err) {
      console.log("Error", err);
      exit(-1);
    }
    if (data) {
      console.log("Upload Success", data.Location);
      exit(0);
    }
  });
};

uploadFile("./Hesabu.zip", "hesabu-manager-build", "eu-central-1");
