import { LambdaRestApi } from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3n from '@aws-cdk/aws-s3-notifications';
import * as cdk from '@aws-cdk/core';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';

export class GoLambdaStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        // Create an S3 bucket to store your Lambda function code
        const bucket = new s3.Bucket(this, 'MyBucket', {
            bucketName: 'golambdastack-mybucketf68f3ff0-brgzmehpfrup',
            versioned: true,
        });

        // Build the code and create the lambda
        const lambdaFunction = this.buildAndInstallGOLambda(
            'backend-api',
            'helloHandler',
            'main',
            bucket
        );

        bucket.addEventNotification(
            s3.EventType.OBJECT_CREATED_PUT,
            new s3n.LambdaDestination(lambdaFunction)
        );

        // Create Rest API Gateway in front of the lambda
        const apiGtw = this.createApiGatewayForLambda(
            'backend-api-endpoint',
            lambdaFunction,
            'Exposed endpoint for your GO lambda API'
        );

        // Output the DNS of your API gateway deployment
        new cdk.CfnOutput(this, 'lambda-url', { value: apiGtw.url! });

        // create the CodePipeline
        const pipeline = new codepipeline.Pipeline(this, 'MyPipeline');

        // create the source stage
        const sourceOutput = new codepipeline.Artifact();
        const sourceAction = new codepipeline_actions.S3SourceAction({
            actionName: 'S3Source',
            bucket: bucket,
            bucketKey: 'api/function.zip',
            output: sourceOutput,
        });
        pipeline.addStage({
            stageName: 'Source',
            actions: [sourceAction],
        });

        // create the deploy stage
        const deployAction = new codepipeline_actions.LambdaInvokeAction({
            actionName: 'LambdaPublish',
            lambda: lambdaFunction,
            inputs: [sourceOutput],
        });
        pipeline.addStage({
            stageName: 'Deploy',
            actions: [deployAction],
        });
    }

    /**
     * buildAndInstallGOLambda build the code and create the lambda
     * @param id - CDK id for this lambda
     * @param lambdaPath - Location of the code
     * @param handler - name of the handler to call for this lambda
     */
    buildAndInstallGOLambda(
        id: string,
        name: string,
        handler: string,
        bucket: s3.Bucket
    ): lambda.Function {
        const environment = {
            CGO_ENABLED: '0',
            GOOS: 'linux',
            GOARCH: 'amd64',
        };
        return new lambda.Function(this, id, {
            code: lambda.Code.fromBucket(bucket, 'api/function.zip', undefined),
            handler,
            runtime: lambda.Runtime.GO_1_X,
            memorySize: 128,
            timeout: cdk.Duration.seconds(10),
            environment,
            functionName: name,
        });
    }

    /**
     * createApiGatewayForLambda is creating a Rest API Gateway to access to your lambda function
     * @param id - CDK id for this lambda
     * @param handler - Lambda function to call
     * @param description - Description of this endpoint
     */
    createApiGatewayForLambda(
        id: string,
        handler: lambda.Function,
        description: string
    ): LambdaRestApi {
        return new LambdaRestApi(this, id, {
            handler,
            description,
        });
    }
}
