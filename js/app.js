// Enemies our player must avoid
var Enemy = function(x, y, move) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.move = move;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.move * dt;
    
    // Reposition enemy to left-most of the screen when it reaches the end
    if (this.x >= 505) {
        this.x = 0;
    }
    
    // Collision Check
    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(move) {
    this.x = null;
    this.y = null;
    this.move = move;
    this.score = 0;
    this.level = 1;
    this.won = false;
    this.sprite = null;
}

Player.prototype.update = function() {
}

// Draw Player
// Display Score
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + player.score, 360, 570);
    ctx.fillText('Level: ' + player.level, 40, 570);
};

// Keypress for player
// Limit player movement inside the canvas
Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.x -= player.move;
        if (player.x < 0) {
            player.x = 0;
        }
    }
    if (keyPress == 'right') {
        player.x += player.move;
        if (player.x > 404) {
            player.x = 404;
        }
    }
    if (keyPress == 'up') {
        player.y -= player.move - 17.5;
        if (player.y + 63 <= 0) {
            player.x = 202;
            player.y = 375.5;

            player.score += 50;
            player.level += 1;
            increaseDifficulty();
            
            if (player.level > 3) {
                player.won = true;
            }
        }
    }
    if (keyPress == 'down') {
        player.y += player.move - 17.5;
        if (player.y > 375.5) {
            player.y = 375.5;
        }
    }
}

// Check collision
var checkCollision = function(enemyLocation) {
    if (
        player.y + 41.5 >= enemyLocation.y
        && player.x <= enemyLocation.x + 70
        && player.y <= enemyLocation.y + 41.5
        && player.x + 70 >= enemyLocation.x
    ) 
    {
        player.x = 202;
        player.y = 375.5;
    }
};

// Increase number of enemies depending on the level
var increaseDifficulty = function() {
    // Resets enemiy
    allEnemies.length = 0;
    
    // Add more enemies when player level increases
    for (var i = 1; i <= player.level; i++) {
        var enemy = new Enemy(0, 50 + (Math.floor(Math.random() * 3)* 2)*41.5, 70 + Math.random()*200);
        allEnemies.push(enemy);
    }
}

// Define selector variable
var Selector = function(x, y, move) {
    this.x = x;
    this.y = y;
    this.move = move;
    this.sprite = 'images/Selector.png';
};

// Draw selector
Selector.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Selector event listner for keypress
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter',
    };

    selector.handleInput(allowedKeys[e.keyCode]);
});


// Selector keypress for moving selector
// Selector to stay in selection field
Selector.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        selector.x -= selector.move;
          if (this.x < 101) {
            this.x = 101;
        }
    }
    if (keyPress == 'right') {
        selector.x += selector.move;
        if (this.x > 303) {
            this.x = 303;
        }
    }
    if (keyPress == 'up') {
        selector.y -= selector.move - 17.5;
        if (this.y < 41.5) {
            this.y = 41.5;
        }
    }
    if (keyPress == 'down') {
        selector.y += selector.move - 17.5;
        if (this.y > 208.5) {
            this.y = 208.5;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Place the selector object in a variable called selector
var allEnemies = [];
var player = new Player(101);
var score = 0;
var enemy = new Enemy(0, 50 + (Math.floor(Math.random() * 3)* 2)*41.5, 70 + Math.random()*200);
var selector = new Selector(202, 125, 101);

allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    console.log(allowedKeys[e.keyCode]);
});