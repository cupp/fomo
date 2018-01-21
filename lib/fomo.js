'use babel';

import FomoView from './fomo-view';
import { CompositeDisposable } from 'atom';

export default {

  fomoView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.fomoView = new FomoView(state.fomoViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.fomoView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'fomo:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.fomoView.destroy();
  },

  serialize() {
    return {
      fomoViewState: this.fomoView.serialize()
    };
  },

  toggle() {
    console.log('Fomo was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
