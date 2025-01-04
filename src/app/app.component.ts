import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '安聯AMG-法國巴黎';
  public amount: number = 0;
  public calculatedAmount: number | null = null;
  public isShow: boolean = false;

  public fristRate = 0.002 * 12;
  public secondRate = 0.0016 * 12;
  public thridRate = 0.00134 * 12;
  public fourthRate = 0.00134 * 12;

  public tempAmout = 0;

  // 配權和配息的百分比
  public percentAllocation: number | null = null;
  public percentDividend: number | null = null;
  // 年化報酬率
  public irr: number = 0;
  // 保管費
  public storageFee: number = 1200;

  // 初始化 years，這個陣列的每個元素是包含 year, allocation, dividend 的物件
  public years: { year: number, allocation: number, dividend: number }[] = [];

  // 計算金額並將結果填充到每個年度
  calculateAmount() {
    this.isShow = true;

    // 清空 years 陣列，以防止重複計算
    this.years = [];
   
    // 配權金額與配息金額會依配權和配息百分比進行計算
    let allocationAmount = this.amount * (this.percentAllocation! / 100);
    let dividendAmount = this.amount * (this.percentDividend! / 100);
    for (let i = 1; i <= 4; i++) {
  
      console.log(allocationAmount)
      if(i == 2) {
        allocationAmount = this.calculateAllocationAmount(allocationAmount, this.fristRate);
      } else if(i == 3) {
        allocationAmount = this.calculateAllocationAmount(allocationAmount, this.secondRate);
      } else if(i == 4) {
        allocationAmount = this.calculateAllocationAmount(allocationAmount, this.thridRate);
      } 

      // 每年都推送一個新的物件，包含年、配權金額和配息金額
      this.years.push({
        year: i,
        allocation: allocationAmount,
        dividend: dividendAmount
      });
    }
  }

  calculateAllocationAmount(allocationAmount: number, yearRate: number) {
    return allocationAmount - this.storageFee - this.amount * yearRate + allocationAmount * this.irr * 0.01;
  }


  // 當其中一個百分比改變時，更新另一個
  onPercentChange(type: 'allocation' | 'dividend') {
    if (type === 'allocation') {
      this.percentDividend = 100 - (this.percentAllocation || 0); // 剩下的百分比給配息
    } else {
      this.percentAllocation = 100 - (this.percentDividend || 0); // 剩下的百分比給配權
    }
  }

  // 檢查百分比並確保它不超過100%
  checkPercentage(type: 'allocation' | 'dividend') {
    if (type === 'allocation' && this.percentAllocation! > 100) {
      this.percentAllocation = 100;
    } else if (type === 'dividend' && this.percentDividend! > 100) {
      this.percentDividend = 100;
    }
  }

  // 計算配權和配息金額，並處理空值情況
  getAmount(yearIndex: number, type: 'allocation' | 'dividend') {
    const yearData = this.years[yearIndex];
    if (type === 'allocation') {
      return yearData.allocation;
    } else {
      return yearData.dividend;
    }
  }
}
