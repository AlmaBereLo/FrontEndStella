<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <card>
            <template slot="header">
              <h4 class="card-title">100 Awesome Nucleo Icons</h4>
              <p class="card-category">
                Handcrafted by our friends from <a target="_blank" href="https://nucleoapp.com/?ref=1712">NucleoApp</a>
              </p>
            </template>
            <div class="all-icons">
              <div class="row">
                <div class="col-12">
                    <li>
                      <router-link to="/admin/agencias">Agencias</router-link>
                    </li>   
                    <li>
                      <router-link to="/admin/departamentos">Departamentos</router-link>
                    </li>     
                </div>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from 'src/components/Cards/Card.vue';

export default {
  components: {
    Card,
  },
  data() {
    return {
      activeMenu: null, // Para controlar qué menú está abierto
    };
  },
  methods: {
    toggleSubmenu(menu) {
      // Alternar el menú activo
      this.activeMenu = this.activeMenu === menu ? null : menu;
    },
  },
};
</script>

