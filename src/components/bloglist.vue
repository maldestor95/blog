<template>
    <v-container>
        <v-row>
            <v-col v-for="blogitem in bloglist" :key="blogitem.id">
                <v-card >
                <v-card-text>
                    <a href="" @click.prevent="$emit('input',blogitem.link)">
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
            }
        },
props: {
    bloglist: {
        type: Array,
        default:()=> [{
                    date: '2020-07-20',
                    titre: '1st blog',
                    link: '1/1st.md'
                }]
    },
},
    }
</script>

<style lang="scss" scoped>

</style>