import {
  ConfigProvider,
  Button,
  Loading,
  Dialog,
  Switch,
  Cell,
  CellGroup
} from 'vant'

import 'vant/lib/index.css'
import './vant.scss'

export default function SetVantPlugins(app: any) {
  app
    .use(Dialog)
    .use(ConfigProvider)
    .use(Button)
    .use(Loading)
    .use(Switch)
    .use(Cell)
    .use(CellGroup)
}
