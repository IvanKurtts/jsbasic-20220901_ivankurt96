import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.elem.addEventListener('click', (event) => this.onClick(event));
  }

  render() {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
    this.keydownEventListener = (event) => this.onDocumentKeyDown(event);
    document.addEventListener('keydown', this.keydownEventListener);
    if (this.elem.querySelector('[autofocus]')) {
      this.elem.querySelector('[autofocus]').focus();
    }
  }

  onClick(event) {
    if (event.target.closest('.modal__close')) {
      event.preventDefault();
      this.close();
    }
  }

  onDocumentKeyDown(event) {
    if (event.code === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }

  setTitle(title) {
    this.elem.querySelector('.modal__title').textContent = title;
  }

  setBody(node) {
    this.elem.querySelector('.modal__body').innerHTML = '';
    this.elem.querySelector('.modal__body').append(node);
  }

  close() {
    document.removeEventListener('keydown', this._keydownEventListener);
    document.body.classList.remove('is-modal-open');
    this.elem.remove();
  }
}