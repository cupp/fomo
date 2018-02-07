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

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'fomo:equivales': () => this.equivales(),
      'fomo:notEquivales': () => this.notEquivales(),
      'fomo:notEquals': () => this.notEquals(),
      'fomo:conjunction': () => this.conjunction(),
      'fomo:disjunction': () => this.disjunction(),
      'fomo:assignment': () => this.assignment(),
      'fomo:genQuant': () => this.genQuant(),
      'fomo:uniQuant': () => this.uniQuant(),
      'fomo:exiQuant': () => this.exiQuant(),
      'fomo:atLeast': () => this.atLeast(),
      'fomo:atMost': () => this.atMost(),
      'fomo:boom': () => this.boom(),
      'fomo:negation': () => this.negation(),
      'fomo:implies': () => this.implies(),
      'fomo:notImplies': () => this.notImplies(),
      'fomo:follows': () => this.follows(),
      'fomo:notFollows': () => this.notFollows(),
      'fomo:integer': () => this.integer(),
      'fomo:natural': () => this.natural(),
      'fomo:rational': () => this.rational(),
      'fomo:real': () => this.real(),
      'fomo:bool': () => this.bool()
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
  },

  equivales() {
    atom.workspace.getActiveTextEditor().insertText('≡');
  },

  notEquivales() {
    atom.workspace.getActiveTextEditor().insertText('≢');
  },

  notEquals() {
    atom.workspace.getActiveTextEditor().insertText('≠');
  },

  implies() {
    atom.workspace.getActiveTextEditor().insertText('⇒');
  },

  notImplies() {
    atom.workspace.getActiveTextEditor().insertText('⇏');
  },

  follows() {
    atom.workspace.getActiveTextEditor().insertText('⇐');
  },

  notFollows() {
    atom.workspace.getActiveTextEditor().insertText('⇍');
  },

  assignment() {
    atom.workspace.getActiveTextEditor().insertText('≔');
  },

  genQuant() {
    atom.workspace.getActiveTextEditor().insertText('★');
  },

  uniQuant() {
    atom.workspace.getActiveTextEditor().insertText('∀');
  },

  exiQuant() {
    atom.workspace.getActiveTextEditor().insertText('∃');
  },

  atLeast() {
    atom.workspace.getActiveTextEditor().insertText('≤');
  },

  atMost() {
    atom.workspace.getActiveTextEditor().insertText('≥');
  },

  boom() {
    atom.workspace.getActiveTextEditor().insertText(' ╱╱\n');
  },

  negation() {
    atom.workspace.getActiveTextEditor().insertText('¬');
  },

  disjunction() {
    atom.workspace.getActiveTextEditor().insertText('⋁');
  },

  conjunction() {
    atom.workspace.getActiveTextEditor().insertText('⋀');
  },

  integer() {
    atom.workspace.getActiveTextEditor().insertText('ℤ');
  },

  natural() {
    atom.workspace.getActiveTextEditor().insertText('ℕ');
  },

  rational() {
    atom.workspace.getActiveTextEditor().insertText('ℚ');
  },

  real() {
    atom.workspace.getActiveTextEditor().insertText('ℝ');
  },

  bool() {
    atom.workspace.getActiveTextEditor().insertText('𝔹');
  }


};
