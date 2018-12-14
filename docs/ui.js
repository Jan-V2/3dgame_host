// this is the file with all of the ui code.
// it uses a libary called vue to create a dynamic and responsive ui.
let main_menu_template;
let is_on_mobile;
let parser = new Vueable();
// fetches the templates from the server.

let total_levels;
r_async.parallel([
    () => {main_menu_template = parser.parse(main_menu_templ )},
    () => {total_levels = Object.keys(levels).length}
]);

// the store alllows the threejs code to interact with the vue code.
// it utilizes a library called vuex.
const store = new Vuex.Store({
    state: {
        menu: "main_menu",
        passed_levels : [],
        current_level: 0
    },
    mutations: {
        // all changes to the store object, are made through these setter functions.
        load_main_menu: state => state.menu = "main_menu",
        load_game_ui: state => state.menu = "game_ui",
        load_game_over: state => state.menu = "game_over",
        load_level_won:(state, level_num) => {
            state.current_level = level_num;
            if (state.passed_levels.indexOf(level_num) === -1){
                state.passed_levels.push(level_num);
                document.cookie = JSON.stringify(state.passed_levels);
            }
            if(level_num < total_levels){
                state.menu = "level_won"
            }else{
                state.menu = "game_won"
            }
        },
        load_unlocks_from_cookie:(state) => {
            try {
                state.passed_levels = JSON.parse(document.cookie);
            }
            catch(err) {
                console.log("could not find cookie")
            }
        }
    }
});

is_on_mobile = function() {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        iosPlatforms = ['iPhone', 'iPad', 'iPod'];

    if (iosPlatforms.indexOf(platform) !== -1) {
        return true;
    } else if (/Android/.test(userAgent)) {
        return true;
    }

    return false;
}();


Vue.component('main_menu', {
    template:  main_menu_template,
    data: function () {

        store.commit("load_unlocks_from_cookie")

        return {
            top_padding: 0,
            padding_top:0,
            game_started: false,
            font_size: 10,
            collumn_css: undefined,
            classObject: {
                    color: "blue",
            }
        }
    },
    mounted: function(){
        // this function is run when the ui is loaded
        // it activates the automatic resizing function.
        window.addEventListener('resize', this.recalculate_padding, false);
        this.recalculate_padding();
    },
    computed:{
        // these are automatically calculated variables.
        // if the values the result is based on, they automatically recalcuate
        current_menu: function () {
            return store.state.menu;
        },
        num_available_levels: function () {
            if(!progression_enabled){
                return total_levels;
            }else{
                let ret = store.state.passed_levels.length +1;
                if (ret > total_levels){
                    return total_levels;
                }else{
                    return ret;
                }

            }
        },
        column_class_text: function () {
            let collum_width = 100;
            let collums_style_text = "";
            let max_collums = Math.floor(window.innerWidth / collum_width);
            if (max_collums > 5){
                max_collums = 5;
            }
            if (this.num_available_levels < max_collums){
                max_collums = this.num_available_levels;
            }
            for (let i in _.range(max_collums)){
                collums_style_text += " " + collum_width + "px";
            }
            return collums_style_text;
        },

    },
    methods: {
        // these functions are called by pressing buttons on the template.
        select_level: function (level_num) {
            store.commit("load_game_ui");
            load_nieuw_level(clone(levels[level_num]));
            current_level_number = level_num;
        },
        select_next_level: function () {
            // selects the next level.
            this.select_level( +store.state.current_level + 1)
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
        load_menu: function (menu) {
            store.commit(menu);
        },
        restart_level: function () {
            store.commit("load_game_ui");
            restart_level();
        },
        return_main_menu: function () {
            store.commit("load_main_menu");
        },
        up_press: function () { // deprecated?
            moveBlock('z', "inc", "move");
        },
        down_press: function () {// deprecated?
            moveBlock('z', "dec", "move");
        },
        left_press: function () {// deprecated?
            moveBlock('x', "dec", "move");
        },
        right_press: function () {// deprecated?
            moveBlock('x', "inc", "move");
        }
    }
});

function resize_main_menu() {
    // resizes the ui, if the window is resized.
    let div = $("#main_menu")[0];
    div.style.width = window.innerWidth + "px";
    div.style.height = window.innerHeight + "px";
}

window.addEventListener('resize', resize_main_menu, false);
resize_main_menu();

// adds the ui into the dom
let main_menu = new Vue({
    el: '#main_menu'
});


function swipedetect(el, callback) {
    // detects if the screen is being swiped, and in which direction.
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
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    }, { passive: false });

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
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}

let el = window;
swipedetect(el, function (swipedir) {
    // calls swipedetect and moves the player depending on the direction.
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
    } else {
        let target = document.elementFromPoint(pageX, pageY);
        console.log(target);
        let e = new Event('touchstart');
        target.dispatchEvent(e);
    }
})


function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;
    
    var temp = new obj.constructor();
    for(var key in obj)
        temp[key] = clone(obj[key]);
    
    return temp;
}
