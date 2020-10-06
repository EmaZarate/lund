import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { News } from 'src/app/main/case-management/models/news';
import { NewsSequenceDetailService } from 'src/app/shared/services/news-sequence-detail.service';
import { SelectNewsReasonTypeService } from '../../services/select-news-reason-type.service';
import { AnalystAssignmentService } from 'src/app/main/analyst-assignment/analyst-assignment.service';
import { Case } from 'src/app/main/case-info-requirement/models/case.model';
@Component({
  selector: 'app-news-sequence-detail',
  templateUrl: './news-sequence-detail.component.html',
  styleUrls: ['./news-sequence-detail.component.scss']
})
export class NewsSequenceDetailComponent implements OnInit {

  reasonItem : any[] = [];
  news : News = new News();
  newsReasonTypeDesc: string;
  case: Case;

  constructor(
    private route: ActivatedRoute,
    private newsSequenceDetail: NewsSequenceDetailService,
    private newsReasonTypeService: SelectNewsReasonTypeService,
    private analystAssignmentService: AnalystAssignmentService,

  ) { }

  ngOnInit() {
    this.getFormData(this.route.snapshot.params.id);
  }

  getFormData(id: any) {
    this.newsSequenceDetail.getNewsById(id).subscribe(res=>{
        this.news = res;                
        this.newsReasonTypeService.getNewsReasonTypes(res.newsTypeId)
        .subscribe(reasons => {
          for (var i=0;i<reasons.length;i++)
            if (reasons[i].newsReasonTypeId==res.newsReasonTypeId)
              this.newsReasonTypeDesc = reasons[i].description;
        });
        this.analystAssignmentService.getCase(this.route.snapshot.params.id).subscribe(res => {
          this.case = res;
        })
      });     
  }
}
