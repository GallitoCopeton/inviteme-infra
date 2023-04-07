import { LambdaRestApi } from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
export declare class GoLambdaStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps);
    /**
     * buildAndInstallGOLambda build the code and create the lambda
     * @param id - CDK id for this lambda
     * @param lambdaPath - Location of the code
     * @param handler - name of the handler to call for this lambda
     */
    buildAndInstallGOLambda(id: string, name: string, handler: string, bucket: s3.Bucket): lambda.Function;
    /**
     * createApiGatewayForLambda is creating a Rest API Gateway to access to your lambda function
     * @param id - CDK id for this lambda
     * @param handler - Lambda function to call
     * @param description - Description of this endpoint
     */
    createApiGatewayForLambda(id: string, handler: lambda.Function, description: string): LambdaRestApi;
}
