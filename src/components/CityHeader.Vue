<template>
  <div id="city-header">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6" class="el-col-logo">
        <el-image class="logo-header" style="width:95px; height:50px" :src="logoUrl" fit="fit"></el-image>
      </el-col>
      <el-col :span="6" class="el-col-content">
        <el-popover placement="top-start" ref="popover" width="50" trigger="hover">
          <el-button
            type="text"
            icon="el-icon-switch-button"
            class="log-out-button"
            v-on:click="$emit('log-out')"
          >log out</el-button>
        </el-popover>
        <el-button
          type="text"
          style="color:white;font-size:20px;margin-top:18px;"
          @click="dialogFormVisible = true"
          v-if="isLogin"
        >Sign in</el-button>
        <el-button
          type="text"
          style="color:white;font-size:20px;margin-top:18px;"
          v-if="!isLogin"
          v-popover:popover
        >{{value}}</el-button>
      </el-col>
    </el-row>
    <el-dialog title="Sign in" :visible.sync="dialogFormVisible">
      <div class="log-on-contents">
        <el-form
          :model="formSignOn"
          style="width:400px;"
          label-position="top"
          :rules="sigonRules"
          ref="formSignOn"
        >
          <el-form-item label="Email" prop="email">
            <el-autocomplete
                v-model="formSignOn.email"
                placeholder="Enter your email"
                :fetch-suggestions="querySearchAsync"
                style="width:400px;"
                @select="handelSelect"
              ></el-autocomplete>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input v-model="formSignOn.password" show-password placeholder="Enter your password"></el-input>
          </el-form-item>
        </el-form>
        <div class="image-code">
          <p style="text-align:center;">QR Code</p>
          <el-image style="width:155px; height:155px"></el-image>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="logOn">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import headerLogo from '../assets/header-logo.png'
export default {
  name: 'CityHeader',
  data() {
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      callback()
    }
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        if (value.indexOf('@') === -1) {
          callback(new Error('请输入正确的格式'))
        }
      }
    }
    return {
      logoUrl: headerLogo,
      dialogFormVisible: false,
      formSignOn: {
        email: '',
        password: ''
      },
      sigonRules: {
        email: [{ validator: validateEmail, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }]
      }
    }
  },
  props: {
    value: {
      type: String,
      default: 'Sign in'
    },
    isLogin: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    logOn() {
      console.log('logoning', 'logoing')
      var params = new URLSearchParams()
      params.append('name', this.formSignOn.email)
      params.append('pwd', this.formSignOn.password)
      this.axios
        .post('http://47.100.138.62:8080/api/login', params)
        .then(response => {
          if (response.data.code === 200) {
            window.localStorage.setItem('token', response.data.result.token)
            window.localStorage.setItem('userId', response.data.result.userId)
            this.$router.replace({ path: '/traderSys' })
          }
        })
        .catch(function(error) {
          // 请求失败处理
          console.log(error)
        })
    },
    querySearchAsync(queryString, cb) {
      if (queryString.indexOf('@') === -1) {
        var result = []
        result.push({ value: queryString + '@qq.com' })
        result.push({ value: queryString + '@163.com' })
        result.push({ value: queryString + '@126.com' })
        result.push({ value: queryString + '@gmail.com' })
        result.push({ value: queryString + '@sohu.com' })
        result.push({ value: queryString + '@outlook.com' })
        cb(result)
      }
      cb()
    },
    handelSelect(item) {
      console.log('item', item)
      this.formSignOn.eamil = item
      this.$refs.formSignOn.validateField('email')
    }
  }
}
</script>
<style>
#city-header {
  width: 100%;
  position: absolute;
  top: 0;
  background-image: url('../assets/header.jpg');
  background-size: 100% 100%;
  min-height: 80px;
  margin-left: -28px;
  margin-top: -8px;
}
.el-dialog{
  text-align: left;
}
.logo-header {
  float: left;
  margin-left: 20px;
  margin-top: 15px;
}
.log-on-contents {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.log-out-button {
  color: #f56c6c;
}
</style>
