import Loadable from 'react-loadable'
import { Loading } from '../components'

const Login = Loadable({
  loader: () => import('./login'),
  loading: Loading,
})

const Register = Loadable({
  loader: () => import('./register'),
  loading: Loading,
})

const Main = Loadable({
  loader: () => import('./main'),
  loading: Loading,
})

const NotFound = Loadable({
  loader: () => import('./notfound'),
  loading: Loading,
})

const LaobanInfo = Loadable({
  loader: () => import('./laobanInfo'),
  loading: Loading,
})
const DashenInfo = Loadable({
  loader: () => import('./dashenInfo'),
  loading: Loading,
})

export { Login, Register, Main, NotFound, LaobanInfo, DashenInfo }
