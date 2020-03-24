<template>
    <div>
        测试页面
    </div>
</template>

<script>
    import {getRequest, postRequest} from "../utils/http";

    export default {
        name: "test",
        mounted() {
            getRequest("/api/users").then(res => {
                console.log(res);
            }).catch(err => {

            })
            // postRequest("api/test", {username: "123123", password: 123123}).then(res => {
            //     console.log(res)
            // })
        }
    }
</script>

<style scoped>

</style>