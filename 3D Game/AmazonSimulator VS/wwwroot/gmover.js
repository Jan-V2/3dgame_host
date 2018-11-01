//Initialize game over template variable
let game_over_template;
// initialize parser variable
let parsergm = new Vueable();

// load the template from the server
r_async.parallel([
    () => { game_over_template = parsergm.parse(utils.syncAjax('ui_components/game_over.vueable')) }
]);

// setup 'game over' component and set variables used in the template
Vue.component('game_over', {
    template: game_over_template,
    data: function () {
        return {
            top_padding: 0,
            padding_top: 0,
            game_ended: true,
        }
    },
    mounted: function () {
        window.addEventListener('resize', this.recalculate_padding, false);
        this.recalculate_padding();
    },
    computed: {

    },
    methods: {
        return_menu: function () {
            console.log("button clicked");
            window.location.href("main_menu");
        },
        restart: function (level_num) {
            this.game_started = false;
            startUp(JSON.parse(utils.syncAjax("api/levels/" + level_num)));
        },
        recalculate_padding: function () {
            let padding = (window.innerHeight - this.$refs.game_over_options.clientHeight) / 2;
            if (padding > 0) {
                this.padding_top = padding;
            } else {
                this.padding_top = 0;
            }
        }
    }
});

function resize_game_over() {
    let div = $("#game_over")[0];
    div.style.width = window.innerWidth + "px";
    div.style.height = window.innerHeight + "px";
}

let game_over = new Vue({
    el: '#game_over'
});
