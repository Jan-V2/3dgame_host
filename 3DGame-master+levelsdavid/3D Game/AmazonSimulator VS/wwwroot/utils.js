utils = {
    
    
    syncAjax: function (url) {
        let result;
        $.ajax({
            url: url,
            success: function (_result) {
                result = _result;
            },
            async: false
        });
        return result;
    }
};
