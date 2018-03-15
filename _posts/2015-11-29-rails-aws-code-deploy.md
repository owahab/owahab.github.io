---
layout: post
title: "Deploying Rails using AWS CodeDeploy"
disqus_comments: true
categories: aws rails
---
## Assumptions
The following tutorial uses:
us-east-1, Ubuntu 14.04, Rbenv, Foreman

## IAM
We will create a new role that we will be launching our EC2 with.
EC2 instances launched with the new role will be able to:

1. Download and install CodeDeploy Agent from S3.
2. Grant CodeDeploy access to our EC2 instances.

#### Create IAM Role

1. Create a new role, give it a name.
1. Attach Policy:
  1. AWSCodeDeployRole
  2. AmazonS3ReadOnlyAccess
  3. CodeDeployEC2Permissions
1. Edit trust relationship:

        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Sid": "",
              "Effect": "Allow",
              "Principal": {
                "Service": "codedeploy.amazonaws.com"
              },
              "Action": "sts:AssumeRole"
            },
            {
              "Sid": "",
              "Effect": "Allow",
              "Principal": {
                "Service": "ec2.amazonaws.com"
              },
              "Action": "sts:AssumeRole"
            }
          ]
        }

### VPC

# Create a new VPC
I prefer setting up a separate VPC for every application, feel free to ignore this step if you don't really care about this.
Class B private IPs provide a decent number of hosts and that's what I'll use here.

1. Create a new VPC
1. Use CIDR 172.16.0.0/16
1. Leave Tenancy as default unless you know what you're doing.

#### Subnets
Using multiple subnets will allow Scalability Groups to utilize multiple 
availability zones improves redundancy.

1. Create a new subnet for availability zone.
1. For the CIDR, use 172.16.X.0/24, this would give you 251 IPs per subnet.
1. Repeat for each availability zone or to your liking.

#### Internet Gateway
1. Create a new Internet Gateway to allow your VPC to receive traffic from the Internet.
1. Choose the gateway and attach it to your VPC.

#### Route Table
For Internet requests to reach your gateway, you need a routing table.

1. Create a routing table or use the one created alongside the VPC
1. Go to: Routes > Edit > Add another route
1. Set Destination as: 0.0.0.0/0
1. Target should be have one autocomplete option: the gateway you created above.
1. Save.

#### Security Group
To make things more tidy, we will create a per-VPC security group and we will
attach it to all resources we create. This would allow globally enabling certain
ports or block certain IPs from accessing all resources.

### AMI
We now need to create an AMI that has all our project's OS dependencies installed.
If you already have an AMI, skip to "Install CodeDeploy Agent"

We will use a setup similar to 
[Heroku's handling of Procfile](https://devcenter.heroku.com/articles/procfile) 
by using a single AMI that can dynamically be assigned one of the processes
defined in the `Procfile`.

### Launch a new instance
Launch a new EC2 Instance and make sure you have AMI Role set to: `CodeDeployProfile`.

### Install Ruby and Bundler
Install Rbenv and your chosen Ruby version:
    
    sudo apt-get update
    sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev
    cd
    git clone git://github.com/sstephenson/rbenv.git .rbenv
    echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
    echo 'eval "$(rbenv init -)"' >> ~/.bashrc
    exec $SHELL
    git clone git://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build
    echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
    exec $SHELL
    git clone https://github.com/sstephenson/rbenv-gem-rehash.git ~/.rbenv/plugins/rbenv-gem-rehash
    rbenv install 2.2.3
    rbenv global 2.2.3
    ruby -v
    
Reference: [GoRails](https://gorails.com/setup/ubuntu/14.04)

### Install CodeDeploy Agent
To install the agent, run the following commands:

    ssh -i {PEM_FILE_PATH} ubuntu@INSTANCE_IP_OR_DNS_NAME
    sudo apt-get update
    sudo apt-get install awscli
    sudo apt-get install ruby2.0
    cd /home/ubuntu
    # Replace us-east-1 with your VPC region.
    sudo aws s3 cp s3://aws-codedeploy-us-east-1/latest/install . --region us-east-1
    sudo chmod +x ./install
    sudo ./install auto

If you get an error on `aws s3` command, then you either didn't launch the EC2 
instance with the role we created in IAM section or you didn't
follow the steps correctly.

Reference: [AWS CodeDeploy](http://docs.aws.amazon.com/codedeploy/latest/userguide/how-to-run-agent.html)

### Create Upstart script
We need to have our application process start automatically on machine start.
In order to get this to work, we will be using Ubuntu's Upstart.

The following script uses `Foreman` to run the correspondant process defined 
in the `Procfile`.
Make sure you install `Foreman` gem by running the command:
    
    gem install foreman

Then, proceed to creating the Upstart script.

    sudo cat > /etc/init/app.conf << EOS
    respawn
    start on (local-filesystems and net-device-up IFACE!=lo)
    stop on [!12345]
    setuid ubuntu
    script
    set -e
    chdir /app/current
    export PATH=/home/ubuntu/.rbenv/bin:/home/ubuntu/.rbenv/shims:$PATH
    export RAILS_ENV=production
    export PORT=3000
    export PROCESS=$(cat /app/role)
    echo " * Starting process: $PROCESS..."
    foreman start $PROCESS
    end script
    EOS
