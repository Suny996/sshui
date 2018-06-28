<template>
  <Customise @customises="c=>customise=c" :defaultFields="defaultFields">
    <el-form :model="formItem" ref="formValidate" :rules="ruleValidate" label-width="120" label-position="right" inline>

      <el-form-item label="Name" prop="name" label-width="120" v-show="customise.name">
        <el-input v-model="formItem.name" placeholder="Enter name..." label="Name"></el-input>
      </el-form-item>

      <el-form-item label="Gender" prop="gender" v-show="customise.gender">
        <el-radio-group v-model="formItem.gender">
          <el-radio label="male">Male</el-radio>
          <el-radio label="female">Female</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Date" prop="date" v-show="customise.date">
        <el-date-picker type="date" v-model="formItem.date"></el-date-picker>
      </el-form-item>

      <el-form-item label="City" label-for="city" prop="city" v-show="customise.city" label-width="120">
        <el-select v-model="formItem.city" clearable element-id="city">
          <el-option value="beijing">New York</el-option>
          <el-option value="shanghai">London</el-option>
          <el-option value="shenzhen">Sydney</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="E-mail" prop="mail" v-show="customise.mail">
        <el-input v-model="formItem.mail" placeholder="Enter your e-mail"></el-input>
      </el-form-item>



      <el-form-item :label="$t('switchLangTitle')">
        <el-radio-group v-model="lang" @change="handleSwitch" vertical>
          <el-radio label="zh-CN">
            <span>中文简体</span>
          </el-radio>
          <el-radio label="zh-TW">
            <span>中文繁體</span>
          </el-radio>
          <el-radio label="en-US">
            <span>English</span>
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit('formValidate')">Submit</el-button>
        <el-button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</el-button>
      </el-form-item>

    </el-form>
  </Customise>
</template>

<script>


  export default {
    name: "TestCustomise",
    data() {
      return {
        lang: 'zh-CN',
        defaultFields: {name: true, city: true, date: true, mail: false, gender: false},
        customise: {},
        formItem: {
          name: '',
          mail:
            '',
          city:
            '',
          date:
            '',
          gender:
            ''
        },
        ruleValidate: {
          name: [
            {required: true, message: 'The name cannot be empty', trigger: 'blur'}
          ],
          mail:
            [
              {required: true, message: 'Mailbox cannot be empty', trigger: 'blur'},
              {type: 'email', message: 'Incorrect email format', trigger: 'blur'}
            ],
          city:
            [
              {required: true, message: 'Please select the city', trigger: 'change'}
            ],
          gender:
            [
              {required: true, message: 'Please select gender', trigger: 'change'}
            ],
          date:
            [
              {required: true, type: 'date', message: 'Please select the date', trigger: 'change'}
            ]
        }
      }
    },
    methods: {
      /* getCustomise(data){
         this.customise = data;
       }*/
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset(name) {//重置查询条件默认方法
        this.$refs[name].resetFields();
      },
      handleSwitch(lang) {
        this.$i18n.locale = lang;
        //localStorage.lang = lang;
        //this.$store.commit('switchLang', lang); // 如果你要自己实现多语言切换，那么只需要执行这行代码即可，修改语言类型
        // 像iview的table组件这样一次渲染如果数据不更新视图就不更新的组件，如果切换语言需要更新一下数据才能切换组件内的多语言
      }
    }
  }
</script>

<style scoped>

</style>
