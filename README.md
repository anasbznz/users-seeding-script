## Users Creation Script
- a script to create N users in different environments

# HOW TO USE

- clone it
- install proxy to by bypass cors error (npm i local-cors-proxy) and set it as shown below:

### dev environment: lcp --proxyUrl https://dev.faras.ae/
### prod environment: lcp --proxyUrl https://prod.faras.ae/

- add the token in index.js
- npm start