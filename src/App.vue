<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <!-- <list-blogs :bloglist="bloglist" v-model="activeBlog"/> -->
      <v-container >
      <v-row>
        <v-col v-for="blog in bloglist" :key="blog.id">
          <preview-article :blog="blog" v-model="activeBlog"></preview-article>
        </v-col>
      </v-row>
      <md-display :blog="activeBlog"/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import mdDisplay from './components/mdDisplay'
// import listBlogs from './components/bloglist'
import previewArticle from './components/previewArticle'

export default {
  name: 'App',

  components: {
    mdDisplay, 
    // listBlogs,
     previewArticle
  },

  data: () => ({
    activeBlog:"initial",
    bloglist:[]
  }),
  mounted () {
            this.loadBlogList();
        },
  methods: {
    loadBlogList() {
                const myInit = { method: 'GET',
               mode: 'cors',
               cache: 'default' };
                const fpath = `${process.env.VUE_APP_ENV_S3server}/bloglist.json`
                fetch(fpath,myInit)
                .then((response)=>{
                    return response.text()
                    }
                )
                .then(response=>{
                    this.bloglist=JSON.parse(response)
                })
                .catch((err)=>{console.log(err)})
            }
  },
};
</script>
