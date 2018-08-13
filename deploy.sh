

DOCKER_REGISTRY_SERVER=docker.io
DOCKER_USER=melsayedalaa
DOCKER_EMAIL=m.elsayed.alaa@gmail.com
DOCKER_PASSWORD=Password@4

kubectl --namespace=okc create secret docker-registry myregistrykey \
  --docker-server=$DOCKER_REGISTRY_SERVER \
  --docker-username=$DOCKER_USER \
  --docker-password=$DOCKER_PASSWORD \
  --docker-email=$DOCKER_EMAIL






# (cd american.app.BE/common  && docker build -t abz/abz-1/common:0.0.1 .)
# docker-compose -f docker-compose.yml build
# echo "starting k8s pods.. please wait few seconds..."
# kubectl create -f ./k8s/secret.yml
kubectl create -f ./k8s/deployment.yml
# sleep 3
#  echo "exposing k8s services..."
kubectl create -f ./k8s/service.yml
read