import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TonConnectUIModule } from 'tonconnect-ui-angular-fork';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { HeaderComponent } from './header/header.component';
import { TxFormComponent } from './tx-form/tx-form.component';

@NgModule({
  declarations: [HeaderComponent, TxFormComponent],
  imports: [CommonModule, TonConnectUIModule, NgxJsonViewerModule],
  exports: [HeaderComponent, TxFormComponent],
})
export class ComponentsModule {}
