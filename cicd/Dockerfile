FROM node:10 as intermediate
WORKDIR /home/giga-office
RUN mkdir -p /home/giga-office/storage
COPY package*.json ./
RUN npm install
COPY . .
WORKDIR /home/giga-office/backoffice
RUN npm install
RUN npm run build
WORKDIR /home/giga-office
RUN rm -rf ./backoffice
RUN rm -rf ./cms-configs

FROM node:10
WORKDIR /home/giga-office
RUN apt update
RUN apt install cabextract -y
RUN apt install xfonts-utils -y
RUN wget http://ftp.de.debian.org/debian/pool/contrib/m/msttcorefonts/ttf-mscorefonts-installer_3.6_all.deb
RUN dpkg -i ttf-mscorefonts-installer_3.6_all.deb
COPY --from=intermediate /home/giga-office /home/giga-office
EXPOSE 8888
ENTRYPOINT ["/bin/sh", "./cicd/scripts/container-startup-script.sh"]
