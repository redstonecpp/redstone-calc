function factorial(n) {
    return n === 0 ? 1 : n * factorial(n - 1);
}

// 二項係数 (nCr) を計算
function binomialCoeff(n, r) {
    if (r > n) return 0;
    return factorial(n) / (factorial(r) * factorial(n - r));
}

// 二項分布の累積確率を計算
function cumulativeProbability(m, n, p) {
    let cumulativeProb = 0;
    for (let k = m; k <= n; k++) {
        cumulativeProb += binomialCoeff(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
    }
    return cumulativeProb;
}

// シミュレーション実行
function simulate() {
    const p = parseFloat(document.getElementById("p").value) / 100;
    const m = parseInt(document.getElementById("m").value);

    let x = [];
    let y = [];
    let x_max = 10000;

    for (let n = 0; n < x_max; n++) {
        let prob = cumulativeProbability(m, n, p);
        y.push(prob);
        x.push(n);

        // 99% に到達したら描画範囲を制限
        if (prob >= 0.99) {
            x_max = n;
            break;
        }
    }

    // グラフ描画
    const ctx = document.getElementById('graphCanvas').getContext('2d');
    if (window.myChart) {
        window.myChart.destroy();
    }
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: x,
            datasets: [{
                label: `P(少なくとも ${m} 回成功)`,
                data: y,
                borderColor: 'blue',
                fill: false
            }]
        },
        options: {
            scales: {
                x: { title: { display: true, text: "試行回数" } },
                y: { title: { display: true, text: "累積確率" }, min: 0, max: 1 }
            }
        }
    });
}
