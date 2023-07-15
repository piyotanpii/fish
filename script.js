// 金魚の画像パス
var fishImagePath = "fish.png";

// 金魚のサイズ
var fishSize = 40;

// 金魚の数
var fishCount = 10;

// 金魚のアニメーション速度
var fishSpeed = 2;

// キャンバス要素の取得
var canvas = document.getElementById("fish-canvas");
var ctx = canvas.getContext("2d");

// キャンバスのサイズをウィンドウサイズに合わせる
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 金魚の画像を読み込む
var fishImage = new Image();
fishImage.src = fishImagePath;

// 金魚の初期位置と速度をランダムに生成する関数
// 金魚の初期位置と速度をランダムに生成する関数
function getRandomFish() {
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    var angle = Math.random() * Math.PI * 2;
    var speed = Math.random() * fishSpeed + 1; // 1 から fishSpeed の範囲でランダムな速度を生成
    var vx = Math.cos(angle) * speed;
    var vy = Math.sin(angle) * speed;
    return { x: x, y: y, vx: vx, vy: vy };
}


// 金魚を描画する関数
function drawFish(x, y, angle) {
    ctx.save(); // 現在の描画状態を保存

    // 金魚の中心位置に移動して回転
    ctx.translate(x + fishSize / 2, y + fishSize / 2);
    ctx.rotate(angle + Math.PI); // 進行方向の角度に Math.PI (180度) を加えて背を向ける

    // 金魚の画像を描画
    ctx.drawImage(fishImage, -fishSize / 2, -fishSize / 2, fishSize, fishSize);

    ctx.restore(); // 描画状態を復元
}

// 金魚のアニメーションを更新する関数
function updateFish() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < fishCount; i++) {
        var fish = fishes[i];
        fish.x += fish.vx;
        fish.y += fish.vy;

        // 画面外に出たら反対側に移動させる
        if (fish.x < -fishSize) fish.x = canvas.width;
        if (fish.x > canvas.width) fish.x = -fishSize;
        if (fish.y < -fishSize) fish.y = canvas.height;
        if (fish.y > canvas.height) fish.y = -fishSize;

        // 金魚が進む方向を向くようにする
        var angle = Math.atan2(fish.vy, fish.vx);

        drawFish(fish.x, fish.y, angle);
    }
}


// 金魚の初期位置を設定する
var fishes = [];
for (var i = 0; i < fishCount; i++) {
    fishes.push(getRandomFish());
}

// アニメーションを開始する
setInterval(updateFish, 1000 / 60); // 60 FPSで更新