<template>
  <div class="container mt-4">
    <h2 class="typo-line mb-4">Gestión de Agencias</h2>
    <div class="text-right mb-4">
      <button class="btn btn-primary" @click="openForm">
        <i class="fa-solid fa-plus"></i> Agregar
      </button>
    </div>
    <div v-if="showForm" class="modal-overlay" @click.self="cancelForm">
      <div class="card modal-content">
        <div class="card-header">
          <h4 class="mb-4">{{ editMode ? 'Editar Agencia' : 'Agregar Agencia' }}</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="guardarAgencia">
            <div class="form-group">
              <label for="nombre_age">Nombre Agencia</label>
              <input 
                type="text"
                id="nombre_age"
                v-model="formData.nombre_age"
                class="form-control"
                placeholder="Nombre de la agencia"
                required
              />
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-success mr-2">
                <i class="fa-solid fa-check"></i> Guardar
              </button>
              <button type="button" class="btn btn-secondary" @click="cancelForm">
                <i class="fa-solid fa-times"></i>Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="table-responsive">
<<<<<<<<< Temporary merge branch 1
      <table class="table table-striped table-bordered dt-responsive nowrap" cellspacing="0" width="100%">
=========
      <table class="table table-striped table-hover text-center">
>>>>>>>>> Temporary merge branch 2
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="agencia in agencias" :key="agencia.id_agencia">
            <td>{{ agencia.id_agencia }}</td>
            <td>{{ agencia.nombre_age }}</td>
            <td class="td-actions">
              <button class="btn btn-warning btn-sm" @click="editAgency(agencia)">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="btn btn-danger btn-sm" @click="eliminarAgencia(agencia.id_agencia)">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
<<<<<<<<< Temporary merge branch 1

const apiUrl = "https://d854-189-164-39-38.ngrok-free.app/api"
=========
const apiUrl = "https://d854-189-164-39-38.ngrok-free.app/api";
>>>>>>>>> Temporary merge branch 2
export default {
  data() {
    return {
      showForm: false,
      editMode: false,
      agencias: [],
      formData: {
        id_agencia: null,
        nombre_age: "",
      },
    };
  },
  mounted() {
    this.fetchAgencias();
  },
  methods: {
<<<<<<<<< Temporary merge branch 1
    
    // Obtener todas las agencias
    async fetchAgencias() {
      try {
        // Realiza la solicitud GET usando axios
=========
    async fetchAgencias() {
      try {
>>>>>>>>> Temporary merge branch 2
        const response = await axios.get(`${apiUrl}/agencia`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });
<<<<<<<<< Temporary merge branch 1

        // Los datos ya vienen parseados en response.data
        console.log("Datos obtenidos:", response.data);

        // Verifica si la respuesta es un array
=========
        console.log("Datos obtenidos:", response.data);
>>>>>>>>> Temporary merge branch 2
        if (Array.isArray(response.data)) {
          this.agencias = response.data;
        } else {
          console.error("Datos no válidos recibidos de la API");
        }
      } catch (error) {
        // Manejo de errores
        console.error("Error al obtener los datos de la API:", error);
      }
    },


    // Guardar o actualizar agencia
    async guardarAgencia() {
      try {
        if (this.formData.id_agencia) {
          // Actualizar agencia existente
          await axios.put(`${apiUrl}/agencia/${this.formData.id_agencia}`, this.formData);
        } else {
          // Crear nueva agencia
<<<<<<<<< Temporary merge branch 1
          await axios.post("${apiUrl}/agencia", this.formData);
=========
          await axios.post(`${apiUrl}/agencia`, this.formData); // Usar backticks aquí
>>>>>>>>> Temporary merge branch 2
        }
        this.fetchAgencias();
        this.cancelForm();
      } catch (error) {
        console.error("Error al guardar la agencia:", error);
      }
    },
<<<<<<<<< Temporary merge branch 1

=========
>>>>>>>>> Temporary merge branch 2
    // Eliminar una agencia
    async eliminarAgencia(id) {
      if (confirm("¿Estás seguro de eliminar esta agencia?")) {
        try {
          await axios.delete(`${apiUrl}/agencia/${id}`);
          this.fetchAgencias();
        } catch (error) {
          console.error("Error al eliminar la agencia:", error);
        }
      }
    },
<<<<<<<<< Temporary merge branch 1

=========
>>>>>>>>> Temporary merge branch 2
    // Mostrar el formulario para agregar o editar
    openForm() {
      this.showForm = true;
      this.editMode = false;
      this.resetForm();
    },
<<<<<<<<< Temporary merge branch 1

=========
>>>>>>>>> Temporary merge branch 2
    // Cancelar el formulario
    cancelForm() {
      this.showForm = false;
      this.resetForm();
    },
<<<<<<<<< Temporary merge branch 1

=========
>>>>>>>>> Temporary merge branch 2
    // Resetear los datos del formulario
    resetForm() {
      this.formData = {
        id_agencia: null,
        nombre_age: "",
      };
    },
<<<<<<<<< Temporary merge branch 1

    // Editar una agencia
    editAgency(agency) {
      this.formData = { ...agency };  // Asignar los datos de la agencia al formulario
=========
    // Editar una agencia
    editAgency(agency) {
      this.formData = { ...agency }; // Asignar los datos de la agencia al formulario
>>>>>>>>> Temporary merge branch 2
      this.showForm = true;
      this.editMode = true;
    },
  },
};
</script>
<<<<<<<<< Temporary merge branch 1


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



=========
>>>>>>>>> Temporary merge branch 2
