const baseUrl = "https://charlottesstockapi20230530182329.azurewebsites.net/api/eggs"

Vue.createApp({
    data() {
        return {
            EasterEgg: [],
            stocklevel: 0,
            filteredEggs: [],
            errorMessage: ""
        
        }


    },

    async created() {
        this.getAll();

    },

    methods: {
        async getAll() {
            this.helperGetAndShow(baseUrl)
        },




        async helperGetAndShow(url) {
            try {
                const response = await axios.get(url);
                this.EasterEgg = response.data;
                console.log(this.EasterEgg)
            } catch (ex) {
                console.error(ex);
            }
        },

        async filterByStockLevel(){
            try{
                const url = `${baseUrl}/stocklevel?stockLevel=${this.stocklevel}`
                const response = await axios.get(url)
                this.filteredEggs = await response.data

                if (this.filteredEggs.length === 0 && response.data.length === 0){
                    this.filteredEggs = []
                    this.errorMessage = "no eggs where found"
                } else{
                    this.errorMessage = ""
                }

            } catch(ex){
                console.error(ex);
            }

        },

        async updateEgg(productNo, updatedEgg)
        {
            try{
                const url = `${baseUrl}/${productNo}`;
                const response = await axios.put(url, updatedEgg);
            }catch(ex){
                console.error(ex);
            }
        }
    }


}).mount("#app")