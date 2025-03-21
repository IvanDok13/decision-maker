import { AppController } from '../controller/app-controller';
import { isNotNullable } from '../utils/utils';

export class App {
  public parentElement: HTMLBodyElement;
  public appController: AppController;
  constructor() {
    this.parentElement = isNotNullable(document.querySelector('body'));
    this.appController = new AppController();
  }

  public createGamePage(): void {
    this.clearParentElement();

    this.parentElement.prepend(
      this.appController.getHeader(),
      this.appController.getMain(), //TODOO
      this.appController.getFooter()
    );
  }
  public createStartPage(): void {
    this.parentElement.append(
      this.appController.getHeader(),
      this.appController.getMain(), //TODOO
      this.appController.getFooter()
    );
  }

  private clearParentElement(): void {
    this.parentElement.replaceChildren();
  }
}
