/**
 * Created by Administrator on 2017/1/8 0008.
 */
const STORAGE_KET = 'todos-vuejs';
export default{
  fetch :function () {
    return JSON.parse(window.localStorage.getItem(STORAGE_KET)||"[]");
  },
  save:function (items) {
    window.localStorage.setItem(STORAGE_KET,JSON.stringify(items));
  }
}
