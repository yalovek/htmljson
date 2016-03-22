const createNode = require('../index').createNode;
const assert = require('assert');

describe('createNode', function() {
    it('should return tag with text', function() {
        const json = {
            tag: 'text'
        };

        assert.equal('<tag>text</tag>', createNode(json).outerHTML);
    });

    it('should return tag with text, second variation', function() {
        const json = {
            tag: [
                'text'
            ]
        };

        assert.equal('<tag>text</tag>', createNode(json).outerHTML);
    });

    it('should return tag inside which tag with text', function() {
        const json = {
            tag: {
                tag: 'text'
            }
        };

        assert.equal('<tag><tag>text</tag></tag>', createNode(json).outerHTML);
    });

    it('should return tag with attribute', function() {
        const json = {
            tag: [
                {
                    attr: 'value'
                }
            ]
        };

        assert.equal('<tag attr="value"></tag>', createNode(json).outerHTML);
    });

    it('should return tag with text and attribute', function() {
        const json = {
            tag: [
                'text',
                {
                    attr: 'value'
                }
            ]
        };

        assert.equal('<tag attr="value">text</tag>', createNode(json).outerHTML);
    });

    it('should return tag with text and attribute, second variation', function() {
        const json = {
            tag: [
                {
                    attr: 'value'
                },
                'text'
            ]
        };

        assert.equal('<tag attr="value">text</tag>', createNode(json).outerHTML);
    });

    it('should return tag with attribute and inside which tag with text', function() {
        const json = {
            tag: [
                [
                    {
                        tag: 'text'
                    }
                ],
                {
                    attr: 'value'
                }
            ]
        };

        assert.equal('<tag attr="value"><tag>text</tag></tag>', createNode(json).outerHTML);
    });

    it('should return tag with attribute and inside which tag with text, second variation', function() {
        const json = {
            tag: [
                {
                    attr: 'value'
                },
                [
                    {
                        tag: 'text'
                    }
                ]
            ]
        };

        assert.equal('<tag attr="value"><tag>text</tag></tag>', createNode(json).outerHTML);
    });
});
