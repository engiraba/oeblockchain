import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CurrentBlockComponent } from './components/current-block/current-block.component';
import { BlocksComponent } from './pages/blocks/blocks.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { MatCardModule } from '@angular/material/card';
import { StoreModule } from '@ngrx/store';
import { blockReducer } from './block.reducer';
import { GenerateBlockComponent } from './components/generate-block/generate-block.component';

@NgModule({
  declarations: [
    AppComponent,
    WrapperComponent,
    DashboardComponent,
    CurrentBlockComponent,
    BlocksComponent,
    TransactionsComponent,
    GenerateBlockComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    StoreModule.forRoot({
      blocks: blockReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
