<template>
    <div>
        <input type="text" v-model="localValue" />
    </div>
</template>

<script>
export default {
    props: ["value"],
    computed: {
        // Vue won't forward its own v-model events properly
        // NOTE: change to a framework that respects its own API
        localValue: {
            get() {
                return this.value;
            },
            set(newVal) {
                this.$emit("input", newVal);
            },
        },
    },
};
</script>
