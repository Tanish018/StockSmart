document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const calculatorCards = document.getElementById('calculator-cards');
    const calculatorSections = document.getElementById('calculator-sections');
    const backButton = document.getElementById('back-to-home');
    const cards = document.querySelectorAll('.calculator-card');
    const sections = document.querySelectorAll('.calculator-section');
    
    // Card navigation
    cards.forEach(card => {
      card.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        
        // Hide cards, show calculator section
        calculatorCards.style.display = 'none';
        calculatorSections.classList.add('active');
        
        // Show the target calculator
        sections.forEach(section => {
          section.classList.remove('active');
          if (section.id === targetId) {
            section.classList.add('active');
          }
        });
      });
    });
    
    // Back button
    backButton.addEventListener('click', function() {
      // Hide calculator sections, show cards
      calculatorSections.classList.remove('active');
      calculatorCards.style.display = 'grid';
      
      // Remove active class from all sections
      sections.forEach(section => section.classList.remove('active'));
    });
    
    // SIP Calculator
    const calculateSipButton = document.getElementById('calculate-sip');
    calculateSipButton.addEventListener('click', calculateSIP);
    
    function calculateSIP() {
      const monthlyInvestment = parseFloat(document.getElementById('monthly-investment').value);
      const investmentPeriod = parseFloat(document.getElementById('investment-period').value);
      const expectedReturn = parseFloat(document.getElementById('expected-return').value);
      
      const monthlyRate = expectedReturn / 12 / 100;
      const months = investmentPeriod * 12;
      const investedAmount = monthlyInvestment * months;
      
      // SIP formula: P × ({[1 + i]^n - 1} / i) × (1 + i)
      const totalValue = monthlyInvestment * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
      const estimatedReturns = totalValue - investedAmount;
      
      document.getElementById('invested-amount').textContent = '₹ ' + formatIndianCurrency(investedAmount);
      document.getElementById('estimated-returns').textContent = '₹ ' + formatIndianCurrency(estimatedReturns);
      document.getElementById('total-value').textContent = '₹ ' + formatIndianCurrency(totalValue);
    }
    
    // Return Calculator
    const calculateReturnButton = document.getElementById('calculate-return');
    calculateReturnButton.addEventListener('click', calculateReturn);
    
    function calculateReturn() {
      const initialInvestment = parseFloat(document.getElementById('initial-investment').value);
      const finalValue = parseFloat(document.getElementById('final-value').value);
      const timePeriod = parseFloat(document.getElementById('time-period').value);
      
      const totalReturns = finalValue - initialInvestment;
      const absoluteReturn = (totalReturns / initialInvestment) * 100;
      
      // CAGR formula: (Final Value / Initial Value)^(1/n) - 1
      const cagr = (Math.pow(finalValue / initialInvestment, 1 / timePeriod) - 1) * 100;
      
      document.getElementById('total-returns').textContent = '₹ ' + formatIndianCurrency(totalReturns);
      document.getElementById('absolute-return').textContent = absoluteReturn.toFixed(2) + '%';
      document.getElementById('cagr-value').textContent = cagr.toFixed(2) + '%';
    }
    
    // Currency Converter
    const inrToUsdButton = document.getElementById('inr-to-usd');
    const usdToInrButton = document.getElementById('usd-to-inr');
    
    inrToUsdButton.addEventListener('click', function() {
      const inrAmount = parseFloat(document.getElementById('inr-amount').value);
      const exchangeRate = parseFloat(document.getElementById('exchange-rate').value);
      
      const usdAmount = inrAmount / exchangeRate;
      document.getElementById('usd-amount').value = usdAmount.toFixed(2);
    });
    
    usdToInrButton.addEventListener('click', function() {
      const usdAmount = parseFloat(document.getElementById('usd-amount').value);
      const exchangeRate = parseFloat(document.getElementById('exchange-rate').value);
      
      const inrAmount = usdAmount * exchangeRate;
      document.getElementById('inr-amount').value = inrAmount.toFixed(2);
    });
    
    // Tax Calculator
    const calculateTaxButton = document.getElementById('calculate-tax');
    calculateTaxButton.addEventListener('click', calculateTax);
    
    function calculateTax() {
      const incomeAmount = parseFloat(document.getElementById('income-amount').value);
      const taxRegime = document.getElementById('tax-regime').value;
      
      let taxAmount = 0;
      
      if (taxRegime === 'new') {
        // New Tax Regime (FY 2023-24)
        if (incomeAmount <= 300000) {
          taxAmount = 0;
        } else if (incomeAmount <= 600000) {
          taxAmount = (incomeAmount - 300000) * 0.05;
        } else if (incomeAmount <= 900000) {
          taxAmount = 15000 + (incomeAmount - 600000) * 0.10;
        } else if (incomeAmount <= 1200000) {
          taxAmount = 45000 + (incomeAmount - 900000) * 0.15;
        } else if (incomeAmount <= 1500000) {
          taxAmount = 90000 + (incomeAmount - 1200000) * 0.20;
        } else {
          taxAmount = 150000 + (incomeAmount - 1500000) * 0.30;
        }
      } else {
        // Old Tax Regime (FY 2023-24)
        if (incomeAmount <= 250000) {
          taxAmount = 0;
        } else if (incomeAmount <= 500000) {
          taxAmount = (incomeAmount - 250000) * 0.05;
        } else if (incomeAmount <= 1000000) {
          taxAmount = 12500 + (incomeAmount - 500000) * 0.20;
        } else {
          taxAmount = 112500 + (incomeAmount - 1000000) * 0.30;
        }
      }
      
      const cessAmount = taxAmount * 0.04;
      const totalTax = taxAmount + cessAmount;
      const effectiveRate = (totalTax / incomeAmount) * 100;
      
      document.getElementById('income-tax').textContent = '₹ ' + formatIndianCurrency(taxAmount);
      document.getElementById('cess-amount').textContent = '₹ ' + formatIndianCurrency(cessAmount);
      document.getElementById('total-tax').textContent = '₹ ' + formatIndianCurrency(totalTax);
      document.getElementById('effective-tax-rate').textContent = effectiveRate.toFixed(2) + '%';
    }
  
    // Mutual Fund Calculator
    const mfInvestmentType = document.getElementById('mf-investment-type');
    const lumpsumInput = document.querySelector('.lumpsum-input');
    const sipInput = document.querySelector('.sip-input');
    
    mfInvestmentType.addEventListener('change', function() {
      if (this.value === 'lumpsum') {
        lumpsumInput.style.display = 'block';
        sipInput.style.display = 'none';
      } else {
        lumpsumInput.style.display = 'none';
        sipInput.style.display = 'block';
      }
    });
    
    const calculateMfButton = document.getElementById('calculate-mf');
    calculateMfButton.addEventListener('click', calculateMutualFund);
    
    function calculateMutualFund() {
      const investmentType = document.getElementById('mf-investment-type').value;
      const investmentPeriod = parseFloat(document.getElementById('mf-investment-period').value);
      const expectedReturn = parseFloat(document.getElementById('mf-expected-return').value);
      
      let investedAmount, totalValue, expectedReturns;
      
      if (investmentType === 'lumpsum') {
        const lumpsumAmount = parseFloat(document.getElementById('mf-lumpsum-amount').value);
        // Lumpsum formula: P(1+r)^n
        totalValue = lumpsumAmount * Math.pow((1 + expectedReturn / 100), investmentPeriod);
        investedAmount = lumpsumAmount;
      } else {
        const monthlyInvestment = parseFloat(document.getElementById('mf-monthly-investment').value);
        const monthlyRate = expectedReturn / 12 / 100;
        const months = investmentPeriod * 12;
        investedAmount = monthlyInvestment * months;
        
        // SIP formula: P × ({[1 + i]^n - 1} / i) × (1 + i)
        totalValue = monthlyInvestment * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
      }
      
      expectedReturns = totalValue - investedAmount;
      
      document.getElementById('mf-invested-amount').textContent = '₹ ' + formatIndianCurrency(investedAmount);
      document.getElementById('mf-expected-returns').textContent = '₹ ' + formatIndianCurrency(expectedReturns);
      document.getElementById('mf-total-value').textContent = '₹ ' + formatIndianCurrency(totalValue);
    }
    
    // Fixed Deposit Calculator
    const calculateFdButton = document.getElementById('calculate-fd');
    calculateFdButton.addEventListener('click', calculateFD);
    
    function calculateFD() {
      const principalAmount = parseFloat(document.getElementById('fd-amount').value);
      const years = parseFloat(document.getElementById('fd-years').value) || 0;
      const months = parseFloat(document.getElementById('fd-months').value) || 0;
      const interestRate = parseFloat(document.getElementById('fd-rate').value);
      const compoundingFrequency = parseFloat(document.getElementById('fd-frequency').value);
      
      // Convert period to years
      const totalYears = years + (months / 12);
      
      // Compound interest formula: P(1 + r/n)^(nt)
      const ratePerPeriod = interestRate / 100 / compoundingFrequency;
      const numberOfPeriods = compoundingFrequency * totalYears;
      
      const maturityValue = principalAmount * Math.pow((1 + ratePerPeriod), numberOfPeriods);
      const interestEarned = maturityValue - principalAmount;
      
      document.getElementById('fd-principal').textContent = '₹ ' + formatIndianCurrency(principalAmount);
      document.getElementById('fd-interest').textContent = '₹ ' + formatIndianCurrency(interestEarned);
      document.getElementById('fd-maturity').textContent = '₹ ' + formatIndianCurrency(maturityValue);
    }
    
    // Loan Calculator
    const calculateLoanButton = document.getElementById('calculate-loan');
    calculateLoanButton.addEventListener('click', calculateLoan);
    
    function calculateLoan() {
      const loanAmount = parseFloat(document.getElementById('loan-amount').value);
      const loanTerm = parseFloat(document.getElementById('loan-term').value);
      const interestRate = parseFloat(document.getElementById('loan-rate').value);
      
      // Convert annual interest rate to monthly
      const monthlyRate = interestRate / 12 / 100;
      const totalMonths = loanTerm * 12;
      
      // EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
      const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
      
      const totalPayment = emi * totalMonths;
      const totalInterest = totalPayment - loanAmount;
      
      document.getElementById('loan-emi').textContent = '₹ ' + formatIndianCurrency(emi);
      document.getElementById('loan-total-interest').textContent = '₹ ' + formatIndianCurrency(totalInterest);
      document.getElementById('loan-total-payment').textContent = '₹ ' + formatIndianCurrency(totalPayment);
    }
    
    // Inflation Calculator
    const calculateInflationButton = document.getElementById('calculate-inflation');
    calculateInflationButton.addEventListener('click', calculateInflation);
    
    function calculateInflation() {
      const presentValue = parseFloat(document.getElementById('current-value').value);
      const inflationRate = parseFloat(document.getElementById('inflation-rate').value);
      const years = parseFloat(document.getElementById('inflation-years').value);
      
      // Future Value formula: PV * (1 + inflation)^years
      const futureValue = presentValue * Math.pow(1 + (inflationRate / 100), years);
      
      // Purchasing power loss
      const powerLoss = ((futureValue - presentValue) / futureValue) * 100;
      
      document.getElementById('inflation-present').textContent = '₹ ' + formatIndianCurrency(presentValue);
      document.getElementById('inflation-future').textContent = '₹ ' + formatIndianCurrency(futureValue);
      document.getElementById('inflation-loss').textContent = powerLoss.toFixed(2) + '%';
    }
    
    // Salary Calculator
    const calculateSalaryButton = document.getElementById('calculate-salary');
    calculateSalaryButton.addEventListener('click', calculateSalary);
    
    function calculateSalary() {
      const grossSalary = parseFloat(document.getElementById('gross-salary').value);
      const taxSlab = document.getElementById('tax-slab').value;
      const pfPercentage = parseFloat(document.getElementById('salary-pf').value);
      const basicPercentage = parseFloat(document.getElementById('salary-basic').value);
      
      const monthlyGross = grossSalary / 12;
      const basicSalary = (basicPercentage / 100) * grossSalary;
      const monthlyBasic = basicSalary / 12;
      
      // Calculate PF contribution (on basic salary)
      const annualPf = (pfPercentage / 100) * basicSalary;
      const monthlyPf = annualPf / 12;
      
      // Calculate tax (simplified)
      let taxAmount;
      
      if (taxSlab === 'new') {
        // New Tax Regime (simplified)
        if (grossSalary <= 300000) {
          taxAmount = 0;
        } else if (grossSalary <= 600000) {
          taxAmount = (grossSalary - 300000) * 0.05;
        } else if (grossSalary <= 900000) {
          taxAmount = 15000 + (grossSalary - 600000) * 0.10;
        } else if (grossSalary <= 1200000) {
          taxAmount = 45000 + (grossSalary - 900000) * 0.15;
        } else if (grossSalary <= 1500000) {
          taxAmount = 90000 + (grossSalary - 1200000) * 0.20;
        } else {
          taxAmount = 150000 + (grossSalary - 1500000) * 0.30;
        }
      } else {
        // Old Tax Regime (simplified)
        if (grossSalary <= 250000) {
          taxAmount = 0;
        } else if (grossSalary <= 500000) {
          taxAmount = (grossSalary - 250000) * 0.05;
        } else if (grossSalary <= 1000000) {
          taxAmount = 12500 + (grossSalary - 500000) * 0.20;
        } else {
          taxAmount = 112500 + (grossSalary - 1000000) * 0.30;
        }
      }
      
      const monthlyTax = taxAmount / 12;
      
      // In-hand salary calculation
      const monthlyInHand = monthlyGross - monthlyPf - monthlyTax;
      
      document.getElementById('monthly-gross').textContent = '₹ ' + formatIndianCurrency(monthlyGross);
      document.getElementById('monthly-pf').textContent = '₹ ' + formatIndianCurrency(monthlyPf);
      document.getElementById('monthly-tax').textContent = '₹ ' + formatIndianCurrency(monthlyTax);
      document.getElementById('monthly-inhand').textContent = '₹ ' + formatIndianCurrency(monthlyInHand);
    }
    
    // Salary Hike Calculator
    const calculateHikeButton = document.getElementById('calculate-hike');
    calculateHikeButton.addEventListener('click', calculateHike);
    
    function calculateHike() {
      const currentSalary = parseFloat(document.getElementById('current-salary').value);
      const hikePercentage = parseFloat(document.getElementById('hike-percentage').value);
      
      const hikeAmount = currentSalary * (hikePercentage / 100);
      const newSalary = currentSalary + hikeAmount;
      const monthlyIncrease = hikeAmount / 12;
      
      document.getElementById('hike-current-annual').textContent = '₹ ' + formatIndianCurrency(currentSalary);
      document.getElementById('hike-new-annual').textContent = '₹ ' + formatIndianCurrency(newSalary);
      document.getElementById('hike-monthly-increase').textContent = '₹ ' + formatIndianCurrency(monthlyIncrease);
      document.getElementById('hike-percentage-result').textContent = hikePercentage.toFixed(2) + '%';
    }
    
    // Bill Splitter
    const calculateSplitButton = document.getElementById('calculate-split');
    calculateSplitButton.addEventListener('click', calculateSplit);
    
    function calculateSplit() {
      const billAmount = parseFloat(document.getElementById('bill-amount').value);
      const numPeople = parseFloat(document.getElementById('num-people').value);
      const tipPercentage = parseFloat(document.getElementById('tip-percentage').value);
      
      const tipAmount = billAmount * (tipPercentage / 100);
      const totalAmount = billAmount + tipAmount;
      const amountPerPerson = totalAmount / numPeople;
      
      document.getElementById('split-bill-amount').textContent = '₹ ' + formatIndianCurrency(billAmount);
      document.getElementById('split-tip-amount').textContent = '₹ ' + formatIndianCurrency(tipAmount);
      document.getElementById('split-total-amount').textContent = '₹ ' + formatIndianCurrency(totalAmount);
      document.getElementById('split-per-person').textContent = '₹ ' + formatIndianCurrency(amountPerPerson);
    }
    
    // Credit Card Interest Calculator
    const calculateCCButton = document.getElementById('calculate-cc');
    calculateCCButton.addEventListener('click', calculateCreditCard);
    
    function calculateCreditCard() {
      const balance = parseFloat(document.getElementById('cc-balance').value);
      const annualRate = parseFloat(document.getElementById('cc-interest').value);
      const monthlyPayment = parseFloat(document.getElementById('cc-payment').value);
      
      const monthlyRate = annualRate / 12 / 100;
      
      // Calculate number of months to pay off the balance
      let remainingBalance = balance;
      let months = 0;
      let totalInterestPaid = 0;
      
      while (remainingBalance > 0 && months < 1000) {  // Cap at 1000 months to prevent infinite loops
        months++;
        const interestThisMonth = remainingBalance * monthlyRate;
        totalInterestPaid += interestThisMonth;
        
        if (monthlyPayment >= (remainingBalance + interestThisMonth)) {
          remainingBalance = 0;
        } else {
          remainingBalance = remainingBalance + interestThisMonth - monthlyPayment;
        }
      }
      
      const totalPaid = balance + totalInterestPaid;
      
      document.getElementById('cc-monthly-rate').textContent = (monthlyRate * 100).toFixed(2) + '%';
      document.getElementById('cc-months').textContent = months.toString();
      document.getElementById('cc-total-interest').textContent = '₹ ' + formatIndianCurrency(totalInterestPaid);
      document.getElementById('cc-total-paid').textContent = '₹ ' + formatIndianCurrency(totalPaid);
    }
    
    // Utility function to format numbers in Indian currency format
    function formatIndianCurrency(num) {
      return new Intl.NumberFormat('en-IN').format(Math.round(num));
    }
    
    // Initialize with default calculations
    calculateSIP();
    calculateReturn();
    calculateTax();
    calculateMutualFund();
    calculateFD();
    calculateLoan();
    calculateInflation();
    calculateSalary();
    calculateHike();
    calculateSplit();
    calculateCreditCard();
  });