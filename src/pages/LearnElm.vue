<template>
  <div id="learnElm">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
    <!-- 容器学习-->
    <el-container style=" border: 1px solid #eee">
      <el-aside width="400px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']" :router="true">
          <el-submenu index="/learnElm/hello">
            <template slot="title">
              <i class="el-icon-message"></i>导航一
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="/learnElm/hello">
            <template slot="title">
              <i class="el-icon-menu"></i>导航二
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="/learnElm/test2">
            <template slot="title">
              <i class="el-icon-setting"></i>导航三
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>

        <el-container>
          <el-aside width="100px">这是左边</el-aside>
          <el-main>
            <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="200"></el-table-column>
            <el-table-column prop="name" label="姓名" width="200"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
          </el-table>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <el-container>
      <el-aside width="400px">
        <router-link to="/learnElm/hello">to helloWord</router-link>
        <router-link to="/learnElm/test2">to test</router-link>
      </el-aside>
      <el-main>
        <router-view name="a"/>
        <p>这是主页面之一</p>
      </el-main>
    </el-container>
    <el-container>
      <el-aside width="400px">
        <el-menu default-active="/learnElm/test" router>
          <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.index">
            <template slot="title">
              <span>{{item.navItem}}</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view name="a"></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'learnElm',
  data() {
    const item = {
      date: '2019-01-22',
      address: '仕家名苑',
      name: '范旭'
    }
    return {
      tableData: Array(20).fill(item),
      navList: [{
        index: '/learnElm/hello',
        navItem: '问候页面'
      }, {
        index: '/learnElm/test2',
        navItem: '测试界面'
      }]
    }
  }
}
</script>
<style>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #b3b3b3;
  color: white;
  text-align: center;
  line-height: 300px;
}
</style>
