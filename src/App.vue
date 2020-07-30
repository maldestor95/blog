<template>
  <v-app>

    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img src='./assets/LD2.png' class="logo" />
      </div>

      <v-spacer></v-spacer>
      <v-icon @click="changeSortBlogOrder()">
        {{sortBlogOrder?'mdi-sort-calendar-ascending':'mdi-sort-calendar-descending'}}
      </v-icon>
      <v-chip class="primary darken-1">
        {{numberOfFilteredBlogs}}
        /
        {{numberOfBlogs}}
      </v-chip>
      <v-text-field v-model="searchPost" clearable></v-text-field>
      <v-icon>mdi-magnify</v-icon>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <!-- <p> displayblog{{displayblog}} </p>
        <p>displayPreview{{displayPreview}} </p>
        <p>**{{JSON.stringify(searchPost)}}**</p> -->
        <v-row v-if="displayPreview">
          <v-col v-for="blog in filteredBlogList" :key="blog.id">
            <preview-article :blog="blog" v-model="activeBlog" @blogChosen="displayPreview=false" @change="searchPost=null"></preview-article>
          </v-col>
        </v-row>
        <!-- <div class="line"/> -->
        <v-row >
          <v-col v-if="!displayPreview" cols="3">
            <v-list dense flat >
              <!-- <v-list-item-group v-model="listItem"> -->
              <v-list-item v-for="blog in bloglist" :key="blog.id" @click="showBlog(blog.link)" class="vlist " :class="{selected : isCurrentBlog(blog.link)}" >
                <v-list-item-content>
                  <v-list-item-title v-text="blog.titre"></v-list-item-title>
                  <v-list-item-subtitle v-text="blog.date"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <!-- </v-list-item-group> -->
            </v-list>
          </v-col>
          <v-col >
            <md-display :blog="activeBlog" :header="blogTitle(activeBlog)" />
            {{activeBlog}}
          </v-col >
        </v-row>
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
      searchPost: null,
      sortBlogOrder:true,
      displayblog: false,
      displayPreview:true,
      listItem:1,
    }),
    mounted() {
      this.loadBlogList();
    },
    watch: {
      searchPost(newValue) {
        // this.displayblog=newValue!=null ? false : true
        this.displayPreview = newValue!=(null|'') ?  true : false
      }
    },
    methods: {
      showBlog(changeBlog){
        this.activeBlog=changeBlog
      },
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
      changeSortBlogOrder(){
        this.sortBlogOrder = !this.sortBlogOrder; 
        this.sortBlogListByDate(this.sortBlogOrder)
      },
      blogTitle(link) {
        const blogInfo = this.bloglist.filter(blog => blog.link == link)
        return blogInfo.length == 0 ? "" : blogInfo[0].titre
      },
      isCurrentBlog(blogLink){
        console.log(blogLink,this.activeBlog)
        return blogLink==this.activeBlog
      }
    },
    computed: {
      filteredBlogList() {
        if (this.searchPost==null){return this.bloglist}

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
  .line {
    border: green solid 1px;
  }
  .vlist:hover {
    background-color: var(--v-primary-lighten2);
    border-radius: 20px;
  }
  .selected {
    background-color: var(--v-primary-lighten3);
    color: red !important;
    border-radius: 20px;
  }
</style>