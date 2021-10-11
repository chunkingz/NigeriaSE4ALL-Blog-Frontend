import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {

  faArrowUp = faArrowUp;

  constructor() { }

  ngOnInit() {
  }

}
