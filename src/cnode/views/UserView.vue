<template>
    <div class="user-view">
        <!--<spinner :show="!user"></spinner>-->
        <template v-if="user">
            <h2 class="user-title">
                <img class="user-avatar"
                     :src="user.avatar_url"
                     :title="user.loginname">
                <span>{{ user.loginname }}</span>
            </h2>
            <ul class="meta">
                <li><span>积分：{{user.score}}</span></li>
                <li v-if="user.githubUsername">GitHub：
                    <a :href="`https://github.com/${user.githubUsername}`" target="_blank">{{user.githubUsername}}</a>
                </li>
                <li>注册时间：{{ user.create_at | dateFromNow }}</li>
            </ul>
            <p class="links">
                <!--<a :href="'https://news.ycombinator.com/submitted?id=' + user.id">submissions</a> |-->
                <!--<a :href="'https://news.ycombinator.com/threads?id=' + user.id">comments</a>-->
            </p>
        </template>
    </div>
</template>

<script>

    export default {
        name: 'user-view',
        computed: {
            user () {
                return this.$store.state.users[this.$route.params.loginname]
            }
        },

        activated () {
            return this.$store.dispatch('FETCH_USER', {
                loginname: this.$store.state.route.params.loginname
            })
        },
    }
</script>

<style>

    .user-view {
        box-sizing: border-box;
    }

    .user-title {
        margin: 15px 0 0;
    }

    .user-avatar {
        height: 50px;
        width: 50px;
        border-radius: 5px;
        margin-right: 8px;
    }

    .meta {

    }

</style>
























