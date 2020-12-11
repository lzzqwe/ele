import Vue from 'vue'
import moment from 'moment'
export default  Vue.filter('formateTime',function (value,format="YYYY-MM-DD HH:MM") {
  return moment(value).format(format)
})
