const { Constants } = require('eris');

module.exports = class PermissionUtil {
  /**
   * Resolves the Permissions.
   * 
   * @param {Array<String>|string[]|number} permission The permissions.
   * @returns {number} The permission number.
   */
  static resolve(permission) {
    if (typeof permission === 'number' && permission >= 0) return permission;
    if (permission instanceof Array) return permission.map(p => this.resolve(p)).reduce((prev, p) => prev | p, 0);
    if (typeof permission === 'string') return Constants.permission[permission];
    throw new RangeError("Invalid permission, check the Eris docs. (https://abal.moe/Eris/docs)");
  }
};