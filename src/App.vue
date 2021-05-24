<template>
    <main id="app">
        <ToolFormNode v-model="result" :node="config" />
        <pre>{{ result }}</pre>
    </main>
</template>

<script>
import Vue from "vue";
import ToolFormNode from "./components/ToolFormNode";
import { config } from "./testConfig";

export default {
    name: "App",
    components: {
        ToolFormNode,
    },
    data() {
        return {
            result: {},
        };
    },
    computed: {
        config() {
            return config;
        },
    },
    methods: {
        reset() {
            this.result = Vue.observable({});
        },
    },
};
</script>
