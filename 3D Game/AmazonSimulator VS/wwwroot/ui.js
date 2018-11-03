
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
            font_size: 10
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
