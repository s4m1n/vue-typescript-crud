<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="posts"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Posts</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
                >Add Post</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <!-- <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Post name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.categories"
                      label="Categories"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text> -->
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                    ></v-text-field>
                  </v-row>

                  <v-row>
                    <v-autocomplete
                      v-model="editedItem.categories"
                      :items="categories.map((item) => item)"
                      label="Categories"
                      multiple
                      dense
                    >
                      <template v-slot:prepend-item>
                        <v-list-item>
                          <div class="v-list-item__content">
                            <div
                              class="v-list-item__title linkcursor"
                              @click="addCategory"
                            >
                              Create New Category
                            </div>
                          </div>
                        </v-list-item>
                      </template>
                    </v-autocomplete>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
    <v-row justify="center">
      <v-dialog v-model="categoryDialog" max-width="600px">
        <v-card>
          <v-card-title color="primary" dark>
            <span class="headline">Add Category</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="category.name"
                    label="Name"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark text @click="createCategory"
              >Create Category</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Posts extends Vue {
  public dialog: boolean;
  public categoryDialog: boolean;
  public headers: Array<Record<string, any>>;
  public categories: Record<string, any>;
  public posts: Record<string, any>;
  public editedIndex: number;
  public editedItem: Record<string, any>;
  public defaultItem: Record<string, any>;
  public category: Record<string, any>;
  constructor() {
    super();
    this.dialog = false;
    this.categoryDialog = false;
    this.headers = [
      { text: 'Name', value: 'name' },
      { text: 'Categories', value: 'categories' },
      { text: 'Actions', value: 'actions', sortable: false },
    ];
    this.category = {
      id: '',
      name: '',
    };
    this.posts = [];
    this.categories = [
      'Music',
      'Movies',
      'Nepotism',
      'Debate',
      'Social Media',
      'Reading',
      'Writing',
      'Coding',
    ];
    this.editedIndex = -1;
    this.editedItem = {
      id: (Math.floor(Math.random() * 100) + 1).toString(),
      name: '',
      categories: [],
    };
    this.defaultItem = {
      id: (Math.floor(Math.random() * 100) + 1).toString(),
      name: '',
      categories: [],
    };
  }

  get formTitle() {
    return this.editedIndex === -1 ? 'New Post' : 'Edit Post';
  }
  //
  //
  // watch: {
  //     dialog(val) {
  //     val || this.close()
  // }
  /**
   * OnCreted LifeCicle event
   */
  created() {
    this.initialize();
  }

  createCategory() {
    this.categories.unshift(this.category.name);
    const newCategory = {
      name: this.categories[0],
    };
    this.categoryDialog = false;
  }

  addCategory() {
    this.categoryDialog = true;
    this.category = {
      id: (Math.floor(Math.random() * 10000000) + 1).toString(),
      name: '',
    };
  }

  initialize() {
    this.posts = [
      {
        id: 1,
        name: 'Entertainment',
        categories: ['Music', 'Movies'],
      },
      {
        id: 2,
        name: 'Extra Curricular',
        categories: ['Debate', 'Music'],
      },
      {
        id: '4',
        name: 'Picnic',
        categories: ['Music', 'Debate'],
      },
    ];
  }
  editItem(item: any) {
    this.editedIndex = this.posts.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.dialog = true;
  }
  deleteItem(item: any) {
    const index = this.posts.indexOf(item);
    confirm('Are you sure you want to delete this item?') &&
      this.posts.splice(index, 1);
  }
  close() {
    this.dialog = false;
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    });
  }
  save() {
    if (this.editedIndex > -1) {
      Object.assign(this.posts[this.editedIndex], this.editedItem);
    } else {
      this.posts.push(this.editedItem);
    }
    this.close();
  }
}
</script>
