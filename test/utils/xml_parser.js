'use strict';

require('co-mocha');
const expect = require('chai').expect;

const Util = require('../../utils');

const INPUT_XML = '<a><b c="4" c="5" d="7">hello</b></a>';

describe('Unit Tests for Util.XmlParser', function () {
    describe('Testing Util.XmlParser.parseString', function () {
        it('CASE 1: Works correctly with default options', function* () {
            const result = yield Util.XmlParser.parseString(INPUT_XML);

            expect(result).to.deep.eql({
                a: {
                    b: {
                        _: 'hello',
                        c: '4',
                        d: '7'
                    }
                }
            });
        });

        it('CASE 2: Able to overwrite default options', function* () {
            const options = {
                explicitArray: true,
                mergeAttrs: false
            };
            const result = yield Util.XmlParser.parseString(INPUT_XML, options);

            expect(result).to.deep.eql({
                a: {
                    b: [
                        {
                            _: 'hello',
                            $: {
                                c: '4',
                                d: '7'
                            }
                        }
                    ]
                }
            });
        });
    });
});
