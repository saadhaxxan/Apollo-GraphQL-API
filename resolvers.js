const Post = require("./models/Post.model");
const resolvers = {
    Query: {
        getAllPosts: async() => {
            const posts = await Post.find();
            return posts;
        },
        getOnePost: async(parent, args, context, info) => {
            const { id } = args;
            const post = await Post.findById(id);
            return post;
        },
    },
    Mutation: {
        createPost: async(parent, args, context, info) => {
            const { title, description } = args.post;
            const post = new Post({ title, description });
            await post.save();
            return post;
        },
        deletePost: async(parent, args, context, info) => {
            const { id } = args;
            await Post.findByIdAndDelete(id);
            return "Post Deleted";
        },
        updatePost: async(parent, args, context, info) => {
            const { id } = args;
            const { title, description } = args.post;
            await Post.findByIdAndUpdate(id, { title, description }, { new: true });
            return "Post Updated";
        },
    },
};

module.exports = resolvers;