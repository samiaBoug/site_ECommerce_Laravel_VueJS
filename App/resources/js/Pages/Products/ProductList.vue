<template>
    <h1>Listes de produits</h1>
        <button @click="showModal" class="btn show-modal-btn">Ajouter produit</button>
        <div >
            <CreateComponent v-if="show" @hideModal= "hideModal" @productAdded = "addNewProduct"
                 />
        </div>
        <div>
            <table>
            <tr>
            <td>Id </td>
            <td>Nom de produit</td>
            <td>Description</td>
            <td>Prix</td>
            <td>Action</td>
            </tr>
            <tr v-for="prod in products" :key="prod.id">
            <td >{{ prod.id }}</td>
            <td >{{ prod.name }}</td>
            <td >{{ prod.description }}</td>
            <td>{{ prod.price }}</td>
            <td>
            <button type="" @click="deleteProduct(prod.id)" >Suprimer</button>
            <button type="">Modifier</button>
            </td>

            </tr>

            </table>
        </div>

</template>

<script setup>
import axios from 'axios';
import { ref , reactive , onMounted} from 'vue';
import CreateComponent from './ProductCreate.vue'

const show = ref(false); // Reactive show state

function showModal() {
    show.value = true; // Show modal
}

function hideModal() {
    show.value = false; // Hide modal
}
//jebt data mn route et affichitha fl page
const products = ref([])
const fetchData = async()=>{
    const response = await fetch('/products');
    const data = await response.json()
    return products.value = data.products
}
onMounted(() => {
    fetchData(); // Fetch products when the component is mounted
});

// emit products
function addNewProduct(newProduct){
    products.value.push(newProduct)
}

// delete
const deleteProduct=  async (id)=>{
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
        try {
            await axios.delete(`/products/${id}`); // Requête DELETE avec l'ID du produit
            products.value = products.value.filter(prod => prod.id !== id); // Mise à jour de la liste locale
            alert('Produit supprimé avec succès !');
        } catch (error) {
            console.error('Erreur lors de la suppression :', error);
            alert('Une erreur est survenue lors de la suppression du produit.');
        }
    }


}

</script>

<style scoped>


</style>