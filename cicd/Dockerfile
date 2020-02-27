# Intermediate container, this will be disposed in the final image
FROM node:10 as intermediate
WORKDIR /home/gigasource
RUN mkdir -p /home/gigasource/storage
COPY . .
# Set access token to access private github repositories
RUN mv ./ssh ~/.ssh && \
    chmod -R 700 ~/.ssh && \
# Build, NODE_ENV is set to production to skip npm preinstall script
    NODE_ENV=production npm install --unsafe-perm && \
    npm run install-plugins
WORKDIR /home/gigasource/backoffice
RUN npm install && \
    npm run build
WORKDIR /home/gigasource
RUN rm -rf ./backoffice && \
    rm -rf ./cms-configs && \
    rm -rf ~/.ssh

# Final image will be built from this point
FROM node:10
WORKDIR /home/gigasource
# Install fonts
RUN apt update && \
    apt install cabextract -y && \
    apt install xfonts-utils -y && \
    wget http://ftp.de.debian.org/debian/pool/contrib/m/msttcorefonts/ttf-mscorefonts-installer_3.6_all.deb && \
    dpkg -i ttf-mscorefonts-installer_3.6_all.deb
# Copy files from intermediate container
COPY --from=intermediate /home/gigasource /home/gigasource
EXPOSE 8888
ENTRYPOINT ["/bin/sh", "./cicd/scripts/container-startup-script.sh"]
