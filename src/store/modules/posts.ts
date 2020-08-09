import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import axios from 'axios';
@Module({ namespaced: true, name: 'posts' })
class Post extends VuexModule {
  public posts: [] = [];

  @Mutation
  public setPost(posts: []): void {
    this.posts = posts;
  }

  @Action({ commit: 'setPost' })
  public fetchPost() {
    axios.get(`http:localhost:3000/posts`).then((res) => {
      return res.data;
    });
  }
}

export default Post;
