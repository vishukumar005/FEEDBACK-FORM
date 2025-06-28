import { Component } from '@angular/core';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';


@Component({
  selector: 'app-root',
  imports: [FeedbackFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FEEDBACK-FORM';
}
