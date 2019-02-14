/* global describe, it, before */

import chai from 'chai';
import sinon from 'sinon';
import createPlugin from '../src';
import mockStore from './mockStore';

let fake, store, plugin;

chai.expect();

const expect = chai.expect;
const context = describe;

const FS = {
  log: args => args
};

describe('createPlugin', () => {
  before(() => {
    fake = sinon.fake();
    sinon.stub(FS, 'log').callsFake(fake);
    store = mockStore;
    plugin = createPlugin(FS);
    plugin(store);
  });

  it('should call the Fullstory log method with supplied mutation', () => {
    let mutation = {
      payload: {
        key: 'value'
      }
    };

    expect(store.fire(mutation));
    expect(fake.callCount).to.equal(1);
    expect(fake.lastArg).to.equal(mutation);
  });

  context('when a sanitizer function is supplied', () => {

    const sanitizer = sinon.fake();

    beforeEach(() => {
      store = mockStore;
      plugin = createPlugin(FS, sanitizer);
      plugin(store);
    });

    it('should call that method before logging', () => {
      let mutation = {
        payload: {
          key: 'value'
        }
      };

      expect(store.fire(mutation));
      expect(fake.callCount).to.equal(2);
      expect(fake.lastArg).to.equal(mutation);

      expect(sanitizer.callCount).to.equal(1);
      expect(sanitizer.lastArg).to.equal(mutation);
    });
  });
});
