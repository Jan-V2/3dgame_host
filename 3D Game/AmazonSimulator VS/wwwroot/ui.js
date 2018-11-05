
let main_menu_template;
let is_on_mobile;
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
        menu: "main_menu",
        passed_levels : [],

    },
    mutations: {
        load_main_menu: state => state.menu = "main_menu",
        load_game_ui: state => state.menu = "game_ui",
        load_game_over: state => state.menu = "game_over",
        add_passed_level: (state, level_num) => {
            if (state.passed_levels.indexOf(level_num) === -1){
                state.passed_levels.push(level_num);
                document.cookie = JSON.stringify(state.passed_levels);
            }
        },
        load_unlocks_from_cookie:(state) => {
            try {
                state.passed_levels = JSON.parse(document.cookie);
            }
            catch(err) {
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
        window.addEventListener('resize', this.recalculate_padding, false);
        this.recalculate_padding();
    },
    computed:{
        current_menu: function () {
            return store.state.menu;
        },
        num_available_levels: function () {
            if(devmode){
                return levels;
            }else{
                let ret = store.state.passed_levels.length +1;
                if (ret > levels){
                    return levels;
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



        select_level: function (level_num) {
            console.log(level_num);
            //this.game_started = true;
            store.commit("load_game_ui");
            console.log(store.state.menu);
            load_nieuw_level(JSON.parse(utils.syncAjax("api/levels/" +level_num)));
            current_level_number = level_num;
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
