/**
 * Wrapper for an input on the form node tree
 */

export class FormNodeInput {
    constructor(opts = {}) {
        const { name, type = String, defaultVal = String(), ...props } = opts;
        Object.assign(this, { name, type, defaultVal, ...props });
        this.key = `input_${FormNodeInput.counter++}`;
    }
}

FormNodeInput.counter = 0;

FormNodeInput.create = (props) => Object.freeze(new FormNodeInput(props));

/**
 * Form configuration node
 */

export class FormNode {
    constructor(opts = {}) {
        const { inputs = [], children = [], ...props } = opts;
        this.children = children;
        this.inputs = inputs;
        Object.assign(this, props);
        this.key = `node_${FormNode.counter++}`;
    }

    get defaults() {
        return this.inputs.reduce((def, inputCfg) => {
            def[inputCfg.name] = inputCfg.defaultVal || null;
            return def;
        }, {});
    }

    createInput(props) {
        const newInput = FormNodeInput.create(props);
        this.inputs.push(newInput);
        return newInput;
    }

    createChild(props = {}) {
        const newChild = FormNode.create(props);
        this.children.push(newChild);
        return newChild;
    }
}

FormNode.counter = 0;

FormNode.create = (props) => Object.freeze(new FormNode(props));
