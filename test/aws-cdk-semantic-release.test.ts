import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AwsCdkSemanticReleaseStack } from '../lib/aws-cdk-semantic-release-stack';

describe('AwsCdkSemanticReleaseStack', () => {
    const app = new cdk.App()
    const stack = new AwsCdkSemanticReleaseStack(app, 'TestStack')

    it('should create an SQS queue with the provided visibility timeout', () => {
        const template = Template.fromStack(stack)
        template.resourceCountIs('AWS::SQS::Queue', 1)
        
        template.hasResourceProperties('AWS::SQS::Queue', {
            VisibilityTimeout: 300,
        })
    })

    it('should match the snapshot', () => {
        const template = Template.fromStack(stack)
        expect(template.toJSON()).toMatchSnapshot()
    })
})
