import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ConnectedWallet,
  SendTransactionRequest,
  TonConnectUIService,
} from 'tonconnect-ui-angular-fork';
import { Subscription, take, tap } from 'rxjs';

@Component({
  selector: 'app-tx-form',
  styleUrls: ['./tx-form.component.scss'],
  templateUrl: './tx-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TxFormComponent implements OnInit, OnDestroy {
  // In this example, we are using a predefined smart contract state initialization (`stateInit`)
  // to interact with an "EchoContract". This contract is designed to send the value back to the sender,
  // serving as a testing tool to prevent users from accidentally spending money.
  readonly defaultTx: SendTransactionRequest = {
    // The transaction is valid for 10 minutes from now, in unix epoch seconds.
    validUntil: Math.floor(Date.now() / 1000) + 600,
    messages: [
      {
        // The receiver's address.
        address:
          '0:8a5a9c7b70d329be670de4e6cce652d464765114aa98038c66c3d8ceaf2d19b0',
        // Amount to send in nanoTON. For example, 0.005 TON is 5000000 nanoTON.
        amount: '5000000',
        // (optional) State initialization in boc base64 format.
        stateInit:
          'te6cckEBBAEAOgACATQCAQAAART/APSkE/S88sgLAwBI0wHQ0wMBcbCRW+D6QDBwgBDIywVYzxYh+gLLagHPFsmAQPsAlxCarA==',
        // (optional) Payload in boc base64 format.
        payload: 'te6ccsEBAQEADAAMABQAAAAASGVsbG8hCaTc/g==',
      },

      // Uncomment the following message to send two messages in one transaction.
      /*
    {
      // Note: Funds sent to this address will not be returned back to the sender.
      address: '0:2ecf5e47d591eb67fa6c56b02b6bb1de6a530855e16ad3082eaa59859e8d5fdc',
      amount: toNano('0.01').toString(),
    }
    */
    ],
  };

  wallet?: ConnectedWallet | null;

  private _walletSubscription!: Subscription;

  constructor(
    private readonly _tonConnectUIService: TonConnectUIService,
    private readonly _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._walletSubscription = this._tonConnectUIService
      .getConnectedWallet()
      .pipe(
        tap((wallet) => {
          this.wallet = wallet;
          this._cdr.markForCheck();
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._walletSubscription.unsubscribe();
  }

  sendTransaction(): void {
    this._tonConnectUIService
      .get()
      .pipe(
        tap((uiConnect) => uiConnect.sendTransaction(this.defaultTx)),
        take(1)
      )
      .subscribe();
  }

  connectWallet(): void {
    this._tonConnectUIService
      .get()
      .pipe(
        tap((uiConnect) => uiConnect.openModal()),
        take(1)
      )
      .subscribe();
  }
}
