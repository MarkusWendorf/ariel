rm -rf ./dist

mkdir -p ./dist/node_modules
npx esbuild ./src/handler.ts --bundle --platform=node --target=node14 --outdir=./dist --external:ws --external:chrome-aws-lambda --external:pixelmatch

# External deps for playwright that cannot be bundled with esbuild
cp -r ./node_modules/ws ./dist/node_modules/ws
cp -r ./node_modules/pixelmatch ./dist/node_modules/pixelmatch
cp -r ./node_modules/pngjs ./dist/node_modules/pngjs

# Cannot be bundled because it contains the chrome binary
cp -r ./node_modules/chrome-aws-lambda ./dist/node_modules/chrome-aws-lambda
cp -r ./node_modules/lambdafs ./dist/node_modules/lambdafs

cd dist
zip -r dist.zip ./*