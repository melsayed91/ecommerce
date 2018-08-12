
# (cd american.app.BE/common  && docker build -t abz/abz-1/common:0.0.1 .)
# docker-compose -f docker-compose.yml build
echo "starting k8s pods.. please wait few seconds..."
kubectl create -f ./k8s/deployment.yml
sleep 3
 echo "exposing k8s services..."
 kubectl create -f ./k8s/service.yml
read