<template>
  <action-sheet :actions="actions" :callback="actionClick" :title="title" multiterm="true" :open="open" :name="name"></action-sheet>
</template>
<script>
export default {
  data() {
      return {
      }
    },
    methods: {
      actionClick (result, currentNav) {
        // 选择年
        if (currentNav == 0) {
          return new Promise((resovle, reject) => {
            resovle(this.actions[0].data)
          })
        }
        // 选择月
        else if (currentNav == 1) {
          return new Promise((resovle, reject) => {
            let month = []
            for (let i = 1; i <= 12; ++i) {
              month.push({
                name: i + '月',
                value: i
              })
            }
            resovle(month)
          })
        // 选择日
        } else if (currentNav == 2) {
          return new Promise((resovle, reject) => {
            let data = []
            let monthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

            if (result[0].value % 4 == 0) {
              monthArr[1] = 29
            }
            for (let i = 1; i <= monthArr[result[1].value - 1]; ++i) {
              data.push({
                name: i + '日',
                value: i
              })
            }
            resovle(data)
          })
        // 返回业务方
        } else if (currentNav == 'end') {
          if (this.callback) {
            this.callback(result)
          }
        }
      }
    },
    props: {
      callback: Function,
      title: String,
      open: {
        type: Boolean
      },
      name:String,
      actions: Array
    }
    // ,
    // ready () {
    //   setTimeout(()=>{ alert(this.callback) }, 0)
    // }
}
</script>
<style lang="less" scoped>
.center-block {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
}
</style>
