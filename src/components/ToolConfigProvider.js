import config from "../testdata/testToolConfig";

export default {
    render() {
        return this.$scopedSlots.default({
            config,
        });
    },
};
