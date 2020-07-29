# Blog

## Project setup
```
npm install
```

Create a `.env.local` file at the root of the directory that will contain 
```
VUE_APP_ENV_S3server=$$$ADRESS_OF_THE_PRODUCTION_SERVER$$$

where $$$ADRESS_OF_THE_PRODUCTION_SERVER$$$ will point to the location of the bloglist.json file and all of the .md files (blog post)
```

### Compiles and hot-reloads for development
To run the developement 
```
npm run serve
```

Run the development server that emulate the static website where the files will be hosted.

> :warning: **the development server** will allow full [CORS](https://developer.mozilla.org/fr/docs/Web/HTTP/CORS) support  

```
npm run devserver
```

### Compiles and minifies for production
```
npm run build
```
To functionaly check the build perform `npm run testbuild`
> :warning this "content" of the blog will now point to $$$ADRESS_OF_THE_PRODUCTION_SERVER$$$ that were set up in the `.env.local` file

### Run your tests
Note: no formal testing has been implemented
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
