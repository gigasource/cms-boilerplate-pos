# Intermediate container, this will be disposed in the final image
FROM node:10 as intermediate
ARG CONFIG_FILE_NAME
WORKDIR /home/gigasource
RUN mkdir -p /home/gigasource/storage
COPY . .
# Set access token to access private github repositories then start building
RUN mv ./ssh ~/.ssh && \
    chmod -R 700 ~/.ssh && \
    npm install --unsafe-perm && \
    mv ./cms-configs/$CONFIG_FILE_NAME ./config/config.json && \
    npm run install-plugins && \
    npm run build
RUN apt update && \
    apt install zip -y && \
    cd pkg && \
    npm install && \
    npm run build:win32 && \
    cd ../electron && \
    npm install && \
    npm run dist:win32 && \
    cd ..
RUN GIGASOURCE_ACCESS_TOKEN=${cat ./gigasource-access-token} && \
    ./cicd/scripts/upload-github-release-asset.sh github_api_token=$GIGASOURCE_ACCESS_TOKEN owner=gigasource repo=cms-boilerplate-pos tag=pos filename=./electron.zip

# Cleanup unused & sensitive files
WORKDIR /home/gigasource
RUN rm -rf ./backoffice && \
    rm -rf ./cms-configs && \
    rm -rf ~/.ssh
