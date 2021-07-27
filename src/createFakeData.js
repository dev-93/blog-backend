import Post from "./models/post";

export default function createFakeDate() {
    const posts = [...Array(40).keys()].map(i => ({
        title: `포스트 #${i}`,
        body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum harum numquam quis doloribus temporibus ea labore voluptates, quaerat reprehenderit ipsum est! Dolores voluptate dolore ipsam ad illo iure quibusdam eveniet?`,
        tags: ['가짜', '데이터']
    }));

    Post.insertMany(posts, (err, docs) => {
        // console.log(docs);
    })
}