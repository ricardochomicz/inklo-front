<template>
    <div class="container">
        <div class="card mt-5 shadow">
            <div class="card-body">

                <div class="d-flex">
                    <div class="p-2 flex-grow-1">
                        <h5 class="card-title">Informações Dev</h5>
                    </div>
                    <div class="p-2"><button class="btn btn-primary float-end" v-on:click.prevent="saveBack(dev.login)"><i
                                class="fas fa-floppy-disk"></i>
                            Salvar Login</button></div>
                    <div class="p-2"><router-link class="btn btn-success float-end" to="/"><i class="fas fa-undo-alt"></i>
                            Voltar</router-link></div>
                </div>

                <div class="invoice p-3 mb-3">
                    <div class="row">
                        <div class="col-12">
                            <h4 class="zoom">
                                <img :src="dev.avatar_url" alt="{{ dev.name }}" width="50" class="rounded-circle"> {{
                                    dev.name
                                }}
                            </h4>
                        </div>

                    </div>

                    <div class="row invoice-info">
                        <div class="col-sm-6 invoice-col">
                            <address>
                                <strong><a :href="'https://github.com/' + dev.login" target="_blank">https://github.com/{{
                                    dev.login
                                }}</a> </strong><br>
                                <span v-if="dev.company">Empresa: <b>{{ dev.company }}</b></span><br>
                                Localidade: <b>{{ dev.location }}</b><br>
                                Repositórios: <b>{{ dev.public_repos }}</b><br>
                                Bio: <b>{{ dev.bio }}</b>
                            </address>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12 table-responsive">

                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Repositório</th>
                                        <th>Linguagem</th>
                                        <th>Url Projeto</th>
                                        <th>Criado em</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="repository in displayedRepositories">
                                        <td>{{ repository.name }}</td>
                                        <td>{{ repository.language }}</td>
                                        <td>
                                            <a :href="repository.html_url" target="_blank">{{ repository.html_url }}</a>
                                        </td>
                                        <td>{{ format_date(repository.created_at) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="col-12">
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination pagination-sm">
                                        <li class="page-item">
                                            <button type="button" class="page-link" v-if="page != 1" @click="page--">
                                                Anterior
                                            </button>
                                        </li>
                                        <li class="page-item d-flex">
                                            <button type="button" class="page-link"
                                                v-for="pageNumber in pages.slice(page - 1, page + 5)"
                                                @click="page = pageNumber">
                                                {{ pageNumber }} </button>
                                        </li>
                                        <li class="page-item">
                                            <button type="button" @click="page++" v-if="page < pages.length"
                                                class="page-link">
                                                Próxima </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from "axios";
import moment from "moment";
export default {
    data() {
        return {
            dev: {},
            repositories: [],
            page: 1,
            perPage: 10,
            pages: [],
            search: '',
        }
    },
    methods: {
        async getDev(login) {
            const developer = await axios.get("https://api.github.com/users/" + login);
            this.dev = developer.data;
        },
        async getRepos(login) {
            const repos = await axios.get("https://api.github.com/users/" + login + "/repos");
            console.log(repos)
            this.repositories = repos.data;
        },
        format_date(value) {
            if (value) {
                return moment(value).format('DD/MM/YYYY')
            }
        },
        totalPages() {
            let numberOfPages = Math.ceil(this.repositories.length / this.perPage)
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        },
        paginate(repositories) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return repositories.slice(from, to);
        },

        async saveBack(login) {
            await axios.post('http://127.0.0.1:8000/api/salvar-local', { login: login })
                .then(response => {
                    if (response.status == 200) {
                        this.$toast.success(response.data.mensagem);
                    }
                }).catch(error => {
                    this.$toast.error('Ops! Algo deu errado. Status Code: ' + error.response.status);
                })
        }
    },
    mounted() {
        this.getDev(this.$route.params.login)
        this.getRepos(this.$route.params.login)
    },
    computed: {
        displayedRepositories() {
            return this.paginate(this.repositories);
        },

    },
    watch: {
        repositories() {
            this.totalPages();
        }
    },
    filters: {
        trimWords(value) {
            return value.split(" ").splice(0, 20).join(" ") + '...';
        }
    }
}
</script>