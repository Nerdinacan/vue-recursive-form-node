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
import ToolConfigProvider from "@/components/ToolConfigProvider";
import ToolFormNode from "@/components/ToolFormNode";

const result = {
    inputs: {
        foo: "abc",
        bar: 123,
    },
    children: [{ blech: false, hooba: 222323 }],
};

export default {
    components: {
        ToolConfigProvider,
        ToolFormNode,
    },
    data() {
        return {
            result,
        };
    },
    methods: {
        reset() {
            this.result = {};
        },
    },
};
</script>
