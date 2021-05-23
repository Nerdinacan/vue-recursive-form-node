import config from "./config";

export default {
    render() {
        return this.$scopedSlots.default({
            config,
        });
    },
};
