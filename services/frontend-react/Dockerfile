# Build stage
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Production stage
FROM node:18
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build

CMD ["serve", "-s", "build", "-l", "3000"]
