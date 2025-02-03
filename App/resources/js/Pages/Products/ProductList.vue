<template>
    <table>
        <thead>
            <tr>
                <td>id</td>
                <td>Nom</td>
                <td>Déscription</td>
                <td>Prix</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in products" v-bind:key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.description }}</td>
                <td>{{ product.price }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import {onMounted, ref} from 'vue' ;
    import axios from 'axios';

    let products= ref([])
    let fetchData = async ()=>{
        response = await fetsh('/products');
        data = response.json()
        products.push(response)
        return products.value = data.products
    }
    onMounted(()=>{
        fetchData()
    })
</script>