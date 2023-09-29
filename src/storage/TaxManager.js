export default class TaxManager {
  constructor() {
    this.taxRates = {
      'Level 1': 0.1,
      'Level 2': 0.2,
      'Level 3': 0.3
    }
  }

  calculateTax(incomeLevel, annualIncome) {
    if (!this.taxRates[incomeLevel]) return 0
    const taxRate = this.taxRates[incomeLevel]
    return annualIncome * taxRate
  }
}
