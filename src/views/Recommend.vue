<template>
    <div>
        <rotation></rotation>
        <firstbody></firstbody>
    </div>
</template>

<script scope>
    import rotation from "../components/Rotation.vue"
    import firstbody from "../components/Firstbody.vue"
    export default{
        name:'recommend',
        data(){
            return {

            }
        },
        components:{
            rotation,
            firstbody
        },
        methods: {
            
        },
    }
</script>
<style>

</style>