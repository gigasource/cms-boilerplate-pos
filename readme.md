### Usage:
CMS plugin initialization guide
1. Init new private git repository and create a configuration file. Config file template can be clone at https://github.com/gigasource/cms-configs
2. Commit and push created config file in step 1 to https://github.com/gigasource/cms-configs repository at branch master
3. Clone cms-boilerplate repository at https://github.com/gigasource/cms-boilerplate
4. Cd to cms-boilerplate folder. Run npm i
5. Copy and rename config file in cms-boilerplate/cms-configs/{your-config-file.json} then paste to cms-boilerplate/config/config.json
6. Run frontend: npm run frontend
7. Run backend: npm run backend
8. NOTE: ACCESS localhost:8888 to test, debug, develop instead of localhost:8080
