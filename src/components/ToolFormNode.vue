<template>
    <section class="node">
        <h4>{{ config.label }}</h4>

        <div v-for="inputConfig in config.inputs" :key="inputConfig.key">
            <component
                :is="getComponentDef(inputConfig)"
                :config="inputConfig"
                :value="inputs[inputConfig.name]"
                @input="(val) => updateInputField(inputConfig, val)"
            />
        </div>

        <!-- <ToolFormNode
            v-for="child in config.children"
            :key="child.key"
            :config="child"
            :value="children[i]"
            @input="(val) => updateChild(child, val)"
        /> -->
    </section>
</template>

<script>
import Vue from "vue";
import deepmerge from "deepmerge";
import TextInput from "./custom/TextInput";
import { FormNode } from "./model";

// Array merge favors incoming arr
const opts = { arrayMerge: (target, source) => source };
const merge = (target, source) => deepmerge(target, source, opts);

// utils
const clone = (obj) => JSON.parse(JSON.stringify(obj));
const equivalent = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export default {
    name: "ToolFormNode",
    components: {
        TextInput,
    },
    props: {
        value: { type: Object, required: true },
        config: { type: FormNode, required: true },
    },
    computed: {
        defaultChildren() {
            return this.config.children.map(() => ({}));
        },
        inputs() {
            return { ...this.config.defaults, ...this.value.inputs };
        },
        localValue() {
            const inputs = { ...this.config.defaults, ...this.inputs };
            return { inputs };
        },
    },
    watch: {
        localValue: {
            immediate: true,
            handler(newVal, oldVal) {
                if (!equivalent(newVal, oldVal)) {
                    this.$emit("input", newVal);
                }
            },
        },
    },
    methods: {
        getComponentDef() {
            return "TextInput";
        },
        updateInputField(inputCfg, val) {
            const newVal = clone(this.localValue);
            newVal.inputs[inputCfg.name] = val;
            this.$emit("input", newVal);
        },
    },
};
</script>
