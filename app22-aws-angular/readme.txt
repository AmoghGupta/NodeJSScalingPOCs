https://indepth.dev/posts/1231/automate-angular-application-deployment-via-aws-codepipeline-2

client code ===> github ==>> aws code pipeline ==> picks code from github and deploys to aws s3.

now we have the s3 urls for these dist folder files i.e the bundled JS files.. 


server code==> renders index.html where these s3 urls are used in scripts.

since you are pointing the UI bundles from a server i.e from a different domain. you need to go to s3 settings and allow the domain to access 
the bundles to prevent CORS error.

