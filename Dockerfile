FROM node:20-alpine
WORKDIR /app
COPY . .
# If there were dependencies, we would run npm install, 
# but server.js only uses built-in modules (http, https, path, fs)
# However, if there's a package.json, we should check it.
EXPOSE 6985
ENV HOST=0.0.0.0
ENV PORT=6985
CMD ["node", "server.js"]
