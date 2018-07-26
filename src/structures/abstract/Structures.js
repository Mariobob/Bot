const structures = {
  Guild: require('eris').Guild,
  Message: require('eris').Message,
  TextChannel: require('eris').TextChannel
};

module.exports = class Structures {
  constructor() {
    throw new Error(`The '${this.constructor.name}' class may not be extended.`);
  }

  static get(structure) {
    if (typeof structure === 'string') return structures[structure];
    throw new TypeError(`"structure" argument => string (Received ${typeof structure}`);
  }

  static extend(struture, extender) {
    if (!structures[struture]) throw new RangeError(`"${struture}" is not a valid Eris structure. Check the GitHub repository.`);
    if (typeof extender !== 'function') {
      let received = `(received ${typeof extender})`;
      throw new TypeError(`"extender" argument must be an function. ${received}`);
    }

    const extended = extender(structures[structure]);
    if (typeof extended !== 'function') throw new TypeError('Extender function must return the Structure.');
    if (Object.getPrototypeOf(extended) !== structures[structure]) throw new Error('Must be an existing class.');

    structures[struture] = extended;
    return extended;
  }
};