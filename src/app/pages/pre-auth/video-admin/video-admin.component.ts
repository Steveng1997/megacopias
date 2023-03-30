import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { VideoService } from 'src/app/core/services/video.service';

@Component({
  selector: 'app-video-admin',
  templateUrl: './video-admin.component.html',
  styleUrls: ['./video-admin.component.css']
})
export class VideoAdminComponent implements OnInit {

  videos: any[] = [];
  public page!: number;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public serviceVideo: VideoService
  ) { }


  ngOnInit(): void {
    this.getGallery();
  }

  getGallery() {
    this.serviceVideo.getVideo().subscribe((dataVideo) => {
      this.videos = dataVideo;
    });
  }

  agregar() {
    this.router.navigate([`admin/videoAdd`]);
  }
}
