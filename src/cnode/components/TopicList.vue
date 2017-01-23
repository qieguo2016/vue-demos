<template>
    <div>
        <!--  帖子列表  -->
        <ul>
            <li v-for="item in displayedItems" class="list">
                <div class="li-left">
                    <router-link class="li-left-avatar" :to="`/user/${item.author.loginname}`">
                        <img :src="item.author.avatar_url" :title="item.author.loginname">
                    </router-link>
                </div>
                <router-link :to="`/detail/${item.id}`" class="li-body">
                    <h3 class="li-body-title">{{item.title}}</h3>
                    <div class="li-body-ext">
                        <div class="li-body-count">
                            <div class="meta-badge">
                                <img class="icon" src="../assets/icons/icon_visited.svg">
                                <span class="count">{{item.visit_count}}</span>
                            </div>
                            <div class="meta-badge">
                                <img class="icon" src="../assets/icons/icon_comment.svg">
                                <span class="count">{{item.reply_count}}</span>
                            </div>
                        </div>
                        <span class="li-body-time">{{item.last_reply_at | dateFromNow}}</span>
                    </div>
                </router-link>
            </li>
        </ul>
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

        watch: {
            eventHandler: function (val, oldVal) {
                switch (val) {
                    case 'activated':
                        window.addEventListener('scroll', this.scrollListener)
                        break;
                    case 'deactivated':
                        window.removeEventListener('scroll', this.scrollListener)
                        break;
                    default :
                        console.log('topic-list.eventHandler watch default: ', val);
                }
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

    .list {
        display: flex;
        padding: 12px 0 8px;
        justify-content: flex-start;
        align-items: flex-start;
        border-bottom: 1px solid #ddd;
    }

    .list:hover,
    .list:focus {
        transform: scale(1.01);
        text-decoration: none;
        outline: none;
    }

    .list:last-child {
        border-bottom: none;
    }

    .li-left {
        margin-right: 10px;
    }

    .li-left-avatar img {
        height: 40px;
        width: 40px;
    }

    .li-body {
        flex: 1 0 230px;
        margin-top: -4px;
        color: #444;
        text-decoration: none;
    }

    .li-body-title {
        font-size: 16px;
        font-weight: bold;
    }

    .li-body-ext {
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 5px;
    }

    .li-body-count {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .meta-badge {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-right: 5px;
    }

    .meta-badge .icon {
        height: 20px;
        width: 20px;
        margin-right: 3px;
    }

</style>
