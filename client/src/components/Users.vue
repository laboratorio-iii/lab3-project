<template>
    <v-content>
        <v-container grid-list-xs>
            <v-data-table
                :headers="headers"
                :items="users"
                :search="search"
                class="elevation-1"
            >
                <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Usuarios</v-toolbar-title>
                    <v-divider
                    class="mx-4"
                    inset
                    vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Buscar"
                        single-line
                        hide-details
                        :color="color_base"
                    ></v-text-field>
                    <!-- <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                            </v-flex>
                            </v-layout>
                        </v-container>
                        </v-card-text>

                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog> -->
                </v-toolbar>
                </template>
                <template v-slot:item.action="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                >
                    edit
                </v-icon>
                <v-icon
                    small
                    @click="deleteItem(item)"
                >
                    delete
                </v-icon>
                </template>
                <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
                </template>
            </v-data-table>
        </v-container>
    </v-content>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data: () => ({
      search: '',
      dialog: false,
      headers: [
        {
          text: 'Nombre',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Correo electrónico:', value: 'email' },
        { text: 'Nro. de publicaciones:', value: 'publications' },
        { text: 'Acciones', value: 'action', sortable: false },
      ],
      users: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        publications: 0,
      },
      defaultItem: {
        name: '',
        email: '',
        publications: 0,
      },
    }),

    computed: {
      ...mapState(['color_base']),
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.users = [
          {
            name: 'Lidiluz Perez',
            email: 'lidiluzp@gmail.com',
            publications: 9,
          },
          {
            name: 'Nohemy Perez',
            email: 'nohenatha@gmail.com',
            publications: 14,
          },
          {
            name: 'Zaidibeth Ramos',
            email: 'zaidi.ramos@gmail.com',
            publications: 7,
          },
          {
            name: 'Hermes Soto',
            email: 'hermesgabriel95@gmail.com',
            publications: 4,
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.users.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.users.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.users[this.editedIndex], this.editedItem)
        } else {
          this.users.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>