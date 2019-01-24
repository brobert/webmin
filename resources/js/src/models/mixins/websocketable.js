/* eslint-disable */
/**
 * Websocketable allows to keep models synced with server data.
 * Websocket channel is opened. Each time data is changed on server
 * then js model may refetch its data.
 *
 * var myUserSetting = new UserSetting(undefined, {websocketable: true});
 * // any changes done on server data will be fetched by myUserSetting 
 * // and update values of attributes
 * myUserSetting.websocketableStop(); // stop listening to changes
 *
 * TODO if model is saved then do not refetch it, use model.uniqueId
 */

export default function(model) {
    if (model.id) subscribe(model);

    // the only public method
    model.websocketableStop = unsubscribe;

    var pubSubToken; // allows to unsubscribe

    /**
     * Generates channel name, uniqe per resource name & id.
     * Must be the same as Mojolicious::Plugin::Websocketable::get_channel_name
     * @returns {string} eg. 'res:user_setting:123' means UserSetting with id (primary key) 123
     */
    function getChannelName() {
        return ['res', model.getResName(), model.id].join(':');
    }

    /**
     * Starts listen to websocket.
     * Calls refresh in case of message about update.
     */
    function subscribe() {
        if (model.hasOwnProperty('wsChannelActive')) {
            console.error('Websocketable tries to subscribe again' + infoId()); // should never happen
        }

        model.wsChannelActive = getChannelName(model);
        pubSubToken = OWA.socket.message.on(model.wsChannelActive, refresh);
        console.debug("Websocketable subscribed" + infoId());
    }

    /**
     * Stops listening to websocket.
     */
    function unsubscribe() {
        console.debug("Websocketable unsubscribed" + infoId());
        OWA.socket.message.off(pubSubToken);
        delete model.wsChannelActive;
    }

    /**
     * Performs refetch of model.
     * It may happen that model has already been changed by user 
     * and should not be overwritten by server changes.
     */
    function refresh() {
        /*
        if (model.hasChanged()) {
            console.debug("Websocketable called to refetch but is has local changes" + infoId());
            return; // TODO maybe some notification if model is currently edited in form
        }
        */
        model.fetch();
        console.debug("Websocketable refresh" + infoId());
    }

    function infoId() {
        return ' ' + model.wsChannelActive + ' uid:' + model.uniqueId();
    }
}

