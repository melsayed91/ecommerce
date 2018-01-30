## Shared models between all services

_.json_ file : model properties
_.js_ file : model business logic (Remote methods / after, before hooks ...)


**Steps to add a new model**
1/ Add The model files in the common folder: _shared-<myNewModelName>.json_ and _shared-<myNewModelName>.js_
2/ Create your model inside the service **server/models** folder : _<myNewModelName>.json_ and _<myNewModelName>.js_
3/ Make shared-<myNewModelName> as base model of your model e.g: 
Check the _sysUser.json_ file :  `"base": "sharedUser"`
>4/ In **server/model-config.json** Expose local model and hide the shared model e.g:  
```
 "sysUser": {
    "dataSource": "americanBizDB",
    "public": true
  },
  "sharedUser": {
    "dataSource": "americanBizDB",
    "public": false
  }
```

Now you can add any business logic to the **.js** file that's specific 