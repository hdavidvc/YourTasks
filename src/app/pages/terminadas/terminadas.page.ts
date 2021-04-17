import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-terminadas',
  templateUrl: './terminadas.page.html',
  styleUrls: ['./terminadas.page.scss'],
})
export class TerminadasPage implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getlistas();
  }

}
