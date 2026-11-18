FROM node:26-slim AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@12.21.0

# Copy only the necessary files for installing dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY api/package.json api/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the api/ code
COPY api/ api/

# Build the application
RUN pnpm --filter api build

# Final stage
FROM node:26-slim AS final
WORKDIR /app
ENV NODE_ENV=production

# Install pnpm
RUN npm install -g pnpm@12.21.0

# Copy only the necessary files for installing production dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY api/package.json api/
RUN pnpm install --frozen-lockfile --prod --filter api

# Copy built files from the builder stage
COPY --from=builder /app/api/dist api/dist

# Run as non-root user
USER node
WORKDIR /app/api
EXPOSE 3000

# Start the application
CMD ["node", "dist/server.js"]