import {Controller} from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    defaultColor: {type: String, default: "#000000"},
    color: {type: String, default: "#000000"},
  }

  static classes = ["active", "inactive", "linkError"]
  static targets = ["backgroundColor", "textColor", "underlineColorPicker", "underlineColorPickerModal"]

  initialize() {
    this.allowSync = true
    this.setupTrix()
  }

  changeColor(e) {
    this.colorValue = e.detail
    if(this.backgroundColorTarget.contains(e.target)) {
      this.trixEditor.activateAttribute("backgroundColor", e.detail)
    } else if(this.textColorTarget.contains(e.target)) {
      this.trixEditor.activateAttribute("foregroundColor", e.detail)
    } else {
      this.trixEditor.activateAttribute("underlineColor", e.detail)
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

    Trix.config.textAttributes.underline = {
      style: { textDecoration: "underline" },
      parser: function(element) {
        return element.style.textDecoration === "underline"
      },
      inheritable: 1
    }

    Trix.config.textAttributes.underlineColor = {
      styleProperty: "text-decoration-color",
      inheritable: 1
    }

    this.trix = this.element.querySelector("trix-editor")
  }

  toggleUnderline() {
    if(this.trixEditor.attributeIsActive("underline")) {
      this.trixEditor.deactivateAttribute("underline")
    } else {
      this.trixEditor.activateAttribute("underline")
    }

    this.trix.focus()
  }

  sync() {
    if(this.trixEditor.attributeIsActive("underline")) {
      this.underlineColorPickerTarget.disabled = false
      this.underlineColorPickerTarget.classList.remove("text-gray-300")
    } else {
      this.underlineColorPickerTarget.disabled = true
      this.underlineColorPickerTarget.classList.add("text-gray-300")
    }
  }

  toggleUnderlineColorPicker() {
    const piece = this.trixEditorDocument.getPieceAtPosition(this.trixEditor.getPosition());

    if (piece.attributes.has("underline")) {
      const indexOfPiece = this.trixEditorDocument.toString().indexOf(piece.toString())
      const textRange = [indexOfPiece, indexOfPiece + piece.length]
      this.trixEditor.setSelectedRange(textRange)
    }

    this.underlineColorPickerModalTarget.classList.toggle("hidden")
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