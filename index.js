const { Plugin } = require('powercord/entities');
const { getModule } = require('powercord/webpack'); 

module.exports = class ShowBlockedMessages extends Plugin {
  async startPlugin () {
    const module = await getModule([ 'isBlocked' ]);
    this._oldHandler = module.isBlocked;
    module.isBlocked = () => false;
  }

  async pluginWillUnload () {
    if (!this._oldHandler) return;
    const module = await getModule([ 'isBlocked' ]);
    module.isBlocked = this._oldHandler;
  }
};
