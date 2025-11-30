import { Routes } from '@angular/router';
import { UploadInicialComponent } from './pages/upload-inicial/upload-inicial.component';
import { BacklogComponent } from './pages/backlog/backlog.component';
import { RoadmapComponent } from './pages/roadmap/roadmap.component';

export const routes: Routes = [
    { path: '', redirectTo: 'upload', pathMatch: 'full' },
    { path: 'upload', component: UploadInicialComponent },
    { path: 'backlog', component: BacklogComponent },
    { path: 'roadmap', component: RoadmapComponent },
    { path: '**', redirectTo: 'upload' }
];