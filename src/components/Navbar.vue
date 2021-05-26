<style lang="less">
@navbar-height: 40px;
@navbar-center-width: 50%;
@navbar-border-color: #b2b2b2;
.m-navbar {
  height: @navbar-height;
  position: relative;
  display: flex;
  &:after {
    content: "";
    position: absolute;
    z-index: 2;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid @navbar-border-color;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }
  &.navbar-fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }
}

.navbar-item {
  flex: 0 0 (100% - @navbar-center-width) / 2;
  padding: 0 15px;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  align-items: center;
  color: inherit;
  &:first-child {
    order: 1;
    margin-right: -(100% - @navbar-center-width) / 2;
  }
  &:last-child {
    order: 3;
    justify-content: flex-end;
    > a {
      justify-content: flex-end;
    }
  }
  > a {
    display: flex;
    align-items: center;
    height: @navbar-height;
    min-width: (100% - @navbar-center-width) / 2;
    /* for low version android */
    flex: 1;
  }
}

.navbar-center-box {
  order: 2;
  height: @navbar-height;
  width: @navbar-center-width;
  margin-left: (100% - @navbar-center-width) / 2;
  .navbar-center {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: inherit;
    .center-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    img {
      height: 60%;
    }
  }
}
</style>

<template>

    <header class="m-navbar navbar-bottom-line-color" :class="classes" :style="{backgroundColor: bgcolor, height: height}">
        <div class="navbar-item">
            <slot name="left"></slot>
        </div>
        <div class="navbar-center-box" :style="{height: height}">
            <div class="navbar-center">
                <slot name="center">
                    <span class="center-title" :style="{color: color, fontSize: fontsize}">{{title}}</span>
                </slot>
            </div>
        </div>
        <div class="navbar-item">
            <slot name="right"></slot>
        </div>
    </header>

</template>

<script>

export default {
    name: 'yd-navbar',
    props: {
        title: String,
        fixed: Boolean,
        bgcolor: {
            default: '#2E2E2E'
        },
        color: {
            default: '#fff'
        },
        fontsize: {
            validator(value) {
                return /^(\.|\d+\.)?\d+(px|rem)$/.test(value)
            },
            default: '18px'
        },
        height: {
            validator(value) {
                return /^(\.|\d+\.)?\d+(px|rem)$/.test(value)
            },
            default: '40px'
        }
    },
    computed: {
        classes() {
            return this.fixed ? 'navbar-fixed' : ''
        }
    }
}

</script>
