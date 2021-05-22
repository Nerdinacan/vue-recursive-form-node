<template>
    <section class="node">
        <h4>{{ config.label }}</h4>

        <div v-for="input in config.inputs" :key="input.key">
            <component
                v-model="localValue.inputs[input.name]"
                :config="input"
                :is="getComponentDef(input)"
            />
        </div>

        <ToolFormNode
            v-for="(child, i) in config.children"
            :key="child.key"
            :config="child"
            :value="localValue.children[i]"
            @input="(val) => updateChild(i, val)"
        />
    </section>
</template>

<script>
import deepmerge from "deepmerge";
import { FormNode } from "../model";
import TextInput from "./custom/TextInput";

const overwriteArray = (destinationArray, sourceArray) => {
    return sourceArray;
};

const merge = (target, source) => {
    const opts = {
        arrayMerge: overwriteArray,
    };
    const result = deepmerge(target, source, opts);
    debugger;
    return result;
};

export default {
    name: "ToolFormNode",
    components: {
        TextInput,
    },
    props: {
        value: { required: false, default: () => {} },
        config: { type: FormNode, required: true },
    },
    computed: {
        defaultValue() {
            const children = this.config.children.map(() => ({}));
            const inputs = this.config.inputs.reduce((def, f) => {
                def[f.name] = f.default || null;
                return def;
            }, {});
            return { inputs, children };
        },
        localValue: {
            get() {
                return this.value;
            },
            set(val) {
                debugger;
                this.$emit("input", val);
            },
        },
    },
    methods: {
        getComponentDef() {
            return "TextInput";
        },
        updateChild(i, val) {
            debugger;
            this.$set(this.localValue.children, i, val);
        },
    },
};
</script>
