cd $TRAVIS_BUILD_DIR/dist
npm config set '//registry.npmjs.org/:_authToken=$NPM_TOKEN'
npm publish