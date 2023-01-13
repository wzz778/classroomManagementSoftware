const sessionStorage = window.sessionStorage;
export class Storage {
  static getEditableTabs() {
    return sessionStorage.getItem('editableTabs')
  }

  static setEditableTabs(value = []) {
    return sessionStorage.setItem('editableTabs', JSON.stringify(value))
  }

  static removeEditableTabs() {
    return sessionStorage.removeItem('editableTabs')
  }

  static getEditableTabsValue() {
    return sessionStorage.getItem('editableTabsValue')
  }

  static setEditableTabsValue(value) {
    return sessionStorage.setItem('editableTabsValue', value)
  }

  static removeEditableTabsValue() {
    return sessionStorage.removeItem('editableTabsValue')
  }
}

