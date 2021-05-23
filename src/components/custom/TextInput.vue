<template>
    <input type="text" v-model="localValue" />
</template>

<script>
export default {
    props: {
        value: { required: true },
        config: { type: Object, required: false, default: () => {} },
    },
    computed: {
        localValue: {
            get() {
                return this.value || this.config.defaultVal || null;
            },
            set(val) {
                this.$emit("input", val);
            },
        },
    },
};
</script>
