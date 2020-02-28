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
# Cleanup unused & sensitive files
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
