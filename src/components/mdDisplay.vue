<template>
    <div>
<h1>fetch Doc</h1>
<v-btn color="info" @click="getMd('1st.md')">fetch</v-btn>
<div v-html="markdown"></div>

    </div>
</template>

<script>
import marked from 'marked'
    export default {
        data() {
            return {
                markdown: "markdown data"
            }
        },
        methods: {
            getMd(filePath) {
                console.log(process.env)
                const myInit = { method: 'GET',
               mode: 'cors',
               cache: 'default' };
                const fpath = `${process.env.VUE_APP_ENV_S3server}/${filePath}`
                console.log(`fpath: ${fpath}`)
                fetch(fpath,myInit)
                .then((response)=>{
                    return response.text()
                    }
                )
                .then(response=>{
                    console.log(response)
                    this.markdown=marked(response)
                })
                .catch((err)=>{this.markdown=err})
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>