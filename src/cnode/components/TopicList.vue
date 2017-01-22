<template>
    <!--  帖子列表  -->
    <div class="list">
        <section v-for="item in displayedItems">
            <!--<div class="cell">-->
            <!--<a class="user_avatar pull-left" :href="`/user/${item.author.loginname}`">-->
            <!--<img :src="item.author.avatar_url" :title="item.author.loginname">-->
            <!--</a>-->
            <!--<span class="reply_count pull-left">-->
            <!--<span class="count_of_replies" title="回复数">{{item.reply_count}}</span>-->
            <!--<span class="count_of_visits" title="点击数">{{item.visit_count}}</span>-->
            <!--</span>-->
            <!--</div>-->
            <router-link
                :to="`/detail/${item.id}`"
                class="media"
            >{{item.title}}
            </router-link>
        </section>
    </div>
</template>

<script>

    import {mapActions, mapState} from 'vuex'
    import store from '../store'

    const throttle = (func, wait, options) => {
        let timer = null;
        return function () {
            if (!timer) {
                timer = setTimeout(()=> {
                    func && func();
                    timer = null;
                }, wait)
            }
        }
    }

    export default {

        name: 'topic-list',

        created () {
            this.scrollListener = throttle(e => {
                if (window.innerHeight + document.body.scrollTop + 150 >= document.body.offsetHeight) {
                    this.loadMore()
                    this.isLoading = true
                }
            }, 250)
        },

        props: {
            type: String,
            eventHandler: String,
        },

        data () {
            return {
                isLoading: false,
                // transition: 'slide-up',
            }
        },

        computed: {
            ...mapState({
                displayedItems: function (state) {
                    return state.lists[this.type]
                }
            }),
        },

        methods: {
            loadMore () {
                if (this.isLoading) {
                    return
                }
                this.$store.dispatch('FETCH_MORE', {type: this.type})
                    .then(() => {
                        this.isLoading = false
                    }, () => {
                        this.isLoading = false
                    })
            },
            addListener () {
                window.addEventListener('scroll', this.scrollListener)
            },
            removeListener () {
                window.removeEventListener('scroll', this.scrollListener)
            }
        },

        beforeMount () {
            if (!this.displayedItems.length) {
                store.dispatch('FETCH_LASTEST', {type: this.type})
                     .then(() => {
                         this.isLoading = false
                     }, () => {
                         this.isLoading = false
                     })
            }
        },

    }
</script>


<style>

    .list-title {
        padding-top: 8px;
        padding-bottom: 6px;
        color: #fff;
        font-size: 16px;
        background-color: #009dd7;
        text-align: center;
    }

    .media {
        display: flex;
        justify-content: space-between;
        padding: 15px;
        min-height: 40px;
        border-bottom: 1px solid #ddd;
    }

    .media:hover,
    .media:focus {
        transform: scale(1.01);
        text-decoration: none;
        outline: none;
    }

    .media-body {
        color: #444;
        font-size: 16px;
        text-decoration: none;
        padding-right: 10px;
    }

    .media:last-child {
        margin-bottom: 0;
    }

</style>
