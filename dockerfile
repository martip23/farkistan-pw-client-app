FROM node:alpine AS base
WORKDIR /app
EXPOSE 3000

FROM node as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV=production
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
COPY . ./
RUN npm run build

FROM base AS final
RUN npm install -g serve
COPY --from=build /app/build/ .

ENTRYPOINT ["serve", "-s"]
