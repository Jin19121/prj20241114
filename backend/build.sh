rm -rf src/main/resources/static

cd ../frontend
npm run build

mv dist ../backend/src/main/resources/static

cd ../backend

./gradlew bootjar

scp -i src/main/resources/secret/key1121.pem build/libs/backend-0.0.1-SNAPSHOT.jar ubuntu@43.201.70.26:22:./prj.jar
ssh -i src/main/resources/secret/key1121.pem ubuntu@43.201.70.26:22 './run.sh'