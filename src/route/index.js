import {
  Login,
  Register,
  Main,
  NotFound,
  DashenInfo,
  LaobanInfo,
} from '../views'
import { UserCenter, UserList, UserMessage } from '../components'
export const outer = [
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    path: '/register',
    exact: true,
    component: Register,
  },
  {
    path: '/main',
    exact: false,
    component: Main,
  },
  {
    path: '/dasheninfo',
    exact: true,
    component: DashenInfo,
  },
  {
    path: '/laobaninfo',
    exact: true,
    component: LaobanInfo,
  },
  {
    path: '/404',
    component: NotFound,
  },
]
export const inner = [
  {
    path: '/main/usercenter',
    exact: true,
    component: UserCenter,
  },
  {
    path: '/main/userlist',
    exact: true,
    component: UserList,
  },
  {
    path: '/main/usermessage',
    exact: true,
    component: UserMessage,
  },
  {
    path: '/404',
    component: NotFound,
    exact: false,
  },
]
