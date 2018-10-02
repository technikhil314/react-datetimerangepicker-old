cd $TRAVIS_BUILD_DIR/dist
echo '//registry.npmjs.org/:_authToken='$NPM_TOKEN > $HOME/.npmrc
npm publish