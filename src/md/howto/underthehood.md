What were the constraints about that blog and which architecture did I choose to use?

But first, why this blog project? As I've been working on quite some various projects, i found out that I forget details and unfortunately spend too much time looking for answers again. I could of course used existing blog or CMS to achieve that need but I wanted to dig further and see how to implement one.


## Design constraints

I didn't want to make it too fancy with a backend; it will probably be something I will do later on. So there it is:

* Static Website
* rendering of easy editing files 
* dynamic experience
* easy development
* no [Cross-origin resource sharing (CORS)](https://developer.mozilla.org/fr/docs/Web/HTTP/CORS)


## Architecture

To achieve the project, I decided to host a static website on an amazon S3 bucket and to route the blog to the subdomain blog.ludovicdeparis.fr using route 53. Of course, this can be done on any other server
* [Hosting a static website on Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)
* [Configuring a static website using a custom domain registered with Route 53](https://docs.aws.amazon.com/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html)

Blog post are written in Markdown as it a well known and robust standard.

For the dynamic rendering, I designed a Single Page Application(SPA) with Vuejs. Using http method, i was able to fetch a `bloglist.json` file that contain all the references to all the blogs. Once the `bloglist.json`, the SPA is fetching all the blog articles when they need to be displayed, transforming the markdown file in html format with the [marked library](https://www.npmjs.com/package/marked)

Finally, during development, I didn't want to push every item to the S3 bucket but do everything locally. I therefore just need to emulate a static server with [expressjs](https://expressjs.com/fr/) and to use a [`cors` package](https://www.npmjs.com/package/cors). The need for the `CORS` is basically because the expressjs server is not located at the same location as the VueJS development server.
To differentiate production environment from development, I also decided to use the [Modes and Environment Variables](https://cli.vuejs.org/guide/mode-and-env.html) feature.


