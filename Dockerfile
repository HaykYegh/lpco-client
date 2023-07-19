ARG NODE_IMAGE=dockerhub.webbfontaine.am/node:18-alpine
ARG NGINX_IMAGE=dockerhub.webbfontaine.am/nginx-static
FROM ${NODE_IMAGE} AS builder

RUN apk add --no-cache git

WORKDIR /app

ARG NEXUS_USER=developer
ARG NEXUS_PASS
ARG NEXUS_EMAIL=hayk.yeghiazaryan@webbfontaine.com
ARG NEXUS_REGISTRY=https://repo.webbfontaine.com/nexus/repository/wf-npm-all/
ARG NEXUS_SCOPE=@wf,@cwb,@pl

ENV IS_CI=true

RUN yarn global add npm-cli-login
RUN yarn global add npm-cli-adduser

COPY ./wf-registry-login.sh .
RUN chmod +x ./wf-registry-login.sh
RUN ./wf-registry-login.sh -U ${NEXUS_USER} -P ${NEXUS_PASS} -E ${NEXUS_EMAIL} -R ${NEXUS_REGISTRY} -S ${NEXUS_SCOPE}

# Install dependencies and cache the layer until dependencies are changes
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install

# Copy source code
COPY ./ ./

RUN yarn build

# Serve static files in the Nginx
FROM ${NGINX_IMAGE}

COPY --from=builder /app/dist/ /usr/share/nginx/html

RUN echo $(ls -1 /usr/share/nginx/html)
