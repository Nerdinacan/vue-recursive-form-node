import { FormNode } from "./model";

const config = FormNode.create({ label: "root" });
config.createInput({ name: "foo", type: String, defaultVal: String("abcd") });
config.createInput({ name: "bar", type: Number, defaultVal: Number(123) });

const child = config.createChild({ label: "child section" });
child.createInput({ name: "blech", type: Boolean, defaultVal: false });
child.createInput({ name: "hooba", type: Number, defaultVal: Number(3434) });

export default config;
