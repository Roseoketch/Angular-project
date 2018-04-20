import {HttpClient} from '@angular/common/http'
import {GoalService} from '../goals/goal.service';
import { Component, OnInit } from '@angular/core';
import {Goal} from '../goal';
import {Goals} from '../goals';
import {AlertsService} from '../alert-service/alerts.service';
import {Quote} from '../quote-class/quote';
import {QuoteRequestService} from '../quote-http/quote-request.service'

@Component({
 selector: 'app-goal',
 templateUrl: './goal.component.html',
 providers:[GoalService,QuoteRequestService], //add the providers to the component
 styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {
 quote:Quote;
 goals: Goal[];
 alertService: AlertsService;


  deleteGoal(isComplete, index){
       if (isComplete){
         let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}`)

       if (toDelete){
            this.goals.splice(index,1);
            this.alertService.alertMe("Goal has been deleted")
           }
           }
         }

    toogleDetails(index) {
        this.goals[index].showDescription = !this.goals[index].showDescription;
    }

    addNewGoal(goal){
      let goalLength = this.goals.length;
      goal.id=goalLength+1;
      goal.completeDate = new Date(goal.completeDate)
      this.goals.push(goal)

  }
  constructor(goalService:GoalService,alertService:AlertsService,private quoteService:QuoteRequestService) {
  this.goals = goalService.getGoals();
  this.alertService = alertService;
   }


  ngOnInit() {
    this.quoteService.quoteRequest()
    this.quote=this.quoteService.quote
  }

}
