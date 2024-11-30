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
          <h4 class="mb-0" style="text-align: center;">
            {{ editMode ? 'Editar Agencia' : 'Agregar Agencia' }}
          </h4>
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
            <button type="submit" class="btn btn-success mr-2">Guardar</button>
            <button type="button" class="btn btn-warning mr-2" @click="cancelForm">Cancelar</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Tabla de agencias -->
    <div class="table-responsive">
      <table class="table table-striped table-bordered dt-responsive nowrap" cellspacing="0" width="100%">
        <thead class="thead-dark">
          <tr>
            <th scope="col" style="width: 5%;">#</th>
            <th scope="col" style="width: 60%;">Nombre</th>
            <th scope="col" style="width: 35%;">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="agencia in agencias" :key="agencia.id_agencia">
            <td>{{ agencia.id_agencia }}</td>
            <td>{{ agencia.nombre_age }}</td>
            <td>
              <button class="btn btn-warning btn-sm" @click="editAgency(agencia)">
                <i class="fa-solid fa-pen-to-square" style="color: #FFD43B;"></i> Editar
              </button>
              <button class="btn btn-danger btn-sm" @click="eliminarAgencia(agencia.id_agencia)">
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
import axios from "axios";

const apiUrl = "https://d854-189-164-39-38.ngrok-free.app/api"
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
    
    // Obtener todas las agencias
    async fetchAgencias() {
      try {
        // Realiza la solicitud GET usando axios
        const response = await axios.get(`${apiUrl}/agencia`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });

        // Los datos ya vienen parseados en response.data
        console.log("Datos obtenidos:", response.data);

        // Verifica si la respuesta es un array
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
          await axios.post("${apiUrl}/agencia", this.formData);
        }
        this.fetchAgencias();
        this.cancelForm();
      } catch (error) {
        console.error("Error al guardar la agencia:", error);
      }
    },

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

    // Mostrar el formulario para agregar o editar
    openForm() {
      this.showForm = true;
      this.editMode = false;
      this.resetForm();
    },

    // Cancelar el formulario
    cancelForm() {
      this.showForm = false;
      this.resetForm();
    },

    // Resetear los datos del formulario
    resetForm() {
      this.formData = {
        id_agencia: null,
        nombre_age: "",
      };
    },

    // Editar una agencia
    editAgency(agency) {
      this.formData = { ...agency };  // Asignar los datos de la agencia al formulario
      this.showForm = true;
      this.editMode = true;
    },
  },
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



