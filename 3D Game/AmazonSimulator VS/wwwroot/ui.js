
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

function onTouch(evt) {
    
}

function swipedetect(el, callback) {
    console.log("swipedetect");
    var touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 150, //required min distance traveled to be considered swipe
        restraint = 100, // maximum distance allowed at the same time in perpendicular direction
        allowedTime = 300, // maximum time allowed to travel that distance
        elapsedTime,
        startTime,
        handleswipe = callback || function (swipedir) { }

    touchsurface.addEventListener('touchstart', function (e) {
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
    }, false)

    touchsurface.addEventListener('touchmove', function (e) {
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)

    touchsurface.addEventListener('touchend', function (e) {
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime) { // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
                swipedir = (distX < 0) ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
                swipedir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            } else {
                let target = document.elementFromPoint(touchobj.pageX, touchobj.pageY);
                let e = new Event('touchstart');
                target.dispatchEvent(e);
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}

var el = document.querySelector('.container');
swipedetect(el, function (swipedir) {
    if (swipedir == 'left') {
        console.log("left swipe");
        moveBlock('x', "dec", "move");
    }
    if (swipedir == 'right') {
        moveBlock('x', "inc", "move");
    }
    if (swipedir == 'up') {
        moveBlock('z', "inc", "move");
    }
    if (swipedir == 'down') {
        moveBlock('z', "dec", "move");
    }
})
