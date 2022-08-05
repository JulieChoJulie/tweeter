const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Post extends Model {
    static init(sequelize){
        return super.init({
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        }, {
            modelName: 'Post',
            tableName: 'posts',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            sequelize,
       });

    }
    static associate(db) {
        // post.addUser
        db.Post.belongsTo(db.User); // post writer
        db.Post.hasMany(db.Comment);
        // post.addImages
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
        // post.addLikers & post.removeLikers
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); // Users like Posts
        // post.addRetweet
        db.Post.belongsTo(db.Post, { as: 'Retweet' });  // retweet
    }
};