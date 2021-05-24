import { FormNode } from "./model";

export const config = new FormNode({ label: "root" });
config.addField({ name: "foo", type: String, defaultVal: "abc" });

const child = config.addChild({ label: "child" });
child.addField({ name: "bar", type: Number, defaultVal: 2123 });
child.addField({ name: "blech", type: Number, defaultVal: 4444 });

const grandChild = child.addChild({ label: "grandChild" });
grandChild.addField({ name: "hooba", type: Number, defaultVal: 2123 });
