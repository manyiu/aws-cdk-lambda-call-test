#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AwsCdkLambdaCallTestStack } from '../lib/aws-cdk-lambda-call-test-stack';

const app = new cdk.App();
new AwsCdkLambdaCallTestStack(app, 'AwsCdkLambdaCallTestStack');
