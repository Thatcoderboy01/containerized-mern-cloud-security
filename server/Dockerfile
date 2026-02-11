FROM node:20-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

# install only production deps
RUN npm install --omit=dev

COPY . .

# security: non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 5000

HEALTHCHECK CMD wget -qO- http://localhost:5000 || exit 1

CMD ["node", "index.js"]
