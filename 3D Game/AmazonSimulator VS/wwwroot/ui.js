
let main_menu_template;

let parser = new Vueable();
// fetches the templates from the server.
r_async.parallel([
    () => {main_menu_template = parser.parse( utils.syncAjax('ui_components/main_menu.vueable'))}
]);

/*todo
* start scherm
* level select scherm
* options?
*/

Vue.component('main_menu', {
    template:  main_menu_template,
    data: function () {
        return {
            top_padding: 0,
            levels: 33,
            padding_top:0,
            game_started: false,
        }
    },
    mounted: function(){
        window.addEventListener('resize', this.recalculate_padding, false);
        this.recalculate_padding();
    },
    computed:{

    },
    methods: {
        select_level: function (level_num) {
            console.log(level_num);
            this.game_started = true;
            startUp(JSON.parse(utils.syncAjax("api/levels/3")));
        },
        recalculate_padding: function () {
            let padding = (window.innerHeight - this.$refs.level_selector.clientHeight) / 2;
            if (padding > 0){
                this.padding_top = padding;
            }else{
                this.padding_top = 0;
            }
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
