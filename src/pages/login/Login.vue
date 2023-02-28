<template>
    <div class="loginBody" >
      <el-card class="box-card"></el-card>
        <div class="loginData" >
            <div class="loginText" style="width:600px">
                <h2>寒衣补助综合管理系统</h2>
            </div>
            <div class="main" align="center">
                <div>账号：<el-input class="id" placeholder="请输入账号" v-model="id" clearable>
                </el-input></div>
                <br>
                <div>密码：<el-input class="password" placeholder="请输入密码" v-model="password" show-password>
                </el-input></div>
                <br>
                <div>用户：<el-select class="user" v-model="value" clearable placeholder="请选择账户类型">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select></div>
              <br>
                <el-row>
                    <el-button @click="login" type="primary">登录</el-button>
                </el-row>
              <br>
                <el-row>
                    <el-button @click="schoolReset" type="primary">学校用户重置密码</el-button>
                </el-row>
            </div>
        </div>
      <school-reset-dialog ref="schoolReset"></school-reset-dialog>
      <div style="font-weight:700;position:fixed;text-align:center;bottom:0;margin:0 auto;width:100%;color: black">
        <a
            target="_blank"
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51012202001387"
            style="display: inline-block">
            <img :src="rightIconSrc"/>
            <p style="margin: 0 0 0 5px; color:black;display: inline-block">川公网安备 51012202001387号</p>
        </a>
        <a
            target="_blank"
            style="color: black"
            href="https://beian.miit.gov.cn/">琼ICP备2022020863号-1
        </a>
        @2022 kudosama.cn 版权所有
      </div>
    </div>
</template>

<script>
import {Message} from 'element-ui'
import {Base64} from 'js-base64'
import SchoolResetDialog from '../main/components/schoolReset/schoolResetDialog'
import rightIcon from '@/assets/images/rightIcon.png'

export default {
  name: 'Login',
  components: {SchoolResetDialog},
  data: function () {
    return {
      rightIconSrc: rightIcon,
      id: '',
      password: '',
      options: [{
        value: '1',
        label: '学校'
      }, {
        value: '2',
        label: '学院'
      }, {
        value: '3',
        label: '辅导员'
      }, {
        value: '4',
        label: '学生'
      }],
      value: ''
    }
  },
  created () {
    this.enterLogin()
  },
  mounted () {
  },
  methods: {
    schoolReset () {
      this.$refs.schoolReset.show()
    },
    enterLogin () {
      this.$axios.post('/api/user/refresh')
      document.onkeydown = (e) => {
        // console.log(e)
        e = window.event || e
        if ((this.$route.path === '/' || this.$route.path === '/login') &&
            (e.code === 'Enter' || e.code === 'enter' || e.code === 'NumpadEnter')) {
          this.login()
        }
      }
    },
    login () {
      let user = {
        id: this.id,
        password: Base64.encode(this.$md5(this.password)) // base64+md5双重加密
      }
      // console.log(user)
      if (this.value === '1') {
        this.$axios.post('/api/school/login', user).then(res => {
          if (res.data.data !== null) {
            this.$router.push({name: '登陆成功'})
            this.$router.push('/main')
          } else {
            Message.error('账号或密码错误')
          }
        })
      } else if (this.value === '2') {
        this.$axios.post('/api/college/login', user).then(res => {
          if (res.data.data !== null) {
            this.$router.push({name: '登陆成功'})
            this.$router.push('/main')
          } else {
            Message.error('账号或密码错误')
          }
        })
      } else if (this.value === '3') {
        this.$axios.post('/api/manager/login', user).then(res => {
          if (res.data.data !== null) {
            this.$router.push({name: '登陆成功'})
            this.$router.push('/main')
          } else {
            Message.error('账号或密码错误')
          }
        })
      } else if (this.value === '4') {
        this.$axios.post('/api/student/login', user).then(res => {
          // console.info(res.data.password)
          if (res.data.data !== null) {
            this.$router.push({name: '登陆成功'})
            this.$router.push('/main')
          } else {
            Message.error('账号或密码错误')
          }
        })
      }
    }
  }

}
</script>

<style scoped>
    .loginBody {
        width: 100%;
        height: 100%;
        /*min-width: 1000px;*/
        background-image: url("../../assets/images/pic3.jpeg");
        background-size: 100% 100%;
        background-position: center center;
        overflow: auto;
        background-repeat: no-repeat;
        position: fixed;
        line-height: 100%;
        padding-top: 150px;
    }
    .loginText {
        margin-bottom: 20px;
        line-height: 50px;
        text-align: center;
        font-size: 30px;
        font-weight: bolder;
        color: wheat;
        text-shadow: 2px 2px 4px #000000;
    }

    .loginData {
        display: flex;
        flex-direction: column;
        margin: 0 !important;
        position: fixed;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: auto;
        height: auto;
    }

    .main {
      top: 50%;
      left: 50%;
    }

    .box-card {
      top: 40%;
      left: 50%;
      height: 50%;
      width: 50%;
      position: absolute;
      padding-bottom: 20px;
      background-color: rgba(255,255,255,0.5);
      transform: translate(-50%, -50%);
    }

    .id {
      width: 200px;
    }
    .password {
      width: 200px;
    }
    .user {
      width: 200px;
    }
</style>
