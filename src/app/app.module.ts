import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import {
  TON_CONNECT_UI_OPTIONS,
  TonConnectUIModule,
} from 'tonconnect-ui-angular-fork';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    ComponentsModule,
    TonConnectUIModule.forRoot({
      options: {
        provide: TON_CONNECT_UI_OPTIONS,
        useValue: of({
          manifestUrl: `/assets/tonconnect-manifest-testnet.json`,
          restoreConnection: true,
          actionsConfiguration: {
            modals: 'all',
            notifications: 'all',
          },
        }),
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
