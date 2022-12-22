<template>
    <div>
        <h1 align="center">添加学生</h1>
        <el-form ref="form" :model="form" label-width="100px">
            <el-col :span="10">
                <el-form-item label="学号" >
                    <el-input v-model="form.stuId"></el-input>
                </el-form-item>
                <el-form-item label="学生姓名">
                    <el-input v-model="form.stuName"></el-input>
                </el-form-item>
                <el-form-item label="班级号">
                    <el-input v-model="form.classId"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.stuPassword"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="form.gender" placeholder="请选择性别">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
            <el-form-item label="入学时间">
                <el-col :span="10">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.enDate" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addstudent">立即创建</el-button>
            </el-form-item>
            </el-col>
        </el-form>
    </div>
</template>
<!--    stuId, stuName, gender, enDate（时间戳, classId, stuPassword-->
<script>
import Vue from 'vue'
export default {
  name: 'addStudent',
  data () {
    return {
      form: {
        stuId: '',
        classId: '',
        stuName: '',
        gender: '',
        enDate: '',
        stuPassword: '',
        date2: '',
        is_poverty: false
      }
    }
  },
  methods: {
    addstudent () {
      let std = {
        stuId: this.form.stuId,
        classId: this.form.classId,
        stuName: this.form.stuName,
        gender: this.form.gender,
        enDate: this.form.enDate,
        stuPassword: this.$md5(this.form.stuPassword)
      }
      this.$axios.post('api/student/add', std).then(res => {
        // console.info(res.data)
        if (res.data !== null && res.data.status === true) {
          Vue.prototype.$message.success(res.data.message)
        } else {
          Vue.prototype.$message.error(res.data.message)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
