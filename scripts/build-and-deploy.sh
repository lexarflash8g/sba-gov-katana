#!/bin/bash

# Arguments
# 1) the environment to build and deploy to
# 2) "all" to build both server and webpack; leave empty or do not provide to build just the server

if [ -z ${1+x} ]
then
    echo "The first argument much be a valid environment: production, staging, mint, demo, or int-*"
    exit 2
fi

echo "Starting Build"
scripts/build.sh $2
echo "Build Complete"
echo "Bundling Lambda Package"
scripts/make-lambda-package.sh
echo "Bundle and Upload Complete"
echo "Deploying...."
scripts/deploy-lambda.sh $1
echo "Deployment Complete"
date