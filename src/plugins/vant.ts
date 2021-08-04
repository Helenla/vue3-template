import {
  Button,
  Loading,
  Dialog,
} from 'vant'

import 'vant/lib/index.css'
import './vant.scss'

export default function SetVantPlugins(app: any) {
  app
    .use(Button)
    .use(Loading)
    .use(Dialog)
}
