
let main_menu_template;

let parser = new Vueable();
// fetches the templates from the server.

let levels;
r_async.parallel([
    () => {main_menu_template = parser.parse( utils.syncAjax('ui_components/main_menu.vueable'))},
    () => {levels = JSON.parse(utils.syncAjax("api/levels")).n_levels}
]);

/*todo
* start scherm
* level select scherm
* options?
*/

const store = new Vuex.Store({
    state: {
        menu: "main_menu"
    },
    mutations: {
        load_main_menu: state => state.menu = "main_menu",
        load_game_ui: state => state.menu = "game_ui",
        load_game_over: state => state.menu = "game_over"
    }
});


Vue.component('main_menu', {
    template:  main_menu_template,
    data: function () {
        return {
            top_padding: 0,
            levels: levels,
            padding_top:0,
            game_started: false,
        }
    },
    mounted: function(){
        window.addEventListener('resize', this.recalculate_padding, false);
        this.recalculate_padding();
    },
    computed:{
        current_menu: function () {
            return store.state.menu;
        }
    },
    methods: {
        select_level: function (level_num) {
            console.log(level_num);
            //this.game_started = true;
            store.commit("load_game_ui");
            console.log(store.state.menu);
            load_nieuw_level(JSON.parse(utils.syncAjax("api/levels/" +level_num)));
        },
        recalculate_padding: function () {
            if (this.$refs.level_selector !== undefined){
                let padding = (window.innerHeight - this.$refs.level_selector.clientHeight) / 2;
                if (padding > 0){
                    this.padding_top = padding;
                }else{
                    this.padding_top = 0;
                }
            }
        },
        restart_level: function () {
            store.commit("load_game_ui");
            restart();
        },
        return_main_menu: function () {
            store.commit("load_main_menu");
        },
        up_press: function () {
            moveBlock('z', "inc", "move");
        },
        down_press: function () {
            moveBlock('z', "dec", "move");
        },
        left_press: function () {
            moveBlock('x', "dec", "move");
        },
        right_press: function () {
            moveBlock('x', "inc", "move");
        }
    }
});

function resize_main_menu() {
    let div  = $("#main_menu")[0];
    div.style.width = window.innerWidth + "px";
    div.style.height = window.innerHeight + "px";
}

window.addEventListener('resize', resize_main_menu, false);
resize_main_menu();


let main_menu = new Vue({
    el: '#main_menu'
});

const _C = document.querySelector('.container');

let x0 = null;

function lock(e) { x0 = unify(e).clientX };

let i = 0;

var start = { x: 0, y: 0 };

function touchStart(event) {

    start.x = event.touches[0].pageX;
    start.y = event.touches[0].pageY;
}

function touchMove(event) {

    offset = {};

    offset.x = start.x - event.touches[0].pageX;
    offset.y = start.y - event.touches[0].pageY;
    if (event.touches[0].pageX < offset.x) {
        moveBlock('x', "dec", "move");
        console.log("dec")
    } else if (event.touches[0].pageX > offset.x) {
        moveBlock('x', "inc", "move");
        console.log("inc");
    }

    console.log(event.touches[0].pageX);
    console.log(offset);
    return offset;
}

function move(e) {
    if (x0 || x0 === 0) {
        let dx = unify(e).clientX - x0, s = Math.sign(dx);

        if ((i > 0 || s < 0) && (i < N - 1 || s > 0))
            console.log("touch");

        x0 = null
    }
};
function unify(e) { return e.changedTouches ? e.changedTouches[0] : e };
function drag(e) {
    e.preventDefault()
    
};

_C.addEventListener('mousemove', drag, false);
_C.addEventListener('touchmove', touchMove, false);
_C.addEventListener('mousedown', lock, false);
_C.addEventListener('touchstart', touchStart, false);

_C.addEventListener('mouseup', move, false);
_C.addEventListener('touchend', move, false);

