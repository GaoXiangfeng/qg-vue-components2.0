<style lang="less">
.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    background-color: #474a4f;
    color: #FFF;
    font-size: 18px;
    line-height: 1;
    font-weight: bold;
    border-radius: 50%;
}

.nav-icon-logo {
    width: 80px;
    height: 80px;
    background-color: #bbbfc4;
    color: #FFF;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
}

.nav-demo-title {
    font-size: 16px;
    margin-top: 16px;
}

.nav-demo-sub-title {
    color: #d3d6db;
    font-size: 14px;
}

.vc-content-title {
    position: relative;
    overflow: hidden;
    text-transform: capitalize;
    margin: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
    margin: 16px 16px 16px;
    padding-top: 16px;
    font-weight: 500;
}

.vc-list {
    margin: 16px 0;
    &:first-child {
        margin-top: 0;
    }
    width: 100%;
    background: #FFF;
    position: relative;
}

.vc-item-cell {
    padding: 10px 16px;
    display: flex;
    align-items: center;
}

.vc-item-cell.vc-item-link {
    background-size: 10px 20px;
    background-repeat: no-repeat;
    background-position: 95% center;
    padding-right: 42px;
}

.vc-item-title {
    flex: 1;
    overflow: hidden;
    display: block;
    font-size: 16px;
    white-space: nowrap;
    word-break: break-all;
    text-overflow: ellipsis;
    max-width: 100%;
}
</style>
<template>
    <div class="vc-page">
        <div v-for="menu in menus">
            <div class="vc-list">
                <router-link :to="menu.link">
                    <a class="vc-item vc-item-cell" href="javascript:;" :class="{'vc-item-link': menu.link}">
                        <div class="vc-item-title">{{menu.title}}</div>
                    </a>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            menus: [{
                title: 'Date Action Sheet',
                link: '/dateActionSheet'
            }, {
                title: 'Address Action Sheet',
                link: '/addressActionSheet'
            },
            {
                title: 'jd Address Action Sheet',
                link: '/jdAddressActionSheet'
            },
            {
                title: 'Goods Action Sheet',
                link: '/goodsActionSheet'
            },
            {
                title: 'Gift Action Sheet',
                link: '/giftActionSheet'
            }, {
                title: 'Bankcard Action Sheet',
                link: '/bankcardActionSheet'
            }, {
                title: 'Action Sheet',
                link: '/actionSheet'
            },{
                title: 'Modal',
                link: '/modal'
            },{
                title: 'button',
                link: '/button'
            },{
                title: 'header',
                link: '/header'
            },{
                title: 'input',
                link: '/input'
            },{
                title: 'toast',
                link: '/toast'
            },{
                title: 'keyboard',
                link: '/keyboard'
            },
                {
                    title: 'loading',
                    link: '/loading'
                },{
                    title:'swipe',
                    link: '/swipe'
                },{
                    title:'scrollList',
                    link: '/scrollList'
                },{
                    title:'upTop',
                    link: '/upTop'
                },{
                    title:'indexSection',
                    link: '/indexSection'
                },{
                    title:'alertify',
                    link: '/alertify'
                }, {
                    title: 'picker',
                    link: '/picker'
                }, {
                    title: 'uploadImage',
                    link: '/uploadImage'
                }]
        }
    }
}
</script>
