<template>
    <el-container id="rootContainer">
        <el-header height="50px">Header<fa-icon icon="skype"></fa-icon></el-header>
        <el-container>
            <!--<el-aside id="rootSide" :width="rootSideWidth" @mouseenter="mouseEnterRootSide" @click="mouseEnterRootSide">
                <fa-icon v-if="unfoldRootSideMenu" id="rootSideAngleRight" icon="angle-right" size="4x"
                         transform="shrink-6" style="color: green;"/>
                <div v-else>否则显示菜单组件</div>
            </el-aside>-->
            <el-main>
                <fa-icon :icon="['fas', 'square']"/>
                <br/>
                <fa-icon icon="clipboard-list" :transform="{ rotate: 42 }"/>
                <br/>
                <fa-layers class="fa-lg">
                    <fa-icon :icon="['far', 'circle']" style="color: green;"/>
                </fa-layers>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "index",
        data: function () {
            return {
                unfoldRootSideMenu: true,
                rootSideWidth: '40px'
            }
        },
        methods: {
            mouseEnterRootSide: function (e) {
                console.log(e)
                unfoldRootSideMenu = false
                rootSideWidth = '140px'
            }
        }
    }
</script>

<style scoped>
    #rootContainer {
        height: 100%;
    }

    #rootSide {
        display: flex; /*Flex布局*/
        display: -webkit-flex; /* Safari */
        align-items: center; /*指定垂直居中*/
        text-align: center;
    }

    #rootSideAngleRight {
        margin-left: auto;
        margin-right: auto;
    }

    .el-header {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 50px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #1f21b7;
        text-align: center;
    }
</style>
