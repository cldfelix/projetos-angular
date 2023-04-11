import {Component, OnInit} from '@angular/core';
import {IssuesService} from "../issues.service";
import {Issue} from "../issue";
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit{
  showReportIssue = false;
  selectedIssue: Issue | null = null;


  constructor(private issueService: IssuesService) {
  }
  ngOnInit(): void {
    this.getIssues()
  }

  issues: Issue[] = [];
  private getIssues() {
    this.issues =
      this.issueService.getPendingIssues();
  }

  onCloseReport() {
    this.showReportIssue = false;
    this.getIssues();
  }

  onConfirm(confirmed: boolean) {

    if (confirmed && this.selectedIssue) {
      this.issueService.completeIssue(this.selectedIssue);
      this.getIssues();
    }
    this.selectedIssue = null;

  }

}