
<template>
    <div id="loading">
        <div class="container">

            <div class="card mt-5 shadow">
                <div class="card-body">
                    <h5 class="card-title">Listagem Dev's GitHub</h5>
                    <hr>
                    <div class="input-group">
                        <input class="form-control border-end-0 border rounded-pill" type="search" id="example-search-input"
                            v-model="search" name="search">
                        <span class="input-group-append">
                            <button class="btn btn-outline-secondary bg-white border-bottom-0 border rounded-pill ms-n5"
                                type="button">
                                <i class="fa fa-search"></i>
                            </button>
                        </span>
                    </div>
                    <ol class="list-group border border-secondary mt-3">
                        <li class="list-group-item d-flex justify-content-between align-items-start"
                            v-for="dev in filterDevs" :key="dev.login">
                            <img :src="dev.avatar_url" alt="" width="50" class="rounded-circle">
                            <div class="ms-2 me-auto">
                                <div class="fw-bold">
                                    {{ dev.name }}
                                </div>

                                <small>Usuário desde {{ format_date(dev.created_at) }}</small>
                            </div>

                            <div class="d-flex flex-row align-items-center">
                                <div class="p-2"><span class="badge bg-primary rounded-pill"
                                    v-vb-is:tooltip="{title: 'Total Repositórios'}">{{
                                            dev.public_repos }}</span></div>
                                <div class="p-2">
                                    <router-link :to="{ name: 'detail-user', params: { login: dev.login } }"
                                        class="btn btn-sm btn-info" v-vb-is:tooltip="{title: 'Info Usuário'}">
                                        <i class="fas fa-eye"></i>
                                    </router-link>

                                </div>
                            </div>
                        </li>
                    </ol>
                </div>
            </div>

        </div>
        <div id="processa" v-if="isLoading">
            <h4>
                <div class="spinner-border mr-2" role="status">
                    <span class="sr-only">Loading...</span>
                </div>Aguarde...
            </h4>

        </div>
    </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Tooltip } from 'bootstrap/dist/js/bootstrap.esm.min.js'
export default {
    data() {
        return {
            devs: [],
            search: '',
            isLoading: false,
        }
    },

    created() {
        this.getDevs();

    },
    methods: {
        async getDevs() {
            this.isLoading = true;
            const wallysonn = await axios.get("https://api.github.com/users/wallysonn");
            const diego3g = await axios.get("https://api.github.com/users/diego3g");
            const filipe = await axios.get("https://api.github.com/users/filipedeschamps");
            const rmanguinho = await axios.get("https://api.github.com/users/rmanguinho");

            this.devs = [wallysonn.data, diego3g.data, filipe.data, rmanguinho.data]
            this.isLoading = false

        },
        format_date(value) {
            if (value) {
                return moment(value).format('DD/MM/YYYY')
            }
        },

    },
    mounted() {
        Array.from(document.querySelectorAll('button[data-bs-toggle="tooltip"]'))
            .forEach(tooltipNode => new Tooltip(tooltipNode))
    },
    computed: {
        filterDevs() {
            return this.devs.filter(dev => {
                return dev.login.toLowerCase().includes(this.search.toLowerCase());
            });
        },
    },

}
</script>