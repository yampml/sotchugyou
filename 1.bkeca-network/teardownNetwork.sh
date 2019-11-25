# Stop & delete all docker containers & volumes
docker-compose -f docker-compose-cli.yaml -f docker-compose-ca.yaml down --volumes

# Stop others docker container
docker rm $(docker ps -aq)

docker rmi $(docker images -f "reference=dev-*" -q)
