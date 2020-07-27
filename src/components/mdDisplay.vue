<template>
    <v-container >
        <div v-html="markdown"></div>
    </v-container>
</template>

<script>
import marked from 'marked'
    export default {
        props: {
            blog: {
                type: String,
                default: "none"
            },
        },
        data() {
            return {
                markdown: ""
            }
        },
        watch: {
            blog(newValue) {
                this.getMd(newValue)
            }
        },
        methods: {
            getMd(filePath) {
                const myInit = { method: 'GET',
               mode: 'cors',
               cache: 'default' };
                const fpath = `${process.env.VUE_APP_ENV_S3server}/${filePath}`
                fetch(fpath,myInit)
                .then((response)=>{
                    return response.text()
                    }
                )
                .then(response=>{
                    this.markdown=marked(response)
                })
                .catch((err)=>{this.markdown=err})
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>