const document = require('jsdom').jsdom();
const getTag = (node) => Object.keys(node).reduce((result, key) => key);
const getContent = (node) => {
    return Object.keys(node).reduce((result, key) => {
        if (typeof node[key] === 'object' && !Array.isArray(node[key])) {
            return [[node[key]]];
        }
        else {
            return [].concat(node[key]).reduce((result, value) => {
                result.push(value);

                return result;
            }, []);
        }
    }, []);
};
const getAttrs = (node) => {
    return Object.keys(node).reduce((result, key) => {
        const array = node[key];

        return Array.isArray(array) && array.reduce((result, content) => {
            if (!Array.isArray(content) && typeof content === 'object') {
                Object.keys(content).map((key) => result[key] = content[key]);
            }

            return result;
        }, {});
    }, {});
};
const setAttrs = (attrs, node) => {
    Object.keys(attrs).forEach((key) => {
        if (typeof attrs[key] === 'function') {
            node[key] = attrs[key];
        } else {
            node.setAttribute(key, attrs[key]);
        }
    });
};
const createNode = (json) => {
    const tag = getTag(json);
    const node = document.createElement(tag);
    const content = getContent(json);
    const attrs = getAttrs(json);

    content.forEach((data) => {
        if (typeof data === 'string') {
            node.appendChild(document.createTextNode(data));
        }
        else if (Array.isArray(data)) {
            data.forEach((object) => {
                node.appendChild(createNode(object));
            });
        }
    });

    attrs && setAttrs(attrs, node);

    return node;
};

exports.createNode = createNode;
