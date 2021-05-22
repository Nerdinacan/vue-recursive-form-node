import { FormNode } from "../model";

const config = FormNode.create({ label: "root" });
config.createInput({ name: "foo", type: String, default: String("abcd") });
config.createInput({ name: "bar", type: Number, default: Number(123) });

const child = config.createChild({ label: "child section" });
child.createInput({ name: "blech", type: Boolean, default: false });
child.createInput({ name: "hooba", type: Number, default: Number(3434) });

export default config;
