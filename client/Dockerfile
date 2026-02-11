# -------- Stage 1: Build React --------
FROM node:20-alpine AS build

# prevent JS heap OOM
ENV NODE_OPTIONS=--max-old-space-size=1024

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


# -------- Stage 2: Serve with nginx --------
FROM nginx:alpine

# remove default config
RUN rm /etc/nginx/conf.d/default.conf

# custom nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# copy build from previous stage
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
