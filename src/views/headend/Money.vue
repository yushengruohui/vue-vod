<template>
    <el-container>
        <el-header>
            <Header></Header>
        </el-header>
        <el-main>
            <div style="height: 520px">
                <el-row type="flex">
                    充值20元，就可以成永久的会员，感谢你对开发者的支持。
                </el-row>
                <el-row>
                    <el-button type="primary" @click.native.prevent="changeRole()">确定充值</el-button>
                </el-row>
            </div>
        </el-main>
        <el-footer>
            <Foot></Foot>
        </el-footer>
    </el-container>
</template>

<script>
    import Header from '@/components/headend/Header.vue'
    import Foot from '@/components/headend/Foot.vue'
    import {getRequest, putRequest} from "../../utils/http";
    import {Message} from "element-ui";

    export default {
        name: "Money",
        components: {
            Header,
            Foot
        },
        methods: {
            changeRole() {
                putRequest("/user/role", {
                    userId: this.$store.getters.userId,
                    roleId: 2
                }).then(res => {
                    getRequest("/auth/logout");
                    Message.info("充值成功，请重新登陆");
                    this.$store.dispatch('logout');
                    this.$router.replace("/login");
                });
            }
        }
    }
</script>

<style scoped>

</style>