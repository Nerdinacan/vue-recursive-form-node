<template>
    <main id="app">
        <ToolConfigProvider v-slot="{ config }">
            <div>
                <ToolFormNode v-model="result" :config="config" />
                <button @click="reset">Reset</button>
                <pre>{{ result }}</pre>
            </div>
        </ToolConfigProvider>
    </main>
</template>

<script>
import Vue from "vue";
import ToolConfigProvider from "./components/ToolConfigProvider";
import ToolFormNode from "./components/ToolFormNode";

export default {
    name: "App",
    components: {
        ToolConfigProvider,
        ToolFormNode,
    },
    data() {
        return {
            result: {},
        };
    },
    methods: {
        reset() {
            this.result = Vue.observable({});
        },
    },
};
</script>
