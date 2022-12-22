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
          icon: 'suncaper-menu-unfold',
          title: '批次管理',
          group: 'batch',
          children: [
            {
              path: '/main/School/addBatch',
              icon: 'suncaper-menu-unfold',
              title: '添加批次',
              group: 'chlothBath'
            },
            {
              path: '/main/School/modifyBatch',
              icon: 'suncaper-menu-unfold',
              title: '修改批次'
            }
          ]
        },
        {
          path: '/main/School/School',
          icon: 'suncaper-menu-unfold',
          title: '衣物管理',
          group: 'clothadd',
          children: [
            {
              path: '/main/School/addClothById',
              icon: 'suncaper-menu-unfold',
              title: '添加衣物',
              group: 'chlothByid'
            },
            {
              path: '/main/School/addClothBySize',
              icon: 'suncaper-menu-unfold',
              title: '添加衣物尺码'
            },
            {
              path: '/main/School/addImg',
              icon: 'suncaper-menu-unfold',
              title: '添加衣物图片'
            },
            {
              path: '/main/School/schoolGetClothByBatchId',
              icon: 'suncaper-menu-unfold',
              title: '查询衣物（批次）'
            },
            {
              path: '/main/School/schoolGetClothByGender',
              icon: 'suncaper-menu-unfold',
              title: '查询衣物（性别）'
            }
          ]
        },
        {
          path: '/main/School/scApprove',
          icon: 'suncaper-menu-unfold',
          title: '申请管理',
          group: 'clothApply',
          children: [
            {
              path: '/main/School/scApprove',
              icon: 'suncaper-menu-unfold',
              title: '待审核'
            },
            {
              path: '/main/School/checkResult',
              icon: 'suncaper-menu-unfold',
              title: '审核记录'
            },
            {
              path: '/main/School/modifyApply',
              icon: 'suncaper-menu-unfold',
              title: '修改申请'
            }

          ]
        },
        {
          path: '/main/School',
          icon: 'suncaper-menu-unfold',
          title: '用户管理',
          group: 'second',
          children: [
            {
              path: '/main/School/addCollegeAccount',
              icon: 'suncaper-menu-unfold',
              title: '添加学院用户'
            },
            {
              path: '/main/School/modifyCollegeInfo',
              icon: 'suncaper-menu-unfold',
              title: '重置学院用户密码'
            }
          ]
        },
        {
          path: '/main/School/exportFile',
          icon: 'suncaper-menu-unfold',
          title: '导出数据'
        },
        {
          path: '/main/School/modifyInfo',
          icon: 'suncaper-menu-unfold',
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
          icon: 'suncaper-menu-unfold',
          title: '申请审核',
          group: 'clothapply',
          children: [
            {
              path: '/main/College/colApprove',
              icon: 'suncaper-menu-unfold',
              title: '待审核'
            },
            {
              path: '/main/College/checkResult',
              icon: 'suncaper-menu-unfold',
              title: '审核记录'
            }

          ]
        },
        {
          path: '/main/College',
          icon: 'suncaper-menu-unfold',
          title: '用户管理',
          group: 'college',
          children: [
            {
              path: '/main/College/addManager',
              icon: 'suncaper-menu-unfold',
              title: '添加辅导员'
            },
            {
              path: '/main/College/modifyManagerInfo',
              icon: 'suncaper-menu-unfold',
              title: '辅导员信息维护'
            }
          ]
        },
        {
          path: '/main/College/exportFile',
          icon: 'suncaper-menu-unfold',
          title: '数据导出'
        }
      ]
    },
    3: {
      main: [
        {
          groupTitle: '辅导员'
        },
        {
          path: '/main/Support_Tutor',
          icon: 'suncaper-menu-unfold',
          title: '衣物申请审核',
          group: 'clothapply',
          children: [
            {
              path: '/main/Support_Tutor/stApprove',
              icon: 'suncaper-menu-unfold',
              title: '待审核'
            },
            {
              path: '/main/Support_Tutor/checkResult',
              icon: 'suncaper-menu-unfold',
              title: '审核记录'
            }

          ]
        },
        {
          path: '/main/Support_Tutor',
          icon: 'suncaper-menu-unfold',
          title: '学生管理',
          group: 'stuManage',
          children: [
            {
              path: '/main/Support_Tutor/addStudent',
              icon: 'suncaper-menu-unfold',
              title: '添加学生'
            },
            {
              path: '/main/Support_Tutor/getStudentById',
              icon: 'suncaper-menu-unfold',
              title: '学生信息维护'
            }

          ]
        },
        {
          path: '/main/Support_Tutor/exportFile',
          icon: 'suncaper-menu-unfold',
          title: '数据导出'
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
          icon: 'suncaper-menu-unfold',
          title: '衣物查询与申请'
        },
        {
          path: '/main/Student/modifyApply',
          icon: 'suncaper-menu-unfold',
          title: '申请修改与删除'
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
