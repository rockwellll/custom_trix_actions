import { Application } from "@hotwired/stimulus"
import Dropdown from "dropdown"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

application.register("dropdown", Dropdown)
export { application }
