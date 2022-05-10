import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../../../services/theme.service';

@Component({
  selector: 'app-menu-theme-menu-theme-dmla',
  templateUrl: './menu-theme-dmla.component.html',
  styleUrls: ['./menu-theme-dmla.component.scss']
})
export class MenuThemeDmlaComponent implements OnInit {

  public themeList: string[] = [];

  public themeSelected: string = null;

  constructor(public themeService: ThemeService) {
    this.themeService.listTheme$.subscribe((themeList: string[]) => {
      this.themeList = themeList;
    });
  }

  ngOnInit(): void {
    this.themeService.setQuizzesDMLAFromUrl();
  }

  selectTheme(theme: string): void {
    this.themeService.setTheme(theme);
  }
}
