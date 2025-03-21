import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';
import { MainSec } from '../components/main/main-sec';

export class AppController {
  public header: Header;
  public footer: Footer;
  public main: MainSec;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.main = new MainSec();
  }

  public getHeader(): HTMLElement {
    return this.header.getComponent();
  }

  public getFooter(): HTMLElement {
    return this.footer.getComponent();
  }

  public getMain(): HTMLElement {
    return this.main.getComponent();
  }
}
