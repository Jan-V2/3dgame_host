let main_menu_template;

let parser = new Vueable();
// fetches the templates from the server.
r_async.parallel([
    () => {main_menu_template = parser.parse( utils.syncAjax('ui_components/main_menu.vueable'))}
]);



Vue.component('main_menu', {
    template:  main_menu_template,
    data: function () {
        return {
            is_visible: true,
            test3:[""]
        }
    },
    mounted: function(){
    },
    computed:{
    
    },
    methods: {
        toggle_visibility: function() {
            this.is_visible = !this.is_visible;
        },
        add_one: function () {
            this.test3.push("");
        }
    }
});


let main_menu = new Vue({
    el: '#main_menu'
});
