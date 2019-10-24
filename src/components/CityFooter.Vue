<template>
  <div id="cityFooter">
    <el-row type="flex" class="row-bg">
      <el-col :span="6" class="el-col-logo">
        <el-image class="logo-footer" style="width:105px; height:60px" :src="logoUrl" fit="fit"></el-image>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import footerLogo from '../assets/footer-logo.png'
export default {
  name: 'CityFooter',
  data() {
    return {
      'logoUrl': footerLogo
    }
  }
}
</script>
<style>
#cityFooter{
  background-image: url("../assets/footer-background.jpg");
  height: 80px;
  width: 105%;
  margin-left: -28px;
}
.logo-footer {
  float: left;
  margin-left: 20px;
  margin-top: 10px;
}
</style>
