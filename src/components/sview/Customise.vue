<template>
  <div>
    <el-tabs type="card" editable v-model="editableTabsValue" @tab-remove="handleTabsRemove"
             @tab-add="addDialogVisible=true"
             @tab-click="handleTabChange">
      <el-tab-pane :label="$t('customise.label.defaultTabLabel')" name="default"></el-tab-pane>
      <template v-for="(customise,index) in customises">
        <el-tab-pane :label="customise.customiseName" :name="customise.customiseId" closable></el-tab-pane>
      </template>
      <!-- <Button type="ghost" @click="addModal = true" icon="plus" slot="extra"></Button>-->
    </el-tabs>
    <slot></slot>
    <el-dialog
      :visible.sync="addDialogVisible"
      :title="$t('customise.title.addModalTitle')">
      <el-input v-model="addCustomiseName"
                :placeholder="$t('customise.placeholder.default')+$t('customise.label.customiseName')"></el-input>
      <el-transfer
        :data="data" v-model="targetKeys"></el-transfer>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">{{$t('cancel')}}</el-button>
    <el-button type="primary" @click="addCustomise">{{$t('ok')}}</el-button>
  </span>
    </el-dialog>
    <!--    <Modal
          v-model="delModal"
          :title="$t('customise.title.delModalTitle')"
          @on-ok="delCustomise">
          <p>{{$t('customise.text.dellCustomiseConfirmText')}}</p>
        </Modal>-->
  </div>
</template>

<script>
  export default {
    name: "Customise",
    data() {
      return {
        editableTabsValue: 'default',
        addDialogVisible: false,
        delModal: false,
        //delingCustomiseId: '',
        customises: [],
        //defaultShow: {name: true, city: true, date: false, mail: false, gender: false},
        //customisesShow: {},
        data: [],
        targetKeys: []
        ,
        addCustomiseName: '',
        pageId: this.pageName
      }
    },
    props: {
      defaultFields: {
        type: Object, default: {}
      },
      pageName: {type: String}
    },
    created() {
      if (!this.pageName) {
        this.pageId = this.$parent.$options.name;
      }

      this.getCustomises();

      //this.customisesShow = this.defaultShow;
      //alert(this.elements);
      for (var item in this.defaultFields) {
        this.data.push({"key": item, "label": item});
      }
      //console.log('this.$options:' + this.$parent.$options.name);
      this.$emit("customises", this.defaultFields);
    },
    methods: {
      handleTabsRemove: function (name) {
        //console.log('this.name:' + name + "    action:" + action);
        //this.delModal = true;
        // this.delingCustomiseId = name;
        this.$confirm(this.$t('customise.text.dellCustomiseConfirmText'), '', {
         // confirmButtonText: '确定',
          //cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete("/customise/", {
            data: {
              pageId: this.pageId,
              customiseId: name
            }
          })
            .then(res => {
              //console.log(res.data)
              /*this.customises.forEach((tab, index) => {
                if (tab.name === name) {
                  let nextTab = tabs[index + 1] || tabs[index - 1];
                  if (nextTab) {
                    activeName = nextTab.name;
                  }
                }
              });*/
              this.editableTabsValue = "default";
              this.customises = this.customises.filter(tab => tab.customiseId !== name);
              this.$message({type: 'success', showClose: true, message: this.$t('customise.text.delSuccess')});
            })
            .catch(error => {
              console.log(error);
              this.$message({type: 'error', showClose: true, message: this.$t('customise.text.delFail')});
            })
        }).catch(() => {
          /*this.$message({
            type: 'info', showClose: true,
            message: '已取消删除'
          });*/
        });
        return false;
      },
      handleTabChange(tab, action) {//tab切换
        var name = tab.name;
        //alert(JSON.stringify(name)+"|"+action);
        let custom = this.customises.find(c => c.customiseId === name);
        //alert(custom);
        if (!custom) {
          this.$emit("customises", this.defaultFields);
        } else {
          //this.customisesShow = JSON.parse(custom.fieldContents);
          this.$emit("customises", JSON.parse(custom.fieldContents));
        }

      },
      addCustomise(name) {//添加customise
        if (!this.addCustomiseName) {
          this.$message({type: 'error', message: 'please input Customise Name!'});
          return false;
        }
        if (!this.targetKeys) {
          this.$message({type: 'error', message: 'please select Customise!'});
          return false;
        }
        //alert(this.targetKeys);
        let fields = {};
        this.targetKeys.forEach(function (field) {
          fields[field] = true;
        })
        //alert(JSON.stringify(fields));
        this.$axios.post("/customise/", {
          pageId: this.pageId,
          customiseName: this.addCustomiseName,
          fieldContents: JSON.stringify(fields)
        })
          .then(res => {
            //console.log(res.data)
            this.addDialogVisible = false;
            this.$message({type: 'success', showClose: true, message: this.$t('customise.text.addSuccess')});
            this.getCustomises();
          })
          .catch(error => {
            console.log(error);
            this.$message({type: 'error', showClose: true, message: this.$t('customise.text.addFail')});
          })
      },
      getCustomises() {
        this.$axios("/customise/" + this.pageId)
          .then(res => {
            this.customises = res.data;
            //console.log(res.data);
          })
          .catch(error => {
            console.log(error);
          });
      },
      /* handleChange(newTargetKeys, direction, moveKeys) {//添加查询项
         console.log(newTargetKeys);
         console.log(direction);
         console.log(moveKeys);
         this.targetKeys = newTargetKeys;
       },
       filterMethod(data, query) {
         return data.label.indexOf(query) > -1;
       }*/
    }
  }
</script>

<style scoped>
  /* .ivu-transfer-list {
     display: inline-block;
     width: 280px;
     height: 300px;
     font-size: 12px;
     vertical-align: middle;
     position: relative;
     padding-top: 35px;
   }*/
</style>
