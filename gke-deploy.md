create cluster in gke
install gcloud cli: `brew install --cask google-cloud-sdk`
gcloud auth login
gcloud config set project
gcloud container clusters get-credentials node-server --region europe-west1 --project
kubectl apply -f db-service.yaml,web-service.yaml,db-deployment.yaml,db-data-persistentvolumeclaim.yaml,web-deployment.yaml,env-configmap.yaml
kubectl expose deployment web --type=LoadBalancer --name=test-web

kubectl set image deployment/web web=teamdha/nodeserver:latest
