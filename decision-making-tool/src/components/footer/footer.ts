import { createElementWithProperties } from '../../utils/utils';
import styles from './footer.module.css';

export class Footer {
  public element: HTMLElement;
  private githubLink: string;
  private RSLink: string;

  constructor() {
    this.githubLink = 'https://github.com/IvanDok13';
    this.RSLink = 'https://github.com/rolling-scopes-school/tasks/tree/master/stage1';
    this.element = createElementWithProperties('footer', styles.footer);

    this.createChildren();
  }

  public getComponent(): HTMLElement {
    return this.element;
  }

  private createChildren(): void {
    const footerWrapper = createElementWithProperties('div', styles.footerWrapper);

    const linkGithub = createElementWithProperties('a', styles.footerLink, { href: `${this.githubLink}` }, [
      { innerText: 'IvanDok' },
    ]);
    const githubImg = createElementWithProperties('span', styles.footerImgGithub);

    const linkRS = createElementWithProperties('a', styles.footerLink, {
      href: `${this.RSLink}`,
      'aria-label': 'link to RS School',
    });
    const rsImg = createElementWithProperties('span', styles.footerImgRs);

    linkGithub.append(githubImg);
    linkRS.append(rsImg);
    footerWrapper.append(linkGithub, linkRS);

    this.element.append(footerWrapper);
  }
}
