<template>
    <div>
        <template v-if="detail">
            <div class="detail-header">
                <span class="topic_full_title">
                    <!--<span class="put_top" v-if="detail.top">置顶</span>-->
                    <h3>{{detail.title}}</h3>
                </span>
                <div class="changes">
                    <span>发布于 {{detail.create_at.slice(0,10)}}</span>
                    <span><a :href="`/user/${detail.author.loginname}`">@{{detail.author.loginname}}</a></span>
                </div>
                <div>
                    <span>{{detail.visit_count}} 次浏览</span>
                    <span>来自 {{detail.tab}}</span>
                </div>
            </div>
            <div v-html="detail.content"></div>
        </template>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {mapGetters, mapActions, mapState} from 'vuex'

    export default {

        name: 'detail-view',

        computed: {
            detail () {
                return this.$store.state.details[this.$route.params.id]
            }
        },

        activated () {
            return this.$store.dispatch('FETCH_DETAIL', {
                id: this.$route.params.id
            })
        },

        beforeRouteLeave (to, from, next) {
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
            sessionStorage.setItem('scrollTop', document.body.scrollTop)
            next()
        },

    }
</script>

<style>
    .img-wrap {
        position: relative;
        overflow: hidden;
    }

    .detail-title {
        margin: 20px 0;
        padding: 0px 40px;
        bottom: 10px;
        z-index: 1;
        position: absolute;
        color: white;
        font-size: 30px;
        text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: 800px) {
        .detail-title {
            font-size: 18px;
            padding: 0 15px;
        }
    }

    .img-wrap .img-source {
        position: absolute;
        bottom: 10px;
        z-index: 1;
        font-size: 12px;
        color: rgba(255, 255, 255, .6);
        right: 40px;
        text-shadow: 0px 1px 2px rgba(0, 0, 0, .3);
    }

    .img-mask {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background: -moz-linear-gradient(top, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0.6) 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(25%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0.6)));
        background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0.6) 100%);
        background: -o-linear-gradient(top, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0.6) 100%);
        background: -ms-linear-gradient(top, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0.6) 100%);
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0.6) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#99000000', GradientType=0);
    }

    .detail-image {
        width: 100%;
    }

</style>
