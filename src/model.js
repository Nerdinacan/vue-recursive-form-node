/**
 * Wrapper for a n input on the form node tree
 */

export class FormNodeInput {
    constructor(opts = {}) {
        const { type, name, ...props } = opts;
        this.key = FormNodeInput.counter++;
        Object.assign(this, { type, name, ...props });
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
        this.key = FormNode.counter++;
        this.children = children;
        this.inputs = inputs;
        Object.assign(this, props);
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
