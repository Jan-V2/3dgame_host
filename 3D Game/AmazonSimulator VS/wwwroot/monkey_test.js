let hooks = new function () {

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    
    function move_block(key) {
        if (inputReady === true) {
            keypresses.push(key);
            if (key === "w" || key === "W") {
                moveBlock('z', "inc", "move");
            }
            else if (key === "a" || key === "A") {
                moveBlock('x', "dec", "move");
            }
            else if (key === "s" || key === "S") {
                moveBlock('z', "dec", "move");
            }
            else if (key === "d" || key === "D") {
                moveBlock('x', "inc", "move");
            }

        }
    }

    this.move_up = function () {
        move_block("w");
    };
    this.move_down = function () {
        move_block("s");
    };
    this.move_left = function () {
        move_block("a");
    };
    this.move_right = function () {
        move_block("d");
    };

    this.restart  = function () {
        restart_level();
        store.commit("load_game_ui");
    };

    this.has_lost = function () {
        return store.state.menu !== "game_ui"
    };

    this.load_nieuw_level = function (level_num) {
        store.commit("load_game_ui");
        let num = (+level_num)+1;
        load_nieuw_level(JSON.parse(utils.syncAjax("api/total_levels/" + num)));
    };

    this.sleep = function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    this.random_direction = function () {
        let num = getRandomInt(4);
        if (num === 0){
            this.move_up();
        }else if (num === 1){
            this.move_down();
        }else if (num === 2){
            this.move_left();
        }else if (num === 3){
            this.move_right();
        }
    }
};

let errs = [];
let ticks_per_level = 10;
let keypresses = [];

if (do_monkeytest){
    $(document).ready(async function () {
        for (let level_id in _.range(total_levels)) {
            keypresses = [];
            await hooks.sleep(2000);
            console.log(level_id)
            hooks.load_nieuw_level(level_id);
            await hooks.sleep(2000);
            for (let i in _.range(ticks_per_level)) {
                try {
                    if (hooks.has_lost()) {
                        keypresses = [];
                        hooks.restart();
                    } else {
                        hooks.random_direction();
                    }
                    await hooks.sleep(400);
                } catch (err) {
                    console.log(err);
                    errs.push({level_id: level_id, err: err, keypresses: keypresses});
                }
                console.log(i + "/" + ticks_per_level);
            }
            level_id = "";
        }
        console.log("found " + errs.length + " errors.");
        console.log(errs);
    })
}