<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img src='./assets/LD2.png' class="logo" />
      </div>

      <v-spacer></v-spacer>
      <v-text-field v-model="searchPost"></v-text-field>
      <v-icon>mdi-magnify</v-icon>
    </v-app-bar>

    <v-main>
      <!-- <list-blogs :bloglist="bloglist" v-model="activeBlog"/> -->
      <v-container >
      <v-row>
        <v-col v-for="blog in bloglist" :key="blog.id">
          <preview-article :blog="blog" v-model="activeBlog"></preview-article>
        </v-col>
      </v-row>
      <!-- <div v-if="activeBlog!=''"> -->
        <div>
        <md-display  :blog="activeBlog" :header="blogTitle(activeBlog)"/>
      </div>
      </v-container>
    </v-main>

    <v-footer class="primary white--text">
      <a href="http://ludovicdeparis.fr"><v-icon class="white--text">mdi-web</v-icon></a>
      <a href="https://www.linkedin.com/in/ldeparis/"><v-icon class="white--text">mdi-linkedin</v-icon></a>

      <v-spacer></v-spacer>
      <v-icon class="white--text">mdi-copyright</v-icon> 
      {{new Date().getFullYear()}}
      <v-spacer></v-spacer>
      L.Deparis
    </v-footer>
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
    activeBlog:"",
    bloglist:[],
    searchPost:""
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
            },
    blogTitle(link){
      const blogInfo= this.bloglist.filter(blog=>blog.link==link)
      return blogInfo.length==0?"":blogInfo[0].titre
    }
  },
};
</script>
<style scoped>
a { text-decoration: none; }
.logo {
  max-width: 50px;
  height:auto;
}
</style>
