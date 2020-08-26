import Home from '@/module/home/page/home.vue';
import page_list from '@/moudle/cms/page/page_list.vue';
export default[{
  path:'/cms',
  componemt:'Home',
  name:'CMS内容管理',
  hidden: false,
  children:[
    {path:'/cms/page/list',name: '页面列表',component:page_list,hidden: false},
    {path:'/cms/page/add',name: '添加页面',component:page_add,hidden: true},
    {path:'/cms/page/edit:pageId',name: '编辑页面',component:page_edit,hidden: true}
  ]
}]
//导入路由规则
import HomeRouter from '@/module/home/router'
import CmsRouter from '@/module/cms/router'
//合并路由规则
concat(HomeRouter)
concat(CmsRouter)
