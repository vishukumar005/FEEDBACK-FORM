


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.scss'
})
export class FeedbackFormComponent implements OnInit {
  feedback = {
    name: '',
    email: '',
    feedback: '',
  };

  submitted = false;
  feedbackList: any[] = [];
  lastSubmittedFeedBack: any = null;

  ngOnInit() {
    const saved = localStorage.getItem('feedbackList');
    if (saved) {
      this.feedbackList = JSON.parse(saved);
    }
  }

  onSubmit(form: any) {
    if (!form.valid) return;

    // Add timestamp
    const newFeedback = {
      ...this.feedback,
      submittedAt: new Date().toLocaleString()
    };

    // Update list
    this.feedbackList.push(newFeedback);

    // Save to localStorage
    localStorage.setItem('feedbackList', JSON.stringify(this.feedbackList));

    // Reset UI
    this.lastSubmittedFeedBack = {...this.feedback};
    this.submitted = true;
    setTimeout(() => {
      this.submitted = false;
      this.lastSubmittedFeedBack = null;
    }, 5000); 
    form.resetForm();
    this.feedback = { name: '', email: '', feedback: '' };
  }

  exportToExcel() {
    if (this.feedbackList.length === 0) {
      alert('No feedback entries to export!');
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(this.feedbackList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Feedbacks');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(data, 'feedbacks.xlsx');
  }

  clearFeedbacks() {
    if (confirm("Are you sure you want to delete all feedbacks?")) {
      this.feedbackList = [];
      localStorage.removeItem('feedbackList');
      this.submitted = false;
      this.lastSubmittedFeedBack = null;
    }
  }
}


