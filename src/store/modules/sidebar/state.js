export default {
  sidebarMap: {
    // 角色类型
    1: {
      main: [
        {
          groupTitle: '学校'
        },
        {
          path: '/main/School/School',
          icon: 'wmj-menu-unfold',
          title: '批次管理',
          group: 'batch',
          children: [
            {
              path: '/main/School/addBatch',
              icon: 'wmj-menu-unfold',
              title: '添加批次',
              group: 'chlothBath'
            },
            {
              path: '/main/School/modifyBatch',
              icon: 'wmj-menu-unfold',
              title: '修改批次'
            }
          ]
        },
        {
          path: '/main/School/School',
          icon: 'wmj-menu-unfold',
          title: '衣物管理',
          group: 'clothadd',
          children: [
            {
              path: '/main/School/addClothById',
              icon: 'wmj-menu-unfold',
              title: '添加衣物',
              group: 'chlothByid'
            },
            {
              path: '/main/School/addImg',
              icon: 'wmj-menu-unfold',
              title: '添加衣物图片'
            },
            {
              path: '/main/School/schoolGetClothByBatchId',
              icon: 'wmj-menu-unfold',
              title: '查询衣物（批次）'
            },
            {
              path: '/main/School/schoolGetClothByGender',
              icon: 'wmj-menu-unfold',
              title: '查询衣物（性别）'
            }
          ]
        },
        {
          path: '/main/School/scApprove',
          icon: 'wmj-menu-unfold',
          title: '申请管理',
          group: 'clothApply',
          children: [
            {
              path: '/main/School/scApprove',
              icon: 'wmj-menu-unfold',
              title: '待审核'
            },
            {
              path: '/main/School/checkResult',
              icon: 'wmj-menu-unfold',
              title: '审核记录'
            },
            {
              path: '/main/School/modifyApply',
              icon: 'wmj-menu-unfold',
              title: '修改申请'
            }

          ]
        },
        {
          path: '/main/School/college',
          icon: 'wmj-menu-unfold',
          title: '学院管理',
          group: 'college',
          children: [
            {
              path: '/main/School/addCollegeAccount',
              icon: 'wmj-menu-unfold',
              title: '添加学院用户'
            },
            {
              path: '/main/School/modifyCollegeInfo',
              icon: 'wmj-menu-unfold',
              title: '重置学院用户密码'
            }
          ]
        },
        {
          path: '/main/School/notice',
          icon: 'wmj-menu-unfold',
          title: '通知管理',
          group: 'notice',
          children: [
            {
              path: '/main/School/addNotice',
              icon: 'wmj-menu-unfold',
              title: '添加通知'
            },
            {
              path: '/main/School/modifyNotice',
              icon: 'wmj-menu-unfold',
              title: '通知管理'
            }
          ]
        },
        {
          path: '/main/School/exportFile',
          icon: 'wmj-menu-unfold',
          title: '导出数据'
        },
        {
          path: '/main/School/modifyInfo',
          icon: 'wmj-menu-unfold',
          title: '账号信息维护'
        }
      ]
    },
    2: {
      main: [
        {
          groupTitle: '学院'
        },
        {
          path: '/main/College',
          icon: 'wmj-menu-unfold',
          title: '申请审核',
          group: 'clothapply',
          children: [
            {
              path: '/main/College/colApprove',
              icon: 'wmj-menu-unfold',
              title: '待审核'
            },
            {
              path: '/main/College/checkResult',
              icon: 'wmj-menu-unfold',
              title: '审核记录'
            }

          ]
        },
        {
          path: '/main/College',
          icon: 'wmj-menu-unfold',
          title: '辅导员管理',
          group: 'college',
          children: [
            {
              path: '/main/College/addManager',
              icon: 'wmj-menu-unfold',
              title: '添加辅导员'
            },
            {
              path: '/main/College/modifyManagerInfo',
              icon: 'wmj-menu-unfold',
              title: '辅导员信息维护'
            }
          ]
        },
        {
          path: '/main/College/exportFile',
          icon: 'wmj-menu-unfold',
          title: '数据导出'
        },
        {
          path: '/main/College/modifyInfo',
          icon: 'wmj-menu-unfold',
          title: '账号信息维护'
        }
      ]
    },
    3: {
      main: [
        {
          groupTitle: '辅导员'
        },
        {
          path: '/main/Manager',
          icon: 'wmj-menu-unfold',
          title: '衣物申请审核',
          group: 'clothapply',
          children: [
            {
              path: '/main/Manager/manApprove',
              icon: 'wmj-menu-unfold',
              title: '待审核'
            },
            {
              path: '/main/Manager/checkResult',
              icon: 'wmj-menu-unfold',
              title: '审核记录'
            }

          ]
        },
        {
          path: '/main/Manager',
          icon: 'wmj-menu-unfold',
          title: '学生管理',
          group: 'stuManage',
          children: [
            {
              path: '/main/Manager/addStudent',
              icon: 'wmj-menu-unfold',
              title: '添加学生'
            },
            {
              path: '/main/Manager/getStudentById',
              icon: 'wmj-menu-unfold',
              title: '学生信息维护'
            }

          ]
        },
        {
          path: '/main/Manager/exportFile',
          icon: 'wmj-menu-unfold',
          title: '数据导出'
        },
        {
          path: '/main/Manager/modifyInfo',
          icon: 'wmj-menu-unfold',
          title: '账号信息维护'
        }
      ]
    },
    4: {
      main: [
        {
          groupTitle: '学生'
        },
        {
          path: '/main/Student/stuGetCloth',
          icon: 'wmj-menu-unfold',
          title: '衣物查询与申请'
        },
        {
          path: '/main/Student/modifyApply',
          icon: 'wmj-menu-unfold',
          title: '申请修改与删除'
        },
        {
          path: '/main/student/modifyInfo',
          icon: 'wmj-menu-unfold',
          title: '账号信息维护'
        }
      ]
    }
  },
  sidebarTheme: {
    dark: {
      background: '#1f2c35',
      text: '#ffffff',
      activeText: '#ffffff'
    },
    light: {
      background: '#ffffff',
      text: '#000000',
      activeText: '#1890ff'
    }
  }
}
