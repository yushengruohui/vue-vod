<template>
    <div id="app">
        <router-view v-if="isRouterAlive"/>
    </div>
</template>
<script>
    export default {
        name: "app",
        provide() {
            return {
                reload: this.reload
            }
        },
        created() {
            //在页面加载时读取sessionStorage里的状态信息
            if (sessionStorage.getItem("store")) {
                this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
            }

            //在页面刷新时将vuex里的信息保存到sessionStorage里
            window.addEventListener("beforeunload", () => {
                sessionStorage.setItem("store", JSON.stringify(this.$store.state))
            })

            // 打开页面时，验证账号是否还是登陆状态，不是的话，从token中读取数据。
            // if (!this.$store.getters.loginStatus && window.localStorage.getItem('token')) {
            //     window.localStorage.removeItem('token')
            // }
        },
        data() {
            return {
                isRouterAlive: true
            }
        },
        methods: {
            reload() {
                this.isRouterAlive = false;
                this.$nextTick(() => {
                    this.isRouterAlive = true
                })
            }
        }
    }
</script>
