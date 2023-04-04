import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
// Service
import { VideoService } from 'src/app/core/services/video.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  video: any[] = [];

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public serviceGallery: VideoService,
  ) { }

  ngOnInit(): void {
    this.getGallery();
  }

  getGallery() {
    this.serviceGallery.getVideo().subscribe((dataGallery) => {
      this.video = dataGallery;
    });
  }

}
