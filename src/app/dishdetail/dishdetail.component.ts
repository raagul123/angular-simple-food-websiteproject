import { Component, OnInit, Input ,Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { switchMap } from 'rxjs/operators';
import { DishService } from '../services/dish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { dishform } from '../shared/dishform';
import {Comment} from '../shared/comment'
import { visibility, expand } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    visibility(),
    expand()

  ]
})
export class DishdetailComponent implements OnInit {
  @ViewChild('dform') dishformDirective;
  visibility = 'shown';

  dishIds: string[];
  prev: string;
  next: string;
  dish:Dish;
  dishform: FormGroup;
  feedback: dishform;
  formErrors = {
    'name': '',
    'stars': '',
    'comment': '',
    
  };

  validationMessages = {
    'name': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Last Name is required.',
    },
    'stars': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
 };

 autoTicks = false;
  disabled = false;
  invert = false;
  max = 5;
  min = 0;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  value = 0;
  vertical = false;
  tickInterval = 1;
  errMess: string;
  dishcopy: Dish;


  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }
  }


  constructor(  private dishservice: DishService,  private route: ActivatedRoute,
    private location: Location,private fb: FormBuilder,@Inject('BaseURL') private baseURL) {
      this.createForm();
    
   }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds,errmess => this.errMess = <any>errmess);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(params['id']); }))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
      errmess => this.errMess = <any>errmess);
  }
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  
  goBack(): void {
    this.location.back();
  }
  createForm() {
    this.dishform = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      stars:[0,[Validators.required]],
      comment: ['', [Validators.required]],
    });
    this.dishform.valueChanges
    .subscribe(data => this.onValueChanged(data),errmess => this.errMess = <any>errmess);
  this.onValueChanged();
  }
    
onValueChanged(data?: any) {
  if (!this.dishform) { return; }
  const form = this.dishform;
  for (const field in this.formErrors) {
    if (this.formErrors.hasOwnProperty(field)) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  }
} 
commentt = new Comment;
  
  onSubmit() {
    this.feedback = this.dishform.value;
    console.log(this.feedback.stars)
    console.log(this.feedback.name)
    console.log(this.feedback.comment)
    this.commentt.author = this.feedback.name;
    this.commentt.rating = this.feedback.stars;
    this.commentt.comment = this.feedback.comment;
    this.commentt.date = Date()
    console.log(this.commentt)
    // this.dish.comments.push(this.commentt)
    this.dishcopy.comments.push(this.commentt);
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
    this.dishform.reset({
      name: '',
      stars:0,
      comment: '',
      
    });
    
    this.dishformDirective.resetForm();
  }
}
