const loginPage = [
  {
    path: '/login',
    name: 'login',
    meta: {allowBack: false},
    component: () =>
      import(/* webpackChunkName: "Login" */ '../pages/login/Login')
  },
  {
    path: '/',
    name: 'login',
    meta: {allowBack: false},
    component: () =>
      import(/* webpackChunkName: "Login" */ '../pages/login/Login')
  }
]

const mainPage = [
  {
    path: '/main',
    name: 'main',
    component: () =>
      import(/* webpackChunkName: "Main" */ '../pages/main/Main'),
    children: [
      {
        path: 'Main_Page/mainPage',
        name: 'mainPage',
        component: () =>
            import(
              /* webpackChunkName: "Second" */ '../pages/main/routes/Main_Page/mainPage'
            )
      },
      {
        path: 'School/modifyInfo',
        name: 'school_modifyInfo',
        component: () =>
          import(
            /* webpackChunkName: "Second" */ '../pages/main/routes/School/modifyInfo'
          )
      },
      {
        path: 'School/modifyCollegeInfo',
        name: 'school_modifyCollegeInfo',
        component: () =>
          import(
            /* webpackChunkName: "Second" */ '../pages/main/routes/School/modifyCollegeInfo'
          )
      },
      {
        path: 'School/addImg',
        name: 'school_addClothBySize',
        component: () =>
            import(
              /* webpackChunkName: "Second" */ '../pages/main/routes/School/addClothImg'
            )
      },
      {
        path: 'School/addBatch',
        name: 'school_addBatch',
        component: () =>
            import(
              /* webpackChunkName: "Second" */ '../pages/main/routes/School/addBatch'
            )
      },
      {
        path: 'School/modifyBatch',
        name: 'school_modifyBatch',
        component: () =>
            import(
              /* webpackChunkName: "Second" */ '../pages/main/routes/School/modifyBatch'
            )
      },
      {
        path: 'School/addClothById',
        name: 'school_addClothById',
        component: () =>
            import(
              /* webpackChunkName: "Second" */ '../pages/main/routes/School/addClothById'
            )
      },
      {
        path: 'School/schoolGetClothByBatchId',
        name: 'school_getClothByBatchId',
        component: () =>
            import(
              /* webpackChunkName: "Second" */ '../pages/main/routes/School/schoolGetClothByBatchId'
            )
      },
      {
        path: 'School/schoolGetClothByGender',
        name: 'school_getClothByGender',
        component: () =>
          import(
            /* webpackChunkName: "Second" */ '../pages/main/routes/School/schoolGetClothByGender'
          )
      },
      {
        path: 'School/checkResult',
        name: 'School_checkResult',
        component: () =>
          import(
            /* webpackChunkName: "First" */ '../pages/main/routes/School/checkResult'
          )
      },
      {
        path: 'School/scApprove',
        name: 'School_scPoverty',
        component: () =>
          import(
            /* webpackChunkName: "First" */ '../pages/main/routes/School/scApprove'
          )
      },
      {
        path: 'School/modifyApply',
        name: 'School_modifyApply',
        component: () =>
            import(
              /* webpackChunkName: "Second" */ '../pages/main/routes/School/modifyApply'
            )
      },
      {
        path: 'School/addCollegeAccount',
        name: 'AddCollegeAccount',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/School/addCollegeAccount'
            )
      },
      {
        path: 'School/exportFile',
        name: 'School_exportFile',
        component: () =>
          import(
            /* webpackChunkName: "First" */ '../pages/main/routes/School/exportFile'
          )
      },
      {
        path: 'School/modifyNotice',
        name: 'School_modifyNotice',
        component: () =>
          import(
            /* webpackChunkName: "First" */ '../pages/main/routes/School/modifyNotice'
          )
      },
      {
        path: 'School/addNotice',
        name: 'School_addNotice',
        component: () =>
          import(
            /* webpackChunkName: "First" */ '../pages/main/routes/School/addNotice'
          )
      },
      {
        path: 'College/addManager',
        name: 'AddManagerAccount',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/College/addManager'
            )
      },
      {
        path: 'College/colApprove',
        name: 'College_addPoverty',
        component: () =>
          import(
            /* webpackChunkName: "First" */ '../pages/main/routes/College/colApprove'
          )
      },
      {
        path: 'College/modifyInfo',
        name: 'college_modifyInfo',
        component: () =>
          import(
            /* webpackChunkName: "Second" */ '../pages/main/routes/College/modifyInfo'
          )
      },
      {
        path: 'College/modifyManagerInfo',
        name: 'College_modifyManagerInfo',
        component: () =>
          import(
            /* webpackChunkName: "First" */ '../pages/main/routes/College/modifyManagerInfo'
          )
      },
      {
        path: 'College/checkResult',
        name: 'College_checkResult',
        component: () =>
          import(
            /* webpackChunkName: "First" */ '../pages/main/routes/College/checkResult'
          )
      },
      {
        path: 'College/exportFile',
        name: 'AddCollegeAccount',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/College/exportFile'
            )
      },
      {
        path: 'Student/stuGetCloth',
        name: 'Student_stuGetCloth',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/Student/stuGetCloth'
            )
      },
      {
        path: 'Student/modifyApply',
        name: 'Student_modifyApply',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/Student/modifyApply'
            )
      },
      {
        path: 'Student/modifyInfo',
        name: 'Student_modifyInfo',
        component: () =>
          import(
            /* webpackChunkName: "Second" */ '../pages/main/routes/Student/modifyInfo'
          )
      },
      {
        path: 'Manager/manApprove',
        name: 'Manager_manApprove',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/Manager/manApprove'
            )
      },
      {
        path: 'Manager/checkResult',
        name: 'Manager_checkResult',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/Manager/checkResult'
            )
      },
      {
        path: 'Manager/addStudent',
        name: 'addStudent',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/Manager/addStudent'
            )
      },
      {
        path: 'Manager/getStudentById',
        name: 'addStudent',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/Manager/getStudentById'
            )
      },
      {
        path: 'Manager/exportFile',
        name: 'AddCollegeAccount',
        component: () =>
          import(
            /* webpackChunkName: "First" */ '../pages/main/routes/Manager/exportFile'
          )
      },
      {
        path: 'Manager/modifyInfo',
        name: 'Manager_modifyInfo',
        component: () =>
          import(
            /* webpackChunkName: "Second" */ '../pages/main/routes/Manager/modifyInfo'
          )
      }
    ]
  }
]

const errorPage = [
  {
    path: '/notFound',
    name: 'notFound',
    component: () =>
      import(/* webpackChunkName: "NotFound" */ '../pages/error/NotFound')
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: () =>
      import(/* webpackChunkName: "Forbidden" */ '../pages/error/Forbidden')
  },
  {
    path: '/badGateway',
    name: 'badGateway',
    component: () =>
      import(/* webpackChunkName: "BadGateway" */ '../pages/error/BadGateway')
  },
  {
    path: '*',
    redirect: '/notFound'
  }
]
export default [...loginPage, ...mainPage, ...errorPage]
