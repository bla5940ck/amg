import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  public thridRate = 0.001334 * 12;
  public fourthRate = 0.001334 * 12;

  public tempAmout = 0;

  // 配權和配息的百分比
  public percentAllocation: number = 0;
  public percentDividend: number  = 0;
  // 年化報酬率
  public irr: number = 0;
  // 保管費
  public storageFee: number = 1200;

  public isAllWrite: boolean = true;

  public fourthYearTotalAllocation: number = 0;

  public percentDividendAmount: number = 0;

  // 初始化 years，這個陣列的每個元素是包含 year, allocation, dividend 的物件
  public years: { year: number, allocation: number, dividend: number }[] = [];

  date: Date | null = null;  // 用來存放選擇的日期

  items: any[] = [];
  totalRecords: number = 0; // 總數據量
  rows: number = 5; // 每頁顯示數量

  selectedYear: any[] = [];


  constructor() {
    // 模擬100條數據
    this.totalRecords = 100;
    for (let i = 1; i <= this.totalRecords; i++) {
      this.items.push({
        id: i,
        name: `Item ${i}`,
        age: Math.floor(Math.random() * 30) + 20,
        email: `item${i}@example.com`,
        phone: `123-456-7890`,
        address: `Address ${i}, City, Country`,
        address2: `Address ${i}, City, Country`,
        address3: `Address ${i}, City, Country`
      });    }
  }

  ngOnInit() {
    // 初始化時檢查是否有必要的數值，並且更新按鈕狀態
    this.checkAllValues();
  }

  // 計算金額並將結果填充到每個年度
  calculateAmount() {
    this.isShow = true;

    // 清空 years 陣列，以防止重複計算
    this.years = [];

    // 配權金額與配息金額會依配權和配息百分比進行計算
    let allocationAmount = this.amount * (this.percentAllocation! / 100);
    let dividendAmount = this.amount * (this.percentDividend! / 100);
    for (let i = 1; i <= 4; i++) {
      if(i == 2) {
        allocationAmount = this.calculateAllocationAmount(allocationAmount, this.fristRate);
      } else if(i == 3) {
        allocationAmount = this.calculateAllocationAmount(allocationAmount, this.secondRate);
      } else if(i == 4) {
        allocationAmount = this.calculateAllocationAmount(allocationAmount, this.thridRate);
        this.fourthYearTotalAllocation = this.calculateAllocationAmount(allocationAmount, this.fourthRate);
      }

      // 每年都推送一個新的物件，包含年、配權金額和配息金額
      this.years.push({
        year: i,
        allocation: allocationAmount,
        dividend: dividendAmount
      });
    }
    this.percentDividendAmount = this.amount * this.percentDividend / 100 * this.irr / 100;

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

    this.checkAllValues(); // 更新按鈕狀態
  }

  // 檢查百分比並確保它不超過100%
  checkPercentage(type: 'allocation' | 'dividend') {
    if (type === 'allocation') {
      // 讓 percentAllocation 的值不會小於 0 且不會大於 100
      if (this.percentAllocation < 0) {
        this.percentAllocation = 0; // 如果輸入負數，設為 0
      } else if (this.percentAllocation > 100) {
        this.percentAllocation = 100; // 如果超過 100，設為 100
      }
    } else if (type === 'dividend') {
      // 讓 percentDividend 的值不會小於 0 且不會大於 100
      if (this.percentDividend < 0) {
        this.percentDividend = 0; // 如果輸入負數，設為 0
      } else if (this.percentDividend > 100) {
        this.percentDividend = 100; // 如果超過 100，設為 100
      }
    }
    this.checkAllValues();
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

  // 檢查所有需要的值是否都不為0，來啟用/禁用按鈕
  checkAllValues() {
    this.isShow = false;
    if (this.amount !== 0 && typeof(this.amount) == 'number' && (this.percentAllocation !== 0 || this.percentDividend !== 0) && this.irr !== 0 &&  typeof(this.irr) == 'number' && typeof(this.percentAllocation) == 'number') {
      this.isAllWrite = false; // 所有必填項目都有填寫
    } else {
      this.isAllWrite = true; // 有未填寫的項目
    }
  }

}
