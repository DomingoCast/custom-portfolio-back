create cluster in gke
install gcloud cli: `brew install --cask google-cloud-sdk`
login to google cloud: `gcloud auth login`
set current project: `gcloud config set project`
create and set kubernetes context to gclud cluster: `gcloud container clusters get-credentials node-server --region europe-west1 --project`
create pods and services: `kubectl apply -f db-service.yaml,web-service.yaml,db-deployment.yaml,db-data-persistentvolumeclaim.yaml,web-deployment.yaml,env-configmap.yaml`
expose with loadbalencer the web service: `kubectl expose deployment web --type=LoadBalancer --name=test-web`

permit kubctl to access private image:
`kubectl create secret generic regcred --from-file=.dockerconfigjson=<path to .docker/config.json> --type=kubernetes.io/dockerconfigjson`

change version of image of container: `kubectl set image deployment/web web=teamdha/nodeserver:<image version>`
