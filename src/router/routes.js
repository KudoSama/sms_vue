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
        path: 'School/addClothBySize',
        name: 'school_addClothBySize',
        component: () =>
            import(
              /* webpackChunkName: "Second" */ '../pages/main/routes/School/addClothBySize'
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
        name: 'school_modifyApply',
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
        name: 'AddCollegeAccount',
        component: () =>
          import(
            /* webpackChunkName: "First" */ '../pages/main/routes/School/exportFile'
          )
      },
      {
        path: 'College/addManager',
        name: 'AddCollegeAccount',
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
        path: 'Support_Tutor/stApprove',
        name: 'Support_stApprove',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/Support_Tutor/stApprove'
            )
      },
      {
        path: 'Support_Tutor/checkResult',
        name: 'Support_checkResult',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/Support_Tutor/checkResult'
            )
      },
      {
        path: 'Support_Tutor/addStudent',
        name: 'addStudent',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/Support_Tutor/addStudent'
            )
      },
      {
        path: 'Support_Tutor/getStudentById',
        name: 'addStudent',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/Support_tutor/getStudentById'
            )
      },
      {
        path: 'Support_Tutor/exportFile',
        name: 'AddCollegeAccount',
        component: () =>
          import(
            /* webpackChunkName: "First" */ '../pages/main/routes/Support_Tutor/exportFile'
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
