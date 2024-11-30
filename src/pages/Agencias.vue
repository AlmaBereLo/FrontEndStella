<template>
  <div class="container mt-4">
    <h2 class="text-center">Gestión de Agencias</h2>

    <!-- Botón para agregar agencia -->
    <div class="text-right mb-3">
      <button class="btn btn-primary" @click="openForm">
        <i class="fa-solid fa-pen-to-square" style="color: #FFD43B;"></i> Agregar
      </button>
    </div>

    <!-- Formulario flotante para crear/editar agencias -->
    <div v-if="showForm" class="modal-overlay" @click.self="cancelForm">
      <div class="card modal-content">
        <div class="card-header">
          <h4 class="mb-0" style="text-align: center;">{{ editMode ? 'Editar Agencia' : 'Agregar Agencia' }}</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="saveAgency">
            <div class="form-group">
              <label for="name">Nombre Agencia</label>
              <input 
                type="text"
                id="name"
                v-model="form.name"
                class="form-control"
                placeholder="Nombre de la agencia"
                required
              />
            </div>
            <button type="submit" class="btn btn-success mr-2" style="color:green;">Guardar</button>
            <button type="button" class="btn btn-warning mr-2" style="color: firebrick;" @click="cancelForm">Cancelar</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Tabla de agencias -->
    <div class="table-responsive">
      <table class="table table-bordered table-hover text-center">
        <thead class="thead-dark">
          <tr>
            <th scope="col" style="width: 5%;">#</th>
            <th scope="col" style="width: 60%;">Nombre</th>
            <th scope="col" style="width: 35%;">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(agency, index) in agencies" :key="agency.id">
            <td>{{ index + 1 }}</td>
            <td>{{ agency.name }}</td>
            <td>
              <button class="btn btn-warning btn-sm" @click="editAgency(agency)">
                <i class="fa-solid fa-pen-to-square" style="color: #FFD43B;"></i> Editar
              </button>
              <button class="btn btn-danger btn-sm" @click="deleteAgency(agency.id)">
                <i class="fa-solid fa-trash" style="color: #ff3333;"></i> Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showForm: false,
      editMode: false,
      form: {
        id: null,
        name: ''
      },
      agencies: [
        { id: 1, name: 'Agencia Centro' },
        { id: 2, name: 'Agencia Norte' }
      ]
    };
  },
  methods: {
    openForm() {
      this.showForm = true;
      this.editMode = false;
      this.resetForm();
    },
    cancelForm() {
      this.showForm = false;
      this.resetForm();
    },
    resetForm() {
      this.form = {
        id: null,
        name: ''
      };
    },
    saveAgency() {
      if (this.editMode) {
        const index = this.agencies.findIndex((agency) => agency.id === this.form.id);
        if (index !== -1) {
          this.agencies.splice(index, 1, { ...this.form });
        }
      } else {
        const newAgency = {
          ...this.form,
          id: this.agencies.length ? Math.max(...this.agencies.map((a) => a.id)) + 1 : 1
        };
        this.agencies.push(newAgency);
      }
      this.showForm = false;
      this.resetForm();
    },
    editAgency(agency) {
      this.form = { ...agency };
      this.showForm = true;
      this.editMode = true;
    },
    deleteAgency(id) {
      if (confirm('¿Estás seguro de eliminar esta agencia?')) {
        this.agencies = this.agencies.filter((agency) => agency.id !== id);
      }
    }
  }
};
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  background-color: #fff;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-header {
  background-color: #f7f7f7;
  padding: 10px 15px;
  font-size: 1.25em;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}

.card-body {
  padding: 15px;
  font-size: 1em;
  color: #333;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  max-width: 600px;
  width: 100%;
}

.table-responsive {
  margin-top: 20px;
}


</style>



