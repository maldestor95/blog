<template>
    <v-container>
        <v-row>
            <v-col v-for="blogitem in bloglist" :key="blogitem.id">
                <v-card >
                <v-card-text>
                    <a href="" @click.prevent="$emit('changeBlog',blogitem.link)">
                        {{blogitem.titre}}
                    </a>
                    <p>{{blogitem.date}}</p>
                </v-card-text>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                bloglist: [{
                    date: '2020-07-20',
                    titre: '1st blog',
                    link: '1/1st.md'
                }]

            }
        },
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
    }
</script>

<style lang="scss" scoped>

</style>