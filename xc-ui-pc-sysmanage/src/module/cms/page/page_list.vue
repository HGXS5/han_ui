<template>
  <div>
    <!-- 编写页面静态部分，即view部分-->
    <el-button type="primary" v-on:click="query" size="medium">查询</el-button>
    <el-table
      v-bind:data="list"
      style="width: 100%">
      <el-table-column
        prop="pageName"
        label="页面名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="pageAliase"
        label="别名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="pageWebPath"
        label="访问地址">
      </el-table-column>
      <el-table-column
        prop="pageParameter"
        label="物理路径">
      </el-table-column>
      <el-table-column
        prop="pageCreateTime"
        label="创建时间">
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="page">
          <el-button
            size="small" type="text"
            @click="edit(page.row.pageId)">编辑
          </el-button>
          <el-button
            size="small" type="text"
            @click="del(page.row.pageId)">删除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="发布" width="80">
        <template slot-scope="scope">
          <el-button
            size="small" type="primary" plain @click="postPage(scope.row.pageId)">发布
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--
    page-size:指的是每页显示条数为属性
    current-page:当前页数为属性
    current-change:当页码改变时，发生的事件方法
    -->
    <el-pagination
      background
      layout="prev, pager, next"
      v-bind:total="total"
      v-bind:page-size="this.params.size"
      v-bind:current-page="this.params.page"
      v-on:current-change="changePage"
      style="float:right"
    >
    </el-pagination>
    <router-link 
    class="mui-tab-item" 
    :to="{
        path:'/cms/page/add/',
        query:{
          page:this.params.page,
          siteId:this.params.siteId
        }
      }"
    >
      <el-button type="primary" size="small">新增页面</el-button>
    </router-link>
  </div>
</template>

<script>
  import * as cmsApi from '../api/cms'
  /*编写页面静态部分，即model及VM部分*/
  export default {
    data() {
      return {
        list: [],
        total: 50,
        params: {
          page: 1,
          size: 10
        }
      }
    },
    methods: {
      //分页查询
      changePage: function () {
        this.query()
      },
      query: function () {
        cmsApi.page_list(this.params.page, this.params.size, this.params).then((res) => {
          this.total = res.queryResult.total
          this.list = res.queryResult.list
        })
      },
      edit:function(pageId){
          this.$router.push({
            path:'/cms/page/edit/'+pageId,
            query:
            {
            page:this.params.page,
            siteId:this.params.siteId
            }
          })
      },
      del(){
        this.confrim('确定删除此页面吗？','提示',{}).then(() => {
          cmsApi.page_del(pageId).then((res) => {
            if(res.success){
              this.$message({
                type:'success',
                message:'删除成功'
              });
              //查询页面
              this.query()
            }else{
              this.$message({
                type:'error',
                message:'删除失败'
              })
            }
          })
        })
      },
      postPage(id){
        this.$confrim('确认发布该页面吗？','提示',{}).then(() => {
          cmsApi.page_postPage(id).then((res) => {
            if(res.success){
              console.log('发布成功id='+id);
              this.$message.success('发布成功,请稍后查看结果');
            }else{
              this.$message.error('发布失败');
            }
          });
        }).catch(() => {
          
        })
      }
    },
    
    mounted() {
      //钩子方法，首先执行
      this.query()
    }
    
  }

</script>

<style scoped>
  /*编写页面样式，即css部分*/
</style>
