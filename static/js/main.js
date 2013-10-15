/**
 * The Module++ 
 *
 * @module Modulepp
 * @title Module++
 *
 */

/**
* @class Modulepp
*/
var Modulepp = function(){
    this.loadingNodifier = -1;
};

/**
 * EventHandler of clicked submitBtn
 *
 * @method clickSubmitBtn
 **/
Modulepp.prototype.clickSubmitBtn = function(){
    $('#ModuleNameForm').trigger("submit");
};

/**
 * Eventhandler of pressed enter key
 * 
 * @method submit
 */
Modulepp.prototype.submit = function(){
    var self = this;
    this.viewReset();
    this.startLoading();
    this.loadingNotifier = setInterval(this.noticeLoading, 1000);

    this.sendQuery($('#ModuleNameForm')).done(this.done).fail(this.fail).always(function(){self.loaded();});

    return false;
};

/**
 * reset view
 * @method viewReset
 */
Modulepp.prototype.viewReset = function(){
    $('#UserList').hide();
    $('#anonymouse').empty();
    $('.user').remove();
};

/**
 * start loading called when after click submit btn or press enter key
 * @method startLoading
 */
Modulepp.prototype.startLoading = function(){
    $('#Loading').text('Now Loading').show();
};

/**
 * progress when xhr loading
 * @method noticeLoading
 */
Modulepp.prototype.noticeLoading = function(){
    $('#Loading').text($('#Loading').text() + '.');
};

/**
 * loaded ajax data
 * @method loaded
 */
Modulepp.prototype.loaded = function(){
    clearInterval(this.loadingNotifier);
    $('#Loading').hide();
};

/**
 * send query to server by ajax
 *
 * @method sendQuery
 */
Modulepp.prototype.sendQuery = function(self){
    var ajaxprm = $.ajax({
        url:  '/find',
        type: 'post',
        dataType: 'text',
        data: $(self).serialize()
    });

    return ajaxprm;
};

/**
 * the method show list of users called when ajax is resolved
 *
 * @method done
 */
Modulepp.prototype.done = function(data, status, xhr){
    console.dir(xhr);
    var res = data || xhr.responseText;
    var splitres = res.split(',');
    var users = splitres.slice(0, splitres.length - 1);
    _.each(users, function (user) {
        $('#UserList').append("<li class='user'>" + _.escape(user) + "</li>");
    });
    $('#UserList').show();

    var anonymouses = splitres[splitres.length - 1];
    var paragraph = $("#anonymouse");
    if( paragraph.length === 0){
        paragraph = $("<p />").attr("id", "anonymouse");
        $("#UserList").after(paragraph);
    }
    paragraph.text(anonymouses);
};

/**
 * called when ajax is failed
 *
 * @method fail
 */
Modulepp.prototype.fail = function(){
    alert("ERROR");
    console.error("ERROR", arguments);
};

/**
 * init
 * @method setEvent
 */
Modulepp.prototype.setEvent = function(){
    var self = this;
    $('#SubmitBtn').on("click", function(){
            self.clickSubmitBtn();
            });
    $('#ModuleNameForm').submit(function(){
            return self.submit();
            });
};

$(function () {
    var modulepp = new Modulepp();
    modulepp.setEvent();
});
