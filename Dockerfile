FROM node:24.13.0-bookworm-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm install -g npm@11.6.2
RUN node -v && npm -v
RUN npm ci --no-audit --no-fund || npm install --no-audit --no-fund

COPY . .
RUN npm run build -- --configuration production

FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/gerador-certificado/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
