/**
 * Wrapper for an input on the form node tree
 * Used to figure out default values for an individual parameter and for determining what kind of
 * component to display on the page at its location in the tree.
 */

class Field {
    constructor(opts = {}) {
        const { name, type = String, defaultVal = String(), key, ...props } = opts;
        Object.assign(this, { name, type, defaultVal, ...props });
        this.key = key || `input_${Field.instanceCounter++}`;
    }
}

Field.instanceCounter = 0;

/**
 * Form configuration node
 * A collection of field definitions and a child array for subsections
 */

export class FormNode {
    constructor(opts = {}) {
        const { fields: fieldProps = [], children: childProps = [], label = "", ...props } = opts;
        const fields = fieldProps.map((props) => new Field(props));
        const children = childProps.map((props) => new FormNode(props));
        const key = `node_${FormNode.instanceCounter++}`;
        Object.assign(this, { fields, children, key, label, ...props });
    }

    get defaultFieldValues() {
        return this.fields.reduce((defaults, field) => {
            return { ...defaults, [field.name]: field.defaultVal };
        }, {});
    }

    addField(props) {
        const field = new Field(props);
        this.fields.push(field);
        return field;
    }

    addChild(props = {}) {
        const newChild = new FormNode(props);
        this.children.push(newChild);
        return newChild;
    }
}

FormNode.instanceCounter = 0;
