document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const authButtons = document.querySelector('.auth-buttons');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            
            if (nav) {
                nav.classList.toggle('active');
                nav.style.display = nav.classList.contains('active') ? 'block' : 'none';
            }
            
            if (authButtons) {
                authButtons.classList.toggle('active');
                authButtons.style.display = authButtons.classList.contains('active') ? 'flex' : 'none';
            }
        });
    }

    // Stock chart
    const ctx = document.getElementById('stockChart');
    
    if (ctx) {
        // Sample data for the chart
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'S&P 500',
                    data: [4500, 4450, 4600, 4700, 4650, 4800, 4900, 5000, 4950, 5100, 5200, 5300],
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'NASDAQ',
                    data: [14000, 13800, 14200, 14500, 14300, 14700, 15000, 15300, 15100, 15500, 15800, 16000],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        };

        new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    }

    // Animate stock tickers
    const tickers = document.querySelectorAll('.ticker');
    
    function animateTickers() {
        tickers.forEach(ticker => {
            const priceElement = ticker.querySelector('.ticker-price');
            const changeElement = ticker.querySelector('.ticker-change');
            
            if (priceElement && changeElement) {
                // Generate random price change
                const currentPrice = parseFloat(priceElement.textContent);
                const randomChange = (Math.random() * 2 - 1) * 0.5; // Random between -0.5% and +0.5%
                const newPrice = currentPrice * (1 + randomChange / 100);
                
                // Update price and change percentage
                priceElement.textContent = newPrice.toFixed(2);
                
                const changePercentage = randomChange.toFixed(2);
                changeElement.textContent = (changePercentage >= 0 ? '+' : '') + changePercentage + '%';
                
                // Update data attribute for styling
                ticker.setAttribute('data-change', changePercentage >= 0 ? 'positive' : 'negative');
            }
        });
    }

    // Update tickers every 5 seconds
    if (tickers.length > 0) {
        setInterval(animateTickers, 5000);
    }
});