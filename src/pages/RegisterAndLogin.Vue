<template>
  <div id="registerAndLogin">
    <el-container>
      <el-header>
        <city-header></city-header>
      </el-header>
      <el-main>
        <h1>GFINet by Team 1</h1>
        <div class="main-content">
          <router-view name="content"></router-view>
        </div>
      </el-main>
      <el-footer>
        <city-footer></city-footer>
      </el-footer>
    </el-container>
    <el-dialog title="Log On" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="email">
          <el-autocomplete
            v-model="form.email"
            placeholder="Enter your email"
            :fetch-suggestions="querySearchAsync"
            style="width:400px;"
            @select="handelSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="password">
          <el-input v-model="form.password" autocomplete="off" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import CityHeader from '@/components/CityHeader'
import CityFooter from '@/components/CityFooter'
export default {
  name: 'RegisterAndLogin',
  data() {
    return {
      dialogFormVisible: false,
      form: {
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    signOn() {
      this.dialogFormVisible = true
      console.log('dialog', this.dialogFormVisible)
    }
  },
  components: {
    'city-header': CityHeader,
    'city-footer': CityFooter
  }
}
</script>
<style>
.main-content {
  background-image: url('../assets/content-background.jpg');
  height: 550px;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding-bottom: 80px;
}
.el-footer {
  margin-top: -20px;
  position: relative;
}
</style>
