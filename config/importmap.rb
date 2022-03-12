# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.js"
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"

pin "iro", to: "https://cdn.jsdelivr.net/npm/@jaames/iro@5.5.2/dist/iro.min.js"
pin "trix"
pin "@rails/actiontext", to: "actiontext.js"
pin "dropdown", to: "https://cdn.jsdelivr.net/npm/tailwindcss-stimulus-components@3.0.4/src/dropdown.min.js"