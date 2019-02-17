/* global describe, it, before */

import chai from 'chai';
import sinon from 'sinon';
import createPlugin from '../src';
import mockStore from './mockStore';

const expect = chai.expect;
const context = describe;

const FS = {
  log: args => args
};

let stub, store, plugin;

chai.expect();

describe('createPlugin', () => {
  before(() => {
    global.window = { FS };
    FS.log = stub = sinon.stub();
    store = mockStore;
    plugin = createPlugin();
    plugin(store);
  });

  it('should call the Fullstory log method with supplied mutation', () => {
    let mutation = {
      payload: {
        key: 'value'
      }
    };

    expect(store.fire(mutation));
    expect(stub.callCount).to.equal(1);
    expect(stub.calledWith(mutation));
  });

  context('when window.FS is not defined', () => {

    before(() => {
      global.window = {};
      FS.log = stub = sinon.stub();
    });

    it('does nothing', () => {
      let mutation = {
        payload: {
          key: 'value'
        }
      };

      expect(store.fire(mutation));
      expect(stub.callCount).to.equal(0);
    });

  });

  context('when a sanitizer function is supplied', () => {

    const sanitizer = sinon.fake();

    before(() => {
      global.window = { FS };
      FS.log = stub = sinon.stub();
      store = mockStore;
      plugin = createPlugin(sanitizer);
      plugin(store);
    });

    it('should call that method before logging', () => {
      let mutation = {
        payload: {
          key: 'value'
        }
      };

      expect(store.fire(mutation));
      expect(stub.callCount).to.equal(1);
      expect(stub.getCall(0).args[0]).to.equal('mutation');
      expect(stub.getCall(0).args[1]).to.equal(mutation);

      expect(sanitizer.callCount).to.equal(1);
      expect(sanitizer.lastArg).to.equal(mutation);
    });
  });
});
