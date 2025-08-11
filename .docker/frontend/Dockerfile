
FROM ubuntu:22.04


RUN apt-get update && apt-get install -y \
    curl \
    git \
    && apt-get clean

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs=20.11.0-1nodesource1


RUN node --version


RUN npm install -g npm@10.2.4
RUN npm install -g next typescript @types/node @types/react @types/react-dom

RUN npm --version

WORKDIR /app

COPY frontend/package*.json /app/

COPY frontend /app

COPY .docker/frontend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
EXPOSE 3001

CMD ["/entrypoint.sh"]