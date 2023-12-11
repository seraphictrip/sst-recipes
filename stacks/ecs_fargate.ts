/**
 * Deployment to an ECS Fargate cluster with an Application Load Balancer as the front end.
Auto-scaling based on CPU and memory utilization and per-container request count.
* on sst deploy
* - Runs docker build to build the image
* - Uploads the image to Elastic Container Registry (ECR)
* - Creates a VPC if one is not provided
* - Launches an Elastic Container Service (ECS) cluster in the VPC
* - Creates a Fargate service to run the container image
* - Creates an Auto Scaling Group to auto-scale the cluster
* - Creates an Application Load Balancer (ALB) to route traffic to the cluster
* - Creates a CloudFront Distribution to allow configuration of caching and custom domains
* NOTE: does not deploy on `sst dev` only `sst deploy` 
* @see https://docs.sst.dev/constructs/Service
 * This ends up deploying alot of resources
 * Even more than similarly functioned 'aws-cdk-lib/aws-ecs-patterns'::ApplicationLoadBalancedFargateService
 * AWS::IAM::Role
* AWS::Lambda::Function
* AWS::EC2::VPC
* AWS::EC2::Subnet
* AWS::EC2::RouteTable
* AWS::EC2::SubnetRouteTableAssociation
* AWS::EC2::Route
* AWS::EC2::EIP
* AWS::EC2::NatGateway
* AWS::EC2::Subnet
* AWS::EC2::RouteTable
* AWS::EC2::SubnetRouteTableAssociation
* AWS::EC2::Route
* AWS::EC2::Subnet
* AWS::EC2::RouteTable
* AWS::EC2::SubnetRouteTableAssociation
* AWS::EC2::Route
* AWS::EC2::Subnet
* AWS::EC2::RouteTable
* AWS::EC2::SubnetRouteTableAssociation
* AWS::EC2::Route
* AWS::EC2::Subnet
* AWS::EC2::RouteTable
* AWS::EC2::SubnetRouteTableAssociation
* AWS::EC2::Route
* AWS::EC2::Subnet
* AWS::EC2::RouteTable
* AWS::EC2::SubnetRouteTableAssociation
* AWS::EC2::Route
* AWS::EC2::InternetGateway
* AWS::EC2::VPCGatewayAttachment
* Custom::LogRetention
* AWS::ECS::Cluster
* AWS::IAM::Role
* AWS::ECS::TaskDefinition
* AWS::IAM::Role
* AWS::IAM::Policy
* AWS::ECS::Service
* AWS::EC2::SecurityGroup
* AWS::EC2::SecurityGroupIngress
* AWS::ApplicationAutoScaling::ScalableTarget
* AWS::ApplicationAutoScaling::ScalingPolicy
* AWS::ApplicationAutoScaling::ScalingPolicy
* AWS::ApplicationAutoScaling::ScalingPolicy
* AWS::ElasticLoadBalancingV2::LoadBalancer
* AWS::EC2::SecurityGroup
* AWS::EC2::SecurityGroupEgress
* AWS::ElasticLoadBalancingV2::Listener
* AWS::ElasticLoadBalancingV2::TargetGroup
* AWS::CloudFront::CachePolicy
* AWS::CloudFront::Distribution
* AWS::IAM::Policy
* Custom::CloudFrontInvalidator
* AWS::SSM::Parameter
* AWS::IAM::Role
* AWS::IAM::Policy
* AWS::Lambda::Function
 */

import { StackContext, Service } from "sst/constructs";


export function Container({ stack }: StackContext) {
  
 const service = new Service(stack, "MyService", {
    path: "./service",
    port: 3000,
    });
  
}
