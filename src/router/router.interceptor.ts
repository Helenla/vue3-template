/**
 * 路由处理
 */
import { clearPending } from "../services/pending"
import router from './index'

router.beforeEach((to, from, next) => {
  clearPending()
  next()
})

export default router