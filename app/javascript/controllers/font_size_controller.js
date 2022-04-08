import {Controller} from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input"]
  static values = {
    size: { type: Number, default: 14 }
  }

  onKeyPress(e) {
    console.log(e.key)
    if(e.key === "Enter") {
      e.preventDefault()
      this.submit()
      console.log("submitting")
    }
  }

  increase() {
    this.dispatch("change", {
      detail: new Font(++this.sizeValue),
    })
  }

  decrease() {
    this.dispatch("change", {
      detail: new Font(--this.sizeValue)
    })
  }

  sync({ detail: fontSizeString }) {
    this.sizeValue = Font.rawNumberFrom(fontSizeString)
  }

  // private

  submit() {
    this.sizeValue = this.inputTarget.value
    this.dispatch("change", {
      detail: new Font(this.sizeValue),
    })
  }

  sizeValueChanged() {
    this.inputTarget.value = this.sizeValue
  }
}

class Font {
  constructor(size) {
    this.size = size
  }

  get rem() {
    return `${this.size * 0.0625}rem`
  }

  get px() {
    return `${this.size}px`
  }

  static rawNumberFrom(fontSizeString) {
    return Number.parseInt(fontSizeString)
  }
}