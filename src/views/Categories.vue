<template>
  <v-data-table
    :headers="headers"
    :items="categories"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Categories</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
              >Add Category</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Category name"
                    ></v-text-field>
                  </v-col>
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Categories extends Vue {
  public dialog: boolean;
  public headers: Array<Record<string, any>>;
  public categories: Array<Record<string, any>>;
  public editedIndex: number;
  public editedItem: Record<string, any>;
  public defaultItem: Record<string, any>;
  constructor() {
    super();
    this.dialog = false;
    this.headers = [
      { text: 'Name', value: 'name' },
      { text: 'Actions', value: 'actions', sortable: false },
    ];
    this.categories = [];
    this.editedIndex = -1;
    this.editedItem = {
      id: (Math.floor(Math.random() * 100) + 1).toString(),
      name: '',
    };
    this.defaultItem = {
      id: (Math.floor(Math.random() * 100) + 1).toString(),
      name: '',
    };
  }

  get formTitle() {
    return this.editedIndex === -1 ? 'New Category' : 'Edit Category';
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
  initialize() {
    this.categories = [
      {
        id: 1,
        name: 'Music',
      },
      {
        id: 2,
        name: 'Movie',
      },
    ];
  }
  editItem(item: any) {
    this.editedIndex = this.categories.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.dialog = true;
  }
  deleteItem(item: any) {
    const index = this.categories.indexOf(item);
    confirm('Are you sure you want to delete this item?') &&
      this.categories.splice(index, 1);
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
      Object.assign(this.categories[this.editedIndex], this.editedItem);
    } else {
      this.categories.push(this.editedItem);
    }
    this.close();
  }
}
</script>

<style></style>
