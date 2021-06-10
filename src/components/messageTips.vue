<template>
  <transition name="el-fade-in">
    <div class="mask" v-if="show">
      <div class="message">
        <div class="message-box">
          <i class="message-icon" :class="'icon-'+type"></i>
          <span>{{message}}</span>
        </div>
        <a class="close" href="javascript:;" @click="close">
        </a>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: "MessageTips",
    data() {
      return {
        message: "成功了",
        duration: 2000,
        show: false,
        type: "success",
        timer: null
      };
    },
    methods: {
      close() {
        this.timer = null;
        this.show = false;
      }
    },
    mounted() {
      this.timer = setTimeout(() => {
        this.show = false;
      }, this.duration);
    },
    destroyed() {
      this.timer = null;
    }
  };
</script>

<style scoped>
  .mask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.3);
  }

  .mask .message {
    width: 396px;
    height: 160px;
    position: absolute;
    top: 15vh;
    left: 0;
    right: 0;
    margin: auto;
    box-sizing: border-box;
    padding: 60px 0;
    background: #ffff;
  }

  .mask .message-box {
    height: 40px;
    text-align: center;
  }

  .mask .message-box .message-icon {
    display: inline-block;
    width: 40px;
    height: 40px;
    box-sizing: border-box;
    vertical-align: middle;
    border-radius: 50%;
  }

  .mask .message-box .icon-success {
    border: 1px solid #51d163;
  }

  .mask .message-box .icon-error {
    /* background: url("./error_icon.png") no-repeat center; */
    background-color: red;
  }

  .mask .message-box span {
    font: 700 16px/40px "";
    padding-left: 12px;
  }

  .mask .message .close {
    width: 12px;
    height: 12px;
    position: absolute;
    top: 20px;
    right: 20px;
    /* background: url("./close_icon.png") no-repeat center; */
    background-color: blue;
  }
</style>