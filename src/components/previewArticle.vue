<template>
    <v-card min-width="300px" max-height="200px" class="card" @click.prevent="$emit('input',blog.link)">
        <v-card-title >
            {{blog.titre}}
        </v-card-title>
        <span class="dateArticle">{{blog.date}}</span>
        <div  class="firstLines">
            <div v-html="firstLines" />
        </div>
        <p class="continueReading primary white--text">Continue reading </p>
    </v-card>
</template>

<script>
import marked from "marked"
    export default {
    props: {
        blog: {
            type: Object,
            default:()=>{
                return {
                title:"Nice Title encourage the reader to look further",
                firstLines: "Provinding a meaningful introduction to explain the objective of the article",
                date:"27-07-2020",
                link:""
                }
            }
        }
    },  
    data() {
        return {
            firstLines: "first lines of the article"
        }
    }, 
    mounted () {
        this.getFirstLines(this.blog.link);
    },
    methods: {
        getFirstLines(link) {
            let _this=this
             const myInit = { method: 'GET',
               mode: 'cors',
               cache: 'default' };
                const fpath = `${process.env.VUE_APP_ENV_S3server}/${link}`
                fetch(fpath,myInit)
                .then((response)=>{
                    return response.text()
                    }
                ).then(response=>{
                    // console.log(response)
                    _this.firstLines=marked(response)
                    return response
                })
                .catch((err)=>{return err})
            }
        }
    }
</script>

<style lang="scss" scoped>
.dateArticle {
    color: gray;
    font-size: small;
    font-style: italic;
    position: absolute;
    top: 40px;
    left: 50px
}
.firstLines  {
    font-size: small;
    max-width: 90%;
    margin:auto;
}
.card {
    overflow: hidden;
}
.continueReading {
    position: absolute;
    padding: 5px 0px 5px 0px;
    font-size: small;
    bottom:-17px;
    width: 100%;
    text-align: center;
}
</style>