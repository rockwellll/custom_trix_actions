import {Controller} from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    bold: {type: Boolean, default: false},
    italic: {type: Boolean, default: false},
    defaultColor: {type: String, default: "#000000"},
    color: {type: String, default: "#000000"},
    fontSizes: Object,
    first_layout: { type: Boolean, default: false }
  }

  static classes = ["active", "inactive", "linkError"]
  static targets = ["backgroundColor", "textColor"]

  initialize() {
    this.allowSync = true
    this.setupTrix()
  }

  changeColor(e) {
    this.colorValue = e.detail
    if(this.backgroundColorTarget.contains(e.target)) {
      this.trixEditor.activateAttribute("backgroundColor", e.detail)
    } else {
      this.trixEditor.activateAttribute("foregroundColor", e.detail)
    }
  }

  connect() {
    this.element.classList.add(...this.inactiveClasses)
    this.element.classList.remove(...this.activeClasses)
  }

  setupTrix() {
    Trix.config.textAttributes.foregroundColor = {
      styleProperty: "color",
      inheritable: 1
    }

    Trix.config.textAttributes.backgroundColor = {
      styleProperty: "background-color",
      inheritable: 1
    }

    this.trix = this.element.querySelector("trix-editor")
  }

  get trixEditor() {
    return this.trix.editor
  }

  get trixEditorDocument() {
    return this.trix.editor.getDocument()
  }

  get fontSizeDropdownLabelContainer() {
    return this.element.querySelector('[data-custom-dropdown-target="placeholderText"]')
  }

  get currentState() {
    return {
      boldValue: this.boldValue,
      italicValue: this.italicValue,
      alignmentValue: this.alignmentInputTarget.value,
      color: this.colorValue,
      sizeValue: this.sizeValue,
      trix: this.trix
    }
  }
}