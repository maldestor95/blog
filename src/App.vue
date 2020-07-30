<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img src='./assets/LD2.png' class="logo" />
      </div>

      <v-spacer></v-spacer>
      {{numberOfFilteredBlogs}}
      /
      {{numberOfBlogs}}
      <v-text-field v-model="searchPost"></v-text-field>
      <v-icon>mdi-magnify</v-icon>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col v-for="blog in filteredBlogList" :key="blog.id">
            <preview-article :blog="blog" v-model="activeBlog"></preview-article>
          </v-col>
        </v-row>
        <div>
          <md-display :blog="activeBlog" :header="blogTitle(activeBlog)" />
        </div>
      </v-container>
    </v-main>

    <v-footer class="primary white--text">
      <a href="http://ludovicdeparis.fr">
        <v-icon class="white--text">mdi-web</v-icon>
      </a>
      <a href="https://www.linkedin.com/in/ldeparis/">
        <v-icon class="white--text">mdi-linkedin</v-icon>
      </a>

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
  import previewArticle from './components/previewArticle'

  export default {
    name: 'App',

    components: {
      mdDisplay,
      previewArticle
    },

    data: () => ({
      activeBlog: "",
      bloglist: [],
      searchPost: ""
    }),
    mounted() {
      this.loadBlogList();
    },
    methods: {
      loadBlogList() {
        const myInit = {
          method: 'GET',
          mode: 'cors',
          cache: 'default'
        };
        const fpath = `${process.env.VUE_APP_ENV_S3server}/bloglist.json`
        fetch(fpath, myInit)
          .then((response) => {
            return response.text()
          })
          .then(response => {
            this.bloglist = JSON.parse(response)
            this.sortBlogListByDate()
          })
          .catch((err) => {
            console.log(err)
          })
      },
      /** Sort Blog List by Date 
      * @param {boolean} reverse - if true the bloglist will be show the oldest blog first 
      */
      sortBlogListByDate(reverse=false) {
        try {
          this.bloglist.map(blog => {
            blog.sortDate = blog.date.split('-')
            blog.sortDate = new Date(`${blog.sortDate[2]}-${blog.sortDate[1]}-${blog.sortDate[0]}`)
          })
          this.bloglist.sort((a,b)=>{
            return !reverse? b.sortDate-a.sortDate : a.sortDate-b.sortDate })
        } catch (error) {
          console.log(`Error; a date in the blog might not be in the right format ${error}`)
        }
      },
      blogTitle(link) {
        const blogInfo = this.bloglist.filter(blog => blog.link == link)
        return blogInfo.length == 0 ? "" : blogInfo[0].titre
      }
    },
    computed: {
      filteredBlogList() {
        const filterWord = this.searchPost.split(' ')
        const titleList = this.bloglist.filter(blog => {
          const isWordPresent = (currentWord) => blog.titre.toUpperCase().includes(currentWord.toUpperCase())
          return filterWord.every(isWordPresent)
        })
        return titleList
      },
      numberOfFilteredBlogs() {
        return this.filteredBlogList.length
      },
      numberOfBlogs() {
        return this.bloglist.length
      },
    },
  };
</script>
<style scoped>
  a {
    text-decoration: none;
  }

  .logo {
    max-width: 50px;
    height: auto;
  }
</style>