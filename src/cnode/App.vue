<template>
    <div id="app">
        <header class="header">
            <nav class="inner top">
                <router-link to="/">
                    <img src="./assets/cnodejs_light.svg" alt="logo" class="site-logo">
                </router-link>
                <a href="https://github.com/qieguo2016/vue-demos" target="_blank" class="github">
                    Built with Vue.js 2.0
                </a>
            </nav>
            <nav class="inner sub">
                <router-link to="/all">首页</router-link>
                <router-link to="/good">精华</router-link>
                <router-link to="/share">分享</router-link>
                <router-link to="/ask">问答</router-link>
                <router-link to="/job">招聘</router-link>
            </nav>
        </header>
        <transition
            name="slide"
            :enter-active-class="enterActiveClass"
        >
            <keep-alive>
                <router-view class="view"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
    import config from '../../config'

    export default {
        data () {
            return {
                enterActiveClass: 'animated fadeInRight',
                publicPath: config.publicPath,   // '/zhihudaily/'
            }
        },
        watch: {
            '$route' (to, from) {
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length
                if (toDepth > fromDepth) {
                    this.enterActiveClass = 'animated fadeInRight'
                } else {
                    this.enterActiveClass = 'animated fadeInLeft'
                }
            }
        }
    }
</script>

<style>

    @import "assets/index.css";

    body {
        font-family: "Lucida Grande",
        "Helvetica Neue",
        Helvetica, Arial,
        "Hiragino Sans GB",
        "Hiragino Sans GB W3",
        "WenQuanYi Micro Hei",
        "Microsoft YaHei UI",
        "Microsoft YaHei",
        sans-serif;
        -webkit-font-smoothing: antialiased;
    }

    .header {
        position: fixed;
        top: 0;
        left: 0;
        box-sizing: border-box;
        height: 80px;
        width: 100%;
        z-index: 100;
    }

    .inner,
    .view {
        max-width: 800px;
        margin: auto;
    }

    .inner {
        box-sizing: border-box;
        height: 40px;
        padding: 5px 10px;
    }

    .inner.top {
        background-color: #444;
    }

    .inner.sub {
        background-color: #eeeeee;
        border-bottom: 1px solid #aaa;
        height: 40px;
        padding: 5px 10px;
    }

    .site-logo {
        height: 30px;
    }

    .inner > a {
        display: inline-block;
        color: #fff;
        vertical-align: middle;
        padding-right: 6px;
        font-size: 16px;
        line-height: 30px;
        font-weight: bold;
    }

    .sub > a {
        color: #42b983;
        padding: 0 10px;
    }

    .sub .router-link-active {
        background-color: #42b983;
        border-radius: 5px;
        color: #fff;
    }

    .inner > a:hover,
    .inner > a:focus {
        text-decoration: none;
        outline: none;
    }

    .github {
        float: right;
        padding: 0;
        margin-top: 9px;
    }

    .view {
        padding: 80px 10px 10px;
    }
</style>
