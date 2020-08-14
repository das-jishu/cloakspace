import { ClipboardModule } from '@angular/cdk/clipboard';
import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';

import { environment } from './../environments/environment';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentsComponent } from './comments/comments.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { FeedRedirectComponent } from './feed-redirect/feed-redirect.component';
import { FilterPostsComponent } from './filter-posts/filter-posts.component';
import { FooterComponent } from './footer/footer.component';
import { FullPostComponent } from './full-post/full-post.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './info/about-us/about-us.component';
import { ContactUsComponent } from './info/contact-us/contact-us.component';
import { MeetTheTeamComponent } from './info/meet-the-team/meet-the-team.component';
import { LoaderComponent } from './loader/loader.component';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchHighlightPipe } from './pipes/search-highlight.pipe';
import { PopularComponent } from './popular/popular.component';
import { PostCardComponent } from './post-card/post-card.component';
import { PostsFilterComponent } from './posts-filter/posts-filter.component';
import { PostsComponent } from './posts/posts.component';
import { RecentComponent } from './recent/recent.component';
import { SearchComponent } from './search/search.component';
import { AdminAuthguardService } from './services/admin-authguard.service';
import { AnalyticsService } from './services/analytics.service';
import { AuthService } from './services/auth-service.service';
import { FeedbackService } from './services/feedback-service.service';
import { MailingService } from './services/mailing.service';
import { PostService } from './services/post.service';
import { TagService } from './services/tag.service';
import { SharingOptionsComponent } from './sharing-options/sharing-options.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TrendingComponent } from './trending/trending.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@NgModule({
  declarations: [
    AppComponent,
    MainNavbarComponent,
    AdminLoginComponent,
    AdminProductsComponent,
    HomeComponent,
    AboutUsComponent,
    MeetTheTeamComponent,
    ContactUsComponent,
    CreatePostComponent,
    PostCardComponent,
    PostsComponent,
    FullPostComponent,
    SharingOptionsComponent,
    SpinnerComponent,
    CommentsComponent,
    SearchComponent,
    FilterPostsComponent,
    NotFoundComponent,
    PostsFilterComponent,
    TrendingComponent,
    PopularComponent,
    LoaderComponent,
    FooterComponent,
    FeedRedirectComponent,
    RecentComponent,
    SearchHighlightPipe,
    PrivacyPolicyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DeviceDetectorModule.forRoot(),
    NgxLinkifyjsModule.forRoot({
      enableHash: false,
      enableMention: false,
    }),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatListModule,
    MatBottomSheetModule,
    ClipboardModule,
    FormsModule,
    PickerModule,
    MatChipsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(
      [
        {
          path: '',
          component: HomeComponent,
        },

        {
          path: 'feed',
          component: PostsComponent,
        },

        {
          path: 'post/:id',
          component: FullPostComponent,
        },
        {
          path: 'post/**',
          component: NotFoundComponent,
        },

        {
          path: 'search',
          component: SearchComponent,
        },

        {
          path: 'popular',
          component: PopularComponent,
        },
        {
          path: 'recent',
          component: RecentComponent,
        },

        {
          path: 'about',
          component: AboutUsComponent,
        },
        {
          path: 'team',
          component: MeetTheTeamComponent,
        },
        {
          path: 'contact',
          component: ContactUsComponent,
        },
        {
          path: 'policy',
          component: PrivacyPolicyComponent,
        },

        {
          path: '9df59d4c785363a0f8148f5d5e428354',
          component: AdminLoginComponent,
        },
        {
          path: '9df59d4c785363a0f8148f5d5e428354/products',
          component: AdminProductsComponent,
          canActivate: [AdminAuthguardService],
        },

        {
          path: '404',
          component: NotFoundComponent,
        },
        {
          path: '**',
          component: NotFoundComponent,
        },
      ],
      {}
    ),
    NgbModule,
  ],
  providers: [
    AuthService,
    AdminAuthguardService,
    TagService,
    PostService,
    FeedbackService,
    AnalyticsService,
    MailingService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
