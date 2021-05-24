<template>
    <section class="node">
        <h4>{{ node.label }}</h4>

        <div class="fields">
            <component
                v-for="field in node.fields"
                :key="field.key"
                :is="getComponentDef(field)"
                v-model="fieldValues[field.name]"
            />
        </div>

        <ToolFormNode
            v-for="(childNode, i) in node.children"
            :key="childNode.key"
            v-model="childFieldValues[i]"
            :node="childNode"
        />
    </section>
</template>

<script>
import deepmerge from "deepmerge";
import TextInput from "./TextInput";
import { FormNode } from "../model";

// Array merge favors incoming arr
const opts = { arrayMerge: (target, source) => source };
const merge = (target, source) => deepmerge(target, source, opts);

// utils
const equivalent = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export default {
    name: "ToolFormNode",
    components: {
        TextInput,
    },
    props: {
        value: { type: Object, required: true },
        node: { type: FormNode, required: true },
    },
    data() {
        return {
            fieldValues: this.node.defaultFieldValues,
            childFieldValues: this.node.children.map((f) => f.defaultFieldValues),
        };
    },
    computed: {
        localValue() {
            const newValue = { ...this.fieldValues, children: this.childFieldValues };
            return merge(this.value, newValue);
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
    },
};
</script>
