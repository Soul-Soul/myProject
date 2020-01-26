<template>
    <div>
        <div id="nav">
            <router-link to="/home">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
        <!--导航条，li标签-->
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "dashboard"
    }
</script>

<style scoped>

</style>