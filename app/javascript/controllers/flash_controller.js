import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['source'];

  connect() {
    setTimeout(() => {
      this.dismiss();
    }, 5000);
  }

  dismiss() {
    this.sourceTarget.remove();
  }
}
