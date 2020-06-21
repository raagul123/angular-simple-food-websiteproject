import { Component, OnInit, Inject } from '@angular/core';
import {LeaderService} from '../services/leader.service'
import {Leader} from '../shared/leader'
import { flyInOut, expand } from '../animations/app.animation';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()

    ]

})
export class AboutComponent implements OnInit {
  leaders:Leader[];
  errMess: string;
  constructor(private leaderservice:LeaderService,@Inject('BaseURL') private baseURL) {
   }

  ngOnInit() {
    this.leaderservice.getLeader().subscribe(leaders => this.leaders = leaders,errmess => this.errMess = <any>errmess);
  }

}
