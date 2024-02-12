import { Component, ElementRef, inject, Renderer2 } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { Router } from "@angular/router";

import { BACKEND } from "../../../shared/environments/backend";
import { FRONTEND, frontendUrl } from "../../../shared/environments/frontend";
import { VideoService } from "../../services/video.service";
import { VideoPlayerComponent } from "./video-player.component";

@Component({
    standalone: true,
    imports: [VideoPlayerComponent, MatCardModule, MatButtonModule, MatTableModule, MatPaginatorModule],
    selector: "app-videos",
    template: `
        <div class="container-primary bg-page-chat">
            <br />
            <div class="width-70 margin-x-auto">
                <mat-paginator
                    class="margin-auto margin-bottom-xsm"
                    [length]="length"
                    [pageSize]="pageSize"
                    [showFirstLastButtons]="true"
                    [pageSizeOptions]="pageSizeOptions"
                    [pageIndex]="pageIndex"
                    (page)="handlePageEvent($event)"
                    aria-label="Select page"
                >
                </mat-paginator>
                <div class="flex-row flex-wrap">
                    @for (item of videoNames; track $index) {
                    <mat-card (click)="playVideo(item)" class="bg-secondary width-30 margin-sm hover">
                        <mat-card-header>
                            <mat-card-title-group>
                                <mat-card-title>{{ item }}</mat-card-title>
                            </mat-card-title-group>
                        </mat-card-header>
                        <mat-card-content>
                            <video class="width-100 margin-top-sm" [src]="getVideoThumbnail(item)"></video>
                        </mat-card-content>
                    </mat-card>
                    }
                </div>
            </div>
        </div>
    `,
})
export class VideoComponent {
    private videoService = inject(VideoService);
    private router = inject(Router);
    public videoNames!: string[];

    /* PAGINATOR
     ****************************************/
    public length = 50;
    public pageIndex = 0;
    public pageSizeOptions = [6, 15, 30, 45];
    public pageSize = this.pageSizeOptions[0];

    handlePageEvent(e: PageEvent) {
        this.pageIndex = e.pageIndex;
        this.pageSize = e.pageSize;
        this.getPage();
    }

    getSize() {
        this.videoService.getSize().subscribe((response) => {
            this.length = response;
        });
    }

    getPage() {
        this.videoService.getPage(this.pageIndex, this.pageSize).subscribe((response) => {
            this.videoNames = response;
        });
    }

    ngOnInit(): void {
        this.getSize();
        this.getPage();
        //this.loadData();
    }

    loadData() {
        this.videoService.getAllVideoNames().subscribe((apiData: string[]) => {
            this.videoNames = apiData;
        });
    }

    getVideoThumbnail(name: string) {
        return BACKEND.playVideo(name);
    }

    playVideo(name: string) {
        this.router.navigate([`${frontendUrl.videos}/${name}`]);
    }
}
