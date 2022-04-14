import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../../services/theme.service';

@Component({
  selector: 'app-menu-theme',
  templateUrl: './menu-theme.component.html',
  styleUrls: ['./menu-theme.component.scss']
})
export class MenuThemeComponent implements OnInit {

  public themeList: string[] = [];

  public themeSelected: string = null;

  constructor(public themeService: ThemeService) {
    this.themeService.listTheme$.subscribe((themeList: string[]) => {
      this.themeList = themeList;
    });
  }

  ngOnInit(): void {
  }

  selectTheme(theme: string): void {
    this.themeService.setTheme(theme);
  }
}
