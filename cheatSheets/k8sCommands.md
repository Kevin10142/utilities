# k8s common commands

### install kubectl
check official downlaod doc

### set token
```
kubectl login
```

### list pods
```
kubectl config get-contexts
```

### use context
```
kubectl config use-context {your context}
```

### get pods
```
kubectl get pods -n {your namespace}
```

### login to pod
```
kubectl exec -it {podName} -c {appName} -n {namespace} -- bash
```
