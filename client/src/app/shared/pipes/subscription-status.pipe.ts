import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subscriptionStatus'
})
export class SubscriptionStatusPipe implements PipeTransform {

  transform(value: string): string {
    const statusMapping: { [key: string]: string } = {
      Active: 'Attivo',
      Inactive: 'Inattivo',
      Suspended: 'Sospeso',
      Expired: 'Scaduto'
    };

    return statusMapping[value] || value;
  }

}