#!/bin/sh

while getopts "U:P:E:R:S:" flag
    do
             case "${flag}" in
                    U) USERNAME=${OPTARG};;
                    P) PASSWORD=${OPTARG};;
                    E) EMAIL=${OPTARG};;
                    R) REGISTRY=${OPTARG};;
                    S) SCOPES=${OPTARG};;
             esac
    done
echo "USERNAME: $USERNAME";
echo "EMAIL: $EMAIL";
echo "REGISTRY: $REGISTRY";
echo "SCOPES: $SCOPE";

scopeList=$(echo $SCOPES | tr "," "\n")

for scope in $scopeList
do
    echo "scope: $scope";
    npm-cli-adduser -u $USERNAME -p $PASSWORD -e $EMAIL -r $REGISTRY -s $scope
    npm-cli-login -u $USERNAME -p $PASSWORD -e $EMAIL -r $REGISTRY -s $scope
done
