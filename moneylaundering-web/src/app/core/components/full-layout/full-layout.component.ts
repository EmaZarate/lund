import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, RouterState, Router } from '@angular/router';
import { Menu, ScrollService } from '@sc/portal.fe.lib.ui-core-components';

@Component({
  selector: 'sc-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent implements OnInit, AfterViewInit {
  menu: Menu;
  defaultItemId = 'navbar-menu-item-route-';
  constructor(
    private route: ActivatedRoute,
    private scrollService: ScrollService,
    private router: Router
  ) {
    this.route.data.subscribe(data => this.menu = data.menu);

  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.onItemClicked(this.defaultItemId + this.router.routerState.snapshot.url);
  }

  onMenuToggle(isOpen: boolean) {
    isOpen ? this.scrollService.disableViewportScroll() : this.scrollService.enableViewportScroll();
  }
  onItemClicked(id){
    this.menu.items.forEach(item => {
      let selected = document.getElementById(item.id);
      if(selected.classList.contains('menuSelected')){
        selected.classList.remove('menuSelected');
      }
    });
    document.getElementById(id).classList.add('menuSelected');
  }
}
