FROM node:20-alpine

# Enable corepack and install pnpm globally
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN pnpm install --frozen-lockfile

COPY . .


RUN pnpm run build

EXPOSE 4173
CMD ["pnpm", "preview", "--host"]
