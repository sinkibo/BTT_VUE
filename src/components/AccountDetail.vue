<template>
  <div class="dialog">
      <!--外层的遮罩 点击事件用来关闭弹窗，isShow控制弹窗显示 隐藏的props-->
      <div class="dialog-cover"  v-if="isShow"  @click="closeMyself"></div>
      <!-- transition 这里可以加一些简单的动画效果 -->
      <transition name="drop">
         <!--style 通过props 控制内容的样式  -->
        <div class="dialog-content" :style="{top:topDistance+'%',width:widNum+'%',left:leftSite+'%'}"  v-if="isShow">
          <div class="dialog_head">
             <!--弹窗头部 title-->
              <slot name="header">提示信息</slot>
          </div>
          <div class="dialog_main" :style="{paddingTop:pdt+'px',paddingBottom:pdb+'px'}">
            <!--弹窗的内容-->
            <slot name="main">弹窗内容</slot>
          </div>
          <!--弹窗关闭按钮-->
          <div class="foot_close" @click="closeMyself">
              <Icon type="md-close" style="transform: scale(2)"></Icon>
          </div>
        </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class AccountDetail extends Vue {
    @Prop({type:Boolean,default: false,required: true}) isShow: Boolean | any;
    @Prop({type: Number,default: 86.5}) widNum: Number | any;
    @Prop({type: Number,default: 6.5}) leftSite: Number | any;
    @Prop({type: Number,default: 15}) topDistance: Number | any;
    @Prop({type: Number,default: 0}) pdt: Number | any;
    @Prop({type: Number,default: 47}) pdb: Number | any;

    closeMyself () {
        this.$emit('on-close')
    }
    
}
</script>

<style scoped>
  .dialog {
    position: relative;
    color:  #d85697;;
    font-size: 16px;
  }
  .dialog-cover {
    background: rgba(0,0,0, 0.8);
    position: fixed;
    z-index: 200;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .dialog-content{
    position: fixed;
    top: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 300;
 }
 .dialog_head{
    width: 50%;
    height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
 }
 .dialog_main {
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-content: center;
    width: 50%;
    padding: 22px 0 47px 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .foot_close {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #fcca03;
    display: grid;
    justify-content: center;
    align-content: center;
    margin-top: -25px;
  }
</style>