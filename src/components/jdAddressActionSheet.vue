<template>
    <jd-action-sheet :actions="actions" :showSelected='true' :callback="actionClick" :chooseCallback="chooseClick" :title="title" multiterm="true" :open="open" :name="name" :modellist='modellist' :showList="showList" :className="className"></jd-action-sheet>
    
</template>
<script>
import api from "../../src/api";
module.exports = {
  data() {
    return {
      actions: [],
      provinceList: [],
      cityList: [],
      districtList: []
    };
  },
  methods: {
    chooseClick(result) {
      if (this.chooseCallback) {
        this.chooseCallback(result);
      }
    },
    actionClick(result, currentNav) {
      // 选择省
      if (currentNav == 0) {
        return new Promise((resovle, reject) => {
          resovle(this.actions[0].data);
        });
      } else if (currentNav == 1) {
        // 选择市
        return new Promise((resovle, reject) => {
          let city = [];
          let resobj = result[0] ? result[0] : this.modellist[0];
          api.getJdAddress(this.addressApi, resobj.value).then(res => {
            let cityData = res.data.data;
            cityData.map(item => {
              city.push({
                name: item.name,
                value: item.id
              });
            });
            resovle(city);
          });
        });
        // 选择区
      } else if (currentNav == 2) {
        return new Promise((resovle, reject) => {
          let district = [];
          api.getJdAddress(this.addressApi, result[1].value).then(res => {
            let districtData = res.data.data;
            districtData.map(item => {
              district.push({
                name: item.name,
                value: item.id
              });
            });
            resovle(district);
          });
        });
        // 县
      } else if (currentNav == 3) {
        return new Promise((resovle, reject) => {
          let town = [];
          api.getJdAddress(this.addressApi, result[2].value).then(res => {
            let townData = res.data.data;
            if (townData.length > 0) {
              townData.map(item => {
                town.push({
                  name: item.name,
                  value: item.id
                });
              });
            }
            resovle(town);
          });
        });
        // 返回业务方
      } else if (currentNav == "end") {
        if (this.callback) {
          this.callback(result);
        }
      }
    }
  },
  props: {
    callback: Function,
    chooseCallback: Function,
    title: String,
    name: String,
    className: String,
    addressApi: String,
    modellist: {
      type: Array,
      default: () => []
    },
    showList: {
      type: Array,
      default: () => []
    },
    open: {
      type: Boolean
    }
  },
  mounted() {
    api.getJdAddress(this.addressApi).then(res => {
      let provinveData = res.data.data;
      let province = [];
      provinveData.map((item, index) => {
        province.push({
          name: item.name,
          value: item.id
        });
      });
      let city = [];
      let district = [];
      let town = [];
      // if (this.modellist.length >0) {
      //      api.getJdAddress(this.addressApi,this.modellist[0].value).then(res => {
      //                 let cityData = res.data.data
      //                 cityData.map((item) => {
      //                     city.push({
      //                         name: item.name,
      //                         value: item.id
      //                     })
      //                 })
      //             })
      //      api.getJdAddress(this.addressApi,this.modellist[1].value).then(res => {
      //                 let districtData = res.data.data
      //                 districtData.map((item) => {
      //                     district.push({
      //                         name: item.name,
      //                         value: item.id
      //                     })
      //                 })
      //             })
      // }
      this.actions = [
        {
          title: "省",
          data: province
        },
        {
          title: "市",
          data: city
        },
        {
          title: "区",
          data: district
        },
        {
          title: "县",
          data: town
        }
      ];
    });
  }
};
</script>
<style lang="less" scoped>
.center-block {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
}
</style>
