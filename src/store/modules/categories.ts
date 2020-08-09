import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import axios from 'axios';

@Module({ namespaced: true, name: 'categories' })
class Categories extends VuexModule {
  public categories: [] = [];

  @Mutation
  public setCategory(categories: []): void {
    this.categories = categories;
  }

  @Action({ commit: 'setCategory' })
  public fetchCategory() {
    axios.get(`http:localhost:3000/categories`).then((res) => {
      return res.data;
    });
  }
}

export default Categories;
