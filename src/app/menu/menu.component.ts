import { Component, OnInit ,Inject  } from '@angular/core';
import { Dish } from '../shared/dish';
import {DishService} from '../services/dish.service';
import { flyInOut, expand } from '../animations/app.animation';

declare var $: any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()

    ]
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  selectedDish: Dish;
  errMess: string;

  constructor(private dishservice:DishService,@Inject('BaseURL') private baseURL  ) {
   }

  ngOnInit() {
    this.dishservice.getDishes()
      .subscribe(dishes => this.dishes = dishes,      errmess => this.errMess = <any>errmess);
}
  onSelect(dish: Dish) {
    this.selectedDish = dish;
    console.log(this.selectedDish)
  }
  

}
// $('iframe').attr('src', 'src="https://drive.google.com/file/d/1ksyK3op12QlXmG9AmDvK0gZtQ8Tv-jKW/preview"');
