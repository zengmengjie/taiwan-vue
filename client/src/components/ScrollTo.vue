<template>
    <span class="scroll-to" :class="{ 'scroll-top': isPreset }" v-show="isShow" @click="scrollTo">
        <slot>
            <span class="icon">
                <i class="fa" :class="[iconClass]"></i>
            </span>
        </slot>
    </span>
</template>
<script>
import jump from '@/utils/jump'
import utils from '@/utils/scroll'
export default {
    props: {
        target: String,
        offset: {
            type: Number,
            default: 500
        },
        duration: {
            type: Number,
            default: 500
        },
        distance: Number
    },
    data() {
        return {
            isShow: true
        }
    },
    computed: {
        targetEl() {
            if (this.target === 'top') {
                return document.body
            } else if (this.distance) {
                return this.distance
            }
            return this.target
        },
        isPreset() {
            if (this.target === 'top' || this.target === 'bottom') {
                this.isShow = false
                return true
            }
            return false
        },
        iconClass() {
            if (this.target === 'bottom') return 'el-icon-arrow-down'
            return 'el-icon-arrow-up'
        }
    },
    methods: {
        handleScroll() {
            this.isShow = utils.getScroll(window, true) > this.offset
        },
        scrollTo() {
            jump(this.targetEl, {
                duration: this.duration
            })
        }
    },
    mounted() {
        if (this.isPreset) {
            window.addEventListener('scroll', this.handleScroll)
        }
    },
    beforeDestroy() {
        if (this.isPreset) {
            window.removeEventListener('scroll', this.handleScroll)
        }
    }
}
</script>
