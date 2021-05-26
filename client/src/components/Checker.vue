<style lang="scss">
.vux-checker-item {
  display: inline-block;
}
</style>

<template>

    <div class="vux-checker-box">
        <slot></slot>
    </div>

</template>

<script>

export default {
    name: 'Checker',
    props: {
        defaultItemClass: String,
        selectedItemClass: String,
        disabledItemClass: String,
        type: {
            type: String,
            default: 'radio'
        },
        value: [String, Number, Array, Object],
        max: Number,
        radioRequired: Boolean
    },
    watch: {
        value(newValue) {
            this.currentValue = newValue
        },
        currentValue(val) {
            this.$emit('input', val)
            this.$emit('on-change', val)
        }
    },
    data() {
        return {
            currentValue: this.value
        }
    }
}

</script>
