main_menu_templ = "<div>\n" +
    "<!-- this is the template for the ui.\n" +
    "     it's a normal vue template, but it preparsed by a custom tool called vueable that i (jan) have written\n" +
    "     for more information on vueable visit: https://github.com/johnvanderholt/vueable\n" +
    "\n" +
    "     each section of this template is a different screen.\n" +
    "     which screen is active is determined by the value of the current_module variable in the vue component.-->\n" +
    "    % v-if=\"current_menu === 'main_menu'\" =>\n" +
    "    <div class=\"menu-background\">\n" +
    "        <div class=\"centervh\">\n" +
    "            <div>\n" +
    "                <img src=\"textures/BloxorzLogo.png\"></img>\n" +
    "            </div>\n" +
    "            % v-if=\"!credits_active\" =>\n" +
    "            <div>\n" +
    "                <div class=\"wrapper\" ref=\"level_selector\" v-bind:style=\"{paddingTop: 100 + 'px',gridTemplateColumns: column_class_text }\">\n" +
    "                    % v-for=\"level_num in _.range(num_available_levels)\" @click=\"select_level(level_num + 1)\" =>\n" +
    "                    <button type=\"button\" class=\"btn btn-primary\" >{{\"level \" + (level_num + 1)}}</button>\n" +
    "                </div>\n" +
    "                <div class=\"clearfix\" style=\"height: 50px;\"></div>\n" +
    "                % @click=\"toggle_credits()\" =>\n" +
    "                <button class=\"btn btn-secondary\">credits</button>\n" +
    "            </div>\n" +
    "            % v-else =>\n" +
    "            <div style=\"color: white\">\n" +
    "                <h3>frontend programmer: daan</h3>\n" +
    "                <a href=\"https://github.com/CrEaTiiOn187\">github</a>\n" +
    "                <h3>3d programming: jeffery</h3>\n" +
    "                <a href=\"https://github.com/Raphire\">github</a>\n" +
    "                <h3>level designer: david </h3>\n" +
    "                <a href=\"https://github.com/verburg95\">github</a>\n" +
    "                <h3>backend programmer: jan</h3>\n" +
    "                <a href=\"https://github.com/johnvanderholt\">github</a>\n" +
    "                <div class=\"clearfix\" style=\"height: 30px\"></div>\n" +
    "                % @click=\"toggle_credits()\"=>\n" +
    "                <button class=\"btn btn-secondary\">Back to main menu</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    % v-if=\"current_menu === 'game_ui'\" =>\n" +
    "    <div>\n" +
    "        % @click=\"restart_level()\" =>\n" +
    "        <button type=\"button\" class=\"btn btn-lg btn-primary btn-custom\">Restart</button>\n" +
    "        % @click=\"return_main_menu()\" =>\n" +
    "        <button type=\"button\" class=\"btn btn-lg btn-primary btn-custom\">Return to Main Menu</button>\n" +
    "    </div>\n" +
    "    % v-if=\"current_menu === 'game_over'\" =>\n" +
    "    <div class=\"menu-background\" ref=\"game_over\">\n" +
    "      <p class=\"game-over-title text-center\">Game Over</p>\n" +
    "        % @click=\"return_main_menu()\" =>\n" +
    "        <button type=\"button\" class=\"btn btn-lg btn-primary btn-game-over-restart\">Back to main menu</button>\n" +
    "        % @click=\"restart_level()\" =>\n" +
    "        <button type=\"button\" class=\"btn btn-lg btn-primary btn-game-over-restart\">Restart</button>\n" +
    "    </div>\n" +
    "    % v-if=\"current_menu === 'level_won'\" =>\n" +
    "    <div style=\"text-align: center; padding-top: 100px;color:white\">\n" +
    "        <h1 style =\"padding-bottom: 20px\">Level completed!</h1>\n" +
    "        <div class=\"clearfix\"></div>\n" +
    "        %  @click=\"load_menu('load_main_menu')\" =>\n" +
    "        <button class=\"btn btn-lg btn-primary btn-game-over-restart\">Back to main menu</button>\n" +
    "        %  @click=\"select_next_level()\" =>\n" +
    "        <button class=\"btn btn-lg btn-primary btn-game-over-restart\">Next level</button>\n" +
    "    </div>\n" +
    "    % v-if=\"current_menu === 'game_won'\" =>\n" +
    "    <div style=\"text-align: center; padding-top: 100px;color: white\">\n" +
    "        <h1>Congratulations!</h1>\n" +
    "        <div class=\"clearfix\" > </div>\n" +
    "        <h3 style =\"padding-bottom: 20px\">You have completed the game!</h3>\n" +
    "        <div class=\"clearfix\"></div>\n" +
    "        %  @click=\"load_menu('load_main_menu')\" =>\n" +
    "        <button class=\"btn btn-lg btn-primary btn-game-over-restart\">Back to main menu</button>\n" +
    "    </div>\n" +
    "</div>\n"
