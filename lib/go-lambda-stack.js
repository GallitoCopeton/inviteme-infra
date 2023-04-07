"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoLambdaStack = void 0;
const aws_apigateway_1 = require("@aws-cdk/aws-apigateway");
const lambda = require("@aws-cdk/aws-lambda");
const s3 = require("@aws-cdk/aws-s3");
const s3n = require("@aws-cdk/aws-s3-notifications");
const cdk = require("@aws-cdk/core");
class GoLambdaStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // Create an S3 bucket to store your Lambda function code
        const bucket = new s3.Bucket(this, 'MyBucket', {
            bucketName: 'golambdastack-mybucketf68f3ff0-brgzmehpfrup',
            versioned: true,
        });
        // Build the code and create the lambda
        const lambdaFunction = this.buildAndInstallGOLambda('backend-api', 'helloHandler', 'main', bucket);
        bucket.addEventNotification(s3.EventType.OBJECT_CREATED_PUT, new s3n.LambdaDestination(lambdaFunction));
        // Create Rest API Gateway in front of the lambda
        const apiGtw = this.createApiGatewayForLambda('backend-api-endpoint', lambdaFunction, 'Exposed endpoint for your GO lambda API');
        // Output the DNS of your API gateway deployment
        new cdk.CfnOutput(this, 'lambda-url', { value: apiGtw.url });
    }
    /**
     * buildAndInstallGOLambda build the code and create the lambda
     * @param id - CDK id for this lambda
     * @param lambdaPath - Location of the code
     * @param handler - name of the handler to call for this lambda
     */
    buildAndInstallGOLambda(id, name, handler, bucket) {
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
    createApiGatewayForLambda(id, handler, description) {
        return new aws_apigateway_1.LambdaRestApi(this, id, {
            handler,
            description,
        });
    }
}
exports.GoLambdaStack = GoLambdaStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ28tbGFtYmRhLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ28tbGFtYmRhLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDREQUF3RDtBQUN4RCw4Q0FBOEM7QUFDOUMsc0NBQXNDO0FBQ3RDLHFEQUFxRDtBQUNyRCxxQ0FBcUM7QUFFckMsTUFBYSxhQUFjLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDeEMsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUNoRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4Qix5REFBeUQ7UUFDekQsTUFBTSxNQUFNLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDM0MsVUFBVSxFQUFFLDZDQUE2QztZQUN6RCxTQUFTLEVBQUUsSUFBSTtTQUNsQixDQUFDLENBQUM7UUFFSCx1Q0FBdUM7UUFDdkMsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUMvQyxhQUFhLEVBQ2IsY0FBYyxFQUNkLE1BQU0sRUFDTixNQUFNLENBQ1QsQ0FBQztRQUVGLE1BQU0sQ0FBQyxvQkFBb0IsQ0FDdkIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsRUFDL0IsSUFBSSxHQUFHLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQzVDLENBQUM7UUFFRixpREFBaUQ7UUFDakQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUN6QyxzQkFBc0IsRUFDdEIsY0FBYyxFQUNkLHlDQUF5QyxDQUM1QyxDQUFDO1FBRUYsZ0RBQWdEO1FBQ2hELElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILHVCQUF1QixDQUNuQixFQUFVLEVBQ1YsSUFBWSxFQUNaLE9BQWUsRUFDZixNQUFpQjtRQUVqQixNQUFNLFdBQVcsR0FBRztZQUNoQixXQUFXLEVBQUUsR0FBRztZQUNoQixJQUFJLEVBQUUsT0FBTztZQUNiLE1BQU0sRUFBRSxPQUFPO1NBQ2xCLENBQUM7UUFDRixPQUFPLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ2pDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsU0FBUyxDQUFDO1lBQ25FLE9BQU87WUFDUCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQzlCLFVBQVUsRUFBRSxHQUFHO1lBQ2YsT0FBTyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNqQyxXQUFXO1lBQ1gsWUFBWSxFQUFFLElBQUk7U0FDckIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gseUJBQXlCLENBQ3JCLEVBQVUsRUFDVixPQUF3QixFQUN4QixXQUFtQjtRQUVuQixPQUFPLElBQUksOEJBQWEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQy9CLE9BQU87WUFDUCxXQUFXO1NBQ2QsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBN0VELHNDQTZFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExhbWJkYVJlc3RBcGkgfSBmcm9tICdAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheSc7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYSc7XG5pbXBvcnQgKiBhcyBzMyBmcm9tICdAYXdzLWNkay9hd3MtczMnO1xuaW1wb3J0ICogYXMgczNuIGZyb20gJ0Bhd3MtY2RrL2F3cy1zMy1ub3RpZmljYXRpb25zJztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcblxuZXhwb3J0IGNsYXNzIEdvTGFtYmRhU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuICAgICAgICAvLyBDcmVhdGUgYW4gUzMgYnVja2V0IHRvIHN0b3JlIHlvdXIgTGFtYmRhIGZ1bmN0aW9uIGNvZGVcbiAgICAgICAgY29uc3QgYnVja2V0ID0gbmV3IHMzLkJ1Y2tldCh0aGlzLCAnTXlCdWNrZXQnLCB7XG4gICAgICAgICAgICBidWNrZXROYW1lOiAnZ29sYW1iZGFzdGFjay1teWJ1Y2tldGY2OGYzZmYwLWJyZ3ptZWhwZnJ1cCcsXG4gICAgICAgICAgICB2ZXJzaW9uZWQ6IHRydWUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEJ1aWxkIHRoZSBjb2RlIGFuZCBjcmVhdGUgdGhlIGxhbWJkYVxuICAgICAgICBjb25zdCBsYW1iZGFGdW5jdGlvbiA9IHRoaXMuYnVpbGRBbmRJbnN0YWxsR09MYW1iZGEoXG4gICAgICAgICAgICAnYmFja2VuZC1hcGknLFxuICAgICAgICAgICAgJ2hlbGxvSGFuZGxlcicsXG4gICAgICAgICAgICAnbWFpbicsXG4gICAgICAgICAgICBidWNrZXRcbiAgICAgICAgKTtcblxuICAgICAgICBidWNrZXQuYWRkRXZlbnROb3RpZmljYXRpb24oXG4gICAgICAgICAgICBzMy5FdmVudFR5cGUuT0JKRUNUX0NSRUFURURfUFVULFxuICAgICAgICAgICAgbmV3IHMzbi5MYW1iZGFEZXN0aW5hdGlvbihsYW1iZGFGdW5jdGlvbilcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBDcmVhdGUgUmVzdCBBUEkgR2F0ZXdheSBpbiBmcm9udCBvZiB0aGUgbGFtYmRhXG4gICAgICAgIGNvbnN0IGFwaUd0dyA9IHRoaXMuY3JlYXRlQXBpR2F0ZXdheUZvckxhbWJkYShcbiAgICAgICAgICAgICdiYWNrZW5kLWFwaS1lbmRwb2ludCcsXG4gICAgICAgICAgICBsYW1iZGFGdW5jdGlvbixcbiAgICAgICAgICAgICdFeHBvc2VkIGVuZHBvaW50IGZvciB5b3VyIEdPIGxhbWJkYSBBUEknXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gT3V0cHV0IHRoZSBETlMgb2YgeW91ciBBUEkgZ2F0ZXdheSBkZXBsb3ltZW50XG4gICAgICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICdsYW1iZGEtdXJsJywgeyB2YWx1ZTogYXBpR3R3LnVybCEgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYnVpbGRBbmRJbnN0YWxsR09MYW1iZGEgYnVpbGQgdGhlIGNvZGUgYW5kIGNyZWF0ZSB0aGUgbGFtYmRhXG4gICAgICogQHBhcmFtIGlkIC0gQ0RLIGlkIGZvciB0aGlzIGxhbWJkYVxuICAgICAqIEBwYXJhbSBsYW1iZGFQYXRoIC0gTG9jYXRpb24gb2YgdGhlIGNvZGVcbiAgICAgKiBAcGFyYW0gaGFuZGxlciAtIG5hbWUgb2YgdGhlIGhhbmRsZXIgdG8gY2FsbCBmb3IgdGhpcyBsYW1iZGFcbiAgICAgKi9cbiAgICBidWlsZEFuZEluc3RhbGxHT0xhbWJkYShcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgbmFtZTogc3RyaW5nLFxuICAgICAgICBoYW5kbGVyOiBzdHJpbmcsXG4gICAgICAgIGJ1Y2tldDogczMuQnVja2V0XG4gICAgKTogbGFtYmRhLkZ1bmN0aW9uIHtcbiAgICAgICAgY29uc3QgZW52aXJvbm1lbnQgPSB7XG4gICAgICAgICAgICBDR09fRU5BQkxFRDogJzAnLFxuICAgICAgICAgICAgR09PUzogJ2xpbnV4JyxcbiAgICAgICAgICAgIEdPQVJDSDogJ2FtZDY0JyxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgaWQsIHtcbiAgICAgICAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21CdWNrZXQoYnVja2V0LCAnYXBpL2Z1bmN0aW9uLnppcCcsIHVuZGVmaW5lZCksXG4gICAgICAgICAgICBoYW5kbGVyLFxuICAgICAgICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuR09fMV9YLFxuICAgICAgICAgICAgbWVtb3J5U2l6ZTogMTI4LFxuICAgICAgICAgICAgdGltZW91dDogY2RrLkR1cmF0aW9uLnNlY29uZHMoMTApLFxuICAgICAgICAgICAgZW52aXJvbm1lbnQsXG4gICAgICAgICAgICBmdW5jdGlvbk5hbWU6IG5hbWUsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNyZWF0ZUFwaUdhdGV3YXlGb3JMYW1iZGEgaXMgY3JlYXRpbmcgYSBSZXN0IEFQSSBHYXRld2F5IHRvIGFjY2VzcyB0byB5b3VyIGxhbWJkYSBmdW5jdGlvblxuICAgICAqIEBwYXJhbSBpZCAtIENESyBpZCBmb3IgdGhpcyBsYW1iZGFcbiAgICAgKiBAcGFyYW0gaGFuZGxlciAtIExhbWJkYSBmdW5jdGlvbiB0byBjYWxsXG4gICAgICogQHBhcmFtIGRlc2NyaXB0aW9uIC0gRGVzY3JpcHRpb24gb2YgdGhpcyBlbmRwb2ludFxuICAgICAqL1xuICAgIGNyZWF0ZUFwaUdhdGV3YXlGb3JMYW1iZGEoXG4gICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgIGhhbmRsZXI6IGxhbWJkYS5GdW5jdGlvbixcbiAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZ1xuICAgICk6IExhbWJkYVJlc3RBcGkge1xuICAgICAgICByZXR1cm4gbmV3IExhbWJkYVJlc3RBcGkodGhpcywgaWQsIHtcbiAgICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19