// import _ from 'underscore';
import Backbone from 'backbone';
import BbAssociations from 'backbone-associations';
import ChatModel from './ChatModel';

let ChatCollection = Backbone.Collection.extend({
    model: ChatModel,
    url: '/res/chat',
});

export default ChatCollection;