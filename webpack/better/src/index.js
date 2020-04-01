import jquery from 'jquery';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn')
let r = moment().endOf('day').fromNow();
alert(r)