/**
 * --------------------------------------------------------------------------
 * Bootstrap Italia (https://italia.github.io/bootstrap-italia/)
 * Authors: https://github.com/italia/bootstrap-italia/blob/main/AUTHORS
 * Licensed under BSD-3-Clause license (https://github.com/italia/bootstrap-italia/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

const DATA_MOUSE_FOCUS = 'data-focus-mouse'

class TrackFocus {
  private _usingMouse: boolean
  private _element: HTMLElement;

  constructor(element: HTMLElement) {
    this._usingMouse = false
    this._element = element
    this._bindEvents()
  }

  // Private
  _bindEvents() {
    if (typeof this._element === 'undefined') {
      return
    }
    const events = ['keydown', 'mousedown']
    events.forEach((evtName) => {
      this._element.addEventListener(evtName, (evt) => {
        this._usingMouse = evt.type === 'mousedown'
      })
    })
    this._element.addEventListener('focusin', (evt) => {
      if (this._usingMouse) {
        if (evt.target) {
          (<HTMLElement>evt.target).setAttribute(DATA_MOUSE_FOCUS, "true")
        }
      }
    })
    this._element.addEventListener('focusout', (evt) => {
      if (evt.target) {
        (<HTMLElement>evt.target).setAttribute(DATA_MOUSE_FOCUS, "false")
      }
    })
  }
}

export default TrackFocus